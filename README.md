# The Point

A CSS design system with a blueprint aesthetic. Drop it into any project, set one attribute, and you have a fully designed UI. Add a single brand file to make it yours.

Works in React, Rails, Electron, plain HTML — anything that renders HTML.

---

## The idea

Most design systems make you choose between a blank slate (too much work) and an opinionated framework (too hard to escape). The Point is different: it has a strong default aesthetic — a technical blueprint look — that looks intentional and complete on its own. When you're ready to brand it, one small CSS file is all it takes.

**Without a brand file** → your site looks like a blueprint. Clean, structured, production-ready.

**With a brand file** → the blueprint structure stays, your brand sits on top. Change as much or as little as you want.

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

### 2. Set the theme

Add one attribute to your `<html>` element:

```html
<html data-bp-theme="dark">   <!-- deep navy, light blue lines -->
<html data-bp-theme="light">  <!-- drafting paper, blueprint blue lines -->
```

That's it. Your page is designed.

### 3. Add branding (optional)

Copy `brand-template.css` into your project and rename it `brand.css`. Uncomment and set the variables you want to change:

```css
:root {
  --color-primary:       #f97316;   /* your brand color */
  --color-primary-hover: #ea580c;
  --font-heading:        'Outfit', sans-serif;
}
```

Import it after the main library:

```html
<link rel="stylesheet" href="path/to/the-point/index.css">
<link rel="stylesheet" href="./brand.css">
```

The minimum meaningful brand override is just `--color-primary` and `--color-primary-hover`. Everything — buttons, links, focus rings, badges, active states — flows from those two values.

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
:root {
  --bp-grid-color:      transparent;
  --bp-grid-color-bold: transparent;
}
```

### How much to brand

The brand file is a spectrum, not a switch:

- **No brand file** → pure blueprint look
- **2 lines** (primary color only) → blueprint with your color accent
- **10 lines** → fully branded, blueprint structure underneath
- **Full override** → completely custom palette, blueprint structure and spacing remain

---

## File structure

```
the-point/
  ├── index.css              ← single import entry point
  ├── brand-template.css     ← copy this per project
  ├── llm.md                 ← reference doc for LLM-assisted development
  ├── README.md              ← you are here
  └── core/
      ├── base.css           ← design tokens, themes, reset, body styles
      ├── components.css     ← all component classes
      └── utilities.css      ← spacing, typography, layout helpers
```

You never need to edit the `core/` files. All customization happens in your brand file.

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
`bp-btn` + variant: `bp-btn-primary` `bp-btn-secondary` `bp-btn-outline` `bp-btn-ghost` `bp-btn-destructive`
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
`bp-divider` `bp-skeleton`

**App layout**
`bp-app-layout` `bp-sidebar` `bp-sidebar-header` `bp-sidebar-nav`
`bp-sidebar-label` `bp-sidebar-item` `bp-main-content`

**Modal**
`bp-overlay` `bp-modal` `bp-modal-header` `bp-modal-title` `bp-modal-body` `bp-modal-footer`

**Footer**
`bp-footer` `bp-footer-grid` `bp-footer-brand-name` `bp-footer-brand-desc`
`bp-footer-col-title` `bp-footer-links` `bp-footer-link` `bp-footer-bottom` `bp-footer-copy`

**Blueprint decorative**
`bp-bracket` `bp-mono-label` `bp-annotation` `bp-dotted-connector` `bp-text-gradient`

For full HTML patterns for every component, see `llm.md`.

---

## Examples

The `examples/` directory has six complete pages showing how different the same library can look:

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

All examples are standalone HTML files. Open any of them directly in a browser.

---

## Using with an LLM

`llm.md` is a compact reference doc that gives an LLM everything it needs to build with this library without reading the source files. When starting a new AI-assisted project:

1. Add `llm.md` to your LLM's context
2. Provide your `brand.css` (or describe the brand in 2–3 lines)
3. Describe the page or component you want

The LLM will use the library's classes and patterns rather than inventing its own styles. This keeps output consistent and dramatically reduces the amount of CSS the LLM needs to generate.

---

## Design decisions

**Why a blueprint aesthetic?** It communicates structure — which is what a base library is showing you. It looks intentional without a brand file, which means you can ship earlier and add branding when you're ready.

**Why pure CSS, no framework dependency?** So it works everywhere. A Rails partial, a React component, an Electron window, and a plain HTML file all use the same classes. The library has no opinion about your stack.

**Why `bp-` prefixed classes?** Namespacing prevents collisions with any other CSS already in your project. You can drop this into an existing codebase without conflicts.

**Why separate `brand-template.css`?** Making the brand layer explicit forces the right separation. One file, clearly named, containing only what is unique to this project. Everything else is shared and reusable.
