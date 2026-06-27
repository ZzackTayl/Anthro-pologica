# Accessibility Affordance Review — Agent 2 (Critical Review & Refinement)

**Reviewer:** Agent 2 — Principal Accessibility Engineer (critical reviewer of Agent 1)
**Scope:** Review/refine Agent 1's affordance pass (`ACCESSIBILITY_AFFORDANCE_REVIEW_AGENT1.md`), catch mistakes, and fix the clearly code-fixable issues Agent 1 deferred. No visual redesign, no copy/prose changes.
**Standard:** WCAG 2.2 AA.

---

## 1. Verdict on Agent 1's edits

### 1a. `SkillsSection.tsx` — `role="button"` + `tabIndex` + `aria-expanded` + Enter/Space handler — **KEPT (correct, with documented tradeoff)**
- **Confirmed correct & functional.** `isExpanded` is in scope; `role`, `tabIndex`, `aria-expanded`, `onClick`, `onKeyDown` are valid DOM props forwarded by `motion.div`. `Space` is `preventDefault`-ed to stop page scroll. The global `*:focus-visible` rule in `src/styles/globals.css` (line 530) gives the card a visible 3px focus outline, so focus is discoverable. This resolves the real defects: WCAG 2.1.1 (Keyboard) and 4.1.2 (Name/Role/Value).
- **The flagged concern is real but accepted.** `role="button"` sets *children-presentational* in the ARIA tree, so the nested `<h3>` title and `<ul>` details are flattened — a screen reader will not find the card title via heading navigation, and the button's accessible name becomes the concatenation of all visible text (title + description + every detail item, since the details panel is animated with `height/opacity` and is never `display:none`/`aria-hidden`, so it is always in the a11y tree). This is verbose but **loses no information**.
- **Decision: do NOT refactor to a heading-based disclosure here.** I evaluated moving the button semantics onto the trigger (real `<button>` wrapping just the title with `aria-expanded`/`aria-controls`, panel as a sibling region). Rejected as **not clearly low-risk** because it would: (a) change the established whole-card click target (currently the entire card toggles on click) to header-only, a behavior change; (b) require resetting native `<button>` styling to avoid altering the card's typography/layout, and there is no way to visually verify in this sandbox; (c) diverge from the repo's own shipped convention — `caseStudy/CaseStudyTimeline.tsx` uses the identical `role="button"`-on-container pattern in production. Agent 1's edit is consistent with that precedent and preserves 100% of the visuals/animations/behavior.
- **Why not add `aria-label`:** giving the card button `aria-label={title}` would make the name concise but would *suppress* the description/details from assistive tech entirely (override + children-presentational). That removes information, so it is a net regression — deliberately avoided.
- **Tradeoff documented + recommended future work:** when a visually-reviewed pass is possible, convert each card to a true disclosure (`<h3><button aria-expanded aria-controls=…>title</button></h3>` + sibling `role="region"` panel with an `id`, and `aria-hidden`/unmount the panel when collapsed). That restores heading navigation and trims the announced name. Same upgrade should be applied to `CaseStudyTimeline.tsx` for consistency.

### 1b. `InvestorSection.tsx` — added `type="button"` — **CORRECT & COMPLETE**
- The "View Investment Deck" control is a real `<motion.button>` with discernible text and is keyboard-operable. Adding an explicit `type="button"` prevents an implicit `type="submit"` if the button is ever placed inside a form, matching the convention used by `Navigation` buttons. Valid prop on `motion.button`; no behavior change.
- The button still has **no `onClick`/destination** (placeholder). Wiring a real action/link is a content/design decision — correctly left for a human (see §3).

---

## 2. New fixes made by Agent 2

### 2.1 `Footer.tsx` — newsletter Subscribe: accessible inline status + bug fix — **FIXED**
- **What:** Replaced `window.alert(...)` feedback and the `button.innerHTML` mutation with React state (`email`, `isSubscribing`, `subscribeStatus`) and an inline status message: `role="status"` + `aria-live="polite"` on success, `role="alert"` + `aria-live="assertive"` on error (both `aria-atomic="true"`), mirroring the accessible pattern in `ContactSection.tsx`. The `<div>` wrapper is now a `<form onSubmit={handleSubscribe} noValidate>` with a controlled `<input>` and a `type="submit"` button that shows `Subscribing...`/disabled state.
- **Why:** `window.alert` is a disruptive, non-inline announcement and the dynamic `innerHTML` swap is not exposed as a status to assistive tech. The new pattern announces success/failure politely/assertively in-context.
- **Bug fixed:** the original code captured `e.currentTarget` and reused it inside the async `.finally()` to restore `innerHTML`. React pools/nullifies `currentTarget` after the handler returns, so `e.currentTarget` could be `null` in `.finally()` (a latent crash). The state-driven approach removes the `currentTarget` dependency entirely.
- **Preserved:** the `/api/subscribe` endpoint, request shape (`{ email }`), success/error semantics, and the button's gradient/border styling.

### 2.2 `ProjectsCarousel.tsx` — de-duplicated live regions — **FIXED**
- **What:** Removed `aria-live="polite"` and `aria-atomic="false"` from the outer `role="region" aria-label="Projects carousel"` wrapper. Kept the dedicated `sr-only` `aria-live="polite" aria-atomic="true"` announcer as the single source of slide-change announcements.
- **Why:** The big region (which contains the entire changing carousel) AND a nested `sr-only` announcer were both live regions, producing double/verbose screen-reader output on every slide change. Now exactly one polite live region announces "Viewing project N of M: <title>". The visible carousel, controls, and `role="region"` landmark are untouched.

### 2.3 `Footer.tsx` — Quick Links anchors — **PARTIALLY FIXED**
- **What:** Converted the Quick Links from a string array of `href="#"` placeholders to a `{ label, href }` list and wired **"Projects" → `#projects-section`** — the only target with a verified existing anchor (`<section id="projects-section">` in `ProjectsCarousel.tsx`).
- **Left as `#` (flagged for human, see §3):** About, Services, Team, Contact. There are **no** `id` anchors for these (confirmed via grep: the only in-component section `id` is `projects-section`). "About" and "Services" have no corresponding section on the site at all; "Team"/"Contact" sections exist but carry no `id`. Adding anchors + deciding footer IA (and home-vs-other-route navigation) is a content/IA decision, so I did not guess.
- Note: `#projects-section` only exists on the home route; on project/case-study routes the link is a harmless no-op (same as the previous `#`, but on home it now correctly scrolls to Projects).

---

## 3. Confirmed issues intentionally left for human decision

1. **ContactSection per-field `aria-invalid`/`aria-describedby`** — **DEFERRED (documented, not forced).** The form relies on native HTML constraint validation (`required`, `type="email"`) with a single **form-level** status region; there are no per-field error states or per-field error message elements. Wiring per-field `aria-invalid`/`aria-describedby` would require replacing native validation with a custom per-field validation model (new state + error nodes) — a large, behavior-changing refactor that the brief says to document rather than force. Native validation is acceptable for AA. Recommend implementing as a dedicated enhancement (the form already imports `react-hook-form`, which could drive it cleanly).
2. **Footer Quick Links: About / Services / Team / Contact destinations** — need real targets or in-page anchors; this is an information-architecture/content decision (see §2.3).
3. **InvestorSection "View Investment Deck"** — placeholder with no `onClick`/destination; wiring a real action/link is a product/content decision.
4. **SkillsSection (and CaseStudyTimeline) full disclosure refactor** — recommended future, visually-reviewed upgrade to restore heading navigation and trim announced names (see §1a). Not done now to avoid visual/behavior regression risk.
5. **Resource\* components (`ResourceCenter`/`ResourceCard`/`ResourceDetailPage`)** — confirmed **dead code**: not imported by `App.tsx` or any routed page (grep confirms nothing imports `ResourceCenter`; only `ResourceCenter` imports `ResourceCard`). Not wired into routes, so left untouched. They share the same clickable-`<div>` defect SkillsSection had — apply the keyboard/role fix if they are ever routed.

---

## 4. Validation status

- **`npm run lint` / typecheck could NOT be executed.** `node_modules/` exists but is **empty** (no `typescript`, no `eslint`, no `.bin`), and the sandbox has **no network** (`npx tsc` attempted to fetch an unrelated package and failed). There is no `typecheck` npm script; typechecking normally runs via `tsc -b` inside `npm run build`. This is an **environment limitation**, not a result of these edits.
- **Manual verification performed (imports resolve, state/handlers in scope, props valid, JSX balanced):**
  - `Footer.tsx`: `FormEvent` + `useState` imported and used; `email`/`isSubscribing`/`subscribeStatus` and `handleSubscribe`/`quickLinks` all in scope and referenced in JSX; `<form>`/status `<p>` tags balanced; `Settings`/`Instagram`/`Linkedin`/`Heart` imports still used; no remaining `e.currentTarget` reference. The catch binding `error` is used (`console.error`).
  - `ProjectsCarousel.tsx`: only removed two attributes from the wrapper `<div>`; element/JSX still balanced; `currentIndex`/`currentProject` announcer intact.
  - `SkillsSection.tsx` / `InvestorSection.tsx`: Agent 1's props are valid on `motion.div`/`motion.button`; no type/scope issues.
- **No formatter run** to avoid mass-reformatting; edits match existing 2-space style and surrounding conventions. Diffs are surgical (4 files: `Footer.tsx`, `ProjectsCarousel.tsx`, plus Agent 1's `SkillsSection.tsx`/`InvestorSection.tsx` reviewed).
- **Recommendation:** re-run `npm install && npm run lint && npm run build` in a networked environment to confirm no new TS/ESLint errors (expected: none).
