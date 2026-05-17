# Nakaja Meta Integration Foundation

## Scope

This project supports a safe first phase for WhatsApp, Messenger, and Meta webhooks without automated replies.

## Website CTAs

- WhatsApp CTAs use click-to-chat links and work before any bot setup.
- Messenger CTAs use an `m.me` link and work without an embedded plugin.
- Public link settings come from:
  - `PUBLIC_WHATSAPP_NUMBER`
  - `PUBLIC_MESSENGER_LINK`

## Secret Environment Variables

Configure these only in Cloudflare Pages environment variables:

- `META_VERIFY_TOKEN`
- `META_APP_SECRET`
- `META_PAGE_ACCESS_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never expose server tokens in Astro components, client scripts, or public docs with real values.

## Webhook Endpoint

Meta webhook URL:

```txt
/api/meta-webhook
```

### GET Verification

The endpoint verifies:

- `hub.mode=subscribe`
- `hub.verify_token` equals `META_VERIFY_TOKEN`
- returns `hub.challenge` when valid
- returns `403` when invalid

### POST Events

The endpoint:

- reads the raw request body
- validates `x-hub-signature-256` using `META_APP_SECRET`
- rejects invalid signatures
- detects Messenger or WhatsApp payloads
- inserts the raw payload and minimal metadata into `chat_events`
- returns `EVENT_RECEIVED`

## MVP Chat Flow

1. Website CTAs launch WhatsApp or Messenger.
2. Meta webhooks log inbound messages into Supabase `chat_events`.
3. Staff handles conversations in Meta Business Suite first.
4. Automated replies can be added later after Page/App review and token setup.
5. Respect Meta's 24-hour messaging window for free-form replies.
6. Use approved WhatsApp templates outside the allowed messaging window.

## Future Automation Stubs

Do not implement aggressive auto-replies yet. Future server-side helpers should:

- verify the event came from Meta
- check the 24-hour messaging window
- use approved WhatsApp templates where required
- use `META_PAGE_ACCESS_TOKEN` or `WHATSAPP_ACCESS_TOKEN` only in Cloudflare Functions
- log outbound events to `chat_events`

## Preview Validation

Validate this integration on a Cloudflare preview deployment first. Do not connect or mutate any old live Nakaja Meta integration.
