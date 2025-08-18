import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/contexts/ToastContext';
import { ArrowLeft } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import React from 'react';

// --- INTERFACES & TYPES ---

interface InputConfig {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  required: boolean;
  options?: string[];
  readonly?: boolean;
}

type FormData = {
  [key: string]: string;
};

interface Props {
  slug: string;
  id?: number;
  lapak?: FormData;
}

// --- STATIC FORM CONFIGURATION ---

const inputs: { [key: string]: InputConfig } = {
  nama_pemilik: { name: 'nama_pemilik', label: 'Nama Pemilik', placeholder: 'Nama pemilik dari data kependudukan', type: 'text', required: true, readonly: true },
  nama: { name: 'nama', label: 'Nama Lapak', placeholder: 'Masukkan nama lapak', type: 'text', required: true },
  telepon: { name: 'telepon', label: 'Nomor Telepon', placeholder: 'Masukkan nomor telepon aktif', type: 'number', required: true },
  email: { name: 'email', label: 'Alamat Email', placeholder: 'Masukkan email aktif', type: 'number', required: false },
  deskripsi: { name: 'deskripsi', label: 'Deskripsi Lapak', placeholder: 'Jelaskan secara singkat tentang lapak Anda', type: 'textarea', required: false },
  alamat: { name: 'alamat', label: 'Alamat Lapak', placeholder: 'Alamat lengkap lapak', type: 'textarea', required: false },
  status: { name: 'status', label: 'Status Perizinan', placeholder: 'Pilih Status', type: 'select', required: true, options: ['diproses', 'disetujui', 'ditolak'] },
};

const createDefaultData = (): FormData => {
  const defaultData: FormData = {};
  Object.keys(inputs).forEach(key => {
    defaultData[key] = '';
  });
  return defaultData;
};


export default function LapakForm({ slug, id, lapak }: Props) {
  const isEditMode = !!lapak;
  const { showToast } = useToast();
  
  // Access validation errors from Inertia's page props
  const { errors } = usePage().props as { errors: Partial<Record<keyof FormData, string>> };

  const [data, setData] = useState<FormData>(lapak || createDefaultData());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manajemen Lapak', href: `/perizinan/lapak` },
    { title: isEditMode ? 'Edit Lapak' : 'Tambah Lapak Baru', href: '/perizinan/lapak' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const commonOptions = {
        onStart: () => setIsSubmitting(true),
        onFinish: () => setIsSubmitting(false),
        onError: (errorBag: any) => {
            console.error(errorBag);
            showToast.error("Terjadi kesalahan. Periksa kembali isian Anda.");
        },
    };

    if (isEditMode) {
        router.put(route('lapak.update', id), data, {
            ...commonOptions,
            onSuccess: () => {
                showToast.success("Data lapak berhasil diperbarui!");
            },
        });
    } else {
        router.post(route('lapak.store'), data, {
            ...commonOptions,
            onSuccess: () => {
                showToast.success("Lapak baru berhasil ditambahkan!");
                setData(createDefaultData()); // Reset form
            },
        });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/perizinan/${slug}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
          </Link>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {isEditMode ? 'Edit Data Lapak' : 'Formulir Lapak Baru'}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              {isEditMode
                ? 'Perbarui informasi lapak di bawah ini. Pastikan semua data sudah benar.'
                : 'Lengkapi formulir di bawah ini untuk mendaftarkan lapak baru.'
              }
            </p>
          </div>
        </div>

        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(inputs).map((field) => (
                  <div key={field.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">{field.label}</Label>
                      {field.required && (
                        <span className="text-xs text-red-500">Wajib diisi</span>
                      )}
                    </div>
                    
                    {field.type === 'select' ? (
                      <Select value={data[field.name] || ''} onValueChange={(value) => handleSelectChange(field.name, value)} required={field.required} disabled={isSubmitting}>
                        <SelectTrigger className="w-full h-11">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option} className="text-gray-700">{option.charAt(0).toUpperCase() + option.slice(1)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'textarea' ? (
                      <Textarea id={field.name} name={field.name} value={data[field.name] || ''} onChange={handleChange} placeholder={field.placeholder} required={field.required} disabled={isSubmitting || field.readonly} className={cn('min-h-[120px] text-sm', field.readonly && 'bg-gray-50')} />
                    ) : (
                      <Input id={field.name} name={field.name} type={field.type as any} value={data[field.name] || ''} onChange={handleChange} placeholder={field.placeholder} required={field.required} disabled={isSubmitting || field.readonly} readOnly={field.readonly} className={cn('h-11', field.readonly && 'bg-gray-50')} />
                    )}
                    {errors[field.name] && <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>}
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Informasi Penting</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Pastikan data yang Anda masukkan sudah benar dan lengkap. Pengajuan yang sudah dikirim tidak dapat dibatalkan atau diubah.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Dengan mengirimkan formulir ini, saya menyatakan bahwa data yang saya berikan adalah benar.
                  </p>
                  <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </div>
                    ) : (isEditMode ? 'Simpan Perubahan' : 'Kirim Pendaftaran')}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}