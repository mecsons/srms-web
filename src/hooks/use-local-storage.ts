import { useEffect, useRef } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

export function useFormLocalStorage<T extends FieldValues>(form: UseFormReturn<T>, storageKey: string, enabled = true) {
  const allowSaveRef = useRef(true)

  useEffect(() => {
    if (!enabled) return
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
  }, [enabled, form, storageKey])

  useEffect(() => {
    if (!enabled) return
    const subscription = form.watch((values) => {
      if (allowSaveRef.current) {
        localStorage.setItem(storageKey, JSON.stringify(values))
      }
    })

    return () => subscription.unsubscribe()
  }, [enabled, form, storageKey])

  const clearLocalStorage = () => {
    if (!enabled) return
    allowSaveRef.current = false
    localStorage.removeItem(storageKey)
  }

  return { clearLocalStorage }
}
