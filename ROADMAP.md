# The Point — Roadmap & Feature Spec

Captured from brainstorm session 2026-05-08. All design decisions, rationale, and implementation detail included so any future session can build without reconstructing the reasoning.

---

## Build Stages

| Stage | Features | Tasks |
|---|---|---|
| 1 | Print mode + Grid-aligned skeletons | #1, #4 |
| 2 | bp-animate + draw animations | #3 |
| 3 | Blueprint skills: taste + copywriter | #6, #7 |
| 4 | Blueprint agent | #5 |
| 5 | @layer brand compositing + mood library | #2 |

Stage order rationale:
- Stages 1–2 are pure CSS additions with no dependencies — ship fast, low risk
- Stage 3 produces skill files that Stage 4 loads — skills must exist before the agent
- Stage 5 is last because the mood library becomes something Blueprint can reference when generating brand.css — better to have the agent working first

---

## Stage 1 — Task #1: Print Mode

### What it is
An `@media print` block in `core/` (either appended to `base.css` or a new `core/print.css` imported by `index.css`) that makes pages styled with The Point look like real architectural drawings when printed — not gutted webpages.

### Why
A blueprint is a physical document. The digital version is the unusual case. The Point's mono labels, bracket corners, and annotation blocks are conventions that exist because someone was holding a pen — they should be *more* correct on paper, not stripped away.

### Spec

**Background & grid:**
- White background (`#ffffff`) — always, regardless of theme
- Grid renders in low-opacity gray or navy (not the screen blue)
- Grid opacity must be low — structural presence, not decorative focus
- Suggested: `rgba(10, 22, 40, 0.07)` for grid lines on white

**Navigation & chrome:**
- Strip `bp-nav` entirely (`display: none`)
- Buttons (`bp-btn`) render as plain text — remove background, border, padding
- Interactive elements (modals, overlays, toasts) hidden

**Typography & layout:**
- Preserve all heading hierarchy
- `bp-annotation` blocks float as margin notes using CSS `float: right; width: 30%`
- Page numbers via CSS `counter(page)` injected into `bp-footer` or `::after` on `body`

**Stats (`bp-stat`):**
- Collapse from visual card layout to a compact data table: stat value + label as table rows
- Removes glow shadows and card borders for print

**`bp-print-spec` class (the high-value addition):**
- Applied to any `<section>` to render it as a formal specification document
- Each `bp-card` inside becomes a numbered requirement block (RFC / construction-spec style)
- Counter auto-increments: `REQ-001`, `REQ-002`, etc. via CSS `counter()`
- `bp-card-title` becomes the requirement name
- `bp-card-body` becomes the requirement description
- Use case: a pricing page printed with `bp-print-spec` becomes a formal proposal document ready to hand across a table

### Files to touch
- `core/print.css` (new file)
- `index.css` (add `@import './core/print.css'`)
- `llm.md` (document `bp-print-spec`)
- `README.md` (add print section)

---

## Stage 1 — Task #4: Grid-Aligned Skeletons + Skeleton Deliverables

### What it is
Two parts: skeleton size classes that snap to the 40px blueprint grid, and a documented pattern for using skeleton pages as wireframe deliverables.

### Why
The grid is 40px. Current `bp-skeleton-*` sizes are arbitrary — they don't know the grid exists. Snapping to the grid makes loading states look like empty blueprint forms: reserved spaces, perfectly aligned to the construction grid underneath. Zero layout shift (a direct Core Web Vitals — Google's page ranking measurement — benefit) comes for free when skeleton dimensions match real component dimensions exactly.

### Spec

**Grid-unit skeleton sizes:**
```css
.bp-skeleton-1u { height: 40px; }   /* 1 grid unit */
.bp-skeleton-2u { height: 80px; }   /* 2 grid units */
.bp-skeleton-3u { height: 120px; }  /* 3 grid units */
.bp-skeleton-4u { height: 160px; }  /* 4 grid units */
.bp-skeleton-6u { height: 240px; }  /* 6 grid units */
```

All inherit existing `bp-skeleton` shimmer animation.

**`bp-skeleton-card`:**
- Matches exact `bp-card` outer dimensions: same padding, border, border-radius
- When data loads: skeleton fades out, card fades in — same bounding box, zero layout shift
- This is a direct SEO play — Google penalizes layout shift during load

**Skeleton page deliverables:**
- Documented pattern in `llm.md` and `examples/wireframe.html`
- Design a full page layout using only `bp-skeleton-*` classes
- Export as a standalone HTML file — functions as an interactive wireframe AND the real loading state
- The wireframe IS the production loading state: same file, same classes, same sizes
- Use case: hand a client `wireframe.html` and it reads as a blueprint of the actual site because it literally is one

### Files to touch
- `core/components.css` (add grid-unit skeleton classes + `bp-skeleton-card`)
- `examples/wireframe.html` (new file — full skeleton page example)
- `llm.md` (document skeleton sizes + wireframe pattern)

---

## Stage 2 — Task #3: bp-animate + Grid Draw Animation + Component-Level Draw

### What it is
Three related motion features that wire up the existing `--bp-transition-bounce` token (currently defined but unused — the film crew standing in the parking lot all day) and add the blueprint-as-drafting-in-progress visual metaphor.

### Why
The Point loads like every other webpage: instantly, fully formed. The draw animation changes the experience of arrival. Like the difference between walking into a room where the furniture is already there versus watching an architect sketch the room around you.

### Spec

**`bp-animate` class:**
- Applied to any container
- Switches all child element transitions to `var(--bp-transition-bounce)`
- Opt-in per-section — not global

**Grid draw animation (`data-bp-motion="draw"` on `<html>`):**
- Page starts with no visible grid (opacity 0)
- Horizontal lines fade in left-to-right via `@keyframes` on `background-position`
- Vertical lines fade in top-to-bottom, 200ms staggered after horizontal
- Total animation: ~600ms
- Implementation: ~15 lines of CSS — two `@keyframes`, two `animation` declarations on `body`
- Hard requirement: `@media (prefers-reduced-motion: reduce)` skips to final frame instantly — never penalize users who need it

**Component-level draw animation (`bp-animate-draw` on `bp-card` or any section):**
- Border drawn on using `clip-path` animation on `::before` pseudo-element
- Animates from `inset(0 100% 0 0)` to `inset(0 0% 0 0)` — border draws left to right
- Cards appear to be drafted as user scrolls to them
- Ties directly into the blueprint-as-technical-drawing metaphor

### Files to touch
- `core/components.css` (bp-animate, bp-animate-draw)
- `core/base.css` (grid draw animation on body, triggered by data-bp-motion)
- `llm.md` (document both classes and the data-bp-motion attribute)
- `README.md` (add motion section)

---

## Stage 3 — Task #6: blueprint-taste.md Skill

### What it is
A skill file that loads into Blueprint's system prompt. Not a style guide — a philosophy enforcer. Modeled directly on `rails_taste.md`: named bad patterns, the north star question, industry lookup table, concrete before/after examples.

### Why
LLMs have absorbed so much of the same content that they pattern-match to "what design looks like on the internet in 2023" — the Tailwind UI + Inter Bold + purple gradient aesthetic. It's not bad taste, it's averaged taste. Like asking 10,000 people to vote on a song and playing the median result: technically inoffensive, completely forgettable.

### North star question (fires for every design proposal)
"Would a senior designer at a respected firm choose this, or did an algorithm pick it?"

### Banned patterns list (concrete, named, with examples)

| Pattern | Why it's wrong |
|---|---|
| Black/near-black background + purple/violet primary | The universal AI startup aesthetic — means nothing because it means everything |
| `#6366f1` (Tailwind indigo-500) or `#8b5cf6` (violet-500) as default primary | Chosen because it was in the example, not because it fits |
| Inter Bold at 72px for every hero headline | The font equivalent of shouting in a library |
| Glowing orb / blurred gradient blob as hero graphic | Generated by Midjourney, chosen by nobody |
| Glass morphism cards (blurred semi-transparent panels) | 2022 trend that peaked and died |
| Six identical feature cards in a 3-column grid | Means nobody decided what matters most |
| Uniform spacing throughout | Spacing is communication: tight = related, loose = separate |

### Industry lookup table

| Business type | Correct direction | Wrong default |
|---|---|---|
| Legal / Finance | Dark navy, sharp corners (`--bp-radius-none`), serif heading, high contrast | Purple gradient |
| Food / Hospitality | Warm earth tones, `--bp-radius-xl`, generous whitespace | Dark mode with neon |
| Developer tools | True dark (navy, not `#000000`), monospace elements, functional density | Marketing purple |
| Healthcare | Clean white, trustworthy blue-green, soft rounded | Dark mode anything |
| Creative / Agency | Bold type, intentional asymmetry, fewer + bigger elements | Generic 6-card grid |
| B2B SaaS | Professional but not stuffy, moderate density, clear hierarchy | Glow effects |

### Challenge questions (fire before any CSS is written)
- "What color does this industry actually use?"
- "What font weight does this audience trust?"
- "Is this the safest version of this design, or the most interesting version that still works?"

### File location
`.claude/skills/blueprint-taste.md`

---

## Stage 3 — Task #7: Blueprint Copywriter Skill + Companion Agent

### What it is
A skill file enforcing real copy standards, and a companion agent (`@copy`) that reads the HTML Blueprint generated and replaces placeholder text with real copy written to the brand brief.

### Why
AI copy is recognizable the same way AI design is — not because it's wrong, but because it's averaged. The median of a million SaaS landing pages. The copywriter agent solves the hardest part: turning a product description into words a real person would stop scrolling for.

### Banned phrases list

- "Say goodbye to [X], hello to [Y]"
- "The [adjective] way to [verb] your [noun]"
- Any feature description starting with "Effortlessly"
- Any CTA ending with "today" ("Get started today", "Sign up today")
- Three-word value props: "Simple. Powerful. Yours."
- "Transform your workflow / Elevate your experience / Revolutionize how you X"

### Interview — two branches

Ask first: "Do you have any customers or users yet, even informal ones?"

**Branch A — has customers:**

> "What's the one thing your best customer said that made you realize you were onto something?"

A real quote (even paraphrased) anchors everything. It goes in the brief and the copywriter uses it as the truth anchor for the entire page. One sentence from a real person beats 100 AI-generated value propositions.

**Branch B — no customers yet:**

Run all three questions. The answers replace the customer quote as the truth anchor.

1. "Describe the moment you knew this was a real problem. Not the idea — the moment of frustration."
   - Gets a story, not a pitch
   - "I was manually copying rows between two spreadsheets at midnight before a client meeting" → becomes a headline
   - The founder IS the first customer — their frustration is real signal

2. "What does someone say out loud, right before they'd desperately want your product?"
   - The sentence said in frustration, five minutes before paying
   - "There has to be a better way to do this" → the Problem line in PAS copy

3. "What does the Reddit post look like that your ideal customer writes at 11pm?"
   - Exhausted, unguarded, specific language — Reddit at 11pm is where people stop performing
   - "Is anyone else's agency losing hours to..." → that language goes directly into the headline

**Pre-customer copy goal:** don't close a sale — FIND the first customer. Write specifically enough that the wrong person leaves and the right person stops scrolling. "For freelancers who've lost a client invoice at least once" beats "The easiest way to manage projects" — it filters and makes the right person feel seen.

Applied principle: Mom Test (Rob Fitzpatrick) — don't describe what the product does, describe the problem in the exact words someone uses complaining about it to a friend.

### What the copywriter produces

- 3 headline variants at different angles:
  - Benefit-led: what the user gets
  - Curiosity: the thing they haven't realized yet
  - Direct: what the product literally does
- Subtitle that earns the headline (doesn't restate it)
- CTA text specific enough to be wrong ("Start your free build" not "Get started")
- Feature descriptions: outcome first, not feature ("Your client sees a proposal in 60 seconds" not "Fast proposal generation")
- Reading level and tone calibrated to audience from brand brief

### Copywriting frameworks available
- PAS: Problem → Agitation → Solution (hero sections)
- AIDA: Attention → Interest → Desire → Action (full page flow)
- Jobs to Be Done: what is the user hiring this product to do?

### Integration with Blueprint
- Runs after Blueprint generates HTML structure
- Reads the HTML file, finds placeholder text, replaces with real copy
- Writes directly to the same HTML file Blueprint created
- Invokable standalone as `@copy` for copy-only work on existing pages

### File locations
- `.claude/skills/blueprint-copywriter.md`
- `.claude/agents/copy.md`

---

## Stage 4 — Task #5: Blueprint Agent

### What it is
A Claude Code agent (`.claude/agents/blueprint.md`) that ships inside The Point repo. When a user adds The Point to a project and opens Claude Code, `@blueprint` is available as their design partner. It writes files directly — not paste-able snippets.

### Why
The `llm.md` file was written for this. Right now it's a manual sitting in a toolbox drawer — you have to pick it up, put it in context yourself, and figure out how to use it. Blueprint makes the toolbox hand you the right wrench the moment you describe the job.

### Three entry points

**1. URL to brand (stripe.com, competitor site, Dribbble):**
- Screenshot or scrape the URL, extract visual signature:
  - Dominant color
  - Corner radius feel (sharp / slightly rounded / very rounded)
  - Density (tight information / generous whitespace)
  - Font category (serif / geometric sans / humanist sans / monospace)
- Ask: "This feels [confident / playful / technical]. What does your product do that this site doesn't? What should feel different?"
- Divergence answer shapes the brand — same structural DNA, different personality
- For image URLs (Dribbble): visual extraction only, ask more questions to compensate for missing hierarchy/intent

**2. No URL — interview mode:**
Questions are never technical. Always experiential:
- "Who's making the decision on your site — someone spending $50 or justifying $5,000 to their boss?"
- "Should this feel like a glass office tower or a well-lit independent bookshop?"
- "Fast and precise like a Bloomberg terminal, or warm and considered like Notion?"
- "Does a typo on your homepage cost you a customer?"

Answers map directly to token values:
- "Glass office tower" → `--radius: var(--bp-radius-none)`, serif heading, dark theme, high contrast
- "Neighborhood bookshop" → `--radius: var(--bp-radius-xl)`, warm font, light theme, generous spacing

**3. Existing brand.css:**
- Reads it first, asks "Keep this direction or start fresh?"
- All generated code uses existing brand vars

### Files Blueprint writes to disk
- `brand.css` — generated brand file with comments explaining each choice
  - Example comment: `/* authoritative feel: sharp corners */`
- `index.html` (or user-specified path) — complete HTML using `bp-` classes, linked to both `the-point/index.css` and `brand.css`

### Skill files Blueprint loads
- `llm.md` — already written, already tight, contains all class patterns
- `blueprint-taste.md` — design philosophy enforcer (Stage 3)
- `blueprint-copywriter.md` — copy standards and interview protocol (Stage 3)

### Hard constraints (in system prompt)
- Never invent a `bp-` class that doesn't exist in `llm.md`
- Never write inline CSS for anything a `bp-` class already handles
- Always write files directly — never produce paste-able snippets
- Taste check fires before any CSS is written
- Copy check fires before any placeholder text is written

### The wilder version (implement after core agent works)
- Agent takes a screenshot URL of a competitor or inspiration site
- Extracts layout structure (not colors — structure: hero type, section count, grid variant, nav pattern)
- Asks: "This is [Stripe / Linear / Notion]'s structure. What does your product do differently? What should feel different about yours?"
- Produces a The Point version of that layout: same structure, user's brand, correct `bp-` classes
- Use case: "Give me the Stripe pricing page for my tool" → working HTML in 30 seconds

### File location
`.claude/agents/blueprint.md`

---

## Stage 5 — Task #2: @layer Brand Compositing + Mood Library

### What it is
Restructure the brand override system to use CSS `@layer` — a CSS feature (available in all modern browsers since 2022) that lets you declare style priority in advance, so later-added styles win over earlier ones regardless of selector specificity.

### Why
Right now the brand file is monolithic: one file, full override, the user owns all of it. That's a single light switch for the whole building. `@layer` turns it into a dimmer panel — multiple named layers that compose predictably.

### Layer order
```css
@layer blueprint, brand-base, brand-seasonal, brand-state;
```

- `blueprint` — The Point's internal `--bp-*` tokens (untouched)
- `brand-base` — The primary brand layer (where mood files live)
- `brand-seasonal` — Campaign / seasonal overrides (holiday, launch, event)
- `brand-state` — User's own `brand.css` — always wins, regardless of what else is loaded

### Pre-built mood library (`the-point/moods/`)
Not themes — moods. A mood is a `@layer brand-base` block that gives you 80% of a brand direction for free.

Minimum set to ship:
- `amber.css` — warm, editorial, confident
- `slate.css` — professional, restrained, trustworthy
- `forest.css` — natural, calm, approachable
- `violet.css` — creative, expressive, modern (the controlled version of the AI default)
- `ember.css` — bold, warm, high-energy
- `arctic.css` — clean, precise, cold-functional

Usage:
```html
<link rel="stylesheet" href="the-point/index.css">
<link rel="stylesheet" href="the-point/moods/slate.css">
<link rel="stylesheet" href="./brand.css">
```

User's `brand.css` in `@layer brand-state` always wins — override as much or as little as needed.

### Runtime theme switcher (the wilder version)
Layer names are fixed. Stylesheet URLs are swapped via a `<link>` element swap in JavaScript (~10 lines of vanilla JS, no framework).

```js
document.getElementById('mood-link').href = 'the-point/moods/forest.css'
```

User picks a mood from a settings panel → `brand-base` layer swaps → everything in `brand-state` still wins → zero style conflicts, deterministic output.

Blueprint references the mood library when generating `brand.css` — it can suggest a starting mood based on the interview answers and the user can swap it.

### Files to touch
- `index.css` (add `@layer` declaration)
- `core/base.css` (wrap in `@layer blueprint`)
- `moods/` directory (new — all mood files)
- `brand-template.css` (update to reference `@layer brand-state`)
- `llm.md` (document layer system and mood usage)
- `README.md` (add compositing section)

---

## Bugs Fixed This Session

| Issue | Fix |
|---|---|
| `react/package.json` had `"main": "index.ts"` — TypeScript source file as Node entry point, broken for anything without a build step | Removed `"main"` field, kept `"types": "index.ts"` |
| `pre` and `code` in `base.css` used internal `--bp-*` tokens directly, bypassing the brand override layer | Added `--color-surface-elevated`, `--color-code-bg`, `--color-code-text` to semantic layer; updated `pre` and `code` to use them; documented in `brand-template.css` and `llm.md` |
| No `data-bp-theme="auto"` — forced explicit dark/light, defaulted to dark if attribute missing | Added `@media (prefers-color-scheme: light)` block applying full light palette when `data-bp-theme="auto"` is set |
