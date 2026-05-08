// Theme Controller
// Manages dark/light blueprint theme switching.
//
// Features:
//   - Persists preference to localStorage
//   - Respects system preference (prefers-color-scheme) on first visit
//   - Survives Turbo page navigations
//   - Falls back to a configurable default
//
// Usage:
//
//   <div data-controller="theme">
//     <button
//       class="bp-btn bp-btn-secondary bp-btn-sm"
//       data-theme-target="button"
//       data-action="click->theme#toggle"
//     >☀ Light</button>
//   </div>
//
// With explicit default:
//
//   <div data-controller="theme" data-theme-default-value="light">
//
// The controller only needs to wrap the toggle button.
// It reaches up to document.documentElement to set data-bp-theme.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    default: { type: String, default: "dark" }
  }

  static targets = ["button"]

  connect() {
    const saved   = localStorage.getItem("bp-theme")
    const theme   = saved ?? this.#systemPreference() ?? this.defaultValue
    this.#apply(theme)
  }

  toggle() {
    const current = document.documentElement.getAttribute("data-bp-theme")
    this.#apply(current === "dark" ? "light" : "dark")
  }

  // ── Private ──────────────────────────────────────────────────────────────

  #apply(theme) {
    document.documentElement.setAttribute("data-bp-theme", theme)
    localStorage.setItem("bp-theme", theme)
    this.#updateLabel(theme)
  }

  #updateLabel(theme) {
    if (this.hasButtonTarget) {
      this.buttonTarget.textContent = theme === "dark" ? "☀ Light" : "◑ Dark"
    }
  }

  #systemPreference() {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light"
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)  return "dark"
    return null
  }
}
