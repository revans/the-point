// Dropdown Controller
// Open/close wiring for .bp-dropdown-menu — the CSS handles appearance and
// positioning, this only handles visibility and outside-click-to-close.
// (A CSS-only :focus-within approach can't do this: it only reacts to focus
// leaving the dropdown, not to a click landing anywhere else on the page.)
//
// Features:
//   - Toggle on trigger click
//   - Outside click closes
//   - Escape key closes, from anywhere on the page
//
// Usage:
//
//   <div data-controller="dropdown"
//        data-action="click@window->dropdown#outsideClick keydown.esc@window->dropdown#close">
//     <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->dropdown#toggle">
//       Menu
//     </button>
//
//     <div class="bp-dropdown-menu bp-hidden" data-dropdown-target="menu">
//       <a class="bp-dropdown-item" href="#" data-action="click->dropdown#close">Item one</a>
//       <div class="bp-dropdown-divider"></div>
//       <button class="bp-dropdown-item" data-action="click->dropdown#close">Item two</button>
//     </div>
//   </div>
//
// The menu must start with both "bp-dropdown-menu" and "bp-hidden" —
// this controller only ever toggles "bp-hidden", it never manages display
// directly, so the CSS stays the single source of truth for appearance.
// Add data-action="click->dropdown#close" on individual items if you want
// selecting one to close the menu — the controller doesn't assume that,
// since some menus (e.g. a filter list with checkboxes) want to stay open.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  toggle() {
    this.menuTarget.classList.contains("bp-hidden") ? this.open() : this.close()
  }

  open() {
    this.menuTarget.classList.remove("bp-hidden")
  }

  close() {
    this.menuTarget.classList.add("bp-hidden")
  }

  outsideClick(event) {
    if (!this.element.contains(event.target)) this.close()
  }
}
