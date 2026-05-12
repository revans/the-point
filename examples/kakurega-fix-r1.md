# Fix Requests — kakurega.html
Source review: examples/kakurega-review-r1.md
Iteration: 1
Generated: 2026-05-10

## Fixes required

### Fix 1 — Weight: `--font-weight-body: 300` missing
**File:** examples/kakurega-brand.css
**Found:** `--font-weight-body` is not present in the `:root` block. The comment block on line 7 acknowledges "body: 300" but the token was never written. Current body weight defaults to 400.
**Required:** `--font-weight-body: 300;` (Weight: light, vocabulary skill Dimension 2 — light word requires both heading and body at 300)
**Action:** In `kakurega-brand.css`, add `--font-weight-body: 300;` to the `:root` block immediately after `--font-weight-heading: 300;` (currently at line 37). The new line should read:
```css
--font-weight-body: 300;
```
**Confidence:** high — unambiguous spec violation; vocabulary table is explicit that `light` sets both `--font-weight-heading: 300` and `--font-weight-body: 300`.

---

### Fix 2 — Photograph strategy: no `background-color` on `.kakurega-chapter-image` wrapper
**File:** examples/kakurega-brand.css
**Found:** The `.kakurega-chapter-image` component rule (lines 110-115) has `position: relative; width: 100%; height: 65vh; overflow: hidden;` — no `background-color`. All four image sections in the HTML use this class as their wrapper and none have inline `background-color` either.
**Required:** Per vocabulary skill Dimension 10 (photograph implementation, rule 6): "Set `background-color` on the section WRAPPER to the most dominant dark tone extracted from your research." The spec example labels the missing `background-color` pattern as explicitly WRONG.
**Action:** In `kakurega-brand.css`, add `background-color: #2C2820;` to the `.kakurega-chapter-image` rule. This is the warm deep brown tone of the aged cedar-and-stone workshop environment — the dominant dark mass across all four section subjects (exterior cedar walls in mist, stone grinding workshop interior, shoji screen workshop, craft kitchen). Insert after `overflow: hidden;` so the rule reads:
```css
.kakurega-chapter-image {
  position: relative;
  width: 100%;
  height: 65vh;
  overflow: hidden;
  background-color: #2C2820;
}
```
**Confidence:** high (rule is unambiguous) / medium (specific color value — `#2C2820` is defensible for cedar-and-stone Kyoto workshop but could be refined to a darker value like `#1E1A14` for the interior sections; the spec requires the color come from keyword research, and this value aligns with the brand's `--color-primary: #1C2028` warm charcoal range)
