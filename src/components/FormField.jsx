import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const inputCls =
  'h-12 w-full border border-[#b8b8b0] bg-white px-4 text-sm text-ink outline-none placeholder:text-[#aaa] ' +
  'transition-[border-color,box-shadow] duration-200 focus:border-ink focus:shadow-[0_0_0_3px_rgb(118_101_255/0.18)] ' +
  'aria-[invalid=true]:border-[#c0392b]'

// Reserved line height so showing/hiding an error never shifts the layout.
export function FieldError({ id, children }) {
  return <p id={id} aria-live="polite" className="min-h-[20px] pt-1 text-xs leading-[1.4] text-[#c0392b]">{children}</p>
}

export default function FormField({ label, error, hint, trailing, className = '', ...input }) {
  const id = useId()
  const describedBy = [hint && `${id}-hint`, `${id}-err`].filter(Boolean).join(' ')
  return (
    <div className={`mb-2 ${className}`}>
      <label htmlFor={id} className="mono-label mb-2 block">{label}</label>
      <div className="relative">
        <input id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`${inputCls} ${trailing ? 'pr-12' : ''}`} {...input} />
        {trailing}
      </div>
      {hint && <p id={`${id}-hint`} className="pt-1 text-xs text-muted">{hint}</p>}
      <FieldError id={`${id}-err`}>{error}</FieldError>
    </div>
  )
}

export function PasswordField(props) {
  const [show, setShow] = useState(false)
  return (
    <FormField
      {...props}
      type={show ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="absolute right-0 top-0 grid h-12 w-12 place-items-center text-muted transition-colors hover:text-ink"
        >
          {show ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      }
    />
  )
}
