# Acceptance Criteria

## Build Gate

- `npm run audit:repo` passes
- `npm run validate:products` passes
- `npm run check` passes
- `npm run build` passes
- `npm run perf:check` completes after a build

## Env-Backed Integration Gate

Required public vars:

- `PUBLIC_SITE_URL`
- `PUBLIC_WHATSAPP_NUMBER`
- `PUBLIC_MESSENGER_LINK`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_CLOUDINARY_CLOUD_NAME` if Cloudinary delivery is enabled

Required server vars:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `META_VERIFY_TOKEN`
- `META_APP_SECRET`
- `META_PAGE_ACCESS_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

Required endpoint checks:

- `GET /api/health` returns `200` JSON with `ok: true`
- `POST /api/lead` accepts valid payload and returns `{"success":true}`
- `POST /api/lead` rejects invalid payload with safe JSON errors
- `GET /api/meta-webhook` returns `hub.challenge` only when `hub.verify_token` matches
- `POST /api/meta-webhook` rejects missing or invalid `x-hub-signature-256`

## Route Gate

- `/` renders title, description, canonical URL, Open Graph tags, and visible Nairobi/authorized-dealer positioning
- `/motorcycles` renders product cards and financing disclaimer where price examples appear
- `/motorcycles/[slug]` renders factual specs only and keeps product CTA links working
- `/financing` renders rate/deposit disclaimers clearly
- `/contact` renders labeled form controls and a working `POST /api/lead` submission path

## CTA Gate

- WhatsApp CTAs open the expected `wa.me` link with the correct prefilled message
- Messenger CTAs open the expected `m.me` link
- Missing public CTA env vars degrade safely to public defaults or `/contact`

## Security Gate

- No service-role, Meta, or Cloudflare secrets appear in browser HTML, built JS, or committed files
- Browser code only uses public env vars
- `leads` inserts happen only through Pages Functions
- Supabase RLS stays enabled on all public tables
