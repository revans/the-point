# The Point — LLM Reference

A CSS design system with a blueprint aesthetic. One import, one optional brand file, works in any framework that renders HTML.

---

## Setup

```html
<html data-bp-theme="dark">   <!-- deep navy blueprint -->
<html data-bp-theme="light">  <!-- drafting paper blueprint -->
<html data-bp-theme="auto">   <!-- follows OS preference -->

<link rel="stylesheet" href="path/to/the-point/index.css">
<link rel="stylesheet" href="./brand.css">  <!-- optional -->
```

**Rails:** `*= require the-point/index` then `*= require brand`
**React/Vite:** `import 'path/to/the-point/index.css'` then `import './brand.css'`

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

| Variable | Role |
|---|---|
| `--color-primary` | Buttons, links, focus rings, active states |
| `--color-primary-hover` | Hover state of primary |
| `--color-primary-subtle` | Light tint backgrounds (badges, card hover) |
| `--color-primary-glow` | Glow shadows |
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
| `--font-heading` | Heading font-family |
| `--font-body` | Body font-family |
| `--font-mono` | Monospace font-family |
| `--radius` | Default border radius (use `var(--bp-radius-*)` values) |
| `--bp-grid-color` | Blueprint grid line opacity — set to `transparent` to remove |
| `--bp-grid-color-bold` | Bold grid lines — set to `transparent` to remove |

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
<section class="bp-section">     <!-- py-20 (80px) -->
<section class="bp-section-sm">  <!-- py-12 (48px) -->
<section class="bp-section-lg">  <!-- py-32 (128px) -->
```

### Grid
```html
<div class="bp-grid bp-grid-2">  <!-- 2 columns -->
<div class="bp-grid bp-grid-3">  <!-- 3 columns -->
<div class="bp-grid bp-grid-4">  <!-- 4 columns -->
```
All grids collapse to 1 column on mobile. 3- and 4-col go to 2-col at 1024px.

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

**Variants:** `bp-btn-primary` `bp-btn-secondary` `bp-btn-outline` `bp-btn-ghost` `bp-btn-destructive`
**Sizes:** `bp-btn-xs` `bp-btn-sm` *(default: md)* `bp-btn-lg` `bp-btn-xl`
**Icon-only:** add `bp-btn-icon`
**Full width:** add `bp-w-full`

```html
<button class="bp-btn bp-btn-primary">Primary</button>
<button class="bp-btn bp-btn-secondary bp-btn-sm">Small secondary</button>
<button class="bp-btn bp-btn-outline bp-btn-lg">Large outline</button>
<button class="bp-btn bp-btn-ghost">Ghost</button>
<button class="bp-btn bp-btn-destructive">Delete</button>
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
```

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

<select class="bp-select">
  <option>Option</option>
</select>

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

---

## Badges

**Variants:** `bp-badge-default` `bp-badge-secondary` `bp-badge-success` `bp-badge-warning` `bp-badge-error` `bp-badge-outline`

```html
<span class="bp-badge bp-badge-default">Label</span>
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

## Alerts

**Variants:** `bp-alert-default` `bp-alert-success` `bp-alert-warning` `bp-alert-error`

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

---

## Divider

```html
<div class="bp-divider">or</div>         <!-- text divider with lines -->
<div class="bp-dotted-connector"></div>  <!-- dashed horizontal line -->
```

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
bp-flex  bp-inline-flex  bp-block  bp-hidden
bp-flex-col  bp-flex-row  bp-flex-wrap
bp-items-start  bp-items-center  bp-items-end
bp-justify-start  bp-justify-center  bp-justify-end  bp-justify-between
bp-flex-1  bp-flex-none  bp-shrink-0  bp-grow
bp-gap-1  bp-gap-2  bp-gap-3  bp-gap-4  bp-gap-5  bp-gap-6  bp-gap-8  bp-gap-10  bp-gap-12
```

### Spacing (padding)
```
bp-p-{1-12}   bp-px-{3-8}   bp-py-{2-20}
```

### Spacing (margin)
```
bp-m-auto  bp-mx-auto
bp-mb-{1-16}   bp-mt-{1-12}
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

### Colors
```
bp-text-primary   bp-text-secondary   bp-text-muted   bp-text-accent
bp-text-success   bp-text-warning     bp-text-error
bp-bg-base        bp-bg-secondary     bp-bg-surface   bp-bg-accent
```

### Border & Radius
```
bp-border  bp-border-t  bp-border-b  bp-border-l  bp-border-r  bp-border-none
bp-border-accent
bp-rounded-{none|sm|md|lg|xl|2xl|full}
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
bp-clickable       → cursor pointer, no tap highlight
bp-disabled        → 40% opacity, pointer-events none
bp-cursor-pointer
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

---

## CSS Variables Available Everywhere

These are always accessible for inline styles or custom CSS:

```
Spacing:   var(--bp-space-{1|2|3|4|5|6|8|10|12|16|20|24|32})
Colors:    var(--bp-success)  var(--bp-warning)  var(--bp-error)
           var(--bp-success-subtle)  var(--bp-warning-subtle)  var(--bp-error-subtle)
Shadows:   var(--bp-shadow-sm)  var(--bp-shadow-md)  var(--bp-shadow-lg)  var(--bp-shadow-glow)
Radius:    var(--bp-radius-{none|sm|md|lg|xl|2xl|full})
Motion:    var(--bp-transition-fast)  var(--bp-transition-base)  var(--bp-transition-smooth)  var(--bp-transition-bounce)
Z-index:   var(--bp-z-{base|raised|dropdown|sticky|overlay|modal|toast})
Fonts:     var(--bp-font-sans)  var(--bp-font-mono)
Blue:      var(--bp-blue-{50|100|200|300|400|500|600|700|800|900})
```

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
