import React from 'react'

export function EmptyState({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-empty-state', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function EmptyStateIcon({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-empty-state-icon', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function EmptyStateTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-empty-state-title', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function EmptyStateDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={['bp-empty-state-description', className].filter(Boolean).join(' ')} {...props}>{children}</p>
}

export function EmptyStateActions({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-empty-state-actions', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
