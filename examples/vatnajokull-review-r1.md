# Build Review — vatnajokull.html
Reviewed: 2026-05-10
Iteration: 1
HTML: examples/vatnajokull.html
Brand CSS: examples/vatnajokull-brand.css
Build notes: examples/vatnajokull-build-notes.md

## Summary
12 checks · 9 pass · 2 fail · 2 warn

Action required: 2 check(s) failed. Fix requests written to examples/vatnajokull-fix-r1.md.

---

## Priority Checks (from build notes)

### Priority 1 — vatna-latin at 0.95rem on dark background

**Build agent flagged:** Cormorant Garamond italic at 0.95rem on dark — does the thin stroke survive? If not, switch to Inter italic.

**Found in file:** `.vatna-latin { font-family: var(--font-heading); font-style: italic; font-weight: 300; font-size: 0.95rem; }` (brand.css, line 84–91). Rendered size: 0.95rem × 16px base = approximately 15.2px, italic, weight 300, Cormorant Garamond, on `#0C0B09` dark background.

**Verdict:** WARN. The vocabulary skill notes that display-serif on dark "at body sizes" causes hairlines to disappear, and that "Display-serif at hero scale (64px+) can survive; editorial-serif body text cannot." 15.2px is well below the 48px threshold. The build agent's mitigation argument (italic stroke thickening) is plausible but fragile — Cormorant Garamond italic at 15px and 300 weight on near-black will be marginally legible at best and will fail entirely at lower-quality displays. This text is a specimen label (Latin botanical name), used sparsely and briefly. It is not the primary reading experience, which reduces risk. Not a spec violation, but remains fragile as flagged.

---

### Priority 2 — Mobile stacking order on extracts

**Build agent flagged:** Extract 02 has DOM order `[text][image]` to achieve alternation. On mobile (1-column grid), this produces text above image for Extract 02, breaking the "image always above text" reading flow.

**Found in file:** Extract 02 DOM order in vatnajokull.html lines 77–93: `.vatna-extract-text` child first, `.vatna-extract-image` child second. The responsive CSS in brand.css (line 137–147) collapses to `grid-template-columns: 1fr` on max-width 768px — no `order` property is applied. On mobile, Extract 02 renders: text block → then image below it.

**Verdict:** WARN. The build agent stated "image above text always" but this is not what the DOM order produces for Extract 02 on mobile. The vocabulary spec does not explicitly mandate mobile stack order for editorial-alternating — it specifies the desktop pattern. The reading order deviation (text→image for Extract 02 on mobile) is a UX imperfection, not a spec violation. However the build agent was wrong about its own claim. No fix required by spec, but worth noting for human review.

---

### Priority 3 — Scrim opacity on provenance cover section

**Build agent flagged:** Set to 0.62 — verify text is readable.

**Found in file:** `<div class="bp-section-cover-overlay" style="background: rgba(12, 11, 9, 0.62);">` (vatnajokull.html, line 123). Opacity 0.62 is above the 0.45 floor.

**Verdict:** PASS. The scrim value is within the required 0.45–0.60 range (0.62 marginally above the stated default ceiling but clearly above the 0.45 floor). The vocabulary skill states "use 0.45–0.60 as the default and only reduce it if the photo is inherently dark" — 0.62 is a minor upward deviation, not a downward violation.

---

### Priority 4 — Image keyword uniqueness

**Build agent flagged:** Confirm each section's keywords are distinct with no cross-section adjacency overlap greater than one keyword.

**Found in file:**
- Hero: `iceland,glacier,tundra`
- Extract 01: `moss,lichen,lava`
- Extract 02: `crowberry,nordic,berry`
- Extract 03: `birch,catkin,spring`
- Provenance: `volcanic,arctic,wilderness`

Adjacent pairs: Hero/Extract01 share 0 keywords. Extract01/Extract02 share 0 keywords. Extract02/Extract03 share 0 keywords. Extract03/Provenance share 0 keywords.

**Verdict:** PASS. Full compliance — no two adjacent sections share any keywords.

---

## Full Checklist

---

### ✅ Check 1 — Token completeness
**Status:** PASS
**Found:** brand.css `:root` block contains all required non-default overrides:
- `--space-unit: 1.25rem` (line 38) — Density: airy ✓
- `--font-weight-heading: 300`, `--font-weight-body: 300` (lines 34–35) — Weight: light ✓
- `--letter-spacing-heading: 0.12em` (line 41) — Tracking: wide ✓
- `--duration-fast: 0.05s`, `--duration-base: 0.1s`, `--duration-slow: 0.15s`, `--easing-bounce: ease`, `--easing-smooth: ease` (lines 52–56) — Motion: surgical ✓
- `--radius: var(--bp-radius-none)` (line 44) — Shape: sharp ✓
- `--shadow-sm: none`, `--shadow-md: none`, `--shadow-lg: none` (lines 47–49) — Depth: flat ✓
- `--font-heading: 'Cormorant Garamond', 'Georgia', serif` (line 33) — Type: display-serif ✓

No default-value dimensions are redundantly written.

---

### ✅ Check 2 — Theme attribute
**Status:** PASS
**Found:** `<html lang="en" data-bp-theme="dark">` (vatnajokull.html, line 2)
**Required:** Theme = dark → `data-bp-theme="dark"` on `<html>` (vocabulary skill, Dimension 7)

---

### ✅ Check 3 — Motion attribute
**Status:** PASS
**Found:** `<html lang="en" data-bp-theme="dark">` — no `data-bp-motion` attribute present (vatnajokull.html, line 2)
**Required:** Motion = surgical → attribute must be absent (vocabulary skill, Dimension 4: "surgical: Never. Surgical motion means the interface updates without performing.")

---

### ✅ Check 4 — Base stylesheet path
**Status:** PASS
**Found:** `<link rel="stylesheet" href="../assets/index.css">` (vatnajokull.html, line 9)
**Required:** Exactly `../assets/index.css` for files in `examples/` directory (blueprint.md hard constraint 6)

---

### ✅ Check 5 — Image strategy compliance (photograph)
**Status:** PASS
**Found:** All five image sections use real LoremFlickr URLs:
- Hero: `https://loremflickr.com/1600/900/iceland,glacier,tundra?lock=1`
- Extract 01: `https://loremflickr.com/800/1000/moss,lichen,lava?lock=2`
- Extract 02: `https://loremflickr.com/800/1000/crowberry,nordic,berry?lock=3`
- Extract 03: `https://loremflickr.com/800/1000/birch,catkin,spring?lock=4`
- Provenance: `https://loremflickr.com/1600/700/volcanic,arctic,wilderness?lock=5`

No section uses a CSS gradient as its primary image layer. No LoremFlickr URLs appear in brand.css (photograph builds keep them in HTML only).
**Required:** Every image section must have a real LoremFlickr URL as its base layer (vocabulary skill, Dimension 10: "the base layer of every image section MUST be a real LoremFlickr URL").

---

### ❌ Check 6 — Scrim floor (photograph builds only)
**Status:** FAIL
**Found:** The `bp-hero-full` section places readable text (`.bp-hero-full-caption` containing `.vatna-latin`, `h1.vatna-display`, and a subtitle `<p>`) directly over the LoremFlickr photo. The HTML contains no gradient overlay layer and no scrim element inside or adjacent to the hero section — the `bp-hero-full-bg` `<img>` is followed immediately by the `bp-hero-full-caption` div with no intervening overlay (vatnajokull.html, lines 28–38). The provenance section uses `bp-section-cover-overlay` at 0.62 opacity — PASS for that section only.
**Required:** "Any section that places text over a photograph must guarantee a minimum contrast ratio. The scrim or gradient must produce an effective dark value of at least rgba(0,0,0,0.45) in the area where text sits." (vocabulary skill, Dimension 10, scrim floor rule). The hero section has text over photo with no scrim — effective scrim opacity is 0.00.
**Fix:** In vatnajokull.html, add a scrim overlay element inside `<section class="bp-hero-full">`, positioned after the `<img>` tag and before the caption div:
```html
<div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%);"></div>
```
This produces an effective scrim of 0.65 at the bottom where the caption lives, tapering to transparent at the top — consistent with atmospheric compositional mode and the spec's 0.45 floor.

---

### ❌ Check 8 — Layout pattern compliance (editorial-alternating)
**Status:** FAIL
**Found:** `.vatna-extract { display: grid; grid-template-columns: 1fr 1fr; min-height: 70vh; }` (brand.css, lines 94–99). The image column is 1fr = 50% of the section width.
**Required:** editorial-alternating layout pattern specifies "Tall image column (60–70% width) beside text" (vocabulary skill, Dimension 9, Layout Pattern table). The image column must be 60–70% of the section width — not 50%.
**Fix:** In brand.css, change `.vatna-extract { grid-template-columns: 1fr 1fr; }` to `grid-template-columns: 3fr 2fr;` (60%/40% split). For Extract 02 where text is first in DOM order (text left, image right), the columns will naturally assign 60% to the text column. To maintain image-dominant layout for alternating sections, either (a) use CSS `order` property on the image div for Extract 02 to enforce image-first with `order: -1`, or (b) use `grid-template-columns: 2fr 3fr` for even extracts and `3fr 2fr` for odd — but this requires per-section class variants. Simplest correct fix: `grid-template-columns: 3fr 2fr` base, plus on `.vatna-extract:nth-child(even) .vatna-extract-image { order: 1; }` so the image always occupies the right column on even items while keeping DOM order for accessibility. Medium confidence — the exact implementation depends on which column dominance is preferred for alternation.

---

### ✅ Check 7 — Taste gate: banned patterns
**Status:** PASS
**Found:** Checked all banned patterns against both files:
- AI startup palette (`#6366f1`, `#8b5cf6`, `#a855f7`): Primary is `#6B7C58` (Icelandic moss sage) — no purple. ✓
- Inter Bold 72px hero: Hero heading is Cormorant Garamond weight 300, `clamp(3.5rem, 7vw, 6.5rem)`. No Inter, no weight 700. ✓
- Glowing orb: No `blur()`, no `radial-gradient` decorative blobs. ✓
- Glass morphism: No `backdrop-filter`, no `rgba(255,255,255,0.1)` cards with borders. ✓
- Six identical feature cards: No feature grid at all — extract sections are editorial pairs. ✓
- Single-source gutters: No multi-column editorial layouts with explicit vertical dividers. ✓
- Uniform spacing: `padding: calc(var(--space-unit) * 6) calc(var(--space-unit) * 5)` on extract text vs. smaller values elsewhere. Spacing is intentionally varied. ✓

---

### ✅ Check 9 — No inline style blocks
**Status:** PASS
**Found:** Scanned vatnajokull.html for `<style>` tags — none present. Multiple inline `style=""` attributes on individual elements are present and acceptable per the constraint. Only `<style>` tag blocks are banned.
**Required:** "No `<style>` blocks in HTML" (blueprint.md hard constraint 2)

---

### ✅ Check 10 — No invented bp- classes
**Status:** PASS
**Found:** All `bp-` classes used in vatnajokull.html verified against llm.md:
`bp-nav` ✓ · `bp-container` ✓ · `bp-nav-inner` ✓ · `bp-nav-brand` ✓ · `bp-nav-links` ✓ · `bp-nav-link` ✓ · `bp-hero-full` ✓ · `bp-hero-full-bg` ✓ · `bp-hero-full-caption` ✓ · `bp-section-xl` ✓ · `bp-section-label` ✓ · `bp-section` ✓ · `bp-section-cover` ✓ · `bp-section-cover-bg` ✓ · `bp-section-cover-overlay` ✓ · `bp-section-sm` ✓ · `bp-chip` ✓ · `bp-chip-outline` ✓ · `bp-form-group` ✓ · `bp-label` ✓ · `bp-input` ✓ · `bp-textarea` ✓ · `bp-btn` ✓ · `bp-btn-primary` ✓

No invented classes found.

---

### ✅ Check 11 — Priority checks from build notes
**Status:** PASS (see Priority Checks section above for full findings)
**Summary:** 4 priority items reviewed. Two are PASS (provenance scrim, keyword uniqueness). Two are WARN (vatna-latin legibility, mobile stack order). No priority-check FAILs that aren't already captured in Checks 6 and 8.

---

### ✅ Check 12 — Observability builds: flex-shrink on panels
**Status:** PASS (SKIP)
Product type is botanical extract brand — not observability/tracing. Check skipped per review agent instructions.

---

## Warnings (human attention required, no fix round generated)

### ⚠️ WARN A — vatna-latin legibility at small size on dark
**Found:** `.vatna-latin` uses Cormorant Garamond italic weight 300 at `font-size: 0.95rem` (~15px) on `--color-bg: #0C0B09`.
**Concern:** This is below the 48px threshold where display-serif thin strokes are considered reliable on dark backgrounds (vocabulary skill, Dimension 8, "Display-serif at hero scale (64px+) can survive"). The build agent's mitigation (italic thickens visual stroke) is reasonable but fragile on low-resolution displays or when font rendering is subpixel-off.
**Suggested action:** Test on actual device at dark OS level. If readability is insufficient, switch `.vatna-latin` to `font-family: var(--font-body); font-style: italic;` (Inter italic at 300 weight, which has no hairline strokes and reads reliably at this size).

### ⚠️ WARN B — Extract 02 mobile stack order
**Found:** Extract 02 DOM order places `.vatna-extract-text` before `.vatna-extract-image`. On mobile (768px and below), the grid collapses to 1 column without `order` overrides — text renders above image for Extract 02, while Extracts 01 and 03 render image above text.
**Concern:** The build notes stated "image above text always on mobile" but this is not what the implementation produces for Extract 02. While the vocabulary spec does not explicitly mandate mobile stack order, the UX is inconsistent — two of three extracts show image-then-text; one shows text-then-image.
**Suggested action:** Add `order: -1` to `.vatna-extract:nth-child(2) .vatna-extract-image` in brand.css to pull the image to the top on mobile for Extract 02. Alternatively, use a consistent DOM order (image always first in DOM) for all extracts and use CSS column-reverse or order to achieve text-left on desktop for even extracts.
