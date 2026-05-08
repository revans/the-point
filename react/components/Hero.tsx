import React from 'react'

// Hero — full centered section
export function Hero({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={['bp-hero', className].filter(Boolean).join(' ')} {...props}>{children}</section>
}

// HeroEyebrow — small label above the title
export function HeroEyebrow({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-hero-eyebrow', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

// HeroTitle
export function HeroTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={['bp-hero-title', className].filter(Boolean).join(' ')} {...props}>{children}</h1>
}

// HeroSubtitle
export function HeroSubtitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={['bp-hero-subtitle', className].filter(Boolean).join(' ')} {...props}>{children}</p>
}

// HeroActions — button row
export function HeroActions({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-hero-actions', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

// GradientText — inline span for gradient-colored words
export function GradientText({ className = '', children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={['bp-text-gradient', className].filter(Boolean).join(' ')} {...props}>{children}</span>
}

// SectionHeader — centered header above a grid section
export function SectionHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-section-header', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

// SectionLabel — monospace eyebrow above a section heading
export function SectionLabel({ className = '', children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={['bp-section-label', className].filter(Boolean).join(' ')} {...props}>{children}</span>
}

// SectionTitle
export function SectionTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={['bp-section-title', className].filter(Boolean).join(' ')} {...props}>{children}</h2>
}

// SectionSubtitle
export function SectionSubtitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={['bp-section-subtitle', className].filter(Boolean).join(' ')} {...props}>{children}</p>
}
