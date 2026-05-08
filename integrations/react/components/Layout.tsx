import React from 'react'

// Container
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
}

export function Container({ size, className = '', children, ...props }: ContainerProps) {
  const classes = [
    'bp-container',
    size && `bp-container-${size}`,
    className,
  ].filter(Boolean).join(' ')

  return <div className={classes} {...props}>{children}</div>
}

// Section
type SectionSize = 'sm' | 'md' | 'lg'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize
  as?: React.ElementType
}

export function Section({ size = 'md', as: Tag = 'section', className = '', children, ...props }: SectionProps) {
  const classes = [
    size === 'sm' ? 'bp-section-sm' : size === 'lg' ? 'bp-section-lg' : 'bp-section',
    className,
  ].filter(Boolean).join(' ')

  return <Tag className={classes} {...props}>{children}</Tag>
}

// Grid
type GridCols = 2 | 3 | 4

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
}

export function Grid({ cols = 3, className = '', children, ...props }: GridProps) {
  const classes = ['bp-grid', `bp-grid-${cols}`, className].filter(Boolean).join(' ')
  return <div className={classes} {...props}>{children}</div>
}

// AppLayout
export function AppLayout({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-app-layout', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
