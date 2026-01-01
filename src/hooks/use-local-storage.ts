import { useEffect, useRef } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

export function useFormLocalStorage<T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string,
) {
  const allowSaveRef = useRef(true)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)

    if (saved) {
      try {
        allowSaveRef.current = false
        form.reset(JSON.parse(saved))
        allowSaveRef.current = true
      } catch (e) {
        console.error('Failed to parse saved form values', e)
      }
    }
  }, [form, storageKey])

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (allowSaveRef.current) {
        localStorage.setItem(storageKey, JSON.stringify(values))
      }
    })

    return () => subscription.unsubscribe()
  }, [form, storageKey])

  const clearLocalStorage = () => {
    allowSaveRef.current = false
    localStorage.removeItem(storageKey)
  }

  return { clearLocalStorage }
}
