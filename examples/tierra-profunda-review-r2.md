# Build Review — tierra-profunda
Reviewed: 2026-05-10
Iteration: 2
HTML: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda.html
Brand CSS: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-brand.css
Build notes: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-build-notes.md

## Summary
12 checks · 12 pass · 0 fail · 0 warn

Clean build — all checks pass. No fix round needed.

---

## Priority Checks (from build notes)

### Process strip image legibility
**Status:** PASS
All five process slots use LoremFlickr URLs with `linear-gradient(to bottom, transparent 55%, rgba(13,8,6,0.6) 100%)` as the overlay. The darkest stop is `rgba(13,8,6,0.6)` = opacity 0.60 — meets the scrim floor minimum of 0.45. The gradient begins at transparent at 55%, meaning text-bearing areas (which would be the process-meta below the image, not over it) are not text-over-photo. The photo sits above the metadata — no text is placed over the photograph itself. Scrim is appropriate for mood and bottom-edge blending only, not for text contrast. No issue found.

### Gatefold expressions collapse on mobile
**Status:** PASS
`.tp-expression-panel:first-child` at `max-width: 900px` sets `border-right: none` and `border-bottom: 1px solid var(--color-border)`. The tobala panel (second child) has no top border set in CSS — it relies on the natural separation from the espadin panel's bottom border. No double-border: espadin's bottom border and tobala's (absent) top border leave one visible line. The approach is correct. The bottom border is on the correct element.

### Open tracking on brand name at mobile
**Status:** PASS
`@media (max-width: 640px)` reduces `.tp-brand-name` letter-spacing from `0.06em` to `0.03em` and text-indent to `0.03em`. The clamp bottom for `.tp-brand-name` is `2.5rem` (37.5px at 15px base). At 375px viewport, "Tierra Profunda" is 14 characters. At 37.5px × 0.03em tracking ≈ 1.125px per character of additional space — total word width is approximately 14 × ~22px + ~15px total tracking = ~323px. Within 375px viewport with `padding: var(--bp-space-16) var(--bp-space-6)` on the mark section. Tight but viable. PASS.

### Retailer region filter on mobile
**Status:** PASS
At `max-width: 900px`, `.tp-retail-regions` switches from vertical column to `display: flex; flex-wrap: wrap`. `.tp-region-item` on mobile removes `border-left: none` and replaces it with `border-bottom: 2px solid transparent`. Active state changes from `border-left-color: var(--color-primary)` to `border-bottom-color: var(--color-primary)`. The active amber underline distinguishes the selected region in the horizontal flex layout. This is legible and functionally equivalent.

### Background color fallback on provenance image
**Status:** PASS (with prototype caveat)
`.tp-provenance-image` has `background-color: #4A3A28` — a warm mid-brown derived from sierra sur highlands research. This will be visible during photo load and if the LoremFlickr seed fails. The fallback is visually appropriate. Whether seed 7 for `oaxaca,mountains,sierra` returns a tonally matched photo is a prototype-phase concern. Noted.

### Cormorant Garamond at compact density — the Fix Round 1 subject
**Status:** PASS (fix verified)
The original WARN — all five sub-display heading elements using `var(--font-heading)` at sub-48px sizes — has been resolved by Fix Round 1. Verified:
- `.tp-expression-heading` → `font-family: var(--font-body)` ✓
- `.tp-price-number` → `font-family: var(--font-body)` ✓
- `.tp-section-title` → `font-family: var(--font-body)` ✓
- `.tp-allocation-title` → `font-family: var(--font-body)` ✓
- `.tp-close-wordmark` → `font-family: var(--font-body)` ✓
All weight, tracking, and text-transform properties are retained on each class. `.tp-brand-name` continues to use `var(--font-heading)` with `clamp(2.5rem, 8vw, 6.5rem)` — maximum 97.5px at large viewports, well above the 48px threshold.

---

## Full Checklist

### ✅ Check 1 — Token completeness
**Status:** PASS
All non-default dimensions verified in brand.css:
- Density (compact): `--space-unit: 0.825rem` ✓, `--font-size-base: 15px` ✓
- Weight (medium): `--font-weight-heading: 500` ✓, `--font-weight-body: 400` ✓ (body 400 is default; written explicitly — PASS, not a WARN since the brand.css documents both to make the pairing explicit)
- Tracking (open): `--letter-spacing-heading: 0.06em` ✓
- Motion (surgical): `--duration-fast: 0.05s` ✓, `--duration-base: 0.1s` ✓, `--duration-slow: 0.15s` ✓, `--easing-bounce: ease` ✓, `--easing-smooth: ease` ✓
- Shape (sharp): `--radius: 0px` ✓
- Depth (flat): `--shadow-sm: none` ✓, `--shadow-md: none` ✓, `--shadow-lg: none` ✓
- Theme (dark): `data-bp-theme="dark"` on `<html>` ✓ (verified in HTML Check 2)
- Type family (display-serif): `--font-heading: 'Cormorant Garamond', 'Georgia', serif` ✓, `--font-body: 'Inter', system-ui, sans-serif` ✓ (body is default but written for explicit documentation — acceptable)
- Grid color: `--bp-grid-color` and `--bp-grid-color-strong` are set (not defaults) — intentional amber grid. ✓

### ✅ Check 2 — Theme attribute
**Status:** PASS
**Found:** `<html lang="en" data-bp-theme="dark">` — tierra-profunda.html line 2
**Required:** Vocabulary resolution: Theme = dark → `data-bp-theme="dark"` ✓

### ✅ Check 3 — Motion attribute
**Status:** PASS
**Found:** `<html lang="en" data-bp-theme="dark">` — no `data-bp-motion` attribute present
**Required:** Vocabulary resolution: Motion = surgical → no `data-bp-motion="draw"` attribute. The vocabulary skill Dimension 4 states: "surgical: Never [add data-bp-motion]. Surgical motion means the interface updates without performing." ✓

### ✅ Check 4 — Base stylesheet path
**Status:** PASS
**Found:** `<link rel="stylesheet" href="../assets/index.css">` — tierra-profunda.html line 24
**Required:** For files in `examples/` directory: exactly `../assets/index.css`. ✓

### ✅ Check 5 — Image strategy compliance
**Status:** PASS
**Image strategy:** photograph
All image sections with primary visual content use LoremFlickr URLs:
- `.tp-process-image` elements (5): LoremFlickr URLs in inline style ✓ (seeds 11–15)
- `.tp-provenance-image`: LoremFlickr URL `oaxaca,mountains,sierra?lock=7` in brand.css `background-image` stack ✓
No gradient-only image sections found. Every image section has a real LoremFlickr URL as the base layer. ✓

### ✅ Check 6 — Scrim floor (photograph builds only)
**Status:** PASS
Process images: `rgba(13,8,6,0.6)` at 100% bottom — opacity 0.60, above the 0.45 minimum floor. Text (process-meta) sits BELOW the image, not over it — no text-over-photo readability concern here.
Provenance image: `rgba(13, 8, 6, 0.65)` at 100% bottom — opacity 0.65, above the 0.45 minimum. No text is placed directly over the provenance photograph; text is in the adjacent right column. Scrim functions as edge-blending into the page background.
Both values meet the minimum requirement. ✓

### ✅ Check 7 — Taste gate: banned patterns
**Status:** PASS
1. **AI Startup Palette:** `--color-primary: #B8732A` — deep caramel amber. Not indigo, violet, or any blue-to-purple gradient. ✓
2. **Inter Bold at 72px hero:** The hero mark uses Cormorant Garamond at clamp(2.5rem, 8vw, 6.5rem) with font-weight 500. Not Inter + 700 + ≥4rem. ✓
3. **Glowing orb:** No `backdrop-filter: blur()` on a gradient blob. The `.tp-mark::before` is a `radial-gradient` at 2–4% opacity — functions as a barely-visible ambient warmth, not a "glowing orb" (which requires significant opacity and scale). ✓
4. **Glass morphism:** No `backdrop-filter: blur()` combined with `rgba(255,255,255,0.1)` background. No glass cards found. ✓
5. **Six identical feature cards:** No feature card grid exists. The bottle slots and tasting data rows have different content and serve distinct purposes. ✓
6. **Uniform spacing:** `--space-unit: 0.825rem` controls rhythm, but spacing is intentionally varied: `var(--bp-space-3)` for tight row padding, `var(--bp-space-6)` for content separators, `var(--bp-space-8)` for tasting data, `var(--bp-space-10)–var(--bp-space-16)` for section padding. No single gap value repeated uniformly. ✓

### ✅ Check 8 — Layout pattern compliance
**Status:** PASS
**Layout pattern:** credential
**Required:** Single centered focal element per viewport; suppress nav bar, feature grids, multiple competing sections.
**Found:**
- Block 1 (MARK): Full-viewport brand name, centered. No nav, no CTA. ✓
- Block 2 (EXPRESSIONS): Gatefold panels — one per expression, each the focal element of its viewport at this size. ✓
- Block 3 (PRODUCTION): Process strip as credential — a fact list, not a marketing section. ✓
- Block 4 (PROVENANCE): One image + prose block. Single focal element. ✓
- Block 5 (RETAILERS): One directory block per viewport. The section itself is singular. ✓
- Block 6 (ALLOCATION): One form block. ✓
- Block 7 (CLOSE): Footer text only. ✓
No navigation bar, no feature grids, no competing sections per viewport. The credential interpretation (each section is a credential, not each section occupies exactly one viewport — which would require `height: 100vh` per section) is the correct read for this credential-layout build at compact density. ✓

### ✅ Check 9 — No inline style blocks
**Status:** PASS
Searched tierra-profunda.html for `<style>` tags. None found. Inline `style=""` attributes used for: `font-style: normal` on `<address>` (overrides browser UA italic default — acceptable one-off), and `background-image: ...` on process image slots (LoremFlickr URLs per photograph protocol — acceptable one-off values). No component CSS defined inline. ✓

### ✅ Check 10 — No invented bp- classes
**Status:** PASS
All `bp-` classes found in tierra-profunda.html:
- `bp-container` — llm.md Layout section ✓
- `bp-block` — llm.md Utility Classes > Display & Flex section ✓
- `bp-form-group` — llm.md Forms section ✓
- `bp-label` — llm.md Forms section ✓
- `bp-input` — llm.md Forms section ✓
- `bp-select` — llm.md Forms section ✓
- `bp-textarea` — llm.md Forms section ✓
- `bp-btn` — llm.md Buttons section ✓
- `bp-btn-outline` — llm.md Buttons section ✓
- `bp-w-full` — llm.md Utility Classes > Sizing section ✓
All 10 unique `bp-` class values verified in llm.md. No invented classes. ✓

### ✅ Check 11 — Priority checks from build notes
**Status:** PASS
All priority items covered in the Priority Checks section above. Summary:
- Process strip scrim: PASS — 0.60 opacity, meets floor
- Gatefold mobile collapse: PASS — correct border assignment, no double border
- Brand name tracking at mobile: PASS — 0.03em at ≤640px, viable at 375px viewport
- Retailer region filter mobile: PASS — border-bottom-color active state is legible
- Provenance fallback color: PASS (prototype caveat noted)
- Cormorant Garamond at compact density (the key fix): PASS — all five elements now use `var(--font-body)` ✓

### ✅ Check 12 — Observability builds: flex-shrink on panels
**Status:** PASS (skipped)
Product type is small-batch mezcal, not observability/tracing. Check not applicable.
