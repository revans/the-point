# Build Notes — tierra-profunda
Generated: 2026-05-10
HTML: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda.html
Brand CSS: /home/rre/Work/mrgrampz-marketplace/the-point/examples/tierra-profunda-brand.css

## Vocabulary Resolution
| Dimension | Word | Key tokens |
|---|---|---|
| Density | compact | `--space-unit: 0.825rem`, `--font-size-base: 15px` |
| Weight | medium | `--font-weight-heading: 500`, `--font-weight-body: 400` |
| Tracking | open | `--letter-spacing-heading: 0.06em` |
| Motion | surgical | `--duration-fast: 0.05s`, `--duration-base: 0.1s`, `--duration-slow: 0.15s`, `--easing-bounce: ease`, `--easing-smooth: ease` |
| Shape | sharp | `--radius: 0px` |
| Depth | flat | `--shadow-sm/md/lg: none` |
| Theme | dark | `data-bp-theme="dark"` |
| Type Family | display-serif + geometric-sans | `--font-heading: 'Cormorant Garamond', serif` (headings ≥64px only); `--font-body: 'Inter', system-ui, sans-serif` |
| Layout Pattern | credential | — |
| Image Strategy | photograph | LoremFlickr; 5 process slots + 1 provenance panel |
| Compositional Mode | minimal | — |

## What was straightforward
- Dark theme, flat depth, sharp shape: all converge cleanly on the physical brief (stone walls, packed earth, no softening anywhere)
- Surgical motion: "the page doesn't perform for you" (Q4) is an unambiguous motion directive
- Credential layout: "the bottle finds you" (Q8) + slow collector audience (Q2) = the page is the credential, not the conversion funnel
- Primary color derivation: tobala agave roasted piña → deep caramel amber (#B8732A), meaningfully distinct from the similar Tlaloc Negro example (#E07B25, brighter orange) in the examples directory
- Background derivation: Sierra Sur packed red-clay volcanic earth → #0D0806 with faint red undertone
- Type family: display-serif headings survive dark backgrounds at display scale; Inter body prevents hairline-disappearance failure at small sizes (learned rule applied)
- Retailer section: Q8 specifies "find a local retailer" — built a full region-filter + directory layout rather than just a "contact us" link. This is the primary CTA of the page.
- Allocation form uses `bp-btn-outline` not `bp-btn-primary` — consistent with the brief's "the brand stays quiet" (Q3). An outline button makes the ask without performing.

## What required non-obvious decisions
- **Tracking conflict at compact density**: Initial instinct was `wide` tracking (0.12em) for engraved heritage feel. Conflict rule says: wide tracking at compact density causes awkward headline wrapping at display sizes (display-serif is already wide at large sizes). Resolved to `open` (0.06em) — still engraved, avoids wrapping at Cormorant Garamond display sizes.
- **Differentiation from Tlaloc Negro**: An existing example (tlaloc-negro.html) is also a small-batch Oaxacan mezcal with almost identical material. Tierra Profunda required meaningful differentiation: (1) primary color shifted darker/browner (#B8732A vs #E07B25), (2) layout pattern changed from 5-portrait-slot strip + bottle to gatefold expressions side-by-side + retailer finder, (3) font weight changed from 300 (light) to 500 (medium) — Tierra Profunda has two expressions and a retailer infrastructure vs. Tlaloc's pure silence, so slightly more structural weight is appropriate, (4) body font changed from Plus Jakarta Sans (humanist-sans) to Inter (geometric-sans) — the "Bloomberg terminal, all signal" Q4 answer tilts toward geometric-sans precision over humanist warmth.
- **Gatefold expressions layout**: Built as a custom `.tp-expressions-grid` rather than using `bp-spread-3` because the two-panel equal-weight layout fits `bp-split-50-50` pattern conceptually, but the bottle + tasting data structure inside each panel needed full custom treatment. `bp-split` classes don't exist at 50/50 — it goes 40/60, 60/40. Used custom grid.
- **Process strip LoremFlickr keywords**: Applied the "correct perspective" and "no peak drama" rules. Keywords chosen: `agave,oaxaca,harvest` (not `agave,fire,smoke`), `agave,roasting,pit` (not `fire,pit,flames`), `tahona,stone,wheel` (not `stone,mill,dust`), `fermentation,vat,wood` (not `fermentation,bubbling,mash`), `distillation,mezcal,still` (not `fire,smoke,still`). All seeds assigned (11–15) — different from Tlaloc Negro seeds (1–5 range) to avoid Flickr pool overlap.
- **Provenance image keywords**: `oaxaca,mountains,sierra` with seed 7 — shows WHERE the brand lives (the Sierra Sur highlands), not the production process. Avoids the "fire/smoke overwhelms the section" failure mode.
- **Process image scrim**: Applied `linear-gradient(to bottom, transparent 55%, rgba(13,8,6,0.6) 100%)` inline on each process image element. The gradient goes on the outer `.tp-process-image` div via inline style, with the LoremFlickr URL underneath. The `background-color: #3A2A18` fallback is set in CSS on the class itself. This follows the photograph protocol: wrapper has image-derived fallback color, gradient is the top layer, URL is the base layer.
- **Allocation form `bp-btn-outline`**: The brief says "no buy now — the bottle finds you" and "research lab — the brand stays quiet." A primary button on a contact form signals urgency the brand explicitly doesn't have. Outline is the correct register: present, not pushing.

## Reviewer: verify these specifically
- **Process strip image legibility**: All five LoremFlickr images get scrims via inline style. The scrim is `rgba(13,8,6,0.6)` — verify this is strong enough once seeds resolve to actual photos. Seed conflicts with Tlaloc Negro examples are unlikely (seeds 11–15 vs 1–5) but not impossible if the Flickr photo pool overlaps.
- **Gatefold expressions collapse on mobile**: `.tp-expression-panel:first-child` uses `border-right: none; border-bottom: 1px solid var(--color-border)` on mobile. Verify the espadin panel bottom border doesn't double with the tobala panel top (there isn't one, but check the visual gap).
- **Open tracking on brand name at mobile**: At mobile font sizes (clamp bottoms at 2.5rem), `letter-spacing: 0.06em` on 'TIERRA PROFUNDA' or similar long brand names may still be fine, but verify it doesn't wrap at 375px viewport. A `@media (max-width: 640px)` rule reduces tracking to 0.03em on `.tp-brand-name` — verify this is sufficient.
- **Retailer region filter on mobile**: On narrow viewports, the region items switch from vertical list to horizontal flex-wrap. The `active` state border changes from `border-left-color` to `border-bottom-color`. Verify the visual distinctness of the active state is legible in this layout.
- **Background color fallback on provenance image**: `.tp-provenance-image` has `background-color: #4A3A28` (dominant mid-tone from sierra,mountains research). If the LoremFlickr seed 7 returns an image with significantly different dominant tone, the fallback will flash visibly before the photo loads. If this matters in production, the seed should be evaluated and a better fallback derived.
- **Cormorant Garamond at compact density**: At 15px base font size, the `tp-expression-heading` (`clamp(1.75rem, 3.5vw, 2.5rem)`) is roughly 26–37px. This is below the 48px threshold where display-serif hairlines reliably survive on dark backgrounds. Verify legibility at smaller viewport sizes. If hairlines disappear, increase the clamp minimum to 2rem or switch expression headings to Inter 400.

## Fix Round 1
Applied: 2026-05-10
Source: tierra-profunda-fix-r1.md (Iteration 1)

### Fix 1 — Display-serif below 48px on dark background (high confidence)
Five classes were using `font-family: var(--font-heading)` (Cormorant Garamond) at sizes that never reach the 48px minimum threshold for display-serif on dark backgrounds. Changed all five to `font-family: var(--font-body)` (Inter). All other properties (font-weight, letter-spacing, text-transform, color) retained unchanged.

Classes changed:
- `.tp-expression-heading` (line 340) — max 37.5px → now Inter 500
- `.tp-price-number` (line 411) — max 30px → now Inter 500
- `.tp-section-title` (line 453) — max 37.5px → now Inter 500
- `.tp-allocation-title` (line 750) — max 33.75px → now Inter 500
- `.tp-close-wordmark` (line 793) — fixed 15px → now Inter 500

`.tp-brand-name` was NOT changed — it uses `var(--font-heading)` and reaches up to 6.5rem (97.5px) at large viewports, well above the threshold.
