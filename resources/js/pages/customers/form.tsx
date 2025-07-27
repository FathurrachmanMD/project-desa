import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect, ElementType } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import { ArrowLeft } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios'; // Kept for form submission

interface InputField {
  name: string;
  value: string;
  required: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Changed to string to be JSON-compatible
  options?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
}

interface FieldFormat {
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'password'; // extend if needed
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'url';
  value?: string;
  pattern?: string;
  options?: string[]; // for select, radio, etc.
}


const fields: FieldFormat[] = [
    { name: 'nama', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true, value: '' },
    { name: 'nik', label: 'NIK', placeholder: 'Masukkan 16 digit NIK', type: 'text', required: true, minLength: 16, maxLength: 16, inputMode: 'numeric', value: '' },
    { name: 'email', label: 'Alamat Email', placeholder: 'contoh@email.com', type: 'email', required: false, value: '' },
    { name: 'telepon', label: 'Nomor Telepon / WhatsApp', placeholder: '08XXXXXXXXX', type: 'tel', required: false, inputMode: 'tel', value: '' }
];

type customer = {
  id?: number;
  name?: string;
  nik?: number;
  email?: string;
  telepon?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Buat Surat',
    href: '/dashboard',
  },
  {
    title: "",
    href: '#',
  }
];

export default function CustomerForm({ id }: {id?: number | null}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const getCustomer = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/penduduk/${id}`);
      setData(response.data);
    }
    catch (error) {
      console.error(error);
      showToast.error("Terjadi kesalahan");
    }
    finally {
      setIsLoading(false);
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFileChange = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] ?? null;
    
  //   setData((prev) => ({
  //     ...prev,
  //     file: {
  //       ...prev.file,
  //       [id]: file,
  //     },
  //   }));
  // };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const token = localStorage.getItem("token"); // or wherever you store it

      // Add form fields directly (no nested form)
      Object.entries(data).forEach(([key, value]) => {
        // Only append if not a file, we'll handle files separately
        if (!(value instanceof File)) {
          formData.append(key, value as string);
        }
      });

      console.log(data)
      console.log("Submitted:", formData);
      const response = await axios.put(`${API_URL}/penduduk/form/${id ? id : ''}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      showToast.success("Data Berhasil Disimpan");
    } catch (error) {
      console.error("Submission failed:", error);
      showToast.error('Kesalahan Sistem', 'Gagal mengirim data');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [id]);

  return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="px-0 py-2 -ml-2 hover:bg-transparent hover:underline"
              onClick={() => window.history.back()}
              >
              <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
            </Button>
          </div>
          
          {/* Header Section */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {'Buat Data Penduduk'}
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  {'Silakan lengkapi formulir di bawah ini dengan data yang valid dan lengkap untuk membuat data penduduk.'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <Card className="overflow-hidden border border-gray-100 shadow-sm">          
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-8">
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field) => {
                        return (
                            <div key={field.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                {field.label}
                                </Label>
                                {field.required && (
                                <span className="text-xs text-red-500">Wajib diisi</span>
                                )}
                            </div>
                            {field.type === 'select' && field.options ? (
                                <Select
                                value={data ? data[field.name] : ''}
                                onValueChange={(value) => handleSelectChange(field.name, value)}
                                disabled={isSubmitting}
                                required={field.required}
                                >
                                <SelectTrigger className='w-full h-11'>
                                    <SelectValue placeholder={`Pilih ${field?.label || ''}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options.map((option) => (
                                    <SelectItem 
                                        key={option} 
                                        value={option}
                                        className="text-gray-700"
                                    >
                                        {option}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            ) : field.type === 'textarea' ? (
                                <Textarea
                                id={field.name}
                                name={field.name}
                                value={data ? data[field.name] : ''}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder={field.placeholder}
                                required={field.required}
                                className='min-h-[120px] text-sm'
                                />
                            ) : (
                                <Input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={data ? data[field.name] : ''}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                placeholder={field.placeholder}
                                required={field.required}
                                minLength={field.minLength}
                                maxLength={field.maxLength}
                                pattern={field.pattern}
                                inputMode={field.inputMode}
                                className='h-11'
                                />
                            )}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                    
                    {/* Form Footer */}
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
                            <p>
                                Pastikan data yang Anda masukkan sudah benar dan lengkap. Dokumen yang diunggah harus jelas dan dapat dibaca.
                                Pengajuan yang sudah dikirim tidak dapat dibatalkan atau diubah.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-sm text-gray-600">
                        Dengan mengirimkan formulir ini, saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
                        </p>
                        <Button 
                        type="submit" 
                        className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? (
                            <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                            </div>
                        ) : 'Ajukan Sekarang'}
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
