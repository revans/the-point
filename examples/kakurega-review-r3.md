# Build Review — kakurega.html
Reviewed: 2026-05-10
Iteration: 3
HTML: examples/kakurega.html
Brand CSS: examples/kakurega-brand.css
Build notes: examples/kakurega-build-notes.md

## Summary
12 checks · 11 pass · 0 fail · 1 warn

Clean build — all checks pass. No fix round needed.

---

## Priority Checks (from build notes)

### Priority 1 — Image URLs (all 4 images)
All four image sections contain real LoremFlickr URLs. No `src="PENDING"` remains. @copy completed its responsibility.
- Hero: `https://loremflickr.com/1920/900/kyoto,fog,cedar?lock=1`
- Chapter 1 (stone grinding): `https://loremflickr.com/1600/800/stone,soybean,workshop?lock=2`
- Chapter 2 (silken set): `https://loremflickr.com/1600/800/tofu,steam,shoji?lock=3`
- Chapter 3 (finished tofu): `https://loremflickr.com/1600/800/silken,ivory,craft?lock=4`
**Result: PASS**

### Priority 2 — Scrim floor (no text over photographs)
No `bp-section-cover-overlay`, no scrim elements, no gradient overlays anywhere in the HTML. Every `.kakurega-chapter-image` div contains only an `<img>` tag. Text sections (`bp-section-xl`) are entirely separate elements in normal document flow, below the image divs. No text is overlaid on any photograph.
**Result: PASS — Scrim floor check correctly skipped**

### Priority 3 — `.kakurega-japanese` legibility
Confirmed in brand.css: `font-family: var(--font-body)` (Inter), `font-style: italic`, `font-weight: 300`, `font-size: 0.9rem`, `color: var(--color-text-muted)`. Background is `#F0EBE0` (warm near-white). Inter carries CJK unicode correctly; light background provides adequate contrast at 0.9rem. No legibility concern.
**Result: PASS**

### Priority 4 — Layout pattern compliance (journal-sequential)
Structure confirmed:
1. Hero `.kakurega-chapter-image--hero` (70vh full-width) → `bp-section-xl` (540px centered)
2. `.kakurega-chapter-image` (65vh full-width) → `bp-section-xl` (540px centered)
3. `.kakurega-chapter-image` (65vh full-width) → `bp-section-xl` (540px centered)
4. `.kakurega-chapter-image` (65vh full-width) → `bp-section-xl` (540px centered)

No side-by-side columns. Pure journal-sequential repeat pattern throughout.
**Result: PASS**

### Priority 5 — Synthesis tension (Precision > Warmth, warm palette)
The combination reads as Kyoto craft authority. Evidence: deep charcoal-indigo primary (`#1C2028`) from Tamba kurodaizu research — not a warm color itself, which prevents the palette from sliding into "cozy." The warmth lives only in the background (`#F0EBE0` washi paper) and surface (`#E8E1D4` aged cedar), while the text and primary assert precision. Cormorant Garamond at 300 weight with 0.12em tracking on a light background reads as "typographic precision with material warmth" — the combination is defensible and consistent across all eleven dimensions.
**Result: WARN (low concern — synthesis judgment call, not a spec violation)**
**Fix:** None required. This is a vocabulary synthesis judgment call, not a failing check. Human reviewer may confirm the palette reads as intended in the browser.

---

## Full Checklist

### ✅ Check 1 — Token completeness
**Status:** PASS
**Found:** All non-default dimension tokens present in `examples/kakurega-brand.css`:
- `--space-unit: 1.25rem` (airy, line 41)
- `--font-weight-heading: 300` (light, line 37)
- `--font-weight-body: 300` (light, line 38) — both heading AND body written correctly per Learned Rule [2026-05-10]
- `--letter-spacing-heading: 0.12em` (wide, line 46)
- `--duration-fast: 0.05s` (surgical, line 54)
- `--duration-base: 0.1s` (surgical, line 55)
- `--duration-slow: 0.15s` (surgical, line 56)
- `--easing-bounce: ease` (surgical, line 58)
- `--easing-smooth: ease` (surgical, line 59)
- `--radius: var(--bp-radius-none)` (sharp, line 47)
- `--shadow-sm: none`, `--shadow-md: none`, `--shadow-lg: none` (flat, lines 50–52)
- `--font-heading: 'Cormorant Garamond', 'Georgia', serif` (display-serif, line 35)
- `--font-body: 'Inter', sans-serif` (display-serif pair, line 36)
**Required:** All non-default tokens per vocabulary resolution table (blueprint-vocabulary.md, Dimensions 1–8)

### ✅ Check 2 — Theme attribute
**Status:** PASS
**Found:** `<html lang="ja" data-bp-theme="light">` (kakurega.html, line 2)
**Required:** `data-bp-theme="light"` (Theme: light, vocabulary skill Dimension 7)

### ✅ Check 3 — Motion attribute
**Status:** PASS
**Found:** No `data-bp-motion` attribute on `<html>` element
**Required:** Absent (Motion: surgical → never add `data-bp-motion="draw"`, vocabulary skill Dimension 4)

### ✅ Check 4 — Base stylesheet path
**Status:** PASS
**Found:** `<link rel="stylesheet" href="../assets/index.css">` (kakurega.html, line 9)
**Required:** `../assets/index.css` exactly (blueprint.md hard constraint 6; review.md Check 4)

### ✅ Check 5 — Image strategy compliance
**Status:** PASS
**Found:** All four image sections use real LoremFlickr URLs as the base layer of each image div. No gradient-only image sections. (kakurega.html, lines 29, 44, 57, 70)
**Required:** Image strategy = photograph → every image section must use a real LoremFlickr URL (blueprint-vocabulary.md, Dimension 10, HARD RULE)

### ✅ Check 6 — Scrim floor
**Status:** PASS (skip condition met)
**Found:** No text is placed over any photograph. All `.kakurega-chapter-image` divs contain only `<img>` elements. Text sections exist in normal document flow below each image section.
**Required:** Scrim floor (rgba(0,0,0,0.45) minimum) applies only when text sits over a photograph. In this journal-sequential build, text never overlays a photograph. Skip condition is correctly met.

### ✅ Check 7 — Taste gate: banned patterns
**Status:** PASS
**Found:**
- No AI startup palette: primary is `#1C2028` (deep charcoal-indigo from physical material research — Tamba kurodaizu)
- No Inter Bold 72px: headings use Cormorant Garamond at weight 300
- No glowing orb: image sections use real LoremFlickr photographs
- No glass morphism: no `backdrop-filter` in brand.css or HTML
- No six identical feature cards: journal-sequential layout, no feature grid
- No single-source gutters: no multi-column layout
- No uniform spacing: margin-top values vary (1.5rem, 1.75rem, 2.5rem, 3rem) reflecting deliberate rhythm choices
**Required:** None of the seven banned patterns from blueprint-taste.md

### ✅ Check 8 — Layout pattern compliance (journal-sequential)
**Status:** PASS
**Found:**
- Full-width image blocks (70vh hero, 65vh repeating) followed immediately by centered narrow text sections (max-width: 540px). Pattern repeats cleanly four times.
- Hero image height: 70vh (`.kakurega-chapter-image--hero`, brand.css line 119) — within the 50–70vh spec range. This was the Fix from r2 (previously 80vh).
- Repeat image height: 65vh (`.kakurega-chapter-image`, brand.css line 113) — within 50–70vh spec range.
- No side-by-side image+text columns anywhere in the HTML.
- Nav: minimal sticky, brand name left, 3 text links right, no CTA button — correct for journal-sequential.
**Required:** Full-width image followed by centered narrow text block, repeating. No side-by-side columns. Image heights 50–70vh. (blueprint-vocabulary.md, Dimension 9)

### ✅ Check 9 — No inline style blocks
**Status:** PASS
**Found:** No `<style>` tags in kakurega.html. Only inline `style=""` attributes on individual elements (acceptable per spec). Verified by full read of the 116-line file.
**Required:** Zero `<style>` blocks (blueprint.md hard constraint 2)

### ✅ Check 10 — No invented bp- classes
**Status:** PASS
**Found:** All bp- classes used in kakurega.html (15 unique classes), verified against llm.md:
`bp-btn`, `bp-btn-primary`, `bp-container`, `bp-form-group`, `bp-input`, `bp-label`, `bp-nav`, `bp-nav-brand`, `bp-nav-inner`, `bp-nav-link`, `bp-nav-links`, `bp-section-label`, `bp-section-sm`, `bp-section-xl`, `bp-textarea` — all present in llm.md.
**Required:** Every bp- class must appear in llm.md (blueprint.md hard constraint 1)

### ⚠️ Check 11 — Priority checks from build notes
**Status:** WARN (one sub-item, low concern)
**Found:** See Priority Checks section above. Sub-items 1–4 all PASS. Sub-item 5 (synthesis tension) is a judgment call — the warm palette on a precision-leaning build is defensible but cannot be mechanically verified by spec.
**Fix:** No fix required. Human reviewer should confirm that the palette reads as Kyoto craft authority in the browser. No spec rule was violated.

### ✅ Check 12 — Observability builds: flex-shrink on panels
**Status:** PASS (skip condition met)
**Found:** Product type is a traditional Japanese tofu producer — not observability/tracing.
**Required:** Skip if not observability product (review.md Check 12)
