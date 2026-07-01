// Modal Controller
// Open/close wiring for .bp-overlay / .bp-modal — the CSS already handles
// appearance, this only handles visibility and the interactions users expect.
//
// Features:
//   - Backdrop click closes (click directly on .bp-overlay, not its children)
//   - Escape key closes, from anywhere on the page
//   - Locks body scroll while open
//   - Returns focus to the trigger that opened the modal, on close
//
// Usage:
//
//   <div data-controller="modal">
//     <button data-action="click->modal#open">Open modal</button>
//
//     <div class="bp-overlay bp-hidden"
//          data-modal-target="overlay"
//          data-action="click->modal#backdropClick keydown.esc@window->modal#close">
//       <div class="bp-modal" tabindex="-1" data-modal-target="panel">
//         <div class="bp-modal-header">
//           <span class="bp-modal-title">Title</span>
//           <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm" data-action="click->modal#close">✕</button>
//         </div>
//         <div class="bp-modal-body">Content</div>
//         <div class="bp-modal-footer">
//           <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->modal#close">Cancel</button>
//           <button class="bp-btn bp-btn-primary bp-btn-sm">Confirm</button>
//         </div>
//       </div>
//     </div>
//   </div>
//
// The overlay must start with both "bp-overlay" and "bp-hidden" classes —
// this controller only ever toggles "bp-hidden", it never manages display
// directly, so the CSS stays the single source of truth for appearance.
//
// This wraps the trigger and the overlay in one controller scope, matching
// theme_controller/brand_controller. .bp-overlay is position: fixed, so
// nesting it inside a wrapping div doesn't affect its full-viewport layout.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "panel"]

  #lastFocused = null

  open() {
    this.#lastFocused = document.activeElement
    this.overlayTarget.classList.remove("bp-hidden")
    document.body.style.overflow = "hidden"
    // A real mouse click's own default action re-focuses the clicked
    // trigger button AFTER this listener runs, undoing an immediate
    // .focus() call here. Deferring one frame lets ours run last.
    if (this.hasPanelTarget) requestAnimationFrame(() => this.panelTarget.focus())
  }

  close() {
    if (this.overlayTarget.classList.contains("bp-hidden")) return
    this.overlayTarget.classList.add("bp-hidden")
    document.body.style.overflow = ""
    const lastFocused = this.#lastFocused
    requestAnimationFrame(() => lastFocused?.focus())
  }

  backdropClick(event) {
    if (event.target === event.currentTarget) this.close()
  }
}
