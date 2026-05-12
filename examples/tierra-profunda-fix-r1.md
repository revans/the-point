# Fix Requests — tierra-profunda
Source review: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-review.md
Iteration: 1
Generated: 2026-05-10

## Fixes required

### Fix 1 — Display-serif below 48px on dark background
**File:** /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-brand.css
**Found:** Five heading elements use `font-family: var(--font-heading)` (Cormorant Garamond) at sizes that never reach 48px at any viewport width:
- `.tp-expression-heading`: `clamp(1.75rem, 3.5vw, 2.5rem)` → max 37.5px
- `.tp-section-title`: `clamp(1.75rem, 3vw, 2.5rem)` → max 37.5px
- `.tp-allocation-title`: `clamp(1.5rem, 2.5vw, 2.25rem)` → max 33.75px
- `.tp-price-number`: `clamp(1.5rem, 2.5vw, 2rem)` → max 30px
- `.tp-close-wordmark`: `1rem` → fixed 15px

**Required:** Vocabulary Dimension 8 specifies ≥ 48px for display-serif on dark backgrounds. The brand.css comment block itself says "Display-serif (Cormorant Garamond 400/500) for headings at display scale (≥ 64px) only."

**Action:** In each of the five classes listed above, change `font-family: var(--font-heading)` to `font-family: var(--font-body)`. Retain all other properties (font-weight, letter-spacing, text-transform, color). The `.tp-brand-name` is NOT changed — it uses `var(--font-heading)` and reaches up to 6.5rem (97.5px) at large viewports, above the threshold.

Specific locations in brand.css (class definition line → font-family is the next line):
- `.tp-expression-heading` — class at line 340, `font-family` at line 341
- `.tp-price-number` — class at line 411, `font-family` at line 412
- `.tp-section-title` — class at line 453, `font-family` at line 454
- `.tp-allocation-title` — class at line 750, `font-family` at line 751
- `.tp-close-wordmark` — class at line 793, `font-family` at line 794

**Confidence:** high — unambiguous spec violation with a single known correct value. The brand.css documentation itself identifies the threshold and the implementation violates it.
