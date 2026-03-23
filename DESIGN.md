# Design System: ハイキタイ（Ha-Ikitai）

**Project Type:** Mobile-first responsive web app — Dental clinic discovery portal  
**Reference Model:** サウナイキタイ (sauna-ikitai.com) — a beloved Japanese facility-finder built on community trust, visual browsing, and map-driven exploration  
**Platform:** Next.js 15 + Tailwind CSS + shadcn/ui

---

## 1. Visual Theme & Atmosphere

**Vibe:** Clean, Inviting, Community-Warm, Photo-Forward

The interface feels like walking into a modern dental clinic that smells faintly of mint — not sterile or cold, but reassuringly fresh. There is a deliberate warmth underneath the cleanliness, borrowed from the community-driven coziness of Sauna Ikitai. The design trusts photography as the primary storytelling device; every surface quietly defers to images of real clinic interiors, smiling staff, and bright waiting rooms.

The density is **medium-light** — generous white space between cards keeps browsing relaxed, but information-rich detail pages pack in the specifics patients actually need (hours, specialties, Instagram feeds) without feeling cluttered. The overall rhythm alternates between **browse mode** (airy card grids, horizontal scrolls, map pins) and **deep-dive mode** (dense detail pages with structured data tables and photo galleries).

The aesthetic philosophy can be summarized as: **"Instagram meets Google Maps, designed by a dentist who reads Kinfolk magazine."**

**Do:**
- Let clinic photos dominate every card and page header
- Use rounded, approachable shapes — never sharp or clinical
- Maintain generous vertical rhythm between sections
- Keep the interface feeling personal, not corporate

**Don't:**
- Use stock-photo-feeling imagery or generic medical illustrations
- Create dense, information-overloaded layouts on mobile
- Mix rounded and angular elements in the same component
- Use more than two accent colors on any single screen

---

## 2. Color Palette & Roles

### Primary Palette

- **Fresh Mint Teal** (`#0D9488`) — The heart of the brand. Used for primary action buttons, active navigation states, header accents, and the search button. Conveys the clean freshness of dental care without the coldness of medical blue. Applied sparingly to maintain impact — never used as a background fill for large areas.

- **Soft Teal Glow** (`#5EEAD4`) — A lighter, breezier teal for hover states, active filter chips, progress indicators, and subtle accent borders. Feels like sunlight through sea glass.

- **Deep Teal Anchor** (`#0F766E`) — The darkest teal, reserved for text that needs to carry brand identity — section headings on teal-tinted backgrounds, footer links, and pressed button states.

### Accent Palette

- **Warm Amber Spark** (`#F59E0B`) — The "キニナル！" (I'm curious!) button color and star rating fill. A warm, inviting gold that creates emotional contrast against the cool teal. Used exclusively for user-action moments: favoriting, rating, highlighting.

- **Soft Amber Haze** (`#FDE68A`) — Hover state for amber elements and light badge backgrounds. Gentle enough to nest inside cards without pulling attention from photos.

### Neutral Palette

- **Pure White Canvas** (`#FFFFFF`) — The base background. Cards, modals, and the primary reading surface.

- **Whisper Teal Mist** (`#F0FDFA`) — A barely-there teal wash for alternating sections, card hover states, and the hero background. Creates depth without competing with photos. This is the color you feel more than see.

- **Cool Slate Ink** (`#1E293B`) — Primary body text. Dark enough for crisp readability, warm enough to avoid feeling harsh on white backgrounds.

- **Muted Slate Fog** (`#64748B`) — Secondary text, timestamps, placeholder text, and metadata labels. Recedes politely behind primary content.

- **Light Slate Border** (`#E2E8F0`) — Card borders, divider lines, table rules, and input field outlines. Visible structure that stays invisible emotionally.

- **Pale Slate Surface** (`#F8FAFC`) — Subtle card backgrounds, input fields at rest, and code blocks. Slightly warmer than pure white for layered depth.

### Status Colors

- **Verdant Open** (`#22C55E`) — "営業中" (Now Open) badge. A confident, organic green — not neon, not forest.

- **Warm Closed** (`#EF4444`) — "休診" (Closed) badge. A clear but not alarming red.

- **Gentle Info Blue** (`#3B82F6`) — Informational badges and linked text. Used very sparingly.

---

## 3. Typography Rules

### Font Stack

- **Display & Headings:** `"Zen Maru Gothic"` — A rounded Japanese font with inherent friendliness. Its soft terminals echo the rounded corners throughout the UI. Used for the app title, page headings, clinic names, and any text that needs to feel approachable and distinctly Japanese.

- **Body & UI Text:** `"Noto Sans JP"` — The workhorse Japanese font. Clean, highly legible at small sizes, and neutral enough to support long-form clinic descriptions and review text without personality fatigue.

- **Numeric & Latin:** `"Plus Jakarta Sans"` — A geometric sans-serif with slightly rounded terminals that harmonize with Zen Maru Gothic. Used for ratings, phone numbers, addresses, counts, and any primarily Latin/numeric text.

### Scale & Weight

- **App Title / Hero Heading:** 30px / Zen Maru Gothic Bold (700) — Generous letter-spacing (+0.02em), always paired with a subtitle or search bar.
- **Page Title:** 24px / Zen Maru Gothic Bold (700) — Used once per page, anchoring the content.
- **Section Heading:** 20px / Zen Maru Gothic SemiBold (600) — "人気の歯医者さん," "エリアから探す" etc.
- **Card Title (Clinic Name):** 18px / Zen Maru Gothic Medium (500) — Must remain single-line on mobile; truncate with ellipsis if needed.
- **Body Text:** 16px / Noto Sans JP Regular (400) — Line-height of 1.7 for comfortable Japanese reading.
- **Small Body / Metadata:** 14px / Noto Sans JP Regular (400) — Tags, badges, timestamps, address lines.
- **Caption / Fine Print:** 12px / Noto Sans JP Regular (400) — Auxiliary info, copyright text.
- **Numeric Display (Ratings, Counts):** Plus Jakarta Sans SemiBold (600) — Sized contextually, always paired with a label in Noto Sans JP.

### Typography Rules

- Japanese text never goes below 12px
- Line-height for body Japanese text is always 1.7 or higher
- Headings in Zen Maru Gothic use tighter line-height (1.3)
- Numeric values are always set in Plus Jakarta Sans, even when surrounded by Japanese text
- Never use italic for Japanese text — use color or weight changes for emphasis

---

## 4. Component Stylings

### Buttons

- **Primary Action** (Search, Submit): Fully rounded pill shape (`border-radius: 9999px`). Fresh Mint Teal background, white text. Hover transitions to a slightly darker teal with a whisper-soft lift shadow. Minimum touch target: 48px height.

- **キニナル！ Button** (Favorite): Rounded pill shape. Unfilled state: transparent background with Warm Amber Spark border and text. Filled state: Warm Amber Spark background with white text and a gentle heartbeat scale animation on toggle. Always includes a count number in Plus Jakarta Sans.

- **Secondary / Ghost**: Transparent background, Cool Slate Ink text, Light Slate Border outline. Rounded pill shape. Hover fills with Pale Slate Surface.

- **Filter Chip**: Small pill shape (`border-radius: 9999px`). Default: Pale Slate Surface background, Muted Slate Fog text. Active: Soft Teal Glow background, Deep Teal Anchor text. Chips sit in horizontally scrollable rows on mobile.

### Cards (Clinic Card)

The most important component in the system. Structured as a vertical stack:

1. **Photo Region** (top 60%): Displays Instagram photos in a mini-grid — one large hero image on the left (2/3 width) and two stacked smaller images on the right (1/3 width). If no Instagram photos exist, display a single placeholder image with a subtle gradient overlay and a camera icon. Corner radius: generously rounded top corners only (`border-radius: 16px 16px 0 0`).

2. **Info Region** (bottom 40%): Pure White Canvas background with comfortable internal padding (16px). Contains clinic name (card title weight), area + specialty tags row, rating + review count, and the キニナル count. Corner radius: generously rounded bottom corners (`border-radius: 0 0 16px 16px`).

3. **Overall Card**: Whisper-soft diffused shadow (`box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`). On hover: shadow deepens slightly and card lifts 2px with a 200ms ease transition. Full card is clickable.

### Instagram Gallery (Detail Page)

A 3-column grid with equal square cells and 4px gaps, exactly mirroring Instagram's own profile grid layout. Each cell has generously rounded corners (`border-radius: 12px`). Tapping a cell opens a centered lightbox overlay with the full image, caption text, and a link to the original Instagram post. If the clinic has no Instagram connected, the grid area displays a soft dashed-border placeholder with a camera icon and the text "Instagram投稿がここに表示されます" in Muted Slate Fog.

### Search Bar

A wide, rounded-rectangle input with generous internal padding (14px vertical, 20px horizontal). Light Slate Border at rest, Fresh Mint Teal border on focus with a subtle teal glow ring. The search icon sits inside the input on the left. On mobile, the search bar stretches full-width. On desktop, it is constrained to a comfortable reading width (max 640px) and centered.

### Navigation

- **Bottom Navigation (Mobile):** Fixed to viewport bottom. Pure White Canvas background with a hairline Light Slate Border top edge. Four equally-spaced icon-label pairs: ホーム / さがす / マップ / マイページ. Active state: Fresh Mint Teal icon and label. Inactive: Muted Slate Fog. Icons are 24px with 4px gap to 10px labels. Total bar height: 64px plus safe-area-inset-bottom.

- **Top Header (Desktop):** Sticky. Pure White Canvas background with a whisper-thin bottom border. Logo on the left (🦷 emoji + "ハイキタイ" in Zen Maru Gothic Bold, Fresh Mint Teal). Navigation links centered or right-aligned. Height: 64px.

### Rating Stars

Filled stars use Warm Amber Spark. Empty stars use Light Slate Border fill. Star size: 16px in cards, 20px in detail pages. The numeric rating value appears immediately after the stars in Plus Jakarta Sans SemiBold.

### Tags / Badges

- **Specialty Tags** (一般歯科, 矯正歯科, etc.): Small pill badges. Whisper Teal Mist background, Deep Teal Anchor text. Font size: 12px.
- **Feature Tags** (駐車場, キッズスペース, etc.): Small pill badges. Pale Slate Surface background, Muted Slate Fog text. Font size: 12px.
- **Status Badge** (営業中/休診): Small pill with Verdant Open or Warm Closed background, white text. Font size: 12px, Bold weight.

### Map Pins

Custom marker: a rounded pin shape filled with Fresh Mint Teal, containing a white tooth icon (🦷). Selected pin: scales up 1.2x and gains a Deep Teal Anchor border ring. Pin popups: a mini clinic card that slides up from the bottom of the map on mobile, or appears as a floating card anchored to the pin on desktop.

---

## 5. Layout & Spacing Principles

### Grid System

- **Mobile (< 768px):** Single column. Full-bleed cards with 16px horizontal page margin. Clinic cards stack vertically with 16px gaps.
- **Tablet (768px–1024px):** Two-column card grid with 16px gaps and 24px page margin.
- **Desktop (> 1024px):** Max content width of 1200px, centered. Two or three-column card grid depending on page context. 24px gaps, 32px page margin.

### Spacing Scale

The spacing system uses an 8px base unit with a deliberate preference for generosity:

- `4px` — Hairline: gap between icon and inline label
- `8px` — Tight: internal badge padding, gap between stacked tags
- `12px` — Compact: gap between metadata items in a card
- `16px` — Standard: card internal padding, gap between cards, page horizontal margin on mobile
- `24px` — Comfortable: gap between sections on mobile, page margin on tablet
- `32px` — Generous: gap between major sections on desktop, hero internal padding
- `48px` — Spacious: vertical separation between homepage content blocks
- `64px` — Expansive: hero section top/bottom padding

### Corner Radius Scale

- `4px` — Subtle rounding: table cells, small inputs
- `8px` — Soft rounding: tags, badges, small buttons
- `12px` — Medium rounding: Instagram gallery cells, dialog boxes
- `16px` — Generous rounding: clinic cards, section containers
- `9999px` — Full pill: action buttons, search bar, filter chips

### Shadows & Elevation

The shadow language is quiet and purposeful — never decorative:

- **Level 0 (Flat):** No shadow. Default state for tags, badges, and inline elements.
- **Level 1 (Whisper):** `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` — Clinic cards at rest. Barely perceptible, just enough to lift the card from the background.
- **Level 2 (Hover):** `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)` — Cards on hover, floating search bar on map page. A gentle lift.
- **Level 3 (Overlay):** `0 10px 25px rgba(0,0,0,0.10), 0 6px 10px rgba(0,0,0,0.06)` — Modals, bottom sheets, lightbox overlays. Decisive separation from the page.

### Transitions & Motion

- All interactive state changes: `transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)` — Smooth but snappy.
- Card hover lift: translate Y by -2px with shadow deepening.
- キニナル！ toggle animation: a single heartbeat pulse (scale 1 → 1.15 → 1) over 300ms.
- Bottom sheet / modal entry: slide up from bottom with fade, 300ms ease-out.
- Page transitions: gentle fade between routes, 150ms.
- Filter chip selection: background color fill with a 150ms ease.
- Avoid: bouncy or elastic animations, parallax scrolling, loading spinners that spin for more than 2 seconds.

---

## 6. Iconography

- **Icon Library:** Lucide React — Clean, consistent 24px stroke icons with 1.5px stroke width.
- **Navigation Icons:** Home (house), Search (magnifying glass), Map (map-pin), User (circle-user).
- **Feature Icons:** Use contextual Lucide icons for clinic features — Car (parking), Baby (kids space), Accessibility (barrier-free), Clock (night hours), CreditCard (card payment), Star (specialist), Shield (insurance).
- **Custom Element:** The tooth emoji (🦷) is used as the app's signature mark — in the logo, map pins, and empty states. It is never replaced with a custom SVG; the native emoji adds personality.

---

## 7. Photography & Image Treatment

- **Clinic Hero Images:** Displayed at full-bleed width on mobile, 16:9 aspect ratio on desktop. No filters or overlays applied to user-uploaded/Instagram-sourced photos — authenticity is paramount.
- **Instagram Grid Cells:** Always displayed as 1:1 squares. Object-fit: cover. No rounded corners inside the grid — only the outer grid container has rounded corners.
- **Placeholder Images:** When no photo is available, display a soft gradient (Whisper Teal Mist to Pale Slate Surface) with a centered camera icon in Muted Slate Fog and subtle text: "写真を準備中です."
- **Image Loading:** Use a pulse animation on a Pale Slate Surface rectangle as the loading skeleton. Transition to the actual image with a 200ms fade-in.

---

## 8. Responsive Behavior

- **Mobile-first always.** Design mobile screens first, then expand to tablet and desktop.
- **Bottom navigation** appears only below 768px; above that, header navigation takes over.
- **Cards** are single-column on mobile, two-column on tablet, and optionally three-column on wide desktop.
- **Map page** is full-viewport on all sizes. On mobile, the search bar floats over the map; on desktop, it sits in a sidebar alongside a scrollable list.
- **Clinic detail page** uses a single-column stack on mobile. On desktop, the Instagram gallery and clinic info sit side-by-side in a two-column layout.
- **Touch targets** are never smaller than 44px × 44px on mobile.
- **Font sizes** do not change between breakpoints — the type scale is constant; only layout density and spacing adapt.

---

## 9. Accessibility Commitments

- All interactive elements are keyboard-navigable and have visible focus rings (Fresh Mint Teal, 2px offset).
- Color contrast ratios meet WCAG AA: Cool Slate Ink on Pure White Canvas (13.5:1), Muted Slate Fog on Pure White Canvas (4.6:1), white on Fresh Mint Teal (4.9:1).
- Map pins and photo-dependent content always include text alternatives.
- The キニナル！ button state change is communicated via aria-pressed, not color alone.
- Bottom navigation labels are always visible — icon-only navigation is not used.
