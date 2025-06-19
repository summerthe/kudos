import toast from 'react-hot-toast'

export const toastTypes = {
  success: message => toast.success(message),
  error: message => toast.error(message),
  warning: message => toast.warning(message),
  info: message => toast.info(message),
}

export const showToast = (message, toastType = toastTypes.success) => {
  toast.remove()
  toastType(message)
}
