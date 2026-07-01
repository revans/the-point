---
project: the-point
date: 2026-07-01
time: 10:46
working_directory: /home/rre/Work/mrgrampz-marketplace/the-point
previous_session: docs/sessions/2026-07-01-0829-css-review-loop-start.md
---

# Session: CSS Review And Tier 2 Components

## Summary

This session picked up the `/loop`-invoked CSS review task that the previous session ended before starting, completed it in full (found zero real issues — the codebase had already converged after 22 prior review passes), then moved on to building tier 2 of the web-app component gap list (tabs, tooltip). Both are committed as `071988d`. Next session picks up tier 3 (dropdown, drawer, pagination, modal JS wiring) — the largest and least-scoped remaining piece of the component list.

## What We Did

1. **Ran the CSS review loop** (`/loop`, dynamic mode) across all 5 core CSS files (`base.css`, `components.css`, `motion.css`, `print.css`, `utilities.css` — confirmed as "the 5" by listing `assets/core/`, since the user's instruction explicitly forbade guessing). Spawned 5 parallel Explore agents, one per file, to find candidate naming inconsistencies and bugs. Got back ~18 candidates.
2. **Validated every candidate** against the actual files (grep for definitions/usages across all 5 files) and, for one ambiguous case, against git history. Result: **all 18 were false positives**. Most came from scanning agents missing the codebase's established two-layer token architecture (`--bp-*` = raw/private blueprint layer, unprefixed `--*` = public semantic alias — e.g. `--font-mono: var(--bp-font-mono)`), which isn't visible from a single file in isolation. One near-miss (`--shadow-glow-error` looked like a broken alias) was resolved by checking `git log`: commit `6699a44` ("Pass 22", 6 hours earlier) deliberately changed it to match `--shadow-glow`'s oklch-computed pattern — confirmed intentional, not drift.
3. **No fixes made, no findings markdown written** — nothing survived validation as an actual issue, and nothing stayed uncertain. This is a genuinely clean pass, consistent with `git log` showing 22 prior review passes already fixed 300+ issues over time (visible via commit messages like "Fix 8 confirmed issues from pass 21").
4. **User asked for an opinion on the components.css split decision** (carried over from before this session started). Recommended deferring — the concern was hypothetical (anticipated LLM-editing friction), not something that had actually manifested; the CSS review itself proved the single 2272-line file is workable (one scanning agent read the whole thing across 47 tool calls with no issues). User agreed to defer.
5. **Built tier 2 web-app components: tabs and tooltip.** Both CSS-only, no JS.
   - **Tabs** (`.bp-tabs`, `.bp-tabs-list`, `.bp-tabs-trigger`, `.bp-tabs-input`, `.bp-tabs-panels`, `.bp-tabs-panel`): hidden radio inputs + `:has()`. Panels are matched to inputs by *position*, not id — `.bp-tabs:has(.bp-tabs-input:nth-of-type(N):checked) .bp-tabs-panels .bp-tabs-panel:nth-of-type(N)`, generated for N=1 through 8. The `.bp-tabs-panels` wrapper is structurally required (see Key Discoveries below).
   - **Tooltip** (`.bp-tooltip`, `.bp-tooltip-bubble`): `:hover`/`:focus-within`, positioned above-center via `position: absolute; bottom: 100%`, with a CSS-only triangle arrow via `::after`. Documented caveat: no automatic viewport-edge flipping (needs JS to measure position at show-time).
   - New base.css tokens: `--tooltip-gap: 6px`, `--tooltip-max-width: 200px`, `--tooltip-arrow-size: 5px`. No new tokens needed for tabs — reused existing `--border-width-strong` for the active-tab underline (same token used elsewhere for similar emphasis borders).
6. **Verified both in-browser** via the established temp-HTML + `python3 -m http.server` + Playwright MCP workflow: tab clicking correctly switched panels (tested 1→2→3), active-tab styling and real keyboard-Tab focus-visible outlines both confirmed, tooltip showed/hid correctly on hover/unhover with correct arrow color and token resolution (cache-busted), and a manual override test (`.bp-tabs-trigger` + inline `style="color:red"`) confirmed normal CSS cascade still works (no `:where()`-style specificity trap here, since neither component uses auto-styling selectors).
7. **Documented both in `llm.md`**, new `## Tabs` and `## Tooltip` sections inserted right after `## Accordion`, matching the existing doc format (HTML usage example + prose notes on caveats/required structure).
8. **Committed everything** as `071988d`: tier 2 CSS/tokens/docs plus two previously-uncommitted session docs from earlier in this session's chain (`2026-07-01-0722-...` and `2026-07-01-0829-...`). Not pushed — user has not asked for a push.

## Why We Did It This Way

- **5 parallel single-file scanners instead of one agent reading all 5 files serially**: each file could be read in full without truncation risk, and running them concurrently meant the whole review finished in the time of the slowest single file rather than the sum of all five.
- **Validating candidates via grep + git log rather than trusting scanner output directly**: the user's explicit instruction was "do not guess, validate." Scanners lack cross-file visibility by design (each only read its assigned file), so their "inconsistency" findings were structurally likely to include false positives from an incomplete view of the token architecture — validating against the full codebase (and git history for intent-ambiguous cases) was the only way to actually satisfy "do not guess."
- **`.bp-tabs-panels` wrapper is required, not optional, for tabs**: `nth-of-type` counts by tag name among siblings under the *same parent*. Without a dedicated wrapper, `.bp-tabs-panel` (a `div`) and `.bp-tabs-list` (also a `div`) would be counted together by `nth-of-type`, shifting every panel index off by one. Wrapping panels in their own container isolates the count to only `.bp-tabs-panel` elements.
- **Deferring the components.css split**: see Roads Not Taken.

## Roads Not Taken

- **Fixing anything from the CSS review**: nothing was fixed because nothing validated as real. This isn't "we chose not to fix it" — it's "there was nothing to fix." **Do not assume any of the 18 scanner-reported candidates are real issues in a future session — they were all checked and invalidated this session; re-raising them without new evidence would be re-litigating a closed question.**
- **Splitting `components.css` into a `components/*.css` source directory + build step**: raised again this session (carried over from the prior session's open thread). User asked directly whether there was "real concern" for it. Recommendation: defer — the motivating concern (LLM editing friction on a large single file) hasn't actually manifested; this session's own CSS review handled the full 2272-line file without issue. **Do not implement the split without a concrete triggering incident (e.g., an Edit call failing on a non-unique string match, or a session visibly struggling to locate a section) — the cost (permanent build-step maintenance in a currently zero-build system) isn't worth paying against a hypothetical.**
- **Starting tier 3 in this session**: user asked to move on to tier 3 immediately after the tier 2 commit, but context hit 89% full at that exact moment. **Do not start tier 3 mid-context-crisis — write the closing doc first (this document), let the next session start tier 3 fresh with full context, rather than risk losing scoping/design reasoning to compaction partway through a complex, under-scoped piece of work.** This is a process choice, not a technical rejection of tier 3 itself.

## Key Discoveries

- **Why did 18 "candidate issues" from the CSS review all turn out to be false positives?** → The codebase uses a two-layer custom-property architecture: `--bp-*` tokens hold raw/private values (per-theme, defined in dark/light blocks), while unprefixed `--*` tokens are the public semantic aliases meant for component use (e.g. `--font-mono: var(--bp-font-mono)`, `--font-size-sm: var(--bp-text-sm)`). A scanner reading only `print.css` or `utilities.css` in isolation can't see this pattern — every "missing `--bp-` prefix" or "undefined token" finding was actually correct, intentional usage once cross-referenced against `base.css`.
- **Is `.bp-rounded` (bare, no suffix) a naming inconsistency next to `.bp-rounded-sm/lg/xl/2xl/full`?** → No. `--radius: var(--radius-md)` — the bare token IS the default/md value, and `.bp-rounded` uses `var(--radius)`. This mirrors Tailwind's own convention (bare `.rounded` = default), not an accidental gap.
- **Is `.bp-normal-case` (text-transform reset) vs `.bp-not-italic` (font-style reset) an inconsistent naming pattern?** → No — this exact pairing (`normal-case` / `not-italic`) is copied directly from Tailwind's own utility class names for these two specific resets, not an invented inconsistency.
- **Why did `--shadow-glow-error` look like a broken semantic alias?** → It used to be `var(--bp-shadow-glow-error)` (a plain alias, matching the pattern the file comment describes) until 6 hours before this session, when commit `6699a44` deliberately changed it to an oklch-computed value to match `--shadow-glow`'s pattern. The file comment ("semantic aliases; use --shadow-* ... not --bp-shadow-*") is now slightly imprecise for this one pair but the code itself is correct and intentional.
- **`nth-of-type` counts by tag name among same-parent siblings, not by class.** This is why the tabs component's panel-matching CSS needs its own wrapper div — confirmed by reasoning through the selector, not by trial and error, but worth restating for the next session since it's an easy trap to reintroduce if the panel markup pattern gets copied elsewhere (e.g. a future component with a similar position-matching need).

## Open Questions & Next Steps

- **Tier 3 is next, entirely unscoped in detail beyond the strategy decision.** Components: dropdown/menu (needs outside-click-to-close), drawer/off-canvas sidebar (needs open/close state + focus trap for accessibility), pagination (mostly a styling contract — "current page" logic is app-specific), modal (CSS already exists — `.bp-modal`/`.bp-overlay` — but has no open/close/backdrop-click/ESC-key wiring yet). Strategy already decided: Stimulus controllers first (Rails-facing), plain JS as a secondary/fallback path for non-Rails consumers. **Not yet decided**: where Stimulus controller source files live in this repo (no existing JS directory structure has been referenced in any session so far) — this needs to be scoped as the first step of tier 3, before writing any controller code.
- **components.css split**: deferred, not decided against permanently. Revisit if a concrete editing-friction incident occurs (see Roads Not Taken).
- **Push status**: three local commits now unpushed to `origin/master`: `22a2141`, `3aa63f1`, `071988d`. User has not asked for a push.

## Files Changed

- `assets/core/base.css` — added `--tooltip-gap: 6px`, `--tooltip-max-width: 200px`, `--tooltip-arrow-size: 5px` (inserted after `--accordion-icon-size`). [No constraint — standalone token additions.]
- `assets/core/components.css` — added `TABS` and `TOOLTIP` sections, inserted between `ACCORDION` and `PRICING CARDS`. **Constraint: the tabs component's panel-matching CSS (`:has(.bp-tabs-input:nth-of-type(N):checked) .bp-tabs-panels .bp-tabs-panel:nth-of-type(N)`) depends on `.bp-tabs-panels` being a dedicated wrapper around only `.bp-tabs-panel` children — removing that wrapper or adding other div children inside it will break the position-matching and silently show the wrong panel.** Verified brace-balanced (355/355) after edit.
- `llm.md` — added `## Tabs` and `## Tooltip` sections after `## Accordion`, matching existing doc format. [No constraint — pure documentation.]
- `docs/sessions/2026-07-01-0722-web-app-components-tier1.md`, `docs/sessions/2026-07-01-0829-css-review-loop-start.md` — committed this session (were untracked from earlier in this session's chain). [No constraint.]
- All changes above committed as `071988d`, not pushed.
- Temp files created and deleted within this session (never committed, per established project norm): `_tmp-tier2-test.html`, `tier2-hover.png` (Playwright screenshot), plus a local Python `http.server` process on port 8743, stopped after verification.

---
*Note: Written at 89% context, per the harness's compaction warning, immediately after committing tier 2 and before starting tier 3 — deliberately, to avoid losing tier-3 scoping mid-task the way the CSS review task nearly was at the start of this session. High confidence throughout; the session had a clean, linear structure (finish CSS review → discuss split → build tier 2 → commit) with no reconstructed-from-memory sections.*
