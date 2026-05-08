import React from 'react'

type Variant = 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const classes = ['bp-badge', `bp-badge-${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
