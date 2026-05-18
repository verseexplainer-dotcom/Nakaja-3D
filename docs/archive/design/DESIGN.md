---
name: Cinematic Velocity
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e6bdbb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ad8886'
  outline-variant: '#5d3f3e'
  surface-tint: '#ffb3b1'
  primary: '#ffb3b1'
  on-primary: '#680011'
  primary-container: '#e31837'
  on-primary-container: '#fffaf9'
  inverse-primary: '#bf0029'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#727474'
  on-tertiary-container: '#fbfbfb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001d'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  cta-label:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
---

## Brand & Style

The design system is engineered to evoke the raw power and precision of high-end motorcycling within the Kenyan landscape. It balances a **Dark Cinematic** aesthetic with **Industrial Precision**, creating an environment that feels like a premium showroom at midnight. 

The target audience consists of enthusiasts and professionals who value both performance and rugged durability. The UI should feel "heavy" and mechanical, yet technologically advanced. We draw from **Minimalism** for layout structure and **Glassmorphism** for data overlays, ensuring that the high-quality bike photography remains the focal point. The emotional response is one of adrenaline, prestige, and engineering confidence.

## Colors

This design system utilizes a high-contrast, low-light palette to simulate a premium dealership environment.

- **Primary (Racing Red):** Used exclusively for call-to-actions, performance metrics, and critical brand moments. It represents speed and heat.
- **Secondary (Metallic Silver):** Used for iconography, borders, and subtle highlights to simulate brushed aluminum and chrome components.
- **Neutral (Obsidian & Charcoal):** The foundation of the UI. Deep blacks (#0A0A0A) provide infinite depth, while slightly lighter charcoals (#121212) define layered surfaces.
- **Status Colors:** Success should lean towards a cool cyan-metal, while warnings remain the primary Racing Red.

## Typography

The typography strategy emphasizes technical sophistication. 

- **Headlines:** `Space Grotesk` provides a geometric, futuristic feel that mimics industrial engineering blueprints. Large display sizes should use tight letter-spacing to feel "aggressive."
- **Body:** `Hanken Grotesk` offers a clean, contemporary grotesque feel for maximum legibility against dark backgrounds, essential for spec sheets and technical details.
- **Data & Labels:** `JetBrains Mono` is used for technical specifications, VIN numbers, and price points to reinforce the "precision instrument" narrative.

All text on dark backgrounds should favor a 90% white or silver tint to reduce eye strain while maintaining high contrast.

## Layout & Spacing

The layout is **Mobile-First**, transitioning to a refined **Fixed Grid** on desktop. 

- **Rhythm:** An 8px base unit drives all padding and margins. 
- **Hero Sections:** Utilize full-viewport height (100vh) to showcase motorcycles with minimal UI interference.
- **Whitespace:** Generous top and bottom margins (64px+) are mandatory to create a "luxury gallery" feel, preventing the technical data from feeling cluttered.
- **Grid:** On desktop, a 12-column grid is used. Specifications are often presented in a 2 or 3-column split, while bike galleries utilize asymmetric layouts to suggest movement.

## Elevation & Depth

Depth is created through light simulation rather than traditional drop shadows.

- **Metallic Borders:** Surfaces are defined by 1px solid borders in `#C0C0C0` at 15-20% opacity. This creates a "machined" look.
- **Glassmorphism:** Navigation bars and "floating" spec cards use a `backdrop-filter: blur(20px)` with a semi-transparent dark fill (`rgba(10, 10, 10, 0.7)`).
- **Inner Glows:** To simulate metallic edges, buttons and active cards may use a subtle 1px top-inner-shadow in a lighter silver to mimic overhead showroom lighting.
- **Shadows:** When used, shadows are sharp and concentrated (0px blur), appearing more like a "hard cast shadow" on a concrete floor.

## Shapes

The shape language is **Sharp and Angular**. 

Rounded corners are avoided to maintain the aggressive, aerodynamic aesthetic of racing machinery. 
- **Primary Elements:** 0px radius for all buttons, inputs, and cards.
- **Exceptions:** Very small icons or decorative tags may use a 1px or 2px radius only if necessary for legibility, but the default state is always a "hard edge."
- **Angled Cuts:** Decorative elements may utilize CSS `clip-path` to create 45-degree chamfered corners on section dividers, mimicking motorcycle fairings.

## Components

### Buttons
- **Primary (Racing Red):** Sharp corners, white `Space Grotesk` bold text. On hover, the background transitions to a deeper crimson with a 1px silver border.
- **Secondary (Outline):** 1px Metallic Silver border, transparent background.
- **WhatsApp CTA:** High-visibility green is permitted only for the WhatsApp icon, but the button itself should maintain the design system's Racing Red or Obsidian to stay on-brand.

### Cards & Overlays
- **Product Cards:** No background fill; defined by 1px silver borders. On hover, a subtle `linear-gradient` from the bottom (black to transparent) emerges to elevate the text.
- **Spec Overlays:** Glassmorphic panels with blurred backgrounds to sit over bike photography without obscuring the form.

### Form Inputs
- **Style:** Underlined or fully bordered in silver at low opacity. Active states trigger a 1px Racing Red bottom border.
- **Typography:** `JetBrains Mono` for user input to match the technical theme.

### Interactive Elements
- **Tabs:** Industrial-style toggle switches or underlined text in `Space Grotesk`.
- **Progress Indicators:** Thin, Racing Red lines for image carousels or scroll progress.