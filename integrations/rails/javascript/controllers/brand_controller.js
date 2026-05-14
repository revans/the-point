// Brand Controller
// Applies a dynamic primary brand color and auto-derives --color-on-primary
// (button/badge text color) based on the luminance of the chosen color.
//
// Light colors (yellow, lime) → black text.
// Dark colors (blue, violet, charcoal) → white text.
//
// USAGE — static brand color (set at page load):
//
//   <html data-controller="brand" data-brand-color-value="#3B82F6">
//
// USAGE — runtime color picker (e.g. a brand settings panel):
//
//   <div data-controller="brand">
//     <input type="color"
//            data-brand-target="picker"
//            data-action="input->brand#onPick">
//   </div>
//
// The controller sets --color-primary and --color-on-primary on :root.
// All components that reference these tokens repaint automatically.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    color: { type: String, default: "" }
  }

  static targets = ["picker"]

  connect() {
    if (this.colorValue) this.#apply(this.colorValue)
  }

  colorValueChanged(value) {
    if (value) this.#apply(value)
  }

  onPick(event) {
    this.#apply(event.target.value)
  }

  // ── Private ──────────────────────────────────────────────────────────────

  #apply(hex) {
    const root = document.documentElement
    root.style.setProperty("--color-primary", hex)
    root.style.setProperty("--color-on-primary", this.#onColor(hex))
    if (this.hasPickerTarget) this.pickerTarget.value = hex
  }

  // WCAG relative luminance — maps an RGB color to a 0–1 brightness scale.
  // 0 = pure black, 1 = pure white. Yellow sits near 0.84; navy near 0.02.
  #luminance(hex) {
    const c = hex.replace("#", "").replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")
    const r = parseInt(c.slice(0, 2), 16) / 255
    const g = parseInt(c.slice(2, 4), 16) / 255
    const b = parseInt(c.slice(4, 6), 16) / 255
    const lin = v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  }

  // Threshold 0.35 is biased toward white text — matches Tailwind/Bootstrap
  // convention where vivid colors (blue, violet, pink) keep white text even
  // though pure math would say black is marginally more readable there.
  #onColor(hex) {
    return this.#luminance(hex) > 0.35 ? "#000000" : "#ffffff"
  }
}
