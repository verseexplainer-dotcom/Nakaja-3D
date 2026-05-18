# Supabase

## Database Scope

Public schema tables used by this project:

- `profiles`
- `leads`
- `chat_events`
- `appointments`

## Safety Rules

- RLS must stay enabled on all public tables
- Do not allow anonymous browser reads on lead or chat tables
- Do not allow direct browser inserts into `leads`
- Use `SUPABASE_SERVICE_ROLE_KEY` only inside `functions/api/*`

## Required Setup

1. Run `supabase/migrations/001_initial_schema.sql` against the target project.
2. Confirm `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` are set for browser use.
3. Confirm `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set only on the Cloudflare server side.

## Final Test Queries

Lead endpoint success case:

```bash
curl -X POST http://127.0.0.1:8788/api/lead \
  -H 'content-type: application/json' \
  -d '{"name":"Test Rider","phone":"+254700000000","model":"UM Test","message":"Smoke test"}'
```

Lead endpoint validation failure case:

```bash
curl -X POST http://127.0.0.1:8788/api/lead \
  -H 'content-type: application/json' \
  -d '{"name":"A","phone":"bad"}'
```

Expected result:

- valid payload inserts one row into `leads`
- invalid payload returns `400` with a safe JSON error
- no secret values appear in any response body
