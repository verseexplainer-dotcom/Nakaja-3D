# Nakaja Performance Budget Skill

## Objective

Protect mobile conversion performance for Kenyan network realities.

## Core Budgets (Page-Level)

- JavaScript shipped per route: keep minimal, avoid unnecessary hydration
- Primary hero image: compressed and responsive
- LCP target: <= 2.5s on representative mobile conditions
- CLS target: < 0.1
- INP target: < 200ms where practical

## Implementation Rules

- Astro static-first rendering
- Lazy-load non-critical media
- Avoid unnecessary React islands
- Use GSAP only where it directly improves perceived quality
- Use Lenis only if it does not regress CWV

## Media Rules

- Use Cloudinary derivatives for responsive delivery
- Keep 3D assets optional and conditional
- Avoid autoplay-heavy media on landing routes

## Verification Checklist

- Run build and inspect bundle output
- Verify no accidental large client bundles
- Confirm core routes remain fast on mobile
- Validate CTA is reachable before heavy visuals load
