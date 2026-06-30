---
project: the-point
date: 2026-06-30
time: 08:40
working_directory: /home/rre/Work/mrgrampz-marketplace/the-point
previous_session: 2026-06-29-1853-design-theory-implementation.md
---

# Session: Design Token Audit

## Summary

This session was a systematic audit of every hardcoded value across the five core CSS files (`base.css`, `utilities.css`, `print.css`, `motion.css`, `components.css`), replacing magic numbers with design tokens where warranted. The most significant structural finding was that keyframe animations bypassed `--motion-scale` entirely — meaning `prefers-reduced-motion` killed animations but manual speed tuning didn't affect them. The next session picks up with two open architectural decisions: the SVG data URI limitation in the select chevron, and adding hover tokens for state colors.

## What We Did

### base.css
- Removed duplicate `--bp-grid-size: 40px` from both theme blocks; moved to shared `:root`
- Removed duplicate `:focus-visible` block that was overriding the variable-based one with hardcoded `2px` values (bug fix)
- Fixed `pre` border and `hr` border-top to use `var(--border-width) var(--border-style)`
- Added `--font-size-code: 0.9em` and `--code-padding: 0.125em 0.375em`; wired to `code, pre, kbd`
- Added `--bp-grid-line-width: 1px` and `--scrollbar-size: 6px`
- Added `--print-grid-color-bold: rgba(10, 22, 40, 0.06)` and `--print-grid-color: rgba(10, 22, 40, 0.03)`
- Added `--motion-fade-distance: 12px` and `--motion-sweep-height: 2px` to motion tokens
- Added `--opacity-decorative: 0.4`, `--opacity-decorative-strong: 0.6`, `--opacity-ghost: 0.08`
- Added `--annotation-border-width: 2px`
- Added `--bp-leading-display: 1.1`
- Added `--focus-glow-spread: 3px`
- Added `--checkbox-size: 16px`, `--compose-action-size: 32px`, `--select-chevron-size: 14px`
- Added `--bp-space-40: 10rem` (was missing; `bp-section-xl` was silently broken)
- Added `--color-border-subtle: var(--bp-border-subtle)` and `--color-surface-hover: var(--bp-surface-hover)` to semantic layer

### utilities.css
- `.bp-bracket::before/after` border-width shorthand → `var(--border-width)`
- `.bp-bracket` opacity → `var(--opacity-decorative-strong)`
- `.bp-crosshair::before/after` 1px line widths → `var(--bp-grid-line-width)`
- `.bp-crosshair` opacity → `var(--opacity-decorative)`
- `.bp-dashed-connector` border-top 1px → `var(--border-width)`
- `.bp-annotation` border-left `2px solid #1d4ed8` → `var(--annotation-border-width) var(--border-style) var(--color-border)`

### print.css
- Grid background-image: replaced 4× hardcoded `1px` with `var(--bp-grid-line-width)`, grid colors with `var(--print-grid-color-bold/color)`
- `background-size: 40px` → `var(--bp-grid-size)`, `10px` → `calc(var(--bp-grid-size) / 4)`
- `body color: #0a1628` and `h1–h6 color: #0a1628` → `var(--color-text)`
- `.bp-annotation color: #4a7a9b` → `var(--color-text-muted)`
- `.bp-annotation border-left: 2px solid #1d4ed8` → `var(--annotation-border-width) var(--border-style) var(--color-primary)`
- `.bp-stat-value color: #0a1628` → `var(--color-text)`
- Five `border: 1px solid` and `border-bottom: 1px solid` → `var(--border-width) var(--border-style)`
- Section, hero, grid, footer spacing values → spacing scale variables

### motion.css
- `translateY(12px)` in `@keyframes bp-fade-up` → `var(--motion-fade-distance)`
- All `1px` border widths in `@keyframes bp-border-draw` → `var(--border-width)` (valid in keyframes for non-animated constants)
- T-square sweep `height: 2px` → `var(--motion-sweep-height)`
- T-square `cubic-bezier(0.4, 0, 0.2, 1)` → `var(--easing-smooth)`
- **All 8 animation durations and delays wrapped in `calc(Xs * var(--motion-scale))`** — page draw sequence now responds to `--motion-scale`
- `.bp-animate-draw` initial background-size and reduced-motion fallback 1px → `var(--border-width)`

### components.css
- `.bp-btn-icon` width 40px → `var(--btn-height-md)`; sm/lg variants similarly
- `.bp-btn-primary:hover` and `.bp-btn-destructive:hover` `translateY(-1px)` → `calc(-1 * var(--lift-distance) / 2)`
- `.bp-card-hover:hover` `translateY(-2px)` → `calc(-1 * var(--lift-distance))`
- `.bp-pricing-card:hover` `translateY(-4px)` → `calc(-2 * var(--lift-distance))`
- `.bp-hero-title` and `.bp-text-identity` `line-height: 1.1` → `var(--bp-leading-display)`
- Three `box-shadow: 0 0 0 3px` focus glows → `var(--focus-glow-spread)`
- `.bp-divider::before/after height: 1px` → `var(--border-width)`
- `.bp-step border-top: 2px solid` → `var(--annotation-border-width) var(--border-style)`
- `.bp-step::before opacity: 0.08` → `var(--opacity-ghost)`
- Skeleton grid units → `calc(var(--bp-grid-size) * N)` (×5)
- `.bp-animate` transition durations → `calc(Xs * var(--motion-scale))` (×3)
- `.bp-select` `padding-right`, `background-position`, `background-size` → tokens
- Table `--bp-border-subtle` → `var(--color-border-subtle)`
- Three `--bp-surface-hover` fallback references → `var(--color-surface-hover)`

### Git
- Committed as `ab65c8b`: "Replace hardcoded values with design tokens across core CSS"

## Why We Did It This Way

**Bedrock vs. bypass distinction:** The core question throughout was whether a hardcoded value was a *bedrock definition* (the thing that grounds the system — like `--font-size-base: 16px` or `--border-width: 1px`) or a *bypass* (a value that should reference an existing variable but doesn't). Bedrocks stay hardcoded. Bypasses get fixed. This distinction was applied consistently: `--space-unit: 1rem` is bedrock; `border: 1px solid` in component code is a bypass.

**New tokens only when a brand would legitimately change the value:** We didn't tokenize `margin-top: 2px` pixel nudges or `transform: scale(1.08)` micro-interactions because no brand decision would vary them. We did tokenize `--motion-fade-distance: 12px` because a minimal brand legitimately wants less dramatic entry motion.

**`calc(Xs * var(--motion-scale))` for all animation durations:** The existing system already used this pattern for transitions in base.css. Keyframe animations were inconsistent — they responded to `prefers-reduced-motion` (which sets `animation: none`) but not to `--motion-scale`. Wrapping durations in `calc()` closes that gap: `--motion-scale: 0.5` now affects both hover transitions and page draw animations.

**CSS custom properties work in `@keyframes` for constant values:** The `1px` border widths in `bp-border-draw` keyframes don't animate between keyframes — they're constant across all stops. The browser resolves `var(--border-width)` at computed-value time for the animated element, so this works correctly in all modern browsers.

**`--color-border-subtle` and `--color-surface-hover` needed semantic aliases:** `--bp-border-subtle` and `--bp-surface-hover` were defined in the theme blocks but had no counterparts in the brand override layer. Components were reaching directly into the `--bp-*` namespace instead of the semantic layer — breaking the system's layering contract (brands override semantic tokens, not blueprint primitives).

## Roads Not Taken

**PostCSS for `@custom-media` breakpoint tokens.** Robert explicitly ruled this out — no build step in this project. Media query values (`768px`, `769px`, `640px` in utilities and components) remain hardcoded. This is a CSS engine limitation, not a design decision.
**Do not add a build step to solve breakpoint tokenization.** The project is intentionally pure CSS.

**`--opacity-disabled: 0.4` for the crosshair decoration.** The crosshair uses 0.4 opacity, which numerically matches `--opacity-disabled`. We created `--opacity-decorative: 0.4` instead — same value, correct semantics. Reusing `--opacity-disabled` would have made "why is my decorative crosshair 'disabled'?" a confusing question for any future maintainer.
**Do not reuse state-named tokens for decorative opacity.** Names carry meaning that outlasts the numerical coincidence.

**`calc(-1 * var(--border-width))` for bracket offsets.** The `-1px` positioning offsets on `.bp-bracket::before/after` (`top: -1px; left: -1px` etc.) were considered for tokenization. Left hardcoded because the offset is a design micro-decision independent of border width — if `--border-width` changes to `2px`, the bracket doesn't necessarily move `2px` outside, it still sits `1px` outside.
**Do not tie bracket offsets to `--border-width`.** The relationship isn't semantic.

**`mask-image` technique for select chevron.** The SVG data URI chevron colors (`%234a7a9b`, `%233b82f6`, `%23ef4444`) can't be tokenized because CSS custom properties don't resolve inside data URI strings. The `mask-image` approach (solid `background-color` + SVG mask) would make the color fully token-driven but requires restructuring the select styles significantly. Deferred, not rejected.
**Do not attempt to use `var()` inside a data URI string — it won't resolve.**

**Skeleton shimmer `--motion-scale` wrapping.** The `bp-shimmer` animation uses hardcoded `1.5s`. We deliberately left this alone. Skeleton loading communicates state; silencing it with `--motion-scale: 0` (triggered by `prefers-reduced-motion`) would leave an empty white box with no indication of loading state.
**Do not wrap skeleton shimmer duration in `calc(* var(--motion-scale))`.** It is a functional indicator, not decorative animation.

## Key Discoveries

**Q: Do CSS custom properties work in `@keyframes`?**
A: Yes, for non-animated constants. The browser resolves `var(--border-width)` at computed-value time from the element being animated. Since the `1px` values in `bp-border-draw` are identical across all keyframe stops, no interpolation is needed — the value is just read once and applied. Smooth interpolation of custom properties requires `@property` registration, but that's only needed when the value itself animates between keyframes.

**Q: Why did `--motion-scale` not affect page draw animations?**
A: The `--duration-*` tokens in base.css use `calc(Xs * var(--motion-scale))`, so all CSS transitions respect the scale. But keyframe `animation:` shorthand durations were hardcoded raw seconds, bypassing `--duration-*` entirely. The fix was wrapping each animation duration and delay individually in `calc()`.

**Q: Is `--bp-space-40` defined?**
A: No — it was missing from the spacing scale entirely. `.bp-section-xl` references it for padding; CSS falls back to nothing silently, making `.bp-section-xl` have zero padding. Fixed by adding `--bp-space-40: 10rem`.

**Q: Why does `--font-size-base: 16px` stay hardcoded?**
A: It is the bedrock definition that establishes what `1rem` equals. Setting `html { font-size: 1rem }` would be self-referential — the browser would resolve it using its own default (also 16px), but you'd lose the ability to actually control the root size. Every other size floats relative to this one anchor.

**Q: Can SVG data URI colors be tokenized?**
A: No. CSS custom properties are resolved in the cascade, but a data URI is treated as an opaque string — the CSS parser never processes it for variable substitution. The `mask-image` technique (background-color + mask) is the alternative.

## Open Questions & Next Steps

**SVG chevron data URI colors** — The select chevron has hardcoded hex colors for default, focus, error, disabled, and light-theme states. Two paths: (1) `mask-image` technique with a token-driven `background-color`, or (2) inline `<svg>` in the markup. Deferred, not decided.

**State color hover tokens** — `--color-error-hover`, `--color-success-hover`, `--color-warning-hover` don't exist. `.bp-btn-destructive:hover` uses inline `color-mix()`. The pattern already exists for `--color-primary-hover`. Should be added to the brand override layer in base.css so brands can override without knowing the formula.

**Avatar size tokens** — `--avatar-sm: 32px`, `--avatar-md: 40px`, `--avatar-lg: 48px`, `--avatar-xl: 64px` were identified as candidates but not acted on. The sizes currently don't reference btn-height tokens (though the numbers coincide for md and lg). Deferred.

**Compose field min/max height** — `min-height: 22px` and `max-height: 200px` on `.bp-input-compose-field` were identified as hardcodes but left because they're UI constraints tied to auto-resize JS logic, not brand decisions. Revisit if the compose component gets a formal spec.

**`--annotation-border-width` naming** — We used this token for both sidebar annotation style AND step accent borders. The name is annotation-specific but the usage is broader ("visually prominent border at 2px"). Could be renamed `--border-width-accent` for clarity. Low priority.

**Print annotation `font-size: 8.5pt`** — Could be `--print-font-size-annotation: 8.5pt`. Not tokenized because the `@page` margin box (where the same constraint applies) can't use CSS custom properties anyway, making a print font-size token partially useful at best.

## Files Changed

- `assets/core/base.css` — Added 18 new tokens across spacing, typography, motion, opacity, color, and form dimension categories. Added `--color-border-subtle` and `--color-surface-hover` to semantic layer. Fixed duplicate `:focus-visible` block. Moved `--bp-grid-size` out of theme blocks into shared `:root`. [Constraint: The `--font-size-base: 16px` bedrock value must stay hardcoded — it cannot reference another variable without becoming self-referential.]

- `assets/core/utilities.css` — All decorative element hardcodes replaced with tokens. Bracket border-widths, bracket/crosshair opacities, crosshair line widths, dotted connector border, annotation border. [Constraint: Media query breakpoint values (`768px`, `769px`, `640px`) remain hardcoded by design — no build step, CSS limitation.]

- `assets/core/print.css` — Hardcoded hex colors replaced with semantic token references (safe because the `:root` block at the top of `@media print` overrides all semantic tokens to print-safe values with `!important`). Grid background wired to grid tokens. All spacing wired to scale. [Constraint: All values inside `@page { @bottom-right { } }` remain hardcoded — CSS custom properties don't resolve in `@page` margin boxes, same limitation as media queries.]

- `assets/core/motion.css` — All animation durations and delays now use `calc(Xs * var(--motion-scale))`. Keyframe constants use `var(--border-width)`. [Constraint: Skeleton shimmer (`bp-shimmer`) deliberately does NOT use `--motion-scale` — it is a loading state indicator, not decorative animation, and must remain visible even at `--motion-scale: 0`.]

- `assets/core/components.css` — Lift distances unified through `--lift-distance`. Button icon widths reference height tokens. Display leading, focus glow spread, ghost opacity all tokenized. Skeleton grid units derived from `--bp-grid-size`. `.bp-animate` transitions now respect `--motion-scale`. Select hardcodes replaced. Surface-hover and border-subtle references moved to semantic layer. [Constraint: `line-height: 1` on buttons and pricing amounts is an intentional reset value, not a design token candidate.]

---
*Note: This document was written from conversation context. The full session was captured without compression gaps — all changes are reflected accurately in the file list above.*
