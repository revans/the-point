---
project: the-point
date: 2026-06-30
time: 09:33
working_directory: /home/rre/Work/mrgrampz-marketplace/the-point
previous_session: 2026-06-30-0840-design-token-audit.md
---

# Session: Code Review And Fixes

## Summary

This session picked up the two uncommitted gap fixes from the previous audit, committed them, then ran two full rounds of parallel code review (one agent per CSS file per round) and fixed every finding. By the end, all five core CSS files are clean: no undefined token references, no semantic-layer bypasses for state colors or surface colors, no animation-curve distortions, no print cascade gaps, and the select chevron is fully token-driven via mask-image. The next session starts with a clean system — no known issues in the CSS layer.

## What We Did

### Commits (in order)

1. **`2a24d72`** — Close semantic layer gaps found during token audit
   - `assets/core/base.css`: Added `--bp-space-40: 10rem`, `--color-border-subtle`, `--color-surface-hover`, `--select-chevron-size`
   - `assets/core/components.css`: Cleaned surface-hover/border-subtle bypasses in nav, btn-secondary, skeleton; tokenized select padding/position/size

2. **`3490295`** — Close remaining token gaps: chevron, state hovers, avatars, accent border
   - Select chevron: replaced 6 hardcoded `background-image: url(data:...)` selectors with `.bp-select-wrapper` + `::after` using `mask-image`. Single SVG, color driven by `background-color` + semantic tokens. States via `:has()`. Markup change: `<div class="bp-select-wrapper"><select class="bp-select">...</select></div>`
   - Added `--color-error-hover`, `--color-success-hover`, `--color-warning-hover` to brand override layer
   - `.bp-btn-destructive:hover` wired to `var(--color-error-hover)`
   - Added `--avatar-sm/md/lg/xl` tokens; wired `.bp-avatar-*` size rules
   - Renamed `--annotation-border-width` → `--border-width-accent` across all files

3. **`51a34db`** — Fix 12 issues from first code review pass
   - `components.css`: `.bp-chip-danger` referenced undefined `--color-danger`; fixed to `--color-error/subtle`
   - `motion.css`: `.bp-animate-draw` needed `animation-duration: auto` for scroll-driven timeline
   - `print.css`: REQ/TIER shared counter split into `bp-req` + `bp-tier`; missing border on `.bp-print-spec .bp-pricing-card`
   - `base.css`: `--bp-shadow-inset` transposed x/y in auto-light block fixed; `--bp-transition-*` moved from blueprint `:root` to brand override `:root`; added `--feature-icon-size: 48px`, `--alert-icon-size: 18px`
   - `components.css`: `.bp-btn-destructive` base wired to `--color-error`; input error states wired to `--color-error/subtle`; stat-change wired to `--color-success/error`; avatar/alert-icon sizes tokenized; `--border-width-accent` applied
   - `print.css`: `.bp-annotation border-left` got `!important`; utilities doc comment added for `.bp-bracket`/`.bp-crosshair` mutual exclusivity

4. **`a9017f7`** — Sweep remaining state color primitive bypasses in components.css
   - All remaining `--bp-error`, `--bp-success`, `--bp-warning` and `-subtle` variants replaced with `--color-*` counterparts across badges, alerts, chips, toasts, pricing checkmark

5. **`94af49e`** — Fix 12 issues from second code review pass
   - `base.css`: `--bp-transition-fast/base` now use `var(--easing-smooth)` instead of hardcoded `ease`
   - `utilities.css`: `.bp-font-sans` fixed to `var(--bp-font-sans)` (was `var(--font-body)`, the semantic alias); `.bp-hover-glow` base state gets `transition: var(--bp-transition-smooth)` (was snapping)
   - `print.css`: Three `border-bottom` declarations missing `!important` fixed (.bp-stat, .bp-card::before, .bp-pricing-card::before in spec blocks)
   - `components.css`: `.bp-text-gradient` endpoint replaced `var(--bp-blue-300)` with `color-mix(in oklch, var(--color-primary) 50%, white)`; four `var(--bp-bg-elevated)` bypasses → `var(--color-surface-elevated)` (select option, badge-secondary, table header, skeleton); `.bp-btn-destructive:hover` got `border-color: var(--color-error-hover)`

### Deferred items resolved from previous session

- SVG chevron data URI limitation: resolved via mask-image wrapper approach
- State color hover tokens: added and wired
- Avatar size tokens: added and wired
- `--annotation-border-width` naming: renamed to `--border-width-accent`

## Why We Did It This Way

**mask-image wrapper for select chevron, not inline SVG.** The inline `<svg>` approach would have required SVG knowledge at the markup level and a sibling element that's easy to omit. The wrapper approach keeps all SVG inside CSS, adapts automatically to theme through semantic tokens, and uses `:has()` for state management. The wrapper is also the more idiomatic design-system pattern (cf. Bootstrap, Carbon). Both approaches require a markup change — the "no markup change" framing from the initial discussion was wrong; the wrapper is just a more natural one.

**`color-mix(in oklch, var(--color-primary) 50%, white)` for `.bp-text-gradient`.** The original `var(--bp-blue-300)` hardcoded the gradient endpoint to blueprint blue, breaking brand adaptation. oklch-space mixing was chosen over sRGB for perceptual uniformity — the midpoint of the gradient won't desaturate unexpectedly. `white` as the mix target gives a consistent lighter tint that reads well on both light and dark backgrounds for a text gradient use case.

**`--bp-transition-fast/base` should use `var(--easing-smooth)`, not hardcoded `ease`.** The transition presets were moved to the brand override layer precisely because they depend on brand-layer tokens. Having `fast` and `base` use a hardcoded easing while `smooth` and `bounce` use `var(--easing-smooth)` created an asymmetric contract — a brand that sets `--easing-smooth` would see it applied to some transitions but not others. All four presets now use the token.

**`--bp-transition-*` moved from blueprint `:root` to brand override `:root`.** These tokens reference `--duration-*` and `--easing-*`, which only exist in the brand override layer. The `--bp-*` prefix suggests self-contained primitives, but these tokens aren't — they depend on brand layer definitions. Moving them to the same `:root` block as their dependencies makes the dependency explicit and eliminates the risk of silent failure if the brand layer is ever loaded separately.

**`replace_all: true` for `--bp-error/success/warning` sweep.** Rather than making targeted per-component fixes, all state color primitives were swept globally in components.css. The risk of oversweeping is low because every component-level use of these tokens should go through the semantic layer by design. The grep verification after each sweep confirmed no legitimate primitive uses were disrupted.

**Separate `bp-req` and `bp-tier` counters in print-spec.** The shared counter caused TIER numbering to continue from where REQ left off in a mixed container. These are semantically independent — card blocks and pricing-card blocks are different spec artifact types that should each number from 01. Splitting into two counters with a `counter-reset: bp-req bp-tier` on `.bp-print-spec` fixes this cleanly without any markup requirement.

## Roads Not Taken

**Fixing `.bp-bracket` and `.bp-crosshair` mutual exclusivity structurally.** The reviewer flagged that combining these two classes silently clobbers `::before`/`::after` pseudo-elements with no error. We documented the constraint with a CSS comment but did not enforce it in code (e.g., via a `[class*="bp-bracket"][class*="bp-crosshair"]` warning rule). The comment is sufficient for a maintainer; runtime enforcement would add specificity complexity with no user-facing benefit.
**Do not attempt to enforce mutual exclusivity via CSS selectors — a comment is sufficient for this case.**

**Tokenizing `.bp-alert-icon margin-top: 1px`.** This `1px` nudge on the alert icon is an optical alignment micro-correction, not a brand decision. Left hardcoded.
**Do not tokenize sub-pixel optical nudges — no brand would legitimately vary them.**

**Adding `--color-primary-light` to base.css as a formal token.** The `.bp-text-gradient` fix needed a lighter tint of the primary color. Instead of adding a new semantic token (`--color-primary-light`) to the brand override layer, we used inline `color-mix()`. The inline approach is sufficient for a single use case; a formal token would only be warranted if multiple components needed this lighter tint.
**Do not add --color-primary-light until there are two or more independent consumers.**

**Changing `--bp-transition-fast` and `--bp-transition-base` to use different easing than `--easing-smooth`.** One could argue fast/base transitions should have their own easing (linear or a tighter curve) rather than sharing `--easing-smooth`. The current system has no `--easing-fast` token, and adding one would require defining its value — a design decision that wasn't made this session. Using `--easing-smooth` uniformly is consistent and correct for now.
**Do not introduce --easing-fast without a deliberate design rationale for when it differs from --easing-smooth.**

## Key Discoveries

**Q: Does `animation-duration: auto` after an `animation` shorthand actually override the shorthand's time value?**
A: Yes — a longhand declared after a shorthand in the same rule block wins in source order. The shorthand sets all sub-properties including `animation-duration`; the subsequent longhand overrides just that one sub-property. The `@supports not (animation-timeline: view())` fallback is also doubly protected: (1) the fallback's `animation` shorthand appears after `animation-duration: auto` in source order and resets it back to a time value, and (2) browsers that don't support `animation-timeline: view()` predate CSS Animations Level 2 and treat `auto` as an invalid `<time>` value, silently ignoring it.

**Q: Why did `.bp-chip-danger` render invisibly?**
A: It referenced `--color-danger` and `--color-danger-subtle`, which were never defined in base.css. The semantic layer only defines `--color-error`. The chip was silently producing invalid values for both `color` and `background-color`.

**Q: Why must `--bp-transition-*` be in the brand override `:root`, not the blueprint `:root`?**
A: CSS custom properties are late-binding — they resolve at computed-value time, not at definition time. But the resolution still requires the variable to exist somewhere in scope. If `--duration-fast` is only defined in the brand override `:root` and the blueprint `:root` tries to use it in `--bp-transition-fast`, that works fine in normal usage (both blocks land on `:root`). The issue is semantic and architectural: a `--bp-*` token is supposed to be a self-contained primitive. One that silently depends on a different `:root` block's tokens breaks that contract. Moving it to the same block as its dependencies makes the dependency explicit.

**Q: Does the mask-image SVG need a specific stroke color?**
A: The mask uses the alpha channel, not color. Where the SVG has opaque pixels (the white stroke), the `background-color` of the `::after` shows through. Where the SVG is transparent (background and fill:none areas), `background-color` is hidden. The stroke color in the SVG only needs to be opaque — `white` was used as a convention, but any solid color would produce the same mask.

**Q: Why does `.bp-hover-glow` need a transition on the base state, not the `:hover` state?**
A: CSS transitions fire when a property changes away FROM the base state (entering hover) AND when it changes back (leaving hover). The transition must be declared on the base rule — if it's only on `:hover`, the enter animation works but the leave is instant. `.bp-hover-lift` had this right; `.bp-hover-glow` didn't.

**Q: Why was the REQ/TIER counter bug non-obvious?**
A: Both `.bp-card` and `.bp-pricing-card` incremented `bp-req`. A page with only cards shows REQ-01, REQ-02... correctly. A page with only pricing cards shows TIER-01, TIER-02... correctly. The bug only surfaces in mixed containers, which aren't the common case. The counter value was wrong but the prefix hid it.

## Open Questions & Next Steps

**Nothing explicitly deferred from this session.** All review findings from both passes were fixed and committed. The system is clean as of commit `94af49e`.

**Potential next area: plugin infrastructure bugs (from `TODO.md`).** A background agent surfaced that `plugin.json` is missing `agents`, `commands`, and `skills` arrays — the harness can't load anything. Four agents (`forge`, `review`, `copy`, `scout`) have no corresponding `commands/` file. This was not the focus of this session but is the most urgent non-CSS issue.

**Potential next area: eval timeouts (from `evals.yml`).** The last eval run scored 8/12 with 4 timeouts (60s limit) on blueprint-vocabulary and blueprint-copywriter evals. Raising `per_eval_timeout_seconds` to 120 would resolve these without changing the model or skill behavior.

**`--bp-font-heading` vs `--font-heading` semantic token check.** Not verified this session — worth a grep to confirm no component uses the primitive directly for heading typography. Low priority but consistent with the sweep work done for colors.

## Files Changed

- `assets/core/base.css` — Added spacing, semantic color, motion, opacity, and component dimension tokens; fixed `--bp-shadow-inset` auto-light transposition; moved `--bp-transition-*` to brand override `:root`; fixed `--bp-transition-fast/base` to use `var(--easing-smooth)`. [Constraint: `--font-size-base: 16px` must stay hardcoded — it's the bedrock anchor. `--bp-transition-*` must remain in the brand override `:root`, not the blueprint `:root` — they depend on `--duration-*` and `--easing-*` which only exist there.]

- `assets/core/components.css` — Select chevron replaced with mask-image wrapper; all state color primitives (`--bp-error/success/warning`) replaced with `--color-*` semantic tokens; all `--bp-bg-elevated` replaced with `--color-surface-elevated`; `.bp-text-gradient` endpoint made brand-adaptive; `.bp-btn-destructive` fully wired through semantic layer; avatar/icon sizes tokenized. [Constraint: `.bp-select` markup now requires a `.bp-select-wrapper` parent — components without the wrapper will show no chevron. The wrapper must be `position: relative; display: block`.]

- `assets/core/utilities.css` — `.bp-font-sans` fixed to primitive reference; `.bp-hover-glow` base state gets transition; `.bp-bracket`/`.bp-crosshair` mutual-exclusivity documented in comment. [Constraint: `.bp-bracket` and `.bp-crosshair` cannot be combined on the same element — both claim `::before` and `::after`.]

- `assets/core/print.css` — REQ/TIER counter split; `.bp-print-spec .bp-pricing-card` gets border; `.bp-annotation border-left` gets `!important`; three `border-bottom` declarations in spec blocks got `!important`. [Constraint: All `border-*` declarations inside `@media print` that need to survive page-level `<style>` blocks must carry `!important` — this is not optional but required by the documented print cascade strategy.]

- `assets/core/motion.css` — `animation-duration: auto` added after `animation` shorthand in `.bp-animate-draw` so scroll-driven timeline maps keyframes to scroll progress correctly. [Constraint: The `@supports not (animation-timeline: view())` fallback does NOT inherit `animation-duration: auto` — the fallback's shorthand resets it back to a time value. Do not remove the fallback shorthand.]

---
*Note: This document was written from conversation context. No sections marked [uncertain] — the full session was active in context at write time.*
