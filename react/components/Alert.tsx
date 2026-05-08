import React from 'react'

type Variant = 'default' | 'success' | 'warning' | 'error'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  title?: string
  icon?: React.ReactNode
}

export function Alert({ variant = 'default', title, icon, className = '', children, ...props }: AlertProps) {
  const classes = ['bp-alert', `bp-alert-${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {icon && <div className="bp-alert-icon">{icon}</div>}
      <div className="bp-alert-content">
        {title && <div className="bp-alert-title">{title}</div>}
        {children}
      </div>
    </div>
  )
}
