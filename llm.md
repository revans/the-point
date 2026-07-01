# The Point — LLM Reference

A CSS design system with a blueprint aesthetic. One import, one optional brand file, works in any framework that renders HTML.

---

## Setup

```html
<html data-bp-theme="dark">   <!-- deep navy blueprint -->
<html data-bp-theme="light">  <!-- drafting paper blueprint -->
<html data-bp-theme="auto">   <!-- follows OS preference -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/revans/the-point@master/assets/index.css">
<link rel="stylesheet" href="./brand.css">  <!-- optional -->
```

The jsDelivr URL above is a real, working link — use it as-is for any standalone HTML file
or prototype with no local install. It pulls straight from the `master` branch of
`github.com/revans/the-point`, so it always reflects the latest commit (no version pinning yet).

Do NOT link `raw.githubusercontent.com` directly — GitHub serves raw files as `text/plain`
with a `nosniff` header, so browsers refuse to apply them as a stylesheet. jsDelivr fronts
the repo and serves the correct `text/css` content type.

If you have the-point installed locally (vendored, npm, or asset pipeline), use a local
path instead — the real file lives at `assets/index.css` in the repo, not root-level
`index.css`:

**Rails:** `*= require the-point/index` then `*= require brand`
**React/Vite:** `import 'the-point/assets/index.css'` then `import './brand.css'`

---

## Brand Customization

### Layer system

The Point uses CSS `@layer` to make brand overrides deterministic regardless of load order:

```
blueprint     ← The Point core (tokens, components, utilities)
brand-base    ← Mood files (moods/amber.css, moods/slate.css, …)
brand-seasonal← Campaign / seasonal overrides
brand-state   ← Your brand.css — always wins
```

Higher layers win. Your `brand.css` in `brand-state` wins over any mood file.

### Mood files

Pre-built color directions in `moods/`. Drop one in between `index.css` and `brand.css`:

```html
<link rel="stylesheet" href="the-point/index.css">
<link rel="stylesheet" href="the-point/moods/amber.css">
<link rel="stylesheet" href="./brand.css">
```

| Mood | Feel | Use for |
|---|---|---|
| `amber.css` | Warm, editorial, confident | Food, hospitality, independent makers |
| `slate.css` | Professional, restrained, trustworthy | Legal, finance, B2B consulting |
| `forest.css` | Natural, calm, approachable | Wellness, education, nonprofits |
| `violet.css` | Creative, expressive, modern | Design tools, agencies, creative software |
| `ember.css` | Bold, warm, high-energy | Events, launches, sports, media |
| `arctic.css` | Clean, precise, cold-functional | Developer tools, infrastructure, fintech |

Mood files only set `--color-primary` and its variants. Your `brand.css` overrides any of them.

### Runtime theme switching (10 lines of JS)

Give the mood `<link>` an ID and swap its `href` to change palettes without a reload:

```html
<link id="mood-link" rel="stylesheet" href="the-point/moods/amber.css">
```

```js
document.getElementById('mood-link').href = 'the-point/moods/forest.css'
```

### Custom brand file

Copy `brand-template.css` into your project. It wraps in `@layer brand-state` automatically. Minimum viable brand is two lines:

```css
@layer brand-state {
  :root {
    --color-primary:       #your-color;
    --color-primary-hover: #your-color-darker;
  }
}
```

**All overridable semantic variables:**

### Colors

Setting `--color-primary` is sufficient. The system automatically derives `--color-primary-hover` (darker), `--color-primary-subtle` (12% alpha tint), and `--color-primary-glow` (25% alpha tint) using CSS `color-mix()` and relative color syntax. Override any derived value explicitly only when the auto-derivation doesn't suit your color.

| Variable | Role |
|---|---|
| `--color-primary` | Buttons, links, focus rings, active states — **set this, the rest derive** |
| `--color-primary-hover` | Hover state — auto-derived as 25% darker via `color-mix(in oklch)` |
| `--color-primary-subtle` | 12% alpha tint — auto-derived via `oklch(... / 0.12)` |
| `--color-primary-glow` | 25% alpha tint — auto-derived via `oklch(... / 0.25)` |
| `--color-bg` | Page background |
| `--color-bg-secondary` | Section alternating background |
| `--color-surface` | Card / component background |
| `--color-surface-elevated` | `pre` block background |
| `--color-border` | All borders |
| `--color-text` | Primary text |
| `--color-text-secondary` | Body text, descriptions |
| `--color-text-muted` | Labels, meta, placeholders |
| `--color-text-accent` | Highlighted / accent text |
| `--color-code-bg` | Inline `code` background |
| `--color-code-text` | Inline `code` text color |

### State colors

| Variable | Role |
|---|---|
| `--color-success` | Success badges, alerts, checkmarks |
| `--color-warning` | Warning badges, alerts |
| `--color-error` | Error badges, alerts, destructive states |
| `--color-success-subtle` | Success tint backgrounds |
| `--color-warning-subtle` | Warning tint backgrounds |
| `--color-error-subtle` | Error tint backgrounds |

### Typography

| Variable | Role | Example values |
|---|---|---|
| `--font-heading` | Heading font-family | `'Playfair Display', serif` |
| `--font-body` | Body font-family | `Georgia, serif` |
| `--font-mono` | Monospace font-family | `'JetBrains Mono', monospace` |
| `--font-size-base` | Root font size — scales all `rem` values | `13px` = dense · `16px` = default · `19px` = airy |
| `--font-weight-heading` | Heading weight | `300` = luxury · `600` = default · `700` = bold |
| `--font-weight-body` | Body weight | `300` = editorial · `400` = default · `500` = strong |
| `--line-height-base` | Body line height | `1.3` = dense · `1.5` = default · `1.75` = spacious |
| `--line-height-heading` | Heading line height | `1.05` = tight display · `1.25` = default |
| `--letter-spacing-heading` | Heading letter spacing | `-0.04em` = tight · `0em` = normal · `0.12em` = luxury wide |

### Motion

All `transition:` properties in the system use `--bp-transition-*`, which in turn reference these tokens. Changing a duration or easing token cascades to every button, card, nav link, input, and modal in the system.

| Variable | Role | Example values |
|---|---|---|
| `--duration-fast` | Hover/focus/micro transitions | `0.05s` = surgical · `0.15s` = default · `0.4s` = theatrical |
| `--duration-base` | Standard transitions | `0.1s` = fast · `0.2s` = default · `0.5s` = slow |
| `--duration-slow` | Smooth/enter transitions | `0.2s` = quick · `0.3s` = default · `0.8s` = dramatic |
| `--easing-smooth` | Standard easing curve | `cubic-bezier(0.4, 0, 0.2, 1)` = material · `ease` = simple |
| `--easing-bounce` | Playful overshoot curve (also used by `bp-animate`) | `cubic-bezier(0.34, 1.56, 0.64, 1)` = default · `ease` = clinical |

### Shadows

| Variable | Role |
|---|---|
| `--shadow-sm` | Cards at rest, inputs |
| `--shadow-md` | Elevated cards, dropdowns |
| `--shadow-lg` | Modals, overlays |
| `--shadow-glow` | Primary-colored glow on hover/focus |

Set to `none` for flat design. Use `var(--bp-shadow-*)` values as references.

### Layout & density

| Variable | Role | Example values |
|---|---|---|
| `--space-unit` | Master density dial — scales card padding, section padding, and grid gap simultaneously | `0.625rem` = dense · `1rem` = default · `1.5rem` = airy |
| `--grid-gap` | Gap between grid columns/rows and split panels | `var(--bp-space-4)` = tight · `var(--bp-space-6)` = default · `var(--bp-space-10)` = open |
| `--sidebar-width` | Left panel width in app layouts | `64px` = icon rail · `256px` = default · `320px` = data-heavy |
| `--nav-height` | Top navigation bar height | `48px` = minimal · `64px` = default · `80px` = prominent |
| `--split-ratio` | Column ratio for `.bp-split` without a modifier class | `1fr 1fr` = equal · `1fr 3fr` = narrow label · `3fr 1fr` = wide content |
| `--radius` | Default border radius | `var(--bp-radius-none)` = sharp · `var(--bp-radius-md)` = default · `var(--bp-radius-xl)` = soft |
| `--bp-grid-color` | Blueprint grid line opacity | `transparent` = remove grid |
| `--bp-grid-color-strong` | Bold grid lines | `transparent` = remove |

`--space-unit` is the highest-leverage single token: setting it to `0.75rem` compacts cards, sections, and grids simultaneously — like changing the grid pitch on graph paper. Setting it to `1.5rem` creates the breathing room of an editorial magazine layout.

**Border radius tokens:** `--bp-radius-none` `--bp-radius-sm` `--bp-radius-md` `--bp-radius-lg` `--bp-radius-xl` `--bp-radius-2xl` `--bp-radius-full`

---

## Layout

### Container
```html
<div class="bp-container">          <!-- max-width 1280px, centered, padded -->
<div class="bp-container bp-container-sm">   <!-- 640px -->
<div class="bp-container bp-container-md">   <!-- 768px -->
<div class="bp-container bp-container-lg">   <!-- 1024px -->
<div class="bp-container bp-container-2xl">  <!-- 1440px -->
```

### Section
```html
<section class="bp-section">        <!-- py-20 (80px) -->
<section class="bp-section-sm">     <!-- py-12 (48px) -->
<section class="bp-section-lg">     <!-- py-32 (128px) -->
<section class="bp-section-xl">     <!-- py-40 (160px) — landmark / hero-adjacent sections -->
<section class="bp-section-invert"> <!-- inverted: dark bg, light text; use for contrast bands -->
```

`bp-section-invert` re-maps text and card tokens inside the band — no extra overrides needed. Combine with `bp-section-lg` for a full interlude. (`bp-section-dark` still works as a deprecated alias, but new code should use `bp-section-invert`.)

### Full-Bleed Hero (100vh)
```html
<section class="bp-hero-full">
  <!-- background: image, CSS gradient, or fixed SVG illustration -->
  <img src="..." class="bp-hero-full-bg" alt="">          <!-- optional bg image -->

  <!-- caption anchored bottom-left — optional -->
  <div class="bp-hero-full-caption">
    <h1>Headline</h1>
    <p>Supporting text</p>
    <a href="#" class="bp-btn bp-btn-primary">CTA</a>
  </div>
</section>
```
- `bp-hero-full` fills `100svh`, `overflow: hidden`
- `bp-hero-full-bg` is `position: absolute; inset: 0; object-fit: cover`
- `bp-hero-full-caption` is `position: absolute; bottom: 2.5rem; left: 2.5rem`
- Caption collapses to full-width at mobile

### Cover Section (background image + scrim)
```html
<section class="bp-section bp-section-cover">
  <img src="photo.jpg" class="bp-section-cover-bg" alt="">
  <div class="bp-section-cover-overlay"></div>   <!-- 50% dark scrim -->

  <!-- everything below is in normal flow, stacks above the scrim -->
  <div class="bp-container">
    <h2>Headline over the image</h2>
    <p>Supporting text is readable because of the overlay.</p>
  </div>
</section>
```
- `bp-section-cover-bg` is `position: absolute; inset: 0; object-fit: cover` (z-index: 0)
- `bp-section-cover-overlay` is `position: absolute; inset: 0; background: rgba(0,0,0,0.5)` (z-index: 1)
- All other direct children are automatically `position: relative; z-index: 2`
- Adjust overlay opacity with an inline style or brand.css override

### Grid
```html
<div class="bp-grid bp-grid-2">  <!-- 2 columns -->
<div class="bp-grid bp-grid-3">  <!-- 3 columns -->
<div class="bp-grid bp-grid-4">  <!-- 4 columns -->
<div class="bp-grid bp-grid-5">  <!-- 5 columns (→ 3-col at 1024px, 2-col at 640px) -->
<div class="bp-grid bp-grid-6">  <!-- 6 columns (→ 3-col at 1024px, 2-col at 640px) -->
```
All grids collapse to 1 column on mobile (except bp-grid-5/6 which go to 2-col).

### Asymmetric Splits
Two-column grids with intentional ratios — for hero splits, editorial layouts, sidebar+content pairs.
All collapse to single column at 768px.

```html
<div class="bp-split bp-split-40-60">   <!-- 2fr / 3fr -->
<div class="bp-split bp-split-60-40">   <!-- 3fr / 2fr -->
<div class="bp-split bp-split-33-67">   <!-- 1fr / 2fr — sidebar + content -->
<div class="bp-split bp-split-67-33">   <!-- 2fr / 1fr — content + sidebar -->
<div class="bp-split bp-split-25-75">   <!-- 1fr / 3fr — narrow label + wide body -->
<div class="bp-split bp-split-75-25">   <!-- 3fr / 1fr — wide body + narrow aside -->
```

### Gatefold Spread
Three panels in a **28 : 44 : 28** ratio — no gap, hairline border dividers, generous inner padding. Models the structure of a record sleeve, newspaper spread, or physical fold: the wide center is the narrative axis; the two flanks carry supporting material.

```html
<div class="bp-spread-3">
  <div><!-- left flank: credits, metadata --></div>
  <div><!-- center: main content, liner notes --></div>
  <div><!-- right flank: catalog, callouts --></div>
</div>
```
- Collapses to `1fr 2fr` at ≤ 1024px (third panel becomes full-width row)
- Collapses to single column at ≤ 640px
- Each panel has `padding: var(--bp-space-12)` — do not add a bp-container inside

### App Layout (sidebar)
```html
<div class="bp-app-layout">       <!-- flex row, full height -->
  <aside class="bp-sidebar">
    <div class="bp-sidebar-header">...</div>
    <nav class="bp-sidebar-nav">
      <div class="bp-sidebar-label">Section title</div>
      <a href="#" class="bp-sidebar-item active">...</a>
      <a href="#" class="bp-sidebar-item">...</a>
    </nav>
  </aside>
  <main class="bp-main-content">...</main>
</div>
```

---

## Navigation

```html
<nav class="bp-nav">
  <div class="bp-container bp-nav-inner">
    <a href="#" class="bp-nav-brand">Logo</a>
    <ul class="bp-nav-links">
      <li><a href="#" class="bp-nav-link">Link</a></li>
      <li><a href="#" class="bp-nav-link active">Active</a></li>
    </ul>
    <div class="bp-nav-actions">
      <a href="#" class="bp-btn bp-btn-ghost bp-btn-sm">Sign in</a>
      <a href="#" class="bp-btn bp-btn-primary bp-btn-sm">Get started</a>
    </div>
  </div>
</nav>
```

---

## Breadcrumb

```html
<nav class="bp-breadcrumb" aria-label="Breadcrumb">
  <a href="#" class="bp-breadcrumb-link">Home</a>
  <span class="bp-breadcrumb-separator">/</span>
  <a href="#" class="bp-breadcrumb-link">Section</a>
  <span class="bp-breadcrumb-separator">/</span>
  <span class="bp-breadcrumb-current">Current Page</span>
</nav>
```

---

## Pagination

Pure styling contract — no JS. "Current page" and page-range logic are server/app-driven (Rails: Kaminari/Pagy; React: your own state).

```html
<nav class="bp-pagination" aria-label="Pagination">
  <span class="bp-pagination-item bp-pagination-disabled">‹ Prev</span>
  <a href="#" class="bp-pagination-item">1</a>
  <a href="#" class="bp-pagination-item active" aria-current="page">2</a>
  <a href="#" class="bp-pagination-item">3</a>
  <span class="bp-pagination-ellipsis">…</span>
  <a href="#" class="bp-pagination-item">12</a>
  <a href="#" class="bp-pagination-item">Next ›</a>
</nav>
```

Render disabled prev/next as a plain `<span>` with no `href` instead of an `<a>` — the `bp-pagination-disabled` class handles the visual state, and the missing `href` means there's nothing to click, so no JS is needed to actually prevent navigation.

---

## Hero

```html
<section class="bp-hero bp-container">
  <div class="bp-hero-eyebrow">Label text</div>
  <h1 class="bp-hero-title">Headline with <span class="bp-text-gradient">gradient</span></h1>
  <p class="bp-hero-subtitle">Supporting description text.</p>
  <div class="bp-hero-actions">
    <a href="#" class="bp-btn bp-btn-primary bp-btn-xl">Primary CTA</a>
    <a href="#" class="bp-btn bp-btn-secondary bp-btn-xl">Secondary</a>
  </div>
</section>
```

### Section Header (for feature/pricing sections)
```html
<div class="bp-section-header">
  <span class="bp-section-label">Section label</span>
  <h2 class="bp-section-title">Section heading</h2>
  <p class="bp-section-subtitle">Optional supporting text.</p>
</div>
```

---

## Buttons

**Variants:** `bp-btn-primary` `bp-btn-secondary` `bp-btn-outline` `bp-btn-ghost` `bp-btn-error`
**Sizes:** `bp-btn-xs` `bp-btn-sm` *(default: md)* `bp-btn-lg` `bp-btn-xl`
**Icon-only:** add `bp-btn-icon`
**Full width:** add `bp-w-full`

```html
<button class="bp-btn bp-btn-primary">Primary</button>
<button class="bp-btn bp-btn-secondary bp-btn-sm">Small secondary</button>
<button class="bp-btn bp-btn-outline bp-btn-lg">Large outline</button>
<button class="bp-btn bp-btn-ghost">Ghost</button>
<button class="bp-btn bp-btn-error">Delete</button>
<button class="bp-btn bp-btn-primary bp-btn-icon">
  <svg .../>
</button>
```

**Rails helper:** Icon is inferred from variant/options — `:destructive` → `✕`, `external: true` → `↗`.
```erb
<%= bp_button "Save",   variant: :primary %>
<%= bp_button "Delete", variant: :destructive %>              <%# renders: ✕ Delete %>
<%= bp_button "Docs",   variant: :outline, href: docs_path, external: true %>  <%# renders: ↗ Docs %>
<%= bp_button "Next",   variant: :primary, icon: "→", icon_position: :append %>
<%= bp_button "Delete", variant: :destructive, icon: false %>  <%# suppress icon %>
```

---

## Cards

```html
<!-- Basic card -->
<div class="bp-card">
  <div class="bp-card-header">
    <div class="bp-card-title">Title</div>
    <div class="bp-card-description">Subtitle or meta</div>
  </div>
  <div class="bp-card-body">Content</div>
  <div class="bp-card-footer">
    <button class="bp-btn bp-btn-primary bp-btn-sm">Action</button>
  </div>
</div>

<!-- Hoverable card -->
<div class="bp-card bp-card-hover">...</div>

<!-- Feature card (icon + text) -->
<div class="bp-card bp-card-hover bp-card-feature">
  <div class="bp-card-feature-icon">
    <svg .../>
  </div>
  <div>
    <h3 class="bp-card-title">Feature name</h3>
    <p class="bp-card-description">Description text.</p>
  </div>
</div>

<!-- Media card — image/video/SVG flush to top edge -->
<div class="bp-card bp-card-hover bp-card-media">
  <div class="bp-media bp-media-16-9">
    <img src="photo.jpg" alt="Description">
  </div>
  <div class="bp-card-header">
    <div class="bp-card-title">Title</div>
    <div class="bp-card-description">Meta or subtitle</div>
  </div>
  <div class="bp-card-footer">
    <a href="#" class="bp-btn bp-btn-primary bp-btn-sm">Action</a>
  </div>
</div>
```

---

## Media

Aspect-ratio-locked wrapper for `<img>`, `<video>`, and `<svg>`. Think of it as a picture frame: you choose the frame shape, and the content scales to fill it — cropping edges rather than leaving gaps.

**Ratios:** `bp-media-16-9` `bp-media-4-3` `bp-media-3-2` `bp-media-1-1` `bp-media-3-4` `bp-media-2-3` `bp-media-21-9`

```html
<!-- Landscape photo in a 16:9 frame -->
<div class="bp-media bp-media-16-9">
  <img src="photo.jpg" alt="...">
</div>

<!-- Portrait product shot in a 3:4 frame -->
<div class="bp-media bp-media-3-4">
  <img src="product.jpg" alt="...">
</div>

<!-- SVG illustration treated like a photo -->
<div class="bp-media bp-media-4-3">
  <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">...</svg>
</div>
```
- Inner element gets `width: 100%; height: 100%; object-fit: cover` automatically
- `preserveAspectRatio="xMidYMid slice"` on SVG mirrors `object-fit: cover` behavior

---

## Forms

```html
<div class="bp-form-group">
  <label class="bp-label">
    Label <span class="bp-label-hint">(optional)</span>
  </label>
  <input type="text" class="bp-input" placeholder="Placeholder">
  <p class="bp-form-hint">Helper text</p>
  <p class="bp-form-error">Error message</p>
</div>

<textarea class="bp-textarea" placeholder="..."></textarea>

<!-- .bp-select-wrapper is required — it draws the custom dropdown arrow;
     a bare <select class="bp-select"> renders without one -->
<div class="bp-select-wrapper">
  <select class="bp-select">
    <option>Option</option>
  </select>
</div>

<!-- Error state -->
<input type="text" class="bp-input bp-input-error">

<!-- Checkbox -->
<label class="bp-checkbox">
  <input type="checkbox">
  <span class="bp-checkbox-label">Label text</span>
</label>

<!-- Radio -->
<label class="bp-radio">
  <input type="radio" name="group">
  <span class="bp-radio-label">Option</span>
</label>
```

**Rails helper:** `bp_input`, `bp_textarea`, and `bp_select` auto-detect errors from the form builder's model — no `error:` param needed.
```erb
<%= form_with model: @user do |f| %>
  <%= bp_form_group do %>
    <%= bp_label f, :email, "Email" %>
    <%= bp_input f, :email %>          <%# bp-input-error applied automatically if errors present %>
    <% if @user.errors[:email].any? %>
      <%= bp_form_error @user.errors[:email].first %>
    <% end %>
  <% end %>
  <%= bp_button "Save", variant: :primary, type: :submit %>
<% end %>
```
Pass `error: true` to force error state, `error: false` to suppress it.

### Switch / Toggle

CSS-only — a checkbox re-skinned as a sliding track/thumb. The `<input>` stays in the DOM (visually hidden, not `display:none`), so it's still keyboard-operable and reads correctly to screen readers.

```html
<label class="bp-switch">
  <input type="checkbox" class="bp-switch-input">
  <span class="bp-switch-track"></span>
</label>
```

### Auto-styling (one class on `<form>`, no per-element classes)

Add `bp-form` to a `<form>` element and every descendant `input`, `textarea`, `select`, and `button` is styled by element/type automatically — you don't need `bp-input`/`bp-textarea`/`bp-select`/`bp-btn-*` on each one. Any explicit class you *do* add to a child still overrides the auto-style (the auto-styling rules are specificity-zero under the hood, so a single class always wins).

```html
<form class="bp-form">
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <textarea placeholder="Message"></textarea>

  <!-- .bp-select-wrapper is still required for the dropdown arrow — auto-
       styling covers the select's border/background/padding, but it can't
       inject the wrapper div the custom chevron depends on. A bare
       <select> inside .bp-form renders with the browser's native arrow. -->
  <div class="bp-select-wrapper">
    <select><option>Choose</option></select>
  </div>

  <label><input type="checkbox"> I agree</label>  <!-- accent-color themed automatically -->

  <button type="submit">Save</button>   <!-- primary/filled — also the default for a type-less <button> -->
  <button type="button">Cancel</button> <!-- secondary -->
  <button type="reset">Reset</button>   <!-- ghost -->

  <!-- Override example: explicit class wins over the auto-style -->
  <input type="text" class="bp-input-error" placeholder="Still shows error state">
</form>
```

Button defaults are type-driven: `type="submit"` and a type-less `<button>` (the HTML spec treats it as submit inside a form) get the primary look, `type="button"` gets secondary, `type="reset"` gets ghost.

---

## Input Compose

A flex shell for a grow-in-place textarea paired with a send/submit action button. The textarea grows as the user types (requires 2 lines of JS); the action button stays vertically centered at all heights. Used for chat inputs, comment boxes, and any compose-and-send pattern.

```html
<div class="bp-input-compose">
  <textarea
    class="bp-input-compose-field"
    placeholder="Write a comment…"
    rows="1"
    id="composeField"
  ></textarea>
  <button class="bp-input-compose-action" disabled id="composeBtn">
    <svg .../>  <!-- send arrow icon -->
  </button>
</div>
```

**Required JS (copy-paste):**
```js
const field = document.getElementById('composeField');
const btn   = document.getElementById('composeBtn');

field.addEventListener('input', () => {
  field.style.height = 'auto';
  field.style.height = Math.min(field.scrollHeight, 200) + 'px';
  btn.disabled = field.value.trim() === '';
});

field.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!btn.disabled) btn.click();
  }
});
```

**Behavior:**
- Action button starts at `opacity: 0.3` (disabled) → `opacity: 1` (enabled) — controlled by the `disabled` attribute
- Focus-within: border goes primary, 3px ring appears via `box-shadow`
- Textarea grows up to `max-height: 200px` then scrolls
- Shift+Enter inserts a newline; Enter submits (add this in your JS as shown above)
- `bp-input-compose-field` is a bare `<textarea>` — do not also apply `bp-textarea` (they conflict)

---

## Badges

**Variants:** `bp-badge` (base — the default look, no modifier needed) `bp-badge-secondary` `bp-badge-success` `bp-badge-warning` `bp-badge-error` `bp-badge-outline`

```html
<span class="bp-badge">Label</span>
<span class="bp-badge bp-badge-success">Active</span>
<span class="bp-badge bp-badge-warning">Pending</span>
<span class="bp-badge bp-badge-error">Failed</span>
```

**Rails helper:** Icon is inferred from variant — `:success` → `✓`, `:warning` → `⚠`, `:error` → `✕`.
```erb
<%= bp_badge "Active",  variant: :success %>           <%# renders: ✓ Active %>
<%= bp_badge "Pending", variant: :warning %>           <%# renders: ⚠ Pending %>
<%= bp_badge "v2.4.1",  variant: :secondary %>         <%# no icon %>
<%= bp_badge "Live", variant: :success, icon: "●", icon_position: :append %>
<%= bp_badge "Active", variant: :success, icon: false %>  <%# suppress icon %>
```

---

## Chips / Tags

Inline pill labels for attributes, categories, flavors, status, or any small metadata that belongs in-line with text or inside a card. Smaller and lighter than badges — no icon implied.

**Variants:** `bp-chip` (base, primary tint) `bp-chip-outline` `bp-chip-secondary` `bp-chip-success` `bp-chip-warning` `bp-chip-error`

```html
<span class="bp-chip">Spicy</span>
<span class="bp-chip bp-chip-outline">Gluten-free</span>
<span class="bp-chip bp-chip-secondary">Archived</span>
<span class="bp-chip bp-chip-success">In stock</span>
<span class="bp-chip bp-chip-warning">Low stock</span>
<span class="bp-chip bp-chip-error">Discontinued</span>

<!-- Chip group — wrapping row with consistent gap -->
<div class="bp-chip-group">
  <span class="bp-chip">Tag one</span>
  <span class="bp-chip bp-chip-secondary">Tag two</span>
</div>
```

---

## Steps

Numbered process steps with large background numerals. Use `data-step` on each `.bp-step` to set the numeral content (CSS reads it via `attr(data-step)`).

**Column variants:** `bp-steps-2` `bp-steps-3` `bp-steps-4` `bp-steps-5` `bp-steps-6` (collapse to 1-col at 768px)

```html
<div class="bp-steps bp-steps-3">
  <div class="bp-step" data-step="01">
    <div class="bp-step-number">Step 01</div>
    <div class="bp-step-title">Step title</div>
    <p class="bp-step-body">What happens in this step and why it matters.</p>
  </div>
  <div class="bp-step" data-step="02">...</div>
  <div class="bp-step" data-step="03">...</div>
</div>
```

---

## Fact List

Label-left / value-right rows with hairline separators. Use for studio credentials, product specs, film credits, structured key-value data that shouldn't feel like a table.

**Modifiers:** `bp-fact-list-sm` (compact rows) `bp-fact-list-wide-label` (2fr/3fr instead of 1fr/2fr)

```html
<dl class="bp-fact-list">
  <div class="bp-fact">
    <dt class="bp-fact-label">Founded</dt>
    <dd class="bp-fact-value">2009, Oslo</dd>
  </div>
  <div class="bp-fact">
    <dt class="bp-fact-label">Staff</dt>
    <dd class="bp-fact-value">12 people</dd>
  </div>
  <div class="bp-fact">
    <dt class="bp-fact-label">Specialty</dt>
    <dd class="bp-fact-value">Heritage restoration, adaptive reuse</dd>
  </div>
</dl>

<!-- Compact variant -->
<dl class="bp-fact-list bp-fact-list-sm">...</dl>

<!-- Wide label column -->
<dl class="bp-fact-list bp-fact-list-wide-label">...</dl>
```

At narrow viewports (≤ 480px) each fact stacks label above value.

---

## Alerts

**Variants:** `bp-alert` (base — the default look, no modifier needed) `bp-alert-success` `bp-alert-warning` `bp-alert-error`

```html
<div class="bp-alert bp-alert-warning">
  <div class="bp-alert-icon">⚠</div>
  <div class="bp-alert-content">
    <div class="bp-alert-title">Warning title</div>
    Message text here.
  </div>
</div>
```

**Rails helper:** Icon is inferred from variant — `:success` → `✓`, `:warning` → `⚠`, `:error` → `✕`.
```erb
<%= bp_alert variant: :success, title: "Saved!" do %>Your changes were saved.<% end %>
<%= bp_alert variant: :error do %><%= @error_message %><% end %>
<%= bp_alert variant: :default, icon: "🔒", title: "Secure" do %>Encrypted.<% end %>
<%= bp_alert variant: :warning, icon: false do %>No icon.<% end %>
```

---

## Toasts

Ephemeral notifications, distinct from `bp-alert` (which is inline/persistent). `bp-toast-container` fixes to the bottom-right corner and stacks children; JS is responsible for appending/removing individual `bp-toast` elements (no built-in auto-dismiss timer in the CSS).

**Variants:** `bp-toast` (base — neutral surface, no modifier needed) `bp-toast-success` `bp-toast-warning` `bp-toast-error`

```html
<div class="bp-toast-container">
  <div class="bp-toast bp-toast-success">Changes saved.</div>
  <div class="bp-toast bp-toast-error">Something went wrong.</div>
</div>
```

---

## Accordion

CSS-only — built on native `<details>`/`<summary>`, no JS required for open/close, keyboard support, or screen-reader expandable state.

```html
<!-- Standalone items — each opens/closes independently -->
<details class="bp-accordion" open>
  <summary class="bp-accordion-trigger">Question one</summary>
  <div class="bp-accordion-content">Answer text.</div>
</details>
<details class="bp-accordion">
  <summary class="bp-accordion-trigger">Question two</summary>
  <div class="bp-accordion-content">Answer text.</div>
</details>

<!-- Grouped — shared outer border, dividers between items instead of gaps -->
<div class="bp-accordion-group">
  <details class="bp-accordion">
    <summary class="bp-accordion-trigger">First item</summary>
    <div class="bp-accordion-content">...</div>
  </details>
  <details class="bp-accordion">
    <summary class="bp-accordion-trigger">Second item</summary>
    <div class="bp-accordion-content">...</div>
  </details>
</div>

<!-- Exclusive group — same name="" on sibling <details> makes only one
     open at a time. Native browser behavior, not CSS. -->
<details class="bp-accordion" name="faq">...</details>
<details class="bp-accordion" name="faq">...</details>
```

---

## Tabs

CSS-only — built on hidden radio inputs plus `:has()`, no JS required for switching. Panels are matched to inputs by *position* (1st panel shows when the 1st input is checked, etc.), not by matching ids, so the `.bp-tabs-panels` wrapper is required — it's what makes `:nth-of-type` count only panels instead of also counting the `.bp-tabs-list` div. Supports up to 8 tabs per group.

```html
<div class="bp-tabs">
  <div class="bp-tabs-list" role="tablist">
    <input type="radio" name="tabs-1" class="bp-tabs-input" id="tab-1" checked>
    <label class="bp-tabs-trigger" for="tab-1">One</label>
    <input type="radio" name="tabs-1" class="bp-tabs-input" id="tab-2">
    <label class="bp-tabs-trigger" for="tab-2">Two</label>
    <input type="radio" name="tabs-1" class="bp-tabs-input" id="tab-3">
    <label class="bp-tabs-trigger" for="tab-3">Three</label>
  </div>
  <div class="bp-tabs-panels">
    <div class="bp-tabs-panel">Panel one content</div>
    <div class="bp-tabs-panel">Panel two content</div>
    <div class="bp-tabs-panel">Panel three content</div>
  </div>
</div>
```

Give each `.bp-tabs` group's inputs a unique `name` — that's what keeps separate tab groups on the same page from fighting over selection state (same mechanism as native radio button groups anywhere else).

---

## Tooltip

CSS-only — shows via `:hover`/`:focus-within`, no JS required. Positions above-center only, with no automatic viewport-edge flipping: a tooltip near the top or side edge of the viewport can render off-screen. Flipping to stay on-screen requires measuring position at show-time, which needs JS — that's a known limit of a CSS-only implementation, not a bug.

```html
<span class="bp-tooltip">
  <button class="bp-tooltip-trigger">Hover me</button>
  <span class="bp-tooltip-bubble" role="tooltip">Helpful tooltip text</span>
</span>
```

`.bp-tooltip-trigger` is not a required class — any focusable element works as the trigger (button, link, etc.); `.bp-tooltip` just needs `position: relative` (already set) and the bubble as its direct child. Use `role="tooltip"` on the bubble for screen readers.

---

## Dropdown

Requires JS for outside-click-to-close — `:focus-within` alone can't detect a click landing elsewhere on the page. Use the Rails Stimulus controller (`rails/javascript/controllers/dropdown_controller.js`, see the Rails integration README) or the React `<Dropdown>` component, which is self-contained and manages its own state.

```html
<div class="bp-dropdown"
     data-controller="dropdown"
     data-action="click@window->dropdown#outsideClick keydown.esc@window->dropdown#close">
  <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->dropdown#toggle">
    Menu
  </button>

  <div class="bp-dropdown-menu bp-hidden" data-dropdown-target="menu">
    <a class="bp-dropdown-item" href="#" data-action="click->dropdown#close">Item one</a>
    <div class="bp-dropdown-divider"></div>
    <button class="bp-dropdown-item" data-action="click->dropdown#close">Item two</button>
  </div>
</div>
```

The menu must start with both `bp-dropdown-menu` and `bp-hidden` — the controller only ever toggles `bp-hidden`, so the CSS stays the single source of truth for appearance. Add `bp-dropdown-menu-right` to right-align the menu to its trigger (e.g. a user menu at the end of a navbar). `data-action="click->dropdown#close"` on individual items is optional — a filter menu with checkboxes may want to stay open after a selection.

**React:**
```tsx
<Dropdown trigger={<button className="bp-btn bp-btn-secondary bp-btn-sm">Menu</button>}>
  <DropdownItem href="#">Item one</DropdownItem>
  <DropdownDivider />
  <DropdownItem onClick={() => console.log('clicked')}>Item two</DropdownItem>
</Dropdown>
```

`DropdownItem` renders an `<a>` when given `href`, otherwise a `<button type="button">`. Pass `closeOnClick={false}` to keep the menu open after a click (e.g. a checkbox filter item).

---

## Pricing Cards

```html
<div class="bp-pricing-card">                        <!-- standard -->
<div class="bp-pricing-card bp-pricing-card-featured"> <!-- highlighted -->

<div class="bp-pricing-card">
  <div class="bp-pricing-plan">Pro</div>
  <div class="bp-pricing-price">
    <span class="bp-pricing-amount">$49</span>
    <span class="bp-pricing-period">/ mo</span>
  </div>
  <p class="bp-pricing-description">Plan description.</p>
  <ul class="bp-pricing-features">
    <li class="bp-pricing-feature">
      <svg class="bp-pricing-feature-check" .../>  <!-- green check -->
      Feature name
    </li>
    <li class="bp-pricing-feature">
      <svg class="bp-pricing-feature-x" .../>      <!-- muted x -->
      <span style="color: var(--color-text-muted)">Unavailable feature</span>
    </li>
  </ul>
  <a href="#" class="bp-btn bp-btn-primary bp-w-full">Get started</a>
</div>
```

### "Most Popular" badge on a featured card
There's no dedicated ribbon class — `.bp-pricing-card` is already `position: relative; display: flex; flex-direction: column;`, so the idiomatic way in is a `.bp-badge` as the card's first child. It sits in normal flow, above the plan name:
```html
<div class="bp-pricing-card bp-pricing-card-featured">
  <span class="bp-badge bp-self-start">Most Popular</span>
  <div class="bp-pricing-plan">Pro</div>
  ...
</div>
```
For a corner ribbon that overlaps the card edge instead, use `bp-absolute bp-top-0` on the badge with an inline `right`/transform offset — there's no purpose-built utility for that placement, so it needs an inline style either way.

---

## Stats

```html
<div class="bp-stat">
  <span class="bp-stat-value">99.9%</span>
  <span class="bp-stat-label">Uptime</span>
  <span class="bp-stat-change bp-stat-change-up">0.1%</span>   <!-- green, arrow added by Rails helper -->
  <span class="bp-stat-change bp-stat-change-down">2ms</span>  <!-- red, arrow added by Rails helper -->
</div>
```

**Rails helper:** Arrow is inferred from `direction:` — pass only the value in `change:`.
```erb
<%= bp_stat value: "99.9%", label: "Uptime",    change: "0.1%", direction: :up %>
<%= bp_stat value: "12ms",  label: "Latency",   change: "2ms",  direction: :down %>
<%= bp_stat value: "42ms",  label: "P99",       change: "5ms",  direction: :down, arrow_position: :append %>
<%= bp_stat value: "8",     label: "Open",      change: "same", direction: :neutral %>
<%# custom arrow or suppress %>
<%= bp_stat value: "99%",   label: "Uptime",    change: "0.1%", direction: :up, icon: "▲" %>
<%= bp_stat value: "99%",   label: "Uptime",    change: "0.1%", direction: :up, icon: false %>
```

---

## Table

```html
<div class="bp-table-wrapper">
  <table class="bp-table">
    <thead>
      <tr>
        <th>Column</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Value</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Avatar

**Sizes:** `bp-avatar-sm` (32px) `bp-avatar-md` (40px) `bp-avatar-lg` (48px) `bp-avatar-xl` (64px)

```html
<div class="bp-avatar bp-avatar-md">JD</div>         <!-- initials -->
<div class="bp-avatar bp-avatar-md"><img src="..."></div>  <!-- image -->
```

---

## Testimonial

```html
<div class="bp-testimonial">
  <p class="bp-testimonial-quote">"Quote text here."</p>
  <div class="bp-testimonial-author">
    <div class="bp-avatar bp-avatar-md">AB</div>
    <div>
      <div class="bp-testimonial-name">Person Name</div>
      <div class="bp-testimonial-role">Role · Company</div>
    </div>
  </div>
</div>
```

---

## Modal

```html
<div class="bp-overlay">
  <div class="bp-modal">
    <div class="bp-modal-header">
      <span class="bp-modal-title">Title</span>
      <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm">✕</button>
    </div>
    <div class="bp-modal-body">Content</div>
    <div class="bp-modal-footer">
      <button class="bp-btn bp-btn-secondary bp-btn-sm">Cancel</button>
      <button class="bp-btn bp-btn-primary bp-btn-sm">Confirm</button>
    </div>
  </div>
</div>
```

For open/close/backdrop-click/Escape wiring, see the Rails Stimulus controller (`rails/javascript/controllers/modal_controller.js`, documented in the Rails integration README) — it toggles `bp-hidden` on `.bp-overlay`, so the overlay must start with `class="bp-overlay bp-hidden"` when JS-driven.

---

## Drawer

Requires JS — see `rails/javascript/controllers/drawer_controller.js` (Rails integration README) or the React `<Drawer>` component. Unlike modal, both the overlay and panel stay in the DOM at all times and slide/fade via a `bp-drawer-open` class — a transform/opacity transition can't play if the element goes to `display:none` first, so this doesn't use the `bp-hidden` utility.

```html
<div class="bp-drawer-overlay" data-drawer-target="overlay">
  <div class="bp-drawer" tabindex="-1" data-drawer-target="panel">
    <div class="bp-drawer-header">
      <span class="bp-drawer-title">Filters</span>
      <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm">✕</button>
    </div>
    <div class="bp-drawer-body">Content</div>
    <div class="bp-drawer-footer">
      <button class="bp-btn bp-btn-secondary bp-btn-sm">Cancel</button>
      <button class="bp-btn bp-btn-primary bp-btn-sm">Apply</button>
    </div>
  </div>
</div>
```

Add `bp-drawer-left` on `.bp-drawer` to slide in from the left instead of the right (the default). Because a drawer typically holds more content and stays open longer than a modal confirmation, both the Stimulus controller and the React component trap Tab/Shift+Tab focus inside the panel while open — losing focus to the page behind it is a bigger accessibility gap here than in the modal controller, which only does basic focus-on-open.

**React:**
```tsx
const [open, setOpen] = useState(false)

<Drawer open={open} onClose={() => setOpen(false)}>
  <DrawerHeader>
    <DrawerTitle>Filters</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>Content</DrawerBody>
  <DrawerFooter>
    <button className="bp-btn bp-btn-secondary bp-btn-sm" onClick={() => setOpen(false)}>Cancel</button>
    <button className="bp-btn bp-btn-primary bp-btn-sm">Apply</button>
  </DrawerFooter>
</Drawer>
```

`<Drawer>` is controlled (`open`/`onClose`) like `<Modal>`, but — matching the Stimulus controller — it also bakes in Escape-to-close, backdrop-click, body scroll lock, and the focus trap itself, rather than leaving those to the consumer.

---

## Divider

```html
<div class="bp-divider">or</div>         <!-- text divider with lines -->
<div class="bp-dashed-connector"></div>  <!-- dashed horizontal line -->
```

---

## Progress & Spinner

**Progress bar variants:** `bp-progress-bar` (base — primary color) `bp-progress-bar-success` `bp-progress-bar-warning` `bp-progress-bar-error`

```html
<div class="bp-progress">
  <div class="bp-progress-bar" style="width: 60%"></div>
</div>

<div class="bp-progress">
  <div class="bp-progress-bar bp-progress-bar-success" style="width: 100%"></div>
</div>
```

Width is set inline (or via JS) per instance — the track (`bp-progress`) is the fixed 100%-wide shell, `bp-progress-bar` is the fill.

```html
<div class="bp-spinner" aria-label="Loading"></div>
```

`bp-spinner` is a bare rotating ring — no wrapper markup needed. Rotation speed follows `--duration-spin`, which (like all durations) scales with `--motion-scale`, so it respects a reduced-motion override.

---

## Skeleton Loading

```html
<div class="bp-skeleton bp-skeleton-title"></div>   <!-- wide bar -->
<div class="bp-skeleton bp-skeleton-text"></div>    <!-- text line -->
<div class="bp-skeleton" style="height: 200px;"></div>  <!-- custom size -->
```

### Grid-unit sizes (snap to the 40px blueprint grid)
```html
<div class="bp-skeleton bp-skeleton-1u"></div>  <!-- 40px  -->
<div class="bp-skeleton bp-skeleton-2u"></div>  <!-- 80px  -->
<div class="bp-skeleton bp-skeleton-3u"></div>  <!-- 120px -->
<div class="bp-skeleton bp-skeleton-4u"></div>  <!-- 160px -->
<div class="bp-skeleton bp-skeleton-6u"></div>  <!-- 240px -->
```

### bp-skeleton-card — zero layout shift card placeholder
Matches `bp-card` exactly (same padding, border, border-radius). When real content loads, the swap causes no layout shift. Apply `bp-skeleton` to inner children for shimmer.
```html
<div class="bp-skeleton-card">
  <div class="bp-skeleton bp-skeleton-1u" style="width: 48px; height: 48px; border-radius: var(--bp-radius-lg);"></div>
  <div class="bp-skeleton bp-skeleton-1u" style="width: 140px;"></div>
  <div class="bp-skeleton bp-skeleton-1u" style="width: 100%;"></div>
  <div class="bp-skeleton bp-skeleton-1u" style="width: 80%;"></div>
</div>
```

### Skeleton pages as wireframe deliverables
Build a full page layout using only `bp-skeleton-*` classes. The result is simultaneously an interactive wireframe and the real production loading state — the same file serves both purposes. See `examples/wireframe.html` for a complete implementation.

---

## Blueprint Decorative Utilities

These give pages the blueprint character. Use sparingly.

```html
<!-- Corner bracket decoration — add to any relative-positioned element -->
<div class="bp-card bp-bracket">...</div>

<!-- Monospace coordinate/reference label -->
<span class="bp-mono-label">REF: AX-2.4.1</span>

<!-- Annotation with left border -->
<p class="bp-annotation">Side note or annotation text</p>
```

### Gradient text
```html
<span class="bp-text-gradient">Highlighted phrase</span>
```

---

## Utility Classes

### Display & Flex
```
bp-flex  bp-inline-flex  bp-block  bp-hidden  bp-grid-bare  (bare display:grid, no gap — see .bp-grid for the layout component)
bp-flex-col  bp-flex-row  bp-flex-wrap
bp-items-start  bp-items-center  bp-items-end  bp-items-stretch
bp-self-start  bp-self-center  bp-self-end  bp-self-stretch   (override align-items for one flex child)
bp-justify-start  bp-justify-center  bp-justify-end  bp-justify-between
bp-flex-1  bp-flex-none  bp-shrink-0  bp-grow
bp-gap-1  bp-gap-2  bp-gap-3  bp-gap-4  bp-gap-5  bp-gap-6  bp-gap-8  bp-gap-10  bp-gap-12
```

### Spacing (padding)
The scale is sparse — only these rungs exist, not every integer in between.
```
bp-p-{0|1|2|3|4|5|6|8|10|12}   bp-px-{3|4|5|6|8}   bp-py-{2|3|4|5|6|8|12|16|20}
```

### Spacing (margin)
```
bp-m-auto  bp-mx-auto
bp-mb-{1|2|3|4|5|6|8|10|12|16}   bp-mt-{1|2|3|4|5|6|8|10|12|16}
```

### Typography
```
bp-text-{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl}
bp-font-{light|normal|medium|semibold|bold}
bp-font-sans  bp-font-mono
bp-leading-{tight|snug|normal|relaxed}
bp-tracking-{tight|normal|wide|wider|widest}
bp-text-{left|center|right}
bp-uppercase  bp-lowercase  bp-capitalize
bp-truncate  bp-italic
```

### Typography Voices
Named typographic registers — answer "what role is this text playing?" not "how big is it?". Combine with `bp-text-{size}` to control scale independently of voice.

```html
<!-- Functional label — mono, caps, wide tracking; field labels, spec metadata -->
<span class="bp-text-label">Material</span>

<!-- Editorial voice — serif italic; pull quotes, liner notes, long-form captions -->
<p class="bp-text-editorial">The record began not with a composition but a question.</p>

<!-- Identity voice — bold display, tight tracking; wordmarks, hero numerals -->
<h1 class="bp-text-identity bp-text-6xl">VOLTA.</h1>
```

| Class | Font | Style | Use for |
|---|---|---|---|
| `bp-text-label` | mono | caps, xs, widest tracking | Labels, credits, metadata |
| `bp-text-editorial` | heading (serif) | italic, relaxed leading | Long-form prose, captions |
| `bp-text-identity` | heading | bold, tight tracking | Wordmarks, large callouts |

### Colors
```
bp-text-body      bp-text-secondary   bp-text-muted   bp-text-primary   bp-text-accent
bp-text-success   bp-text-warning     bp-text-error
bp-bg-base        bp-bg-secondary     bp-bg-surface       bp-bg-primary-subtle
```
Two-tone brand naming: `bp-bg-secondary`/`bp-text-secondary` are already taken by the UI-semantic layer (secondary background, secondary text), so the *brand* secondary color's utilities use a `brand-` infix instead — `bp-text-brand-secondary` / `bp-bg-brand-secondary`. These are the canonical forms, not deprecated aliases.

### Border & Radius
```
bp-border  bp-border-t  bp-border-b  bp-border-l  bp-border-r  bp-border-none
bp-border-primary  bp-border-secondary
bp-rounded-{none|sm|lg|xl|2xl|full}   bp-rounded (unsuffixed = the "md" rung)
```

### Shadow
```
bp-shadow-none  bp-shadow-sm  bp-shadow-md  bp-shadow-lg  bp-shadow-glow
```

### Sizing & Position
```
bp-w-full  bp-w-auto  bp-h-full  bp-h-screen  bp-min-h-screen
bp-relative  bp-absolute  bp-fixed  bp-sticky
bp-inset-0  bp-top-0  bp-overflow-hidden  bp-overflow-auto
```

### Interactive
```
bp-hover-lift      → translateY(-2px) + shadow on hover
bp-hover-glow      → glow shadow on hover
bp-hover-lift-glow → both effects combined
bp-clickable       → cursor pointer, no tap highlight
bp-disabled        → 40% opacity, pointer-events none
bp-cursor-pointer
```
Do not stack `bp-hover-lift` and `bp-hover-glow` on the same element — equal-specificity cascade order silently drops one effect's shadow. Use `bp-hover-lift-glow` for the combined effect instead.

### Blur (backdrop-filter)
```
bp-blur-sm   bp-blur-md   bp-blur-lg
```

### Prose
```
bp-prose   → typographic defaults (spacing, line-height, link/list styling) for long-form rendered content (e.g. markdown output)
```

### Responsive
```
bp-hide-mobile    → hidden below 768px
bp-hide-desktop   → hidden above 768px
```

---

## Motion

### Page-level draw animation
Add `data-bp-motion="draw"` to `<html>` alongside the theme:
```html
<html data-bp-theme="dark" data-bp-motion="draw">
```
A primary-colored line sweeps left-to-right across the top of the page, then `.bp-nav`, `.bp-hero`, `.bp-section`, and `.bp-footer` fade up in sequence — like a draftsman sketching layout before filling it in. Automatically disabled when `prefers-reduced-motion` is set.

### bp-animate — bounce transitions on a container
Rescopes `--bp-transition-*` tokens to the bounce curve within the container. All child buttons, cards, links, and nav items automatically use it — no per-element overrides.
```html
<div class="bp-animate">
  <button class="bp-btn bp-btn-primary">Bouncy button</button>
  <div class="bp-card bp-card-hover">Bouncy card</div>
</div>
```

### bp-animate-draw — border drawn clockwise on scroll entry
Draws the element border clockwise (top → right → bottom → left) using animated background gradients. Triggers when the element enters the viewport via `animation-timeline: view()`. Falls back to a page-load animation in older browsers. Safe to combine with `bp-bracket`.
```html
<div class="bp-card bp-animate-draw">...</div>
<div class="bp-card bp-bracket bp-animate-draw">...</div>  <!-- works fine -->
```

---

## Print Mode

Print mode fires automatically via `@media print` (Ctrl+P / `window.print()`). No extra class needed — the stylesheet handles it.

**What happens automatically:**
- White background, low-opacity navy grid (structural, not decorative)
- Navigation and interactive chrome stripped
- Buttons render as plain text links
- Glow shadows, transforms, animations removed
- `bp-annotation` floats right as a margin note (28% width)
- `bp-stat` collapses from card to compact labeled data rows
- Page numbers appear in the footer via CSS counter

### `bp-print-spec` — formal specification mode
Add `bp-print-spec` to any `<section>`. Each `bp-card` inside becomes a numbered requirement block (`REQ-01`, `REQ-02`, ...). Pricing cards use `TIER-01` numbering.

```html
<!-- A pricing section printed as a formal proposal -->
<section class="bp-section bp-print-spec">
  <div class="bp-container">
    <div class="bp-grid bp-grid-3">
      <div class="bp-pricing-card">...</div>   <!-- prints as TIER-01 -->
      <div class="bp-pricing-card">...</div>   <!-- prints as TIER-02 -->
    </div>
  </div>
</section>
```

---

## Footer

```html
<footer class="bp-footer">
  <div class="bp-container">
    <div class="bp-footer-grid">
      <div>
        <div class="bp-footer-brand-name">Brand</div>
        <p class="bp-footer-brand-desc">Short description.</p>
      </div>
      <div>
        <div class="bp-footer-col-title">Column</div>
        <ul class="bp-footer-links">
          <li><a href="#" class="bp-footer-link">Link</a></li>
        </ul>
      </div>
    </div>
    <div class="bp-footer-bottom">
      <span class="bp-footer-copy">© 2026 Company</span>
      <div class="bp-flex bp-gap-4">
        <a href="#" class="bp-footer-link">Privacy</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Common Page Patterns

### Standard landing page structure
```html
<nav class="bp-nav">...</nav>
<section class="bp-hero bp-container">...</section>
<section class="bp-section">                     <!-- features -->
  <div class="bp-container">
    <div class="bp-section-header">...</div>
    <div class="bp-grid bp-grid-3">
      <div class="bp-card bp-card-hover bp-card-feature">...</div>
    </div>
  </div>
</section>
<section class="bp-section" style="background-color: var(--color-bg-secondary);">  <!-- pricing -->
  <div class="bp-container">
    <div class="bp-grid bp-grid-3">
      <div class="bp-pricing-card">...</div>
    </div>
  </div>
</section>
<footer class="bp-footer">...</footer>
```

### App / dashboard layout
```html
<div class="bp-app-layout">
  <aside class="bp-sidebar">...</aside>
  <main class="bp-main-content">
    <!-- sticky topbar -->
    <div style="position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--color-border); ...">
    </div>
    <div style="padding: 2rem;">
      <div class="bp-grid bp-grid-4">
        <div class="bp-card bp-bracket">...</div>  <!-- stat cards -->
      </div>
    </div>
  </main>
</div>
```

### Full-screen focused (waitlist, coming soon, 404)
```html
<body style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
  <!-- No nav. One job. -->
</body>
```

### Alternating background sections
```html
<section class="bp-section">                                                          <!-- white -->
<section class="bp-section" style="background-color: var(--color-bg-secondary);">     <!-- tinted -->
<section class="bp-section">                                                          <!-- white again -->
```

### Dark contrast band
```html
<section class="bp-section-lg bp-section-invert">
  <div class="bp-container">
    <!-- text and bp-card tokens invert automatically inside bp-section-invert -->
  </div>
</section>
```

### Full-bleed photographic hero + editorial intro
```html
<section class="bp-hero-full">
  <img src="hero.jpg" class="bp-hero-full-bg" alt="">
  <div class="bp-hero-full-caption">
    <h1 style="font-size: var(--bp-text-4xl); color: #fff;">Headline</h1>
    <p style="color: rgba(255,255,255,0.8);">Supporting text.</p>
  </div>
</section>
<section class="bp-section">
  <div class="bp-container">
    <div class="bp-split bp-split-40-60">
      <div><!-- intro heading --></div>
      <div><!-- body paragraph --></div>
    </div>
  </div>
</section>
```

---

## CSS Variables Available Everywhere

Two layers of tokens are always accessible. **Prefer semantic aliases** — they respond to brand overrides. Use `--bp-*` raw tokens only when you need a value that must never shift with branding.

### Semantic aliases (brand-responsive — prefer these)

    Colors — primary
      --color-primary           Main accent (default: blueprint blue)
      --color-primary-hover     Darkened primary for hover states
      --color-primary-subtle    12% opacity tint of primary
      --color-primary-glow      25% opacity tint for glows
      --color-on-primary        Text on primary backgrounds (default: #fff)

    Colors — secondary accent
      --color-secondary         Second brand color (default: muted text)
      --color-secondary-hover   Hover variant of secondary
      --color-secondary-subtle  12% tint of secondary

    Colors — surface & background
      --color-bg                Page background
      --color-bg-secondary      Slightly elevated background
      --color-surface           Card / panel surface
      --color-surface-elevated  Elevated surface (modals, popovers)
      --color-border            Default border color

    Colors — text
      --color-text              Primary readable text
      --color-text-secondary    Subdued label text
      --color-text-muted        Placeholder / hint text
      --color-text-accent       Highlighted / link text

    Colors — state
      --color-success  --color-warning  --color-error
      --color-success-subtle  --color-warning-subtle  --color-error-subtle
      --color-{success|warning|error}-hover  --color-{success|warning|error}-glow  --color-{success|warning|error}-transparent
      --color-on-{success|warning|error}     Text color on state-filled surfaces
      --color-text-{success|warning|error}   Readable state text on the page background (not a filled surface)

    Colors — primary/secondary, additional derived forms
      --color-primary-transparent    Fully-transparent end-stop of primary (for gradient fades)
      --color-secondary-glow  --color-secondary-transparent
      --color-on-secondary           Text on secondary-filled surfaces

    Colors — overlay
      --overlay-bg              Dark overlay behind modals (default: rgba(0,0,0,0.6))
      --overlay-scrim           Scrim behind drawers (default: rgba(0,0,0,0.5))

    Typography
      --font-heading            Heading font family
      --font-body               Body font family
      --font-mono               Monospace font family
      --font-size-base          Root font size (default: 16px)
      --font-weight-heading     Heading weight (default: 600)
      --font-weight-body        Body weight (default: 400)
      --line-height-base        Body line height (default: 1.5)
      --line-height-heading     Heading line height (default: 1.25)
      --letter-spacing-heading  Heading tracking (default: -0.025em)

    Typography — full scales (use these over the raw --bp-text-*/--bp-weight-* primitives)
      --font-size-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl}   Type scale, xs=12px through 6xl=60px
      --font-size-{h1|h2|h3|h4|h5|h6}                     Heading rungs, h1=5xl down to h6=lg
      --font-weight-{light|normal|medium|semibold|bold}   300 / 400 / 500 / 600 / 700
      --line-height-{display|tight|snug|normal|relaxed}   1.1 / 1.25 / 1.375 / 1.5 / 1.625
      --letter-spacing-{tight|normal|wide|wider|widest}   -0.025em / 0 / 0.025em / 0.05em / 0.1em

    Layout & structure
      --radius                  Base border radius (default: 0.375rem — alias for --radius-md)
      --radius-{none|sm|md|lg|xl|2xl|full}   Full radius scale (0 / 0.25rem / 0.375rem / 0.5rem / 0.75rem / 1rem / 9999px)
      --space-unit              Base spacing unit (default: 1rem)
      --space-{1|2|3|4|5|6|8|10|12|16|20|24|32|40}   Spacing scale, 1=4px through 40=160px
      --z-{base|raised|dropdown|sticky|overlay|modal|toast|draw}   Stacking order, 0 through 600
      --transition-{fast|base|smooth|bounce}   Prebuilt `all <duration> <easing>` shorthands — reach for these before composing duration+easing by hand
      --container-{sm|md|lg|xl|2xl}   Max-width rungs, sm=640px through 2xl=1440px
      --container-pad           Container side padding (default: 1.5rem)
      --grid-gap                Gap between grid columns (default: 1.5rem)
      --sidebar-width           Dashboard sidebar width (default: 256px)
      --nav-height              Top navigation bar height (default: 64px)
      --split-ratio             Two-column grid template (default: 1fr 1fr)
      --content-width           Readable prose column max-width (default: 65ch)

    Border
      --border-width            Border thickness (default: 1px)
      --border-style            Border style (default: solid)

    Focus ring — do not remove, accessibility requirement
      --focus-ring-color        Focus outline color (default: --color-primary)
      --focus-ring-width        Focus outline thickness (default: 2px)
      --focus-ring-offset       Focus outline offset (default: 2px)

    Blur / glass
      --blur-sm                 Subtle blur (default: 4px)
      --blur-md                 Mid blur for nav glass (default: 12px)
      --blur-lg                 Heavy frosted glass (default: 20px)

    Interactive feedback
      --lift-distance           Card hover lift height (default: 2px)
      --opacity-disabled        Disabled element opacity (default: 0.4)
      --opacity-idle            Idle / resting opacity (default: 0.3)
      --bracket-size            Corner bracket decoration size (default: 12px)

    Motion
      --motion-scale      Animation personality dial: 0=instant, 0.5=snappy, 1=default, 2=expressive
                          All transition durations multiply by this value. 0 silences every animation.
      --duration-fast     calc(0.15s × --motion-scale)
      --duration-base     calc(0.20s × --motion-scale)
      --duration-slow     calc(0.30s × --motion-scale)
      --duration-reveal   calc(0.40s × --motion-scale)   (used for bounce transitions)
      --easing-smooth     cubic-bezier(0.4, 0, 0.2, 1)
      --easing-bounce     cubic-bezier(0.34, 1.56, 0.64, 1)

    Shadows (semantic)
      --shadow-sm  --shadow-md  --shadow-lg  --shadow-glow

    Component sizing
      --card-padding            Card internal padding (default: 1.5rem)
      --btn-height-xs  28px  --btn-height-sm  34px  --btn-height-md  40px
      --btn-height-lg  48px  --btn-height-xl  56px
      --input-height            Single-line input height (default: 40px)
      --textarea-min-height     Textarea minimum height (default: 100px)
      --modal-max-width  520px  --modal-max-height  90vh
      --toast-max-width  380px
      --hero-title-max-width      800px
      --hero-subtitle-max-width   600px
      --section-header-max-width  640px

### Component tokens (per-component tuning dials)

These are scoped to a component root. Set them on `.bp-nav`, `.bp-btn`, `.bp-card`, etc. in `brand.css` to override just that component without touching any global token. They fall back to the global semantic aliases by default.

    Nav
      --nav-bg            Base color under the frosted glass (default: --color-bg)
      --nav-blur          Backdrop blur intensity (default: --blur-md = 12px)
      --nav-border        Bottom divider color (default: --color-border)
      --nav-link-color    Resting nav link text color (default: --color-text-secondary)

    Button
      --btn-radius        Border radius — pill (9999px) vs rounded vs sharp (0) (default: --radius)
      --btn-font          Font family for button labels (default: --font-body)
      --btn-font-weight   Font weight for button labels (default: 500)

    Card
      --card-bg           Card background (default: --color-surface)
      --card-radius       Card corner radius (default: --bp-radius-lg = 0.5rem)
      --card-border-color Card border color (default: --color-border)
      --card-shadow       Card resting shadow (default: --bp-shadow-sm)

    Badge
      --badge-radius      Badge corner radius — pill vs square (default: --bp-radius-sm = 0.25rem)

    Chip
      --chip-radius       Chip corner radius — default is full pill (9999px)

    Sidebar
      --sidebar-bg        Sidebar panel background (default: --color-bg-secondary)
      --sidebar-border    Right edge divider (default: --color-border)

    Inputs (bp-input, bp-textarea, bp-select)
      --input-bg          Input field background (default: --color-surface)
      --input-radius      Input corner radius (default: --radius)
      --input-border      Input resting border color (default: --color-border)

    Footer
      --footer-bg         Footer background — transparent by default (inherits page bg)
      --footer-border     Top divider color (default: --color-border)

    Overlay & Modal
      --overlay-blur      Backdrop blur behind modals (default: --blur-sm = 4px)
      --modal-bg          Modal panel background (default: --color-surface)
      --modal-radius      Modal corner radius (default: --bp-radius-xl = 0.75rem)

Example brand.css — pill buttons, square cards, dark footer, sharp modals:

    .bp-btn    { --btn-radius: 9999px; }
    .bp-card   { --card-radius: 0; --card-bg: var(--color-bg); }
    .bp-footer { --footer-bg: var(--color-bg); }
    .bp-modal  { --modal-radius: 0; --overlay-blur: 0px; }

### Raw blueprint tokens (not affected by brand overrides)

    Spacing:  var(--bp-space-{1|2|3|4|5|6|8|10|12|16|20|24|32})
    Shadows:  var(--bp-shadow-sm)  var(--bp-shadow-md)  var(--bp-shadow-lg)  var(--bp-shadow-glow)
    Radius:   var(--bp-radius-{none|sm|md|lg|xl|2xl|full})
    Motion:   var(--bp-transition-fast)  var(--bp-transition-base)  var(--bp-transition-smooth)  var(--bp-transition-bounce)
    Z-index:  var(--bp-z-{base|raised|dropdown|sticky|overlay|modal|toast})
    Fonts:    var(--bp-font-sans)  var(--bp-font-mono)
    Text:     var(--bp-text-{xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl})
    Weight:   var(--bp-weight-{light|normal|medium|semibold|bold})
    Leading:  var(--bp-leading-{tight|snug|normal|relaxed})
    Tracking: var(--bp-tracking-{tight|normal|wide|wider|widest})
    Blue:     var(--bp-blue-{50|100|200|300|400|500|600|700|800|900})
    State:    var(--bp-success)  var(--bp-warning)  var(--bp-error)
              (no raw "-subtle" primitives — use the semantic --color-{success|warning|error}-subtle instead)
    Container: var(--bp-container-{sm|md|lg|xl|2xl})

---

## AI Agents

The Point ships with two Claude Code agents in `.claude/agents/`. Use them in Claude Code with `@blueprint` or `@copy`.

### @blueprint

Generates a complete `brand.css` + HTML page from a design interview or URL.

**Entry points:**
- `@blueprint` — blank slate; runs the full 8-question design interview (none technical — "glass office tower or bookshop?", "$50 or $5,000 decision?")
- `@blueprint https://example.com` — reads the URL's visual language, asks 3–4 personalizing questions
- `@blueprint` + image/screenshot — extracts aesthetic from the image, asks 3–4 questions
- `@blueprint` + existing `brand.css` — reads current vars, asks "Keep this direction or start fresh?"

**Outputs:**
- `brand.css` — only the variables that differ from The Point defaults
- A complete HTML file using `bp-` classes from this reference doc
- Placeholder text marked as `[Hero headline]`, `[CTA: primary action]`, `[Feature 1 name]`, etc.

**Skills loaded automatically:**
- `blueprint-taste.md` — bans AI-default aesthetics (dark purple palette, Inter Bold 72px, glowing orbs, glass morphism, 6-identical-card grids, uniform spacing)
- `blueprint-copywriter.md` — bans generic copy; runs two-branch interview for real copy signal

After generating HTML, Blueprint hands off to `@copy` to fill all placeholder text.

### @copy

Fills placeholder text in any existing The Point HTML file with real product copy.

**What it reads as placeholders:**
- Text in `[square brackets]`
- `<!-- placeholder -->` comments
- Generic strings: "Feature Name", "Subtitle goes here", "Your headline", "Lorem ipsum"

**Interview — two branches:**

Branch A (has customers):
> "What's the one thing your best customer said that made you realize you were onto something?"

Branch B (no customers yet) — three questions:
1. Describe the moment of frustration that made you know this was real
2. What does someone say right before they'd desperately want your product?
3. What does the Reddit post your ideal customer writes at 11pm look like?

**Banned phrases (never generated):**
- "Transform your workflow" / "Elevate your experience" / "Revolutionize how you X"
- "Effortlessly [verb]" / "Streamline your workflow" / "All-in-one solution"
- Any CTA ending in "today" / CTA that is exactly "Get started"
- Three-word value props: "Simple. Powerful. Yours."

**Produces for every page:**
- 3 headline variants (benefit-led, curiosity, direct)
- Subtitle that adds new information — does not restate the headline
- CTA text specific enough to only work for this product
- Feature descriptions starting with the outcome, not the capability
