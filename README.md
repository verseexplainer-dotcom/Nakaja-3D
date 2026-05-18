# Nakaja Bikes Website

Production Astro site for Nakaja Bikes, an authorized UM Motorbikes dealer in Nairobi, Kenya.

## Purpose

The site exists to convert visitors into:

- WhatsApp conversations
- Messenger conversations
- financing inquiries
- showroom visits
- callback leads

The build must stay mobile-first, fast, honest, and practical for Nairobi riders and financing buyers.

## Stack

- Astro static frontend
- Tailwind CSS
- TypeScript
- Cloudflare Pages
- Cloudflare Pages Functions
- Supabase for leads, auth domains, appointments, and chat logs
- Cloudinary for heavy public media delivery
- GSAP, Swiper, and Three.js only where they earn their cost

## Operating Rules

- Root governance files are the first read for every task:
  - `AGENTS.md`
  - `README.md`
  - `DESIGN.md`
- Product and financing content must stay factual.
- Do not invent specs, rates, reviews, or guarantees.
- Keep server secrets out of browser bundles.
- Treat the old Nakaja live stack as separate infrastructure.

## Core Paths

- `src/pages/` site routes
- `src/components/` reusable UI
- `src/content/products/` motorcycle content collection
- `src/data/navigation/` navigation constants
- `src/data/financing/` finance metadata
- `src/lib/` browser-safe helpers and integration utilities
- `functions/api/` Pages Functions endpoints
- `supabase/migrations/` schema migrations
- `ai/skills/` implementation rules
- `ai/prompts/` task prompts
- `ai/context/` project operating context for Codex sessions
- `docs/` architecture, deployment, integration, and standards notes

## Commands

```bash
npm run dev
npm run check
npm run build
npm run preview
npm run cf:dev
```

## Environment

Public variables:

- `PUBLIC_SITE_URL`
- `PUBLIC_WHATSAPP_NUMBER`
- `PUBLIC_MESSENGER_LINK`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Server-only variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `META_VERIFY_TOKEN`
- `META_APP_SECRET`
- `META_PAGE_ACCESS_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

See `.env.example` for the current template.

## Deployment Shape

- Build the static site with Astro.
- Deploy frontend and `functions/api/` to Cloudflare Pages.
- Run additive SQL from `supabase/migrations/` against the Nakaja Supabase project.
- Keep heavy public images on Cloudinary in production.

## Buyer Context

Primary users:

- boda boda riders
- delivery riders
- commuter riders
- daily-income hustlers
- motorcycle entrepreneurs
- cash buyers
- financing buyers

They care about deposit, repayment, durability, support, location, and fast contact response.

## Notes For Future Codex Sessions

- Treat `ai/` as the canonical agent workspace.
- Use the numbered prompts under `ai/prompts/` instead of the older legacy prompt names.
- Active project guidance now lives only under `ai/` and `docs/`.
