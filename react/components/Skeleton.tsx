import React from 'react'

type SkeletonVariant = 'base' | 'text' | 'title'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  circle?: boolean
}

export function Skeleton({
  variant = 'base',
  width,
  height,
  circle = false,
  className = '',
  style = {},
  ...props
}: SkeletonProps) {
  const classes = [
    'bp-skeleton',
    variant === 'text' && 'bp-skeleton-text',
    variant === 'title' && 'bp-skeleton-title',
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
