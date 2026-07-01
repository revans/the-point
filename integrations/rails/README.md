# The Point — Rails Layer

Rails integration using only built-in Rails features: helper methods, partials, and the asset pipeline. No gems, no ViewComponent, no JavaScript framework required.

---

## Setup

### 1. Add the CSS

**Option A — vendor/assets (recommended)**
```
cp -r the-point/core vendor/assets/stylesheets/the-point
cp the-point/index.css vendor/assets/stylesheets/the-point.css
```

In `app/assets/stylesheets/application.css`:
```css
*= require the-point
```

**Option B — import in application.css.scss**
```scss
@import "the-point/index";
```

**Option C — CDN / direct link**
```erb
<%= stylesheet_link_tag 'path/to/the-point/index', media: 'all' %>
```

### 2. Add the helper

Copy `rails/helpers/blueprint_helper.rb` to `app/helpers/blueprint_helper.rb`.

Include it in `ApplicationHelper`:
```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  include BlueprintHelper
end
```

### 3. Set the theme

In your layout `<html>` tag:
```erb
<html lang="en" data-bp-theme="<%= current_user&.theme_preference || 'dark' %>">
```

Or hardcode it:
```erb
<html lang="en" data-bp-theme="dark">
```

### 4. Copy partials (optional)

For complex components, copy the partials from `rails/partials/` into `app/views/blueprint/`:
```
cp rails/partials/_nav.html.erb app/views/blueprint/_nav.html.erb
cp rails/partials/_pricing_card.html.erb app/views/blueprint/_pricing_card.html.erb
cp rails/partials/_testimonial.html.erb app/views/blueprint/_testimonial.html.erb
```

---

## Architecture

The Rails layer separates into two tiers:

**Helpers** — for building blocks that compose inline. Methods on `BlueprintHelper` generate HTML using `content_tag`, `link_to`, and other Rails view helpers. Use these inside any `.erb` file.

**Partials** — for complex components with multiple sub-parts and local variables. Drop them in `app/views/blueprint/` and render with `render`.

**Rule of thumb:** if a component needs more than 4-5 lines of ERB to use correctly, it belongs in a partial.

---

## Helper Reference

### Button
```erb
<%= bp_button "Save", variant: :primary %>
<%= bp_button "Cancel", variant: :ghost, href: root_path %>
<%# :destructive auto-prepends ✕ %>
<%= bp_button "Delete", variant: :destructive, size: :sm %>
<%# external: true auto-prepends ↗ %>
<%= bp_button "Docs", variant: :outline, href: docs_path, external: true %>
<%= bp_button "Large CTA", variant: :primary, size: :xl, href: signup_path %>
<%# custom icon %>
<%= bp_button "Next", variant: :primary, icon: "→", icon_position: :append %>
<%# suppress auto icon %>
<%= bp_button "Delete", variant: :destructive, icon: false %>
<%= bp_button variant: :secondary do %>
  <svg ...></svg> With icon
<% end %>
```

Options: `variant:` `:primary` `:secondary` `:outline` `:ghost` `:destructive` | `size:` `:xs` `:sm` `:md` `:lg` `:xl` | `href:` | `icon_only:` | `full_width:` | `external:` | `icon:` | `icon_position:` `:prepend` `:append`

Icons are inferred automatically: `:destructive` → `✕`, `external: true` → `↗`. Pass `icon: false` to suppress.

### Badge
```erb
<%= bp_badge "Active",  variant: :success %>  <%# auto-prepends ✓ %>
<%= bp_badge "Pending", variant: :warning %>  <%# auto-prepends ⚠ %>
<%= bp_badge "Failed",  variant: :error %>    <%# auto-prepends ✕ %>
<%= bp_badge "v2.4.1",  variant: :secondary %>  <%# no icon %>
<%# custom icon, appended %>
<%= bp_badge "Live", variant: :success, icon: "●", icon_position: :append %>
<%# suppress icon %>
<%= bp_badge "Active", variant: :success, icon: false %>
```

Variants: `:default` `:secondary` `:success` `:warning` `:error` `:outline`

Icons are inferred automatically from variant. Pass `icon: false` to suppress.

### Card
```erb
<%= bp_card do %>
  <%= bp_card_title "Title" %>
  <%= bp_card_description "Supporting text" %>
<% end %>

<%= bp_card hover: true, bracket: true do %>
  Content
<% end %>

<%# Feature card %>
<%= bp_card hover: true, feature: true do %>
  <div class="bp-card-feature-icon">...</div>
  <%= bp_card_title "Feature" %>
  <%= bp_card_description "Description" %>
<% end %>

<%# Border draw animation — draws clockwise on scroll entry %>
<%= bp_card animate_draw: true do %>
  Content
<% end %>
```

Options: `hover:` `feature:` `bracket:` `animate_draw:`

### Alert
```erb
<%# Icons are inferred: :success → ✓, :warning → ⚠, :error → ✕ %>
<%= bp_alert variant: :success, title: "Saved!" do %>
  Your changes have been saved.
<% end %>

<%= bp_alert variant: :error do %>
  <%= @error_message %>
<% end %>

<%# Custom icon %>
<%= bp_alert variant: :default, icon: "🔒", title: "Secure" do %>
  Your connection is encrypted.
<% end %>

<%# Suppress icon %>
<%= bp_alert variant: :warning, icon: false do %>
  Plain warning, no icon.
<% end %>
```

Variants: `:default` `:success` `:warning` `:error`

Icons are inferred automatically from variant. Pass `icon: false` to suppress.

### Avatar
```erb
<%= bp_avatar "JD", size: :md %>
<%= bp_avatar src: asset_path("photo.jpg"), alt: "Jane", size: :lg %>
```

Sizes: `:sm` `:md` `:lg` `:xl`

### Forms

Works standalone or inside a `form_with` / `form_for` block:

**Standalone:**
```erb
<%= bp_form_group do %>
  <%= bp_label :email, "Email address", hint: "We won't spam you" %>
  <%= bp_input :email, placeholder: "you@example.com" %>
  <%= bp_form_hint "Enter your work email" %>
<% end %>
```

**With form builder:**
```erb
<%# error state is detected automatically from model errors — no error: param needed %>
<%= form_with model: @user do |f| %>
  <%= bp_form_group do %>
    <%= bp_label f, :email, "Email" %>
    <%= bp_input f, :email %>
    <% if @user.errors[:email].any? %>
      <%= bp_form_error @user.errors[:email].first %>
    <% end %>
  <% end %>

  <%= bp_form_group do %>
    <%= bp_label f, :bio, "Bio" %>
    <%= bp_textarea f, :bio %>
  <% end %>

  <%= bp_form_group do %>
    <%= bp_label f, :plan, "Plan" %>
    <%= bp_select f, :plan, options_for_select([["Free", "free"], ["Pro", "pro"]]) %>
  <% end %>

  <%= bp_button "Save", variant: :primary, type: :submit %>
<% end %>
```

`bp_input`, `bp_textarea`, and `bp_select` automatically apply `bp-input-error` when `f.object.errors` has errors for that attribute. Pass `error: true` to force it on, or `error: false` to suppress it.

### Layout
```erb
<%# Full page section with container %>
<%= bp_section do %>
  <%= bp_container do %>
    Content
  <% end %>
<% end %>

<%# Alternate background section %>
<%= bp_section bg: :secondary do %>
  <%= bp_container do %>
    Content
  <% end %>
<% end %>

<%# Large section %>
<%= bp_section size: :lg do %>...<% end %>

<%# Three-column grid %>
<%= bp_grid cols: 3 do %>
  <% 3.times do %>
    <%= bp_card do %>Cell<% end %>
  <% end %>
<% end %>
```

### Stats
```erb
<%= bp_stat value: "99.98%", label: "Uptime",     change: "0.01%", direction: :up %>
<%= bp_stat value: "17",     label: "Incidents",  change: "3",     direction: :down %>
<%# Arrow appended instead of prepended %>
<%= bp_stat value: "42ms",   label: "Latency",    change: "5ms",   direction: :down, arrow_position: :append %>
<%# No arrow %>
<%= bp_stat value: "8",      label: "Open issues", change: "same", direction: :neutral %>
```

The arrow (`↑` / `↓`) is added automatically from `direction:`. Pass only the number/text in `change:`.

Options: `direction:` `:up` `:down` `:neutral` | `arrow_position:` `:prepend` `:append`

### Section Header
```erb
<%= bp_section_header \
      label:    "Features",
      title:    "Everything you need",
      subtitle: "No fluff, no filler." %>
```

### Blueprint decoratives
```erb
<%= bp_mono_label "REF: AX-2.4.1" %>
<%= bp_annotation "A side note or technical reference." %>
<%= bp_gradient_text "highlighted phrase" %>
<%= bp_divider %>         <%# plain <hr> %>
<%= bp_divider "or" %>    <%# text divider with lines %>

<%# Skeleton — variant-based %>
<%= bp_skeleton variant: :title %>
<%= bp_skeleton variant: :text, width: "60%" %>

<%# Skeleton — grid-unit heights (1u=40px, 2u=80px, 3u=120px, 4u=160px, 6u=240px) %>
<%= bp_skeleton units: 2 %>
<%= bp_skeleton units: 4, width: "50%" %>

<%# Skeleton card — zero-layout-shift placeholder matching bp-card exactly %>
<%= bp_skeleton_card do %>
  <%= bp_skeleton units: 1, style: "width: 48px; border-radius: 8px;" %>
  <%= bp_skeleton units: 1, width: "140px" %>
  <%= bp_skeleton units: 1, width: "100%" %>
  <%= bp_skeleton units: 1, width: "80%" %>
<% end %>
```

`units:` and `variant:` are mutually exclusive — `units:` takes priority if both are given.

---

## Partial Reference

### Navigation
```erb
<%# In your layout or view %>
<%= render 'blueprint/nav',
      brand_name: 'My App',
      brand_path: root_path,
      links: [
        { label: 'Features', path: '#features' },
        { label: 'Pricing',  path: pricing_path },
      ] do %>
  <%= bp_button 'Sign in',    variant: :ghost,   size: :sm, href: login_path %>
  <%= bp_button 'Get started', variant: :primary, size: :sm, href: signup_path %>
<% end %>
```

### Pricing Card
```erb
<%= bp_grid cols: 3 do %>
  <%= render 'blueprint/pricing_card',
        plan:        'Starter',
        amount:      '$0',
        description: 'For individuals.',
        cta_label:   'Get started free',
        cta_path:    signup_path,
        cta_variant: :secondary,
        features: [
          { label: '3 projects',        included: true },
          { label: 'Community support', included: true },
          { label: 'Advanced features', included: false },
        ] %>

  <%= render 'blueprint/pricing_card',
        plan:           'Pro',
        amount:         '$49',
        period:         '/ mo',
        description:    'For growing teams.',
        featured:       true,
        featured_label: 'Most popular',
        cta_label:      'Start free trial',
        cta_path:       signup_path,
        features: [
          { label: 'Unlimited projects', included: true },
          { label: 'Priority support',   included: true },
          { label: 'Advanced features',  included: true },
        ] %>
<% end %>
```

### Testimonial
```erb
<%= bp_grid cols: 3 do %>
  <%= render 'blueprint/testimonial',
        quote:    "This saved us weeks of design work.",
        name:     "Jamie Dawson",
        role:     "CTO · Beacon",
        initials: "JD" %>
<% end %>
```

---

## Theme Toggle

The recommended approach for Rails 7+ (Hotwire) is the included Stimulus controller. It persists to localStorage, respects `prefers-color-scheme` on first visit, and survives Turbo navigations — no round trip required.

### 1. Register the controller

Copy `rails/javascript/controllers/theme_controller.js` to `app/javascript/controllers/theme_controller.js`.

In `app/javascript/controllers/index.js`:
```js
import ThemeController from "./theme_controller"
application.register("theme", ThemeController)
```

If you use the auto-loader (Rails 7 default):
```js
// app/javascript/controllers/index.js
import { application } from "./application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)
// theme_controller.js is picked up automatically
```

### 2. Set an initial theme on `<html>`

```erb
<%# application.html.erb %>
<html lang="en" data-bp-theme="<%= session[:theme] || 'dark' %>">
```

This prevents a flash of unstyled content before Stimulus connects. If you don't have a server-side preference, `"dark"` is a safe default.

### 3. Add the toggle button

```erb
<div data-controller="theme">
  <button
    class="bp-btn bp-btn-secondary bp-btn-sm"
    data-theme-target="button"
    data-action="click->theme#toggle"
  >☀ Light</button>
</div>
```

The controller only needs to wrap the toggle button. It reaches up to `document.documentElement` to set `data-bp-theme`.

### Options

Override the default theme (used when no localStorage value or system preference is detected):
```erb
<div data-controller="theme" data-theme-default-value="light">
```

### Server-side fallback (no JavaScript)

If you need a no-JS option or want to persist preferences across devices:

```erb
<%# Toggle button — submits to a controller action %>
<%= button_to toggle_theme_path,
      method: :patch,
      class:  'bp-btn bp-btn-secondary bp-btn-sm',
      form:   { style: 'display:inline' } do %>
  <%= session[:theme] == 'light' ? '◑ Dark' : '☀ Light' %>
<% end %>
```

```ruby
# app/controllers/preferences_controller.rb
THEME_CYCLE = %w[dark light auto].freeze

def toggle_theme
  current = session[:theme] || 'dark'
  session[:theme] = THEME_CYCLE[(THEME_CYCLE.index(current).to_i + 1) % THEME_CYCLE.length]
  redirect_back fallback_location: root_path
end
```

Three themes cycle: `dark` → `light` → `auto` (follows OS preference). `auto` maps to `data-bp-theme="auto"` on the `<html>` element.

---

## Modal

The `.bp-overlay` / `.bp-modal` CSS handles all appearance. The included Stimulus controller wires up open/close, backdrop-click-to-close, Escape-to-close, and body scroll locking.

### 1. Register the controller

Copy `rails/javascript/controllers/modal_controller.js` to `app/javascript/controllers/modal_controller.js`.

```js
// app/javascript/controllers/index.js
import ModalController from "./modal_controller"
application.register("modal", ModalController)
```

### 2. Markup

The overlay must start with both `bp-overlay` and `bp-hidden` — the controller only ever toggles `bp-hidden`, so the CSS stays the single source of truth for what "open" looks like.

```erb
<div data-controller="modal">
  <button class="bp-btn bp-btn-primary bp-btn-sm" data-action="click->modal#open">Open modal</button>

  <div class="bp-overlay bp-hidden"
       data-modal-target="overlay"
       data-action="click->modal#backdropClick keydown.esc@window->modal#close">
    <div class="bp-modal" tabindex="-1" data-modal-target="panel">
      <div class="bp-modal-header">
        <span class="bp-modal-title">Confirm action</span>
        <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm" data-action="click->modal#close">✕</button>
      </div>
      <div class="bp-modal-body">Are you sure you want to continue?</div>
      <div class="bp-modal-footer">
        <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->modal#close">Cancel</button>
        <button class="bp-btn bp-btn-primary bp-btn-sm">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

`data-modal-target="panel"` (on `.bp-modal`, with `tabindex="-1"`) lets the controller focus the modal itself when it opens, and it returns focus to whatever triggered `open()` when it closes.

---

## Dropdown

`:focus-within` alone can't do outside-click-to-close — it only reacts to focus leaving the dropdown, not to a click landing elsewhere on the page. The included Stimulus controller handles that, plus toggle and Escape-to-close.

### 1. Register the controller

Copy `rails/javascript/controllers/dropdown_controller.js` to `app/javascript/controllers/dropdown_controller.js`.

```js
// app/javascript/controllers/index.js
import DropdownController from "./dropdown_controller"
application.register("dropdown", DropdownController)
```

### 2. Markup

The menu must start with both `bp-dropdown-menu` and `bp-hidden` — the controller only ever toggles `bp-hidden`, so the CSS stays the single source of truth for appearance.

```erb
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

Add `bp-dropdown-menu-right` to right-align the menu to its trigger. `data-action="click->dropdown#close"` on individual items is optional — a filter menu with checkboxes may want to stay open after a selection.

---

## Drawer

Both the overlay and the panel stay in the DOM at all times and slide/fade via a `bp-drawer-open` class — unlike the modal controller's `bp-hidden` (display:none), a transform/opacity transition can't play once an element goes to `display:none` first. Because a drawer typically holds more content and stays open longer than a modal confirmation, this controller also traps Tab/Shift+Tab focus inside the panel while open.

### 1. Register the controller

Copy `rails/javascript/controllers/drawer_controller.js` to `app/javascript/controllers/drawer_controller.js`.

```js
// app/javascript/controllers/index.js
import DrawerController from "./drawer_controller"
application.register("drawer", DrawerController)
```

### 2. Markup

```erb
<div data-controller="drawer">
  <button class="bp-btn bp-btn-primary bp-btn-sm" data-action="click->drawer#open">Open drawer</button>

  <div class="bp-drawer-overlay"
       data-drawer-target="overlay"
       data-action="click->drawer#backdropClick keydown.esc@window->drawer#close">
    <div class="bp-drawer" tabindex="-1" data-drawer-target="panel">
      <div class="bp-drawer-header">
        <span class="bp-drawer-title">Filters</span>
        <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm" data-action="click->drawer#close">✕</button>
      </div>
      <div class="bp-drawer-body">Content</div>
      <div class="bp-drawer-footer">
        <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->drawer#close">Cancel</button>
        <button class="bp-btn bp-btn-primary bp-btn-sm">Apply</button>
      </div>
    </div>
  </div>
</div>
```

Add `bp-drawer-left` on `.bp-drawer` to slide in from the left instead of the right (the default). `data-drawer-target="panel"` needs `tabindex="-1"` — the controller focuses it on open, and returns focus to whatever triggered `open()` when it closes.

---

## Flash Messages

Map Rails flash types to alert variants:

```erb
<%# In your layout, after <nav> %>
<% flash.each do |type, message| %>
  <div style="padding: 0.75rem 0;">
    <%= bp_container do %>
      <%= bp_alert variant: flash_variant(type), title: flash_title(type) do %>
        <%= message %>
      <% end %>
    <% end %>
  </div>
<% end %>
```

```ruby
# In ApplicationHelper
def flash_variant(type)
  { 'notice' => :success, 'alert' => :error, 'warning' => :warning }.fetch(type.to_s, :default)
end

def flash_title(type)
  { 'notice' => nil, 'alert' => 'Error', 'warning' => 'Warning' }.fetch(type.to_s, nil)
end
```
