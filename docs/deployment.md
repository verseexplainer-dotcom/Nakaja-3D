# Deployment

## Local Release Sequence

1. Copy `.env.example` to `.env` and fill all required values.
2. Run `npm run audit:repo`.
3. Run `npm run validate:products`.
4. Run `npm run check`.
5. Run `npm run build`.
6. Run `npm run perf:check`.
7. Run `npm run preview`.
8. Run `npm run cf:dev`.

## Final Smoke Checks

Preview checks:

- `curl -I http://127.0.0.1:4321/`
- `curl -I http://127.0.0.1:4321/motorcycles/`
- `curl -I http://127.0.0.1:4321/financing/`
- `curl -I http://127.0.0.1:4321/contact/`

Pages Function checks under `cf:dev`:

- `curl http://127.0.0.1:8788/api/health`
- `curl -X POST http://127.0.0.1:8788/api/lead -H 'content-type: application/json' -d '{"name":"Test Rider","phone":"+254700000000","model":"UM Test","message":"Smoke test"}'`
- `curl "http://127.0.0.1:8788/api/meta-webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=12345"`

## Cloudflare Pages Deploy

1. Create the Pages project.
2. Set the production branch to `main`.
3. Build command: `npm run build`
4. Output directory: `dist/client`
5. Functions directory: `functions`
6. Set all public and server env vars from `.env.example`.
7. Confirm the deployed site serves the five public routes and both API endpoints.
