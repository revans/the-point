import React from 'react'

interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  name: string
  role: string
  avatar?: React.ReactNode
}

export function Testimonial({ quote, name, role, avatar, className = '', ...props }: TestimonialProps) {
  return (
    <div className={['bp-testimonial', className].filter(Boolean).join(' ')} {...props}>
      <p className="bp-testimonial-quote">"{quote}"</p>
      <div className="bp-testimonial-author">
        {avatar}
        <div>
          <div className="bp-testimonial-name">{name}</div>
          <div className="bp-testimonial-role">{role}</div>
        </div>
      </div>
    </div>
  )
}
