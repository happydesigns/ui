import type { ToastProps } from '#ui/types'
import { useClipboard as _useClipboard } from '@vueuse/core'

type ClipboardToast = Partial<ToastProps> & { id?: string | number }

export type ClipboardCopyOptions = ClipboardToast & {
  error?: ClipboardToast
}

export function useClipboard() {
  const { copy: copyToClipboard, copied } = _useClipboard()
  const toast = useToast()

  function upsertToast(options: ClipboardToast) {
    const { id, ...toastOptions } = options

    if (id !== undefined && toast.toasts.value.some(toastItem => toastItem.id === id)) {
      toast.update(id, toastOptions)
      return
    }

    toast.add(id === undefined ? toastOptions : { ...toastOptions, id })
  }

  const copy = async (source: string, options?: ClipboardCopyOptions): Promise<boolean> => {
    const { error: errorToast, ...successToast } = options ?? {}

    try {
      await copyToClipboard(source)

      if (Object.keys(successToast).length > 0)
        upsertToast(successToast)

      return true
    }
    catch {
      if (errorToast)
        upsertToast(errorToast)

      return false
    }
  }

  return {
    copy,
    copied,
  }
}
