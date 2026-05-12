# Build Notes — kakurega.html
Generated: 2026-05-10
HTML: examples/kakurega.html
Brand CSS: examples/kakurega-brand.css

## Vocabulary Resolution
| Dimension | Word | Key tokens |
|---|---|---|
| Density | airy | --space-unit: 1.25rem |
| Weight | light | --font-weight-heading: 300 |
| Tracking | wide | --letter-spacing-heading: 0.12em |
| Motion | surgical | --duration-fast: 0.05s / --duration-base: 0.1s / --duration-slow: 0.15s / --easing-bounce: ease / --easing-smooth: ease |
| Shape | sharp | --radius: var(--bp-radius-none) |
| Depth | flat | --shadow-sm/md/lg: none |
| Theme | light | data-bp-theme="light" |
| Type Family | display-serif | --font-heading: 'Cormorant Garamond' / --font-body: 'Inter' |
| Layout Pattern | journal-sequential | — |
| Image Strategy | photograph | — |
| Compositional Mode | atmospheric | — |

## Synthesis
Warmth=2, Precision=3 → moderate latitude, industry compass leads. Q1 cultural/material cues (Kyoto, Tamba kurodaizu, stone grinding, Fushimi water, fourth generation) are strong enough to push warm restraint over cold clinical despite precision leading.

## What was straightforward
- Color derivation: Tamba kurodaizu black soybeans in a ceramic bowl → dominant body mass is deep charcoal-indigo → #1C2028
- Background: Kyoto washi studio wall in diffused winter morning light → #F0EBE0 warm near-white
- Layout: journal-sequential from Q4 (Notion = document to settle into) + Q1 (physical process with sequential steps) + atmospheric compositional mode (each image breathes, text follows)
- Image placeholders: all 4 image sections written as src="PENDING" with bp-image comments. @copy will derive keywords from prose written for each section — the new pipeline. Lock seeds 1–4 assigned in sequence.
- No scrim needed anywhere: journal-sequential places text BELOW each image, never overlaid. Scrim check is not applicable.

## What required non-obvious decisions
- **Display-serif on light background**: Cormorant Garamond at ≥48px on #F0EBE0 (warm near-white) — light backgrounds are forgiving for thin serif strokes; no dark-background fragility issue here. Body copy is Inter 300 throughout, same as vatnajokull.
- **.kakurega-japanese uses Inter italic, not Cormorant**: Japanese characters (豆腐の隠れ家) require reliable CJK unicode rendering. Cormorant Garamond's CJK glyph support is unreliable — the characters would fall through to system serif. Inter renders them correctly with its broad unicode coverage.
- **Precision=3 > Warmth=2 but warm palette chosen**: The Q1 cultural/material cues (fourth generation Kyoto craft) are strong enough to justify warm restraint over the cold clinical end of moderate latitude. This is a defensible synthesis judgment.
- **No text over any photograph**: Journal-sequential layout — images are full-width blocks, text flows in normal flow below each one. No scrim, no overlay, no caption on image.
- **Nav content as bracket placeholders**: Unlike vatnajokull, nav labels here are bracketed since the English labels ("The Tofu", "Process") are marketing decisions that @copy should own given the professional audience register.

## Reviewer: verify these specifically
- Image strategy check: all 4 images should have real LoremFlickr or Picsum URLs after @copy runs (not src="PENDING"). @copy is responsible for deriving these from prose. If any remain as PENDING, that is a @copy failure, not a @blueprint failure.
- Scrim floor check should be SKIPPED or PASS for all sections — no text is overlaid on any photograph in this build. Reviewer must confirm this by checking that no bp-section-cover-overlay or equivalent scrim elements exist.
- .kakurega-japanese renders correctly at 0.9rem Inter italic on #F0EBE0 — no legibility concern (Inter body font, light background, 0.9rem is readable).
- Layout pattern compliance (journal-sequential): each image section must be immediately followed by a centered narrow text section, no side-by-side columns anywhere.
- Synthesis tension: Precision > Warmth but warm palette — confirm this reads as Kyoto craft authority rather than clinical precision. This is a judgment call; mark as WARN if uncertain.
