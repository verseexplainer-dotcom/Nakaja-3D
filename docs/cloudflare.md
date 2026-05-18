# Cloudflare

## Runtime Shape

- Static pages are built by Astro into `dist/client`
- Server runtime output lands in `dist/server`
- Cloudflare Pages Functions live in `functions/api`
- `wrangler.toml` is kept minimal for local and deployment compatibility

## Required Cloudflare Setup

Set these environment variables in the Pages project:

- `PUBLIC_SITE_URL`
- `PUBLIC_WHATSAPP_NUMBER`
- `PUBLIC_MESSENGER_LINK`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_CLOUDINARY_CLOUD_NAME` if Cloudinary delivery is used
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `META_VERIFY_TOKEN`
- `META_APP_SECRET`
- `META_PAGE_ACCESS_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

## Local QA

- `npm run preview` verifies static route output
- `npm run cf:dev` verifies Pages Functions and Cloudflare routing
- `GET /api/health` should be the first sanity check before lead or webhook testing

## Notes

- Keep secrets only in Cloudflare server env, never in browser-prefixed vars
- If `cf:dev` fails locally, treat that as a local runtime issue until the deployed preview environment proves otherwise
