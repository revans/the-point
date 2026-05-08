import React from 'react'

// FormGroup
interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormGroup({ className = '', children, ...props }: FormGroupProps) {
  return <div className={['bp-form-group', className].filter(Boolean).join(' ')} {...props}>{children}</div>
}

// Label
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hint?: string
}

export function Label({ hint, className = '', children, ...props }: LabelProps) {
  return (
    <label className={['bp-label', className].filter(Boolean).join(' ')} {...props}>
      {children}
      {hint && <span className="bp-label-hint"> ({hint})</span>}
    </label>
  )
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = '', ...props }, ref) => {
    const classes = ['bp-input', error && 'bp-input-error', className].filter(Boolean).join(' ')
    return <input ref={ref} className={classes} {...props} />
  }
)
Input.displayName = 'Input'

// Textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', ...props }, ref) => {
    const classes = ['bp-textarea', error && 'bp-input-error', className].filter(Boolean).join(' ')
    return <textarea ref={ref} className={classes} {...props} />
  }
)
Textarea.displayName = 'Textarea'

// Select
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }, ref) => (
    <select ref={ref} className={['bp-select', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </select>
  )
)
Select.displayName = 'Select'

// FormError
export function FormError({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="bp-form-error" {...props}>{children}</p>
}

// FormHint
export function FormHint({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="bp-form-hint" {...props}>{children}</p>
}

// Checkbox
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={['bp-checkbox', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...props} />
      <span className="bp-checkbox-label">{label}</span>
    </label>
  )
}

// Radio
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={['bp-radio', className].filter(Boolean).join(' ')}>
      <input type="radio" {...props} />
      <span className="bp-radio-label">{label}</span>
    </label>
  )
}
