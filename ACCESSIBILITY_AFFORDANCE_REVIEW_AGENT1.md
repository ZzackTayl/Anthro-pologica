# Accessibility Affordance Review — Agent 1 (Core Affordance Structure)

**Reviewer:** Agent 1 — Senior Web Accessibility Engineer (WCAG 2.2 AA)
**Scope:** Every rendered page and every interactive affordance, page-by-page / function-by-function.
**Standard:** WCAG 2.2 AA (with notes on AAA target-size where relevant).
**Approach:** Conservative, surgical code fixes for improperly structured affordances; visuals, copy, layout, and colors left untouched.

> Context: Substantial prior accessibility work already exists (see `ACCESSIBILITY_FIX_GUIDE.md` and `ACCESSIBILITY_AUDIT_AGENT3_CROSS_DEVICE_AT_COMPATIBILITY.md`). Most Phase 1/2/3 fixes from the guide are already in the code (skip link + `<main>`, nav landmarks, logo buttons, contact form labels + accessible status message, carousel ARIA/touch targets, footer SVG `aria-hidden`, newsletter label, dynamic titles). This review focused on what remained: verifying each affordance is *structurally* correct and fixing the gaps.

---

## Summary Table

| # | Page / Component | Affordance | Status | Action |
|---|------------------|------------|--------|--------|
| 1 | App.tsx | Skip link, `<main>`, landmarks, dynamic `<title>` | ✅ Pass | None (prior work) |
| 2 | Navigation.tsx | Logo control, Personalize/Back buttons, nav landmark | ✅ Pass | None (prior work) |
| 3 | HeroSection.tsx | `<h1>`, "Explore Our Universe" anchor, decorative bg image | ✅ Pass | None (prior work) |
| 4 | PhilosophySection.tsx | Heading hierarchy, decorative motion, hover-only cards | ✅ Pass | None |
| 5 | TeamSection.tsx | Member portraits (alt), external profile link | ✅ Pass | None; minor note |
| 6 | **SkillsSection.tsx** | **Expandable skill cards (clickable `<div>`)** | ⚠️ **Issue → Fixed** | **Added `role="button"`, `tabIndex`, `aria-expanded`, Enter/Space handler** |
| 7 | ProjectsCarousel.tsx | Prev/next, pagination dots, live region, CTA, alt text | ✅ Pass | None (prior work) |
| 8 | ContactSection.tsx | Form labels/required, accessible submit status, contact cards | ✅ Pass | None (prior work); minor note |
| 9 | Footer.tsx | Decorative wave SVGs, newsletter label, social links, settings button | ✅ Mostly Pass | None; deferred items noted |
| 10 | ProjectDetailPage.tsx | `<h1>`, CTA anchors, feature/iframe titles | ✅ Pass | None |
| 11 | **InvestorSection.tsx** | "View Investment Deck" button | ⚠️ Minor → Fixed | **Added `type="button"`**; action wiring deferred |
| 12 | MyOrbitCaseStudyPage.tsx + caseStudy/* | Single `<h1>` (Hero), headings, CTA anchors | ✅ Pass | None |
| 13 | caseStudy/CaseStudyTimeline.tsx | Expandable phase cards | ✅ Pass | None (already keyboard-accessible) |
| 14 | AccessibilityPreferences.tsx | Modal dialog, switches, close/save/defaults | ✅ Pass | None (Radix Dialog + Switch) |
| 15 | Resource* (Center/Card/DetailPage) | — | ➖ Dead code | Not wired into routes — noted, not fixed |

**Code files modified:** `src/components/SkillsSection.tsx`, `src/components/InvestorSection.tsx`.

---

## Page-by-Page / Function-by-Function Findings

### 1. `src/App.tsx` (cross-cutting shell)
- **Skip link** (`<a href="#main-content">` with `sr-only`/`focus:not-sr-only`): ✅ Pass. Target `<main id="main-content">` exists and is a valid focus destination.
- **Landmarks:** `<Navigation>` (nav), `<main id="main-content">`, `<Footer>` (footer/contentinfo). ✅ Pass — one of each per route, no duplicates.
- **Dynamic document title** per route (home / project / case-study): ✅ Pass.
- **Reduced motion:** `MotionConfig reducedMotion` driven by `accessibilityPrefs.motion`; mobile auto-reduces. ✅ Pass — preserved.
- Note: `Footer` is rendered inside `<main>` on every route (it's part of each page). The `<footer>`'s nearest sectioning root is still `body`, so it remains a valid `contentinfo` landmark — acceptable, but see Deferred #1.

### 2. `src/components/Navigation.tsx`
- Logo is a real `<motion.button type="button">` with `aria-label="Return to homepage"`. ✅
- "Personalize" / "Back to Home" are real buttons with `aria-label`; icons `aria-hidden`; `min-h-[44px]` touch target. ✅
- `role="navigation"` + `aria-label="Primary navigation"` on both nav states. ✅
- There is **no hamburger/mobile-menu** in this component (the brief mentioned one); the nav is a simple responsive bar, so there is no menu toggle requiring `aria-expanded`/`aria-controls`. ✅ (Nothing to fix.)

### 3. `src/components/HeroSection.tsx`
- Single page `<h1>` (`ANTHRO-POLOGICA`). ✅
- "Explore Our Universe" is a `<motion.a href="#projects-section">` with progressive-enhancement smooth scroll — correct link semantics + discernible text. ✅
- Background image uses `alt=""` + `aria-hidden="true"` (decorative). ✅

### 4. `src/components/PhilosophySection.tsx`
- `<h2>` section heading + `<h3>` card titles; no skipped levels. ✅
- Philosophy cards have `cursor-pointer`/`group` hover styling **but no `onClick`** — they are non-interactive decorative cards, so no keyboard/role is required. ✅ (Misleading `cursor-pointer` is cosmetic only; left as-is per "no visual redesign".)
- Decorative animated blobs are `pointer-events-none` / non-content. ✅

### 5. `src/components/TeamSection.tsx`
- Portraits use `ImageWithFallback` with `alt={member.name}` (meaningful). ✅
- The only interactive element is the external profile link (`<motion.a target="_blank" rel="noopener noreferrer">`) with visible text. ✅
- `<h2>` + `<h3>` hierarchy correct. ✅
- **Minor note (not a blocker):** member bio/link are revealed on pointer hover (`canHover`); the text remains in the DOM (animated height/opacity), so it stays available to screen readers and on touch devices. Sighted keyboard-only users on hover-capable desktops can't trigger the reveal because the card isn't focusable, but no information is lost. Flagged for Agent 2 as a potential enhancement (not an affordance defect).

### 6. `src/components/SkillsSection.tsx` — **FIXED**
- **Issue:** Each skill card was a clickable `<motion.div onClick=...>` (`className="relative cursor-pointer"`) that toggles an expandable details panel, with **no keyboard operability, no role, and no expanded-state exposure**. Keyboard and screen-reader users could neither reach nor operate it, and state was not announced. (WCAG 2.1.1 Keyboard, 4.1.2 Name/Role/Value.)
- **Why not convert to `<button>`:** the card contains an `<h3>` and a `<ul>`; nesting those inside `<button>` is invalid HTML. Per the checklist fallback (and matching the repo's existing pattern in `caseStudy/CaseStudyTimeline.tsx`), I added button semantics to the container instead.
- **Fix applied:** added `role="button"`, `tabIndex={0}`, `aria-expanded={isExpanded}`, and an `onKeyDown` handler toggling on `Enter`/`Space` (with `preventDefault` to stop page scroll on Space). Visual structure, animations, and the existing `onClick` are unchanged. Focus is made visible by the existing global `:focus-visible` styles.

### 7. `src/components/ProjectsCarousel.tsx`
- Prev/next are real buttons with `aria-label` ("View previous/next project") and `min-w/h-[48px]`. ✅
- Pagination dots are real buttons with descriptive `aria-label` (`Go to project i of n: <title>`) and `aria-current`. ✅
- Live region: `role="region"` + `aria-label="Projects carousel"` wrapper plus an `sr-only` polite/atomic announcement of the current slide. ✅
- Card CTA is a real `<button>` (case study) or `<a target="_blank" rel="noopener noreferrer">` (external). ✅
- Images use `alt={currentProject.alt || \`Screenshot of <title> project\`}`; video uses `<iframe title>`. ✅
- **Minor note:** the region wrapper carries `aria-live="polite"` *and* contains the dedicated `sr-only` live announcer. Two nested live regions can produce verbose double announcements. Left as-is (matches `ACCESSIBILITY_FIX_GUIDE.md` Fix 16); flagged for Agent 2 as a possible refinement (drop `aria-live` from the big region, keep the `sr-only` announcer).

### 8. `src/components/ContactSection.tsx`
- All four fields have `<label htmlFor>` ↔ `id` (`contact-name/email/project/message`); required fields use `required` + `aria-required="true"` and a visible `*` with `aria-label="required"`; a "Fields marked with * are required" legend is present. ✅
- Submit status uses an accessible live message (`role="alert"` + `aria-live="polite"` + `aria-atomic`) instead of `window.alert`. ✅
- Submit button is a real `<Button type="submit">` with disabled/"Sending..." state. ✅
- The three contact "method" cards (Email/Chat/Schedule) have hover styling but **no `onClick`/`href`** — purely informational, no affordance to wire. ✅
- **Minor note:** validation relies on native HTML constraint validation (`required`, `type="email"`); there is no custom `aria-invalid`/`aria-describedby` error wiring per field. Native validation is acceptable for AA; per-field programmatic error association is an enhancement — flagged for Agent 2.

### 9. `src/components/Footer.tsx`
- Decorative wave SVGs (top + bottom states) have `aria-hidden="true"` + `role="presentation"`. ✅
- Newsletter input has an `sr-only` `<label htmlFor="newsletter-email">` plus `aria-label`. ✅
- "Accessibility Settings" is a real `<button>` with text. ✅
- Social links are filtered to drop placeholder `#` hrefs, so no broken/empty links render; remaining links carry `aria-label`. ✅
- **Deferred (design/content decision):**
  - **Quick Links** (`About/Services/Projects/Team/Contact`) are `<a href="#">` placeholders that don't navigate anywhere. They have discernible names but no real destination. Needs real targets (or convert to in-page anchors). Not fixed — requires content/IA decision; out of surgical scope.
  - **Newsletter Subscribe** still uses `window.alert(...)` for success/error and mutates `button.innerHTML` directly. It is keyboard-operable with a name, but feedback isn't an inline accessible status (unlike the contact form). Converting it to the same `role="status"`/`role="alert"` pattern requires adding component state — flagged for Agent 2 (matches the contact-form remediation pattern). There is also a latent (non-a11y) bug: `e.currentTarget` may be null inside the async `.finally()`.

### 10. `src/components/ProjectDetailPage.tsx`
- Single `<h1>` (`project.title`); `<h2>` for "The Problem" / "Our Solution" / "Key Features". ✅
- CTAs are real anchors (`Visit Live Site`, `View Demo`) with `target="_blank" rel="noopener noreferrer"` and text. ✅
- Hero image `alt={project.title}`; video `<iframe title>`. ✅ Scroll indicator + blobs are decorative non-content. ✅

### 11. `src/components/InvestorSection.tsx` — **FIXED (minor)**
- "View Investment Deck" is a real `<motion.button>` with discernible text and is keyboard-operable.
- **Fix applied:** added `type="button"` (it previously had no explicit type — defaults to `submit`, matching the convention applied to `Navigation` buttons; prevents accidental submit if ever reused inside a form).
- **Deferred:** the button has **no `onClick`/destination** (placeholder). Wiring a real action/link is a content/design decision — noted, not invented. Feature cards (Pitch Deck/Market Analysis/Roadmap) are non-interactive display cards. ✅

### 12. `src/components/MyOrbitCaseStudyPage.tsx` + `src/components/caseStudy/*`
- Single `<h1>` lives in `CaseStudyHero`; the page then uses `<h2>`/`<h3>`/`<h4>` consistently (Team, Problem, Timeline, AI Workflow, Cost, Results, Differentiators, CTA). ✅
- `CTASection` CTAs are real `<a href={buttonLink}>` with visible text. ✅
- Metric/team cards are non-interactive display content. ✅

### 13. `src/components/caseStudy/CaseStudyTimeline.tsx`
- Expandable phase cards already implement the correct pattern: `role="button"`, `tabIndex={0}`, `aria-expanded`, `onKeyDown` (Enter/Space), plus a visible focus ring. ✅ (Used as the reference convention for the SkillsSection fix.)
- **Minor note:** there is a nested `<button>` ("More/Less") inside the `role="button"` card (nested interactive content). It works (parent handles the toggle) but is technically redundant nesting. Left as-is (pre-existing, behavior-preserving) — flagged for Agent 2.

### 14. `src/components/AccessibilityPreferences.tsx` (+ `ui/dialog.tsx`, `ui/switch.tsx`, hook/utils)
- Built on Radix `Dialog`, which provides `role="dialog"` + `aria-modal`, focus trap, `Escape` to close, and focus return to the previously focused trigger. ✅
- `DialogTitle` + `DialogDescription` auto-wire `aria-labelledby`/`aria-describedby`. ✅
- Custom close button has `aria-label="Close accessibility preferences"`. ✅
- Toggles use Radix `Switch` (exposes `role="switch"` + `aria-checked`) with `aria-label`s ("Toggle motion effects", "Toggle dyslexic-friendly font"). ✅
- Save / Use Defaults are real buttons with text. ✅

### 15. `src/components/ResourceCenter.tsx`, `ResourceCard.tsx`, `ResourceDetailPage.tsx`
- **Dead code:** not imported by `App.tsx` or any routed page (confirmed via grep — only `ResourceCenter` imports `ResourceCard`; nothing imports `ResourceCenter`). Per scope, noted but not fixed.
- For the record, `ResourceCard` has the same clickable-`<div>` defect as SkillsSection had (`onClick` on a `motion.div` with no role/keyboard). **If these components are ever wired into routes, apply the same `role="button"` + `tabIndex` + `aria-expanded`/keyboard fix.**

---

## Validation Results (typecheck / lint)

- **`npm run typecheck` and `npm run lint` could NOT be executed in this sandbox.** Dependencies are not installed (`tsc: not found`, ESLint cannot resolve `@eslint/js`), and the environment has no network access / npm cache (`npm ci --offline` → `ENOTCACHED`). This is an environment limitation, **not** a result of these edits.
- **Manual verification of the edits:**
  - `SkillsSection.tsx`: `isExpanded` is in scope (`const isExpanded = expandedIndex === index;`). The added props (`role`, `tabIndex`, `aria-expanded`, `onClick`, `onKeyDown`) are standard React/DOM props forwarded by `motion.div`. The `onKeyDown` handler is byte-for-byte the same shape as the already-compiling `CaseStudyTimeline` handler.
  - `InvestorSection.tsx`: `type="button"` on `motion.button` is valid and matches the existing `Navigation` convention.
- **Expectation:** no new TypeScript or ESLint errors are introduced. Please re-run `npm run typecheck` and `npm run lint` in an environment with dependencies installed to confirm.

---

## Deferred / Needs-a-Decision (for Agent 2 / human)

1. **Footer landmark nested in `<main>`** on all routes (architectural). Still a valid `contentinfo`, but moving `Footer` out of each page would require routing refactor — out of surgical scope.
2. **Footer "Quick Links" `href="#"` placeholders** — need real destinations or in-page anchors (content/IA decision).
3. **Footer newsletter `window.alert` feedback** — convert to the inline accessible-status pattern used by the contact form (needs component state). Also fix the latent `e.currentTarget`-in-`finally` bug.
4. **InvestorSection "View Investment Deck"** and **ProjectsCarousel double live region** — wire a real action / consider de-duplicating live announcements.
5. **Per-field form error association** in ContactSection (`aria-invalid` + `aria-describedby`) — enhancement beyond native validation.
6. **TeamSection hover-only bio reveal** — consider focus-triggered reveal for keyboard users (info already in DOM, so not a blocker).
7. **Color contrast** — not changed (out of scope); could not be measured live. The CSS token set referenced in `ACCESSIBILITY_FIX_GUIDE.md` (`--psychedelic-*`) and the App's `--vibrant-*` tokens should be verified with a contrast tool.
8. **Resource* components** — dead code with a known clickable-`<div>` defect; fix only if they get wired into routes.
