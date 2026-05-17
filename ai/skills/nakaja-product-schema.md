# Nakaja Product Schema Skill

## Purpose

Standardize product content for `src/content/products` and product pages.

## Required Principles

- Keep entries factual and source-backed.
- Do not invent specs or prices.
- Unknown values must be marked pending verification.

## Recommended Frontmatter Fields

- `title`: string
- `slug`: string
- `category`: string
- `cashPriceKsh`: number
- `depositKsh`: number | null
- `dailyRepaymentKsh`: number | null
- `weeklyRepaymentKsh`: number | null
- `tenureMonths`: number | null
- `financingPartner`: string | null
- `modelYear`: string | null
- `engineCc`: string | null
- `summary`: string
- `featured`: boolean
- `heroImage`: string | null
- `gallery`: string[]
- `modelPath`: string | null
- `status`: "draft" | "published"
- `lastVerifiedAt`: string (ISO date)

## Content Body Rules

Include:
- practical rider-focused benefits
- maintenance/support context when known
- financing suitability notes when applicable

Exclude:
- fake awards/reviews
- unverifiable performance claims

## Financing Rule

When any rate fields are present in rendered UI, include:

"Rates and approval are subject to financing partner terms. Confirm current offer with Nakaja Bikes."
