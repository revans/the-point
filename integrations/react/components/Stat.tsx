import React from 'react'

export function Stat({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-stat', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function StatValue({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-stat-value', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function StatLabel({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-stat-label', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

type Direction = 'up' | 'down'

interface StatChangeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction
}

export function StatChange({ direction = 'up', className = '', children, ...props }: StatChangeProps) {
  const classes = [
    'bp-stat-change',
    direction === 'up' ? 'bp-stat-change-up' : 'bp-stat-change-down',
    className,
  ].filter(Boolean).join(' ')

  return <div className={classes} {...props}>{children}</div>
}
