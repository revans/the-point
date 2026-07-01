// Table Selection Controller
// Row-selection highlighting is pure CSS (:has(), see components.css) — the
// only thing that genuinely needs JS is the header "select all" checkbox's
// indeterminate state, since `indeterminate` is a JS-only DOM property with
// no HTML attribute or CSS equivalent.
//
// Usage:
//
//   <table class="bp-table" data-controller="table-selection">
//     <thead>
//       <tr>
//         <th>
//           <input type="checkbox" class="bp-table-checkbox"
//                  data-table-selection-target="all"
//                  data-action="change->table-selection#toggleAll">
//         </th>
//         <th>Name</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>
//           <input type="checkbox" class="bp-table-checkbox" value="1"
//                  data-table-selection-target="row"
//                  data-action="change->table-selection#toggleRow">
//         </td>
//         <td>Alice</td>
//       </tr>
//     </tbody>
//   </table>
//
// Listen for the result anywhere up the tree:
//
//   table.addEventListener("table-selection:change", (event) => {
//     const { selected } = event.detail // array of checked row values
//   })
//
// Can be combined with sortable-table on the same <table> — Stimulus
// supports multiple controllers on one element:
// data-controller="sortable-table table-selection"

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["all", "row"]

  connect() {
    this.#refresh()
  }

  toggleAll() {
    this.rowTargets.forEach((row) => { row.checked = this.allTarget.checked })
    this.#dispatchChange()
  }

  toggleRow() {
    this.#refresh()
    this.#dispatchChange()
  }

  #refresh() {
    const total = this.rowTargets.length
    const checked = this.rowTargets.filter((row) => row.checked).length
    this.allTarget.checked = total > 0 && checked === total
    this.allTarget.indeterminate = checked > 0 && checked < total
  }

  #dispatchChange() {
    const selected = this.rowTargets.filter((row) => row.checked).map((row) => row.value)
    this.element.dispatchEvent(new CustomEvent("table-selection:change", {
      bubbles: true,
      detail: { selected },
    }))
  }
}
