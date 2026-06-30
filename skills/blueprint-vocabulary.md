# Blueprint Design Vocabulary

## Purpose

You are a **design language translator**. Natural language carries precise visual intent — "surgical," "airy," "weighted," "whisper-quiet" — that maps directly to specific CSS token bundles. This skill intercepts those words before CSS is written and converts them into exact token values.

**When this fires:** After the design interview, after the taste gate, before any CSS is generated. The vocabulary pass is how you turn the synthesis into concrete numbers.

**What it prevents:** The same problem the taste gate prevents — but at the detail level. A designer who says "restrained and precise" and gets `--duration-base: 0.2s` with a bounce curve got the wrong answer. This skill makes sure the tokens match the words.

---

## The Eleven Dimensions

Every design can be described across eleven independent axes. They compose like primary colors — each one is orthogonal to the others, and combining them produces the specific feel.

---

### Dimension 1 — Density

*How much space does content breathe?*

Density is the master spatial dial. It controls `--space-unit`, which cascades to section padding, card padding, and grid gaps throughout the layout.

| Word | `--space-unit` | `--font-size-base` | When it fits |
|---|---|---|---|
| **sparse** | `1.5rem` | `16px` (default — omit) | Gallery sites, luxury goods, single-product brands. Let the product breathe. |
| **airy** | `1.25rem` | `16px` (default — omit) | Editorial, creative agency, brand-forward work. Confident whitespace. |
| **balanced** | `1rem` (default — omit) | `16px` (default — omit) | Default. Most B2B SaaS, professional services. Neither statement. |
| **compact** | `0.825rem` | `15px` | Dashboard-adjacent, power-user tools, anything data-heavy. |
| **dense** | `0.75rem` | `13px` | Bloomberg terminal. Every pixel earns its place. No whitespace as decoration. |

**Grid gap** follows: `--grid-gap` is already wired to `--space-unit` × 6. Setting space-unit sets the rhythm of the whole layout.

**Cascade warning for dense:** Dense also sets `--font-size-base: 13px`, which redefines what `1rem` means across the entire page. Since `--space-unit` is expressed in rems, `0.75rem × 13px = 9.75px` — spacing and type compress together. This double-compression is correct for Bloomberg-style data layouts. But if readable body text matters at dense density (say, a legal document viewer styled as a dashboard), override `--font-size-base` back to `15px` and keep only the `--space-unit` change. The two tokens are independent — dense sets them both by convention, not requirement.

**Conflict resolution:** If the user says "spacious" for a product that's actually data-dense (a Bloomberg-style dashboard, trading tool, or CRM), default to **balanced** — the dashboard density expectation overrules the adjective. Flag the tension: "I read 'spacious' but you're building a dense data product — I'm going with balanced so information stays readable without feeling cramped."

---

### Dimension 2 — Weight

*How heavy does the type feel on the page?*

Weight is about visual presence. A page at the same font size can feel whisper-thin or architecturally solid depending on weight.

| Word | `--font-weight-heading` | `--font-weight-body` | When it fits |
|---|---|---|---|
| **ultralight** | `200` | `300` | Luxury, haute couture, precision instruments. Type almost disappears — the space around it becomes the statement. |
| **light** | `300` | `300` | High-end editorial, architectural firms, restraint as brand identity. |
| **medium** | `500` | `400` | B2B SaaS that wants to feel substantial without shouting. |
| **semibold** | `600` (default — omit) | `400` (default — omit) | Most products. Nothing signals itself. The Point's heading default is 600 — semibold, not regular — which is why unmodified headings already feel substantial without any override. |
| **heavy** | `700` | `500` | News, sports, products where confidence needs to be visible from a distance. |

**Warning zone:** `--font-weight-heading: 700` with Inter is the AI default. If you're setting heavy weight, make sure the font choice earns it — heavy weight on a geometric sans at 72px is the banned pattern. Heavy weight on a condensed serif at 48px is a design decision.

**Weight availability:** Not all fonts ship all weights. `ultralight (200)` requires a font with an explicit Thin cut. Most Google Fonts minimum is 300. CSS falls back silently to the nearest available weight without any error — so `font-weight: 200` on Cormorant Garamond renders as 300 with no indication anything went wrong. Check the font's weight range before specifying 200. When in doubt, use `light (300)` — visually indistinguishable from 200 at heading sizes on most display serifs. For `display-serif` and `editorial-serif`, treat 300 as the practical minimum and use `light` as the vocabulary word rather than `ultralight`.

---

### Dimension 3 — Tracking

*How much air is between letters?*

Tracking is the spacing between characters in a heading. It's one of the clearest signals of whether type was *set* or *defaulted*. Tight tracking on headlines feels editorial. Wide tracking on uppercase labels feels engraved.

| Word | `--letter-spacing-heading` | When it fits |
|---|---|---|
| **tight** | `-0.04em` | Bold display type, editorial headlines, aggressive tech brands. Letters push together. |
| **closed** | `-0.02em` | Standard editorial. Slightly tighter than default, feels considered. |
| **neutral** | `0` (default — omit) | Default. No statement made. |
| **open** | `0.06em` | Light-weight type, brand names where each letter should breathe. |
| **wide** | `0.12em` | Luxury, architectural, heritage brands. Uppercase labels often live here. |
| **very-wide** | `0.2em` | Watch brands. Fragrance. Institutions that have been around long enough to take their time. |

**Combination rule:** Tracking and weight move in opposite directions for the same visual density. Very-wide tracking at light (or ultralight, where the font supports it) reads as "quiet authority." Very-wide tracking at heavy weight reads as "shouting slowly" — almost always wrong.

---

### Dimension 4 — Motion

*How does the site respond to interaction?*

Motion is about the site's personality at the moment of response — does it snap, ease, or perform? The right answer is determined entirely by what the product is.

| Word | `--duration-fast` | `--duration-base` | `--duration-slow` | `--easing-bounce` | When it fits |
|---|---|---|---|---|---|
| **surgical** | `0.05s` | `0.1s` | `0.15s` | `ease` (no bounce) | Terminals, trading platforms, anything where interface response should feel instantaneous and mechanical. The site doesn't animate — it updates. |
| **standard** | `0.15s` (default — omit) | `0.2s` (default — omit) | `0.3s` (default — omit) | (default — omit) | Most products. Responsive without calling attention to itself. |
| **responsive** | `0.12s` | `0.2s` | `0.25s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Consumer apps, productivity tools that feel alive. Small bounce on interactive elements signals "I received that." |
| **theatrical** | `0.2s` | `0.4s` | `0.8s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Brand-forward, creative agencies, portfolio sites. Transitions are part of the experience. |

**When motion should be off entirely:** If the industry is legal, medical, or government AND the design interview produced precision-oriented words like "clinical," "authoritative," "compliance," or "institutional" — set all durations to `0.05s` and remove bounce entirely. Motion at that level reads as the system fidgeting, not performing.

**Bounce vs. easing:** The bounce easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) is a personality statement. It says "this interface is aware of itself." Use it only for **responsive** and **theatrical** — never for surgical or anything precision-weighted.

**Smooth easing — `--easing-smooth`:** A second easing token drives hover states, focus rings, and smooth reveals. **Only write this token when motion = surgical:** set `--easing-smooth: ease`. Without it, surgical's 0.05s–0.1s durations create an asymmetric feel — elements snap in on the fast duration but ease out on a smooth curve, which reads as a browser inconsistency rather than a design decision. For **all other motion words**, do not set `--easing-smooth` at all — the default is already correct and writing it is a no-op.

**HTML motion attribute:** Motion vocabulary also controls whether to add `data-bp-motion="draw"` on the `<html>` element — Blueprint's HTML template uses this attribute to enable entrance animations (elements drawing in on scroll).

- **theatrical**: Always add `data-bp-motion="draw"`. Entrance animations are part of the experience; the slow durations make them land rather than flicker.
- **responsive**: Add it for consumer-facing products. Omit for dashboards and tools where the user is already past the front door.
- **standard**: Omit unless the user specifically asks for entrance animations.
- **surgical**: Never. Surgical motion means the interface updates without performing. An element drawing in on scroll is the opposite of that signal.

---

### Dimension 5 — Shape

*How sharp or rounded are the edges?*

Corner radius is the fastest read of formality. Sharp edges say "structured." Round edges say "friendly." Neither is better — they just say different things.

| Word | `--radius` | When it fits |
|---|---|---|
| **sharp** | `0px` | Legal, finance, industrial, military, infrastructure. Zero radius means zero softening. The work is the statement. |
| **precise** | `var(--bp-radius-sm)` (0.25rem) | Developer tools, enterprise SaaS, technical products. A whisper of rounding — softened without feeling friendly. |
| **balanced** | `var(--bp-radius-md)` (0.375rem, default — omit) | Default. The Point's base feel. Nothing signals. |
| **soft** | `var(--bp-radius-xl)` (0.75rem) | Consumer apps, wellness, education, anything that wants to feel approachable. |
| **pill** | `var(--bp-radius-2xl)` (1rem) | Specific use only — not for cards or sections, only for badges, tags, or CTA buttons where the pill shape is intentional branding. |

**Conflict rule:** Shape must match weight and tracking, or the design feels incoherent. Sharp + light + very-wide = watch brand (coherent). Sharp + heavy + tight = newspaper front page (coherent). Soft + heavy + tight = something is fighting itself.

---

### Dimension 6 — Depth

*How much shadow and layer separation does the UI use?*

Depth is about whether the interface feels flat and surface-level or whether elements lift off the canvas.

| Word | `--shadow-sm` | `--shadow-md` | `--shadow-lg` | When it fits |
|---|---|---|---|
| **flat** | `none` | `none` | `none` | Pure minimalism. Sections are defined by color difference, not shadow. A strong statement that requires confidence in the palette. |
| **subtle** | (default — omit) | (default — omit) | (default — omit) | The Point's base shadows. Present but not assertive. Works for almost everything. |
| **elevated** | `0 1px 3px rgba(0,0,0,0.12)` | `0 4px 16px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.16)` | Light-mode products where cards should clearly float above the background. Consumer apps, e-commerce, anything where hierarchy is built through lift rather than color. |

**Dark mode note:** On dark backgrounds, shadows become nearly invisible. Depth on dark themes is built through surface color step-up (`--color-surface-elevated`), not shadow. If the brand is dark-mode, treat depth = subtle as the ceiling — elevated is functionally the same as subtle on dark.

**Emissive glow — NOT affected by the dark mode rule:** The dark mode rule applies only to *depth-creating* shadows — the kind that simulate a surface lifting off the page (like a card floating 4px above a background). It does NOT apply to *emissive* effects, which simulate light radiating outward: `text-shadow: 0 0 12px rgba(accent, 0.6)` on a headline, or `box-shadow: 0 0 20px rgba(accent, 0.4)` on a button. An emissive glow is a neon tube — it broadcasts light into the dark rather than blocking it. These are fully visible on dark surfaces and appropriate for gaming, entertainment, atmospheric branding, and any context where the accent color should feel like it's lit. Use emissive glow freely in dark-theme contexts; depth shadow on dark is the only restricted pattern.

**Placeholder image legibility on dark — hard rule:** CSS gradient placeholders on dark backgrounds must have enough luminance contrast to read as distinct visual areas. A page background of `#0F0A06` (luminance ≈ 3%) requires placeholder gradients to include at least one stop above roughly 25% luminance (e.g. `#6A6A6A` or lighter) to be visible. "Thematically accurate dark" (stone-grey at `#4a4038`, dark glass at `#2a1e12`) fails this test — the placeholder blends into the page and looks broken, not atmospheric. The rule: if it belongs to a dark category (stone, dark glass, soil, night sky), lead with the lightest version of that category and darken toward the bottom — not the reverse. A stone slot should start at `#9A8E82` (mid-grey) and end at `#3A3028`, not start at `#4a4038`. For product placeholders (bottles, containers), add a visible accent-color label band so the shape reads as "product" immediately — a dark gradient plus a stripe of the brand primary is always readable; a dark gradient alone on a dark background is not.

**System theme note:** The same ceiling applies when theme = **system** — when the user's OS is in dark mode, elevated shadow values become invisible on dark surfaces. If the design may run in a dark OS environment (any consumer-facing or cross-device product), treat depth = subtle as the ceiling for the same reason.

---

### Dimension 7 — Theme

*Does the site live in light or dark?*

Theme is the single highest-contrast decision on the page — every other dimension reads differently depending on it. It's set as an attribute on the `<html>` element, not a CSS variable.

| Word | `data-bp-theme` on `<html>` | When it fits |
|---|---|---|
| **light** | `"light"` | Healthcare, legal, finance, food, editorial, luxury goods. Light backgrounds communicate openness, transparency, and approachability. Most serious B2B defaults here — it says "nothing to hide." |
| **dark** | `"dark"` | Developer tools, security, trading platforms, gaming, night-shift workflows. Dark is not "moodier" — it's functional for low-ambient-light environments and signals "precision tool." |
| **system** | (omit attribute entirely) | Consumer apps that should adapt to the user's OS preference. Good when the user interacts daily and sets up a profile; less appropriate for pure marketing sites. |

**Critical rule:** Light vs. dark is not a preference — it's an industry signal. A law firm that asks for dark mode is asking for "startup," not "law firm." A developer tool on a white background signals "marketing page," not "product." If synthesis is ambiguous, default to **light** — it's the safer wrong answer.

**Interaction with depth:** If theme = **dark**, cap your Depth word at **subtle**. The elevated shadow values are calibrated for light backgrounds; they become invisible on dark surfaces. Depth on dark themes is built through surface color contrast, not box-shadow.

---

### Color Theory Reference

Color choices are signals the audience decodes, often below conscious awareness. Use this reference when resolving the Theme dimension and deriving `--color-primary` and `--color-bg` in Steps 6–7 of synthesis.

**Hue psychology by family**

| Hue family | Signal | Appropriate domains | Inappropriate domains |
|---|---|---|---|
| Blue / teal / cyan | Stable, trustworthy, precise, institutional | Finance, healthcare, B2B SaaS, dev tools, observability | Food (suppresses appetite), children's (reads as cold) |
| Green | Permission, safety, growth, nature | Health/wellness, sustainability, agriculture, fintech growth | — |
| Amber / orange | Warmth, energy, appetite, craft | Food, hospitality, creative tools, education | Finance (signals risk), healthcare (signals caution) |
| Red | Urgency, passion, danger, appetite | Commerce/deals, food, strong consumer brands | Healthcare primary (reads as emergency), luxury |
| Purple / violet | Creativity, luxury, mystery | Premium consumer, AI consumer, creative tools | Conservative B2B, legal, institutional |
| Neutral + single accent | Restraint, expertise, discipline | B2B professional services, legal, luxury, premium editorial | Contexts requiring emotional warmth or brand distinctiveness |

**Specific dark-background tones and their register:**

| Value | Register | Use for |
|---|---|---|
| Pure black `#000000` | Terminal, CRT, hacker | Only when that aesthetic is the explicit brand register |
| Deep navy `#0a1628` | Precision instrument, authority | Dev tools, observability, fintech, B2B SaaS |
| Warm dark `#0a0807` | Premium, intimate, editorial | Luxury, hospitality, spirits |
| Deep purple-black `#0a0612` | Creative, imaginative | AI consumer, premium B2C, creative tools |
| Cream / off-white `#f4f0e4` | Aged, editorial, cultural authority | Newspapers, food editorial, heritage brands |

**Saturation signals:**

| Saturation | Signal | Appropriate | Risk |
|---|---|---|---|
| High (vivid, pure) | Emotional, energetic, B2C, youthful | Consumer products, entertainment, food | Reads as cheap or garish in professional contexts |
| Medium (muted) | Balanced, modern, approachable | SaaS, general consumer, startups | — |
| Low (desaturated) | Restrained, professional, intellectual | B2B, finance, premium, law, enterprise | Reads as lifeless in B2C or children's contexts |

**Domain color reference:**

| Domain | Direction | Why |
|---|---|---|
| B2B SaaS | Blue-teal + dark navy or light neutral | Buyers are risk-averse; blue suppresses arousal and reads as stable |
| Dev tools / observability | Cyan or amber on deep navy | Terminal heritage; precision instrument register |
| Food / hospitality | Amber, terracotta, forest green, deep burgundy | Appetite stimulation; warmth; natural material |
| Luxury consumer | Neutral + single gold or cream accent | Restraint signals premium; excess signals discount |
| Healthcare / wellness | Desaturated green, blue, white | Safety, cleanliness, calm |
| Creative / design tools | Purple, violet, unexpected palettes | Creativity permission |
| Editorial / journalism | Near-black text on cream | Print heritage, cultural authority |
| Finance | Blue, navy, conservative neutrals | Trust, stability, institutional authority |

---

### Dimension 8 — Type Family

*What category of typeface sets the tone?*

Weight (Dimension 2) and tracking (Dimension 3) tell you *how* to configure a font. Type family tells you *which category* to start from. Like a musician choosing a piano vs. a guitar before thinking about how to play it — the instrument constrains what's possible.

| Word | Feel | `--font-heading` | `--font-body` | When it fits |
|---|---|---|---|---|
| **geometric-sans** | Modern, precise, neutral confidence | `'Inter', 'DM Sans', sans-serif` (default — omit) | `'Inter', sans-serif` (default — omit) | Developer tools, SaaS, anything where the interface should disappear and let the content speak. The Point's default personality. |
| **humanist-sans** | Warm, readable, human-made | `'Plus Jakarta Sans', 'Nunito', sans-serif` | `'Plus Jakarta Sans', sans-serif` | Wellness, education, consumer apps. Letters have subtle imperfections that read as approachable — you can feel a hand made these. |
| **editorial-serif** | Authority through age | `'Playfair Display', 'Lora', serif` | `'Lora', 'Georgia', serif` | Legal, consulting, heritage brands. These are fonts with long histories. Using them says "we've been doing this long enough to have a serif." |
| **display-serif** | Dramatic restraint, fashion-forward | `'Cormorant Garamond', 'DM Serif Display', serif` | `'Inter', sans-serif` | Luxury goods, high-end fashion, creative agencies where type is a design element. Pair with geometric-sans body — the contrast between them is the design. |
| **condensed-sans** | Energy, urgency, mass | `'Barlow Condensed', 'Oswald', sans-serif` | `'Barlow', sans-serif` | Sports, news, entertainment. Headers are tall and narrow — a headline can be enormous without spanning the full column width. |
| **mono** | Technical honesty, engineer DNA | `'JetBrains Mono', 'Fira Code', monospace` | `'Inter', sans-serif` | Developer tools and CLIs where showing code is part of the UX. Mono headings signal "built by engineers, for engineers" — use only when that's the intended signal. |

**Mono type family — also set `--font-mono`:** When type family = **mono**, also set `--font-mono: 'JetBrains Mono', 'Fira Code', monospace` in `brand.css`. Without it, headings use JetBrains Mono but `<code>` blocks and inline code fall back to the browser's default monospace — usually Courier New, which looks like a different product entirely. The mono type family should be consistent across all three roles: heading, body override, and code.

**Font loading rule:** If you specify any Google Font above, add the `@import` at the top of `brand.css`, before the `@layer` block:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');
```

**Weight interaction:** Type family and weight are co-dependent — resolve type family first, then finalize weight. `display-serif` + `light (300)` = quiet luxury (display-serif minimum is 300 — ultralight is the intent, light is the implementation). `display-serif` + `heavy` = fashion magazine cover. `geometric-sans` + `ultralight` = precision minimalism. `geometric-sans` + `heavy` = the banned Inter-700 pattern. The family constrains which weights make sense.

**The one forbidden pair:** Heading and body fonts from the same category with the same weight signal. Mix categories between heading and body (display-serif heading + geometric-sans body is contrast). But don't mix two different serifs on the same typographic level — one reads as "I couldn't decide."

**Serif legibility on dark backgrounds:** `editorial-serif` and `display-serif` typefaces are defined by their thin strokes — the hairlines in letters like "i", "W", and "s" that create rhythm on the page. On a dark background, those hairlines render at 1px and disappear at body sizes. Think of it like pencil on white paper vs. pencil on black paper: the thin lines vanish. If theme = **dark** and type family = **editorial-serif** or **display-serif**: either switch to `geometric-sans` or `humanist-sans` for full-page use, or confirm that headings are large enough (≥ 48px) that the thin strokes still read. Display-serif at hero scale (64px+) can survive dark backgrounds; editorial-serif body text cannot.

---

### Typography Pairing Theory

Type Family tells you which category to start from. This section explains why certain combinations work and what they communicate — so pairings are chosen, not assembled.

**The contrast principle.** Good type pairings contrast in role, weight, or historical register. Two geometric sans families at similar weights produce monotony. A display serif paired with a humanist sans works because they serve different cognitive functions: the serif carries emotional weight and personality, the sans carries legibility and neutrality. They are doing different jobs. Matching (two serifs, two sans at similar weight) requires exceptional execution to avoid feeling undifferentiated. Prefer contrast.

**Pairing archetypes:**

| Archetype | Combination | Signal | Best for |
|---|---|---|---|
| Emotional + functional | Display or editorial serif headline + humanist sans body | Authority + warmth + legibility | Editorial, luxury consumer, food/hospitality, content-first brands |
| Precision + data | Geometric sans prose + monospace for code/data/labels | Technical credibility; prose vs. data distinction is semantic, not decorative | Dev tools, observability, fintech, technical SaaS |
| Single family, weight contrast | One display serif, 900 headline + 300 italic accent | High personality, singular voice | Consumer brands with strong opinion, luxury, creative |
| Single family, utility | One geometric sans (Inter, DM Sans), weight variation only | Clean, systematic, interface-first | App shells, dashboards, dense product UI |
| Three-tier editorial | Display serif headline + text serif body + mono labels/kickers | Full print hierarchy: headline / body / metadata | Editorial, journalism, newspaper-format brands |

**Weight contrast as personality dial:**

| Pair | Signal | Use when |
|---|---|---|
| 900 + 300 italic | High dramatic personality, memorable | Consumer brands with strong voice, luxury, editorial with opinion |
| 700 + 400 | Confident, conventional, safe | General purpose, most SaaS, professional services |
| 500 + 400 | Intellectual restraint | Premium B2B, professional services, architecture |
| 300 + 300 | Ultra-light, atmospheric | Luxury with image support, fashion, art — risk: legibility at small sizes |

**Letter-spacing at scale:** Large display type needs tighter tracking than default. At 72px, default letter-spacing creates uncomfortable gaps.

| Size range | Guidance |
|---|---|
| Display (3rem+) | −0.03em to −0.04em |
| Large heading (2rem–3rem) | −0.02em to −0.03em |
| Medium heading (1.5rem–2rem) | −0.01em to −0.02em |
| Small labels / mono | +0.05em to +0.15em (wider aids legibility at small sizes) |

**Single vs. multi-family rule:**
- Single family is correct when: the product is data-dense (variation adds noise), the UI is the product (app shells, dashboards), or the brand voice is precise and unadorned.
- Multi-family is correct when: the brand has editorial personality with distinct content tiers, the page borrows from print traditions, or different content types need semantic distinction (prose vs. data vs. labels).

**Domain pairing reference:**

| Domain | Pairing pattern |
|---|---|
| Editorial / journalism | Display serif + text serif + mono labels |
| Dev tools / observability | Geometric sans prose + mono for data/code |
| Luxury consumer | Single display serif, weight contrast (900 + 300 italic) |
| B2B SaaS | Humanist sans + mono for data labels |
| Food / hospitality | Display or editorial serif + humanist sans |
| Finance | Humanist sans or geometric sans (single, neutral) |
| Healthcare | Humanist sans single — warm, clear, non-threatening |

---

## Dimension 9 — Layout Pattern

How content is arranged in space. The eight dimensions above set token values. Dimension 9 sets the *structural skeleton* — where sections live, how image and text relate, what the page feels like to scroll.

**How to read the table:** Each word maps to a spatial pattern. Pick one word per build. When ambiguous, see the derivation rules below.

| Word | Structural Pattern | Image Role | Section Height |
|---|---|---|---|
| `cinematic` | Full-bleed sections stacked vertically. One visual focus per section. Minimal copy over image. | Image IS the section background | 80–100vh per section |
| `editorial-alternating` | Sections alternate: image-left + text-right, then text-left + image-right. Body copy is long enough to fill the text column. | Tall image column (60–70% width) beside text | 60–80vh per section |
| `journal-sequential` | Full-width image or banner, followed by a centered narrow text block. Repeat. Down the page. | Full-width above the text it introduces | Image: 50–70vh. Text block: auto |
| `document` | Single centered column, max 680px. No image/text layout splits. Images inset within the column. Typography-led. | Inset within column, not beside it | Auto (text-driven) |
| `gallery` | Image grid dominates. Text appears only as captions or a header. Masonry or uniform grid. | Image IS the content | Grid cells: fixed or auto-fit |
| `credential` | One centered focal element (card, form, or statement) per viewport. Everything else suppressed. | Minimal or absent | 100vh per focal element |
| `data-dense` | Multi-column layouts, inline labels, tables, high information per viewport. Images secondary or decorative. | Small, inset, or absent | Short sections, many of them |

### Derivation rules — choose layout from interview signals

Don't ask the user what layout they want. Derive it:

**From Q8 (reference brands):**
- References are luxury fashion, editorial photography, travel magazines → `cinematic` or `editorial-alternating`
- References are tools, SaaS products, documentation → `document` or `data-dense`
- References are restaurants, hotels, hospitality → `journal-sequential` or `editorial-alternating`
- References are art galleries, portfolios → `gallery` or `credential`
- References are landing pages, single-product sites → `credential` or `cinematic`

**From Q2 (who uses this) + Q3 (what it replaces):**
- Audience is browsing, experiencing, wanting to feel something → image-led layouts (`cinematic`, `editorial-alternating`, `journal-sequential`)
- Audience is deciding, comparing, evaluating → text-led layouts (`document`, `data-dense`, `credential`)
- Q3 answer is "nothing — this is new" → `credential` (the whole page IS the pitch)

**From Q1 (physical subject) + density word:**
- Physical subject is a place, food, or physical experience → image-forward (`cinematic`, `editorial-alternating`, `journal-sequential`)
- Physical subject is a process, tool, or system → `document` or `data-dense`
- Density = `compact` → avoid `cinematic` (wastes viewport on a data-dense product)
- Density = `sparse` → avoid `data-dense` (contradicts the whitespace rhythm)

**Default when ambiguous:** `editorial-alternating`. It works across more combinations than any other pattern and avoids the Hero → Section → Footer trap.

### Nav behavior by layout

| Layout | Nav treatment |
|---|---|
| `cinematic` | No nav bar. Brand mark only, centered, near top. |
| `editorial-alternating` | Minimal sticky nav: brand name left, 2–3 text links right. No button in nav. |
| `journal-sequential` | Same as `editorial-alternating`. |
| `document` | Optional fixed sidebar nav (anchor links), or no nav at all. |
| `gallery` | No nav or a single back link. |
| `credential` | No nav. The page IS the credential. |
| `data-dense` | Full nav with dropdowns acceptable. |

### The Hero fallback warning

**The Hero → Section → Footer pattern is not a layout word. It is what happens when no layout decision was made.** If you find yourself writing a `<section class="hero">` followed by three alternating sections and a footer, stop. You have not chosen a layout — you have fallen back to default.

Pick a layout word first. Then build.

---

## Dimension 10 — Image Strategy

How image placeholder sections are rendered. This token applies to ALL image sections in the build — one word, consistent treatment throughout.

| Word | Q1 Signal | What it builds |
|---|---|---|
| `photograph` | Physical noun: place, food, landscape, material, ingredient, animal | Real photo via LoremFlickr URL + gradient overlay for text readability |
| `mockup` | Digital product: app, game, software, tool, interface, platform | CSS-drawn product representation built from brand vocabulary tokens |
| `gradient` | Abstract: service, process, concept, relationship, expertise | CSS gradient from brand palette — no photo, no URL |

### Derivation from Q1

**→ `photograph`** when Q1 contains:
- A named place (mountain, city, building, region, ryokan, distillery)
- A food, drink, or ingredient (mezcal, kaiseki, agave, coffee, bread)
- A physical material (cedar, stone, leather, linen, clay, metal)
- A landscape or natural environment (forest, coast, desert, mountain pass)
- A physical product you hold, wear, eat, or enter

**→ `mockup`** when Q1 contains:
- Software, app, tool, platform, dashboard, or interface
- A video game, digital experience, or virtual environment
- Anything whose primary form lives on a screen

**→ `gradient`** when Q1 describes:
- A service, practice, or methodology (consulting, coaching, legal, financial)
- A process or relationship with no singular visual object
- An abstract concept (innovation, clarity, trust, strategy)

### `photograph` — CSS implementation

**HARD RULE: When image strategy is `photograph`, the base layer of every image section MUST be a real LoremFlickr URL. Building a CSS gradient as the primary image is prohibited. The color research you do on the physical subject informs the overlay gradient only — it goes ON TOP of the photo URL, never instead of it.**

For each image section:

1. Read the section's `aria-label` or intended content
2. Search for the real subject to extract dominant colors (Search Before You Paint)
3. Extract 2–3 specific English keywords — be precise: `ryokan,snow,japan` not `japanese`; `agave,oaxaca,harvest` not `mezcal`; `stagnone,sicily,salt` not `italian`. Apply two keyword filters before committing:
   - **No peak drama:** `kiln,pottery,japan` not `anagama,wood,fire` (fire photographs are red/orange and dominate any section)
   - **Correct perspective:** choose keywords that show WHERE THE BRAND LIVES, not how you get there. A bookshop's brand lives inside (dark shelves, aged spines) — use `bookshop,interior,shelves`, not `bookshop,lisbon,alley` (which returns warm terracotta exterior walls, not books). A ryokan's brand lives in the tatami room — use `ryokan,tatami,interior`, not `ryokan,japan,mountain` (which returns landscape). Ask: where is the brand's physical value experienced? That is the keyword perspective.
4. Assign a seed number per section (1, 2, 3 — same seed = same photo on every load)
5. Build: `https://loremflickr.com/{width}/{height}/{keyword1},{keyword2}?lock={seed}`
6. **Set `background-color` on the section WRAPPER to the most dominant dark tone extracted from your research** — this is the fallback color while the photo loads and bleeds naturally at section edges. It must come from the same research as the keywords, not from `--color-bg`.
7. Set the LoremFlickr URL as the *bottom* layer of `background-image` on the image div — the photo is the base
8. Place a gradient overlay *above* the URL in the `background-image` stack for text readability or mood
9. **Scrim floor rule:** Any section that places text over a photograph must guarantee a minimum contrast ratio. The scrim or gradient must produce an effective dark value of at least `rgba(0,0,0,0.45)` in the area where text sits. Product photography subjects (ceramics, food, objects) are frequently shot against white seamless backgrounds — a 0.16 opacity scrim will not save you. Use `0.45–0.60` as the default and only reduce it if the photo is inherently dark.

```css
/* CORRECT — wrapper has image-derived background-color; image div has URL + overlay */
.section-wrapper {
  position: relative;
  height: 80vh;
  overflow: hidden;
  background-color: #6B5E52; /* dominant tone from ceramics,kiln,japan research — NOT --color-bg */
}

.section-image {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.55) 100%),
    url('https://loremflickr.com/1600/900/stagnone,sicily,salt?lock=1');
  background-size: cover;
  background-position: center;
}

/* WRONG — wrapper has no background-color; photo flickers on a white or wrong-color background */
.section-wrapper {
  position: relative;
  height: 80vh;
  overflow: hidden;
  /* no background-color — inherits from body, never matches the photo */
}
```

**Why this matters:** The section wrapper's `background-color` is visible in three situations: while the photo is loading (0–500ms flash), if the photo fails to load entirely, and at section edges where `background-size: cover` doesn't reach. In all three cases, `--color-bg` (the page background) will clash with the photo's tone. The dominant extracted color from the section's own keyword research will not.

### LoremFlickr seed reliability warning

LoremFlickr returns **real Flickr photos** tagged with your keywords — not generated images. The `lock` seed guarantees you get the same photo every time, but you cannot know in advance what that photo looks like. Two failure modes occur regularly:

| Failure | What happens | Example |
|---|---|---|
| **Wrong-colored frame** | The Flickr photo was uploaded with a colored background, padding, or presentation frame baked into the image file | `clay,pottery,shigaraki?lock=3` returned a photo with solid red padding filling ~70% of the frame |
| **Wrong subject** | LoremFlickr matched a keyword tangentially — a word in the photo's Flickr tags, not its actual content | `azulejo,lisbon,tile?lock=3` returned an art gallery triptych whose tile-grid paintings had been tagged with "tile" |

**Response when a bad seed is discovered:** Change both the seed number AND the keywords — do not just rotate the seed. A different keyword cluster reaches a different pool of Flickr photos. The section wrapper's `background-color` is the correct visual fallback, but a bad image cannot be hidden behind it — `background-size: cover` fills the whole section with the bad image.

**This is a prototype limitation.** Production photography must be curated by a human who has seen the actual images.

### `mockup` — CSS implementation

Build a CSS representation of the actual product using brand vocabulary tokens. Match the product's visual language:

| Product type | What to draw in CSS |
|---|---|
| Game / entertainment | Character card, HUD panel, ability grid, inventory slot |
| SaaS dashboard | Sidebar + content pane, stat cards with fake numbers, data rows |
| Mobile app | Phone frame + screen contents |
| Design / creative tool | Canvas area + toolbar |
| Terminal / CLI | Dark window frame + monospaced fake command output |
| **Observability / tracing** | Trace waterfall + tool call cards + stat strip — see below |

Use `--color-primary`, `--color-bg`, `--color-surface`, radius, and type tokens as the visual material. The mockup should look like it was extracted from the actual product — not a generic wireframe.

#### Observability / tracing — what to draw

Agent observability is structurally different from a generic metrics dashboard. A metrics dashboard shows *quantities* (requests/sec, error rate). An observability trace shows *causality* — why this thing happened after that thing, in this order, taking this long. The signature visual is the **trace waterfall**: nested horizontal bars on a time axis where indentation means "this span is a child of that span."

Draw these three components, in this order, as the primary mockup content:

**1. Stat strip** — one row of 4–5 key numbers across the top of the content area. Each stat is: small mono label above, large number below, colored delta badge (green up / red down). Fake but plausible values: `runs/hr 142`, `p50 latency 1.2s`, `p95 latency 4.1s`, `error rate 0.8%`, `avg cost $0.0041`.

**2. Trace waterfall** — the dominant element. Show one agent run expanded into its spans. Each span is a horizontal bar (`height: 3px–6px`) whose width proportionally represents its duration relative to the total run. Child spans are indented `1.5rem` per nesting level. Color the bars by span type: LLM calls (`--color-primary`), tool calls (amber `#D97706`), errors (red `#EF4444`). To the left, a label column in mono shows the span name; to the right, duration in ms or seconds.

```
agent_run: b4f7a3c2    model: claude-sonnet    2,847ms    $0.0041

llm:invoke         ████████████████████████████████████  2,214ms
  tool:web_search    ████████                             412ms
  tool:read_file     ████████████                         618ms
llm:invoke         ████████                               412ms
  tool:write_file    ████████████                         618ms
```

**3. Tool call detail card** — below the waterfall, one expanded tool call showing: tool name as heading, `input:` block in monospace (fake JSON args), `output:` block in monospace (truncated result), token delta, latency badge.

**Nav sidebar** (left column): Run list — each row is a past run with `run_id` (mono, truncated), status badge (green circle = success, red = error, yellow = running), duration, timestamp. The currently viewed run is highlighted with `--color-primary` left border.

**Structural pitfall — flex compression in height-constrained scroll areas:** The scroll area that contains the waterfall, tool call detail, and any other panels is typically `height: 350px; overflow-y: auto; display: flex; flex-direction: column`. By default, CSS flexbox sets `flex-shrink: 1` on all children, meaning it will compress all panels proportionally to fit the fixed height — squishing a 300px waterfall panel down to ~90px and clipping its content via `overflow: hidden`. The scroll never fires because the container *fits*; the content is just invisible. Fix: set `flex-shrink: 0` on every `.obs-panel`. This tells the flex algorithm "do not compress; let the scroll area overflow naturally."

```css
.obs-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--bp-radius-sm);
  overflow: hidden;
  flex-shrink: 0; /* panels size to content; scroll area scrolls, not compresses */
}
```

**Why this matters:** If you draw "sidebar + stat cards + data table" for an observability product, you get a Mixpanel clone. The trace waterfall is the one visual that makes the product immediately legible as *tracing* — the same way a circuit diagram is immediately legible as electronics, not as a flowchart.

### `gradient` — CSS implementation

CSS gradient using `--color-primary`, `--color-bg`, and `--color-surface`. Apply the Search Before You Paint discipline: even gradients must reference real material research, not invented colors.

---

## Dimension 11 — Compositional Mode

The first ten dimensions control CSS token values — what goes in the variables. Dimension 11 controls how much of each section to deploy — how many elements, how much competition, how bare or full a section should be.

**This is derived from the natural language of the brief, not from a design preference question.** The nouns tell you what the brand is. The adjectives tell you how to compose it.

| Word | Derived from | Hero section | Content sections | What's suppressed |
|---|---|---|---|---|
| `minimal` | "minimalist", "spare", "stripped", "essential", "quiet" | Image only, or image + brand name. Nothing else. | One focal element per section — image OR text, not both competing | Buttons in hero, eyebrow labels, subtitle paragraphs, decorative dividers |
| `editorial` | "editorial", "literary", "magazine", "thoughtful", "considered" | Large image + heading only. No button. | Generous whitespace between elements. Copy earns its space. Captions are typeset. | CTA buttons at hero scale, feature grids, stat blocks |
| `atmospheric` | "atmospheric", "immersive", "cinematic", "moody", "environmental" | Full-bleed image dominates. Text is positioned at edge, small scale. | Image sections are 80vh+. Text is secondary — caption scale, not headline scale. | Feature lists, form elements, heavy copy blocks |
| `expressive` | "bold", "energetic", "vibrant", "loud", "playful", "confident" | Image + full caption stack + button. Permission to layer. | Multiple supporting elements per section are acceptable. Color can be aggressive. | Nothing — this mode lifts restrictions |
| `conversational` | "friendly", "welcoming", "warm", "community", "approachable" | Image + warm greeting text + button is appropriate | Copy-forward. Human voice. Slightly more elements per section are fine. | Cold/clinical layout patterns |
| `functional` | "useful", "efficient", "practical", "tool", "simple", "clear" | Headline + subtitle + CTA. Image is secondary or absent. | Sections organized around tasks or features. Labels and facts over atmosphere. | Large atmospheric image panels, decorative elements |

### Derivation from brief language

**Extract adjectives and the Q5 one-word answer first.** These two sources carry 90% of the compositional signal.

1. Read Q5 (one word) and Q1's adjectives literally — the user chose those words because they are the brand
2. Map to the table above (stop at the first match)
3. Add to the synthesis table: `Compositional mode: minimal`
4. Apply the suppression list for that mode when building every section

**When adjectives conflict with token words:** The adjective wins for composition, the token word wins for CSS values. `warm + minimalist` → warm palette (`#3D2010` range, humanist-sans) from the token words, but minimal section composition (strip to essence) from the adjective. They operate on different axes — one is color and type, the other is how much to put in a section.

**Default when no clear adjective signal:** `conversational` for consumer brands; `functional` for B2B/software.

### The suppression list is not optional

When compositional mode is `minimal`, the hero suppression list is absolute:
- No `<button>` or CTA link inside the hero section
- No eyebrow/label span above the heading
- No subtitle paragraph below the heading
- No caption stack — at most a single line of text (brand name or one-line location)

A minimalist hero with a "Find Us →" button is not minimalist. It is minimalist tokens on a maximalist layout. Like a chef plating six garnishes on a dish they called "simple."

---

## Dimension 12 — Format Reference

*What real-world artifact does this page's structure borrow from?*

The first eleven dimensions control CSS tokens and compositional choices — what things look like and how much of each section to deploy. Dimension 12 controls something deeper: the mental model a visitor uses to navigate the page. Two pages can share identical token bundles and produce completely different experiences because one borrows the structure of a newspaper front page and the other borrows the structure of a SaaS landing page.

**Format Reference is resolved in synthesis Step 2.5 — before choosing a Layout Pattern.** The layout pattern describes the spatial arrangement of image and text. The Format Reference describes what kind of document the whole page behaves like.

---

| Word | What it borrows from | Navigate like | Use when |
|---|---|---|---|
| `web-convention` | Standard hero → features → social proof → pricing → CTA | A typical website | Must be chosen consciously, never by default |
| `print-editorial` | Newspaper or magazine column structure with masthead, kicker labels, pull quotes, bylines, column rules | A newspaper front page or magazine spread | Media, journalism, publishers, content-first brands, any brand claiming cultural authority |
| `product-as-hero` | Product interface replaces hero image entirely | A software demo or trial | Dev tools, B2B SaaS with strong UI, any product whose interface is the argument |
| `split-vertical` | Two equal columns with one purpose per column | A split-panel document | Waitlists, early-access pages, form + preview, dual-audience pages |
| `app-shell` | Sidebar navigation + main content, full viewport | A software application | Product demos, dashboards, productivity tools, docs |
| `terminus` | Single conversion surface, one goal, no scrollable sections | A poster or a landing card | Focused early-access campaigns with prior audience awareness |
| `spec-sheet` | Data-dense, tabular, reference-first | A technical specification | Developer landing pages, hardware products, infrastructure comparison |
| `broadcast-terminal` | Live stream, ticker, or log aesthetic | A monitoring dashboard | Observability, real-time data, monitoring tools |

---

### Format Reference selection rules

**Rule 1 — Conscious default only.**
`web-convention` is not what you pick when nothing else fits. It is what you pick when you have consciously asked "what format serves this audience?" and the answer is genuinely: a conventional website. If you haven't asked the question, you haven't made a decision.

**Rule 2 — Domain-fit validation.**
Before committing, validate:
1. Does this audience have familiarity with and affinity for this format?
2. Does the navigation model of this format match how this audience makes decisions in this domain?
3. Can the conversion action fit naturally within this format?

If any answer is no, the format creates friction instead of resonance. A CRT terminal aesthetic for a children's app fails question 1 and 2. A split-vertical waitlist for a professional services firm fails question 3 (a partner doesn't put their contact in a split form).

**Rule 3 — Page-wide application.**
The Format Reference is not a style applied to the hero and dropped at the back half. It applies to every section, especially the conversion section. A premium botanical brand's wholesale inquiry section does not look like a Webflow contact form — it looks like a letter. Wherever the page's format is maintained through 80% of its length but collapses at the conversion section, the Format Reference was not actually used — it was approximated and then abandoned.

**Rule 4 — Record in synthesis table.**
Add: `Format Reference: [word]` to the synthesis table before proceeding to Step 5 (Layout Pattern). The layout pattern and the Format Reference are separate: a `print-editorial` format can use either a `document` or `editorial-alternating` layout pattern, depending on what sections exist.

---

### Format Reference × domain reference

| Domain | Starting Format Reference | Why |
|---|---|---|
| Developer tools | `product-as-hero` or `broadcast-terminal` | Engineers evaluate by seeing the interface, not by reading marketing claims |
| Editorial / media brand | `print-editorial` | The format signals cultural authority that fits the domain |
| Waitlist / early access | `split-vertical` or `terminus` | Simple, focused; the audience came to sign up, not to browse |
| Premium consumer | `web-convention` with strong Format Reference constraint on conversion section | The experience builds; friction at checkout is a feature |
| SaaS with weak UI | `web-convention` | If the interface is not yet the argument, don't expose it — use conventional structure instead |
| Observability / monitoring | `broadcast-terminal` or `product-as-hero` | The live data IS the product; simulating it in the hero is the argument |

---

## Composition Rules

Words from different dimensions combine into a complete token bundle. These rules prevent incoherent combinations.

### The Coherence Test

Before committing to a combination, read it aloud as a single design sentence:

- "A sparse, light, very-wide-tracked, surgical, sharp, flat, light-theme, display-serif design" — luxury watch, jeweler, high-end fragrance. Every word agrees: quiet, precise, earned.
- "A dense, heavy, tight-tracked, standard, soft, subtle, dark-theme, condensed-sans design" — entertainment platform, news app, sports product. All eight push the same direction: loud, fast, bold. (Depth = subtle, not elevated — on dark backgrounds, shadow values are invisible; depth comes from surface color contrast instead, which is still present.)
- "A sparse, heavy, very-wide-tracked, theatrical, soft, elevated, dark-theme, display-serif design" — **incoherent** across four axes simultaneously. Sparse + heavy = luxury shouting. Very-wide tracking + theatrical motion = a Rolex ad doing cartwheels. Dark + elevated = shadow values calibrated for light surfaces, invisible on dark. Dark-theme + display-serif at anything under 64px = the hairline strokes that define the font become invisible. Every word is fighting the word next to it.

### Conflict Pairs

These combinations produce incoherence. When detected, default to the word that matches the industry signal, and name the conflict:

| Conflict | Resolution |
|---|---|
| `ultralight` + `dense` | Dense products need readable weight. Lift to `light` minimum. |
| `theatrical` + `sharp` | Sharp + theatrical feels aggressive rather than expressive. Use `surgical` or `responsive` instead, or lift radius to `precise`. |
| `very-wide` + `dense` | Very-wide tracking expands headings. In a dense layout this creates awkward headline wrapping. Cap tracking at `open` for compact/dense densities. |
| `flat` + `balanced` (no strong primary) | Without shadows and without a strong palette, the design disappears. Either use `subtle` depth or commit to a high-contrast primary. |
| `heavy` + `sparse` (without editorial intent) | Lots of space + heavy type reads as a mistake unless it's clearly editorial. Ask whether "airy" was the intent for a product, or if they mean "airy editorial." |
| `dark` + `editorial-serif` or `display-serif` | Thin strokes disappear below 48px on dark backgrounds. Switch body to `geometric-sans` or `humanist-sans`. Display-serif headings at ≥ 64px can survive; editorial-serif body text cannot. |
| `dark` + `elevated` | Shadow values are calibrated for light surfaces and become invisible on dark backgrounds. Cap depth at `subtle` when theme = dark. Depth on dark is built through `--color-surface` step-up, not box-shadow. |

---

## Reading Natural Language to Vocabulary Words

Users don't say "I want compact density and surgical motion." They say "clinical," "authoritative," "whisper-quiet," "punchy," or "like a Bloomberg terminal."

This is the translation layer.

### Industry / feel phrases → vocabulary word bundles

| What they say | Density | Weight | Tracking | Motion | Shape | Depth | Theme | Type |
|---|---|---|---|---|---|---|---|---|
| "luxury watch / jeweler" | sparse | light | very-wide | surgical | sharp | flat | light | display-serif |
| "medical / clinical" | balanced | light | neutral | surgical | precise | subtle | light | humanist-sans |
| "Bloomberg terminal / trading" | dense | medium | tight | surgical | sharp | flat | dark | geometric-sans |
| "creative agency / portfolio" | airy | light | open | theatrical | soft | elevated | light | display-serif |
| "indie game studio" | compact | heavy | tight | responsive | soft | subtle | dark | condensed-sans |
| "law firm / legal" | balanced | medium | closed | surgical | sharp | subtle | light | editorial-serif |
| "Japanese artisan craft" | sparse | light | wide | surgical | balanced | flat | light | display-serif |
| "startup landing / marketing page" | compact | medium | neutral | responsive | soft | elevated | light | geometric-sans |
| "startup product / app dashboard" | compact | medium | neutral | responsive | soft | subtle | dark | geometric-sans |
| "enterprise SaaS / B2B dashboard" | compact | semibold | neutral | standard | precise | subtle | light | geometric-sans |
| "editorial / longform magazine" | airy | light | tight | standard | balanced | flat | light | editorial-serif |
| "wellness / yoga / meditation" | sparse | light | open | responsive | soft | subtle | light | humanist-sans |
| "hardware / industrial" | balanced | medium | tight | surgical | sharp | flat | light | geometric-sans |
| "financial services / wealth mgmt" | balanced | medium | closed | surgical | sharp | subtle | light | editorial-serif |
| "news / media platform" | dense | heavy | tight | standard | balanced | elevated | light | condensed-sans |

These are starting points, not rules. The interview answers override the lookup table when signals diverge.

---

## Integration: How to Use This Skill

### Step 1 — Read the synthesis output

After the design interview synthesis, identify the 3–5 strongest descriptor words the user used or that your synthesis produced. These are your input.

### Step 2 — Map each word to a dimension

Translate each descriptor into the vocabulary dimension it belongs to. "Airy" → Density. "Whisper-quiet" → Motion. "Sharp" → Shape. One descriptor often resolves two or three dimensions at once (e.g., "Bloomberg terminal" → all eight).

If a dimension isn't resolved by any word, leave it at its default — don't invent.

### Step 3 — Check for conflict pairs

Run the resolved bundle against the conflict pairs above. If a conflict exists, name it and resolve it toward the industry signal from the taste gate.

### Step 4 — Write the token bundle as a comment block before the CSS

Before writing `brand.css`, write this internal comment block so the reasoning is explicit:

```
/* Vocabulary resolution:
   Density:     airy          → --space-unit: 1.25rem
   Weight:      light         → --font-weight-heading: 300, --font-weight-body: 300
   Tracking:    very-wide     → --letter-spacing-heading: 0.2em
   Motion:      surgical      → --duration-fast: 0.05s, --duration-base: 0.1s, --duration-slow: 0.15s, --easing-bounce: ease, --easing-smooth: ease
   Motion attr: surgical      → no data-bp-motion attribute on <html>
   Shape:       sharp         → --radius: 0px
   Depth:       flat          → --shadow-sm/md/lg: none
   Theme:       light         → data-bp-theme="light" on <html>
   Type family: display-serif → --font-heading: 'Cormorant Garamond', serif; --font-body: 'Inter', sans-serif (default — omit)
   Format Ref:  print-editorial → structure borrows from newspaper front page; applies to every section including conversion
   Tone:        precise       → @copy: measured, credible, specific — no casual language or superlatives
*/
```

Then write the `brand.css` from that resolved bundle. Every value has a reason. No defaults were kept by accident.

**Deriving the Tone line:** The Tone value pre-seeds the `@copy` agent so it doesn't need to re-derive audience from scratch. Map the bundle to the closest tone:

| Bundle signal | Tone value | Copywriter behavior |
|---|---|---|
| surgical + sharp/precise + professional industry | `precise` | Measured, credible, specific. No casual language, humor, or superlatives. |
| surgical/standard + developer or technical industry | `technical` | Precise, no-nonsense, show the thing. No marketing language or vague benefits. |
| responsive + humanist-sans + consumer audience | `warm` | Conversational, energetic, peer-to-peer. No dense copy or technical specifics. |
| standard + SMB or freelance audience | `direct` | Direct, warm, peer-to-peer. No corporate formality or jargon. |
| any + healthcare or legal industry | `careful` | Trustworthy, factual. No bold claims, casual tone, or humor. |
| theatrical + creative or agency industry | `expressive` | Voice-forward, distinction over clarity. The brand personality is the copy strategy. **Only when brand personality IS the product** (creative agency, portfolio site, design studio). Theatrical motion alone does not produce expressive tone — a luxury hotel or editorial magazine can use theatrical transitions and still write warm or precise copy. If the audience is choosing an *experience* rather than a *collaborator*, use the industry row to select tone instead. |

If the bundle maps to two tones (a healthcare-adjacent fintech product: `precise` + `careful`), use the more conservative one and note the blend.

**Passing Tone to the copywriter — this is not automatic:** The `Tone:` line in the brand.css comment block is documentation for any human reading the file. It is not a data pipe. The `@copy` agent reads the HTML file Blueprint generates, not `brand.css` — it will never see the comment block unless Blueprint explicitly carries the Tone value forward. In the `@copy` handoff message, Blueprint must state the tone directly:

> `@copy — Tone: warm. Product brief: [brief]. HTML at: [path].`

For `expressive` tone, also include the voice descriptor that emerged from the design interview — the single sentence the client said (or the closest synthesis of it) that sounds nothing like a competitor:

> `@copy — Tone: expressive — voice: [1-sentence brand personality]. Product brief: [brief]. HTML at: [path].`

The voice descriptor seeds every line the copywriter writes: it's the register the copy is written *in*, not a tagline to be reproduced. If the design interview didn't surface a sentence specific enough to serve this role, send the tone without a descriptor — `Tone: expressive` alone — and let Branch C of the copywriter's interview extract it.

If Blueprint omits the tone from the handoff entirely, the copywriter re-derives audience from scratch using its own interview, which may produce a different answer. The vocabulary and copywriter skills are only bridged if Blueprint passes the baton explicitly.

### Step 5 — Include vocabulary tokens in brand.css only where they diverge from The Point defaults

Don't write a value you didn't choose. If motion is **standard** (the default), omit the duration tokens entirely — the defaults are already correct.

---

## Examples

### Example 1 — Luxury watch brand

**Phrase:** "We make heritage mechanical watches. Swiss workshop, founded 1948. The website should feel like the watch."

**Interview synthesis:** Sparse + editorial, heritage signals, high-stakes purchase, research lab feel, precision typography

**Vocabulary resolution:**

| Dimension | Word | Tokens |
|---|---|---|
| Density | sparse | `--space-unit: 1.5rem` |
| Weight | light (display-serif min) | `--font-weight-heading: 300`, `--font-weight-body: 300` — `ultralight` is the intent; Cormorant Garamond minimum is 300 |
| Tracking | very-wide | `--letter-spacing-heading: 0.2em` |
| Motion | surgical | `--duration-fast: 0.05s`, `--duration-base: 0.1s`, `--duration-slow: 0.15s`, `--easing-bounce: ease`, `--easing-smooth: ease` |
| Shape | sharp | `--radius: 0px` |
| Depth | flat | `--shadow-sm: none`, `--shadow-md: none`, `--shadow-lg: none` |
| Theme | light | `data-bp-theme="light"` on `<html>` |
| Type family | display-serif | `--font-heading: 'Cormorant Garamond', serif`, `--font-body: 'Inter', sans-serif` (default — omit) |
| Motion attr | surgical | no `data-bp-motion` attribute |
| Tone | precise | `@copy`: measured, credible — no casual language, no superlatives |

**What this produces:** A site that does not move unless you interact with it. Type so thin it almost disappears. Headings that expand to fill a line with generous letter air. No softening anywhere. Nothing decorated. Copy that never says "elevate" or "transform" — it says exactly what the watch does, in sentences short enough to be engraved. The restraint is consistent from the CSS to the words.

---

### Example 2 — Consumer fintech app

**Phrase:** "Personal finance app. Makes budgeting feel simple and encouraging. Not scary like banking."

**Interview synthesis:** Consumer, emotional decision, bookshop feel, Airbnb density

**Vocabulary resolution:**

| Dimension | Word | Tokens |
|---|---|---|
| Density | balanced | `--space-unit: 1rem` (default) |
| Weight | medium | `--font-weight-heading: 500` |
| Tracking | neutral | (default — no change) |
| Motion | responsive | `--duration-fast: 0.12s`, `--duration-base: 0.2s`, `--duration-slow: 0.25s` (keeps default bounce easing) |
| Shape | soft | `--radius: var(--bp-radius-xl)` |
| Depth | elevated | `--shadow-sm: 0 1px 3px rgba(0,0,0,0.12)`, `--shadow-md: 0 4px 16px rgba(0,0,0,0.12)`, `--shadow-lg: 0 8px 32px rgba(0,0,0,0.16)` |
| Theme | light | `data-bp-theme="light"` on `<html>` |
| Type family | humanist-sans | `--font-heading: 'Plus Jakarta Sans', sans-serif`, `--font-body: 'Plus Jakarta Sans', sans-serif` |
| Motion attr | responsive (consumer) | `data-bp-motion="draw"` on `<html>` |
| Tone | warm | `@copy`: conversational, energetic — no dense copy or technical language |

**What this produces:** Cards that lift off the screen just enough to feel separate. Rounded everything, which reads "approachable." A small bounce on interactions that signals "I heard you." Entrance animations that draw in softly — not a performance, just a breath. Medium-weight headings in Plus Jakarta Sans — present, not aggressive, the font has a warmth Inter doesn't. Copy that says "You sent the wrong amount once. We made sure that's the last time" not "Streamline your financial workflow."

---

### Example 3 — Independent developer tool

**Phrase:** "CLI tool with a web dashboard. Power users. They hate decorative UI."

**Interview synthesis:** Developer tools, high density, Bloomberg feel, rational B2B decision

**Vocabulary resolution:**

| Dimension | Word | Tokens |
|---|---|---|
| Density | compact | `--space-unit: 0.825rem`, `--font-size-base: 15px` |
| Weight | medium | `--font-weight-heading: 500` |
| Tracking | closed | `--letter-spacing-heading: -0.02em` |
| Motion | surgical | `--duration-fast: 0.05s`, `--duration-base: 0.1s`, `--duration-slow: 0.15s`, `--easing-bounce: ease`, `--easing-smooth: ease` |
| Shape | precise | `--radius: var(--bp-radius-sm)` |
| Depth | subtle | (default) |
| Theme | dark | `data-bp-theme="dark"` on `<html>` |
| Type family | geometric-sans | (default — omit from brand.css entirely) |
| Motion attr | surgical | no `data-bp-motion` attribute |
| Tone | technical | `@copy`: precise, no-nonsense — show the thing, no marketing language |

**What this produces:** Information-dense without feeling broken. Headings slightly compressed so they stay on one line at smaller sizes. No animation calling attention to itself. Dark background signals "product, not marketing." Just a tiny suggestion of radius so it doesn't feel like a 2003 admin panel. Geometric-sans and dark are both defaults, so no font or theme tokens are written. Copy that says "Run `deploy --watch` and your pipeline stays green" not "Effortlessly streamline your deployment workflow."

---

### Example 4 — Motion design studio (expressive)

**Phrase:** "Motion design studio. Brand films, title sequences, opening sequences for documentaries. The site should feel like our work — alive, intentional, nothing decorative."

**Interview synthesis:** Theatrical + brand-forward, voice as distinguisher, display-serif as design element, light theme (portfolio sites are browsed in offices and pitch decks; dark would signal product), agency audience choosing a collaborator, not escaping a problem

**Vocabulary resolution:**

| Dimension | Word | Tokens |
|---|---|---|
| Density | airy | `--space-unit: 1.25rem` |
| Weight | light | `--font-weight-heading: 300`, `--font-weight-body: 300` |
| Tracking | open | `--letter-spacing-heading: 0.06em` |
| Motion | theatrical | `--duration-fast: 0.2s`, `--duration-base: 0.4s`, `--duration-slow: 0.8s`, `--easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Shape | soft | `--radius: var(--bp-radius-xl)` |
| Depth | elevated | `--shadow-sm: 0 1px 3px rgba(0,0,0,0.12)`, `--shadow-md: 0 4px 16px rgba(0,0,0,0.12)`, `--shadow-lg: 0 8px 32px rgba(0,0,0,0.16)` |
| Theme | light | `data-bp-theme="light"` on `<html>` |
| Type family | display-serif | `--font-heading: 'Cormorant Garamond', serif` (+ @import); `--font-body: 'Inter', sans-serif` (default — omit) |
| Motion attr | theatrical | `data-bp-motion="draw"` on `<html>` |
| Tone | expressive | `@copy — Tone: expressive — voice: "We give things a reason to move." Product brief: [brief]. HTML at: [path].` |

**Conflict check:** airy + elevated + light theme → no conflict (dark + elevated is the banned pair; light + elevated is correct). theatrical + soft → no conflict (theatrical + sharp is banned; soft radius is compatible). display-serif + light theme → no conflict (dark + display-serif is banned; light theme + display-serif is the intended pattern). All eight dimensions cohere.

**What this produces:** Entrance animations that draw in slowly enough to be *felt*, not just noticed — 0.8s on major reveals means every element takes its time arriving, which is the argument the studio is making about itself. Headings in Cormorant Garamond at 300 weight with 0.06em open tracking: light, spaced, engraved-feeling. Cards lift with enough shadow to feel substantial without looking like a SaaS dashboard. Copy that says "We give things a reason to move" — not "we create compelling motion experiences." The slowness and the restraint are the same message: this studio doesn't hurry, and neither does anything it touches. The expressive handoff passes the voice sentence directly so the copywriter writes every line *in* that register rather than around it.

---

## Learned Rules

Rules in this section were written by the @review agent from real build failures. Each rule passed the vocabulary-worthiness test: generalizable beyond one build, not already documented above, actionable by a future @blueprint agent before code is written.

**@blueprint: read this section before resolving any dimension.** If a rule here applies to your current product type, image strategy, or layout pattern, apply it proactively. You should not rediscover something a previous build already got wrong.

**@review: append to this section only** when a finding passes all three criteria: generalizable, not already documented, actionable. At most one or two rules per build. Use the format below exactly.

```
### [YYYY-MM-DD] {short rule name}
**Context:** {product type, image strategy, layout, or dimension where this rule applies}
**Rule:** {the generalizable rule — specific enough to apply proactively}
**Evidence:** {the HTML filename where this was discovered}
```

<!-- @review appends learned rules below this line -->

### [2026-05-10] dark + display-serif: only the hero mark survives; switch all sub-section headings to geometric-sans
**Context:** dark theme + display-serif type family, builds with multi-scale heading hierarchy (hero mark + section titles + metadata headings)
**Rule:** In a dark + display-serif build, only the top-level hero brand name reliably reaches ≥ 48px at normal viewport widths. Section titles, allocation headings, price numerals, close wordmarks, and any sub-display heading will have a maximum rendered size well below 48px — even with generous clamp values at compact density (15px base). Do not use `var(--font-heading)` (display-serif) on any element whose maximum size is below 3.2rem (48px ÷ 15px base). Use `var(--font-body)` (geometric-sans) with the same weight and tracking tokens for all sub-section heading elements. The display-serif's job in a dark build is the MARK only; the contrast between the display-serif hero and geometric-sans section headings is part of the design.
**Evidence:** tierra-profunda.html — five elements (`.tp-expression-heading`, `.tp-section-title`, `.tp-allocation-title`, `.tp-price-number`, `.tp-close-wordmark`) used Cormorant Garamond at max sizes of 15px–37.5px on a dark background.

### [2026-05-10] bp-hero-full has no built-in scrim — photograph builds must add one manually
**Context:** image strategy = photograph, any build using the `bp-hero-full` component with text in `bp-hero-full-caption`
**Rule:** The `bp-hero-full` component provides `bp-hero-full-bg` (full-bleed photo) and `bp-hero-full-caption` (text anchored bottom-left) but does NOT include a scrim or gradient overlay. Any text placed in `bp-hero-full-caption` sits directly over the raw photograph. To satisfy the scrim floor rule (rgba(0,0,0,0.45) minimum in the text area), always add a manual gradient overlay div between the `<img class="bp-hero-full-bg">` and the `<div class="bp-hero-full-caption">`: `<div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%); z-index: 1;"></div>`. The `bp-section-cover` pattern includes `bp-section-cover-overlay` which handles this automatically — `bp-hero-full` does not.
**Evidence:** vatnajokull.html — hero section used `bp-hero-full` with text caption over photo and no scrim overlay, producing an effective scrim opacity of 0.00.

### [2026-05-10] weight: light requires both --font-weight-heading AND --font-weight-body
**Context:** any build where Weight word = `light` (or `ultralight`)
**Rule:** The vocabulary table for Weight specifies that `light` sets BOTH `--font-weight-heading: 300` and `--font-weight-body: 300`. Builds consistently write only `--font-weight-heading: 300` and omit `--font-weight-body`. The omission is invisible in the comment block (which documents the intent) but leaves body text at the system default of 400 — heavier than the light word requires, producing a weight mismatch between headings and body. Always write both tokens together when Weight = `light`: `--font-weight-heading: 300; --font-weight-body: 300;`. Same applies to `ultralight` (`200`/`300`) — both tokens, not just heading.
**Evidence:** kakurega.html — comment block stated "body: 300" but `:root` block only had `--font-weight-heading: 300`; `--font-weight-body` was absent.

### [2026-05-10] journal-sequential hero image must stay within the 50–70vh spec ceiling
**Context:** layout pattern = `journal-sequential`, builds that use a hero modifier to make the opening image larger than the chapter repeat images
**Rule:** The vocabulary spec for `journal-sequential` sets an explicit image height range of 50–70vh for ALL image sections — including the opening hero image. A hero modifier (e.g., `.kakurega-chapter-image--hero { height: 80vh }`) overrules this by 10vh. Cap any hero variant at 70vh for journal-sequential builds. If a larger opening image is needed (e.g., a stronger cinematic opening), consider using `cinematic` layout instead of `journal-sequential` — the two patterns should not be blended.
**Evidence:** kakurega.html — `.kakurega-chapter-image--hero` set `height: 80vh`, exceeding the 70vh maximum for journal-sequential by 10vh.
