import { showToast, toastTypes } from '@/utils/ui'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const handleApiError = (
  error,
  setError = null,
  defaultErrorField = null
) => {
  if (!error.response) {
    const errorMessage = 'An unexpected error occurred. Please try again.'
    if (defaultErrorField && setError) {
      setError(defaultErrorField, {
        type: 'manual',
        message: errorMessage,
      })
    } else {
      showToast(errorMessage, toastTypes.error)
    }
    return
  }

  if (
    error.response &&
    error.response.data &&
    (error.response.data?.errors || error.response.data?.detail)
  ) {
    const { errors, detail } = error.response.data

    if (errors) {
      Object.entries(errors).forEach(([key, messages]) => {
        if (setError) {
          setError(key, {
            type: 'manual',
            message: messages[0],
          })
        } else {
          showToast(messages[0], toastTypes.error)
        }
      })
    } else if (detail) {
      showToast(detail, toastTypes.error)
    }
  } else {
    if (defaultErrorField) {
      setError(defaultErrorField, {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      })
    } else {
      showToast('An unexpected error occurred. Please try again.')
    }
  }
}
