# Fix Requests — vatnajokull.html
Source review: examples/vatnajokull-review-r1.md
Iteration: 1
Generated: 2026-05-10

## Fixes required

### Fix 1 — Scrim floor: hero section has no overlay
**File:** examples/vatnajokull.html
**Found:** `<section class="bp-hero-full">` contains `<img ... class="bp-hero-full-bg">` followed by `<div class="bp-hero-full-caption">` — no gradient overlay or scrim element between them. Effective scrim opacity over text area: 0.00.
**Required:** Any section placing readable text over a photograph must have an effective dark overlay of at least rgba(0,0,0,0.45) where the text sits (vocabulary skill, Dimension 10, scrim floor rule).
**Action:** Inside `<section class="bp-hero-full">`, after the `<img class="bp-hero-full-bg">` tag and before the `<div class="bp-hero-full-caption">`, insert:
```html
<div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%); z-index: 1;"></div>
```
Also add `style="position: relative; z-index: 2;"` to the `<div class="bp-hero-full-caption">` element so it renders above the new overlay (or confirm that `bp-hero-full-caption` already establishes a stacking context above the bg).
**Confidence:** high

---

### Fix 2 — Editorial-alternating image column width: 50% instead of 60–70%
**File:** examples/vatnajokull-brand.css
**Found:** `.vatna-extract { grid-template-columns: 1fr 1fr; }` (line 96) — equal 50%/50% split.
**Required:** editorial-alternating layout pattern specifies "Tall image column (60–70% width) beside text" (vocabulary skill, Dimension 9). Image column must be 60–70%.
**Action:** In brand.css, change the `.vatna-extract` rule from:
```css
grid-template-columns: 1fr 1fr;
```
to:
```css
grid-template-columns: 3fr 2fr;
```
This gives the first child (image in Extracts 01 and 03; text in Extract 02) a 60% width and the second child a 40% width. For Extract 02 where DOM order is text-first, image-second, the text column will be 60% and the image 40% — this inverts the intended image-dominant ratio for that extract. To correct this, also add to the responsive/component rules:
```css
.vatna-extract:nth-child(4) {
  grid-template-columns: 2fr 3fr;
}
```
(Extract 02 is the 4th `.vatna-extract` child of its parent — count: extracts anchor label div, then Extract 01, then Extract 02.) This makes Extract 02 60% image (right column) / 40% text (left column) as intended.
**Confidence:** medium
