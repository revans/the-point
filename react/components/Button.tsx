import React from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconOnly?: boolean
  fullWidth?: boolean
  href?: string
  external?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  fullWidth = false,
  href,
  external = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'bp-btn',
    `bp-btn-${variant}`,
    size !== 'md' && `bp-btn-${size}`,
    iconOnly && 'bp-btn-icon',
    fullWidth && 'bp-w-full',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
