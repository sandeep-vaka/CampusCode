import { useCallback, useMemo, useState } from 'react'

// Small controlled-form helper: live validation, errors shown after blur or submit,
// focus moves to the first invalid field, async submit with a loading flag.
// `validate` must be a stable (module-level) function returning { field: message } for invalid fields only.
export default function useForm({ initial, validate, onSubmit }) {
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const errors = useMemo(() => validate(values), [validate, values])

  const onChange = useCallback((e) => {
    const { name, type, checked, value } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
  }, [])

  const onBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }))
  }, [])

  const field = (name) => ({ name, value: values[name], onChange, onBlur, error: touched[name] ? errors[name] : '' })
  const checkbox = (name) => ({ name, checked: values[name], onChange, onBlur, error: touched[name] ? errors[name] : '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setTouched(Object.fromEntries(Object.keys(initial).map((k) => [k, true])))
    const firstInvalid = Object.keys(errors)[0]
    if (firstInvalid) {
      form.elements[firstInvalid]?.focus()
      return
    }
    setSubmitting(true)
    setFormError('')
    try {
      await onSubmit(values)
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return { values, field, checkbox, submitting, formError, handleSubmit }
}
