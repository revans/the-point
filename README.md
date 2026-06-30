# The Point

A CSS design system with a blueprint aesthetic. Use `bp-` classes in your markup, set one attribute on `<html>`, and you have a fully designed UI. Add a single brand file to make it yours.

Works in React, Rails, Electron, and plain HTML. Any project that renders HTML works.

---

## The idea

Most design systems make you choose between a blank slate (too much work) and an opinionated framework (too hard to escape). The Point takes a different approach: it has a strong default aesthetic (a technical blueprint style) that looks deliberate without any customization. When you're ready to brand it, one small CSS file is all it takes.

**Without a brand file:** your site looks like a blueprint. Clean and structured.

**With a brand file:** the blueprint structure stays, your brand sits on top. Change as much or as little as you want.

---

## Getting started

### 1. Import the library

**HTML**
```html
<link rel="stylesheet" href="path/to/the-point/index.css">
```

**React / Vite**
```js
import 'path/to/the-point/index.css'
```

**Rails**
```css
*= require the-point/index
```

### 2. Write markup with `bp-` classes

Use the library's component classes in your HTML. A minimal page looks like:

```html
<nav class="bp-nav">...</nav>
<main>
  <section class="bp-hero bp-section">
    <div class="bp-container">
      <h1 class="bp-hero-title">...</h1>
      <p class="bp-hero-subtitle">...</p>
      <div class="bp-hero-actions">
        <a href="#" class="bp-btn bp-btn-primary">Get started</a>
      </div>
    </div>
  </section>
</main>
```

See `llm.md` for full HTML patterns for every component. The `examples/` directory has nine complete pages you can copy from.

### 3. Set the theme

Add one attribute to your `<html>` element:

```html
<html data-bp-theme="dark">   <!-- deep navy, light blue lines -->
<html data-bp-theme="light">  <!-- drafting paper, blueprint blue lines -->
<html data-bp-theme="auto">   <!-- follows OS dark/light preference -->
```

That's the last step. Your page is designed.

### 4. Add branding (optional)

Copy `brand-template.css` into your project and rename it `brand.css`. Uncomment and set the variables you want to change:

```css
@layer brand-state {
  :root {
    --color-primary:       #f97316;   /* your brand color */
    --color-primary-hover: #ea580c;
    --font-heading:        'Outfit', sans-serif;
  }
}
```

Import it after the main library:

```html
<link rel="stylesheet" href="path/to/the-point/index.css">
<link rel="stylesheet" href="./brand.css">
```

The minimum meaningful brand override is just `--color-primary` and `--color-primary-hover`. Buttons, links, focus rings, badges, and active states all inherit from those two values.

---

## Theming

### Dark vs. light

| | Dark | Light |
|---|---|---|
| Background | Deep navy | Off-white drafting paper |
| Lines | Light blue | Blueprint blue |
| Text | White / pale blue | Dark navy |
| Feel | Technical drawing on film | Architect's drafting table |

Toggle with a single attribute. No JavaScript required.

### Removing the grid

The blueprint grid is part of the default aesthetic. To remove it in your brand file:

```css
@layer brand-state {
  :root {
    --bp-grid-color:      transparent;
    --bp-grid-color-strong: transparent;
  }
}
```

### How much to brand

The brand file is a spectrum, not a switch:

- **No brand file** → pure blueprint look
- **2 lines** (primary color only) → blueprint with your color accent
- **10 lines** → fully branded, blueprint structure underneath
- **Full override** → completely custom palette, blueprint structure and spacing remain

---

## Mood library

Six pre-built color directions. Drop one in between `index.css` and your `brand.css` to get a full primary color family without writing one yourself:

```html
<link rel="stylesheet" href="the-point/index.css">
<link rel="stylesheet" href="the-point/moods/amber.css">
<link rel="stylesheet" href="./brand.css">
```

| Mood | Feel | Primary color |
|---|---|---|
| `amber.css` | Warm, editorial, confident | #d97706 |
| `slate.css` | Professional, restrained, trustworthy | #475569 |
| `forest.css` | Natural, calm, approachable | #16a34a |
| `violet.css` | Creative, expressive, modern | #7c3aed |
| `ember.css` | Bold, warm, high-energy | #ea580c |
| `arctic.css` | Clean, precise, cold-functional | #0ea5e9 |

Mood files only set the primary color family. Your `brand.css` overrides any of them.

### Layer compositing

The Point uses CSS `@layer` to make override order deterministic:

```
blueprint      ← The Point core (lowest priority)
brand-base     ← Mood files
brand-seasonal ← Campaign / seasonal overrides
brand-state    ← Your brand.css (always wins)
```

This means you can load a mood file AND a brand.css. The brand.css wins on any variable both files touch, without needing `!important` or higher specificity.

### Runtime mood switching

Give the mood `<link>` an id and swap `href` to change palettes without a reload:

```html
<link id="mood" rel="stylesheet" href="the-point/moods/amber.css">
```

```js
document.getElementById('mood').href = 'the-point/moods/forest.css'
```

---

## File structure

```
the-point/
  ├── README.md
  ├── ROADMAP.md
  ├── LICENSE
  ├── llm.md                 ← reference doc for LLM-assisted development
  ├── .claude-plugin/
  │   └── plugin.json        ← Claude Code plugin manifest
  ├── agents/
  │   ├── blueprint.md       ← @blueprint: design interview + install
  │   └── copy.md            ← @copy: fills placeholder text
  ├── skills/
  │   ├── blueprint-taste.md       ← design taste enforcer
  │   └── blueprint-copywriter.md  ← copy interview framework
  ├── assets/                ← CSS files, installed into your project by @blueprint
  │   ├── index.css          ← entry point (includes version comment)
  │   ├── brand-template.css ← copy this as your brand.css
  │   ├── core/
  │   │   ├── base.css       ← design tokens, themes, reset, body styles
  │   │   ├── components.css ← all component classes
  │   │   ├── utilities.css  ← spacing, typography, layout helpers
  │   │   ├── motion.css     ← animation system (bp-animate, draw animations)
  │   │   └── print.css      ← print mode, bp-print-spec
  │   └── moods/
  │       ├── amber.css      ← warm, editorial, confident
  │       ├── slate.css      ← professional, restrained, trustworthy
  │       ├── forest.css     ← natural, calm, approachable
  │       ├── violet.css     ← creative, expressive, modern
  │       ├── ember.css      ← bold, warm, high-energy
  │       └── arctic.css     ← clean, precise, cold-functional
  ├── integrations/
  │   ├── rails/             ← helpers, ERB partials, Stimulus theme controller
  │   └── react/             ← TypeScript component wrappers
  └── examples/              ← standalone HTML pages, open directly in a browser
```

You never need to edit the `assets/core/` files. All customization happens in your brand file.

---

## Components

All components use `bp-` prefixed classes. A brief overview:

**Layout**
`bp-container` `bp-section` `bp-section-sm` `bp-section-lg` `bp-grid` `bp-grid-2/3/4`

**Navigation**
`bp-nav` `bp-nav-inner` `bp-nav-brand` `bp-nav-links` `bp-nav-link` `bp-nav-actions`

**Hero & sections**
`bp-hero` `bp-hero-eyebrow` `bp-hero-title` `bp-hero-subtitle` `bp-hero-actions`
`bp-section-header` `bp-section-label` `bp-section-title` `bp-section-subtitle`

**Buttons**
`bp-btn` + variant: `bp-btn-primary` `bp-btn-secondary` `bp-btn-outline` `bp-btn-ghost` `bp-btn-error`
+ size: `bp-btn-xs` `bp-btn-sm` `bp-btn-lg` `bp-btn-xl` `bp-btn-icon`

**Cards**
`bp-card` `bp-card-hover` `bp-card-feature` `bp-card-feature-icon`
`bp-card-header` `bp-card-title` `bp-card-description` `bp-card-body` `bp-card-footer`

**Forms**
`bp-form-group` `bp-label` `bp-input` `bp-textarea` `bp-select`
`bp-input-error` `bp-form-error` `bp-form-hint` `bp-checkbox` `bp-radio`

**Feedback**
`bp-badge` + `bp-badge-default/secondary/success/warning/error/outline`
`bp-alert` + `bp-alert-default/success/warning/error`
`bp-toast` `bp-toast-container`

**Data display**
`bp-stat` `bp-stat-value` `bp-stat-label` `bp-stat-change-up/down`
`bp-table-wrapper` `bp-table`
`bp-avatar` `bp-avatar-sm/md/lg/xl`

**Content**
`bp-pricing-card` `bp-pricing-card-featured`
`bp-testimonial`
`bp-divider` `bp-skeleton` `bp-skeleton-text` `bp-skeleton-title`
`bp-skeleton-1u` `bp-skeleton-2u` `bp-skeleton-3u` `bp-skeleton-4u` `bp-skeleton-6u`
`bp-skeleton-card`

**App layout**
`bp-app-layout` `bp-sidebar` `bp-sidebar-header` `bp-sidebar-nav`
`bp-sidebar-label` `bp-sidebar-item` `bp-main-content`

**Modal**
`bp-overlay` `bp-modal` `bp-modal-header` `bp-modal-title` `bp-modal-body` `bp-modal-footer`

**Footer**
`bp-footer` `bp-footer-grid` `bp-footer-brand-name` `bp-footer-brand-desc`
`bp-footer-col-title` `bp-footer-links` `bp-footer-link` `bp-footer-bottom` `bp-footer-copy`

**Blueprint decorative**
`bp-bracket` `bp-mono-label` `bp-annotation` `bp-dashed-connector` `bp-text-gradient`

**Motion**
`bp-animate` rescopes transitions to the bounce curve within a container
`bp-animate-draw` draws the component border clockwise on scroll entry

**Print**
`bp-print-spec` applied to any section, renders it as a formal specification document with auto-numbered `REQ-01` / `TIER-01` blocks. See [Print mode](#print-mode).

For full HTML patterns for every component, see `llm.md`.

---

## Examples

The `examples/` directory has eleven files. Nine show complete pages in different use cases. Two are templates: `starter.html` (blank starting point) and `showcase.html` (component reference).

| File | Theme | Brand | Layout type |
|---|---|---|---|
| `dark-landing.html` | Dark | None (pure blueprint) | Standard SaaS landing page |
| `light-landing.html` | Light | None (pure blueprint) | Consulting/agency, different structure |
| `branded-landing.html` | Dark | Orange (Ember Coffee) | E-commerce, editorial feel |
| `app-dashboard.html` | Dark | None | Sidebar app with stats and table |
| `waitlist.html` | Dark | Violet (Fable) | Split-screen email capture |
| `link-bio.html` | Dark | Teal (Maya Chen) | Centered card, link-in-bio |
| `event.html` | Dark | Red (Signal 2026) | Conference page, live countdown |
| `onboarding.html` | Dark | Green (Grove) | 4-step interactive wizard |
| `wireframe.html` | Light | None | Full skeleton wireframe: interactive layout blueprint and production loading state in one file |

All examples are standalone HTML files. Open any of them directly in a browser.

---

## Using with an LLM

`llm.md` is a compact reference doc that gives an LLM everything it needs to build with this library without reading the source files. When starting a new AI-assisted project:

1. Add `llm.md` to your LLM's context
2. Provide your `brand.css` (or describe the brand in 2–3 lines)
3. Describe the page or component you want

The LLM will use the library's classes and patterns rather than inventing its own styles. This keeps output consistent and reduces the amount of CSS it needs to generate.

---

## Blueprint Agent

The Point ships with a built-in AI design agent that interviews you (or reads a URL/screenshot) and generates a complete `brand.css` and HTML page.

The agent lives in `agents/blueprint.md` and loads two skills:

- **`blueprint-taste.md`**: fires before any design decision. Bans the AI startup palette (dark background + indigo/violet), Inter Bold at 72px, glowing orb hero graphics, glass morphism cards, six identical feature cards, and uniform spacing. Forces every choice to be justified for the specific audience.
- **`blueprint-copywriter.md`**: fires after design decisions. Bans every generic landing page phrase ("Transform your workflow", "Effortlessly X", "Get started today"). Runs a two-branch interview to extract real signal from either customer quotes or founder frustration.

### How to use @blueprint

Four entry points. Blueprint detects which one applies:

**Blank slate (full interview):**
```
@blueprint
```

Eight questions, none technical. Examples: "Who's making the decision: someone spending $50 or justifying $5,000 to their boss?" and "Should this feel like a glass office tower or a well-lit independent bookshop?"

**URL to extract style from:**
```
@blueprint https://stripe.com
```

Reads the visual language (palette, weight, spacing, corner radius) and asks 3-4 personalizing questions. The URL answers the visual questions.

**Image or screenshot:**
Upload a screenshot or Dribbble image. Blueprint extracts the aesthetic and asks 3–4 questions.

**Existing brand.css:**
Point it at a `brand.css` you already have. It reads which variables are set, asks "Keep this direction or start fresh?", and builds from there.

### Output

After the interview, Blueprint generates:
- `brand.css` with only the variables that differ from defaults
- A complete HTML file using The Point component classes
- All placeholder text marked with `[brackets]` for the copy agent

It then hands off to `@copy`, which runs its own two-branch interview and fills all the text.

### @copy: standalone use

Use `@copy` on any existing The Point HTML file to replace placeholder text with real copy:

```
@copy
```

The agent reads the file, lists every placeholder it found, runs the interview, and writes back to the same file.

---

## Print mode

Add `class="bp-print-spec"` to any section to make it print as a formal specification document. No other class needed. `@media print` fires automatically on Ctrl+P.

**What the print stylesheet does automatically:**
- Forces white background with low-opacity navy grid (structural presence, not decorative)
- Hides navigation, modals, overlays, and toasts
- Strips buttons to plain text links
- Removes all glow shadows, transforms, and animations
- Floats `bp-annotation` blocks to the right margin (28% width, with a primary-color left border)
- Collapses `bp-stat` from large card numbers to compact labeled data rows
- Injects page numbers into the footer via CSS `counter(page)`

### `bp-print-spec`: formal specification mode

Apply to any `<section>`. Each `bp-card` inside auto-numbers as `REQ-01`, `REQ-02`, etc. Pricing cards use `TIER-01`.

```html
<!-- A pricing page that becomes a formal proposal when printed -->
<section class="bp-section bp-print-spec">
  <div class="bp-container">
    <div class="bp-grid bp-grid-3">
      <div class="bp-pricing-card">...</div>   <!-- prints as TIER-01 -->
      <div class="bp-pricing-card">...</div>   <!-- prints as TIER-02 -->
      <div class="bp-pricing-card">...</div>   <!-- prints as TIER-03 -->
    </div>
  </div>
</section>
```

The counter labels (`REQ-`, `TIER-`) are injected via CSS. No changes to HTML needed.

---

## Motion

### Page draw animation

Add `data-bp-motion="draw"` to your `<html>` element alongside the theme:

```html
<html data-bp-theme="dark" data-bp-motion="draw">
```

A primary-colored line sweeps left-to-right across the top of the page. Then the nav, hero, sections, and footer fade up in sequence, like a draftsman sketching the layout before filling it in. Automatically disabled for users with `prefers-reduced-motion` set in their OS.

### Bounce transitions

Wrap any container in `bp-animate` to switch all child transitions to the bounce curve:

```html
<div class="bp-animate">
  <button class="bp-btn bp-btn-primary">Bouncy</button>
  <div class="bp-card bp-card-hover">Bouncy card</div>
</div>
```

This works by rescoping the `--bp-transition-*` tokens within the container. Every component that inherits those tokens picks up the bounce automatically.

### Component border draw

Add `bp-animate-draw` to any card or section to draw its border clockwise (top → right → bottom → left) when it enters the viewport:

```html
<div class="bp-card bp-animate-draw">...</div>
<div class="bp-card bp-bracket bp-animate-draw">...</div>
```

Uses animated `background-image` gradients (no pseudo-elements), so it's safe to combine with `bp-bracket`. Scroll-driven via `animation-timeline: view()` in browsers that support it. Falls back to a page-load animation in others.

---

## Design decisions

**Why a blueprint aesthetic?** It communicates structure, which is what a base library is showing you. It looks deliberate without a brand file, which means you can ship earlier and add branding when you're ready.

**Why pure CSS, no framework dependency?** So it works everywhere. A Rails partial, a React component, an Electron window, and a plain HTML file all use the same classes. The library has no opinion about your stack.

**Why `bp-` prefixed classes?** Namespacing prevents collisions with any other CSS already in your project. You can drop this into an existing codebase without conflicts.

**Why separate `brand-template.css`?** Making the brand layer explicit forces the right separation. One file, clearly named, containing only what is unique to this project. Everything else is shared and reusable.
