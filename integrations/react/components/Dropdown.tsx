import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

const DropdownContext = createContext<{ close: () => void } | null>(null)

// Self-contained — owns its own open/close state, outside-click, and Escape
// handling, mirroring rails/javascript/controllers/dropdown_controller.js.
export function Dropdown({ trigger, children, align = 'left', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    // ref.current.contains(e.target) is true for the trigger itself (it's
    // inside this wrapper), so the click that opens the menu can't also
    // immediately close it here — no extra guard needed.
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const menuClass = [
    'bp-dropdown-menu',
    align === 'right' ? 'bp-dropdown-menu-right' : '',
    open ? '' : 'bp-hidden',
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={['bp-dropdown', className].filter(Boolean).join(' ')}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      <div className={menuClass}>
        <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
          {children}
        </DropdownContext.Provider>
      </div>
    </div>
  )
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
  href?: string
  closeOnClick?: boolean
}

// Renders <a> when href is given, otherwise <button type="button"> — matches
// the two forms shown in the CSS usage comment (link items vs. action items).
export function DropdownItem({ href, closeOnClick = true, className = '', onClick, children, ...props }: DropdownItemProps) {
  const ctx = useContext(DropdownContext)
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e)
    if (closeOnClick) ctx?.close()
  }
  const classes = ['bp-dropdown-item', className].filter(Boolean).join(' ')

  if (href) {
    return <a href={href} className={classes} onClick={handleClick} {...props}>{children}</a>
  }
  return <button type="button" className={classes} onClick={handleClick} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>
}

export function DropdownDivider() {
  return <div className="bp-dropdown-divider" />
}
