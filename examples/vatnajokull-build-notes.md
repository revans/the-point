# Build Notes — vatnajokull.html
Generated: 2026-05-10
HTML: examples/vatnajokull.html
Brand CSS: examples/vatnajokull-brand.css

## Vocabulary Resolution
| Dimension | Word | Key tokens |
|---|---|---|
| Density | airy | --space-unit: 1.25rem |
| Weight | light | --font-weight-heading: 300 / --font-weight-body: 300 |
| Tracking | wide | --letter-spacing-heading: 0.12em |
| Motion | surgical | --duration-fast: 0.05s / --duration-base: 0.1s / --duration-slow: 0.15s / --easing-bounce: ease / --easing-smooth: ease |
| Shape | sharp | --radius: var(--bp-radius-none) |
| Depth | flat | --shadow-sm/md/lg: none |
| Theme | dark | data-bp-theme="dark" |
| Type Family | display-serif | --font-heading: 'Cormorant Garamond' / --font-body: 'Inter' |
| Layout Pattern | editorial-alternating | — |
| Image Strategy | photograph | — |
| Compositional Mode | atmospheric | — |

## What was straightforward
- Synthesis scoring: Warmth=1 (material/process/geography in Q1), Precision=3 (professional Q2, research lab Q3, every-word-matters Q7). Moderate creative latitude — no ambiguity tie.
- Color derivation: Icelandic moss (cetraria islandica) on lava in overcast Nordic light → #6B7C58 (desaturated olive sage — dominant body mass, not vivid)
- Background derivation: volcanic basalt tundra floor → #0C0B09 (warm near-black)
- Image keyword uniqueness: 5 sections × distinct keyword sets with no two adjacent sharing more than one keyword. Hero: iceland,glacier,tundra → Moss: moss,lichen,lava → Crowberry: crowberry,nordic,berry → Birch: birch,catkin,spring → Provenance: volcanic,arctic,wilderness.
- Layout: editorial-alternating derived from Q1 (physical botanicals) + Q2 (professional browsing) + Q4 (Notion feel = spacious, settle in). Alternation achieved via DOM order swap on Extract 02 (text first, image second) rather than CSS direction trick — simpler and more reliable.

## What required non-obvious decisions
- **Display-serif on dark background**: The vocabulary skill warns that Cormorant Garamond's thin strokes disappear at body sizes on dark. Decision: Cormorant Garamond used ONLY for .vatna-display (3.5–6.5rem) and .vatna-heading (2.25–3.5rem). Body copy is Inter 300 throughout. vatna-latin (specimen label) stays Cormorant at 0.95rem — this is small but italic, which thickens the visual stroke enough to survive. May still be fragile at small screen sizes.
- **Nav treatment for editorial-alternating**: The vocabulary spec says "minimal sticky nav: brand name left, 2–3 text links right. No button in nav." Q7 (every word matters) reinforces this — no CTA button in nav for a professional inquiry page.
- **Compositional mode atmospheric suppression**: No hero CTA, no feature grid, no numbered feature list. The extracts sections carry the information weight. The provenance section is image-led with text anchored bottom-left, consistent with atmospheric mode.
- **Extract alternation pattern**: Used DOM order swap (text first for even extracts) rather than CSS tricks. Reviewer should verify this renders as expected on mobile — the stacked grid order should produce: image, text, text, image, image, text on mobile.

## Reviewer: verify these specifically
- vatna-latin at 0.95rem on dark background — Cormorant Garamond italic at this size: does the thin stroke survive? If not, switch to Inter italic.
- Mobile stacking order on extracts: Extract 01 (image, text) → Extract 02 (text, image DOM order) → Extract 03 (image, text). On mobile all columns stack 1fr. Verify DOM order produces sensible reading order: should always be image above text.
- Scrim opacity on provenance cover section: set to 0.62 (above the 0.45 floor). Verify text is readable against the specific image that loads.
- Image keyword uniqueness: each section's keywords confirmed distinct with no cross-section adjacency overlap greater than one keyword.
