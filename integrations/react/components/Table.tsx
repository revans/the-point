import React, { useEffect, useRef } from 'react'

type SortDirection = 'ascending' | 'descending' | 'none'

interface TableSortableHeaderProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'onClick'> {
  column: string
  direction: SortDirection
  onSort: (column: string, direction: 'ascending' | 'descending') => void
}

// Drop-in <th> replacement inside a plain <table className="bp-table">.
// Controlled — the parent owns which column is sorted and in which
// direction (the usual React pattern: one { sortColumn, sortDirection }
// state pair), and passes direction="none" for every column except the
// currently-sorted one. Doesn't reorder rows itself, same as the Stimulus
// sortable_table_controller.js — that stays app-owned.
//
// Usage:
//
//   const [sort, setSort] = useState({ column: 'name', direction: 'ascending' as const })
//
//   <TableSortableHeader
//     column="name"
//     direction={sort.column === 'name' ? sort.direction : 'none'}
//     onSort={(column, direction) => setSort({ column, direction })}
//   >
//     Name
//   </TableSortableHeader>
export function TableSortableHeader({ column, direction, onSort, className = '', children, ...props }: TableSortableHeaderProps) {
  return (
    <th
      aria-sort={direction}
      onClick={() => onSort(column, direction === 'ascending' ? 'descending' : 'ascending')}
      className={className}
      {...props}
    >
      {children} <span className="bp-table-sort-icon">▲</span>
    </th>
  )
}

interface TableSelectAllCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'> {
  checkedCount: number
  totalCount: number
  onChange: (checked: boolean) => void
}

// Row-selection highlighting is pure CSS (:has(), see components.css) — row
// checkboxes are just plain <input type="checkbox" className="bp-table-checkbox">
// controlled by whatever selection state (an array/Set of ids) your app
// already tracks. This component exists only because "select all" needs the
// indeterminate state, which is a JS-only DOM property React can't set via
// a prop — it has to go through a ref, which is what this wraps.
//
// Usage:
//
//   const [selected, setSelected] = useState<Set<string>>(new Set())
//
//   <TableSelectAllCheckbox
//     checkedCount={selected.size}
//     totalCount={rows.length}
//     onChange={(checked) => setSelected(checked ? new Set(rows.map(r => r.id)) : new Set())}
//   />
export function TableSelectAllCheckbox({ checkedCount, totalCount, onChange, className = '', ...props }: TableSelectAllCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  const checked = totalCount > 0 && checkedCount === totalCount
  const indeterminate = checkedCount > 0 && checkedCount < totalCount

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <input
      ref={ref}
      type="checkbox"
      className={['bp-table-checkbox', className].filter(Boolean).join(' ')}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
  )
}
