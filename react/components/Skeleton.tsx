import React from 'react'

type SkeletonVariant = 'base' | 'text' | 'title'
type SkeletonUnits = 1 | 2 | 3 | 4 | 6

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  units?: SkeletonUnits
  width?: string | number
  height?: string | number
  circle?: boolean
}

export function Skeleton({
  variant = 'base',
  units,
  width,
  height,
  circle = false,
  className = '',
  style = {},
  ...props
}: SkeletonProps) {
  const classes = [
    'bp-skeleton',
    units ? `bp-skeleton-${units}u` : null,
    !units && variant === 'text' && 'bp-skeleton-text',
    !units && variant === 'title' && 'bp-skeleton-title',
    circle && 'bp-rounded-full',
    className,
  ].filter(Boolean).join(' ')

  const inlineStyle = {
    ...style,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  }

  return <div className={classes} style={inlineStyle} {...props} />
}

// SkeletonCard — zero-layout-shift placeholder matching bp-card dimensions exactly
export function SkeletonCard({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['bp-skeleton-card', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
