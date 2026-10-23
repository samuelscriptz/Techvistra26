# Techvistra Q-Vortex Website Blueprint

## Project brief

Create the website for **Techvistra Q-Vortex**, the **2nd National Level Technical Symposium** organized by the **Department of Data Science**. The supplied event logo identifies the edition as **Techvistra ’26** and includes the theme words **Quantum Technologies, Visualization, Optimization, Research, Technology, Exploration**.

The previous public event website was TechVistra ’25 – Tesseract. This year’s website should feel like a substantial visual and experiential leap: cinematic, original, technically credible, and easy to use. The visual concept selected is **Cinematic Quantum Universe**, centered on the **Techvistra Quantum Vortex** identity.

This file is the working source of truth for the creative and implementation direction. Bracketed fields are placeholders: do not invent facts to fill them.

## Decisions and placeholders

| Topic | Current direction |
|---|---|
| Event name | Techvistra Q-Vortex |
| Edition / descriptor | Techvistra ’26 · 2nd National Level Technical Symposium |
| Organizer | Department of Data Science |
| Creative direction | Cinematic Quantum Universe; maximum visual impact and originality |
| Vortex identity | Techvistra Quantum Vortex |
| Logo | User-provided image: `WhatsApp Image 2026-10-13 at 11.15.53.jpeg` (gold/black logo on white background) |
| Palette | Purple lightning was requested earlier. The supplied logo is gold and black. Reconcile by using the logo as supplied and treating purple as the site’s cinematic environment/accent, unless the organizers direct otherwise. Do not recolor or redraw the logo without approval. |
| Scroll experience | The supplied video is scroll-driven. Scrolling scrubs the video; the event logo appears at the end of the sequence. |
| Registration | Dedicated external registration portal. Portal details are placeholders. |
| Event details | Placeholders |
| Program | Placeholders |
| Practical details | Placeholders |
| Implementation | Build in Antigravity; this is an implementation brief, not a request to create a site from outside that workflow. |

### Fields to fill later

- Event date(s): `[EVENT DATES]`
- Venue / city / directions: `[VENUE DETAILS]`
- Event summary / intended audience: `[EVENT SUMMARY AND AUDIENCE]`
- Tracks, workshops, competitions, speakers, agenda, prizes: `[PROGRAM DETAILS]`
- Registration portal URL, categories, fees, registration open/close dates: `[REGISTRATION DETAILS]`
- Contact email/phone, social links, FAQs, privacy/terms, sponsor/institution marks: `[PRACTICAL DETAILS]`

Show no fabricated values. If a section has no approved content yet, use a clearly labeled placeholder in development or hide it in the public experience until content is ready.

## Creative direction

### Core idea

Make the visitor feel that they are entering a quantum field where research, technology, and people converge. The vortex is the central visual signature, while the supplied video creates a guided, scroll-controlled reveal. The event identity should be memorable without turning the site into a confusing sci-fi interface.

Internal art-direction line: **“Enter the field. Find your orbit.”** This is optional concept copy, not approved event copy.

### Experience principles

1. Put the event identity and next action where visitors can find them quickly.
2. Make the scroll video the signature opening experience, then let the normal site content take over.
3. Keep key event text as real HTML, not embedded in video or artwork.
4. Use visual spectacle around content, never in place of legibility.
5. Keep registration unmistakable and route it to the official external portal.
6. Avoid generic robot stock art, fake science dashboards, excessive HUD decoration, and childish gradients.

### Color and logo use

The provided logo is a metallic gold/black treatment on white. The earlier creative brief asks for purple lightning. Use the logo image unchanged as the authoritative mark. Build the surrounding website in deep space tones with electric purple/violet lighting; use restrained gold accents where they connect naturally to the mark. Preserve a light/white logo-safe area if the supplied raster needs it. Do not put the logo over a busy background if its white field reduces readability. Prefer obtaining an official transparent/vector logo from the organizers before final production.

Suggested web color tokens:

- Void: `#080612` — main page background
- Deep space: `#100A24` — panels and overlays
- Vortex violet: `#6E35FF` — primary energy / actions
- Ion purple: `#B66CFF` — secondary light
- Lightning lilac: `#E6D8FF` — bright accents
- Plasma cyan: `#B9F5FF` — limited counterpoint
- Starlight: `#F6F3FF` — primary text
- Mist: `#AAA5BD` — secondary text; check contrast
- Gold accent: sample from the supplied logo only after inspecting the original asset; use sparingly

Glow is decoration, not a replacement for text contrast. Keep body copy on stable dark surfaces.

### Typography and layout

- Display type: a geometric sans such as Space Grotesk or Sora.
- Body/UI: Inter or a system sans stack for readability and performance.
- Load only needed font weights; confirm font licenses.
- Use a responsive editorial grid: 12 columns desktop, 6 tablet, 4 mobile.
- Large, confident headlines; short readable body copy; consistent spacing and focus states.
- Use asymmetry and generous negative space, but keep navigation and important facts predictable.

## Sitemap and page structure

For a single event, a polished one-page site with anchored sections is the recommended starting point:

- `/#home` — scroll video experience and event identity reveal
- `/#about` — event purpose and audience `[PLACEHOLDER]`
- `/#program` — tracks, experiences, competitions/workshops `[PLACEHOLDER]`
- `/#schedule` — schedule or day-by-day timeline `[PLACEHOLDER]`
- `/#venue` — venue, location, access details `[PLACEHOLDER]`
- `/#faq` — registration and event questions `[PLACEHOLDER]`
- `/#register` — clear handoff to the external registration portal `[PORTAL URL PLACEHOLDER]`
- Footer — organizer, contact, social, privacy/terms `[PLACEHOLDERS]`

Keep the primary navigation concise: About, Program, Schedule, Venue, FAQ, plus a persistent **Register** action. Collapse into an accessible mobile menu.

## Homepage section plan

1. **Scroll-led opening** — Pin a full-screen or near-full-screen video stage while scroll progress scrubs the supplied video. Ensure the content is still understandable if video is unavailable. Reveal the event logo at the video’s end. The logo should be a separate crisp asset overlay/reveal if the video’s final frame does not contain the approved logo.
2. **Event identity / hero handoff** — Display Techvistra Q-Vortex, Techvistra ’26, “2nd National Level Technical Symposium,” Department of Data Science, a short approved event description `[PLACEHOLDER]`, and the primary Register CTA.
3. **Event facts strip** — Date, venue, host, registration state `[PLACEHOLDERS]`. Hide facts that are not confirmed.
4. **About** — concise event purpose and audience `[PLACEHOLDER]`.
5. **Program** — cards for confirmed tracks/workshops/competitions `[PLACEHOLDERS]`; no invented events.
6. **Schedule** — accessible day/time list or timeline `[PLACEHOLDER]`.
7. **Speakers / highlights** — show only once names, details, images, and permissions are confirmed; otherwise omit or use an honest placeholder during development.
8. **Venue** — venue details, transport/accessibility cues, and map link `[PLACEHOLDER]`.
9. **FAQ** — organizer-approved answers `[PLACEHOLDER]`.
10. **Final registration CTA** — restate verified event identity and link to the official external portal `[PORTAL URL PLACEHOLDER]`.
11. **Footer** — Department of Data Science, contact, social, privacy/terms, accessibility contact `[PLACEHOLDERS]`.

## Scroll video experience

### Required behavior

- Use the supplied video as the main scroll-triggered experience.
- Map scroll progress to video playback time (`currentTime`) so scrolling forward advances the sequence and scrolling backward scrubs backward.
- Pin the video stage only for the length of the sequence, then release it into normal page scrolling.
- The logo appears at the end of the video experience. Prefer a sharp, approved logo overlay for the final reveal if the source video does not include the final logo lockup.
- Keep headings, event name, and buttons as HTML outside the video.
- Do not autoplay audio. The experience should be muted.

### Recommended interaction timeline

1. **Before entry:** show a stable poster image immediately; no blank or black loading state.
2. **Scroll begins:** pin the stage and map scroll distance to video progress.
3. **Middle sequence:** video continues to scrub smoothly; optional minimal HTML labels can appear only if approved and remain readable.
4. **Final portion:** approach the end frame, bring in the logo as a crisp image or SVG overlay, and hold it briefly for recognition.
5. **Exit:** unpin smoothly and flow into event introduction / main page content.

### Scroll/video implementation notes

- Recommended: GSAP + ScrollTrigger to pin and scrub the HTML video, with a carefully sized scroll distance and responsive behavior.
- Preload metadata and poster; avoid loading a large video before needed. Consider a lower-resolution/mobile encode.
- Wait for metadata before controlling `currentTime`; handle seek readiness, buffering, decode delays, tab visibility, and resize.
- Use a poster/static fallback for unsupported formats, slow connections, WebGL/video failures, reduced-motion preference, and small/low-power devices.
- If the source video is too large, transcode to web-optimized formats such as MP4/H.264 (and optionally WebM), keeping a usable resolution and bitrate.
- Provide a non-pinned or simplified experience for touch devices if scrub seeking is unreliable. Do not hijack scroll in a way that prevents visitors from leaving the section.
- Respect `prefers-reduced-motion`: show the poster and logo, skip pinning/scrubbing, and continue to the page content.
- Never make event facts available only inside the video.

## Recommended tech stack

- **React + Vite + TypeScript** — fast client-rendered microsite, typed content, reusable components.
- **GSAP + ScrollTrigger** — scroll-controlled video scrubbing, pinning, and logo reveal.
- **CSS Modules** — scoped styles and responsive visual system; define tokens as CSS variables.
- **HTML `<video>`** — use the provided video with a poster and responsive/fallback sources.
- **Lucide React** — optional interface icons; avoid decorative icon clutter.
- **Vercel or Netlify** — static deployment, subject to the project owner’s hosting choice.

Use semantic HTML and keep event facts in a central typed configuration/data module. Do not add a heavy 3D library unless the experience specifically needs interactive real-time 3D beyond the supplied video.

## Component architecture

```text
App
├── SiteHeader
│   ├── BrandLogo
│   ├── DesktopNavigation
│   └── MobileMenu
├── ScrollVideoExperience
│   ├── VideoStage
│   ├── VideoPosterFallback
│   ├── ScrollProgressController
│   └── EndLogoReveal
├── EventIdentityHero
│   ├── EventTitle
│   ├── EventFacts
│   └── RegistrationLink
├── AboutSection                 [placeholder content]
├── ProgramSection               [placeholder content]
│   └── ProgramCard
├── ScheduleSection              [placeholder content]
├── SpeakersSection              [optional; omit until confirmed]
├── VenueSection                 [placeholder content]
├── FAQSection                   [placeholder content]
├── RegistrationCTA              [external portal placeholder]
└── SiteFooter                   [contact/social/legal placeholders]
```

Suggested content/config file:

```ts
export const eventConfig = {
  name: "Techvistra Q-Vortex",
  edition: "Techvistra ’26",
  descriptor: "2nd National Level Technical Symposium",
  organizer: "Department of Data Science",
  registrationUrl: "[REGISTRATION_PORTAL_URL]",
  registrationState: "[NOT_CONFIRMED]",
  eventDates: "[EVENT_DATES]",
  venue: "[VENUE_DETAILS]",
  contactEmail: "[CONTACT_EMAIL]",
  socialLinks: [],
};
```

Do not render bracketed placeholder strings as if they were real public details. Either keep placeholders visibly labeled in development or hide the corresponding public UI until organizers provide the information.

## External registration behavior

- Use one approved registration URL from central config for all Register links.
- Label the action clearly, for example **Register on the official portal**.
- Registration is hosted externally; do not collect registration data on the event site.
- Do not add names, email addresses, form answers, or personal identifiers to URL query parameters.
- Communicate registration status accurately: `[OPENS ON DATE]`, `[REGISTRATION OPEN]`, or `[REGISTRATION CLOSED]` only after confirmation.
- If the portal is unavailable, show an approved organizer contact and a concise status message.
- If links open in a new tab, disclose that and use safe link attributes. Same-tab handoff is the simplest default.

## Responsive, accessibility, and performance requirements

### Responsive

- Design mobile first; keep the title, event identity, and CTA unobstructed by video.
- At small widths, use a vertical page flow and mobile-appropriate video/poster crop.
- Make buttons comfortable touch targets; account for safe-area insets.
- Test narrow screens, landscape mobile, tablet, desktop, and 200% zoom.

### Accessibility

- Use semantic landmarks, one clear H1, logical heading order, and a skip link.
- Keep keyboard focus visible; make mobile menu and FAQ keyboard-operable; return focus when menus close.
- Decorative video/vortex imagery should not create noisy screen-reader output.
- Provide a static equivalent and reduced-motion path; no facts should be video-only.
- Maintain text contrast; color alone must not communicate event status or schedule meaning.
- Use descriptive link text and useful alt text for informative images; mark decorative images appropriately.
- Avoid flashing, forced scroll traps, and autoplay sound.

### Performance

- Optimize video and poster assets; load heavy media only when useful.
- Reserve dimensions to avoid layout shifts.
- Keep fonts and scripts lean; avoid unnecessary animation libraries beyond GSAP for the core scrub.
- Test on real mobile devices and throttled connections.
- Pause or simplify effects when hidden/offscreen; provide graceful fallback on decode/seek failure.

## Asset plan

- Supplied event logo image: use as provided pending official high-resolution transparent/vector version.
- Supplied scroll-trigger video: source master plus web-optimized desktop/mobile exports and poster frame.
- Event favicon and social preview based on approved logo/visual identity.
- Event photographs, speaker portraits, partner logos only when organizers provide approved assets and usage permission.
- Prepare a simple asset manifest with source, format, dimensions, rights/approval status, and alt text.

## Antigravity build phases

1. **Inspect** — inspect the existing project, framework, files, and assets; summarize before changing anything.
2. **Foundation** — establish routes/anchors, responsive tokens, typography, header/footer, and central event config with placeholders.
3. **Scroll experience** — build the video scrub/pin interaction, poster/reduced-motion/failure fallbacks, and end-logo reveal.
4. **Page content** — add semantic section components, using placeholders or hidden modules where content is unconfirmed.
5. **Registration handoff** — wire all CTAs to the one config URL placeholder and implement open/closed states without fabricated values.
6. **Polish** — responsive review, keyboard/accessibility, performance, SEO/social metadata, and cross-browser checks.

Keep each Antigravity task bounded to a reviewable phase. Ask it to inspect before replacing files and report assumptions and changed files after each phase.

## Acceptance criteria

- The event is consistently named **Techvistra Q-Vortex**; supporting identity says **Techvistra ’26 · 2nd National Level Technical Symposium · Department of Data Science**.
- Supplied logo is preserved; the surrounding site reconciles purple cinematic lighting with gold/black branding without altering the mark.
- Scrolling scrubs the supplied video forward and backward; the section pin releases cleanly; the logo appears at the end.
- The experience has a poster/static fallback, reduced-motion path, mobile behavior, and no audio autoplay.
- Event/program/practical details remain placeholders until confirmed; no invented speakers, tracks, dates, fees, venue, partners, policies, or awards.
- All Register buttons point to one external portal config value and explain the handoff.
- Main content is semantic HTML and works without relying on video playback.
- Layout works on mobile and desktop without overflow, overlap, or obscured text.
- Keyboard navigation and visible focus work throughout; reduced-motion users can skip the cinematic movement.
- Video, images, fonts, and scripts are optimized and failures show a usable fallback.

---

# Antigravity prompt

```text
Build the Techvistra Q-Vortex symposium website using TECHVISTRA_QVORTEX_WEBSITE_BLUEPRINT.md as the source of truth. Follow the brief closely and treat the supplied logo and video as project assets. Do not invent or infer event facts: date, venue, agenda, speakers, tracks, registration URL/status, fees, contact details, partners, policies, and social links are placeholders until supplied by the organizers.

Before editing, inspect the existing project structure, framework, available assets, and current routes. Summarize what is already present and propose a minimal implementation plan. Preserve useful existing work and do not replace files wholesale without understanding them.

Implement a polished, responsive website for “Techvistra Q-Vortex” (Techvistra ’26, 2nd National Level Technical Symposium, Department of Data Science) in the Cinematic Quantum Universe direction. Make the supplied scroll video the signature experience: pin its section for a controlled scroll distance, scrub the video forward and backward with scroll progress, then reveal the supplied event logo cleanly at the sequence end and release the pin into the page. Keep all important titles, facts, and buttons as semantic HTML outside the video.

Use React + Vite + TypeScript, GSAP + ScrollTrigger, and CSS Modules unless the inspected project already has an equivalent suitable stack. Keep the event content and external registration destination in one typed config/data file. Use the logo without recoloring or distorting it; reconcile its gold/black treatment with cinematic deep-space backgrounds and restrained purple-lightning accents. Do not add unrelated visual assets or generic sci-fi dashboard clutter.

Build accessible responsive fallbacks with the same implementation: immediate poster before video is ready, useful behavior on mobile/low-power devices, reduced-motion mode that skips pinning/scrubbing and shows a static poster plus logo, and graceful recovery if video loading/seeking fails. Do not autoplay sound. The user must be able to leave the section without a scroll trap. Ensure the video is optimized for web delivery and defer heavy media where practical.

Create the component architecture and page sections described in the blueprint. Unconfirmed sections should use clearly marked development placeholders or remain hidden from the public-facing page; never display fake details. All registration CTAs must use a single external portal config placeholder and clearly state that registration continues on the official external portal.

Work in reviewable phases: first project inspection and foundation, then the scroll experience, then content sections, then registration behavior and polish. After each phase, summarize files changed, assumptions, and how I can preview/review it. Do not deploy, publish, or connect any external service. Before calling the work complete, review the site at mobile and desktop sizes and provide a concise checklist of remaining placeholder facts/assets that the organizers must supply.
```
