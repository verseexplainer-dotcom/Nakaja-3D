interface Env {
  META_VERIFY_TOKEN?: string;
  META_APP_SECRET?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

type MetaChannel = 'messenger' | 'whatsapp' | 'website';

interface ChatEventRecord {
  channel: MetaChannel;
  direction: 'inbound' | 'outbound';
  external_message_id: string | null;
  sender: string | null;
  message: string | null;
  payload: unknown;
}

const textResponse = (body: string, status = 200) => new Response(body, {
  status,
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const encoder = new TextEncoder();

const toHex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)]
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');

const safeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
};

const validateSignature = async (rawBody: string, signatureHeader: string | null, appSecret: string) => {
  if (!signatureHeader?.startsWith('sha256=')) return false;

  const signature = signatureHeader.slice('sha256='.length).toLowerCase();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(appSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  return safeEqual(signature, toHex(digest));
};

const detectChannel = (payload: any): MetaChannel => {
  if (payload?.object === 'whatsapp_business_account') return 'whatsapp';
  if (payload?.object === 'page') return 'messenger';

  const changeValue = payload?.entry?.[0]?.changes?.[0]?.value;
  if (changeValue?.messaging_product === 'whatsapp' || Array.isArray(changeValue?.messages)) return 'whatsapp';
  if (Array.isArray(payload?.entry?.[0]?.messaging)) return 'messenger';

  return 'website';
};

const extractChatEvent = (payload: any): ChatEventRecord => {
  const channel = detectChannel(payload);

  if (channel === 'whatsapp') {
    const value = payload?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    return {
      channel,
      direction: 'inbound',
      external_message_id: message?.id ?? null,
      sender: message?.from ?? null,
      message: message?.text?.body ?? message?.button?.text ?? message?.interactive?.button_reply?.title ?? null,
      payload,
    };
  }

  if (channel === 'messenger') {
    const event = payload?.entry?.[0]?.messaging?.[0];
    return {
      channel,
      direction: 'inbound',
      external_message_id: event?.message?.mid ?? event?.postback?.mid ?? null,
      sender: event?.sender?.id ?? null,
      message: event?.message?.text ?? event?.postback?.payload ?? null,
      payload,
    };
  }

  return {
    channel,
    direction: 'inbound',
    external_message_id: null,
    sender: null,
    message: null,
    payload,
  };
};

const insertChatEvent = async (env: Env, record: ChatEventRecord) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase server env vars are not configured');
  }

  const supabaseUrl = env.SUPABASE_URL.replace(/\/$/, '');
  const response = await fetch(`${supabaseUrl}/rest/v1/chat_events`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Meta webhook chat event insert failed', {
      status: response.status,
      body: errorText.slice(0, 500),
    });
    throw new Error('Could not persist chat event');
  }
};

const handleGet = async ({ request, env }: PagesContext) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const verifyToken = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && challenge && verifyToken && verifyToken === env.META_VERIFY_TOKEN) {
    return textResponse(challenge);
  }

  return textResponse('Forbidden', 403);
};

const handlePost = async ({ request, env }: PagesContext) => {
  if (!env.META_APP_SECRET) {
    console.error('Meta webhook missing META_APP_SECRET');
    return textResponse('Webhook not configured', 503);
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get('x-hub-signature-256');
  const signatureIsValid = await validateSignature(rawBody, signatureHeader, env.META_APP_SECRET);

  if (!signatureIsValid) {
    return textResponse('Invalid signature', 403);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return textResponse('Invalid JSON', 400);
  }

  try {
    const eventRecord = extractChatEvent(payload);
    await insertChatEvent(env, eventRecord);
  } catch (error) {
    console.error('Meta webhook processing failed', error instanceof Error ? error.message : 'Unknown error');
    return textResponse('Webhook processing failed', 502);
  }

  return textResponse('EVENT_RECEIVED');
};

export const onRequest = async (context: PagesContext) => {
  if (context.request.method === 'GET') {
    return handleGet(context);
  }

  if (context.request.method === 'POST') {
    return handlePost(context);
  }

  return textResponse('Method not allowed', 405);
};
