import { useToast as useToastContext, toastMessages } from '@/contexts/ToastContext';

// Specific hooks for common operations
export const useAuthToast = () => {
  const { showToast } = useToastContext();

  return {
    loginSuccess: () => showToast.success(
      toastMessages.auth.loginSuccess.title,
      toastMessages.auth.loginSuccess.message
    ),
    loginError: (message?: string) => showToast.error(
      toastMessages.auth.loginError.title,
      message || toastMessages.auth.loginError.message
    ),
    registerSuccess: () => showToast.success(
      toastMessages.auth.registerSuccess.title,
      toastMessages.auth.registerSuccess.message
    ),
    registerError: (message?: string) => showToast.error(
      toastMessages.auth.registerError.title,
      message || toastMessages.auth.registerError.message
    ),
    logoutSuccess: () => showToast.success(
      toastMessages.auth.logoutSuccess.title,
      toastMessages.auth.logoutSuccess.message
    ),
    passwordResetSent: () => showToast.info(
      toastMessages.auth.passwordResetSent.title,
      toastMessages.auth.passwordResetSent.message
    ),
    passwordResetSuccess: () => showToast.success(
      toastMessages.auth.passwordResetSuccess.title,
      toastMessages.auth.passwordResetSuccess.message
    )
  };
};

export const useCrudToast = () => {
  const { showToast } = useToastContext();

  return {
    createSuccess: (itemName?: string) => showToast.success(
      toastMessages.crud.createSuccess.title,
      itemName ? `${itemName} berhasil ditambahkan` : toastMessages.crud.createSuccess.message
    ),
    createError: (message?: string) => showToast.error(
      toastMessages.crud.createError.title,
      message || toastMessages.crud.createError.message
    ),
    updateSuccess: (itemName?: string) => showToast.success(
      toastMessages.crud.updateSuccess.title,
      itemName ? `${itemName} berhasil diperbarui` : toastMessages.crud.updateSuccess.message
    ),
    updateError: (message?: string) => showToast.error(
      toastMessages.crud.updateError.title,
      message || toastMessages.crud.updateError.message
    ),
    deleteSuccess: (itemName?: string) => showToast.success(
      toastMessages.crud.deleteSuccess.title,
      itemName ? `${itemName} berhasil dihapus` : toastMessages.crud.deleteSuccess.message
    ),
    deleteError: (message?: string) => showToast.error(
      toastMessages.crud.deleteError.title,
      message || toastMessages.crud.deleteError.message
    ),
    // Promise-based operations for async actions
    createPromise: <T>(promise: Promise<T>, itemName?: string) => 
      showToast.promise(promise, {
        loading: `Menambahkan ${itemName || 'data'}...`,
        success: `${itemName || 'Data'} berhasil ditambahkan`,
        error: `Gagal menambahkan ${itemName || 'data'}`
      }),
    updatePromise: <T>(promise: Promise<T>, itemName?: string) =>
      showToast.promise(promise, {
        loading: `Memperbarui ${itemName || 'data'}...`,
        success: `${itemName || 'Data'} berhasil diperbarui`,
        error: `Gagal memperbarui ${itemName || 'data'}`
      }),
    deletePromise: <T>(promise: Promise<T>, itemName?: string) =>
      showToast.promise(promise, {
        loading: `Menghapus ${itemName || 'data'}...`,
        success: `${itemName || 'Data'} berhasil dihapus`,
        error: `Gagal menghapus ${itemName || 'data'}`
      })
  };
};

export const usePermitToast = () => {
  const { showToast } = useToastContext();

  return {
    submitSuccess: (permitType?: string) => showToast.success(
      toastMessages.permits.submitSuccess.title,
      permitType ? `Permohonan ${permitType} sedang diproses` : toastMessages.permits.submitSuccess.message
    ),
    submitError: (message?: string) => showToast.error(
      toastMessages.permits.submitError.title,
      message || toastMessages.permits.submitError.message
    ),
    approveSuccess: (permitType?: string) => showToast.success(
      toastMessages.permits.approveSuccess.title,
      permitType ? `${permitType} telah disetujui` : toastMessages.permits.approveSuccess.message
    ),
    rejectSuccess: (permitType?: string) => showToast.warning(
      toastMessages.permits.rejectSuccess.title,
      permitType ? `${permitType} telah ditolak` : toastMessages.permits.rejectSuccess.message
    ),
    // Promise-based operations
    submitPromise: <T>(promise: Promise<T>, permitType?: string) =>
      showToast.promise(promise, {
        loading: `Mengirim permohonan ${permitType || 'perizinan'}...`,
        success: `Permohonan ${permitType || 'perizinan'} berhasil dikirim`,
        error: `Gagal mengirim permohonan ${permitType || 'perizinan'}`
      }),
    approvePromise: <T>(promise: Promise<T>, permitType?: string) =>
      showToast.promise(promise, {
        loading: `Memproses permohonan ${permitType || 'perizinan'}...`,
        success: `${permitType || 'Permohonan'} berhasil disetujui`,
        error: `Gagal memproses permohonan ${permitType || 'perizinan'}`
      })
  };
};

export const useGeneralToast = () => {
  const { showToast } = useToastContext();

  return {
    saveSuccess: () => showToast.success(
      toastMessages.general.saveSuccess.title,
      toastMessages.general.saveSuccess.message
    ),
    saveError: (message?: string) => showToast.error(
      toastMessages.general.saveError.title,
      message || toastMessages.general.saveError.message
    ),
    loadError: () => showToast.error(
      toastMessages.general.loadError.title,
      toastMessages.general.loadError.message
    ),
    networkError: () => showToast.error(
      toastMessages.general.networkError.title,
      toastMessages.general.networkError.message
    ),
    // Custom messages
    success: (title: string, message?: string) => showToast.success(title, message),
    error: (title: string, message?: string) => showToast.error(title, message),
    warning: (title: string, message?: string) => showToast.warning(title, message),
    info: (title: string, message?: string) => showToast.info(title, message),
    // Loading states
    loading: (message: string) => showToast.loading(message),
    dismiss: (toastId?: string) => showToast.dismiss(toastId)
  };
};

// Main export that includes all toast hooks
export const useAppToast = () => ({
  ...useGeneralToast(),
  auth: useAuthToast(),
  crud: useCrudToast(),
  permit: usePermitToast()
});

export { useToast } from '@/contexts/ToastContext';
