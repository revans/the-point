# Fix Requests — kakurega.html
Source review: examples/kakurega-review-r2.md
Iteration: 2
Generated: 2026-05-10

## Fixes required

### Fix 1 — Layout pattern compliance: hero image height exceeds journal-sequential maximum
**File:** examples/kakurega-brand.css
**Found:** `.kakurega-chapter-image--hero { height: 80vh; }` (line 119)
**Required:** `height: 70vh` — journal-sequential spec requires all image sections at 50–70vh (vocabulary spec Dimension 9, layout table)
**Action:** Change `height: 80vh` to `height: 70vh` in the `.kakurega-chapter-image--hero` rule at line 119 of kakurega-brand.css.
**Confidence:** high — the spec value is explicit: "Image: 50–70vh" with no exception stated for a hero variant.
