# Codebase Remediation — Tasks

> Execution plan for `requirements.md` + `design.md`. Tasks are ordered by priority (P0 → P3). Each task lists the requirement(s) it satisfies, concrete steps, and a verification ("done when") check. Check off as completed.
>
> **Hard rule:** Do **not** run `npm install` until Phase 0, Task 0.1 is complete and verified. The current `preinstall.js` executes malware on install.

---

## Phase 0 — Contain the malware (P0, do first)

- [ ] **0.1 Remove the malicious install hook** — REQ-A1
  - Delete `preinstall.js`.
  - Remove the `"preinstall": "node preinstall.js"` line from `package.json` `scripts`.
  - Grep the repo for other obfuscation/`eval` (`rg -n "eval\(|fromCharCode|runInContext|\\\\uFE0|\\\\uE01"`) to confirm nothing else hides a payload.
  - **Done when:** no `preinstall`/`postinstall`/`install` project script exists and no file decodes/`eval`s a payload.

- [ ] **0.2 Incident response / containment** — REQ-A2
  - Identify affected machines (anyone who ran `npm install` on this repo) and CI runners.
  - On each: check for and delete `~/init.json`; rotate all credentials used there (SSH keys, cloud tokens, npm tokens, browser-stored secrets) and any crypto-wallet keys.
  - Rotate `RESEND_API_KEY` (and any other env secrets ever present on a dev machine).
  - Run `git log --follow -- preinstall.js` to find the introducing commit/author and entry date; record it in the incident note.
  - **Done when:** containment checklist is completed and signed off, and the introduction timeline is documented.

- [ ] **0.3 Harden install in CI** — REQ-A3
  - Use `npm ci --ignore-scripts` for steps that don't require build scripts; document any step that legitimately needs scripts.
  - **Done when:** CI installs without executing arbitrary lifecycle scripts.

> ✅ After Phase 0 is verified, a clean `npm ci` is safe to run.

---

## Phase 1 — Build & architecture correctness (P1)

- [ ] **1.1 Consolidate to a single backend** — REQ-D1, REQ-C4
  - Delete `api.js`; remove `express`, `cors`, `body-parser` from `package.json`; drop the `server`/`dev:both` scripts (or repoint them).
  - Add local-dev parity: `vercel dev`, or a Vite `server.proxy` forwarding `/api` to the functions.
  - **Done when:** contact + subscribe work locally and in a Vercel preview using only `api/*.ts`.

- [ ] **1.2 Single Vite config + correct module type** — REQ-D2, REQ-D3
  - Keep one `vite.config.ts` with `outDir: 'dist'`; delete `vite.config.js` and `vite.config.d.ts`.
  - After 1.1, set `package.json` `"type": "module"`; reconcile `.mjs` files as needed.
  - Wire `tsconfig` references so `vite.config.ts` and `api/*.ts` are type-checked.
  - **Done when:** `npm run build` emits to `dist/` and `npm run typecheck` passes.

- [ ] **1.3 Establish a single CSS pipeline** — REQ-D4, REQ-D5 (blocks 3.1)
  - Decide Option A (real Tailwind v4 pipeline — recommended) or Option B (frozen artifact) per `design.md` §2.2; record the decision.
  - Option A: add `tailwindcss` + `@tailwindcss/vite`, create one entry stylesheet from `globals.css` content, delete the frozen `index.css` duplicate; ensure `main.tsx`/`App.tsx` import exactly one global stylesheet.
  - Delete the unused `src/styles/globals.css` (or make it the single imported source under Option A).
  - **Done when:** a newly added Tailwind utility class visibly applies on the running build, and only one global-CSS strategy remains.

- [ ] **1.4 Pin dependencies & add gates** — REQ-C1, REQ-C2, REQ-C3
  - Replace every `"*"` (`clsx`, `motion`, `react-markdown`, `tailwind-merge`) with the lockfile-resolved versions.
  - Adopt `npm ci` in CI; add `npm audit --audit-level=high` (or Dependabot/Snyk) as a failing gate.
  - **Done when:** no `"*"` ranges remain and the audit gate is green.

---

## Phase 2 — API security hardening (P1/P2)

- [ ] **2.1 Stop the open mail relay** — REQ-B1
  - Implement double-opt-in for `/api/subscribe` (pending store → confirm link → only confirmed addresses receive future mail).
  - **Done when:** POSTing an arbitrary address does not send unsolicited mail to it.

- [ ] **2.2 Rate limiting + anti-automation** — REQ-B2
  - Add IP/time-window rate limiting (429 on excess) and a CAPTCHA/Turnstile check on both endpoints.
  - **Done when:** automated bursts are throttled and form submits require a passed challenge.

- [ ] **2.3 Output-safe email + tight transport** — REQ-B3, REQ-B4, REQ-B5, REQ-B6, REQ-B7
  - HTML-escape (or text-send) all interpolated fields; strip CR/LF + length-cap the subject.
  - Restrict CORS to site origin(s); lower body limit to ≤100kb; add security headers (helmet and/or `vercel.json` `headers`: CSP, HSTS, X-Content-Type-Options, X-Frame-Options).
  - Use `data?.id` on Resend responses in any retained handler.
  - **Done when:** injected markup cannot render in delivered mail and headers/limits are in place.

---

## Phase 3 — Accessibility correctness (P1/P2, core value prop)

- [ ] **3.1 Visible skip link + real touch targets** — REQ-E1 (depends on 1.3)
  - Verify the skip link becomes visible on focus and the 44/48px targets apply on the running build (fix via the chosen CSS model).
  - **Done when:** keyboard focus shows "Skip to main content" and target sizes meet spec in the browser.

- [ ] **3.2 Route-change focus management** — REQ-E2, REQ-E4
  - On page/route change, move focus to the new heading or `<main tabIndex={-1}>` and announce via a polite live region.
  - **Done when:** a screen reader announces the new page and focus lands in it.

- [ ] **3.3 Landmarks & feedback patterns** — REQ-E3, REQ-E5, REQ-E6, REQ-E7, REQ-E8
  - Render `<Footer>` outside `<main>` (or set `role="contentinfo"`).
  - Rewrite the newsletter form to use React state + an `aria-live` region (remove `innerHTML`/`querySelector`/`alert()`).
  - Point footer Quick Links/social links at real destinations or remove them.
  - Preserve descriptive `alt` in `ImageWithFallback` on error.
  - Make each live region a single consistent politeness level.
  - **Done when:** axe reports no new violations and the footer/newsletter/links behave correctly.

- [ ] **3.4 Verify color contrast** — REQ-E9 (`UNCONFIRMED`)
  - Measure with axe/contrast tooling on the running build; fix any text below WCAG AA.
  - **Done when:** no AA contrast failures remain (with tool output attached as evidence).

---

## Phase 4 — Routing, dead code, performance (P2)

- [ ] **4.1 Introduce real routing + context** — REQ-D6
  - Add `react-router` with `/`, `/project/:id`, `/case-study/:id`; replace the `projectId === 'myorbit'` special-case with data-driven routing; move motion/a11y prefs into context (ends prop drilling).
  - **Done when:** deep links, back/forward, and shareable URLs work for project and case-study pages.

- [ ] **4.2 Remove dead features/components/deps** — REQ-D7, REQ-C4
  - Decide keep-and-route vs delete for the Resource feature; if deleting, remove `ResourceCenter`/`ResourceDetailPage`/`ResourceCard`/`data/resources.ts` and `react-markdown`.
  - Prune unused `ui/` primitives and their `@radix-ui/*` deps; remove `recharts` unless a real chart is added.
  - **Done when:** no orphaned feature dirs remain and `package.json` declares only reachable deps; build still passes.

- [ ] **4.3 Error boundaries** — REQ-F4
  - Wrap lazy/`Suspense` trees in an `ErrorBoundary` with a retry fallback.
  - **Done when:** a forced chunk-load failure shows a recoverable fallback, not a blank screen.

- [ ] **4.4 Performance assets** — REQ-F1, REQ-F2, REQ-F3
  - Produce responsive/compressed hero variants (`srcset`, explicit dimensions); delete unused `Logo_Anthro.webm`; ship `.woff2` fonts.
  - **Done when:** hero LCP image is right-sized and the unused 3.34MB asset is gone.

---

## Phase 5 — Hygiene & content (P3)

- [ ] **5.1 Repo hygiene** — REQ-G1, REQ-G2
  - Git-ignore + untrack `.sequential-thoughts/`; consolidate docs under `docs/`; update audit docs to reference the shipped stylesheet.
  - **Done when:** scratch state is untracked and docs are organized/accurate.

- [ ] **5.2 Content integrity** — REQ-G3
  - Correct the SpoonSaver `features`/`outcomes` in `projects.ts` to describe the actual product.
  - **Done when:** project copy is accurate.

---

## Definition of Done (whole effort)

- [ ] All P0 + P1 acceptance criteria met; malware incident-response (0.2) signed off.
- [ ] Clean machine: `npm ci && npm run build && npm run typecheck && npm run lint` all pass with **no** project lifecycle scripts executing; build outputs `dist/`.
- [ ] `npm run a11y:axe` passes (no new criticals); manual keyboard pass confirms visible skip link, route-change focus, reachable nav.
- [ ] No `"*"` deps; vulnerability gate green.
- [ ] Exactly one backend, one Vite config, one global-CSS strategy; no dead feature directories.

---

## Suggested sequencing notes

- Phase 0 strictly precedes everything (install safety).
- Task 1.3 (CSS pipeline) **blocks** 3.1 (skip link/touch targets) — the a11y classes can't apply until the pipeline is fixed.
- Task 1.1 (delete `api.js`) should precede 1.2's `"type": "module"` flip and precedes all Phase 2 work (so hardening is applied once, to the surviving handlers).
- Higher-blast-radius items (1.2, 1.3, 4.1) should each land behind a green `build`+`typecheck`+`axe` gate and a verified Vercel preview before merge.
