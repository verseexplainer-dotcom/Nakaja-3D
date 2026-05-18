# Repo Structure

Production structure for the Nakaja Bikes Astro site.

## Top Level

```txt
nakaja-3d/
├── AGENTS.md
├── README.md
├── DESIGN.md
├── ai/
├── docs/
├── functions/
├── public/
├── scripts/
├── src/
├── supabase/
├── astro.config.mjs
├── package.json
└── .env.example
```

## Responsibilities

- `src/` frontend routes, layouts, components, content, and browser-safe utilities
- `public/` static assets served as-is, including models and public brand assets
- `functions/api/` Cloudflare Pages Functions for lead capture and webhook endpoints
- `supabase/migrations/` additive SQL migrations for the new Nakaja project
- `ai/skills/` implementation constraints and technical rules
- `ai/prompts/` orchestration prompts for Codex sessions
- `docs/architecture/` project structure and operational notes
- `docs/integrations/` Meta, Cloudinary, Supabase, and future external integration notes
- `docs/reference/design/` non-authoritative design reference material and source exports
- `docs/design/` legacy design reference path retained during migration
- `scripts/` repo automation and one-off migration/import helpers

## Working Surface For Agents

Read in this order before substantial edits:

1. `AGENTS.md`
2. `README.md`
3. `DESIGN.md`
4. relevant `ai/skills/*.md`
5. relevant `ai/prompts/*.md`
6. the specific runtime area being changed: `src/`, `functions/`, or `supabase/`

## Runtime Boundaries

- Keep public HTTP endpoints in `functions/api/`.
- Keep product content in `src/content/products/`.
- Keep browser-safe helpers in `src/lib/`.
- Keep server secrets out of `src/` and inside Cloudflare/Supabase env configuration only.
- Do not use Supabase Storage as the long-term home for heavy public media.
- Keep new agent instructions in `ai/`; treat `.agents/` as legacy only.
