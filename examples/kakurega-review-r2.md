# Build Review — kakurega.html
Reviewed: 2026-05-10
Iteration: 2
HTML: examples/kakurega.html
Brand CSS: examples/kakurega-brand.css
Build notes: examples/kakurega-build-notes.md

## Summary
12 checks · 10 pass · 1 fail · 3 warn (Check 12 skipped — not observability)

Action required: 1 check failed. Fix requests written to examples/kakurega-fix-r2.md.

---

## Priority Checks (from build notes)

### Priority 1 — Image strategy: LoremFlickr URLs present
All 4 image sections have real LoremFlickr URLs. No PENDING placeholders remain.
- Line 29: `https://loremflickr.com/1920/900/kyoto,fog,cedar?lock=1` ✓
- Line 44: `https://loremflickr.com/1600/800/stone,soybean,workshop?lock=2` ✓
- Line 57: `https://loremflickr.com/1600/800/tofu,steam,shoji?lock=3` ✓
- Line 70: `https://loremflickr.com/1600/800/silken,ivory,craft?lock=4` ✓
**Finding: PASS** — @copy correctly placed all 4 URLs.

### Priority 2 — Scrim floor: SKIP confirmed
Confirmed: no text is overlaid on any photograph in this build. All `.kakurega-chapter-image` elements contain only `<img>` tags. Text sections follow in separate `<section>` elements in normal flow below each image. No `bp-section-cover-overlay`, no `position: absolute` caption elements, no gradient overlays in the image sections. Scrim floor check is not applicable.
**Finding: PASS (not applicable)**

### Priority 3 — .kakurega-japanese legibility
Found in brand.css: `font-family: var(--font-body)` (Inter), `font-style: italic`, `font-weight: 300`, `font-size: 0.9rem`, on `#F0EBE0` background (warm near-white). Inter provides reliable CJK unicode rendering; 0.9rem italic on a light background is readable; the weight is consistent with the overall light palette. No legibility concern.
**Finding: PASS**

### Priority 4 — Layout pattern compliance (journal-sequential)
The pattern image → text repeats for all four content chapters. No side-by-side columns found (no `bp-split`, `bp-grid`, or CSS grid/flex-row patterns anywhere). The wholesale inquiry section (line 81) is a text+form section with no preceding image — it breaks the strict journal-sequential repeat. However, this section is semantically distinct (a functional action section separated by `border-top: 1px solid var(--color-border)`) and is not a content chapter. The hero image height (80vh via `.kakurega-chapter-image--hero`) exceeds the journal-sequential spec maximum of 70vh — this is a **FAIL** and is the subject of Check 8 below.
**Finding: FAIL on hero image height; WARN on inquiry section**

### Priority 5 — Synthesis tension: warm palette with Precision > Warmth
The palette (#F0EBE0 background, #1C2028 primary derived from Tamba kurodaizu, #E8E1D4 surface) reads as Kyoto craft authority. The warm near-white washi background and deep charcoal-indigo primary communicate restraint and material seriousness, not clinical coldness. The fourth-generation lineage framing, the kaiseki-only supply relationship, and the professional-inquiry-only form structure all reinforce the warm precision register. This reviewer finds the synthesis defensible: warm restraint is the correct pole for this product.
**Finding: WARN (judgment call — marking as reviewer uncertainty per build notes instruction, not as a spec failure)**

---

## Full Checklist

### ✅ Check 1 — Token completeness
**Status:** PASS with WARN
**Found (non-default dimensions, kakurega-brand.css `:root`):**
- Density (airy): `--space-unit: 1.25rem` ✓
- Weight (light): `--font-weight-heading: 300` ✓; `--font-weight-body: 300` ✓ (Fix 1 applied)
- Tracking (wide): `--letter-spacing-heading: 0.12em` ✓
- Motion (surgical): `--duration-fast: 0.05s` ✓, `--duration-base: 0.1s` ✓, `--duration-slow: 0.15s` ✓, `--easing-bounce: ease` ✓, `--easing-smooth: ease` ✓
- Shape (sharp): `--radius: var(--bp-radius-none)` ✓
- Depth (flat): `--shadow-sm: none` ✓, `--shadow-md: none` ✓, `--shadow-lg: none` ✓
- Type family (display-serif): `--font-heading: 'Cormorant Garamond', 'Georgia', serif` ✓
**Required:** All values match vocabulary specification.

**WARN:** `--font-body: 'Inter', sans-serif` is explicitly written in `:root` (brand.css line 36). The vocabulary spec for `display-serif` states `--font-body: 'Inter', sans-serif` is `(default — omit)`. This override is functionally near-identical to the default (`var(--bp-font-sans)` = `'Inter', system-ui, -apple-system, sans-serif`) but removes `system-ui` and `-apple-system` from the fallback stack, subtly narrowing the system font fallback. Not a functional failure, but an unnecessary write that produces a slightly inferior fallback stack.
**Fix (WARN):** In kakurega-brand.css line 36, remove `--font-body: 'Inter', sans-serif;`. The system default handles this correctly.

---

### ✅ Check 2 — Theme attribute
**Status:** PASS
**Found:** `<html lang="ja" data-bp-theme="light">` (kakurega.html line 2)
**Required:** Theme: light → `data-bp-theme="light"` (vocabulary spec Dimension 7)

---

### ✅ Check 3 — Motion attribute
**Status:** PASS
**Found:** No `data-bp-motion` attribute on the `<html>` element.
**Required:** Motion: surgical → `data-bp-motion` must be ABSENT (vocabulary spec Dimension 4: "surgical: Never. Surgical motion means the interface updates without performing.")

---

### ✅ Check 4 — Base stylesheet path
**Status:** PASS
**Found:** `<link rel="stylesheet" href="../assets/index.css">` (kakurega.html line 9)
**Required:** Exactly `../assets/index.css` for files in the `examples/` directory (review.md Check 4)

---

### ✅ Check 5 — Image strategy compliance
**Status:** PASS
**Found:** Image strategy = `photograph`. All 4 image sections contain real LoremFlickr URLs:
- Lock 1: `https://loremflickr.com/1920/900/kyoto,fog,cedar?lock=1`
- Lock 2: `https://loremflickr.com/1600/800/stone,soybean,workshop?lock=2`
- Lock 3: `https://loremflickr.com/1600/800/tofu,steam,shoji?lock=3`
- Lock 4: `https://loremflickr.com/1600/800/silken,ivory,craft?lock=4`
**Required:** When image strategy = photograph, every image section must have a real LoremFlickr URL as the base layer. No CSS-only gradients in place of photos. (vocabulary spec Dimension 10, photograph hard rule)

---

### ✅ Check 6 — Scrim floor
**Status:** PASS (not applicable)
Image strategy = photograph, but journal-sequential places text BELOW images in normal flow. No text is overlaid on any photograph. Confirmed: all `.kakurega-chapter-image` elements contain only `<img>` tags with no overlay descendants. Scrim floor rule does not apply (build notes: "No scrim, no overlay, no caption on image" confirmed).

---

### ✅ Check 7 — Taste gate: banned patterns
**Status:** PASS
Checked against all 7 banned patterns in blueprint-taste.md:
1. AI Startup Palette (`#6366f1`, `#8b5cf6`, `#a855f7`, dark purple): Not present. Primary is `#1C2028` (deep charcoal-indigo derived from Tamba kurodaizu). ✓
2. Inter Bold 72px hero: No `font-weight: 700` or `Inter Bold` anywhere. Display heading uses Cormorant Garamond weight 300. ✓
3. Glowing orb hero graphic: No gradients, blobs, or particle effects. Image sections use `<img>` with LoremFlickr. ✓
4. Glass morphism (`backdrop-filter: blur`, semi-transparent cards): Not present. ✓
5. Six identical feature cards in 3-column grid: No `bp-grid-3`, `bp-grid-6`, or feature card grids. ✓
6. Single-source gutters in multi-column layouts: No multi-column layouts with explicit column dividers. ✓
7. Uniform spacing: Text spacing within sections varies (1.5rem heading, 1.75rem or 2.5rem body, 3rem before CTA). ✓

---

### ❌ Check 8 — Layout pattern compliance
**Status:** FAIL (hero image height) + WARN (inquiry section)

**FAIL — Hero image height:**
**Found:** `.kakurega-chapter-image--hero { height: 80vh; }` (kakurega-brand.css line 119)
**Required:** Layout pattern = `journal-sequential` → image height: `50–70vh` (vocabulary spec Dimension 9, layout table: "Image: 50–70vh. Text block: auto")
**Fix:** In kakurega-brand.css line 119, change `height: 80vh` to `height: 70vh`. The hero modifier is capped at the spec maximum for journal-sequential.

**WARN — Inquiry section has no preceding image:**
The wholesale inquiry section (kakurega.html line 81) is a text+form section that follows the Supply & Handling text section (line 72) without an intervening image. This breaks the strict journal-sequential repeat (image → text, image → text...). The section is semantically distinct (separated by `border-top`, functional form rather than editorial content), which mitigates the concern. But a strict reading of journal-sequential requires the image → text pair to be complete for every content section. Considered at most a WARN because action/form sections routinely follow the main editorial sequence without requiring a preceding photo.
**Fix (WARN):** Consider whether a closing image section (e.g., a fifth chapter image) should precede the inquiry section to maintain the pattern. This is a design judgment — do not apply automatically.

---

### ✅ Check 9 — No inline style blocks
**Status:** PASS
**Found:** No `<style>` tags anywhere in kakurega.html. Confirmed by grep returning no results.
**Required:** `<style>` tags are a hard constraint violation (review.md Check 9). Inline `style=""` attributes on individual elements are acceptable.

---

### ✅ Check 10 — No invented bp- classes
**Status:** PASS
**Found (all bp- classes in kakurega.html):**
`bp-btn`, `bp-btn-primary`, `bp-container`, `bp-form-group`, `bp-input`, `bp-label`, `bp-nav`, `bp-nav-brand`, `bp-nav-inner`, `bp-nav-link`, `bp-nav-links`, `bp-section-label`, `bp-section-sm`, `bp-section-xl`, `bp-textarea`

**Verified against llm.md:**
- `bp-btn`, `bp-btn-primary` → llm.md Buttons section ✓
- `bp-container` → llm.md Layout/Container section ✓
- `bp-form-group`, `bp-input`, `bp-label`, `bp-textarea` → llm.md Forms section ✓
- `bp-nav`, `bp-nav-brand`, `bp-nav-inner`, `bp-nav-link`, `bp-nav-links` → llm.md Navigation section ✓
- `bp-section-label` → llm.md Hero / Section Header section ✓
- `bp-section-sm`, `bp-section-xl` → llm.md Layout/Section section ✓

All classes verified. No invented classes.

---

### ✅ Check 11 — Priority checks from build notes
**Status:** PASS with WARN (see Priority Checks section above for full sub-findings)

Sub-findings:
1. LoremFlickr URLs: All 4 image sections populated — PASS
2. Scrim floor skip: Confirmed — no text over any photograph — PASS
3. `.kakurega-japanese` legibility: Inter italic 300 at 0.9rem on #F0EBE0 — PASS
4. Journal-sequential compliance: Pattern holds for content chapters; hero height FAIL (captured in Check 8); inquiry section has no preceding image — WARN
5. Synthesis tension (Precision > Warmth, warm palette): Warm restraint reads as Kyoto craft authority — WARN (judgment call, not a spec violation)

---

### — Check 12 — Observability builds
**Status:** SKIPPED — kakurega is not an observability/tracing product.

---

## Fix Requests

Fix requests written to: examples/kakurega-fix-r2.md

---

## Notes on Fix 1 and Fix 2 (applied since iteration 1)

**Fix 1 — `--font-weight-body: 300`:** Confirmed present in brand.css `:root` at line 38. The token is now correctly set alongside `--font-weight-heading: 300`. The learned rule in blueprint-vocabulary.md ([2026-05-10] weight: light requires both tokens) was triggered by this build and is already documented.

**Fix 2 — `background-color: #2C2820` on `.kakurega-chapter-image`:** Confirmed present in brand.css at lines 110–116. The fallback color is a deep warm brown (pre-dawn workshop shadow tone), which is appropriate for the Tamba/Kyoto subject matter and consistent with the image keywords.

Both fixes from iteration 1 are correctly applied and pass their respective checks.
