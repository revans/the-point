import React, { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

// Controlled (open/onClose), like Modal — but unlike Modal, stays mounted at
// all times and toggles bp-drawer-open, because a transform/opacity slide
// transition can't play if the element unmounts on close and remounts on
// open. Also unlike Modal, this bakes in Escape-to-close, backdrop-click,
// scroll lock, and a focus trap directly — mirroring
// rails/javascript/controllers/drawer_controller.js, since a drawer holds
// content longer than a modal confirmation and losing focus to the page
// behind it is a bigger accessibility gap here.
export function Drawer({ open, onClose, side = 'right', className = '', children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      // The panel sits inside the overlay, which is mid-transition from
      // visibility:hidden to visible — its computed visibility (and
      // therefore focusability) doesn't settle until a frame after the
      // class change is painted. Verified empirically in the Stimulus
      // controller: one rAF wasn't enough, two reliably was.
      requestAnimationFrame(() => requestAnimationFrame(() => panelRef.current?.focus()))
    } else {
      document.body.style.overflow = ''
      lastFocused.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div
      className={['bp-drawer-overlay', open ? 'bp-drawer-open' : ''].filter(Boolean).join(' ')}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          'bp-drawer',
          side === 'left' ? 'bp-drawer-left' : '',
          open ? 'bp-drawer-open' : '',
          className,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

export function DrawerHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-drawer-header', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function DrawerTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-drawer-title', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function DrawerBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-drawer-body', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function DrawerFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-drawer-footer', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
