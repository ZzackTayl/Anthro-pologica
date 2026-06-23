# Codebase Remediation — Design

> Companion to `requirements.md` (what & why) and `tasks.md` (how & order).
> This document explains the **validated root cause** of each problem and the **recommended technical approach**, including trade-offs, so the dev team executes with understanding rather than by rote. No step here rests on a hunch; each references proof gathered during the audit.

---

## 1. Guiding principles

1. **Prove, don't assume.** Each design decision below names the evidence (file:line, `git` history, import-graph grep) that justifies it. If something is unproven it is flagged and a confirmation step is built in.
2. **Single source of truth.** The biggest class of bugs here comes from *duplicated, divergent* artifacts (two backends, three Vite configs, three global stylesheets). The design collapses each to one canonical version.
3. **Security first, then correctness, then polish.** Sequencing in `tasks.md` follows the P0→P3 ladder.
4. **Smallest change that removes the root cause.** Prefer deleting dead code and fixing the pipeline over patching symptoms (e.g., fix the CSS build rather than hand-writing the missing classes).

---

## 2. Threat & root-cause analysis

### 2.1 The `preinstall.js` malware (root cause: malicious supply-chain insertion)

**What it is, proven by decoding it without executing it:**

```
preinstall.js  →  invisible Unicode variation selectors (U+FE00–U+FE0F, U+E0100–U+E01EF)
               →  decoded bytes eval()'d (Stage 1)
               →  AES-256-CBC (key "zetqHyfDfod88zloncfnOaS9gGs90ONX", IV a041fdaa…) decrypts to Stage 2
Stage 2 dropper:
  • getSignaturesForAddress() against many Solana RPCs for wallet
    BjVeAjPrSKFiingBn4vZvghsGj9KCE8AJVtbc9S8o8SC  →  C2 over the blockchain (memo = payload URL)
  • _isRussianSystem() geofence (skips ru locale/timezone) — classic actor self-protection
  • writes ~/init.json persistence/run marker (special-cases macOS)
  • fetch(atob(link)) → eval(atob(payload)) / vm.runInContext with secretkey+iv headers → remote code exec
```

**Root cause:** a lifecycle hook (`package.json` → `scripts.preinstall`) was pointed at an obfuscated file. npm runs `preinstall` automatically, so simply installing dependencies executes attacker code. This is not a bug to "fix" — it is hostile code to **remove**, plus an **incident** to contain.

**Design decision.**
- Delete `preinstall.js` and the `preinstall` script entry. There is no legitimate functionality to preserve (the decoded payload is exclusively C2/stealer logic).
- Treat every machine that ran `npm install` as compromised (REQ-A2). The dropper exfiltrates via remote code it downloads, so we must assume credential/wallet theft. Containment > cleanup.
- Add a defense-in-depth guard: prefer `npm ci --ignore-scripts` in CI for steps that don't need build scripts, and review history to find the introducing commit (`git log --follow -- preinstall.js`).
- **Do not** run `npm install` while the file is present. Decode/inspect only (as the audit did).

### 2.2 The "phantom CSS" defect (root cause: a compiled artifact masquerading as a source file)

**Proven chain of evidence:**
- `src/index.css:34` carries the banner `/*! tailwindcss v4.1.3 | MIT License */` → it is **build output**, not authored CSS.
- `package.json` has **no** `tailwindcss` / `@tailwindcss/vite` / PostCSS; only `tailwind-merge` (a class-string merger, not a compiler). The Vite config uses `plugins: [react()]` only.
- `git log` shows `index.css` last changed in the **initial commit**, while the accessibility-fix commits landed later.
- Grep of the *shipped* CSS (`index.css` + `styles.css`) for the fix classes (`focus:not-sr-only`, `min-h-[44px]`, …) returns **zero** matches.

**Root cause:** Tailwind was run **once** offline; its output was committed and the build pipeline that would regenerate it was never added. So new utility classes are dead on arrival. This single root cause explains the dead skip-link, dead touch targets, and the misleading `globals.css` (the file devs were told to edit, which is never imported).

**Design decision — pick ONE model and make it enforceable:**
- **Option A (recommended): restore a real Tailwind v4 pipeline.** Add `tailwindcss` + `@tailwindcss/vite`, make a single entry stylesheet `@import "tailwindcss";` plus the project's `@theme`/custom layers (use the existing `globals.css` content as the source), delete the frozen `index.css`, and delete the unused duplicate. Pro: utilities work as written; the large body of existing `*:hover`/`focus:*`/arbitrary-value classes throughout the components becomes correct. Con: must reconcile the v4 token setup; verify no visual regressions.
- **Option B: keep `index.css` as a frozen, authoritative artifact.** Delete `globals.css`, document that Tailwind utilities are NOT compiled, and replace the few needed dynamic classes with plain CSS. Add a lint/PR rule forbidding new Tailwind utilities. Pro: minimal tooling. Con: fights the grain of a Tailwind-authored codebase; every future component must avoid utilities — high friction, likely to regress.

> Recommendation: **Option A.** The components are written in Tailwind throughout; only Option A makes the code mean what it says. Whichever is chosen, REQ-D4 requires it be the *single* strategy and REQ-E1 (visible skip link, real touch targets) must verify true on the running build.

### 2.3 Dual backend (root cause: two scaffolds left side-by-side)

**Proven production path:** frontend calls relative `/api/send-contact` and `/api/subscribe` (`ContactSection.tsx:64`, `Footer.tsx:226`); `vercel.json:7-12` rewrites everything except `/api/` to the SPA, so Vercel serves `api/*.ts` as serverless functions. Nothing references `localhost:5000`, there is no Vite `server.proxy`, and no API base env var. Therefore `api.js` (Express) is **unreachable** in both prod and dev, and it has already diverged (missing `?.` on `data.id`).

**Design decision.** Keep the Vercel functions (`api/`) as the single implementation. Delete `api.js` and its now-orphaned deps (`express`, `cors`, `body-parser`). For local dev parity, run `vercel dev` or add a Vite dev proxy that forwards `/api` to the functions, so dev and prod share one code path (REQ-D1). Apply all EPIC B hardening to the surviving functions only.

### 2.4 Triple Vite config + wrong module type (root cause: generated/scaffold files committed)

**Proven:** Vite's config resolution prefers `vite.config.js` over `.ts`; the `.js` uses `outDir: 'dist'` (matches `vercel.json outputDirectory: "dist"`) while the dead `.ts` uses `outDir: 'build'`. So the `.ts` is not only unused but a **latent landmine**: delete the `.js` and the build silently emits to `build/`, Vercel publishes an empty `dist/`, and the deploy breaks with no error. `vite.config.d.ts` is a stray `tsc` declaration. `"type": "commonjs"` exists only to keep `api.js`'s `require()` working and forces `.mjs` escapes (`eslint.config.mjs`, `scripts/run-axe.mjs`).

**Design decision.** Converge on a single `vite.config.ts` with `outDir: 'dist'`; delete `vite.config.js` and `vite.config.d.ts`. After `api.js` is gone, set `"type": "module"`. Wire `tsconfig` project references so the real `vite.config.ts` and `api/*.ts` are type-checked (today `tsconfig.json` only includes `src`, and `tsconfig.node.json` points at the compiled `vite.config.js`). Validate by a clean `npm run build` producing `dist/`.

### 2.5 Hand-rolled routing (root cause: no router was ever added)

**Proven:** `App.tsx:66-97` is a `useState` route machine with a hardcoded `projectId === 'myorbit'` branch and `enableMotion` drilled into every section; there is no routing dependency. This is why there are no shareable URLs, no back/forward, and the Resource pages are unreachable.

**Design decision.** Introduce `react-router` (or TanStack Router) with `/`, `/project/:id`, `/case-study/:id`. Replace the `projectId === 'myorbit'` special-case with data-driven routing keyed off `projects.ts`. Move motion/accessibility preferences into a React context provider to end prop drilling (supports REQ-D6, and makes REQ-E2 focus-management a per-route concern with a natural hook point).

### 2.6 Dead code & dependency bloat (root cause: scaffold + abandoned feature)

**Proven by import-graph grep:** the Resource feature (3 components + `data/resources.ts`) is referenced only within itself; ~40/46 `ui/` primitives are unimported; `recharts` is reachable only through the unimported `ui/chart.tsx`. Vite tree-shakes unused modules, so the *client bundle* is mostly unaffected — the real costs are install size, ~30 unused `@radix-ui/*` packages, supply-chain surface, and reviewer confusion.

**Design decision.** Delete the orphaned Resource feature (or, if product wants it, wire it into routing per REQ-D7 — decide explicitly, don't leave it dangling). Prune unused `ui/` primitives and their `@radix-ui/*` deps. Remove `recharts` unless a real chart is introduced.

---

## 3. Target architecture (after remediation)

```
Browser (SPA)
  └── React 18 + Vite 6 (single vite.config.ts → dist/)
        ├── Router (react-router): / , /project/:id , /case-study/:id
        ├── Context: AccessibilityPreferences + motion (no prop drilling)
        ├── Tailwind v4 pipeline (single entry CSS, JIT-compiled)   ← REQ-D4/E1
        └── fetch('/api/...')
                  │
                  ▼
Vercel serverless functions  (api/send-contact.ts, api/subscribe.ts)  ← single backend
        ├── input validation + HTML-escaping (REQ-B3)
        ├── rate limiting + CAPTCHA (REQ-B2) + double-opt-in (REQ-B1)
        ├── restrictive CORS (REQ-B4), small body limits (REQ-B5)
        └── Resend (RESEND_API_KEY from env; never client-side)

CI: npm ci (locked, pinned deps) --ignore-scripts where possible
    → typecheck → lint → build(dist) → npm audit gate → axe a11y gate
```

No `api.js`. No `vite.config.js` / `vite.config.d.ts`. No `globals.css`/`styles.css` duplication. No `"*"` deps.

---

## 4. Cross-cutting design decisions

- **Email safety (REQ-B3):** prefer sending the contact notification as `text` *or* escape every interpolated field with a tiny HTML-escape helper; strip CR/LF from the subject. This neutralizes content injection without a templating dependency.
- **Anti-abuse (REQ-B1/B2):** double-opt-in for subscribe (store pending → email a single confirm link → only confirmed addresses get future mail) plus a CAPTCHA (Cloudflare Turnstile/hCaptcha) and IP rate limiting. On Vercel, use a KV/edge store or the provider's middleware for counters.
- **Reproducibility (REQ-C1/C2):** replace `"*"` with the versions the lockfile currently resolves to (clsx 2.1.1, motion 12.x, react-markdown 10.x, tailwind-merge 3.x) as a safe starting pin, then adopt `npm ci`.
- **A11y verification (EPIC E):** the existing `npm run a11y:axe` (axe-core) plus a scripted keyboard pass (tab to skip link → Enter → focus lands in `<main>`; navigate to a case study → focus + live-region announcement). These turn the acceptance criteria into runnable checks.
- **Risk control:** EPIC D changes (routing, CSS pipeline, module type) are higher-blast-radius; land them behind a clean `build`+`typecheck`+`axe` gate and verify a Vercel preview deploy before merging.

---

## 5. Explicitly unresolved / needs confirmation before coding

- **REQ-E9 color contrast** — `UNCONFIRMED`. Measure with axe/contrast tooling on the running build before claiming WCAG AA; the variables were edited but never measured against the gradient backgrounds.
- **Tailwind option A vs B** — a product/tech-lead decision; Option A recommended but requires a visual-regression check.
- **Resource feature** — keep+route or delete; needs a product call (REQ-D7).
- **Malware introduction point** — run `git log --follow -- preinstall.js` and review the diff/author to scope the incident timeline (informs REQ-A2 blast radius). Capture the result before closing the incident.
