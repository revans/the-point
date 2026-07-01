// Sortable Table Controller
// Toggles aria-sort on click and tells your app what happened — it doesn't
// reorder rows itself. Row order depends on your data (client array, a
// paginated server query, a Turbo Stream request) in ways this library has
// no way to know, so — same split as the Pagination component — the
// styling and interaction are ours, the actual sort is yours.
//
// Usage:
//
//   <table data-controller="sortable-table">
//     <thead>
//       <tr>
//         <th aria-sort="none" data-column="name"
//             data-sortable-table-target="header"
//             data-action="click->sortable-table#sort">
//           Name <span class="bp-table-sort-icon">▲</span>
//         </th>
//         <th aria-sort="none" data-column="date"
//             data-sortable-table-target="header"
//             data-action="click->sortable-table#sort">
//           Date <span class="bp-table-sort-icon">▲</span>
//         </th>
//       </tr>
//     </thead>
//     ...
//   </table>
//
// Listen for the result anywhere up the tree:
//
//   table.addEventListener("sortable-table:sort", (event) => {
//     const { column, direction } = event.detail
//     // re-sort your array, or request the next page from the server, etc.
//   })
//
// Clicking a header sets it to "ascending" (or flips ascending <-> descending
// if it's already the sorted column) and resets every other header's
// aria-sort to "none" — single-column sort, the common case. The CSS reads
// aria-sort directly (see components.css) to show/rotate the sort icon.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["header"]

  sort(event) {
    const th = event.currentTarget
    const column = th.dataset.column
    const direction = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending"

    this.headerTargets.forEach((header) => {
      header.setAttribute("aria-sort", header === th ? direction : "none")
    })

    this.element.dispatchEvent(new CustomEvent("sortable-table:sort", {
      bubbles: true,
      detail: { column, direction },
    }))
  }
}
