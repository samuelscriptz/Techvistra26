# TECHVISTRA ’26: QUANTUM HORIZON
## Master Design System & GSAP ScrollTrigger Animation Blueprint
**2nd National Level Technical Symposium**  
*Organized by the Department of Data Science*

---

## 1. Executive Summary & Creative Vision

### 1.1 The Unified Golden Identity
**TECHVISTRA ’26** is the second edition of the national-level technical symposium organized by the Department of Data Science, following the inaugural *TechVistra ’25 – Tesseract*. For this edition, the visual identity centers on the **Quantum Horizon & Singularity**: a cinematic, architectural, and technically sophisticated digital universe.

The entire website design is unified directly with the **supplied hero video** (`14200651_1920_1080_30fps.mp4`) and the **official symposium logo** (gold and black). There is **no purple or electric-violet transition**. Instead, the website adheres strictly and authentically to the color system inherent in the footage: **radiant gold, warm amber, luminous yellow, deep obsidian black, architectural charcoal, and subtle teal/cyan accents**.

### 1.2 Absolute Chromatic Continuity
The video reveals a symmetrical, perspective-converging futuristic tunnel composed of illuminated volumetric rectangular blocks with glowing seams, converging toward an intense, blinding golden-amber horizon, accented with cool teal/cyan edge data.

By extending this palette across the entire website:
- **Zero Color Clashing:** The hero video, the official gold/black logo, and every downstream section share an identical optical DNA.
- **Cinematic Purity:** The visitor feels as if they never leave the architectural quantum tunnel—each section represents a distinct chamber or telemetry deck within the same golden facility.

---

## 2. Visual Identity & Design System

### 2.1 Unified Color Architecture
The palette is derived directly from the hero footage and the official gold mark:

| Token Name | Hex Code | Visual Role & Usage |
|---|---|---|
| `--color-gold-core` | `#F59E0B` / `#FFC837` | Primary energy mark; bright headings, medals, key CTAs |
| `--color-amber-glow` | `#D97706` / `#F97316` | Warm secondary radiance, progress line glow, active states |
| `--color-yellow-light` | `#FDE047` | Intense focal highlights, spark nodes, coordinate flares |
| `--color-void-obsidian` | `#050507` | Core canvas background; deepest shadow matching video voids |
| `--color-charcoal-deep` | `#0D0E12` | Architectural card surfaces, panel blocks, navigation frost |
| `--color-charcoal-surface`| `#15171E` | Secondary cards, hovered states, input backgrounds |
| `--color-charcoal-border` | `rgba(245, 158, 11, 0.18)` | Subtle glowing hairline borders and structural dividers |
| `--color-teal-accent` | `#0D9488` / `#14B8A6` | Video-native accent; algorithmic telemetry, dates, tags |
| `--color-teal-cyan` | `#06B6D4` / `#22D3EE` | Counterpoint illumination, status indicators, code readouts |
| `--color-starlight` | `#FFFDF5` / `#F8FAFC` | Primary typography; pristine legibility on charcoal surfaces |
| `--color-mist` | `#94A3B8` / `#A1A1AA` | Secondary typography, rules, metadata coordinates |

### 2.2 Typography Hierarchy
- **Display Headlines:** `Space Grotesk` or `Syne` (Weights: 700, 800) — Wide, authoritative, geometric architecture reflecting the rectangular blocks of the hero tunnel.
- **Telemetry & Metadata:** `JetBrains Mono` or `Space Mono` (Weights: 500, 600) — Monospaced technical indicators (`[CHAMBER_01 // COMPETITIVE_ARENAS]`, `[COORD: 42.8N]`).
- **Body & Interactive UI:** `Inter` or `Plus Jakarta Sans` (Weights: 400, 500, 600) — High-legibility sans-serif ensuring effortless scannability across mobile and desktop.

### 2.3 The Quantum Architectural Motif
Rather than chaotic particles or arbitrary gradients, the visual motifs echo the tunnel’s physical structure:
- **Volumetric Block Grids:** Subtle charcoal card geometry framed by hairline gold/amber borders.
- **Teal Telemetry Seams:** Thin horizontal and vertical cyan-teal registration lines (`border: 1px solid rgba(20, 184, 166, 0.25)`).
- **Converging Perspective Rays:** Directional background lines drawing the eye toward the center of key interactions.

---

## 3. Master Section-by-Section GSAP & ScrollTrigger Blueprint

```
+-----------------------------------------------------------------------------------------+
|                                    PRELOADER (0.0s - 2.2s)                              |
|     Obsidian Canvas -> Gold Singularity -> Amber Pulse -> Vertical Shutter Wipe         |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
| 1. HERO PAGE & NAV BAR                                                                  |
|    - Video: Scrubbed 1080p Gold Perspective Tunnel (Native Unaltered Colors)            |
|    - Pin: `+=250%` | Scrub: `1.0`                                                       |
|    - Bridge: Tunnel Bloom -> Architectural Charcoal & Amber Horizon                     |
|    - Nav: Charcoal Glass (`blur(16px)`, border: `rgba(245,158,11,0.2)`)                 |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Continuous Perspective Flow)
+-----------------------------------------------------------------------------------------+
| 2. EVENTS                                                                               |
|    - Layout: Desktop Horizontal Pinned Rail | Mobile: Vertical Adaptive Stack           |
|    - Pin: `+=300%` (Desktop) | Scrub: `0.8`                                             |
|    - Animation: `xPercent: -75%`, 3D Card Yaw (`rotateY: 8deg -> 0deg`), Gold Edge Glow |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Volumetric Gate Handoff)
+-----------------------------------------------------------------------------------------+
| 3. INDIVIDUAL EVENT TEMPLATE                                                            |
|    - Reusable dynamic modal/route for deep event specifications                         |
|    - Trigger: `top 80%` | Entrance: Gold Iris `clip-path` Expand, Staggered Specs        |
|    - Sticky Action Bar: Unhides upon passing hero fold                                  |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Clean Architectural Transition)
+-----------------------------------------------------------------------------------------+
| 4. ABOUT                                                                                |
|    - Layout: Asymmetric 2-Column Editorial Grid                                         |
|    - Trigger: `top 75%` | `toggleActions: "play none none reverse"`                     |
|    - Kinetic Headline Reveal + Parallax Golden Gyro Core (`y: -50 -> +50`)              |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Amber Hairline Expansion)
+-----------------------------------------------------------------------------------------+
| 5. PARTNERS                                                                             |
|    - Layout: Tiered Grid (Academic, Industry, Tech Sponsors `[TBC]`)                    |
|    - Trigger: `top 80%` | Stagger: `0.06s` | Scale: `0.88 -> 1.0`                       |
|    - Strict Compliance: Genuine unconfirmed badges; no invented marks                   |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Warm Gold Spotlight Bridge)
+-----------------------------------------------------------------------------------------+
| 6. GUESTS & SPEAKERS                                                                    |
|    - Layout: Dignitary Spotlight Showcase `[TBC]`                                       |
|    - Trigger: `top 70%` | Monochromatic to Golden Warmth & Teal Rim Lighting            |
|    - Mobile: Touch Snap-Carousel with Inertia                                           |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Horizon Frame Pinch)
+-----------------------------------------------------------------------------------------+
| 7. GALLERY                                                                              |
|    - Layout: Pinned Horizontal Panoramic Rail (Techvistra Retrospective)               |
|    - Pin: `+=220%` (Desktop) | Scrub: `1.0`                                             |
|    - Parallax: Image Internal Counter-Scroll (`scale: 1.15 -> 1.0`), Gold Glass Caption|
|    - Mobile: 2-Column Responsive Staggered Masonry                                      |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Symmetrical Curtain Reveal)
+-----------------------------------------------------------------------------------------+
| 8. CONTACT                                                                              |
|    - Layout: High-Contrast 2-Column Coordinator Desk & Interactive Inquiry Form         |
|    - Trigger: `top 75%` | Animated Amber SVG Underline Vector Sweep                     |
|    - High Accessibility: Instant touch dialing & direct institutional routing          |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Teal & Gold Telemetry Connection)
+-----------------------------------------------------------------------------------------+
| 9. SCHEDULE                                                                             |
|    - Layout: Dual-Track Chronological Timeline                                          |
|    - Trigger: `top 65%` | Pin: `false` | Scrub: `0.5`                                   |
|    - Central Gold Progress Beam: `scaleY: 0 -> 1` scrubbed to scroll | Amber Pulse Node |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v (Singularity Horizon Flattening)
+-----------------------------------------------------------------------------------------+
| 10. FOOTER                                                                              |
|     - Layout: Departmental Closure & Navigation Hub                                     |
|     - Trigger: `top 90%` | Perspective Lines Resolve into a Flat Gold Horizon Line      |
|     - Typography Drift (`y: 30 -> 0`) & Unmistakable External Registration Route        |
+-----------------------------------------------------------------------------------------+
```

---

### Section 1: Hero Page and Nav Bar

#### Visual Setup & Framing
- **Background Layer:** The full-resolution gold tunnel video (`14200651_1920_1080_30fps.mp4`), rendered via a `<video>` element with `object-fit: cover` inside a fixed 100vh viewport container.
- **Center Horizon Protection Scrim:** The footage features a piercing gold vanishing point in the exact screen center. To protect typography without washing out the video, apply an optical radial vignette:
  ```css
  background: radial-gradient(circle at 50% 50%, rgba(5,5,7,0.08) 0%, rgba(5,5,7,0.48) 55%, rgba(5,5,7,0.92) 100%);
  ```
- **Text Placement:** All text elements are positioned in the upper and lower margins, maintaining the central golden horizon tunnel completely unobstructed:
  - **Upper Center:** Department & Edition badge: `DEPARTMENT OF DATA SCIENCE PRESENTS`
  - **Central Flanks:** Large Display Title: `TECHVISTRA ’26` with secondary descriptor `QUANTUM HORIZON`
  - **Lower Flanks:** Event metadata indicators: `2ND NATIONAL LEVEL TECHNICAL SYMPOSIUM` | `[EVENT DATES TBC]` | `[VENUE TBC]` (with teal coordinate badges)
  - **Lower Center:** Primary CTA: `[REGISTER ON OFFICIAL PORTAL]` and animated amber scroll indicator.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#hero-container`
- **Start / End:** `start: "top top"`, `end: "+=250%"`
- **Pin:** `true` (pins the entire hero stage while scroll scrubs the timeline)
- **Scrub:** `1.0` (smooth 1-second lag for fluid cinematic feel)
- **Anticipate Pin:** `1`

#### Detailed Timeline Sequence (Scrub Progress `0.00` to `1.00`)
1. **Stage 1 (Progress `0.00` - `0.25`) — Video Ingestion & Hero Title Hold:**
   - Video `currentTime` scrubs from `0.0s` to ~35% of total video duration.
   - Initial Hero elements rest in full view (`opacity: 1`, `scale: 1.0`).
   - Scroll indicator cue gently fades out: `y: 0 → 20px`, `opacity: 1 → 0` (progress `0.05 → 0.12`).
2. **Stage 2 (Progress `0.25` - `0.60`) — Kinetic Handoff & Typography Departure:**
   - Upper metadata badge splits and lifts: `y: 0 → -60px`, `opacity: 1 → 0`.
   - Main title `TECHVISTRA` splits outward: Left block `x: 0 → -80px`, `opacity: 1 → 0`; Right block `x: 0 → +80px`, `opacity: 1 → 0`.
   - Subtitle `QUANTUM HORIZON` scales forward toward the viewer: `scale: 1.0 → 1.35`, `filter: blur(0px) → blur(10px)`, `opacity: 1 → 0`.
3. **Stage 3 (Progress `0.55` - `0.90`) — The Architectural Tunnel Handoff (No Purple):**
   - The video continues scrubbing toward its luminous vanishing point.
   - An architectural atmospheric overlay (`.hero-depth-veil`) smoothly blends the scene into the charcoal and gold background:
     - `opacity: 0.0 → 1.0`
     - CSS property: `background: radial-gradient(ellipse at 50% 60%, rgba(245, 158, 11, 0.2) 0%, rgba(13, 14, 18, 0.88) 65%, #050507 100%)`
     - Blend mode: `normal`.
   - The radiant gold vanishing point naturally softens and transitions into the deep obsidian-charcoal floor of Section 2.
4. **Stage 4 (Progress `0.85` - `1.00`) — Arrival of the Symposium Insignia:**
   - The authoritative Techvistra symposium logo (supplied gold & black mark, cleanly isolated on a logo-safe glass disk) scales into view:
     - `scale: 0.75 → 1.0`, `opacity: 0 → 1`, `filter: drop-shadow(0 0 35px rgba(245, 158, 11, 0.5))`
   - Tagline reveals beneath logo: `ENTER THE HORIZON. OPTIMIZE THE FUTURE.` (`y: 20 → 0`, `opacity: 0 → 1`).
   - Pin releases cleanly at `1.00`, handing off directly into Section 2 (Events).

#### Nav Bar Architecture & Animation
- **Initial State (Hero Top):** Fixed top, 100% width, height `80px`. Completely transparent background (`rgba(5,5,7,0)`), zero border, pure starlight-white typography with subtle drop-shadow.
- **ScrollTrigger Setup for Navbar:**
  - `trigger: "body"`, `start: "100px top"`, `end: "180px top"`, `scrub: 0.3`
- **Morphed State (Scrolled):**
  - Background morphs into frosted charcoal: `backdrop-filter: blur(16px)`, `background: rgba(13, 14, 18, 0.82)`.
  - Border reveals on bottom: `border-bottom: 1px solid rgba(245, 158, 11, 0.22)`.
  - Height condenses: `80px → 68px`.
  - Active Section Indicator: A floating radiant-gold pill moves along the X-axis behind the active nav item using `gsap.to(navPill, { x: targetLeft, width: targetWidth, duration: 0.4, ease: "power2.out" })`.
- **Registration CTA Button in Navbar:**
  - High-contrast gold pill styling: `linear-gradient(135deg, #F59E0B, #D97706)` with dark obsidian text (`#050507`) for maximum punch and instant legibility.
  - Hover: Micro-scale `1.0 → 1.05`, `box-shadow: 0 0 20px rgba(245, 158, 11, 0.6)`.
- **Mobile Menu Curtain Animation:**
  - Hamburger toggle triggers a full-screen GSAP overlay timeline:
  - Menu background expands via circular clip-path: `clip-path: circle(0% at calc(100% - 40px) 40px) → circle(150% at calc(100% - 40px) 40px)` in `0.5s` with `ease: "power3.inOut"`.
  - Background is deep charcoal `#0D0E12` with subtle golden gridlines.
  - Nav links cascade in with a staggered text reveal: `y: 40 → 0`, `opacity: 0 → 1`, `stagger: 0.08`.

---

### Section 2: Events

#### Concept & Layout
The events section introduces the symposium’s competitions, hackathons, and technical tracks. On desktop, this is structured as a **pinned horizontal card journey**, where the visitor travels laterally through deep architectural chambers echoing the rectangular blocks of the hero video.

#### Desktop GSAP ScrollTrigger Configuration
- **Container Structure:** Outer `.events-pin-stage` wrapping an inner horizontally translating track `.events-rail`.
- **Trigger Element:** `.events-pin-stage`
- **Start / End:** `start: "top top"`, `end: () => "+=" + (document.querySelector(".events-rail").scrollWidth - window.innerWidth + 400)` (approx. `+=300%`)
- **Pin:** `true` | **Scrub:** `0.8` | **InvalidateOnRefresh:** `true`

#### Animation Choreography
1. **Section Heading Anchor:** The section title (`[CHAMBER_01 // COMPETITIVE ARENAS]`) remains pinned at the top-left corner, accompanied by a dynamic numeric counter (`01 / 06` to `06 / 06`) that updates based on scroll progress.
2. **Horizontal Rail Translation:**
   - `.events-rail`: `x: 0 → -(railWidth - window.innerWidth)` smoothly scrubbed across the scroll distance.
3. **Card Arrival & 3D Parallax Dynamics:**
   - Perspective wrapper: `perspective: 1200px`.
   - Card rotation: `rotateY: 10deg → 0deg` (settling flat as it reaches screen center).
   - Card scale: `0.90 → 1.0`.
   - Card opacity: `0.35 → 1.0`.
   - **Card Aesthetics:** Deep charcoal glass surfaces (`#15171E`), glowing amber hairline border (`border: 1px solid rgba(245, 158, 11, 0.3)`), teal category badge (`#14B8A6`).
   - **Internal Parallax:** The artwork inside each card has a negative counter-translation: `x: -50px → +50px`.
4. **Card Data Attributes (Strictly Genuine Placeholders):**
   - Track categories: *Technical Coding, AI & Data Science Hackathon, Paper Presentation, Web3 & Cloud, Non-Technical / Gaming* `[To be confirmed by Department of Data Science]`.
   - Each card displays category, event code, team size, prize pool placeholder (`[PRIZE POOL TBC]`), and an "Inspect Track" button.

#### Mobile Alternative (No Long Pin Traps)
- Handled via `ScrollTrigger.matchMedia({ "(max-width: 768px)": ... })`.
- Horizontal pinning is disabled. Converted into an ergonomic vertical card stack with lightweight individual triggers:
  - `start: "top 85%"`, `toggleActions: "play none none reverse"`
  - `y: 45 → 0`, `opacity: 0 → 1`, `duration: 0.6`, `ease: "power2.out"`.

---

### Section 3: Individual Event Page (Reusable Modal / Dynamic Route Blueprint)

#### Concept & Architectural Role
When a visitor clicks "Inspect Track" on any event card, this reusable blueprint renders the deep technical brief for that specific event. It functions either as an animated full-screen modal overlay or a standalone dedicated route (`/events/:slug`).

#### Layout Architecture
- **Header Banner:** Teal category tag, event title (`[EVENT TITLE TBC]`), and short punchy thesis.
- **Visual Centerpiece:** 3D Holographic event artwork container with an interactive cursor tilt effect.
- **Two-Column Specifications Grid:**
  - *Column A (Event Specs):* Eligibility, Team Size, Registration Fee `[TBC]`, Duration, Venue/Lab `[TBC]`.
  - *Column B (Rounds & Criteria):* Round 1 (Screening), Round 2 (Implementation), Judging Matrix, Faculty & Student Coordinators `[TBC]`.
- **Bottom Persistent Action Bar:** Prize pool highlight (`[PRIZE POOL TBC]`) and high-visibility external registration button.

#### Exact GSAP Animation Plan
- **Page / Modal Enter Timeline (`duration: 0.7s`, `ease: "power3.out"`):**
  - Backdrop fade: `opacity: 0 → 1` with `backdrop-filter: blur(0px) → blur(24px)`.
  - Artwork container iris wipe: `clip-path: circle(0% at center) → circle(100% at center)` (`duration: 0.8s`).
  - Event title entrance: Staggered split-text words `y: 50 → 0`, `opacity: 0 → 1`, `stagger: 0.05`.
  - Specification cards: Staggered upward slide `y: 30 → 0`, `opacity: 0 → 1`, `stagger: 0.08`.
- **Sticky Registration Action Bar:**
  - Linked to scroll trigger: When user scrolls past the top header, the bottom bar floats into view:
    - `trigger: ".event-details-grid"`, `start: "top 30%"`, `toggleActions: "play none none reverse"`
    - `y: 100% → 0%`, `duration: 0.4s`, `ease: "power2.out"`.
    - Clear label: `REGISTER FOR THIS EVENT ON OFFICIAL PORTAL ->`

---

### Section 4: About

#### Concept & Narrative Structure
The About section contextualizes **TECHVISTRA ’26** and the **Department of Data Science**. It conveys academic rigor, algorithmic precision, and the spirit of national competition.

#### Layout Architecture
- **Asymmetric 2-Column Editorial Grid:**
  - **Left Column (60%):** Large kinetic statement typography: *"AT THE INTERSECTION OF COMPUTATIONAL POWER, HIGH-DIMENSIONAL DATA, AND HUMAN PURPOSE."* followed by 2 concise paragraphs describing the symposium’s mission `[EVENT SUMMARY TBC]`.
  - **Right Column (40%):** A floating, interactive **Golden Gyroscope Core** (nested SVG gold and teal vector rings rotating continuously at varied orbital speeds).

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#about-section`
- **Start / End:** `start: "top 75%"`, `end: "bottom 30%"`
- **Pin:** `false` | **ToggleActions:** `"play none none reverse"`

#### Animation Sequence
1. **Section Coordinate Tag:** `[CHAMBER_02 // SYMPOSIUM_GENESIS]` sweeps in with horizontal letter-spacing contraction: `letter-spacing: 0.35em → 0.15em`, `opacity: 0 → 1` in `0.5s`.
2. **Kinetic Headline Reveal:** SplitText line-masking:
   - Each line wrapped in an `overflow: hidden` span.
   - `yPercent: 120 → 0`, `duration: 0.8s`, `stagger: 0.12`, `ease: "power3.out"`.
3. **Body Paragraphs:** Smooth vertical rise: `y: 35 → 0`, `opacity: 0 → 1`, `duration: 0.7s`, `delay: 0.3s`.
4. **Golden Gyroscope Core Parallax Scrub:**
   - Linked to scrub: `start: "top bottom"`, `end: "bottom top"`, `scrub: 1.2`
   - Emblem translation: `y: -60px → +60px`
   - Ring rotation: Outer gold ring `rotate: 0deg → 180deg`; Inner teal ring `rotate: 0deg → -240deg`.
5. **Section Handoff to Partners:**
   - At the bottom of the section, a horizontal hairline divider expands outwards from center: `scaleX: 0 → 1`, `background: linear-gradient(90deg, transparent, #F59E0B, transparent)`.

---

### Section 5: Partners

#### Concept & Categorization
The Partners section acknowledges institutional patronages, industrial collaborators, technical community sponsors, and media partners.

#### Strict Placeholder Rule
> **Directorial Rule:** Absolutely zero fake company logos or fictitious corporate marks are permitted. Every category uses clearly demarcated slot frames with `[PARTNER IDENTIFIER TO BE CONFIRMED BY ORGANIZERS]`.

#### Layout Architecture
- **Tiered Grid Presentation:**
  - *Tier 1 (Patronage & Academic Partners):* 2 prominent widescreen card slots.
  - *Tier 2 (Industry & Hackathon Sponsors):* 4 balanced square card slots.
  - *Tier 3 (Community & Media Collaborators):* 6 compact badge slots.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#partners-section`
- **Start / End:** `start: "top 80%"`, `end: "bottom 40%"`
- **Pin:** `false` | **ToggleActions:** `"play none none reverse"`

#### Animation Choreography
1. **Header & Category Pill Reveal:**
   - Title `OUR PATRONS & PARTNERS` reveals with `y: 30 → 0`, `opacity: 0 → 1` in `0.6s`.
2. **Staggered Logo Slot Cascade:**
   - All partner slots animated with an orchestrated stagger:
   - `scale: 0.88 → 1.0`, `y: 25 → 0`, `opacity: 0 → 1`, `stagger: 0.06`, `duration: 0.5s`, `ease: "back.out(1.4)"`.
3. **Hover Micro-Interactions:**
   - Card border illuminates with golden ray: `border-color: rgba(245, 158, 11, 0.8)`, `box-shadow: 0 0 25px rgba(245, 158, 11, 0.25)`.
4. **Handoff to Guests:**
   - Ambient background lighting narrows down into individual warm gold spotlight chambers.

---

### Section 6: Guests

#### Concept & Layout
Dedicated to keynote speakers, chief guests, industry luminaries, and session chairs presiding over the symposium.

#### Strict Placeholder Rule
> **Directorial Rule:** Do not fabricate guest names, titles, or photos. Use high-concept silhouette placeholders labeled `[DIGNITARY NAME & DESIGNATION TO BE CONFIRMED]`.

#### Layout Architecture
- **3-Column Dignitary Showcase (Desktop):**
  - High-aspect-ratio (3:4) portrait cards.
  - Monochromatic base image with a warm golden rim light and teal credential tags.
  - Name plate, Designation, Institution/Organization badge, and Topic of Address placeholder.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#guests-section`
- **Start / End:** `start: "top 72%"`, `end: "bottom 30%"`
- **Pin:** `false` | **ToggleActions:** `"play none none reverse"`

#### Animation Sequence
1. **Section Title & Track Intro:**
   - Subtitle `[HONORED DIGNITARIES & GUEST SPEAKERS]` fades in: `y: 20 → 0`, `opacity: 0 → 1`.
2. **Card Arrival Sequence:**
   - Cards cascade into view with an upward dimensional emergence:
   - `y: 80 → 0`, `opacity: 0 → 1`, `stagger: 0.15`, `duration: 0.8s`, `ease: "power3.out"`.
3. **Scroll-Triggered Image Illumination:**
   - As each card enters the center reading zone:
   - Image filter shifts: `filter: grayscale(100%) brightness(0.8) → grayscale(0%) brightness(1.0)`.
   - Rim-light flare: Overlaid SVG border glows with warm amber: `opacity: 0 → 1`, `box-shadow: 0 0 30px rgba(245, 158, 11, 0.35)`.
4. **Mobile Adaptations:**
   - Transforms into a smooth touch-swipe snap-carousel with pagination dots.

---

### Section 7: Gallery

#### Concept & Retrospective Journey
The Gallery serves as the visual proof of symposium prestige, featuring curated photographs from *TechVistra ’25 – Tesseract* and Department of Data Science milestone events.

#### Desktop GSAP ScrollTrigger Configuration (Pinned Horizontal Image Rail)
- **Trigger Element:** `.gallery-pin-container`
- **Start / End:** `start: "top top"`, `end: "+=220%"`
- **Pin:** `true` | **Scrub:** `1.0` | **Anticipate Pin:** `1`

#### Detailed Animation Blueprint
1. **Horizontal Rail Translation:**
   - Rail `.gallery-track`: `xPercent: 0 → -65%` smoothly scrubbed across scroll progress.
2. **Inner Image Lens Parallax:**
   - Each gallery image is wrapped in an `overflow: hidden` architectural frame.
   - Internal image scale: `scale: 1.20 → 1.00` as it traverses from right to left.
   - Contrast/Brightness dynamic: `filter: brightness(0.7) → brightness(1.0) → brightness(0.7)` peaking when the image is centered.
3. **Kinetic Caption Emergence:**
   - Floating dark charcoal glass captions (`[SYMPOSIUM ARCHIVE // TECHVISTRA ’25]`) with amber borders track the image with a subtle delayed drift: `x: 30px → 0px`, `opacity: 0.4 → 1.0`.
4. **Exit Handoff:**
   - At progress `0.90 → 1.00`, the rail fades slightly (`opacity: 1.0 → 0.2`) as an architectural gate closes inward, smoothly releasing the pin into the Contact section.

#### Mobile Alternative
- Pinned horizontal scrolling is disabled on devices under 768px.
- Replaced with a **2-Column Responsive Staggered Masonry Grid**:
  - `trigger: imageCard`, `start: "top 85%"`, `y: 40 → 0`, `opacity: 0 → 1`, `duration: 0.6s`.

---

### Section 8: Contact

#### Concept & Usability Focus
The Contact section balances architectural brilliance with flawless, pragmatic utility. It enables attendees, faculty advisors, and institutional representatives to reach coordinators immediately without friction.

#### Layout Architecture
- **2-Column Usability Split:**
  - **Left Column (Direct Channels):**
    - Head of Department & Faculty Coordinator Details `[NAMES & CONTACTS TBC]`.
    - Student Symposium Secretaries & Tech Leads `[NAMES & PHONE TBC]`.
    - Official Department Email `[EMAIL TBC]` with one-click copy button.
    - Venue Campus Address & Interactive Map Link `[VENUE DETAILS TBC]`.
  - **Right Column (Quick Inquiry Form):**
    - Streamlined fields: Name, College/Institution, Email, Query Category, Message.
    - Submit Button with animated gold beam feedback.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#contact-section`
- **Start:** `"top 75%"` | **ToggleActions:** `"play none none reverse"`

#### Animation Sequence
1. **Section Heading & Direct Lines:**
   - Title `GET IN TOUCH // COORDINATION DESK` reveals with `y: 30 → 0`, `opacity: 0 → 1` in `0.5s`.
2. **SVG Hairline Sweep:**
   - Under each contact channel, a radiant gold accent line draws itself across: `scaleX: 0 → 1` (`transform-origin: left`, `duration: 0.6s`, `stagger: 0.1s`).
3. **Form Elements Stagger:**
   - Input containers slide into place: `y: 25 → 0`, `opacity: 0 → 1`, `stagger: 0.08`, `ease: "power2.out"`.
4. **Usability Guarantee:**
   - All email addresses use valid `mailto:` protocols; phone numbers use direct `tel:` links.
   - High keyboard accessibility: Clear `2px solid #F59E0B` focus rings on all interactive fields.

---

### Section 9: Schedule

#### Concept & Scannability
The Schedule organizes the symposium day into an effortless, chronologically intuitive timeline.

#### Layout Architecture
- **Timeline Structure:**
  - Track Filter Toggle at top: `[ALL TRACKS]` | `[KEYNOTES]` | `[COMPETITIONS]` | `[WORKSHOPS]`.
  - Central Vertical Progress Line running down the center of the viewport (desktop) or along the left margin (mobile).
  - Alternating Schedule Event Blocks (Left / Right on desktop; single-column on mobile).
  - Time badge, Event Title, Venue/Lab location, and Session Status tag (teal badge) `[ALL DETAILS TBC]`.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `#schedule-section`
- **Start / End:** `start: "top 65%"`, `end: "bottom 80%"`
- **Pin:** `false` | **Scrub:** `0.5`

#### Animation Choreography
1. **Vertical Progress Beam Scrub:**
   - The central vertical line is an SVG path with a radiant gold-to-amber gradient glow:
   - `scaleY: 0 → 1` (`transform-origin: top`), scrubbed synchronously with the visitor’s scroll progression through the section.
2. **Timeline Node Activation:**
   - Circular gold nodes mark each schedule item along the vertical line.
   - As the vertical progress beam reaches each node:
     - Node circle expands: `scale: 0.5 → 1.2 → 1.0`.
     - Glow burst: `box-shadow: 0 0 20px #F59E0B`.
     - Corresponding event card slides in:
       - Left-side cards: `x: -40 → 0`, `opacity: 0 → 1`, `duration: 0.5s`.
       - Right-side cards: `x: +40 → 0`, `opacity: 0 → 1`, `duration: 0.5s`.
3. **Current / Active Session Indicator:**
   - Pulsing amber beacon dot indicating active live sessions.
4. **Mobile Behavior:**
   - Single-column left-aligned timeline. Central line moves to `left: 24px`; all cards align to the right with simple upward reveals.

---

### Section 10: Footer

#### Perspective Horizon Resolution & Layout
- **Visual Motif Resolution:** The perspective tunnel geometry resolves into a single, peaceful, radiant horizontal golden horizon line across the screen bottom (`scaleX: 0.1 → 1.0`, `opacity: 0 → 1` in `0.8s`). This symbolizes reaching the horizon of knowledge and concluding the symposium journey.
- **Layout:**
  - Department of Data Science emblem and institutional affiliations.
  - Final invitation: *"THE QUANTUM HORIZON IS YOURS TO CONQUER."*
  - Persistent, prominent **Register on Official Portal** CTA button.
  - 4-Column Navigation Hub: Symposium Links, Technical Tracks, Downloads (Brochure / Rulebook `[TBC]`), Legal & Privacy.
  - Copyright notices, student developer & designer credits, anti-ragging disclaimers.

#### Exact GSAP ScrollTrigger Configuration
- **Trigger Element:** `footer`
- **Start / End:** `start: "top 90%"`, `end: "bottom bottom"`
- **ToggleActions:** `"play none none reverse"`
- **Animation:** Footer columns lift in sequence: `y: 30 → 0`, `opacity: 0 → 1`, `stagger: 0.08s`, `duration: 0.6s`.

---

### Section 11: Preloader

#### Visual Composition & Sequence (`0.0s` to `2.2s` Max)
- Deep obsidian background (`#050507`).
- Central gold singularity dot matching the vanishing point of the incoming tunnel video.
- Encircling amber and teal orbital rings.
- Numerical telemetry counter (`00% → 100%`).
- **Stage 1 (`0.0s - 0.9s`):** Singularity dot pulses (`scale: 0 → 1.4 → 1.0`). Encircling gold ring spins (`rotate: 0deg → 720deg`). Counter counts from `00` to `100`.
- **Stage 2 (`0.9s - 1.5s`):** Singularity flashes gold (`filter: drop-shadow(0 0 40px #FFC837)`), ring expands outward (`scale: 1.0 → 2.8`, `opacity: 1 → 0`).
- **Stage 3 (`1.5s - 2.1s`): Shutter Reveal:** Screen splits vertically via clip-path (`polygon`), instantly presenting the Hero video already playing in paused standby at frame 0.
- **Reduced Motion & Speed Failsafe:** Immediately fades out (`0.3s` crossfade) if `prefers-reduced-motion` is active or if assets load ahead of time.

---

## 4. Continuous Cinematic Handoff Matrix (Gold & Charcoal Palette)

| From Section | To Section | Transition Mechanism | Visual Effect & Coordinate Handoff |
|---|---|---|---|
| **Preloader** | **Hero** | Vertical Shutter Split | Singularity dot matches exact horizon center of gold video. |
| **Hero** | **Events** | Atmospheric Depth Veil & Pin Release | Gold tunnel bloom dissolves into dark charcoal chamber; logo holds then unpins into horizontal rail. |
| **Events** | **About** | Lateral-to-Vertical Dimensional Gate | Final event card scales slightly; background deepens from rail into full-bleed editorial canvas. |
| **About** | **Partners** | Expanding Center Hairline | Radiant gold hairline sweeps across (`scaleX: 0 -> 1`), opening the partner showcase tier. |
| **Partners** | **Guests** | Spotlight Vignette Darkening | Ambient background lighting narrows down into individual dignitary spotlight chambers. |
| **Guests** | **Gallery** | Horizontal Gate Unpin | Dignitary grid concludes; viewport pins into horizontal retrospective image rail. |
| **Gallery** | **Contact** | Architectural Iris Pinch | Horizontal rail slows and shrinks slightly; contact desk slides up seamlessly from bottom fold. |
| **Contact** | **Schedule** | Hairline Telemetry Vector | Vertical gold/teal line from contact channels connects directly into the top of the schedule timeline. |
| **Schedule** | **Footer** | Singularity Horizon Flattening | Perspective geometry resolves outward, flattening into a calm, infinite golden footer baseline. |

---

## 5. External Registration Portal Strategy & State Handling

### 5.1 Architecture & Single Source of Truth
The event website **does not collect or store sensitive attendee registration data directly**. All registration actions route cleanly to an official external portal.

```ts
export const symposiumConfig = {
  name: "Techvistra Quantum Horizon",
  edition: "Techvistra ’26",
  organizer: "Department of Data Science",
  // REGISTRATION CONFIGURATION
  registrationUrl: "[OFFICIAL_EXTERNAL_REGISTRATION_PORTAL_URL_TBC]",
  registrationState: "NOT_OPEN_YET" as "NOT_OPEN_YET" | "OPEN" | "CLOSING_SOON" | "CLOSED",
  registrationOpenDate: "[REGISTRATION_OPEN_DATE_TBC]",
  registrationCloseDate: "[REGISTRATION_CLOSE_DATE_TBC]",
};
```

### 5.2 User Experience Across Lifecycle States
1. **State: `NOT_OPEN_YET` (Pre-Launch Period):**
   - **CTA Button Label:** `REGISTRATION OPENS SOON`
   - **Click Behavior:** Opens a sleek glassmorphic charcoal modal:
     - *"Registrations for Techvistra ’26 will officially open on `[DATE TBC]`. Follow our official channels for the direct portal link."*
     - Includes a live countdown clock targeting the launch timestamp.
2. **State: `OPEN` (Active Registration Window):**
   - **CTA Button Label:** `REGISTER ON OFFICIAL PORTAL ↗`
   - **Click Behavior:** Launches the official portal URL in a secure new tab (`target="_blank" rel="noopener noreferrer"`).
3. **State: `CLOSING_SOON` (Final 48 Hours):**
   - **CTA Button Label:** `LAST CHANCE TO REGISTER ↗`
   - **Visual Cue:** Animated pulsing amber border around all registration buttons.
4. **State: `CLOSED` (Post-Deadline):**
   - **CTA Button Label:** `REGISTRATIONS CLOSED`
   - **Click Behavior:** Button is disabled (`pointer-events: none`, opacity `0.6`); badge shows: *"Registration deadline reached. For spot-entry queries, consult the contact desk."*

---

## 6. Technical Architecture, Mobile Responsiveness, Accessibility & Performance

### 6.1 Recommended Tech Stack
- **Framework:** React 19 + TypeScript + Vite (Lightning-fast client bundle, strict type safety).
- **Animation Suite:** GSAP 3.12+ (Core, `ScrollTrigger`, `Flip`, `SplitText` fallback via pure CSS/JS).
- **Styling Architecture:** CSS Modules with CSS Custom Properties (zero-runtime style overhead, strict token enforcement, complete responsive control).
- **Iconography:** Lucide React (Clean, modern geometric strokes, tree-shakeable).
- **Deployment Target:** Cloudflare Pages, Vercel, or Netlify (High-speed edge static hosting).

### 6.2 Concise Component Tree Architecture
```text
src/
├── assets/
│   ├── videos/
│   │   ├── hero-tunnel-master.mp4       # Native gold footage (unmodified)
│   │   └── hero-tunnel-poster.webp      # Instant fallback poster
│   ├── images/
│   │   ├── techvistra-logo.png          # Official gold/black symposium mark
│   │   └── placeholders/                # High-res silhouetted placeholders
├── components/
│   ├── Preloader/                       # Gold singularity counter & shutter wipe
│   ├── Navbar/                          # Frosted charcoal morph bar & mobile menu
│   ├── Hero/                            # Pinned video scrub & architectural handoff
│   ├── Events/                          # Pinned horizontal rail (desktop) / Stack (mobile)
│   ├── EventModal/                      # Reusable deep specification template
│   ├── About/                           # Asymmetric editorial grid & gyroscope core
│   ├── Partners/                        # Categorized partner slot matrix
│   ├── Guests/                          # Dignitary spotlight cards & warm rim lighting
│   ├── Gallery/                         # Pinned retrospective image rail
│   ├── Contact/                         # Coordination desk & validated inquiry form
│   ├── Schedule/                        # Scrubbed vertical gold progress beam & timeline
│   └── Footer/                          # Horizon flattening & institutional credits
├── config/
│   └── symposiumConfig.ts               # Single source of truth (all TBC constants)
└── styles/
    ├── variables.css                    # Color tokens (gold/charcoal/teal), typography
    └── global.css                       # Reset, noise textures, smooth scroll
```

### 6.3 Mobile Adaptations & Accessibility
- **No Mobile Pin Traps:** Horizontal pin triggers on Events and Gallery convert to vertical flow on viewports `< 768px`.
- **WCAG 2.2 AA Contrast Compliance:** Text on charcoal surfaces achieves contrast ratios `> 10:1`.
- **Reduced Motion Support:** When `prefers-reduced-motion` is active, pinning is skipped and replaced with standard smooth crossfades; video is replaced with the high-resolution poster.

---

## 7. Master Phased Build Checklist

| Phase | Milestone Name | Concrete Deliverables & Verification Gates |
|---|---|---|
| **Phase 1** | **Foundation & Tokens** | - Scaffold Vite + React 19 + TypeScript project.<br>- Implement unified gold/charcoal/teal tokens in `variables.css`.<br>- Populate central `symposiumConfig.ts` with all required TBC fields. |
| **Phase 2** | **Preloader & Navigation** | - Build Preloader with numerical counter, gold singularity pulse, and shutter wipe.<br>- Build Nav Bar with transparent-to-charcoal morph and gold pill active tracker. |
| **Phase 3** | **Hero & Video Scrub** | - Integrate unmodified `14200651_1920_1080_30fps.mp4` with HTML5 `<video>` scrub.<br>- Construct GSAP ScrollTrigger pinning timeline (`+=250%`).<br>- Calibrate atmospheric depth veil into charcoal-gold Section 2. |
| **Phase 4** | **Events & Modal Architecture** | - Implement desktop horizontal pinned rail (`+=300%`) with 3D card yaw and gold accents.<br>- Implement mobile vertical stack fallback via `ScrollTrigger.matchMedia()`.<br>- Build reusable Individual Event modal/route template. |
| **Phase 5** | **About, Partners & Guests** | - Author asymmetric About grid with kinetic headline reveals and golden gyroscope core.<br>- Build tiered Partners grid with verified placeholder slots and gold hover glows.<br>- Assemble Guests spotlight with scroll-triggered warm lighting and mobile carousel. |
| **Phase 6** | **Gallery, Contact & Schedule** | - Build pinned Gallery image rail (`+=220%`) with internal image counter-zoom.<br>- Construct 2-column Contact desk with interactive inquiry form and direct phone/mail links.<br>- Implement Schedule timeline with scrubbed vertical gold progress beam (`scaleY: 0 -> 1`). |
| **Phase 7** | **Footer & Horizon Resolution** | - Build institutional Footer with expanding golden horizon line animation.<br>- Wire all registration buttons to the centralized `symposiumConfig.ts` portal handler. |
| **Phase 8** | **Audit, QA & Presentation Prep** | - Full accessibility audit (screen reader, keyboard navigation, `prefers-reduced-motion`).<br>- Cross-browser & real-device mobile testing (iOS Safari, Android Chrome, Desktop).<br>- Export executive summary deck for presentation to the Head of Department. |

---

## 8. Summary of Data Confirmed vs. Data To Be Confirmed (TBC)

| Domain | Status | Current Specification / Placeholder |
|---|---|---|
| **Symposium Name** | **CONFIRMED** | TECHVISTRA (Techvistra ’26) |
| **Edition** | **CONFIRMED** | 2nd National Level Technical Symposium |
| **Organizer** | **CONFIRMED** | Department of Data Science |
| **Theme / Identity** | **CONFIRMED** | Techvistra Quantum Horizon (Gold / Amber / Charcoal / Teal) |
| **Hero Footage** | **CONFIRMED** | Supplied Gold Perspective Tunnel Video (Native Colors) |
| **Symposium Logo** | **CONFIRMED** | Supplied Gold/Black Mark on Logo-Safe Disc |
| **Event Dates** | *TBC* | `[EVENT DATES TO BE CONFIRMED BY HOD / ORGANIZERS]` |
| **Venue & Labs** | *TBC* | `[COLLEGE CAMPUS, AUDITORIUM & LABS TO BE CONFIRMED]` |
| **Flagship Tracks** | *TBC* | `[SPECIFIC COMPETITIONS & TRACKS TO BE CONFIRMED]` |
| **Keynote Guests** | *TBC* | `[DIGNITARIES & GUEST SPEAKERS TO BE CONFIRMED]` |
| **Partners & Sponsors**| *TBC* | `[ACADEMIC, TECH & INDUSTRY PARTNERS TO BE CONFIRMED]` |
| **Registration URL** | *TBC* | `[OFFICIAL EXTERNAL PORTAL LINK TO BE CONFIRMED]` |
| **Coordinator Contacts**| *TBC* | `[FACULTY & STUDENT COORDINATOR PHONE/EMAILS TBC]` |

---

## 9. Executive Slide Deck & Speaking Script for the Head of Department

This 7-slide executive briefing is tailored specifically for presenting the creative and technical direction to the **Head of Department (Data Science)** and the Departmental Advisory Committee.

### Slide 1: The Quantum Leap — From Tesseract ('25) to Quantum Horizon ('26)
- **Executive Message:** *TechVistra ’26 establishes a new benchmark for national technical symposiums by delivering a filmic, continuous-scroll digital experience rather than a conventional static event page.*
- **Talking Points for Presenter:**
  1. *"Last year, TechVistra ’25 – Tesseract successfully established our departmental identity. For our second national edition, we are transforming the website into an interactive cinematic journey."*
  2. *"Every attendee, faculty member, and corporate recruiter will experience the symposium as a journey through a futuristic quantum research facility."*
  3. *"The design reflects the Department of Data Science’s core strengths: computational rigor, high-dimensional modeling, and algorithmic innovation."*

### Slide 2: Optical Continuity — Why Gold & Charcoal (Zero Purple Clashing)
- **Executive Message:** *100% chromatic alignment between the supplied 1080p hero video, our official symposium logo, and all 11 downstream sections.*
- **Talking Points for Presenter:**
  1. *"A critical engineering decision in this blueprint is absolute color harmony. The video provided to us depicts a magnificent perspective tunnel in radiant gold, amber, and deep obsidian with subtle teal telemetry."*
  2. *"Rather than forcing an unnatural shift to violet or purple—which would clash harshly with both the video and our official gold/black logo—we extend the footage’s native palette throughout the entire website."*
  3. *"This produces an unbroken, multi-chamber architectural illusion: visitors feel as if they are navigating through illuminated corridors of the same quantum facility."*

### Slide 3: GSAP ScrollTrigger Choreography — The 11 Architectural Chambers
- **Executive Message:** *Selective pinning and mathematical scroll-scrubbing create high drama without causing user frustration or navigation fatigue.*
- **Talking Points for Presenter:**
  1. *"We have engineered exact mathematical scroll timelines across 11 key zones: Hero, Events, Event Detail, About, Partners, Guests, Gallery, Contact, Schedule, Footer, and Preloader."*
  2. *"Pinning is utilized strategically: only the Hero video (`+=250%`), the Events horizontal rail (`+=300%`), and the Gallery retrospective (`+=220%`) pin the viewport on desktop. All other content flows naturally."*
  3. *"Every transition is governed by our Continuous Handoff Matrix, so elements never abruptly vanish; they expand, dissolve, or resolve into the subsequent section."*

### Slide 4: Academic Integrity & Strict Placeholder Governance
- **Executive Message:** *Zero fabricated data. Clear differentiation between verified facts and items awaiting departmental sign-off.*
- **Talking Points for Presenter:**
  1. *"In adherence to strict institutional standards, this blueprint does not invent any event tracks, prize amounts, dates, keynote speakers, or sponsors."*
  2. *"All unconfirmed fields are explicitly managed via a centralized configuration (`[TBC]`). During development, cards will render honest, high-tech silhouette frames rather than fictitious placeholders."*
  3. *"The moment the HOD and organizing faculty finalize any detail, updating one single line of code immediately deploys it across all 11 sections."*

### Slide 5: Safe External Registration Architecture
- **Executive Message:** *Secure, isolated handoff to official university/college registration platforms without collecting sensitive user data locally.*
- **Talking Points for Presenter:**
  1. *"The website is designed with zero legal or privacy liability: it does not store attendee credentials, phone numbers, or payment tokens."*
  2. *"All 'Register' buttons route directly to the official external portal (e.g., Google Forms, institutional gateway, or portal URL)."*
  3. *"We have pre-programmed four operational lifecycle states: Pre-Launch Countdown (`NOT_OPEN_YET`), Active Registration (`OPEN`), Urgency Surge (`CLOSING_SOON`), and Post-Deadline Lockout (`CLOSED`)."*

### Slide 6: Mobile Ergonomics, Accessibility & Performance
- **Executive Message:** *Full 60fps performance on low-end devices, WCAG 2.2 AA contrast compliance (>10:1), and zero mobile scroll traps.*
- **Talking Points for Presenter:**
  1. *"On mobile devices (<768px), horizontal pins automatically dissolve into fluid vertical stacks, ensuring attendees never get 'stuck' scrolling horizontally on smartphones."*
  2. *"All typography achieves superior contrast (>10:1 ratio on deep charcoal `#0D0E12`), far exceeding national accessibility benchmarks."*
  3. *"For users with motion sensitivity or low-power modes enabled, `prefers-reduced-motion` immediately disables heavy transforms and provides an instant, elegant static experience."*

### Slide 7: Phased Execution Plan & Immediate Approvals Needed
- **Executive Message:** *An 8-phase structured development sprint with verifiable milestones, requiring minimal administrative overhead.*
- **Talking Points for Presenter:**
  1. *"The build is structured into 8 distinct milestones, starting from token foundations to video scrubbing, dynamic event modules, and full QA audits."*
  2. *"To proceed from blueprint to code implementation, we request the HOD's guidance on three core items: (1) Target symposium dates, (2) List of competitive tracks, and (3) Target opening date for registrations."*
  3. *"With this master blueprint approved, our engineering team can commence execution with complete clarity and zero guesswork."*

---
*Master Blueprint certified and ready for presentation to the Head of Department, Department of Data Science.*
