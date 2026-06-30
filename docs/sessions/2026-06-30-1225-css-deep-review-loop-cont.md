---
project: the-point
date: 2026-06-30
time: 12:25
working_directory: /home/rre/Work/mrgrampz-marketplace/the-point
previous_session: 2026-06-30-1102-css-deep-review-loop.md
---

# Session: CSS Deep Review Loop Cont

## Summary

Continued the CSS review loop from pass 6 through pass 10 (pass 11 currently running at session close). The loop is converging — pass 10 returned 12 confirmed issues, down from 21 in pass 1. The main remaining sources of issues are naming inconsistencies in the duration token scale (two renames from pass 9 were themselves suboptimal), missing entries in the semantic space alias scale, and a handful of structural gaps (badge/chip API inconsistency, missing print state color overrides, `.bp-animate` not suppressed in prefers-reduced-motion).

## What We Did

### Pass 6 — continued from previous session
Picks up where previous session doc left off. Pass 5 note in prior doc says "running pass 6 now." No separate commit documented here — see git log for specifics.

### Pass 7 (commit after pass 6)
13 confirmed fixes — approaching steady state. Issues were fine-grained: semantic token gaps, minor cascade inconsistencies.

### Pass 8 (commit ~85b698b area)
14 confirmed. Pass 8 introduced the first **breakpoint regression**: `.bp-hide-mobile` was changed from `max-width: 768px` to `max-width: 767px`, creating a real dead zone at exactly 768px (iPad portrait width). Manually reverted to 768px before committing.

**Constraint established:** The gap between `.bp-hide-mobile` (max-width: 768px) and `.bp-hide-desktop` (min-width: 769px) is sub-pixel and not practically real — no device is 768.5px wide. Do not change `.bp-hide-mobile` to `max-width: 767px` to "close" the gap — that creates a real dead zone.

### Pass 9 (commit b061945)
17 confirmed fixes. The `--bp-font-*` namespace rename was the major event:
- Renamed `--bp-font-light/normal/medium/semibold/bold` (integers, font-weight scale) to `--bp-weight-*` (separating them from `--bp-font-sans/mono` which are strings)
- **Critical straggler:** 34 uses of `var(--bp-font-*)` in components.css were not swept by the workflow — font weights would have silently unset across every component. Manually swept to `var(--font-weight-*)` semantic aliases before committing.
- Duration renames: `--duration-mid` → `--duration-base-plus`, `--duration-relaxed` → `--duration-slowish` (both later flagged as still-poor names in pass 10)
- State color subtle variants: now compute via `oklch(from var(--color-success/warning/error) l c h / 0.12)` instead of pointing to rgba-hardcoded primitives
- Print grid color: changed from `rgba(10,22,40,…)` to `oklch(from var(--color-bg) l c h / opacity)` in base.css; print :root override restores dark-on-white values explicitly
- Semantic space aliases `--space-1..20` added; utilities.css swept from `--bp-space-*` to `--space-*`
- Breakpoint fixed properly: `max-width: 767.98px` / `min-width: 768px` — 768px now unambiguously desktop, no dead zone

### Pass 10 (commit pending, pass 11 running)
12 confirmed, 10 false positives. Found:
1. Semantic space alias scale missing `--space-24`, `--space-32`, `--space-40`
2. `--duration-base-plus` still violates single-word naming convention
3. `.bp-btn-ghost:active` uses hardcoded `opacity: 0.8` instead of token
4. `.bp-chip` base class missing `border-color: var(--color-primary)` (every variant sets it explicitly but base doesn't)
5. `.bp-badge` / `.bp-chip` API inconsistency: badge requires `.bp-badge-default` modifier for primary treatment, chip bakes primary into base class
6. `.bp-input-compose-action` hover/active use hardcoded `scale(1.08)` and `scale(0.95)` instead of motion tokens
7. `.bp-hover-lift` + `.bp-hover-glow` cascade collision: both set `box-shadow`, source order makes glow silently overwrite lift when both applied
8. `margin-bottom` and `padding-bottom` in `.bp-print-spec` missing `!important`, inconsistent with surrounding strategy
9. Print `:root` override block missing state color overrides: `--color-error/success/warning` and variants print in saturated brand colors
10. Specificity comment in print.css has incorrect values (pseudo-elements omitted from calculation)
11. `.bp-animate` bounce-curve overrides not suppressed inside `prefers-reduced-motion`
12. `--duration-slowish` is informal/ambiguous alongside `--duration-slow` and `--duration-slower`

Pass 10 diff was NOT committed — pass 11 (currently running) will fix these.

## Why We Did It This Way

**Manual straggler sweeps every pass.** The workflow's biggest consistent blind spot is cross-file rename propagation — it renames the definition but misses consumers. The `--bp-font-*` case in pass 9 was the most dangerous: 34 silent failures that would have shipped broken. The pattern is now a known failure mode, not a surprise.

**`max-width: 767.98px` instead of `768px`** in the breakpoint fix (pass 9). The `.98` makes 768px unambiguously a desktop breakpoint — `max-width: 767.98px` catches only strictly-less-than-768px widths. The alternative (`max-width: 768px` + `min-width: 769px`) leaves a 1px theoretical gap; `767.98px` + `768px` is clean.

**Duration scale renames: two passes, two attempts.** The original names (`--duration-mid`, `--duration-relaxed`) were flagged as ordinal/descriptive outliers. Pass 9 renamed them to `--duration-base-plus` (compound) and `--duration-slowish` (informal) — both wrong in different ways. Pass 10 flagged these again. The loop is slowly converging on the right names. Target for pass 11: single-word, speed-adjacent, not comparative.

**10 false positives in pass 10** is a sign of convergence — the validators are now catching more plausible-but-wrong findings. The 12 confirmed issues are real but increasingly micro-scale.

## Roads Not Taken

**Removing `--duration-base-plus` and `--duration-slowish` from the scale entirely** instead of renaming them again. These values (0.25s and 0.40s) are used by `.bp-animate` and motion variants. Removing them would require reassigning those uses to adjacent tokens (0.20s base or 0.30s slow), which would change visual timing. The tokens exist because there's a genuine need for those timing points. Do not remove — rename.

**Aligning `.bp-badge-default` by adding a `.bp-chip-primary` modifier** instead of baking primary into `.bp-badge` base. Adding `.bp-chip-primary` as an explicit modifier would make the API explicit on both sides, but `.bp-chip` already bakes primary into base and this is documented design intent (chips are primary by default). The cleaner fix is aligning badge to chip's pattern, not the reverse.

**Using CSS `min()` / `clamp()` to unify the `bp-hover-lift + bp-hover-glow` cascade** instead of a compound selector. A composed `box-shadow` value via CSS min/clamp is not directly applicable here — the conflict is two separate utility classes each setting `box-shadow`. The compound selector (`.bp-hover-lift.bp-hover-glow:hover { box-shadow: var(--shadow-md), var(--shadow-glow); }`) is the correct CSS approach. **Do not try to resolve this via a single-class solution — the compound selector is intentional.**

## Key Discoveries

**Q: Why does `--color-print-grid` need an explicit override in the print `:root` block after the pass 9 refactor?**
A: In base.css, the token now reads `oklch(from var(--color-bg) l c h / 0.06)`. In the print context, `--color-bg` is overridden to `#ffffff`. So the computed value would be `oklch(from #ffffff l c h / 0.06)` — essentially 6% white on white paper, invisible. The print `:root` override explicitly sets `--color-print-grid: rgba(10, 22, 40, 0.03)` (dark navy at 3% on white), which is the correct dark-on-white grid line value.

**Q: What does the 10 false positives in pass 10 tell us?**
A: The validators are working correctly — they're catching the review agents over-indexing on consistency without confirming the actual value of the token that "should" exist. For example, a finding like "this hover uses a hardcoded color instead of `--color-primary-hover`" gets rejected if the hardcode matches the token exactly and introducing the var would add no flexibility.

**Q: Why does `.bp-animate` need to suppress bounce overrides in `prefers-reduced-motion`?**
A: `.bp-animate` overrides all four `--bp-transition-*` tokens to use `var(--easing-bounce)` instead of `var(--easing-smooth)`. The global `prefers-reduced-motion` block in motion.css sets all transitions to `none`, which cancels the animation. But the `--bp-transition-*` custom property values are inherited — they survive on the element even when `transition: none` is set. If an interaction re-enables transitions (some components do this), the bounce curve persists. The fix is to reset the `--bp-transition-*` overrides inside `prefers-reduced-motion`.

## Open Questions & Next Steps

**Pass 11 is currently running.** Expected to fix the 12 issues from pass 10. Manual steps after the diff:
- Check if duration tokens were renamed to clean single-word names (workflow may pick its own names — verify they fit the convention)
- Check for straggler references to `--duration-base-plus` and `--duration-slowish` after rename
- Confirm badge/chip alignment fix doesn't break existing HTML that uses `.bp-badge` without `.bp-badge-default`
- Check cascade comment specificity fix in print.css

**The loop terminates when a pass returns zero confirmed findings.** At current trajectory (12 → ?) pass 11 may be the last or second-to-last pass.

**`docs/uncertain-findings.md`** was never written this session — zero uncertain findings across all passes. Everything was decidable by reading base.css for token definitions.

**Session doc update:** The previous session doc (`2026-06-30-1102-css-deep-review-loop.md`) was written before passes 6-10. It should be treated as passes 1-5 context only. This document covers passes 6-10.

## Files Changed

- `assets/core/base.css` — Continued semantic layer expansion: `--space-1..20` aliases, `--bp-weight-*` primitives (renamed from `--bp-font-*` for weight values), state color subtle variants now via oklch computation, duration tokens renamed (mid→base-plus, relaxed→slowish — both still pending better names), print grid color via oklch. [Constraint: `--font-size-base: 16px` must stay hardcoded. `--bp-transition-*` must stay in brand override `:root`. `@page { @bottom-right { color: #4a7a9b } }` must stay hardcoded — Chrome/Edge cannot resolve custom properties in @page margin boxes.]

- `assets/core/components.css` — `--bp-font-*` weight token references (34 occurrences) swept to `--font-weight-*` semantic aliases. `.bp-text-gradient` gets `color: transparent` for Firefox. `.bp-input-compose-action:focus-visible` added. `.bp-btn-secondary:active` and `.bp-btn-ghost:active` added. Hero subtitle reverted to `var(--bp-text-xl)` for file-wide consistency. [Constraint: `.bp-select` requires `.bp-select-wrapper` parent. `.bp-animate-draw` sets `border-color: transparent`.]

- `assets/core/utilities.css` — All spacing utilities (gap, padding, margin) swept from `--bp-space-*` to `--space-*` semantic aliases. `-webkit-user-select` added to `.bp-clickable`. Breakpoints: `max-width: 767.98px` / `min-width: 768px`. [Constraint: Do NOT change `.bp-hide-mobile` back to `max-width: 767px` — that creates a dead zone at exactly 768px (iPad portrait width). The `.98` suffix is intentional.]

- `assets/core/print.css` — `--color-print-grid/bold` added to print `:root` override block. `--print-gap-xs/sm/md` now have `!important`. [Constraint: `@page { @bottom-right { color: #4a7a9b } }` hardcode must stay — update in sync with `--color-text-muted` in the print `:root` block on line 72.]

- `assets/core/motion.css` — Duration token references updated for renames. Sweep gradient uses `oklch(from var(--color-primary) l c h / 0)` instead of `transparent`. `.bp-animate --bp-transition-bounce` now uses `--duration-long` for consistent step-up. [Constraint: `border-color: transparent` on `.bp-animate-draw` is intentional — the gradient IS the border. Use `outline` if a visible CSS border is needed alongside the draw animation.]

---
*Note: Written during active loop at context 83%. Pass 11 running at time of writing. Confirmed issue list for pass 10 is verbatim from workflow result; post-commit verification not yet complete.*
