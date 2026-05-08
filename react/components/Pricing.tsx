import React from 'react'

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  featured?: boolean
}

export function PricingCard({ featured = false, className = '', children, ...props }: PricingCardProps) {
  const classes = [
    'bp-pricing-card',
    featured && 'bp-pricing-card-featured',
    className,
  ].filter(Boolean).join(' ')

  return <div className={classes} style={{ position: 'relative' }} {...props}>{children}</div>
}

export function PricingPlan({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-pricing-plan', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function PricingPrice({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-pricing-price', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function PricingAmount({ className = '', children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={['bp-pricing-amount', className].filter(Boolean).join(' ')} {...props}>{children}</span>
}

export function PricingPeriod({ className = '', children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={['bp-pricing-period', className].filter(Boolean).join(' ')} {...props}>{children}</span>
}

export function PricingDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={['bp-pricing-description', className].filter(Boolean).join(' ')} {...props}>{children}</p>
}

export function PricingFeatures({ className = '', children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={['bp-pricing-features', className].filter(Boolean).join(' ')} {...props}>{children}</ul>
}

interface PricingFeatureProps extends React.HTMLAttributes<HTMLLIElement> {
  included?: boolean
  icon?: React.ReactNode
}

export function PricingFeature({ included = true, icon, className = '', children, ...props }: PricingFeatureProps) {
  const checkIcon = (
    <svg className="bp-pricing-feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
  const xIcon = (
    <svg className="bp-pricing-feature-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )

  return (
    <li className={['bp-pricing-feature', className].filter(Boolean).join(' ')} {...props}>
      {icon ?? (included ? checkIcon : xIcon)}
      {included ? children : <span style={{ color: 'var(--color-text-muted)' }}>{children}</span>}
    </li>
  )
}
