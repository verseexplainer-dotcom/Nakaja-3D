# Nakaja Supabase Rules Skill

## Objective

Define safe, non-destructive Supabase usage for the new Astro project.

## Data Domains

Use Supabase for:
- `leads`
- `profiles`
- `appointments`
- `chat_events`

## Safety Requirements

- Prefer new Supabase project for this stack.
- Do not blindly reuse old schema/data.
- Do not run destructive SQL (drop/reset) on shared environments.
- Keep migrations additive and reversible where possible.

## Access Control

- Enable and maintain RLS where applicable.
- Keep service-role keys server-side only.
- Use anon/public keys only for safe client operations.

## API and Data Hygiene

- Validate all input fields before insert/update.
- Normalize phone values to a consistent standard when possible.
- Record source channel for each lead.

## Migration Rules

- Version migrations sequentially in `supabase/migrations`.
- Document intent and rollback approach in migration comments.
- Test migrations in preview/dev before production.
