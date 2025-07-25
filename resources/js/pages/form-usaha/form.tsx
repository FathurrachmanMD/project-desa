import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { Building2, FileText, ShoppingBag, Store, Briefcase, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

interface FormProps {
    type: 'siup' | 'nib' | 'situ' | 'sku' | 'iumk';
}

const permitTypes = {
    siup: {
        title: 'Surat Izin Usaha Perdagangan (SIUP)',
        description: 'Izin untuk menjalankan kegiatan usaha perdagangan',
        icon: Store,
        color: 'bg-gradient-to-br from-blue-500 to-purple-500',
    },
    nib: {
        title: 'Nomor Induk Berusaha (NIB)',
        description: 'Identitas pelaku usaha untuk memulai dan menjalankan usaha',
        icon: FileText,
        color: 'bg-gradient-to-br from-orange-500 to-red-500',
    },
    situ: {
        title: 'Surat Izin Tempat Usaha (SITU)',
        description: 'Izin yang menyatakan keabsahan lokasi tempat usaha',
        icon: Building2,
        color: 'bg-gradient-to-br from-pink-500 to-rose-500',
    },
    sku: {
        title: 'Surat Keterangan Usaha (SKU)',
        description: 'Surat keterangan yang menyatakan keberadaan usaha',
        icon: ShoppingBag,
        color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    },
    iumk: {
        title: 'Izin Usaha Mikro Kecil (IUMK)',
        description: 'Izin untuk usaha mikro dan kecil',
        icon: Briefcase,
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    }
};

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

const dropdownOptions = {
  rekomendasi_rtrw: [
    { value: 'sudah', label: 'Sudah' },
    { value: 'belum', label: 'Belum' },
  ],
  status_kepemilikan: [
    { value: 'sewa', label: 'Sewa' },
    { value: 'milik_sendiri', label: 'Milik Sendiri' },
  ],
  status_tanah: [
    { value: 'milik_sendiri', label: 'Milik Sendiri' },
    { value: 'sewa', label: 'Sewa' },
    { value: 'hibah', label: 'Hibah' },
  ],
  jenis_renovasi: [
    { value: 'renovasi', label: 'Renovasi' },
    { value: 'perluasan', label: 'Perluasan' },
    { value: 'tambah_lantai', label: 'Tambah Lantai' },
  ],
};

const permitFieldMap: Record<string, { 
  label: string; 
  name: string; 
  type: string; 
  required?: boolean;
  inputType?: 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}> = {
  nama_pemohon: { 
    label: 'Nama Pemohon', 
    name: 'nama_pemohon', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan nama lengkap pemohon'
  },
  nik: { 
    label: 'NIK', 
    name: 'nik', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan NIK sesuai KTP'
  },
  nama_usaha: { 
    label: 'Nama Usaha', 
    name: 'nama_usaha', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan nama usaha'
  },
  alamat_usaha: { 
    label: 'Alamat Usaha', 
    name: 'alamat_usaha', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alamat lengkap usaha'
  },
  lama_usaha: { 
    label: 'Lama Usaha', 
    name: 'lama_usaha', 
    type: 'text', 
    required: true,
    placeholder: 'Contoh: 2 tahun'
  },
  jenis_usaha: { 
    label: 'Jenis Usaha', 
    name: 'jenis_usaha', 
    type: 'text', 
    required: true,
    placeholder: 'Contoh: Makanan, Jasa, dll.'
  },
  modal_usaha: { 
    label: 'Modal Usaha', 
    name: 'modal_usaha', 
    type: 'text', 
    required: true,
    placeholder: 'Contoh: Rp 50.000.000'
  },
  status_tempat_usaha: { 
    label: 'Status Tempat Usaha', 
    name: 'status_tempat_usaha', 
    type: 'select',
    options: dropdownOptions.status_kepemilikan,
    required: true
  },
  status_lahan: { 
    label: 'Status Tanah', 
    name: 'status_lahan', 
    type: 'select',
    options: dropdownOptions.status_tanah,
    required: true
  },
  rekomendasi_rtrw: { 
    label: 'Rekomendasi RT/RW', 
    name: 'rekomendasi_rtrw', 
    type: 'select',
    options: dropdownOptions.rekomendasi_rtrw,
    required: true
  },
  tujuan: { 
    label: 'Tujuan', 
    name: 'tujuan', 
    type: 'textarea', 
    required: true,
    placeholder: 'Jelaskan tujuan pengajuan izin usaha'
  },
  jenis_renovasi: {
    label: 'Jenis Renovasi',
    name: 'jenis_renovasi',
    type: 'select',
    options: dropdownOptions.jenis_renovasi,
    required: true
  }
};

const permitFields: Record<string, string[]> = {
  sku: ['nama_pemohon', 'nik', 'nama_usaha', 'alamat_usaha', 'lama_usaha'],
  iumk: ['nama_pemohon', 'nik', 'nama_usaha', 'jenis_usaha', 'modal_usaha', 'status_tempat_usaha'],
  situ: ['nama_pemohon', 'alamat_usaha', 'status_lahan', 'jenis_usaha', 'rekomendasi_rtrw'],
  nib: ['nama_pemohon', 'nik', 'nama_usaha', 'tujuan'],
  siup: ['nama_pemohon', 'nik', 'nama_usaha', 'alamat_usaha', 'jenis_usaha', 'modal_usaha'],
};

interface BusinessPermitFormProps {
  type: string;
}

export default function BusinessPermitForm({ type }: BusinessPermitFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    type,
    file: null as File | null,
    ...Object.fromEntries(
      Object.values(permitFieldMap).map(field => [field.name, ''])
    )
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  // Get fields based on the type
  const fields = type && permitFields[type as keyof typeof permitFields] 
    ? permitFields[type as keyof typeof permitFields] 
    : [];
    
  const permitType = type && permitTypes[type as keyof typeof permitTypes];
  
  const handleSelectChange = (name: string, value: string) => {
    setData(name as keyof typeof data, value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData('file', e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await post(route('form-usaha.submit'), {
        onSuccess: () => {
          showToast.success(
            'Pengajuan Berhasil',
            'Pengajuan berhasil dikirim! Anda akan diarahkan ke halaman utama.',
            { duration: 3000 }
          );
          setTimeout(() => {
            window.location.href = '/form-usaha';
          }, 3000);
        },
        onError: (errors) => {
          showToast.error(
            'Kesalahan Validasi',
            'Mohon periksa kembali data yang dimasukkan dan pastikan semua field yang wajib diisi sudah terisi dengan benar.'
          );
        },
        onFinish: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      showToast.error(
        'Kesalahan Sistem',
        'Terjadi kesalahan teknis. Silakan coba lagi nanti.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
            <div className={cn(
              "w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-md",
              permitType?.color || 'bg-gradient-to-br from-gray-500 to-gray-700'
            )}>
              {permitType?.icon ? (
                <permitType.icon className="w-9 h-9" />
              ) : (
                <FileText className="w-9 h-9" />
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Ajukan {permitType?.title || 'Perizinan Usaha'}
              </h1>
              <p className="text-gray-600 max-w-2xl">
                {permitType?.description || 'Silakan lengkapi formulir di bawah ini dengan data yang valid dan lengkap untuk proses pengajuan perizinan.'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">Formulir Permohonan</CardTitle>
              <p className="text-blue-100 text-sm opacity-90">
                Mohon isi data dengan lengkap dan benar. Pastikan semua dokumen yang diunggah jelas dan valid.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-8">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map((key) => {
                    const field = permitFieldMap[key];
                    if (!field) return null;
                    
                    const error = errors[field.name as keyof typeof errors];
                    
                    return (
                      <div key={key} className="space-y-2">
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
                            value={data[field.name] as string || ''}
                            onValueChange={(value) => handleSelectChange(field.name, value)}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger 
                              className={cn(
                                'w-full h-11',
                                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                              )}
                            >
                              <SelectValue placeholder={`Pilih ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  className="text-gray-700"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === 'textarea' ? (
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={data[field.name] as string || ''}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder={field.placeholder}
                            className={cn(
                              'min-h-[120px] text-sm',
                              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                            )}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={data[field.name] as string || ''}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder={field.placeholder}
                            className={cn(
                              'h-11',
                              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                            )}
                          />
                        )}
                        
                        {error && (
                          <p className="text-sm text-red-600 mt-1">{error}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* File Upload Section */}
                <div className="border-t border-gray-200 pt-6 md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Berkas Pendukung</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                          Unggah Dokumen
                        </Label>
                        <span className="text-xs text-red-500">Wajib diisi</span>
                      </div>
                      <Input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                        accept=".pdf,.doc,.docx,image/*"
                        className={cn(
                          'border-dashed border-2',
                          errors.file ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                        )}
                      />
                      {errors.file && (
                        <p className="text-sm text-red-600 mt-1">{errors.file}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Format file: PDF, DOC, DOCX, JPG, PNG (Maks. 5MB)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Tanggal Pengajuan
                      </Label>
                      <Input
                        type="text"
                        value={getCurrentDate()}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>
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
                    disabled={isSubmitting || processing}
                  >
                    {isSubmitting || processing ? (
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
    </div>
  );
}

