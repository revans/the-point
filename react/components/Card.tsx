import React from 'react'

// Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  feature?: boolean
  bracket?: boolean
}

export function Card({ hover = false, feature = false, bracket = false, className = '', children, ...props }: CardProps) {
  const classes = [
    'bp-card',
    hover && 'bp-card-hover',
    feature && 'bp-card-feature',
    bracket && 'bp-bracket',
    className,
  ].filter(Boolean).join(' ')

  return <div className={classes} {...props}>{children}</div>
}

// Card sub-components
export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-header', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-title', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-description', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-body', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-footer', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function CardFeatureIcon({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-card-feature-icon', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
