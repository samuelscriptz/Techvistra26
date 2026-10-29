# Implementation Plan: Hero & Navbar Visual Refinements

> **Target:** Techvistra '26 Website
> **Date:** 2026-10-29
> **Status:** Pending User Review & Approval

---

## 1. Objectives

1. **Restore Default System Cursor**: Remove the custom quantum glow cursor from `src/App.tsx` and restore natural OS cursor behavior.
2. **Enlarge & Enhance Techvistra Navbar Logo**: Make the right-side navbar Techvistra logo substantially larger, crisper, and prominent with radiant gold ambient glow.
3. **Upgrade University Logo in Navbar**:
   - Remove the old banner.
   - Implement the new official banner: `public/Dr. M.G.R. University Gold Emblem (1).png`.
   - Remove the redundant artificial capsule/border so the authentic gold emblem is clearly visible and legible at all screen sizes.
4. **Restyle "Department of Data Science Presents" (Remove Pill Container)**:
   - Eliminate the dark rounded pill container and border.
   - Render it as stylish, cinematic floating text with gold accents (`✦ PRESENTS ✦`), wide tracking, and the AUDI association crest (`public/college-crest.png`).
5. **Guarantee Visibility of Cyber-Gold Countdown Timer**:
   - Fix hero viewport height clipping (`overflow: hidden` + large logo pushing content below the fold).
   - Position the Countdown in the visual hierarchy (between the 3D logo and the CTA button) with responsive vertical clamp so it is 100% visible above the fold on all laptop, desktop, and mobile displays.
6. **Re-engineer "Register Now" Button into a "Sick" Cyber-Gold Masterpiece**:
   - Replace the generic button with a custom, futuristic cyber-gold symposium portal CTA.
   - Features:
     - Multi-stop obsidian & liquid gold metallic gradient.
     - Dual-layer neon energy aura with breathing pulse animation.
     - Animated light-ray sheen sweep across the face of the button on hover.
     - High-tech geometric accents with kinetic hover micro-interaction.

---

## 2. Proposed File Changes

### Task 1: Cursor Restoration
- **File:** `src/App.tsx`
  - Remove `<QuantumCursor />` mount and import.
  - Delete `src/components/QuantumCursor/` directory to keep codebase clean.

### Task 2: Navbar Logo Upgrades & Sizing
- **File:** `src/components/SiteHeader/SiteHeader.tsx`
  - Update university logo image `src` to `"/Dr. M.G.R. University Gold Emblem (1).png"`.
- **File:** `src/components/SiteHeader/SiteHeader.module.css`
  - Remove the artificial white capsule and border from `.universityBrand`. Let the native gold emblem render with authentic clarity (`height: clamp(42px, 5.5vh, 56px)`).
  - Increase `.techvistraNavLogo` size to `height: clamp(48px, 6vh, 62px); max-width: clamp(160px, 20vw, 220px);` with gold drop shadow for maximum crispness.

### Task 3: Presenter Text Restyling (No Pill)
- **File:** `src/components/Hero/Hero.tsx`
  - Keep the semantic presenter structure: crest + "Department of Data Science" + "✦ Presents ✦".
- **File:** `src/components/Hero/Hero.module.css`
  - Remove `background`, `border`, and `border-radius` from `.presenterBadge`.
  - Style as a floating cinematic presenter header:
    - Glowing white high-tracking title (`Space Grotesk`, `letter-spacing: 0.18em`).
    - Radiant gold `"✦ PRESENTS ✦"` badge line.
    - Association crest with clean drop shadow.

### Task 4: Layout Hierarchy & Guaranteed Countdown Visibility
- **File:** `src/components/Hero/Hero.tsx`
  - Reorder foreground content so the flow is:
    1. Presenter Title (Department of Data Science Presents)
    2. Techvistra '26 Q-Vortex (3D interactive tilt logo)
    3. Cyber-Gold Live Countdown Timer (immediately visible)
    4. "Sick" Register Now Button (prominent call to action)
- **File:** `src/components/Hero/Hero.module.css`
  - Rebalance vertical spacing:
    - Allow hero container to breathe naturally without cutting off content on smaller laptop viewports.
    - Clamp `.logoWrapper` max-width to `min(540px, 76vw)` so all 4 elements fit comfortably on 100vh.
- **File:** `src/components/Countdown/Countdown.module.css`
  - Enhance glowing gold borders and font sizes for high-impact visibility.

### Task 5: "Sick" Futuristic Register Now CTA Button
- **Files:** `src/components/Hero/Hero.tsx` & `src/components/Hero/Hero.module.css`
  - Replace `StarBorderButton` with a bespoke futuristic Cyber CTA:
    - Deep obsidian & molten gold metallic fill.
    - Dual animated gold neon border glow.
    - Light reflection sweep effect (`@keyframes sheenSweep`).
    - Kinetic kinetic icon slide on hover (`transform: translateX(4px)`).

---

## 3. Verification Steps
1. Run `npm run build` (`tsc -b && vite build`) to ensure 0 TypeScript / CSS compile issues.
2. Verify in local dev server `http://localhost:5173/`:
   - Cursor is native OS cursor (no trailing circles).
   - University banner is the new gold emblem, large and readable.
   - Techvistra logo on the right is big, bold, and clear.
   - "Department of Data Science Presents" is stylish floating text (no pill).
   - Countdown is completely visible above the fold on all standard screen heights.
   - Register Now button has a top-tier cyber-gold look and feel.
