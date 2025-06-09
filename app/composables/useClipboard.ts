import type { ToastProps } from '#ui/types'
import { useClipboard as _useClipboard } from '@vueuse/core'

export function useClipboard() {
  const { copy: _copy, copied } = _useClipboard()

  const toast = useToast()

  const copy = (source: string, optionsOptions?: ToastProps) => {
    _copy(source)
    if (optionsOptions) {
      toast.add(optionsOptions)
    }
  }

  return {
    copy,
    copied,
  }
}
