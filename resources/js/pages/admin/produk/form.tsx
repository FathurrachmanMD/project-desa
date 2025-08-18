import { Link, router, useForm } from '@inertiajs/react'; // Import useForm
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
  type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'date';
  required: boolean;
  options?: string[];
  readonly?: boolean;
}

// Represents a file coming from the server
interface ProdukFile {
    nama: string;
    href: string;
}

// Represents the form data from the server when editing
interface ProdukData {
    [key: string]: string | number | ProdukFile[];
    files: ProdukFile[];
}

// Represents the state of our form, which can include files for upload
type FormData = {
  [key: string]: string | File | null;
  
};

interface Props {
  id?: number;
  produk?: ProdukData;
}

// --- STATIC FORM CONFIGURATION ---

const inputs: { [key: string]: InputConfig } = {
  nama: { 
    name: 'nama', 
    label: 'Nama Produk', 
    placeholder: 'Masukkan nama produk', 
    type: 'text', 
    required: true 
  },
  deskripsi: { 
    name: 'deskripsi', 
    label: 'Deskripsi Produk', 
    placeholder: 'Masukkan deskripsi produk', 
    type: 'textarea', 
    required: false 
  },
  stok: { 
    name: 'stok', 
    label: 'Stok', 
    placeholder: 'Masukkan jumlah stok', 
    type: 'number', 
    required: true 
  },
  satuan: { 
    name: 'satuan', 
    label: 'Satuan', 
    placeholder: 'Masukkan satuan (contoh: pcs, kg, liter)', 
    type: 'text', 
    required: false 
  },
  harga: { 
    name: 'harga', 
    label: 'Harga', 
    placeholder: 'Masukkan harga produk', 
    type: 'number', 
    required: true 
  },
  status: { 
    name: 'status', 
    label: 'Status Produk', 
    placeholder: 'Pilih status produk', 
    type: 'select', 
    required: true, 
    options: ['diproses', 'disetujui', 'ditolak'] 
  }
};

const createDefaultData = (): FormData => {
  const defaultData: any = {
    gambar_produk: null,
  };
  Object.keys(inputs).forEach(key => {
    defaultData[key] = '';
  });
  return defaultData;
};


export default function ProdukForm({ id, produk }: Props) {
  const isEditMode = !!produk;
  const { showToast } = useToast();

  const { data, setData, post, processing, errors, reset } = useForm(
    // Initialize form with product data or defaults, ensuring 'gambar_produk' is null
    {
        ...createDefaultData(),
        ...produk,
    }
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manajemen Produk', href: `/produk` },
    { title: isEditMode ? 'Edit Produk' : 'Tambah Produk Baru', href: isEditMode ? `/produk/${id}/edit` : '/produk/create' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as any, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(name as any, value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          setData('gambar_produk', e.target.files[0]);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const commonOptions = {
        onSuccess: () => {
            reset();
            showToast.success(isEditMode ? "Produk berhasil diperbarui!" : "Produk baru berhasil ditambahkan!");
        },
        onError: (errorBag: any) => {
            console.error(errorBag);
            showToast.error("Terjadi kesalahan. Periksa kembali isian Anda.");
        },
    };

    if (isEditMode) {
      // IMPORTANT: To upload files with a PUT/PATCH request, you MUST use a POST request
      // and spoof the method by adding a `_method: 'PUT'` field to your data.
      // Inertia's `put()` method does not support multipart/form-data.
      post(route('produk.update', id), {
        ...commonOptions,
        data: {
            ...data,
            _method: 'PUT',
        }
      });
    } else {
      post(route('produk.store'), commonOptions);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/produk`} className="inline-flex items-center text-gray-600 hover:text-gray-900 hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
          </Link>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {isEditMode ? 'Edit Data Produk' : 'Formulir Produk Baru'}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              {isEditMode
                ? 'Perbarui informasi produk di bawah ini. Pastikan semua data sudah benar.'
                : 'Lengkapi formulir di bawah ini untuk mendaftarkan produk baru.'
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
                      <Select value={data[field.name] as string || ''} onValueChange={(value) => handleSelectChange(field.name, value)} required={field.required} disabled={processing}>
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
                      <Textarea id={field.name} name={field.name} value={data[field.name] as string || ''} onChange={handleChange} placeholder={field.placeholder} required={field.required} disabled={processing || field.readonly} className={cn('min-h-[120px] text-sm', field.readonly && 'bg-gray-50')} />
                    ) : (
                      <Input id={field.name} name={field.name} type={field.type} value={data[field.name] as string || ''} onChange={handleChange} placeholder={field.placeholder} required={field.required} disabled={processing || field.readonly} readOnly={field.readonly} className={cn('h-11', field.readonly && 'bg-gray-50')} />
                    )}
                    {errors[field.name] && <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>}
                  </div>
                ))}

                {/* --- FILE UPLOAD / VIEW SECTION --- */}
                <div className="border-t border-gray-200 pt-6 md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Berkas Pendukung</h3>
                    {isEditMode ? (
                        <div className="space-y-4">
                            {produk?.files && produk.files.length > 0 ? (
                                produk.files.map((file, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className='flex items-center justify-between'>
                                            <Label className="text-sm font-medium text-gray-700">{file.nama}</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {file.href?.match(/\.(jpeg|jpg|png|gif|webp)$/i) && (
                                                <Link target='_blank' rel="noopener noreferrer" href={file.href}>
                                                    <Button type="button" variant="outline">Lihat</Button>
                                                </Link>
                                            )}
                                            <Link download={true} target='_blank' rel="noopener noreferrer" href={file.href}>
                                                <Button type="button">Download</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Tidak ada berkas yang diunggah.</p>
                            )}
                        </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                             <div className='flex items-center justify-between'>
                                <Label htmlFor="gambar_produk" className="text-sm font-medium text-gray-700">Gambar Produk</Label>
                                <span className="text-xs text-red-500">Wajib diisi</span>
                            </div>
                            <Input
                                id="foto"
                                name="foto"
                                type="file"
                                onChange={handleFileChange}
                                disabled={processing}
                                accept=".pdf,.doc,.docx,image/*"
                                required
                                className={cn('border-dashed border-2', errors.gambar_produk ? 'border-red-500' : 'border-gray-300')}
                            />
                            {errors.gambar_produk && <p className="text-sm text-red-600 mt-1">{errors.gambar_produk}</p>}
                            <p className="text-xs text-gray-500 mt-1">
                                Format file: PDF, DOC, DOCX, JPG, PNG (Maks. 5MB)
                            </p>
                        </div>
                        <div className="space-y-2">
                             <div className='flex items-center justify-between'>
                                <Label htmlFor="gambar_produk" className="text-sm font-medium text-gray-700">Bukti Surat Izin</Label>
                                <span className="text-xs text-red-500">Wajib diisi</span>
                            </div>
                            <Input
                                id="surat"
                                name="surat"
                                type="file"
                                onChange={handleFileChange}
                                disabled={processing}
                                accept=".pdf,.doc,.docx,image/*"
                                required
                                className={cn('border-dashed border-2', errors.gambar_produk ? 'border-red-500' : 'border-gray-300')}
                            />
                            {errors.gambar_produk && <p className="text-sm text-red-600 mt-1">{errors.gambar_produk}</p>}
                            <p className="text-xs text-gray-500 mt-1">
                                Format file: PDF, DOC, DOCX, JPG, PNG (Maks. 5MB)
                            </p>
                        </div>
                      </>
                    )}
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                {/* ... Rest of the form footer ... */}
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
                  <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={processing}>
                    {processing ? (
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