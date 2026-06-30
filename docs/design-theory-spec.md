# Design Theory Spec
## Implementation guide for adding color theory, typography theory, copywriting psychology, and Format Reference to The Point agentic design system

---

## What this spec covers

The Point currently has vocabulary (names for design choices), a taste gate (banned patterns), and scout (domain convention research). What it lacks is theory — the encoded *why* behind design decisions. An agent with vocabulary but no theory can identify that a fintech brand uses blue because the examples it found use blue. An agent with theory knows that blue suppresses arousal and reads as stable to a risk-averse B2B buyer, and can make principled tradeoffs when the brief is unusual.

This spec adds four theory layers and one new structural dimension:

1. **Color Theory** — why palettes work for specific domains and audiences
2. **Typography Pairing Theory** — why certain combinations create personality and hierarchy
3. **Copywriting Psychology** — how copy creates belief and moves action for specific audiences
4. **Format Reference (Dimension 12)** — what real-world artifact a page's structure borrows from
5. **Three new synthesis rules** — Format Reference selection, visual proof requirement, CTA format consistency

**Target files for changes:**
- `skills/blueprint-vocabulary.md` — add Color Theory, Typography Theory, Dimension 12
- `agents/blueprint.md` — add synthesis Steps 2.5, 7, 8
- `agents/copy.md` — add Copywriting Psychology principles section
- `skills/blueprint-taste.md` — add structural departure requirement and CTA collapse ban

---

## Part 1 — Color Theory

### Add to `skills/blueprint-vocabulary.md` after the existing Dimension 5 (Theme)

---

### Color Theory Reference

Color choices are not aesthetic preferences — they are signals that audiences decode, often below conscious awareness. The same hue reads differently depending on saturation, value, and domain context. An agent making color decisions must understand the mechanism, not just the convention.

---

#### 1.1 Hue psychology by family

**Blue / Teal / Cyan family**
Suppresses arousal. Reads as stable, precise, trustworthy, institutional. In low-saturation forms, it signals professional restraint. In high-saturation cyan forms, it signals technical precision (terminal heritage, developer tools).
- Appropriate domains: finance, healthcare, B2B SaaS, developer tools, observability, productivity
- Inappropriate domains: food (suppresses appetite), children's products (reads as cold), entertainment (reads as boring)
- Specific note: deep navy (e.g., #0a1628) reads as precision instrument. Pure blue reads as corporate standard. Cyan (#22d3ee) reads as data/terminal. Choose with intent.

**Green family**
Signals permission, safety, growth, nature, health. High saturation reads as energetic and young. Low saturation reads as calm and trustworthy.
- Appropriate domains: health/wellness, sustainability, agriculture, financial growth products, children's education (high saturation)
- Note: #00ff41 on black is terminal/hacker culture, not health. Same hue family, completely different register at that value/saturation.

**Amber / Orange family**
Stimulates appetite. Creates warmth. Signals energy, creativity, urgency, earthiness.
- Appropriate domains: food, hospitality, craft products, creative tools, education (warm/accessible register)
- As a secondary accent: works across many domains to add warmth to an otherwise cool palette
- Inappropriate as primary: finance (signals risk), healthcare (signals caution/warning)

**Red family**
High arousal. Urgency, passion, danger, appetite. Commands attention but depletes trust over time if overused.
- Appropriate as primary: deals/commerce, food (appetite), strong consumer brand with confidence
- More appropriate as accent: error states, alerts, urgency highlights within otherwise restrained palette
- Not appropriate: healthcare primary (reads as emergency), luxury (reads as aggressive)

**Purple / Violet family**
Creativity, luxury, mystery, imagination. Deep purple reads as premium. Bright purple reads as creative/playful.
- Appropriate domains: premium consumer, creative tools, AI products (current cultural association), spiritual/wellness
- Deep purple (#0a0612 background with #a855f7 primary): premium, imaginative, intimate — waitlist.html
- Bright purple: more playful, appropriate for creative B2C

**Neutrals + single accent**
Restraint signals expertise. Letting one color do all the work signals confidence. Noise in the palette signals lack of discipline.
- Appropriate domains: B2B professional services, legal, luxury, premium editorial
- Rule: when uncertain, reduce palette to one accent color and let the rest be near-black/near-white/mid-gray. It is almost never wrong.

---

#### 1.2 Saturation signals

| Saturation level | Signal | Appropriate domains |
|-----------------|--------|---------------------|
| High (vivid, pure) | Emotional, energetic, B2C, youthful, accessible | Consumer products, entertainment, children's, food |
| Medium (muted but present) | Balanced, modern, approachable | SaaS, general consumer, startups |
| Low (desaturated, sophisticated) | Restrained, professional, intellectual | B2B, finance, premium, law, enterprise |

Risk of high saturation in wrong domain: reads as cheap, garish, or unserious. A luxury spirits brand at full saturation amber reads like a supermarket product.

Risk of low saturation in wrong domain: reads as lifeless, cold, or untrustworthy. A children's learning app in desaturated tones reads as clinical.

---

#### 1.3 Value (background darkness) signals

| Background | Signal | Appropriate for |
|-----------|--------|-----------------|
| Pure black (#000) | Terminal, hacker, high-drama, CRT aesthetic | Retro tech brands, gaming, explicit "dark mode as identity" |
| Deep navy (#0a1628 range) | Precision instrument, authority without harshness | Dev tools, observability, fintech, B2B SaaS |
| Warm dark (#0a0807 range) | Premium, intimate, editorial depth | Luxury, hospitality, spirits, editorial |
| Deep purple-black (#0a0612 range) | Creative, imaginative, premium consumer | Creative tools, AI consumer, premium B2C |
| Dark gray (#0d1117 range) | Modern professional, GitHub-style authority | Developer tools, professional SaaS |
| Cream / off-white (#f4f0e4 range) | Aged, editorial, cultural authority, warmth | Newspapers, book publishers, food editorial, heritage brands |
| Pure white (#ffffff) | Clean, accessible, clinical, modern | Healthcare, consumer SaaS, children's, accessibility-first |
| Light blue-gray (#f0f7ff range) | Airy, modern, SaaS standard | B2C SaaS, productivity, general purpose |

**Rule:** Never use pure black (#000000) unless the terminal/CRT/hacker aesthetic is the explicit brand register. Deep navy or warm dark achieves darkness with more control over register.

---

#### 1.4 Domain color reference table

| Domain | Primary palette direction | Reasoning |
|--------|--------------------------|-----------|
| B2B SaaS | Blue-teal + dark navy or light neutral | Buyers are risk-averse; blue suppresses arousal and signals stability |
| Dev tools / observability | Cyan or amber on deep navy | Terminal heritage; precision instrument register; engineers trust it |
| Food / hospitality | Amber, terracotta, forest green, deep burgundy | Appetite stimulation; warmth; natural material associations |
| Luxury consumer | Neutral + single gold or cream accent, or monochrome | Restraint signals premium; excess signals discount |
| Healthcare / wellness | Desaturated green, blue, white | Safety, cleanliness, calm; high saturation reads as emergency |
| Creative / design tools | Purple, violet, unexpected palettes | Creativity permission; expressive latitude |
| Editorial / journalism | Near-black text on cream or off-white | Print heritage, cultural authority, reading comfort |
| Children's education | High saturation, warm palette, multiple colors | Energy, play, approachability, non-threatening |
| Finance / fintech | Blue, navy, conservative neutrals | Trust, stability, institutional authority |
| Entertainment / events | Bold, high contrast, dark backgrounds | Energy, presence, excitement |
| Spirits / premium food | Dark background, single warm accent, serif type | Category convention; conveys craft and seriousness |
| Architecture / luxury real estate | Light neutral or cream, restrained palette | Prints cleanly; signals understated confidence |

---

## Part 2 — Typography Pairing Theory

### Add to `skills/blueprint-vocabulary.md` after Dimension 8 (Type Family), replacing or extending the existing dimension entry

---

### Typography Pairing Theory

The Type Family dimension names a choice. This section explains why certain combinations work and what they signal. An agent that can only name a font can produce technically correct type but not psychologically resonant type.

---

#### 2.1 The contrast principle

Good type pairings contrast in role, weight, or historical register. They do not match. Two geometric sans families at similar weights flatten hierarchy and create monotony. A display serif paired with a humanist sans works because they serve different cognitive functions: the serif carries emotional weight and personality, the sans carries legibility and neutrality. They are doing different jobs.

**Contrast can be achieved through:**
- Family register (serif vs. sans-serif)
- Weight (900 display vs. 400 body)
- Historical register (classical serif vs. modern sans)
- Semantic function (humanist prose font vs. monospace data font)

Matching (two serifs, two sans of similar weight) requires exceptional execution to avoid feeling undifferentiated. Prefer contrast.

---

#### 2.2 Pairing archetypes

**Archetype 1: Display serif + humanist sans**
Emotional headline + functional body. The serif carries personality and historical register. The sans carries legibility and contemporary clarity. The combination reads as authoritative but not cold, editorial but not academic.
- Best for: editorial brands, luxury consumer, content-first brands, food/hospitality
- Example pairs: Playfair Display + Lora · Fraunces + Inter · Cormorant + Source Sans · DM Serif Display + DM Sans
- Weight contrast recommendation: serif at 700–900 for headlines, sans at 400 for body

**Archetype 2: Geometric sans + monospace**
Precision + data distinction. Geometric sans is neutral and systematic. Monospace is the semantic language of machines, code, and data. The combination creates a clear visual hierarchy between prose and technical content.
- Best for: dev tools, observability, fintech, SaaS with technical audiences
- Example pairs: Inter + JetBrains Mono · Space Grotesk + JetBrains Mono · Söhne + Fira Code
- Rule: monospace should appear only for data, labels, timestamps, code — never for prose. This semantic discipline is what makes the pairing work.

**Archetype 3: Single display serif with internal weight contrast**
High weight contrast within one family creates personality without requiring a second family. This is appropriate when the brand voice is strong and singular — a second family would dilute it.
- Best for: branded landing pages, luxury, creative consumer brands with a strong voice
- Example: Fraunces 900 for headlines, Fraunces 300 italic for accents — the contrast within the family is enough
- Rule: requires at least a 3:1 weight ratio to create meaningful contrast. 700 + 400 within a family is safer but lower personality.

**Archetype 4: Single geometric sans (weight variation only)**
Clean, modern, system-like. Used when the product is data-dense and typographic variety would create visual noise. The interface itself carries the design — the type should not compete.
- Best for: app shells, dashboards, complex product UIs, developer tools where mono is used for data
- Example families: Inter, DM Sans, Plus Jakarta Sans, IBM Plex Sans
- Rule: reserve for UI-density contexts. On a marketing/landing page, single-family sans reads as generic unless compensated by exceptional layout.

**Archetype 5: Three-tier editorial (display + text + mono labels)**
Newspaper and magazine register. Three distinct families, each with a specific tier: display for headlines, text serif for body, mono for kickers/labels/dates/bylines. This is visually complex and requires discipline — each family must have a single, consistent role.
- Best for: editorial, journalism, publishers, content-heavy landing pages with news register
- Example: Playfair Display (headlines) + Source Serif 4 (body) + JetBrains Mono (kickers/labels)
- Rule: never mix roles. If mono appears in a headline, the tier system collapses.

---

#### 2.3 Weight contrast as personality dial

Weight contrast is the most underused typographic tool. The same type family can range from forgettable to distinctive based solely on weight pairing.

| Weight pair | Signal | Appropriate for |
|------------|--------|-----------------|
| 900 + 300 italic | High dramatic personality, strong brand voice, memorable | Consumer brands with opinion, creative, editorial, luxury |
| 700 + 400 | Confident, conventional, safe | General purpose, most SaaS, professional services |
| 500 + 400 | Intellectual restraint, premium B2B | Professional services, premium B2B, architecture, law |
| 300 + 300 | Ultra-light, atmospheric, luxury | Luxury with excellent image support, fashion, art |

**Rule:** 900 + 300 italic is the Fraunces move. It works because the extreme contrast within a family creates rhythm — the page feels like it has breath. It does not work for every brand (inappropriate for conservative B2B, healthcare, legal). Only use when the brand register is confident and the domain allows expressive latitude.

---

#### 2.4 Letter-spacing at scale

Large display type (3rem+) needs tighter letter-spacing than body type. At 72px, default letter-spacing creates uncomfortable gaps between letterforms. The general rule: the larger the type, the tighter the tracking.

| Size range | Letter-spacing guidance |
|-----------|------------------------|
| Display (clamp 3rem+) | -0.03em to -0.04em |
| Large heading (2rem–3rem) | -0.02em to -0.03em |
| Medium heading (1.5rem–2rem) | -0.01em to -0.02em |
| Body text | 0em to 0.01em |
| Small labels / mono | 0.05em to 0.15em (often wider to aid legibility) |

---

#### 2.5 When to use single vs. multi-family

**Single family is correct when:**
- The product is data-dense (type variety adds noise)
- The UI is the product (app shells, dashboards)
- The brand voice is precise and unadorned
- The design is compensating through layout, not typography

**Multi-family is correct when:**
- The brand has editorial personality with distinct content tiers
- The page borrows from print traditions (editorial, luxury)
- Different content types need semantic distinction (prose vs. data vs. labels)
- The brand voice requires emotional range that one family cannot carry

---

#### 2.6 Domain typography reference

| Domain | Pairing pattern | Rationale |
|--------|----------------|-----------|
| Editorial / journalism | Display serif + text serif + mono labels | Three-tier print hierarchy: headline / body / metadata |
| Dev tools / observability | Geometric sans + mono | UI prose / data-code distinction is semantic, not decorative |
| Luxury consumer | Single display serif, weight contrast | One voice, high personality, restraint signals premium |
| B2B SaaS | Humanist sans + mono | Approachable + technical credibility |
| Food / hospitality | Display serif + humanist sans | Warmth and personality (serif) + contemporary legibility (sans) |
| Finance | Humanist sans or geometric sans | Neutral, trustworthy, unflashy |
| Healthcare | Humanist sans (single) | Warm, clear, accessible, non-threatening |
| Entertainment | Display/expressive sans or serif, high weight | Presence, energy, boldness |

---

## Part 3 — Copywriting Psychology

### Add to `agents/copy.md` as a new section before the Branch A / Branch B structure

---

### Copy Psychology Principles

Copy is not the words that describe the product. Copy is the mechanism that moves a specific person from uncertainty to action. These principles must be applied before any copy is written, not after.

---

#### 3.1 Specificity over adjectives

The reader cannot evaluate an adjective. They can evaluate a number, a material, a timeframe, a named place, or a named person. Specificity is the primary trust mechanism.

| Weak (adjective) | Strong (specific) |
|-----------------|------------------|
| "Fast" | "Under 100ms query time" |
| "Premium ingredients" | "Hand-harvested from Iceland's Vatnajökull region, one batch per year" |
| "Trusted by thousands" | "Used by engineering teams at Vercel, PlanetScale, and Fly.io" |
| "Powerful tools" | "Search across 10 billion events in under 100ms" |
| "Thoughtfully crafted" | "Each extract begins with a walk" |

**Rule:** every adjective in a first draft is a flag. Replace it with the specific fact that would have made you choose that adjective.

---

#### 3.2 Outcome first, feature second

The reader is not interested in what was built. They are interested in what they get. Every feature statement must be translatable to an outcome statement from the reader's perspective.

- "We built a real-time log indexing system" → "Find the one request that caused the outage"
- "We use cold-pressed extraction" → "The bitterness holds its shape in a long drink"
- "AI reads your full manuscript" → "No context amnesia. It knows what happened in chapter 3 when you're writing chapter 17."

**Rule:** write the feature, then ask "so what?" twice. The answer to the second "so what?" is the outcome.

---

#### 3.3 Audience-specific persuasion modes

Different audiences use different decision-making mechanisms. Copy written for the wrong mechanism fails regardless of quality.

**B2B decision-makers**
Driven by: risk reduction, peer validation, specific proof
- Name customers by company (not just count)
- Lead with the problem they're already experiencing, not the solution
- Give them something to show their manager (specific metric, customer name, pricing that makes sense)
- Friction in the process (demo call, form) signals seriousness — instant signup can undermine B2B credibility

**Developer / technical buyers**
Driven by: honest technical claims, respecting their ability to evaluate
- Never oversell; developers detect and dismiss marketing language
- Show the interface, the code, or the query before the headline
- State limitations honestly — this builds more trust than hiding them
- Make the adoption path obviously low-risk (free tier, open source, no credit card)

**B2C consumers**
Driven by: aspiration, identity, emotional resonance
- "People like me use this" is the primary trust mechanism
- Lead with the feeling or identity, not the feature
- Make the decision feel safe (social proof, return policy, reviews)
- Complexity is the enemy — one clear next action

**Luxury / premium buyers**
Driven by: exclusivity, craft evidence, deliberate friction
- "Request a quote" or "Send an inquiry" signals exclusivity — instant purchase can undermine positioning
- Specificity of material, origin, and process signals craft
- Never mention price in the hero — position the value first, then earn the right to name a number
- The page should feel like a private conversation, not a retail experience

**Professional buyers (chefs, bar directors, architects, engineers)**
Driven by: peer-level credibility, specific functional claims
- Talk as an expert to an expert — don't explain what they already know
- Functional specificity beats aesthetic language: "The bitterness holds its shape in a long drink or broth reduction" is peer-level. "Adds a sophisticated Nordic note" is marketing.
- Their time is the constraint — every word must earn its place

---

#### 3.4 Present-tense tension over artificial urgency

Countdown timers, "limited time" badges, and "only 3 left" tactics are artificial urgency — they signal desperation and undermine trust with sophisticated buyers. Find the real temporal stakes in the situation and state them plainly.

"The building will be finished in 2027. The buyers are deciding now." — this is real urgency. The deadline exists in reality, not in the copy.

"Each extract is produced in a single annual batch, tied to the harvest calendar. Supply is finite and not replenished mid-season." — real scarcity.

**Rule:** if you can't find the real temporal or supply stakes, don't manufacture fake ones. State what's actually true.

---

#### 3.5 The headline earns the body

The headline's job is to make one specific promise interesting enough that the reader continues. It does not summarize the product or explain the mechanism — that is the body copy's job.

- "Write stories that breathe." — a promise about experience, not a feature description
- "Every log, searchable in under 100ms." — a specific claim that earns "how?"
- "What the glacier gives, one season at a time." — a frame that earns the product explanation

**Rule:** if the headline could appear on any product in the same category, it has not yet earned the body. A good headline is only true for this brand.

---

#### 3.6 Banned copy patterns

These are not style preferences — they are patterns that reliably fail with the audiences in this system.

- **Adjectives without proof:** powerful, seamless, beautiful, intuitive, innovative, next-generation, cutting-edge, robust, world-class
- **Feature-led without benefit:** "We use X to achieve Y" without stating what the reader gets
- **Vague social proof:** "trusted by thousands of teams" without naming who or proving what
- **Excitement punctuation:** exclamation marks in hero or headline copy; ALL CAPS for emphasis; emoji in professional B2B contexts
- **Passive voice claims:** "Experience the difference" · "Discover the possibilities"
- **The word "simple":** every product claims to be simple. Name the specific hard thing that is now easy.
- **"We believe" openers:** "We believe great design should be accessible to everyone." Beliefs are not interesting. What you built is.

---

#### 3.7 Copy architecture by domain

The sequence in which claims, proof, and action appear matters. Different domains have different optimal sequences.

| Domain | Copy sequence |
|--------|--------------|
| B2B SaaS | Problem they recognize → specific claim → proof in UI or customer quote → clear adoption path |
| Developer tools | Technical claim → show the interface or code → honest tradeoffs → low-friction start |
| Luxury / premium consumer | Aspiration or beauty → material/origin specificity → friction as exclusivity signal |
| Food / hospitality | Atmosphere → specific people / place / ingredient → simple path to experience |
| Professional B2B | Peer-level claim → proof from domain professionals (named, with context) → inquiry path |
| Editorial | Lead → deck → body. Serve the reader with content before asking for action. |
| Consumer waitlist | Promise → who it's for → social proof → single field |

---

## Part 4 — Format Reference (Dimension 12)

### Add to `skills/blueprint-vocabulary.md` as Dimension 12, after the existing dimensions

---

### Dimension 12 — Format Reference

**What it is:** The real-world artifact, document, or interface whose structure the page borrows from. This is distinct from aesthetic (how things look) — it describes the mental model a visitor uses to navigate the page.

Format Reference is the single most powerful creative decision in the synthesis. A page that borrows from a newspaper front page reads completely differently from a page that borrows from an observability dashboard, even if both have dark themes, serif type, and dense information. The format determines what the visitor expects to do next at every scroll point.

---

#### Format Reference options

**`web-convention`**
Standard hero → features → social proof → pricing → CTA. This must be chosen consciously — it is not the default when nothing better fits. Most appropriate when the audience has no stronger reference frame and the page serves a general consumer with no specific domain expectations.

When to choose: genuinely broad audiences with no better frame. Children's education (parents who aren't tech specialists). General consumer products. Any brief where the domain doesn't suggest a stronger reference.

When NOT to choose: developer tools (use product-as-hero or broadcast-terminal), editorial brands (use print-editorial), any brand with a specific professional audience.

**`print-editorial`**
Newspaper or magazine column structure with masthead, kicker labels, pull quotes, bylines, column rules. Creates cultural authority and depth. Requires strong copy to fill the format — thin copy in editorial format reads as pretentious.
- Appropriate for: media brands, journalism, publishers, content-first brands, any brand that wants to position itself as authoritative within a cultural conversation
- Reference: broadsheet.html

**`product-as-hero`**
The product interface replaces the hero image entirely. The UI is the primary argument — seeing it is more convincing than describing it. This is appropriate when the product's interface is self-evidently excellent and the audience can evaluate it on sight.
- Appropriate for: developer tools, B2B SaaS with strong UI, observability, dashboards, any product whose audience makes decisions by seeing the interface
- Reference: axiom.html

**`split-vertical`**
Two equal columns with one clear purpose per column. Left/right separation creates a visual contract with the visitor: "here is the action, here is the reason." Works for: signup + social proof, form + feature preview, comparison between two options.
- Appropriate for: waitlists, early-access pages, dual-audience pages, before/after comparisons
- Reference: waitlist.html

**`app-shell`**
Sidebar navigation + main content area, full viewport. The page looks and feels like an application, not a marketing page. Used for product demos that drop the visitor into the experience.
- Appropriate for: product demonstrations, docs, dashboards, any product where the UX itself is the marketing
- Reference: agent-obs.html, aichat.html

**`terminus`**
Single conversion surface. One goal, one action, no sections. Minimal chrome. Everything on the page points to one thing. Works only for extremely focused campaigns where the visitor already knows what they want.
- Appropriate for: early-access launches, single-CTA campaigns, invitation-only access
- Note: terminus fails if the visitor needs context before acting. Only use when prior awareness exists.

**`spec-sheet`**
Data-dense, tabular, reference-first. The page answers questions a technical reader would ask before the reader has to ask them. Dense but navigable. Appropriate when the audience makes decisions by comparing specifications.
- Appropriate for: developer documentation-style landing pages, technical comparison pages, hardware or infrastructure products

**`broadcast-terminal`**
Live stream, ticker, log aesthetic. Content appears to update in real time. Creates urgency and authenticity. Appropriate when live data is the product's core value proposition.
- Appropriate for: monitoring tools, observability, any product whose value is real-time visibility
- Reference: axiom.html (log stream section)

---

#### Format Reference selection rules

**Rule 1 — Conscious default only.**
`web-convention` is not the default. Every synthesis must ask "what format would this brand naturally live in?" before landing on web-convention.

**Rule 2 — Domain-fit validation.**
Before committing to a Format Reference, validate it against three questions:
1. Does the audience have familiarity with and trust for this format?
2. Does the navigation model of this format match how this audience makes decisions in this domain?
3. Can the conversion action fit naturally within this format?

If any of these fail, the Format Reference creates friction instead of resonance. A CRT terminal aesthetic for a children's learning app borrows a format whose audience (7-year-olds) has no nostalgia for and whose parents would distrust. The format reference must serve the domain, not the designer's preference.

**Rule 3 — Page-wide application.**
The Format Reference applies to every section of the page, including the conversion/CTA section. It is not a style applied to the hero and dropped at the form. A premium wholesale inquiry form on a botanical brand does not look like a Webflow contact form — it looks like a letter. A developer tool's pricing section uses mono type and spec-sheet density, not a standard pricing card grid.

Ask for each section: "How would [this format] handle this content?" A newspaper would handle a CTA as an advertisement block. A premium catalog would handle it as a tailored inquiry. An app shell would handle it as a settings panel. Adapt the format to the section, don't abandon the format.

**Rule 4 — Visual claim = visual proof.**
If the brand's primary promise is visual (film, architecture, photography, design, product UI), the page must include a section where that claim is proven with actual visuals — not described. An architectural visualization firm's portfolio section must contain architectural images. A design tool's hero must show the interface. Use LoremFlickr or Picsum with keywords that reflect the actual product domain (not decorative stock photography).

---

## Part 5 — New Synthesis Steps

### Add to `agents/blueprint.md` in the Synthesis section

---

### Step 2.5 — Format Reference selection

Insert this step after the scout domain context is available (after current Step 2) and before the Layout Pattern selection.

**Step 2.5 — Resolve Format Reference**

Before choosing a layout pattern, determine what real-world format this page's structure borrows from. Work through:

1. "Given the domain and audience, what non-web format does this brief most naturally evoke?" Consider: a restaurant menu, a technical data sheet, an editorial column, a product dashboard, a film poster, an apothecary catalog, a letter of inquiry.

2. "Does this audience have familiarity with and affinity for that format?" A financial data product's audience (engineers, analysts) knows Bloomberg terminals. A luxury spirits brand's audience (bar directors, sommeliers) knows printed production notes. A children's education product's audience (parents) knows nothing about CRT terminals.

3. "Does the conversion action fit naturally within this format?" A newspaper advertisement block is a natural conversion point in print-editorial format. An inquiry form is natural in a premium catalog format. An instant-signup is natural in terminus format.

4. Record the Format Reference dimension in the vocabulary table. If the answer is genuinely `web-convention`, note it explicitly and add one structural departure (asymmetric split, product-as-hero hero, asymmetric feature layout) to avoid pure convention.

---

### Step 7 — Visual proof check

Insert before generating any HTML.

**Step 7 — Visual proof requirement**

If the brand's primary claim is visual — the brand makes or shows things (film, architecture, photography, product UI, food, furniture, fashion, design) — identify the section of the page where that claim is visually proven.

- "We make cinematic films" → the portfolio section must contain images that look like film stills. Use LoremFlickr with keywords: `architecture,luxury,building` or `interior,cinematic,film`. Not decorative abstract stock.
- "Precision-crafted hardware" → product photography section. Keywords: specific material or product type.
- "Developer observability tool" → the product dashboard mockup IS the hero. No external image needed.
- "Hand-harvested botanicals" → each ingredient entry needs a photograph that represents the ingredient specifically, not "nature" generically.

If the visual proof section is absent, the page makes a visual claim it cannot support. Add the section.

---

### Step 8 — CTA format consistency check

Insert at the end of synthesis, before writing HTML.

**Step 8 — CTA format consistency**

Review the planned conversion section. Ask:

1. Does this conversion section maintain the Format Reference dimension selected in Step 2.5?
2. Or does it revert to generic web form patterns (`bp-form-group`, `bp-input`, `bp-label`) without brand treatment?

Generic web form components within a brand-specific format reference is the single most common design collapse in the system. The premium botanical wholesale inquiry form is not a Webflow contact form. The architectural visualization firm's project inquiry is not a generic lead form. The developer tool's "start free" is not a generic email field.

For each conversion section, ask: "How does [this Format Reference] handle asking for action?" Then design the conversion section as an expression of that format.

Examples:
- Print-editorial: an advertisement block with a border rule, kicker label "Advertise / Inquire", and a minimal form
- Premium catalog: no field labels, placeholder text only, a single "Send inquiry" button — deliberate friction
- App-shell: a dialog or slide-over panel that feels like an in-product action
- Terminus: the entire page IS the CTA — there is no separate conversion section

---

## Part 6 — Taste Gate Additions

### Add to `skills/blueprint-taste.md`

---

### New banned pattern: structural conventionality without intent

A page that executes conventional web structure (hero → features → social proof → pricing → CTA) without a deliberate structural departure is a missed opportunity, not a safe choice. Aesthetic quality does not compensate for structural predictability.

**Banned:** landing pages that score high on all vocabulary dimensions but use `web-convention` format reference without any structural surprise.

**The challenge question to add:** "Does this layout have a structural departure that a visitor would notice and remember? If not, what single change would create one?"

---

### New banned pattern: CTA format collapse

A brand whose Format Reference is anything other than `web-convention` must not revert to generic web form components in its conversion section. The CTA section must maintain the register established in the rest of the page.

**Banned:** premium/atmospheric/editorial/technical brand formats that drop into a standard `<form>` with `<label>` + `<input>` + `<button>` at the conversion point without brand-specific styling or framing.

---

### New banned pattern: visual claim without visual proof

A brand whose primary promise is visual (film, design, architecture, photography, food) must not rely entirely on copy to carry that claim.

**Banned:** portfolio-type sections that use CSS gradient backgrounds or icon placeholders in place of actual representative imagery. The visual proof section must contain images with domain-specific keywords, not decorative atmospheric substitutes.

---

## Implementation sequence for an agent

If implementing this spec, work in this order:

1. Add the Color Theory Reference to `skills/blueprint-vocabulary.md` (after Dimension 5)
2. Add the Typography Pairing Theory to `skills/blueprint-vocabulary.md` (replace/extend Dimension 8)
3. Add Dimension 12 Format Reference to `skills/blueprint-vocabulary.md` (new section after existing dimensions)
4. Add the three new synthesis steps to `agents/blueprint.md` (Steps 2.5, 7, 8)
5. Add the Copy Psychology Principles section to `agents/copy.md` (before Branch A/B)
6. Add the three new banned patterns to `skills/blueprint-taste.md`

Each change is additive — nothing in the existing system is removed. The theory layers give context for choices the system was already making; the Format Reference dimension adds a new pre-structural synthesis step; the synthesis rules enforce consistency and visual proof; the taste gate additions name what was previously only implicitly wrong.
