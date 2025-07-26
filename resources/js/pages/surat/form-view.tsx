import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
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
import { FileText, Home, Plane, User, FileCheck, ArrowLeft } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

// const icons = [FileText, Home, User, Plane, FileCheck];
// const colors = [
//   'bg-gradient-to-br from-blue-500 to-purple-500',    // SIUP
//   'bg-gradient-to-br from-orange-500 to-red-500',     // NIB
//   'bg-gradient-to-br from-pink-500 to-rose-500',      // SITU
//   'bg-gradient-to-br from-emerald-500 to-teal-500',   // SKU
//   'bg-gradient-to-br from-cyan-500 to-blue-500',      // IUMK
// ];

interface InputField {
  name: string;
  value: string;
  required: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  options?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  inputMode?: string;
}

interface Syarat {
  id: number | string;
  nama: string;
  href: string;
}

interface FormatSurat {
  id: number;
  nama: string;
  url_surat: string;
  deskripsi: string;
  form: InputField[] | null;
  syarat: Syarat[] | null;
}

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

interface PermitFormProps {
  id: number;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Edit Surat',
    href: '/dashboard',
  },
];

export default function PermitForm({ id }: PermitFormProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const statusOptions = [
    { value: 'diproses', label: 'Diproses' },
    { value: 'disetujui', label: 'Disetujui' },
    { value: 'ditolak', label: 'Ditolak' },
    { value: 'dicetak', label: 'Dicetak' },
  ];

  const [formatSurat, setFormatSurat] = useState<FormatSurat | null>(null);
  const [status, setStatus] = useState<String>("")
  // const [Icon, setIcon] = useState<ElementType>(icons[0]);
  
  const fetchFormatSurat = async () => {
      try {
        const response = await axios.get(`${API_URL}/surat/form/${id}`);
        // console.log(response.data)
        setStatus(response.data.status)
        setFormatSurat({
            id: response.data.format.id,
            nama: response.data.format.nama,
            url_surat: response.data.format.url_surat,
            deskripsi: response.data.format.deskripsi,
            syarat: response.data.syarat,
            form: response.data.format.form_isian,
        });
        setData({form: response.data.form});
        // setIcon(icons[(response.data.format.id - 2) % icons.length]);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast.error('Kesalahan Sistem', 'Gagal mengambil format surat');
      }
    }
    
    useEffect(() => {
      fetchFormatSurat();
    }, []);
    
    const [data, setData] = useState<{ [key: string]: any }>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setData(prev => ({
        ...prev,
        form: {
          ...prev.form,
          [name]: value,
        }
      }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
      setData(prev => ({
        ...prev,
        form: {
          ...prev.form,
          [name]: value,
        }
      }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const token = localStorage.getItem("token"); // or wherever you store it
  
        // Add form fields
        // formData.append('status', status);
  
        const response = await axios.put(`${API_URL}/surat/status/${id}`, {
          status: status
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
        });
  
        // Success handling here
        console.log("Submitted:", response.data);
        showToast.success("Data Berhasil Disimpan");
      } catch (error) {
        // Error handling here
        console.error("Submission failed:", error);
        showToast.error('Kesalahan Sistem', 'Gagal mengirim data');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        {/* change to sidebar */}
        {/* <Navbar /> */}
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
              {/* <div className={cn(
                "w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-md",
                colors[(formatSurat?.id || 0) % colors.length - 1] || 'bg-gradient-to-br from-gray-500 to-gray-700'
              )}>
                <Icon className="w-9 h-9" />
              </div> */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {formatSurat?.nama || 'Perizinan Usaha'}
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  {formatSurat?.deskripsi || 'Silakan lengkapi formulir di bawah ini dengan data yang valid dan lengkap untuk proses pengajuan perizinan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <Card className="overflow-hidden border border-gray-100 shadow-sm">            
            <CardContent className="">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-8">
                  Status
                  <Select
                    value={status}
                    onValueChange={(value) => {
                      setStatus(value)
                    }}
                    required={true}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Status Surat" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem
                          key={typeof option === 'string' ? option : option.value}
                          value={typeof option === 'string' ? option : option.value}
                          className="text-gray-700"
                        >
                          {typeof option === 'string' ? option : option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formatSurat?.form?.map((field, index) => {
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
                              value={data.form?.[field.name] || ''}
                              onValueChange={(value) => handleSelectChange(field.name, value)}
                              disabled={true}
                              required={field.required}
                            >
                              <SelectTrigger 
                                className={cn(
                                  'w-full h-11',
                                  // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                )}
                              >
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
                              value={data.form?.[field.name] || ''}
                              onChange={handleChange}
                              disabled={true}
                              placeholder={field.placeholder}
                              required={field.required}
                              className={cn(
                                'min-h-[120px] text-sm',
                                // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                              )}
                            />
                          ) : (
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              value={data.form?.[field.name] || ''}
                              onChange={handleChange}
                              disabled={true}
                              placeholder={field.placeholder}
                              required={field.required}
                              className={cn(
                                'h-11',
                                // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                              )}
                            />
                          )}
                          
                          {/* {error && (
                            <p className="text-sm text-red-600 mt-1">{error}</p>
                          )} */}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* File Upload Section */}
                  <div className="border-t border-gray-200 pt-6 md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Berkas Pendukung</h3>
                    <div className="space-y-4">
                        {
                          formatSurat?.syarat?.map((row, index) => {
                            return (
                              <div className="space-y-2">
                                <div key={index} className='flex items-center justify-between'>
                                  <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                                    {row.nama}
                                  </Label>
                                  <span className="text-xs text-red-500">Wajib diisi</span>
                                </div>
                                {
                                  row.href && row.href.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                                  <Link target='_blank' rel="noopener noreferrer" className='hover:cursor-pointer' href={row.href}>
                                    <Button type="button" className="mr-2">
                                      Lihat
                                    </Button>
                                  </Link>
                                ) : null}
                                <Link download={true} target='_blank' rel="noopener noreferrer" className='hover:cursor-pointer' href={row.href}>
                                  <Button type="button" className="mr-2">
                                    Download
                                  </Button>
                                </Link>
                              </div>
                            );
                          })
                        }
                    </div>
                  </div>
                </div>
                
                {/* Form Footer */}
                <div className="pt-6 border-t border-gray-200">
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
                      ) : 'Simpan'}
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