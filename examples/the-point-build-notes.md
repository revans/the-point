# Build Notes — the-point.html
Generated: 2026-06-29
HTML: examples/the-point.html
Brand CSS: examples/the-point-brand.css

## Vocabulary Resolution
| Dimension | Word | Key tokens |
|---|---|---|
| Density | compact | `--space-unit: 0.825rem`, `--font-size-base: 15px` |
| Weight | medium | `--font-weight-heading: 500` |
| Tracking | closed | `--letter-spacing-heading: -0.02em` |
| Motion | surgical | `--duration-fast: 0.05s`, `--duration-base: 0.1s` |
| Shape | precise | `--radius: var(--bp-radius-sm)` |
| Depth | flat | `--shadow-sm: none`, `--shadow-md: none` |
| Theme | dark | `data-bp-theme="dark"` |
| Type Family | geometric+mono | Inter 500 headings, JetBrains Mono labels/code |
| Layout Pattern | product-as-hero split | 40/60 split hero, output on right |
| Image Strategy | mockup | CSS-only mockups inside browser frames |
| Compositional Mode | minimal | No decoration, every section earns space |
| Format Reference | product-as-hero | Plugin output proves itself; terminal CTA not a form |

## What was straightforward
- Primary color: amber #F59E0B. Distinctive in developer tooling space (everything else is blue/purple/cyan). Signal: "this tool is about design craft, not just code."
- Background: #0A0906 warm near-black. Not cold #000000 — the warmth differentiates from cold tech dark themes.
- Typography pairing: Inter + JetBrains Mono. Developer tool archetype — geometric precision + code legibility. Zero ambiguity.
- CTA section: terminal block (not a form). Product-as-hero format reference maintained through conversion point — correct per Step 11.
- Copy was written directly (not via @copy spawn) — product is fully known, no placeholders needed.

## What required non-obvious decisions
- Format Reference selection: could have been `spec-sheet` (technical reference-first) or `product-as-hero`. Chose product-as-hero because the primary claim is qualitative ("agents build good websites") which is proven by showing output, not by listing specs. Spec-sheet would have worked for a library of CSS tokens; the-point's value is the output, not the API.
- Hero mockup subject: chose kakurega (Japanese private dining, dark editorial) specifically because it's maximally different from a developer tool aesthetic. A developer visitor seeing a beautiful Japanese restaurant page immediately understands "this system produces for any domain." If the hero showed another dev tool mockup it would feel circular.
- Grid tint: amber-tinted blueprint grid lines (`rgba(245,158,11,0.025)`) rather than the default blue-tinted grid. Very subtle — but the grid is THE-POINT's core visual identity and tinting it amber reinforces the brand at the system level.
- Examples three choices: broadcast-terminal (GHOST) / print-editorial (Il Mulino) / split-vertical (Fable). Selected to maximize format reference diversity — one dark technical, one warm analog, one split structure. The variety proves the vocabulary system resolves differently for different domains.
- `data-bp-motion="draw"` added: appropriate for a developer tool that's "tech-forward" per blueprint.md guidance. Draws lines in on load, matches the "surgical" motion token.

## Reviewer: verify these specifically
- Hero mockup height: the browser frame right column should visually balance with the left column copy block. If one is dramatically taller than the other, check the `bp-split` alignment — I set `align-items: center` via `.tp-hero-split` which should handle it.
- Pipeline section node flex: `flex: 1` on pipeline nodes with `flex-wrap: wrap` at mobile may cause uneven last rows (e.g. 3 nodes wrap to 5+1 rather than 3+3+... pattern). Review at 768px.
- CSS mockup terminal cursor animation: the `@keyframes tp-blink` is defined inside `@layer brand-state`. Confirm animation works cross-browser inside a layer block. (Namespaced `tp-blink` to avoid collision.)
- The `bp-split-40-60` documentation says it collapses to single column at 768px. On mobile the hero left column (copy) should appear above the browser frame mockup. Verify this stacks correctly.
