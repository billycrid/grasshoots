## Grasshoots Brand & UI Design System

Grasshoots should present as a modern, friendly technology company built for grassroots sport. The visual identity should be clean and professional, but warmer and more playful than a traditional enterprise SaaS product.

### Brand personality

The visual language should feel:

- Modern
- Friendly
- Community-focused
- Confident
- Simple
- Digital-first
- Playful without becoming childish

Avoid stereotypical sports crests, aggressive mascot styling, generic AI/technology imagery, excessive gradients, neon styling and overly corporate visual language.

## Logo direction

The approved working direction is a wordmark-led identity based on `Grasshoots`.

The double `oo` forms a subtle owl face.

The owl treatment must remain consistent everywhere.

### Owl rules

The owl consists of:

- Two equal circular `o` forms representing the eyes
- Two equal and symmetrical pupils
- A small centred beak beneath the space between the eyes
- No eyebrows
- No aggressive eye angles
- No separate owl head outline
- No feathers or wings
- No Wi-Fi, broadcast or signal lines as part of the core logo

The expression should feel friendly and curious rather than fierce.

The exact geometry will be replaced by professionally produced vector artwork later. Until then, implementations should use the approved placeholder artwork rather than independently redesigning the owl.

### Logo variants to ultimately produce

1. Primary Grasshoots wordmark
2. Primary wordmark + tagline
3. Standalone `oo` owl mark
4. Dark-background version
5. Light-background version
6. Single-colour Ink version
7. Single-colour white version

Working tagline:

**Making noise for grassroots sport**

## Core colour palette

**Ink**  
`#101820`  
Primary dark colour. Used for headings, navigation, primary text and dark branded surfaces.

**Hoot Green**  
`#65C878`  
Primary Grasshoots brand accent. Used for the owl `oo`, selected states, calls to action, branded graphics and highlights.

Do not use white text on Hoot Green. Use Ink (`#101820`) for text placed on Hoot Green.

**Field Green**  
`#246B4A`  
Deeper supporting brand green. Suitable for accessible links, darker green surfaces and secondary actions.

**Signal**  
`#D6F45A`  
High-energy accent used sparingly for notifications, live states, highlights or campaign graphics. It should not dominate normal application UI.

**Chalk**  
`#F5F6F1`  
Warm neutral used as the default page background where appropriate.

**Paper**  
`#FFFFFF`  
Cards, dialogs and elevated application surfaces.

### Supporting UI colours

Default text: `#101820`  
Secondary text: `#5E6870`  
Divider/border: `#DDE3DF`

Semantic error, warning, information and success colours should remain semantic UI colours and should not be forced to use the Grasshoots brand palette where doing so would reduce usability.

## Typography

Primary UI font:

**Manrope**

Fallback stack:

`Manrope, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

General usage:

- Display / hero: 700–800
- Page headings: 700
- Component headings: 600–700
- Body: 400–500
- Buttons: 700
- Labels: 500–600

Buttons and navigation should use normal sentence/title casing. Do not automatically uppercase labels.

## Shape and UI styling

Grasshoots should use moderate rounding rather than highly rounded/bubble UI.

Recommended values:

- Base radius: `12px`
- Buttons: `10px`
- Inputs: `10px`
- Cards: `16px`
- Dialogs: `16px`
- Chips/tags: pill where appropriate

Use subtle borders and minimal shadows. Depth should come primarily from spacing, hierarchy and surface colour rather than large drop shadows.

Base spacing system should follow MUI's standard `8px` spacing unit.

## Iconography

Application icons should use a consistent clean, rounded line style.

Do not mix multiple icon families without a specific reason.

Sport-specific imagery should live in content and supporting illustration rather than changing the core Grasshoots identity.

## Interim brand asset dimensions

Until final SVG artwork is commissioned, prepare placeholder brand assets using the approved owl treatment.

Master standalone owl asset:

`1024 × 1024`

Keep the meaningful owl geometry comfortably inside the centre of the canvas with generous clear space so that the asset can survive circular, rounded-square and maskable cropping.

Required exports:

- `grasshoots-mark.svg` — preferred wherever supported
- `grasshoots-mark-1024.png`
- `grasshoots-mark-512.png`
- `grasshoots-mark-192.png`
- `apple-touch-icon.png` — 180 × 180
- `favicon-32x32.png`
- `favicon-16x16.png`
- maskable PWA icon — 512 × 512

Do not bake rounded-square corners into the master owl artwork. Platform/app icon masks should provide those shapes.

Social profile artwork should use a separate `1080 × 1080` composition rather than simply scaling the favicon.

## Brand architecture

Grasshoots is the master brand.

Sport areas remain underneath the same identity:

- Grasshoots Cricket
- Grasshoots Rugby
- Grasshoots Football

The core Grasshoots logo and owl should not change between sports.

Sport-specific accent colours may be introduced later as configurable theme tokens, but they must not replace or alter the master Grasshoots identity.

Brand, sport and contact configuration must be represented as configurable platform settings rather than hard-coded throughout application components.