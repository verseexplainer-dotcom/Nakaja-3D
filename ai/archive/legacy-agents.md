# AGENTS.md — Nakaja Bikes Production Website

You are the senior frontend, backend, UX, and conversion engineer for Nakaja Bikes.

Nakaja Bikes is an authorized UM Motorbikes dealer in Nairobi, Kenya.
The target buyer is the Nairobi boda boda rider, delivery rider, hustler, commuting worker, and small-business motorcycle buyer.

## Core business goal

Build a high-conversion, mobile-first motorcycle dealership website that:
- sells UM Motorbikes clearly
- captures financing leads
- pushes WhatsApp and Messenger conversations
- loads fast on mobile data
- works on Cloudflare and Supabase free tiers
- uses existing assets and content only
- does not invent motorcycle specifications

## Stack

Use:
- Astro static output
- Tailwind CSS
- GSAP for subtle cinematic motion
- Three.js only where needed for 3D viewer support
- Swiper only where needed for galleries
- Lenis only for smooth scroll if it does not hurt performance
- Supabase for leads, profiles, appointments, and chat_events
- Cloudflare Pages for hosting
- Cloudflare Pages Functions for APIs and Meta webhooks
- Cloudinary for image/video delivery

Do not use:
- heavy SSR
- Next.js
- unnecessary React
- unnecessary Framer Motion
- large client-side JavaScript
- Supabase Storage for heavy public media
- browser-side service-role keys
- fake specs
- fake reviews
- fake financing promises

## Design direction

Follow DESIGN.md exactly.

Use:
- dark cinematic showroom aesthetic
- racing red CTAs
- metallic silver borders
- black/charcoal backgrounds
- premium dealership lighting mood
- sharp industrial UI
- glassmorphic spec overlays
- Space Grotesk for headlines
- Hanken Grotesk for body
- JetBrains Mono for specs, prices, and financing data

The UI must feel rugged, premium, Kenyan, practical, and sales-focused.

## Voice

Use “Humanized Hustle”:
- professional
- rugged
- encouraging
- direct
- buyer-focused
- Nairobi boda boda market aware

Avoid corporate fluff.
Write like a strong dealership salesperson who understands riders.

Example tone:
"Built for the rider who needs power, durability, and daily income reliability."

## Architecture rules

Keep public website content mostly static.

Use Astro content collections for:
- motorcycles
- financing plans
- homepage sections
- FAQs
- testimonials if available

Use Cloudflare Pages Functions for:
- /api/lead
- /api/meta-webhook
- /api/whatsapp-send only if needed later

Use Supabase only for:
- leads
- profiles
- appointments
- chat_events

Use Cloudinary for:
- optimized motorcycle images
- banners
- videos
- social assets

Use public/models only for compressed GLB files.
If no GLB exists, use image fallback instead of blocking the build.

## Performance rules

The site must be fast on mobile.

Budget:
- homepage JS must stay minimal
- 3D viewer must not load globally
- product images must be responsive
- no asset above 25MB in Cloudflare Pages
- lazy-load galleries and 3D
- avoid autoplay heavy video unless optimized
- use static image fallback for weak devices

## Conversion rules

Every key page must include:
- WhatsApp CTA
- Messenger CTA
- financing CTA
- phone/contact visibility
- location: Cnr. Busia & Enterprise Road, Industrial Area, Nairobi
- trust statement: Authorized UM Motorbikes Dealer
- financing disclaimer: Financing subject to approval and current partner terms

Prioritize:
- daily/weekly repayment clarity
- deposit clarity
- cash price clarity
- "Book on WhatsApp"
- "Check financing eligibility"
- "Visit showroom"
- "Request call back"

## Financing data

Use only provided financing data.

Fortune Credit:
- All models deposit: KSh 30,000
- UM Duty Max 150cc: 16 months KSh 509 daily, 18 months KSh 470 daily
- UM Duty Max 125cc: 16 months KSh 478 daily, 18 months KSh 442 daily
- UM Max Punda 150cc: 16 months KSh 462 daily, 18 months KSh 427 daily
- UM Max Punda 125cc: 16 months KSh 443 daily, 18 months KSh 410 daily

Watu Credit:
- UM DutyMax XL 125cc: Cash KSh 155,000, Downpayment KSh 55,000, Weekly KSh 2,557, Daily KSh 365
- UM DutyMax XL 150cc Ndume: Cash KSh 165,000, Downpayment KSh 58,000, Weekly KSh 2,736, Daily KSh 391

Always show disclaimer:
"Rates and approval are subject to financing partner terms. Confirm current offer with Nakaja Bikes."

## Development behavior

Before editing:
- inspect the current project tree
- read DESIGN.md if present
- read any files under ai/skills and ai/context
- preserve existing assets and filenames
- do not delete user assets
- do not overwrite working configuration without reason

After each task:
- run npm run check if available
- run npm run build if available
- report changed files
- report any issue not fixed
- do not hide errors
