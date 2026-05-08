import React from 'react'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize
  src?: string
  alt?: string
}

export function Avatar({ size = 'md', src, alt = '', className = '', children, ...props }: AvatarProps) {
  const classes = ['bp-avatar', `bp-avatar-${size}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {src ? <img src={src} alt={alt} /> : children}
    </div>
  )
}
