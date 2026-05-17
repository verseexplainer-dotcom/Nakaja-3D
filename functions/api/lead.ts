interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  model?: unknown;
  message?: unknown;
}

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const sanitizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
};

const normalizePhone = (value: unknown) => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  const normalized = trimmed.startsWith('+')
    ? `+${trimmed.slice(1).replace(/\D/g, '')}`
    : trimmed.replace(/[^\d+]/g, '');
  return normalized.slice(0, 32);
};

const isValidPhone = (phone: string) => /^\+?\d{7,15}$/.test(phone);

export const onRequest = async ({ request, env }: PagesContext) => {
  if (request.method !== 'POST') {
    return json({ success: false, error: 'Method not allowed' }, 405);
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Lead capture missing Supabase server env vars');
    return json({ success: false, error: 'Lead capture is not configured' }, 503);
  }

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON payload' }, 400);
  }

  const name = sanitizeText(payload.name, 120);
  const phone = normalizePhone(payload.phone);
  const model = sanitizeText(payload.model, 160) || null;
  const message = sanitizeText(payload.message, 1000) || null;

  if (name.length < 2) {
    return json({ success: false, error: 'Name is required' }, 400);
  }

  if (!isValidPhone(phone)) {
    return json({ success: false, error: 'A valid phone number is required' }, 400);
  }

  const supabaseUrl = env.SUPABASE_URL.replace(/\/$/, '');
  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name,
      phone,
      model,
      message,
      source: 'website',
    }),
  });

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text();
    console.error('Supabase lead insert failed', {
      status: insertResponse.status,
      body: errorText.slice(0, 500),
    });
    return json({ success: false, error: 'Could not save lead request' }, 502);
  }

  return json({ success: true });
};
