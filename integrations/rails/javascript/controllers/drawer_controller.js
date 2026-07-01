// Drawer Controller
// Open/close wiring for .bp-drawer-overlay / .bp-drawer — the CSS handles
// the slide/fade transition, this handles visibility state, the
// interactions users expect, and a focus trap.
//
// Features:
//   - Backdrop click closes (click directly on .bp-drawer-overlay, not its children)
//   - Escape key closes, from anywhere on the page
//   - Locks body scroll while open
//   - Traps Tab/Shift+Tab focus inside the drawer while open (a drawer stays
//     open longer than a modal confirmation and often holds a full form, so
//     losing focus to page content behind it is a bigger accessibility gap
//     here than in the modal controller, which only does basic focus-on-open)
//   - Returns focus to the trigger that opened the drawer, on close
//
// Usage:
//
//   <div data-controller="drawer">
//     <button data-action="click->drawer#open">Open drawer</button>
//
//     <div class="bp-drawer-overlay"
//          data-drawer-target="overlay"
//          data-action="click->drawer#backdropClick keydown.esc@window->drawer#close">
//       <div class="bp-drawer" tabindex="-1" data-drawer-target="panel">
//         <div class="bp-drawer-header">
//           <span class="bp-drawer-title">Filters</span>
//           <button class="bp-btn bp-btn-ghost bp-btn-icon bp-btn-sm" data-action="click->drawer#close">✕</button>
//         </div>
//         <div class="bp-drawer-body">Content</div>
//         <div class="bp-drawer-footer">
//           <button class="bp-btn bp-btn-secondary bp-btn-sm" data-action="click->drawer#close">Cancel</button>
//           <button class="bp-btn bp-btn-primary bp-btn-sm">Apply</button>
//         </div>
//       </div>
//     </div>
//   </div>
//
// Both the overlay and the panel stay in the DOM at all times — this
// controller toggles "bp-drawer-open" on each, never "bp-hidden", because a
// transform/opacity transition can't play once an element hits display:none.
// Add "bp-drawer-left" on .bp-drawer to slide in from the left instead.

import { Controller } from "@hotwired/stimulus"

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default class extends Controller {
  static targets = ["overlay", "panel"]

  #lastFocused = null

  open() {
    this.#lastFocused = document.activeElement
    this.overlayTarget.classList.add("bp-drawer-open")
    this.panelTarget.classList.add("bp-drawer-open")
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", this.#trapFocus)
    // Two problems, both needing a defer: (1) a real mouse click's own
    // default action re-focuses the clicked trigger button AFTER this
    // listener runs, undoing an immediate .focus() call here — one frame
    // fixes that. (2) the panel sits inside .bp-drawer-overlay, which is
    // still transitioning visibility:hidden -> visible; that transition's
    // computed value doesn't settle to "visible" (and therefore focusable)
    // until the frame after the class change is first painted. One frame
    // isn't enough for both — verified empirically — so this needs two.
    requestAnimationFrame(() => requestAnimationFrame(() => this.panelTarget.focus()))
  }

  close() {
    if (!this.overlayTarget.classList.contains("bp-drawer-open")) return
    this.overlayTarget.classList.remove("bp-drawer-open")
    this.panelTarget.classList.remove("bp-drawer-open")
    document.body.style.overflow = ""
    document.removeEventListener("keydown", this.#trapFocus)
    const lastFocused = this.#lastFocused
    requestAnimationFrame(() => lastFocused?.focus())
  }

  backdropClick(event) {
    if (event.target === event.currentTarget) this.close()
  }

  disconnect() {
    document.removeEventListener("keydown", this.#trapFocus)
  }

  // Arrow function property (not a prototype method) so `this` stays bound
  // when passed directly to add/removeEventListener above.
  #trapFocus = (event) => {
    if (event.key !== "Tab") return
    const focusable = this.panelTarget.querySelectorAll(FOCUSABLE)
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
