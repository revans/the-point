import React from 'react'

// Nav
export function Nav({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={['bp-nav', className].filter(Boolean).join(' ')} {...props}>{children}</nav>
}

// NavInner — the flex row inside the container
export function NavInner({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-nav-inner', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

// NavBrand
interface NavBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function NavBrand({ className = '', children, ...props }: NavBrandProps) {
  return <a className={['bp-nav-brand', className].filter(Boolean).join(' ')} {...props}>{children}</a>
}

// NavLinks
export function NavLinks({ className = '', children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={['bp-nav-links', className].filter(Boolean).join(' ')} {...props}>{children}</ul>
}

// NavLink
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export function NavLink({ active = false, className = '', children, ...props }: NavLinkProps) {
  const classes = ['bp-nav-link', active && 'active', className].filter(Boolean).join(' ')
  return <li><a className={classes} {...props}>{children}</a></li>
}

// NavActions
export function NavActions({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-nav-actions', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}
