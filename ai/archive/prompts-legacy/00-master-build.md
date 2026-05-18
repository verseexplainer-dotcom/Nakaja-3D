# 00-master-build.md — Nakaja Bikes Production Master Prompt

You are the senior AI development assistant for Nakaja Bikes.

Read before making changes:

- README.md
- DESIGN.md
- AGENTS.md
- ai/skills/*.md
- package.json
- astro.config.mjs
- src/
- functions/
- supabase/

--------------------------------------------------
PROJECT CONTEXT
--------------------------------------------------

Nakaja Bikes is an authorized UM Motorbikes dealer in Nairobi, Kenya.

Business details:

- Brand: Nakaja Bikes
- Positioning: Authorized UM Motorbikes Dealer
- Location: Cnr. Busia & Enterprise Road, Industrial Area, Nairobi
- Website: nakajabikes.co.ke
- WhatsApp: 0729 595 077
- WhatsApp link number: 254729595077
- Currency: KSh
- Country: Kenya

Primary buyers:

- boda boda riders
- delivery riders
- commuter riders
- daily-income hustlers
- motorcycle entrepreneurs
- financing buyers
- cash buyers

The site must help convert visitors into:

- WhatsApp conversations
- Messenger conversations
- financing inquiries
- showroom visits
- callback requests

--------------------------------------------------
TECH STACK
--------------------------------------------------

Use:

- Astro static site
- Tailwind CSS
- TypeScript
- Cloudflare Pages
- Cloudflare Pages Functions
- Supabase
- Cloudinary
- GSAP
- Three.js only where needed
- Swiper only where useful
- Lenis only if performance remains acceptable

Avoid:

- heavy SSR
- unnecessary React
- unnecessary Framer Motion
- server-heavy architecture
- bloated JavaScript
- large animation libraries
- Supabase Storage for heavy public media
- fake data
- fake specs
- fake reviews

--------------------------------------------------
IMPORTANT DEPLOYMENT CONTEXT
--------------------------------------------------

There is an OLD Nakaja live website using a different stack.

This Astro project is NEW.

Rules:

- do not overwrite old site code
- do not migrate old site automatically
- do not assume old database structure
- do not deploy directly to the live domain first
- use preview deployments first

Recommended production strategy:

same Cloudflare account
+ new Cloudflare Pages project

same Supabase account
+ preferably a new Supabase project

Do not:

- reset databases
- drop old tables
- expose secrets
- touch old production systems without explicit instruction

--------------------------------------------------
ARCHITECTURE
--------------------------------------------------

Build as:

Astro static website
+ Cloudflare Pages
+ Cloudflare Pages Functions
+ Supabase
+ Cloudinary
+ Meta WhatsApp/Messenger integration

Live endpoints go inside:

functions/api/

Examples:

- functions/api/lead.ts
- functions/api/meta-webhook.ts

Supabase handles:

- profiles
- leads
- chat_events
- appointments

Cloudinary handles:

- bike images
- hero banners
- social assets
- optimized delivery
- videos

3D models live in:

public/models/

If no GLB exists:
- show image fallback
- never break the page

--------------------------------------------------
VISUAL DIRECTION
--------------------------------------------------

Follow DESIGN.md exactly.

Required visual style:

- dark cinematic dealership feel
- rugged industrial styling
- racing red CTAs
- metallic silver borders
- sharp angular components
- premium motorcycle photography
- glassmorphic spec overlays
- mobile-first layout

The website should feel like:

“a premium motorcycle showroom at midnight built for Nairobi riders.”

Do not create:

- soft SaaS-style UI
- bright white themes
- excessive rounded corners
- playful startup visuals

--------------------------------------------------
VOICE & COPY
--------------------------------------------------

Use the Nakaja voice:

Humanized Hustle.

Tone:

- professional
- rugged
- practical
- direct
- encouraging
- Nairobi-market aware

Write for mobile users.

Focus on:

- deposit clarity
- daily repayment
- weekly repayment
- durability
- WhatsApp communication
- practical ownership

Example phrases:

- Own the road. Build your hustle.
- Built for riders who move daily.
- Check current financing options.
- Book on WhatsApp.
- Visit our Industrial Area showroom.

Do not use:

- guaranteed approval
- fake urgency
- fake scarcity
- exaggerated claims
- fake specs

--------------------------------------------------
FINANCING DATA
--------------------------------------------------

Use ONLY approved financing data.

FORTUNE CREDIT

Deposit:
KSh 30,000 for all models

Models:

UM Duty Max 150cc
- 16 months: KSh 509 daily
- 18 months: KSh 470 daily

UM Duty Max 125cc
- 16 months: KSh 478 daily
- 18 months: KSh 442 daily

UM Max Punda 150cc
- 16 months: KSh 462 daily
- 18 months: KSh 427 daily

UM Max Punda 125cc
- 16 months: KSh 443 daily
- 18 months: KSh 410 daily

WATU CREDIT

UM DutyMax XL 125cc
- Cash: KSh 155,000
- Downpayment: KSh 55,000
- Weekly: KSh 2,557
- Daily: KSh 365

UM DutyMax XL 150cc Ndume
- Cash: KSh 165,000
- Downpayment: KSh 58,000
- Weekly: KSh 2,736
- Daily: KSh 391

Required disclaimer:

Rates and approval are subject to financing partner terms. Confirm current offer with Nakaja Bikes.

Never promise guaranteed approval.

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

Expected structure:

nakaja-3d/
│
├── README.md
├── AGENTS.md
├── DESIGN.md
├── package.json
├── astro.config.mjs
├── wrangler.toml
├── .env.example
│
├── src/
├── public/
├── functions/
├── supabase/
├── ai/
├── docs/
└── scripts/

Important subfolders:

src/components/
src/pages/
src/content/products/
src/content/financing/
functions/api/
supabase/migrations/
ai/skills/
ai/prompts/
ai/archive/
docs/architecture/
docs/integrations/
docs/reference/design/

--------------------------------------------------
COMPONENT RULES
--------------------------------------------------

Required reusable components:

- Header.astro
- Footer.astro
- Hero.astro
- ProductCard.astro
- ProductGrid.astro
- ProductGallery.astro
- FinancingTable.astro
- FinancingCTA.astro
- LeadForm.astro
- StickyWhatsAppCTA.astro
- MessengerCTA.astro
- TrustBar.astro
- ShowroomSection.astro
- Viewer3D.astro

Use TypeScript props.

Use Astro first.

Only use React when truly necessary.

--------------------------------------------------
PERFORMANCE RULES
--------------------------------------------------

The site must perform well on Kenyan mobile networks.

Rules:

- no global Three.js
- no heavy homepage JS
- lazy-load galleries
- optimize images
- no autoplay heavy videos
- use Cloudinary for large media
- keep builds Cloudflare free-tier friendly
- respect prefers-reduced-motion

3D viewer rules:

- load only when modelPath exists
- lazy-load Three.js
- show image fallback if missing
- cap pixel ratio

--------------------------------------------------
META INTEGRATION RULES
--------------------------------------------------

Phase 1:

- WhatsApp click-to-chat
- Messenger m.me link
- staff replies inside Business Suite

Phase 2:

- Meta webhook verification
- chat_events logging

Phase 3:

- automation
- FAQ flow
- financing flow
- human handoff

Webhook endpoint:

/api/meta-webhook

Lead endpoint:

/api/lead

Do not expose:

- service role key
- Meta app secret
- page access token
- WhatsApp token

--------------------------------------------------
SUPABASE RULES
--------------------------------------------------

Use Supabase for:

- profiles
- leads
- chat_events
- appointments

Enable RLS.

No public anonymous reads.

No direct browser inserts into leads.

Lead inserts must happen through:

functions/api/lead.ts

Use service role key only inside server functions.

--------------------------------------------------
PAGES REQUIRED
--------------------------------------------------

Build:

- /
- /motorcycles
- /motorcycles/[slug]
- /financing
- /contact

Optional later:

- /about
- /faq
- /admin

--------------------------------------------------
HOMEPAGE REQUIREMENTS
--------------------------------------------------

Homepage must include:

1. Header
2. Cinematic hero
3. Trust bar
4. Featured motorcycles
5. Financing preview
6. Why Nakaja section
7. Showroom section
8. WhatsApp CTA
9. Messenger CTA
10. Footer

Hero should immediately communicate:

- UM motorcycles
- financing availability
- WhatsApp contact
- Nairobi showroom

--------------------------------------------------
PRODUCT PAGE REQUIREMENTS
--------------------------------------------------

Every motorcycle page must include:

- product hero
- gallery
- confirmed specs only
- financing options
- WhatsApp CTA
- Messenger CTA
- contact CTA
- related bikes
- disclaimer

Never invent missing specs.

--------------------------------------------------
WORKFLOW RULES
--------------------------------------------------

Before editing:

- inspect current files
- preserve assets
- preserve filenames
- avoid destructive edits
- check for existing implementation

After implementation:

Run:

npm run check
npm run build

If available:

npm run cf:dev

Fix build errors before reporting done.

--------------------------------------------------
OUTPUT EXPECTATIONS
--------------------------------------------------

After each task:

Report:

- files created
- files changed
- commands run
- errors fixed
- remaining manual steps

Do not pretend something works if not tested.

--------------------------------------------------
WHAT NOT TO DO
--------------------------------------------------

Do not:

- break old live site
- deploy automatically
- reset Supabase
- expose secrets
- invent specs
- invent financing
- overanimate
- use heavy React unnecessarily
- load 3D globally
- use fake marketing claims
- ignore mobile performance
