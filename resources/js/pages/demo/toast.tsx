import * as React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppToast } from '@/hooks/useToast';

export default function ToastDemo() {
  const toast = useAppToast();

  const handleAuthSuccess = () => {
    toast.auth.loginSuccess();
  };

  const handleAuthError = () => {
    toast.auth.loginError();
  };

  const handleRegisterSuccess = () => {
    toast.auth.registerSuccess();
  };

  const handlePasswordReset = () => {
    toast.auth.passwordResetSent();
  };

  const handleCrudCreate = () => {
    toast.crud.createSuccess('Data Penduduk');
  };

  const handleCrudUpdate = () => {
    toast.crud.updateSuccess('Informasi Profil');
  };

  const handleCrudDelete = () => {
    toast.crud.deleteSuccess('Data Perizinan');
  };

  const handleCrudError = () => {
    toast.crud.createError('Periksa kembali data yang diisi');
  };

  const handlePermitSubmit = () => {
    toast.permit.submitSuccess('Surat Keterangan Usaha');
  };

  const handlePermitApprove = () => {
    toast.permit.approveSuccess('Izin Usaha Mikro');
  };

  const handlePermitReject = () => {
    toast.permit.rejectSuccess('Surat Izin Tempat Usaha');
  };

  const handleCustomSuccess = () => {
    toast.success('Operasi Berhasil!', 'Data berhasil diproses sesuai permintaan');
  };

  const handleCustomWarning = () => {
    toast.warning('Perhatian!', 'Pastikan semua data sudah benar sebelum melanjutkan');
  };

  const handleCustomInfo = () => {
    toast.info('Informasi Sistem', 'Sistem akan melakukan pemeliharaan pada pukul 02:00 WIB');
  };

  const handleCustomError = () => {
    toast.error('Terjadi Kesalahan!', 'Silakan hubungi administrator jika masalah berlanjut');
  };

  const handlePromiseDemo = () => {
    const simulateAsyncOperation = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly succeed or fail for demo
        Math.random() > 0.5 ? resolve('Success') : reject(new Error('Failed'));
      }, 2000);
    });

    toast.crud.createPromise(simulateAsyncOperation, 'Dokumen Baru');
  };

  return (
    <AppLayout>
      <Head title="Demo Toast Notifications" />
      
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Demo Toast Notifications
          </h1>
          <p className="text-gray-600">
            Demonstrasi sistem notifikasi modern untuk aplikasi Desa Drawati
          </p>
        </div>

        {/* Authentication Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔐 Authentication Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={handleAuthSuccess} variant="default">
                Login Berhasil
              </Button>
              <Button onClick={handleAuthError} variant="destructive">
                Login Gagal
              </Button>
              <Button onClick={handleRegisterSuccess} variant="default">
                Register Berhasil
              </Button>
              <Button onClick={handlePasswordReset} variant="secondary">
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CRUD Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 CRUD Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={handleCrudCreate} variant="default">
                Create Success
              </Button>
              <Button onClick={handleCrudUpdate} variant="default">
                Update Success
              </Button>
              <Button onClick={handleCrudDelete} variant="default">
                Delete Success
              </Button>
              <Button onClick={handleCrudError} variant="destructive">
                CRUD Error
              </Button>
            </div>
            <Separator />
            <div className="flex justify-center">
              <Button onClick={handlePromiseDemo} variant="outline">
                Promise-based Operation (Random Result)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Permit Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Permit Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={handlePermitSubmit} variant="default">
                Submit Permit
              </Button>
              <Button onClick={handlePermitApprove} variant="default">
                Approve Permit
              </Button>
              <Button onClick={handlePermitReject} variant="secondary">
                Reject Permit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Custom Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎨 Custom Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={handleCustomSuccess} className="bg-green-600 hover:bg-green-700">
                Success
              </Button>
              <Button onClick={handleCustomWarning} className="bg-yellow-600 hover:bg-yellow-700">
                Warning
              </Button>
              <Button onClick={handleCustomInfo} className="bg-blue-600 hover:bg-blue-700">
                Info
              </Button>
              <Button onClick={handleCustomError} variant="destructive">
                Error
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📚 Implementation Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold">Cara Penggunaan:</h3>
              <div className="space-y-2">
                <p><strong>1. Import hooks:</strong></p>
                <code className="bg-white p-2 rounded block">
                  import {`{ useAppToast }`} from '@/hooks/useToast';
                </code>
                
                <p><strong>2. Gunakan dalam component:</strong></p>
                <code className="bg-white p-2 rounded block">
                  const toast = useAppToast(); <br/>
                  toast.auth.loginSuccess(); <br/>
                  toast.crud.updateSuccess('Data User');
                </code>

                <p><strong>3. Kategori yang tersedia:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Auth:</strong> loginSuccess, loginError, registerSuccess, passwordResetSent</li>
                  <li><strong>CRUD:</strong> createSuccess, updateSuccess, deleteSuccess, dengan variasi Promise</li>
                  <li><strong>Permit:</strong> submitSuccess, approveSuccess, rejectSuccess</li>
                  <li><strong>Custom:</strong> success, error, warning, info, loading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
