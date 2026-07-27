# Codebase Remediation — Requirements

> **Project:** Savoirity LLC (React 18 + Vite 6 + TypeScript marketing/portfolio site, Vercel-hosted, Resend email).
> **Status:** Draft for dev-team execution.
> **How this spec was produced:** A senior engineer plus three scoped expert reviews (Application Security, Software Architecture/Build, Frontend/Accessibility/Performance) performed a read-only audit. Every requirement below traces to a **validated finding** — proven from source code, `git` history, and import-graph evidence — not a hunch. Where a concern could **not** be proven, it is explicitly labelled `UNCONFIRMED` with the evidence that would settle it.

---

## 1. Purpose & Scope

This document defines **what must be true** after remediation and **why**. It does not prescribe implementation (see `design.md`) or sequencing (see `tasks.md`).

In scope: the malicious `preinstall` hook, API security, dependency supply-chain hygiene, build/config correctness, dead code/architecture, and accessibility/performance correctness (the product's core value proposition is "neurodivergent / accessible design", so a11y defects are treated as functional defects, not nice-to-haves).

Out of scope: net-new product features, visual redesign, content/marketing copy strategy (except the one factual content-integrity bug noted).

---

## 2. Priority & Severity Legend

| Priority | Meaning |
|----------|---------|
| **P0** | Active security threat or build-breaking; must be done before anything else, including before the next `npm install`. |
| **P1** | High-impact correctness/security/maintainability; schedule immediately after P0. |
| **P2** | Medium-impact correctness, a11y, or performance. |
| **P3** | Low-impact hygiene / cleanup. |

Acceptance criteria use EARS-style phrasing (`WHEN <trigger>, THE SYSTEM SHALL <observable behavior>`) so each is independently testable.

---

## 3. Requirements

### EPIC A — Eliminate the malicious install hook (P0, CRITICAL)

**Validated finding.** `preinstall.js` is obfuscated malware that runs automatically via the npm `preinstall` hook (`package.json` `scripts.preinstall: "node preinstall.js"`). Decoding it **without executing** proved a multi-stage payload:
- **Stage 1:** the file body is a string of invisible Unicode *variation selectors* (`U+FE00–U+FE0F`, `U+E0100–U+E01EF`) that decode to bytes, which are `eval()`'d.
- **Stage 2:** those bytes AES-256-CBC-decrypt (hardcoded key `zetqHyfDfod88zloncfnOaS9gGs90ONX`, IV `a041fdaa…`) to a dropper that: polls the **Solana blockchain as a command-and-control channel** (reads transaction-memo payload URLs from hardcoded wallet `BjVeAjPrSKFiingBn4vZvghsGj9KCE8AJVtbc9S8o8SC`), **geofences away from Russian-locale/timezone systems**, writes a persistence marker (`init.json`) into the user's home directory, then fetches and `eval()`s further remote code (with `secretkey`/`ivbase64` response headers).

This is an active credential/wallet-stealer that executes on any developer or CI machine running `npm install`.

- **REQ-A1 (P0):** The repository SHALL NOT contain `preinstall.js` or any equivalent obfuscated/auto-executing script.
  - *AC1:* WHEN the repository is checked out, THE SYSTEM SHALL contain no file that decodes Unicode variation-selector or other steganographic payloads, and no script invoking `eval`/`vm.runInContext` on decoded/remote data.
  - *AC2:* WHEN `npm install` runs, THE SYSTEM SHALL NOT execute any project-authored `preinstall`/`postinstall`/`install` lifecycle script. (`package.json` has no such hook.)
- **REQ-A2 (P0):** All machines (developer + CI) that previously ran `npm install` on this repo SHALL be treated as potentially compromised and remediated.
  - *AC1:* A documented incident response SHALL exist covering: rotating all credentials/SSH keys/cloud tokens and crypto-wallet secrets used on affected machines; checking for and removing `~/init.json`; and rotating `RESEND_API_KEY`.
  - *AC2:* `git log` for `preinstall.js` SHALL be reviewed to identify the introducing commit/author and when it entered history.
- **REQ-A3 (P1):** The project SHALL gain a guard that prevents a malicious lifecycle script from silently re-entering.
  - *AC1:* WHEN dependencies are installed in CI, THE SYSTEM SHALL use `npm ci --ignore-scripts` for any step that does not require build scripts, or otherwise document why scripts are needed.

> Note: removing `preinstall.js` does not undo prior infection on a machine that already ran it. REQ-A2 is mandatory, not optional.

---

### EPIC B — Secure the email API (P1)

The contact + newsletter endpoints exist in **two** implementations: the Vercel serverless functions in `api/` (production — proven below) and `api.js` (an unused Express duplicate). Requirements apply to whichever implementation survives EPIC D consolidation.

- **REQ-B1 (P1) — No open mail relay.** *Finding:* `/api/subscribe` sends a welcome email to any attacker-supplied address (`to: [email]`) with only a regex check (`api/subscribe.ts:26`, `api.js:95`).
  - *AC1:* WHEN an anonymous client POSTs an arbitrary email to the subscribe endpoint, THE SYSTEM SHALL NOT immediately send mail to that address; it SHALL instead require a verification/double-opt-in step before any further mail.
- **REQ-B2 (P1) — Rate limiting & anti-automation.** *Finding:* no rate limiting, CAPTCHA, or throttling on either endpoint (grep for `rate.?limit|helmet|captcha|throttle` = 0 matches).
  - *AC1:* WHEN a client exceeds a configured request threshold per IP/time window, THE SYSTEM SHALL reject further requests with HTTP 429.
  - *AC2:* WHEN the contact or subscribe form is submitted, THE SYSTEM SHALL validate a bot-mitigation challenge (e.g. CAPTCHA/Turnstile) before sending mail.
- **REQ-B3 (P2) — Output-safe email content.** *Finding:* `name`, `project`, `message` are interpolated unescaped into email HTML; `name` into the Subject (`api/send-contact.ts:34,37-41`, `api.js:41,44-48`).
  - *AC1:* WHEN user input is placed into an outgoing email, THE SYSTEM SHALL HTML-escape it (or send text email) so injected markup/links cannot render.
  - *AC2:* WHEN building the email subject, THE SYSTEM SHALL strip CR/LF and length-cap the value.
- **REQ-B4 (P2) — Restrictive CORS.** *Finding:* `app.use(cors())` reflects any origin (`api.js:9`).
  - *AC1:* WHEN a cross-origin request arrives at an email endpoint, THE SYSTEM SHALL only permit configured site origin(s).
- **REQ-B5 (P3) — Sane body limits.** *Finding:* 10mb JSON/urlencoded limit for a tiny form (`api.js:10-11`).
  - *AC1:* THE SYSTEM SHALL cap request bodies to ≤100kb and enforce per-field length limits.
- **REQ-B6 (P3) — Security headers.** *Finding:* no `helmet`/CSP/HSTS on the API and no `headers` block in `vercel.json`.
  - *AC1:* THE SYSTEM SHALL set CSP, HSTS, `X-Content-Type-Options`, and `X-Frame-Options` (or `frame-ancestors`) on served responses.
- **REQ-B7 (P3) — Robustness parity.** *Finding:* `api.js:60,63` dereferences `data.id` (potential null) whereas serverless uses `data?.id`. Mostly moot if `api.js` is deleted (EPIC D).
  - *AC1:* THE SYSTEM SHALL use optional chaining on Resend responses in any retained handler.

> **Verified clean (no action required):** `.env` is git-ignored (`.gitignore:5`); a full git-history secret scan found **no** committed API keys/tokens; secrets are read only server-side from `process.env`; no client `VITE_`/`import.meta.env` secret leakage.

---

### EPIC C — Dependency supply-chain hygiene (P1)

- **REQ-C1 (P1) — No floating versions.** *Finding:* `package.json` pins four deps to `"*"` — `clsx` (L34), `motion` (L42), `react-markdown` (L48), `tailwind-merge` (L53) — accepting any future (possibly malicious) release.
  - *AC1:* THE SYSTEM SHALL specify an exact or caret-bounded version for every dependency; no `"*"` ranges SHALL remain.
- **REQ-C2 (P1) — Reproducible installs.** 
  - *AC1:* WHEN CI installs dependencies, THE SYSTEM SHALL use `npm ci` against a committed lockfile (lockfile is already present).
- **REQ-C3 (P2) — Continuous vulnerability gating.**
  - *AC1:* WHEN CI runs, THE SYSTEM SHALL fail the build on high/critical advisories (`npm audit --audit-level=high` or an SCA tool such as Dependabot/Snyk).
- **REQ-C4 (P2) — Remove unused dependencies.** *Finding (import-graph proven):* `recharts` is imported only by the unimported `ui/chart.tsx`; `express`/`cors`/`body-parser` exist only for the dead `api.js`; ~30 `@radix-ui/*` packages back unused `ui/` primitives.
  - *AC1:* THE SYSTEM SHALL declare only dependencies that are reachable from a production entry point.

---

### EPIC D — Architecture & build correctness (P1)

- **REQ-D1 (P1) — Single backend source of truth.** *Finding (proven):* production uses the Vercel functions in `api/` — the frontend fetches relative `/api/...` (`ContactSection.tsx:64`, `Footer.tsx:226`) and `vercel.json:7-12` rewrites everything *except* `/api/` to `index.html`. `api.js` is never reached (no proxy, no base URL, nothing calls `localhost:5000`) and has already diverged from the functions.
  - *AC1:* THE SYSTEM SHALL have exactly one implementation of the contact and subscribe logic.
  - *AC2:* WHEN running locally, THE SYSTEM SHALL exercise the same handler code that production uses (e.g. via `vercel dev` or a Vite proxy), not a divergent copy.
- **REQ-D2 (P1) — One correct Vite config.** *Finding (proven):* three configs exist; Vite resolves `vite.config.js` first (`outDir: 'dist'`, matches `vercel.json`), `vite.config.ts` is dead and **divergent** (`outDir: 'build'` — deleting the `.js` would silently break the Vercel deploy), and `vite.config.d.ts` is a stray generated declaration file.
  - *AC1:* THE SYSTEM SHALL contain exactly one Vite config whose `outDir` matches `vercel.json` `outputDirectory` (`dist`).
  - *AC2:* No generated `*.d.ts` for config files SHALL be committed.
- **REQ-D3 (P1) — Correct module type.** *Finding:* `package.json` `"type": "commonjs"` exists only to let the dead `api.js` use `require()`, and forces `.mjs` workarounds (`eslint.config.mjs`, `scripts/run-axe.mjs`).
  - *AC1:* WHEN `api.js` is removed, THE SYSTEM SHALL set `"type": "module"` (or otherwise be internally consistent ESM), and the build/lint/typecheck SHALL pass.
- **REQ-D4 (P0/P1 — build-correctness) — A real CSS pipeline OR a documented frozen artifact.** *Finding (independently confirmed by two reviewers):* `src/index.css` is a **pre-compiled** Tailwind v4.1.3 artifact (`/*! tailwindcss v4.1.3 */` banner, last changed in the initial commit), but the project has **no** `tailwindcss`/`@tailwindcss/vite`/PostCSS dependency and **no** Tailwind plugin in the Vite config. Therefore **any Tailwind utility class added after the initial commit is never generated** and silently does nothing. This directly breaks accessibility fixes (see EPIC E / REQ-E1).
  - *AC1:* WHEN a developer adds a Tailwind utility class in a component, THE SYSTEM SHALL generate that class so it takes effect at runtime — OR, if a frozen stylesheet is intentionally retained, the repo SHALL document that and forbid new Tailwind utilities (lint/PR check).
  - *AC2:* THE SYSTEM SHALL have a single, imported global stylesheet strategy.
- **REQ-D5 (P2) — Remove dead stylesheets.** *Finding:* `src/styles/globals.css` (654 lines) is imported by nothing (grep across `src` = 0 imports) yet duplicates a11y rules and is the file the audit docs tell developers to edit — a divergence trap.
  - *AC1:* THE SYSTEM SHALL retain only stylesheets that are imported by the app; any kept-for-reference file SHALL be clearly non-authoritative.
- **REQ-D6 (P2) — Routing with real URLs.** *Finding:* navigation is a hand-rolled `useState<'home'|'project'|'case-study'>` state machine with a hardcoded `projectId === 'myorbit'` branch (`App.tsx:66-97`); no router dependency. Consequences: no deep links, no shareable URLs, no browser back/forward, `enableMotion` prop-drilled into every section, and the Resource pages are unreachable.
  - *AC1:* WHEN a user navigates to a project/case-study page, THE SYSTEM SHALL reflect it in the URL and support browser back/forward and direct deep-linking.
  - *AC2:* THE SYSTEM SHALL provide cross-cutting state (motion/accessibility prefs) via context rather than prop drilling.
- **REQ-D7 (P2) — Remove dead features/components.** *Finding (import-graph proven):* the Resource feature (`ResourceCenter`, `ResourceDetailPage`, `ResourceCard`, `data/resources.ts`) is referenced only among itself and is never mounted; ~40 of ~46 `ui/` shadcn primitives are unimported.
  - *AC1:* THE SYSTEM SHALL either wire a feature into a reachable route or remove it; no orphaned feature directories SHALL remain.

---

### EPIC E — Accessibility correctness (P1 — core value proposition)

- **REQ-E1 (P1) — Accessibility utility classes must actually apply.** *Finding (proven via grep of the shipped CSS):* the skip-link relies on `focus:not-sr-only focus:absolute focus:top-4 …` (`App.tsx:143-153`) and touch targets rely on `min-h-[44px]`/`min-w-[48px]` (`Navigation.tsx:49,102`, `ProjectsCarousel.tsx:359,370,389`) — **none of these classes exist in the loaded CSS** (`index.css`/`styles.css`), because of REQ-D4. Result: the "Skip to main content" link is invisible to sighted keyboard users (WCAG 2.4.1/2.4.7 intent unmet) and the WCAG 2.5.5 touch-target fixes are no-ops.
  - *AC1:* WHEN a keyboard user tabs to the skip link, THE SYSTEM SHALL render it visibly.
  - *AC2:* THE SYSTEM SHALL render the documented minimum touch-target sizes for the affected controls.
- **REQ-E2 (P1) — Focus management on route changes.** *Finding:* route changes only `setState` + `window.scrollTo` + update `document.title` (`App.tsx:74-97,118-126`); no `main.focus()` / live-region announcement, so screen-reader users are not informed of the new page.
  - *AC1:* WHEN the active page/route changes, THE SYSTEM SHALL move focus to the new page's main heading or `<main>` and announce the change via a polite live region.
- **REQ-E3 (P2) — Correct landmarks.** *Finding:* `<Footer>` renders **inside** `<main id="main-content">` (`App.tsx:162-224`, also in `MyOrbitCaseStudyPage`), so `<footer>` does not expose the `contentinfo` landmark.
  - *AC1:* THE SYSTEM SHALL expose the footer as a `contentinfo` landmark (render it outside `<main>` or set the role explicitly).
- **REQ-E4 (P2) — Focusable skip target.** *Finding:* `<main id="main-content">` lacks `tabIndex={-1}` (`App.tsx:162`), so skip-link focus placement is browser-inconsistent.
  - *AC1:* THE SYSTEM SHALL make the skip-link target programmatically focusable.
- **REQ-E5 (P2) — Idiomatic React feedback in the newsletter form.** *Finding:* `Footer.tsx:218-256` mutates `innerHTML` of a `motion.button`, reads the input via `querySelector`, and reports via blocking `alert()` — fighting React reconciliation and giving poor AT feedback, inconsistent with the accessible `role="alert"` pattern already built in `ContactSection`.
  - *AC1:* THE SYSTEM SHALL drive the newsletter field/label from React state and surface results via an `aria-live` region.
- **REQ-E6 (P2) — No dead navigation affordances.** *Finding:* footer Quick Links are all `href="#"` and both social links are `href:'#'` then filtered out, leaving an empty social row and dead icons (`Footer.tsx:21-24,168-172,269-270`).
  - *AC1:* THE SYSTEM SHALL point navigation/social links at real destinations or remove them.
- **REQ-E7 (P2) — Preserve alt text on image error.** *Finding:* `ImageWithFallback.tsx:31` replaces the descriptive `alt` with `"Error loading image"` on failure.
  - *AC1:* WHEN an image fails to load, THE SYSTEM SHALL preserve its descriptive alternative text.
- **REQ-E8 (P3) — Resolve contradictory live-region politeness.** *Finding:* carousel sets `aria-live="polite"` on a region containing another polite region (`ProjectsCarousel.tsx:142-149`); contact status sets both `role="alert"` and `aria-live="polite"` (`ContactSection.tsx:324-325`).
  - *AC1:* THE SYSTEM SHALL declare one consistent politeness level per live region.
- **REQ-E9 (P3) — `UNCONFIRMED`: color-contrast claims.** The audit docs claim contrast fixes, but actual ratios against the dark/gradient backgrounds were never measured.
  - *AC1:* THE SYSTEM SHALL be verified with an automated contrast checker against the running build; any text below WCAG AA SHALL be corrected. *(Confirming evidence: axe/contrast tool output on the deployed CSS.)*

---

### EPIC F — Performance (P2)

- **REQ-F1 (P2) — Optimize the hero LCP image.** *Finding (`ls -la`):* `src/assets/background_sand.webp` is ~1.99 MB, rendered as the hero `<img>` with no `width`/`height`/`srcset` (`HeroSection.tsx:20-25`) → heavy LCP + layout shift.
  - *AC1:* THE SYSTEM SHALL serve responsive, compressed hero image variants with explicit dimensions.
- **REQ-F2 (P3) — Remove the unused 3.34 MB media asset.** *Finding:* `src/assets/Logo_Anthro.webm` (~3.34 MB) has zero references in `src`.
  - *AC1:* THE SYSTEM SHALL not contain unreferenced large media assets.
- **REQ-F3 (P3) — Ship `.woff2` fonts.** *Finding:* OpenDyslexic fonts are `.woff` (~328 KB) rather than smaller `.woff2`.
  - *AC1:* THE SYSTEM SHALL serve `.woff2` font formats.
- **REQ-F4 (P2) — Error boundaries around lazy trees.** *Finding:* heavy sections use `lazy()` + `Suspense` (`App.tsx:12-46`) but there is no `ErrorBoundary` anywhere in `src`; a chunk-load failure yields a blank-screen crash.
  - *AC1:* WHEN a lazily-loaded chunk fails to load, THE SYSTEM SHALL show a recoverable fallback rather than a blank screen.

---

### EPIC G — Repository hygiene & content integrity (P3)

- **REQ-G1 (P3) — Stop tracking AI scratch state.** *Finding:* `.sequential-thoughts/{branches,history,thoughts}.json` are git-tracked.
  - *AC1:* THE SYSTEM SHALL git-ignore and untrack agent scratch directories.
- **REQ-G2 (P3) — Consolidate docs.** *Finding:* many root-level markdown/agent files (`ACCESSIBILITY_AUDIT_*`, `ACCESSIBILITY_FIX_GUIDE.md`, `DEVELOPMENT_NOTES.md`, `GEMINI.MD`, `AGENT.md`, `SETUP_RESEND.md`).
  - *AC1:* THE SYSTEM SHALL organize documentation under `docs/`, and audit docs SHALL reference the **shipped** stylesheet (not the dead `globals.css`).
- **REQ-G3 (P3) — Fix the SpoonSaver content mismatch.** *Finding:* `projects.ts:78-91` describes kanban boards / "73% reduction in unnecessary meetings" for what should be an energy-tracker — copy from a different product.
  - *AC1:* THE SYSTEM SHALL present accurate project descriptions/outcomes.

---

## 4. Global Definition of Done

- All P0 + P1 acceptance criteria met and verified.
- `npm ci && npm run build && npm run typecheck && npm run lint` succeed on a clean machine with **no** project lifecycle scripts executing.
- `npm run a11y:axe` (axe) passes with no new critical violations; manual keyboard pass confirms a visible skip link, route-change focus, and reachable navigation.
- No `"*"` dependency ranges; vulnerability gate green.
- Exactly one backend implementation, one Vite config, one global-CSS strategy; no dead feature directories.
- The malware incident-response checklist (REQ-A2) is completed and signed off.

---

## 5. Traceability

Every requirement above is backed by a specific code/`git`/import-graph observation captured during the audit. Items that could not be proven are marked `UNCONFIRMED` with the evidence needed to confirm them. Design rationale (the "why" behind each chosen approach) lives in `design.md`; execution order lives in `tasks.md`.
