import * as React from 'react';
import { createContext, useContext } from 'react';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom toast styles that match your design system
const toastStyles = {
  success: 'toast-success text-green-800',
  error: 'toast-error text-red-800', 
  warning: 'toast-warning text-yellow-800',
  info: 'toast-info text-blue-800',
} as const;

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
} as const;

interface CustomToastProps {
  type: keyof typeof toastStyles;
  title: string;
  message?: string;
  onClose: () => void;
}

const CustomToast = ({ type, title, message, onClose }: CustomToastProps) => {
  const Icon = toastIcons[type];
  
  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm',
      'min-w-[320px] max-w-[500px] animate-in slide-in-from-right-full duration-300',
      'border transition-all duration-200 hover:shadow-xl',
      toastStyles[type]
    )}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm">{title}</p>
        {message && (
          <p className="text-sm opacity-90 leading-relaxed">{message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-all duration-200 toast-close-button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

interface ToastContextType {
  showToast: {
    success: (title: string, message?: string, options?: ToastOptions) => void;
    error: (title: string, message?: string, options?: ToastOptions) => void;
    warning: (title: string, message?: string, options?: ToastOptions) => void;
    info: (title: string, message?: string, options?: ToastOptions) => void;
    loading: (title: string, options?: ToastOptions) => string;
    dismiss: (toastId?: string) => void;
    promise: <T>(
      promise: Promise<T>,
      msgs: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error | string) => string);
      },
      options?: ToastOptions
    ) => Promise<T>;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const showCustomToast = (type: keyof typeof toastStyles, title: string, message?: string, options?: ToastOptions) => {
    return toast.custom(
      (t) => (
        <CustomToast
          type={type}
          title={title}
          message={message}
          onClose={() => toast.dismiss(t.id)}
        />
      ),
      {
        duration: 5000,
        position: 'top-right',
        ...options,
      }
    );
  };

  const contextValue: ToastContextType = {
    showToast: {
      success: (title: string, message?: string, options?: ToastOptions) =>
        showCustomToast('success', title, message, options),
      
      error: (title: string, message?: string, options?: ToastOptions) =>
        showCustomToast('error', title, message, options),
      
      warning: (title: string, message?: string, options?: ToastOptions) =>
        showCustomToast('warning', title, message, options),
      
      info: (title: string, message?: string, options?: ToastOptions) =>
        showCustomToast('info', title, message, options),
      
      loading: (title: string, options?: ToastOptions) =>
        toast.loading(title, {
          duration: Infinity,
          position: 'top-right',
          ...options,
        }),
      
      dismiss: (toastId?: string) => toast.dismiss(toastId),
      
      promise: async <T,>(
        promise: Promise<T>,
        msgs: {
          loading: string;
          success: string | ((data: T) => string);
          error: string | ((error: Error | string) => string);
        },
        options?: ToastOptions
      ) => {
        return toast.promise(
          promise,
          {
            loading: msgs.loading,
            success: msgs.success,
            error: msgs.error,
          },
          {
            position: 'top-right',
            ...options,
          }
        );
      },
    },
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster
        position="top-right"
        containerClassName="toast-container"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
          className: 'toast-position-top-right',
        }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Predefined toast messages for common operations
export const toastMessages = {
  auth: {
    loginSuccess: {
      title: 'Login Berhasil!',
      message: 'Selamat datang kembali di Dashboard Desa Drawati'
    },
    loginError: {
      title: 'Login Gagal!',
      message: 'Email atau password yang Anda masukkan salah'
    },
    registerSuccess: {
      title: 'Registrasi Berhasil!',
      message: 'Akun Anda telah berhasil dibuat'
    },
    registerError: {
      title: 'Registrasi Gagal!',
      message: 'Terjadi kesalahan saat membuat akun'
    },
    logoutSuccess: {
      title: 'Logout Berhasil!',
      message: 'Anda telah berhasil keluar dari sistem'
    },
    passwordResetSent: {
      title: 'Link Reset Dikirim!',
      message: 'Silakan cek email Anda untuk link reset password'
    },
    passwordResetSuccess: {
      title: 'Password Berhasil Direset!',
      message: 'Password Anda telah berhasil diubah'
    }
  },
  crud: {
    createSuccess: {
      title: 'Data Berhasil Ditambahkan!',
      message: 'Data baru telah berhasil disimpan ke sistem'
    },
    createError: {
      title: 'Gagal Menambahkan Data!',
      message: 'Terjadi kesalahan saat menyimpan data'
    },
    updateSuccess: {
      title: 'Data Berhasil Diperbarui!',
      message: 'Perubahan telah berhasil disimpan'
    },
    updateError: {
      title: 'Gagal Memperbarui Data!',
      message: 'Terjadi kesalahan saat menyimpan perubahan'
    },
    deleteSuccess: {
      title: 'Data Berhasil Dihapus!',
      message: 'Data telah berhasil dihapus dari sistem'
    },
    deleteError: {
      title: 'Gagal Menghapus Data!',
      message: 'Terjadi kesalahan saat menghapus data'
    }
  },
  permits: {
    submitSuccess: {
      title: 'Permohonan Berhasil Dikirim!',
      message: 'Permohonan perizinan Anda sedang diproses'
    },
    submitError: {
      title: 'Gagal Mengirim Permohonan!',
      message: 'Terjadi kesalahan saat mengirim permohonan'
    },
    approveSuccess: {
      title: 'Permohonan Disetujui!',
      message: 'Permohonan perizinan telah disetujui'
    },
    rejectSuccess: {
      title: 'Permohonan Ditolak!',
      message: 'Permohonan perizinan telah ditolak'
    }
  },
  general: {
    saveSuccess: {
      title: 'Berhasil Disimpan!',
      message: 'Data telah berhasil disimpan'
    },
    saveError: {
      title: 'Gagal Menyimpan!',
      message: 'Terjadi kesalahan saat menyimpan data'
    },
    loadError: {
      title: 'Gagal Memuat Data!',
      message: 'Terjadi kesalahan saat memuat data'
    },
    networkError: {
      title: 'Koneksi Bermasalah!',
      message: 'Periksa koneksi internet Anda dan coba lagi'
    }
  }
};
