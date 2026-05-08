import React from 'react'

export function Sidebar({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <aside className={['bp-sidebar', className].filter(Boolean).join(' ')} {...props}>{children}</aside>
}

export function SidebarHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-sidebar-header', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

export function SidebarNav({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={['bp-sidebar-nav', className].filter(Boolean).join(' ')} {...props}>{children}</nav>
}

export function SidebarLabel({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-sidebar-label', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export function SidebarItem({ active = false, className = '', children, ...props }: SidebarItemProps) {
  const classes = ['bp-sidebar-item', active && 'active', className].filter(Boolean).join(' ')
  return <a className={classes} {...props}>{children}</a>
}

export function MainContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <main className={['bp-main-content', className].filter(Boolean).join(' ')} {...props}>{children}</main>
}
