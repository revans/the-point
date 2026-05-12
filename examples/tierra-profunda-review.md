# Build Review — tierra-profunda
Reviewed: 2026-05-10
Iteration: 1
HTML: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda.html
Brand CSS: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-brand.css
Build notes: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-build-notes.md

## Summary

12 checks · 9 pass · 1 fail · 2 warn

Action required: 1 check failed. Fix requests written to tierra-profunda-fix-r1.md.

---

## Priority Checks (from build notes)

### Non-obvious decision 1 — Tracking conflict at compact density
**Build agent said:** Wide tracking (0.12em) was the first instinct for engraved heritage feel, but compact density + display-serif causes awkward headline wrapping at display sizes. Resolved to open (0.06em).
**Found:** `--letter-spacing-heading: 0.06em` in brand.css ✅
**Status:** Correct. The vocabulary conflict table confirms: cap tracking at `open` for compact/dense densities. The resolution is exactly right.

---

### Non-obvious decision 2 — Differentiation from Tlaloc Negro
**Build agent said:** Primary color shifted darker/browner (#B8732A vs #E07B25), geometric-sans body instead of humanist-sans body.
**Found:** `--color-primary: #B8732A` in brand.css; `--font-body: 'Inter', system-ui, sans-serif` in brand.css ✅
**Status:** Correct. Both distinctions are implemented as documented.

---

### Non-obvious decision 3 — Gatefold expressions layout (custom 50/50 grid)
**Build agent said:** `bp-split` doesn't have a 50/50 option (goes 40/60, 60/40), so a custom `.tp-expressions-grid` was built.
**Found:** `.tp-expressions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }` in brand.css ✅
**Status:** Correct. `llm.md` confirms the split classes are: 40-60, 60-40, 33-67, 67-33, 25-75, 75-25. No 50/50 variant exists. Custom grid was the right call.

---

### Non-obvious decision 4 — Process strip LoremFlickr keywords (no peak drama)
**Build agent said:** Applied "no peak drama" and "correct perspective" filters — chose `agave,oaxaca,harvest` not `agave,fire,smoke`, etc.
**Found in HTML:**
- Step 01: `agave,oaxaca,harvest?lock=11` ✅
- Step 02: `agave,roasting,pit?lock=12` ✅
- Step 03: `tahona,stone,wheel?lock=13` ✅
- Step 04: `fermentation,vat,wood?lock=14` ✅
- Step 05: `distillation,mezcal,still?lock=15` ✅
**Status:** Correct. No peak-drama keywords (`fire`, `flame`, `smoke`) present. Seeds 11–15 are distinct from Tlaloc Negro's 1–5 range.

---

### Non-obvious decision 5 — Provenance image keywords
**Build agent said:** `oaxaca,mountains,sierra` with seed 7 — shows WHERE the brand lives, not the production process.
**Found in brand.css:** `url('https://loremflickr.com/900/600/oaxaca,mountains,sierra?lock=7')` ✅
**Status:** Correct. Keywords show the geographic context (the land), not the process.

---

### Non-obvious decision 6 — Process image scrim structure
**Build agent said:** Gradient on outer `.tp-process-image` div via inline style, LoremFlickr URL underneath (base layer). `background-color: #3A2A18` fallback in CSS.
**Found:** Each process slot has `<div class="tp-process-image" style="background-image: linear-gradient(to bottom, transparent 55%, rgba(13,8,6,0.6) 100%), url('...');">` with gradient as first (top) layer and URL as second (bottom) layer. Brand.css `.tp-process-image` has `background-color: #3A2A18` ✅
**Status:** Correct. Photograph protocol followed: wrapper has image-derived fallback color, gradient is the top layer, URL is the base layer.

---

### Non-obvious decision 7 — Allocation form using `bp-btn-outline`
**Build agent said:** Brief says "no buy now — the bottle finds you / the brand stays quiet." Outline button is the correct register.
**Found in HTML line 464:** `<button class="bp-btn bp-btn-outline bp-w-full" type="submit">` ✅
**Status:** Correct. `bp-btn-outline` is a valid class in `llm.md`. The design rationale is sound.

---

### Reviewer verify 1 — Process strip image legibility (scrim strength)
**Build agent asked:** Verify scrim `rgba(13,8,6,0.6)` is strong enough for image legibility.
**Found:** Scrim opacity is 0.6. The vocabulary scrim floor is 0.45.
**Status:** 0.6 > 0.45 floor ✅. Also: the process step metadata (`.tp-process-meta`) sits BELOW the image div in normal document flow — the text is not overlaid on the photograph. The scrim darkens the bottom edge of the image for visual blending, not for text legibility. No legibility concern exists here.

---

### Reviewer verify 2 — Gatefold expressions mobile collapse (border doubling)
**Build agent asked:** Verify espadin bottom border doesn't double with tobala top border on mobile.
**Found in brand.css @media (max-width: 900px):**
- `.tp-expression-panel:first-child { border-right: none; border-bottom: 1px solid var(--color-border); }`
- Tobala panel (second child): no `border-top` is set anywhere.
**Status:** No doubling ✅. The espadin panel gets a bottom border; the tobala panel has no top border. One visible separator between them.

---

### Reviewer verify 3 — Open tracking on brand name at mobile (375px viewport)
**Build agent asked:** Verify `letter-spacing: 0.06em` on `.tp-brand-name` doesn't cause wrapping at 375px. Mobile rule reduces it to 0.03em.
**Found in brand.css @media (max-width: 640px):** `.tp-brand-name { letter-spacing: 0.03em; text-indent: 0.03em; }`
**Status:** Mobile reduction is present ✅. At 0.03em with a 2.5rem minimum font size, the tracking reduction is appropriate. Cannot verify visually without browser, but the responsive rule is correctly implemented.

---

### Reviewer verify 4 — Retailer region filter mobile active state
**Build agent asked:** Verify the active state border change from `border-left-color` to `border-bottom-color` is visually distinct on mobile.
**Found in brand.css @media (max-width: 900px):**
```css
.tp-region-item { border-left: none; border-bottom: 2px solid transparent; }
.tp-region-item.active { border-left-color: transparent; border-bottom-color: var(--color-primary); }
```
**Status:** Active state switches correctly from vertical to horizontal amber indicator ✅. CSS implementation is correct. Note: this is a JavaScript-toggled `.active` class — legibility at runtime depends on JS that toggles the class. CSS alone is correct.

---

### Reviewer verify 5 — Background color fallback on provenance image
**Build agent asked:** Verify `background-color: #4A3A28` on `.tp-provenance-image` is correct fallback.
**Found in brand.css line 546:** `.tp-provenance-image { background-color: #4A3A28; ... }`
**Status:** WARN. The fallback color is present and derived from the sierra sur mid-tone research. However, LoremFlickr seed 7 may return a significantly different dominant tone, causing a visible flash before the photo loads. This is a prototype limitation acknowledged in the vocabulary skill — "production photography must be curated by a human who has seen the actual images." No fix required; human review before production.

---

### Reviewer verify 6 — Cormorant Garamond at compact density: sub-48px headings (FAIL)
**Build agent asked:** Verify `.tp-expression-heading` at clamp(1.75rem, 3.5vw, 2.5rem) doesn't fail hairline legibility on dark background. Build agent flagged risk: if hairlines disappear, increase minimum or switch to Inter 400.
**Found:** Multiple elements use `font-family: var(--font-heading)` (Cormorant Garamond) at sizes that never reach 48px at ANY viewport width:

| Element | CSS font-size | Max rendered (at 15px base) | 48px threshold |
|---|---|---|---|
| `.tp-expression-heading` | `clamp(1.75rem, 3.5vw, 2.5rem)` | **37.5px** | ❌ BELOW |
| `.tp-section-title` | `clamp(1.75rem, 3vw, 2.5rem)` | **37.5px** | ❌ BELOW |
| `.tp-allocation-title` | `clamp(1.5rem, 2.5vw, 2.25rem)` | **33.75px** | ❌ BELOW |
| `.tp-price-number` | `clamp(1.5rem, 2.5vw, 2rem)` | **30px** | ❌ BELOW |
| `.tp-close-wordmark` | `1rem` | **15px** | ❌ BELOW |

The vocabulary rule (Dimension 8 — Serif legibility on dark backgrounds): *"If theme = dark and type family = display-serif: either switch to geometric-sans or humanist-sans for full-page use, or confirm that headings are large enough (≥ 48px) that the thin strokes still read."*

The brand.css comment block itself states: *"Display-serif (Cormorant Garamond 400/500) for headings at display scale (≥ 64px) only."* The implementation contradicts its own documentation. The `.tp-brand-name` (clamp(2.5rem, 8vw, 6.5rem), max 97.5px) ✅ meets the threshold at normal viewports. All other heading elements do not.

**Status: FAIL** — See Fix 1.

---

## Full Checklist

### ⚠️ Check 1 — Token completeness
**Status:** WARN
**Found:**
- `--font-weight-body: 400` written in brand.css line 122
- `--font-body: 'Inter', system-ui, sans-serif` written in brand.css line 116
**Required:** For `display-serif` type family, the vocabulary says `--font-body: 'Inter', sans-serif (default — omit)`. The default `--font-weight-body` for the semibold (default) entry is 400. Both written values match the system defaults.

All non-default tokens verified:
- `--space-unit: 0.825rem` ✅ (compact density)
- `--font-size-base: 15px` ✅ (compact density)
- `--font-weight-heading: 500` ✅ (medium weight)
- `--letter-spacing-heading: 0.06em` ✅ (open tracking)
- `--duration-fast: 0.05s` ✅ (surgical motion)
- `--duration-base: 0.1s` ✅ (surgical motion)
- `--duration-slow: 0.15s` ✅ (surgical motion)
- `--easing-bounce: ease` ✅ (surgical motion)
- `--easing-smooth: ease` ✅ (surgical motion — required for surgical per vocabulary Dimension 4)
- `--radius: 0px` ✅ (sharp shape)
- `--shadow-sm: none` ✅ (flat depth)
- `--shadow-md: none` ✅ (flat depth)
- `--shadow-lg: none` ✅ (flat depth)
- `--font-heading: 'Cormorant Garamond', 'Georgia', serif` ✅ (display-serif — note: fallback is 'Georgia' instead of 'DM Serif Display'; minor deviation, not a spec violation)

**Fix:** In brand.css, remove `--font-weight-body: 400` (default value, adds noise). Optionally remove `--font-body: 'Inter', system-ui, sans-serif` (display-serif default is Inter; keeping it is documentation, but the vocabulary says omit it).

---

### ✅ Check 2 — Theme attribute
**Status:** PASS
**Found:** HTML line 2: `<html lang="en" data-bp-theme="dark">`
**Required:** Theme word = `dark` → `data-bp-theme="dark"`

---

### ✅ Check 3 — Motion attribute
**Status:** PASS
**Found:** `<html lang="en" data-bp-theme="dark">` — no `data-bp-motion` attribute present.
**Required:** Motion word = `surgical` → attribute must be absent. (Vocabulary Dimension 4: "Surgical: Never [add data-bp-motion='draw']. Surgical motion means the interface updates without performing.")

---

### ✅ Check 4 — Base stylesheet path
**Status:** PASS
**Found:** HTML line 24: `<link rel="stylesheet" href="../assets/index.css">`
**Required:** For files in `examples/` directory: `<link rel="stylesheet" href="../assets/index.css">` exactly.

---

### ✅ Check 5 — Image strategy compliance
**Status:** PASS
**Found:** Image strategy = `photograph`. All image sections contain real LoremFlickr URLs:
- `.tp-provenance-image` (brand.css line 553): `url('https://loremflickr.com/900/600/oaxaca,mountains,sierra?lock=7')` ✅
- 5 process image slots (HTML inline styles): seeds 11–15, all with valid LoremFlickr URLs ✅

Gradient is correctly placed as the top layer above the URL base layer in all cases. No CSS gradient used as the sole `background-image` on any photograph section. Bottle placeholders (`.tp-bottle-espadin`, `.tp-bottle-tobala`) are CSS-drawn product representations, not photograph image sections — correctly use gradient only.

**Required:** Vocabulary Dimension 10: "HARD RULE: When image strategy is photograph, the base layer of every image section MUST be a real LoremFlickr URL."

---

### ✅ Check 6 — Scrim floor (photograph builds only)
**Status:** PASS
**Found:** No sections place readable text directly over a photograph. The process strip metadata (`.tp-process-meta`) is positioned BELOW each `.tp-process-image` div in normal document flow. The provenance text (`.tp-provenance-content`) is in a separate right-column grid cell — not overlaid on `.tp-provenance-image`. The scrim floor rule applies only to text-over-photo configurations, which do not exist in this build.

For completeness: the process image scrims are `rgba(13,8,6,0.6)` (0.6 opacity), which exceeds the 0.45 minimum floor if text were ever placed over them.

---

### ✅ Check 7 — Taste gate: banned patterns
**Status:** PASS

1. **AI Startup Palette:** `--color-primary: #B8732A` — deep caramel amber. Not `#6366f1`, `#8b5cf6`, or any blue-to-purple gradient. ✅
2. **Inter Bold at 72px hero:** Hero heading (`.tp-brand-name`) uses `font-family: var(--font-heading)` = Cormorant Garamond, `font-weight: 500`. Not Inter + 700. ✅
3. **Glowing orb:** `.tp-mark::before` is a radial gradient at 0.04 and 0.02 opacity — a near-invisible texture, not a visual element. No `backdrop-filter: blur` anywhere in brand.css. ✅
4. **Glass morphism:** No `backdrop-filter: blur()` + `rgba(255,255,255,0.1)` combination found. ✅
5. **Six identical feature cards:** No feature card grid exists in this build. ✅
6. **Uniform spacing:** Section padding values vary: `var(--bp-space-16)` (mark), `var(--bp-space-20)` (production, retail, allocation), `var(--bp-space-12)` (production header bottom). Not identical everywhere. ✅

---

### ⚠️ Check 8 — Layout pattern compliance
**Status:** WARN
**Found:** Layout pattern = `credential`. The build has no nav bar ✅, no feature grids ✅, no multiple competing sections ✅. The "must not have" list is clean.

However, the "must have" is: "Single centered focal element per viewport. Everything else suppressed." The implementation departs:
- Block 1 (MARK): 100svh, single centered brand name ✅ — strict credential
- Block 2 (EXPRESSIONS): Two-panel gatefold, not a single centered element
- Block 3 (PRODUCTION): Five-panel horizontal strip, not a single centered element
- Remaining blocks: two-column splits (not single centered elements)

The page functions as a credential in spirit — it presents facts without conversion pressure, has no nav, and the entire page IS the credential. But it does not follow the strict structural spec of "one centered focal element per viewport." This is a design judgment call the build agent made explicitly (two expressions as one credential unit, process as a laboratory fact list). The overall effect is closer to `document` (sequential fact-based sections) than strict `credential`.

**Fix:** No fix required — this is a design intent deviation, not a spec violation. The "must not have" constraints are all satisfied. Flag for human awareness: future builds of this product type may be better served by specifying `document` layout pattern when the page has multiple sequential fact sections.

---

### ✅ Check 9 — No inline style blocks
**Status:** PASS
**Found:** No `<style>` tags anywhere in tierra-profunda.html.

`style=""` attributes found (acceptable per spec):
- `<address style="font-style: normal;">` (footer) — one-off reset
- 5 × `.tp-process-image style="background-image: ..."` — LoremFlickr URL + overlay, correctly placed as inline style per the process image scrim protocol

---

### ✅ Check 10 — No invented bp- classes
**Status:** PASS

All `bp-` classes in HTML verified against `llm.md`:

| Class | Found in llm.md |
|---|---|
| `bp-container` | ✅ Layout > Container |
| `bp-block` | ✅ Utilities > Display & Flex |
| `bp-form-group` | ✅ Forms |
| `bp-label` | ✅ Forms |
| `bp-input` | ✅ Forms |
| `bp-textarea` | ✅ Forms |
| `bp-select` | ✅ Forms |
| `bp-btn` | ✅ Buttons |
| `bp-btn-outline` | ✅ Buttons > Variants |
| `bp-w-full` | ✅ Utilities > Sizing |

No invented `bp-` classes found.

---

### ❌ Check 11 — Priority checks from build notes
**Status:** FAIL

See Priority Checks section above for full sub-findings. The single FAIL is the display-serif below 48px threshold on dark background, detailed in Reviewer verify 6.

**Summary of all priority items:**
- Non-obvious decisions 1–7: All correctly implemented ✅
- Reviewer verify items 1–5: Correct implementation or acceptable prototype limitations ✅
- Reviewer verify item 6 (Cormorant Garamond sub-48px headings): ❌ FAIL

**What the spec requires:** Vocabulary Dimension 8 (Serif legibility on dark backgrounds): "If theme = dark and type family = display-serif: either switch to geometric-sans or humanist-sans for full-page use, OR confirm that headings are large enough (≥ 48px)."

**What was found:** Five heading elements using `var(--font-heading)` (Cormorant Garamond) with maximum rendered sizes of 15px–37.5px — all below the 48px threshold at every viewport width.

**Required fix:** In brand.css, change `font-family: var(--font-heading)` to `font-family: var(--font-body)` in `.tp-expression-heading`, `.tp-section-title`, `.tp-allocation-title`, `.tp-price-number`, and `.tp-close-wordmark`. These elements operate permanently below the legibility threshold on the dark background. The `--font-body` (Inter) is the correct font for these sub-display-scale headings.

---

### ✅ Check 12 — Observability builds: flex-shrink on panels
**Status:** N/A — Product type is mezcal/brand, not observability/tracing. Skip.

---
