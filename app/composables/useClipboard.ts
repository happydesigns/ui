import type { ToastProps } from '#ui/types'
import { useClipboard as _useClipboard } from '@vueuse/core'

export function useClipboard() {
  const { copy: _copy, copied } = _useClipboard()

  const toast = useToast()

  const copy = (source: string, options?: Partial<ToastProps> & { id?: string | number }) => {
    _copy(source)
    if (options) {
      // Check if toast with this ID already exists to prevent spam
      if (options.id && toast.toasts.value.some(t => t.id === options.id)) {
        toast.update(options.id, options)
      }
      else {
        toast.add(options as any)
      }
    }
  }

  return {
    copy,
    copied,
  }
}
