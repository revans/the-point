import React from 'react'

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
}

export function Overlay({ onClose, className = '', children, ...props }: OverlayProps) {
  return (
    <div
      className={['bp-overlay', className].filter(Boolean).join(' ')}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Modal({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-modal', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function ModalHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-modal-header', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function ModalTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-modal-title', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function ModalBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-modal-body', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function ModalFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-modal-footer', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
