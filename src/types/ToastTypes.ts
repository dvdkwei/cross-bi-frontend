export type Toast = {
  message: string,
  timeout: number, 
  style: 'toast-success' | 'toast-error' | 'toast-warning'
}

export type ToastProviderValue = {
  addToast: (newToast: Toast) => void
}