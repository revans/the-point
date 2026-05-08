import React from 'react'

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export function Divider({ label, className = '', ...props }: DividerProps) {
  if (label) {
    return (
      <div className={['bp-divider', className].filter(Boolean).join(' ')} {...props}>
        {label}
      </div>
    )
  }
  return <hr className={className} {...(props as React.HTMLAttributes<HTMLHRElement>)} />
}

export function DottedConnector({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['bp-dotted-connector', className].filter(Boolean).join(' ')} {...props} />
}
