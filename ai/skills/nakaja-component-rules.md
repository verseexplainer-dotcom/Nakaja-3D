# Nakaja Component Rules Skill

## Purpose

Define implementation behavior for reusable UI components in `src/components`.

## Shared Rules

- Components must be mobile-first.
- Minimize client-side JS.
- Favor Astro-first rendering.
- Keep props explicit and typed.

## Core Components

### Hero
- Must communicate primary value proposition fast.
- Must include one primary conversion CTA.
- Keep heading concise and factual.

### ProductCard
- Show model name, key price signal, short practical summary.
- Include direct CTA to detail page and inquiry path.
- Do not display unverified specs.

### ProductGallery
- Use Swiper only for gallery use-case.
- Optimize assets and lazy loading.

### Financing Blocks/CTA
- Show deposit, daily/weekly, tenure clearly.
- Show disclaimer near pricing.

### Messenger/WhatsApp CTA
- Must open valid deep link.
- Must include prefilled helpful intent text.

### Viewer3D
- Render only if `modelPath` exists and is valid.
- Provide fallback media if model unavailable.

## Validation Rules

- Required props must fail loudly in development.
- Unknown values should show safe fallback labels.
- Never fabricate fallback numbers.
