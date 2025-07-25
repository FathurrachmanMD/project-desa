import * as React from "react"
import { Toast } from "./toast"

type ToastType = "default" | "success" | "destructive"

type ToastData = {
  id: string
  message: React.ReactNode
  type?: ToastType
  duration?: number
}

type ToastContextType = {
  toasts: ToastData[]
  toast: (message: React.ReactNode, options?: { type?: ToastType; duration?: number }) => void
  dismissToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const toast = React.useCallback(
    (message: React.ReactNode, { type = "default", duration = 5000 } = {}) => {
      const id = Math.random().toString(36).substring(2, 9)
      
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type, duration },
      ])

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
        }, duration)
      }
    },
    []
  )

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismissToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-xs flex-col space-y-2">
        {toasts.map(({ id, message, type }) => (
          <Toast
            key={id}
            variant={type}
            onClose={() => dismissToast(id)}
            className="w-full"
          >
            {message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Helper functions for common toast types
export function useToaster() {
  const { toast } = useToast()
  
  return {
    success: (message: React.ReactNode, duration?: number) => 
      toast(message, { type: "success", duration }),
    error: (message: React.ReactNode, duration?: number) => 
      toast(message, { type: "destructive", duration }),
    info: (message: React.ReactNode, duration?: number) => 
      toast(message, { type: "default", duration }),
  }
}
