# 🔧 ACCESSIBILITY FIX GUIDE - DEVELOPER INSTRUCTIONS

**Priority Order:** Fix in this exact sequence to avoid breaking dependencies.

---

## PHASE 1: CRITICAL FIXES (DO THESE FIRST - 2 Days)

### Fix 1: Add Semantic Landmarks and Skip Link (2 hours)

**File:** `/src/App.tsx`

**Step 1:** Add skip link at the very top (line 123, right after opening div)

```tsx
<div className="min-h-screen bg-background text-foreground antialiased">
  {/* ADD THIS SKIP LINK */}
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg"
    style={{
      background: 'var(--psychedelic-cyan)',
      color: '#000',
      fontWeight: 'bold',
    }}
  >
    Skip to main content
  </a>

  <Navigation ... />
```

**Step 2:** Wrap main content in `<main>` tag (line 131)

```tsx
{/* BEFORE */}
<AnimatePresence mode="wait">
  {currentRoute === 'home' ? (

{/* AFTER */}
<main id="main-content">
  <AnimatePresence mode="wait">
    {currentRoute === 'home' ? (
```

**Step 3:** Close the `</main>` tag at the end (line 179)

```tsx
    ) : null}
  </AnimatePresence>
</main>  {/* ADD THIS */}
</div>
```

**Step 4:** Add screen reader only utility class to globals.css

```css
/* Add to src/styles/globals.css at the end */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

### Fix 2: Add Navigation Role and Label (30 minutes)

**File:** `/src/components/Navigation.tsx`

**Line 17 and 63:** Add `role` and `aria-label` to both nav elements

```tsx
{/* BEFORE - Line 17 */}
<motion.nav
  className="fixed top-0 left-0 right-0 z-50 px-6 py-4"

{/* AFTER */}
<motion.nav
  role="navigation"
  aria-label="Primary navigation"
  className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
```

```tsx
{/* BEFORE - Line 63 */}
<motion.nav
  className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"

{/* AFTER */}
<motion.nav
  role="navigation"
  aria-label="Primary navigation"
  className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
```

---

### Fix 3: Convert Logo to Button (30 minutes)

**File:** `/src/components/Navigation.tsx`

**Lines 28-40:** Change `motion.div` to `motion.button`

```tsx
{/* BEFORE */}
<motion.div
  className="groovy-text text-2xl cursor-pointer"
  onClick={onNavigateHome}
  style={{
    background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}
  whileHover={enableMotion ? { scale: 1.05 } : undefined}
>
  ANTHRO-POLOGICA
</motion.div>

{/* AFTER */}
<motion.button
  type="button"
  className="groovy-text text-2xl bg-transparent border-none cursor-pointer p-0"
  onClick={onNavigateHome}
  aria-label="Return to homepage"
  style={{
    background: 'linear-gradient(135deg, var(--psychedelic-magenta), var(--psychedelic-cyan), var(--psychedelic-yellow))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}
  whileHover={enableMotion ? { scale: 1.05 } : undefined}
>
  ANTHRO-POLOGICA
</motion.button>
```

**Lines 75-87:** Do the same for the second navigation state

```tsx
{/* BEFORE */}
<motion.div
  className="groovy-text text-2xl cursor-pointer"
  onClick={onNavigateHome}

{/* AFTER */}
<motion.button
  type="button"
  className="groovy-text text-2xl bg-transparent border-none cursor-pointer p-0"
  onClick={onNavigateHome}
  aria-label="Return to homepage"
```

---

### Fix 4: Fix Contact Form Labels (1.5 hours)

**File:** `/src/components/ContactSection.tsx`

**Lines 310-337:** Add `htmlFor` and `id` to Name field

```tsx
{/* BEFORE */}
<div>
  <label className="block text-sm mb-2 opacity-80">Name</label>
  <motion.div>
    <Input
      type="text"
      placeholder="Your name"
      name="name"

{/* AFTER */}
<div>
  <label
    htmlFor="contact-name"
    className="block text-sm mb-2 opacity-80"
  >
    Name <span className="text-destructive" aria-label="required">*</span>
  </label>
  <motion.div>
    <Input
      id="contact-name"
      type="text"
      placeholder="Your name"
      name="name"
      required
      aria-required="true"
```

**Lines 340-367:** Fix Email field

```tsx
{/* BEFORE */}
<div>
  <label className="block text-sm mb-2 opacity-80">Email</label>
  <motion.div>
    <Input
      type="email"
      placeholder="your@email.com"
      name="email"

{/* AFTER */}
<div>
  <label
    htmlFor="contact-email"
    className="block text-sm mb-2 opacity-80"
  >
    Email <span className="text-destructive" aria-label="required">*</span>
  </label>
  <motion.div>
    <Input
      id="contact-email"
      type="email"
      placeholder="your@email.com"
      name="email"
      required
      aria-required="true"
```

**Lines 370-397:** Fix Project field

```tsx
{/* BEFORE */}
<div>
  <label className="block text-sm mb-2 opacity-80">What would you like to discuss?</label>
  <motion.div>
    <Input
      type="text"
      placeholder="What are we creating?"
      name="project"

{/* AFTER */}
<div>
  <label
    htmlFor="contact-project"
    className="block text-sm mb-2 opacity-80"
  >
    What would you like to discuss?
  </label>
  <motion.div>
    <Input
      id="contact-project"
      type="text"
      placeholder="What are we creating?"
      name="project"
```

**Lines 400-427:** Fix Message field

```tsx
{/* BEFORE */}
<div>
  <label className="block text-sm mb-2 opacity-80">Message</label>
  <motion.div>
    <Textarea
      placeholder="Tell us about your vision..."
      rows={5}
      name="message"

{/* AFTER */}
<div>
  <label
    htmlFor="contact-message"
    className="block text-sm mb-2 opacity-80"
  >
    Message <span className="text-destructive" aria-label="required">*</span>
  </label>
  <motion.div>
    <Textarea
      id="contact-message"
      placeholder="Tell us about your vision..."
      rows={5}
      name="message"
      required
      aria-required="true"
```

**Before the form (line 309):** Add required field legend

```tsx
<form className="relative space-y-6" onSubmit={handleSubmit}>
  {/* ADD THIS */}
  <p className="text-sm opacity-80 mb-4">
    Fields marked with <span className="text-destructive">*</span> are required.
  </p>

  <div>
    <label htmlFor="contact-name">...</label>
```

---

### Fix 5: Replace window.alert with Accessible Messages (2 hours)

**File:** `/src/components/ContactSection.tsx`

**Step 1:** Add state for form status (line 16)

```tsx
const [focusedField, setFocusedField] = useState<string | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);
{/* ADD THIS */}
const [formStatus, setFormStatus] = useState<{
  type: 'success' | 'error' | null;
  message: string;
}>({ type: null, message: '' });
```

**Step 2:** Replace window.alert calls (lines 73 and 81)

```tsx
{/* BEFORE - Line 73 */}
window.alert(result.message || 'Thanks! Your message is on the way.');
event.currentTarget.reset();

{/* AFTER */}
setFormStatus({
  type: 'success',
  message: result.message || 'Thanks! Your message is on the way.'
});
event.currentTarget.reset();
setFocusedField(null);
```

```tsx
{/* BEFORE - Line 81 */}
window.alert(errorMessage);

{/* AFTER */}
setFormStatus({
  type: 'error',
  message: errorMessage
});
```

**Step 3:** Add status message display in JSX (line 309, before the form)

```tsx
<form className="relative space-y-6" onSubmit={handleSubmit}>
  {/* ADD THIS STATUS MESSAGE */}
  {formStatus.type && (
    <motion.div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="p-4 rounded-lg mb-4"
      style={{
        background: formStatus.type === 'success'
          ? 'rgba(0, 255, 0, 0.1)'
          : 'rgba(255, 107, 53, 0.1)',
        border: `2px solid ${formStatus.type === 'success' ? 'var(--psychedelic-cyan)' : 'var(--psychedelic-orange)'}`,
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p
        style={{
          color: formStatus.type === 'success'
            ? 'var(--psychedelic-cyan)'
            : 'var(--psychedelic-orange)'
        }}
      >
        {formStatus.message}
      </p>
    </motion.div>
  )}

  <p className="text-sm opacity-80 mb-4">
    Fields marked with <span className="text-destructive">*</span> are required.
  </p>
```

**Step 4:** Clear status on new submission (line 53)

```tsx
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSubmitting(true);
  setFormStatus({ type: null, message: '' }); {/* ADD THIS */}

  const formData = new FormData(event.currentTarget);
```

---

### Fix 6: Fix Color Contrast (1 hour)

**File:** `/src/styles/globals.css`

**Lines 78-84:** Update psychedelic colors for better contrast

```css
/* BEFORE */
--psychedelic-purple: #a020f0;
--psychedelic-pink: #ff1493;
--psychedelic-orange: #ff6b35;
--psychedelic-yellow: #ffd700;
--psychedelic-cyan: #00ffff;
--psychedelic-lime: #ccff00;
--psychedelic-magenta: #ff00ff;

/* AFTER */
--psychedelic-purple: #b040ff;    /* Increased brightness */
--psychedelic-pink: #ff3db8;      /* Increased brightness */
--psychedelic-orange: #ff8850;    /* Increased brightness */
--psychedelic-yellow: #ffd700;    /* Already compliant */
--psychedelic-cyan: #00ffff;      /* Already compliant */
--psychedelic-lime: #d4ff33;      /* Increased brightness */
--psychedelic-magenta: #ff40ff;   /* Increased brightness */
```

**Line 50:** Update muted-foreground

```css
/* BEFORE */
--muted-foreground: #a78bca;

/* AFTER */
--muted-foreground: #c8a8e8;  /* Increased for 4.5:1 contrast */
```

---

## PHASE 2: HIGH PRIORITY FIXES (DO THESE NEXT - 2-3 Days)

### Fix 7: Add Focus Indicators (1.5 hours)

**File:** `/src/styles/globals.css`

**Add at the end of the file:**

```css
/* Global focus indicators for accessibility */
*:focus-visible {
  outline: 3px solid var(--psychedelic-cyan);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid var(--psychedelic-magenta);
  outline-offset: 2px;
}

/* Ensure focus is visible even on custom styled elements */
.button-wave:focus-visible,
.hero-button:focus-visible {
  outline: 3px solid var(--psychedelic-cyan);
  outline-offset: 4px;
}
```

---

### Fix 8: Convert "Explore Our Universe" to Semantic Link (30 minutes)

**File:** `/src/components/HeroSection.tsx`

**Lines 244-258:** Change button to anchor with progressive enhancement

```tsx
{/* BEFORE */}
<motion.button
  onClick={() => {
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
  className="button-wave relative px-8 py-4 overflow-hidden group cursor-pointer hero-button"
  whileHover={enableMotion ? { scale: 1.05 } : undefined}
  whileTap={enableMotion ? { scale: 0.95 } : undefined}
>
  <span className="relative z-10 groovy-text text-2xl">Explore Our Universe</span>
</motion.button>

{/* AFTER */}
<motion.a
  href="#projects-section"
  onClick={(e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
  className="button-wave relative px-8 py-4 overflow-hidden group cursor-pointer hero-button inline-block text-center no-underline"
  whileHover={enableMotion ? { scale: 1.05 } : undefined}
  whileTap={enableMotion ? { scale: 0.95 } : undefined}
>
  <span className="relative z-10 groovy-text text-2xl">Explore Our Universe</span>
</motion.a>
```

---

### Fix 9: Add aria-hidden to Decorative SVGs (30 minutes)

**File:** `/src/components/Footer.tsx`

**Lines 69-128:** Add `aria-hidden` to wave SVG

```tsx
{/* BEFORE */}
<svg
  className="w-full h-32"
  viewBox="0 0 1200 120"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>

{/* AFTER */}
<svg
  className="w-full h-32"
  viewBox="0 0 1200 120"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  role="presentation"
>
```

**Do the same for the bottom wave SVG (around line 136)**

---

### Fix 10: Fix Social Media Links (1 hour)

**File:** `/src/components/Footer.tsx`

**Option A: Remove if not ready** (Lines 261-287)

```tsx
{/* BEFORE */}
{socialLinks.map((social, i) => {

{/* AFTER - Only render if href is valid */}
{socialLinks.filter(social => social.href && social.href !== '#').map((social, i) => {
```

**Option B: Make functional** - Update the socialLinks data (around line 30-60 in Footer.tsx)

```tsx
// Replace '#' with actual URLs
const socialLinks = [
  {
    icon: Twitter,
    label: 'Follow us on Twitter',
    href: 'https://twitter.com/yourhandle', // REPLACE WITH REAL URL
  },
  // ... rest
];
```

---

### Fix 11: Increase Touch Target Sizes (2 hours)

**File:** `/src/components/Navigation.tsx`

**Lines 44-56:** Increase settings button size

```tsx
{/* BEFORE */}
<button
  onClick={onOpenPersonalize}
  className="flex items-center gap-2 px-4 py-2 rounded-full"
  style={{
    background: 'rgba(26, 15, 46, 0.8)',
    border: '2px solid var(--psychedelic-cyan)',
  }}
>
  <Settings size={20} color="var(--psychedelic-cyan)" />

{/* AFTER */}
<button
  onClick={onOpenPersonalize}
  className="flex items-center gap-2 px-6 py-3 rounded-full min-h-[44px]"
  style={{
    background: 'rgba(26, 15, 46, 0.8)',
    border: '2px solid var(--psychedelic-cyan)',
  }}
  aria-label="Personalize accessibility settings"
>
  <Settings
    size={24}
    color="var(--psychedelic-cyan)"
    aria-hidden="true"
  />
```

**File:** `/src/components/ProjectsCarousel.tsx`

**Lines 366-388:** Increase prev/next button sizes

```tsx
{/* BEFORE */}
<motion.button
  onClick={() => paginate(-1)}
  className="button-wave p-4 rounded-full"

{/* AFTER */}
<motion.button
  onClick={() => paginate(-1)}
  className="button-wave p-5 rounded-full min-w-[48px] min-h-[48px]"
```

Do the same for the next button.

**Lines 400-425:** Increase pagination dot button sizes

```tsx
{/* BEFORE */}
<motion.button
  onClick={() => setCurrentIndex(i)}
  className={`w-3 h-3 rounded-full`}
  aria-label={`Go to project ${i + 1}`}

{/* AFTER */}
<motion.button
  onClick={() => setCurrentIndex(i)}
  className="p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
  aria-label={`Go to project ${i + 1} of ${projects.length}: ${projects[i].title}`}
  aria-current={i === currentIndex ? 'true' : 'false'}
>
  <span
    className="w-3 h-3 rounded-full"
    style={{
```

---

### Fix 12: Add Dynamic Page Titles (45 minutes)

**File:** `/src/App.tsx`

**Add useEffect after line 107:**

```tsx
const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;

{/* ADD THIS */}
useEffect(() => {
  if (currentRoute === 'project' && selectedProject) {
    document.title = `${selectedProject.title} - Anthro-pologica UX`;
  } else {
    document.title = 'Anthro-pologica UX - Human-Centered Design & Neurodivergent Insight';
  }
}, [currentRoute, selectedProject]);
```

---

### Fix 13: Respect System Motion Preferences (1 hour)

**File:** `/src/hooks/useAccessibilityPreferences.ts`

**Update to check system preference on initial load:**

```tsx
// At the top of the file, add this helper
const getSystemMotionPreference = (): boolean => {
  if (typeof window === 'undefined') return true;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery.matches; // Returns true if motion is allowed
};

// In the hook, update DEFAULT_PREFERENCES or initial state:
const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  motion: getSystemMotionPreference(), // Check system preference
  dyslexicFont: false,
  colorIntensity: 1,
  spacing: 1,
};
```

---

## PHASE 3: MEDIUM PRIORITY FIXES (CAN DO LATER - 1-2 Days)

### Fix 14: Add Newsletter Label (15 minutes)

**File:** `/src/components/Footer.tsx`

**Lines 194-199:**

```tsx
{/* BEFORE */}
<input
  type="email"
  placeholder="your@email.com"
  className="flex-1 px-4 py-3 rounded-full..."
  aria-label="Email address for newsletter subscription"
/>

{/* AFTER */}
<label htmlFor="newsletter-email" className="sr-only">
  Email address for newsletter subscription
</label>
<input
  id="newsletter-email"
  type="email"
  placeholder="your@email.com"
  className="flex-1 px-4 py-3 rounded-full..."
  aria-label="Email address for newsletter subscription"
/>
```

---

### Fix 15: Improve Image Alt Text (1 hour)

**File:** `/src/data/projects.ts`

**Add descriptive alt text to each project:**

```tsx
export const projects: Project[] = [
  {
    id: 'anthropologica',
    title: 'Anthro-pologica',
    // ADD THIS
    alt: 'Screenshot of Anthro-pologica website showing colorful psychedelic design with gradient text',
    tagline: '...',
  },
  // ... do this for all projects
];
```

**File:** `/src/components/ProjectsCarousel.tsx`

**Line 245-250:** Use the alt text

```tsx
{/* BEFORE */}
<ImageWithFallback
  src={currentMedia?.src}
  alt={currentProject.title}

{/* AFTER */}
<ImageWithFallback
  src={currentMedia?.src}
  alt={currentProject.alt || `Screenshot of ${currentProject.title} project`}
```

---

### Fix 16: Add ARIA Live Region to Carousel (30 minutes)

**File:** `/src/components/ProjectsCarousel.tsx`

**Wrap carousel content (around line 180):**

```tsx
{/* ADD THIS WRAPPER */}
<div
  role="region"
  aria-label="Projects carousel"
  aria-live="polite"
  aria-atomic="false"
>
  {/* Screen reader announcement */}
  <div className="sr-only" aria-live="polite" aria-atomic="true">
    Viewing project {currentIndex + 1} of {projects.length}: {currentProject.title}
  </div>

  {/* Existing carousel content */}
  <div className="relative max-w-6xl mx-auto">
    ...
  </div>
</div>
```

---

## TESTING CHECKLIST

After each fix, test:

### Automated Tests:
```bash
# Install axe-core for testing
npm install --save-dev @axe-core/react

# Install Lighthouse CI
npm install -g @lhci/cli
```

### Manual Tests:

**1. Keyboard Navigation Test**
- Unplug mouse
- Press Tab key through entire site
- Verify you can see where focus is
- Verify you can activate all buttons/links with Enter/Space
- Verify skip link appears when you Tab from top

**2. Screen Reader Test (Mac)**
```bash
# Turn on VoiceOver
Cmd + F5

# Navigate with:
# VO + Right Arrow = Next item
# VO + Space = Activate
# VO + U = Open rotor (lists all headings, links, etc.)
```

**3. Screen Reader Test (Windows)**
- Download NVDA (free): https://www.nvaccess.org/download/
- Press Insert + Down Arrow to read
- Press Tab to jump between interactive elements

**4. Color Contrast Test**
- Install browser extension: "WCAG Color Contrast Checker"
- Click every piece of text on the site
- Verify all show "PASS" for AA

**5. Zoom Test**
- Press Cmd/Ctrl + "+" until you reach 200%
- Verify all text is readable
- Verify nothing overlaps or gets cut off
- Verify you can still use the navigation

**6. Form Test**
- Click each form label
- Verify input gets focused
- Submit empty form
- Verify error message appears inline (not window.alert)
- Verify error message is announced by screen reader

---

## QUICK REFERENCE: FILES TO EDIT

| File | What to Fix | Priority |
|------|-------------|----------|
| `src/App.tsx` | Main landmark, skip link, page titles | CRITICAL |
| `src/components/Navigation.tsx` | Navigation role, logo button, touch targets | CRITICAL |
| `src/components/ContactSection.tsx` | Form labels, error handling | CRITICAL |
| `src/components/HeroSection.tsx` | Explore button semantic link | HIGH |
| `src/components/Footer.tsx` | SVG aria-hidden, newsletter label, social links | MEDIUM |
| `src/components/ProjectsCarousel.tsx` | Touch targets, ARIA live region, alt text | MEDIUM |
| `src/styles/globals.css` | Color contrast, focus indicators, sr-only class | CRITICAL |
| `src/hooks/useAccessibilityPreferences.ts` | System motion preference | HIGH |
| `src/data/projects.ts` | Alt text descriptions | MEDIUM |

---

## ESTIMATED TIME

- **Phase 1 (Critical):** 8-10 hours
- **Phase 2 (High):** 8-10 hours
- **Phase 3 (Medium):** 4-6 hours
- **Testing:** 4-6 hours

**Total:** 24-32 hours of development work

---

## GOT STUCK? DEBUG TIPS

**Form labels not working?**
- Make sure `htmlFor` on label matches `id` on input EXACTLY
- IDs must be unique on the page

**Skip link not showing on focus?**
- Check that `.sr-only` class is in globals.css
- Try tabbing immediately after page loads

**Colors still failing contrast?**
- Use this tool: https://webaim.org/resources/contrastchecker/
- Foreground color = your text color
- Background color = your background
- Needs 4.5:1 for normal text, 3:1 for large text

**Focus indicators not visible?**
- Check if any CSS has `outline: none` (remove it)
- Verify browser DevTools shows `:focus-visible` state

**Screen reader not announcing changes?**
- Verify `aria-live="polite"` is on the element
- Check that content actually changes (React state update)
- Try `aria-live="assertive"` for errors

---

## VALIDATION TOOLS

After you fix everything, run these:

1. **Lighthouse** (built into Chrome DevTools)
   - Right-click page → Inspect → Lighthouse tab
   - Check "Accessibility"
   - Click "Generate report"
   - Target score: 90+

2. **axe DevTools** (browser extension)
   - Install from Chrome/Firefox store
   - Click extension icon
   - Click "Scan ALL of my page"
   - Target: 0 critical/serious issues

3. **WAVE** (WebAIM tool)
   - Install extension or visit: https://wave.webaim.org/
   - Paste your URL
   - Target: 0 errors

All three should give you a green light before launching!
