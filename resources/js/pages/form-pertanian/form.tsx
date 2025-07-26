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
import { LandPlot, Sprout, Tractor, Droplets, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

type PermitType = 'pengelolaan-lahan' | 'bantuan-pertanian' | 'keterangan-petani' | 'izin-irigasi';

interface FormProps {
    type: PermitType;
}

const permitTypes = {
    'pengelolaan-lahan': {
        title: 'Izin Pengelolaan Lahan',
        description: 'Izin pengelolaan lahan desa atau tanah negara untuk pertanian',
        icon: LandPlot,
        color: 'bg-gradient-to-br from-green-500 to-teal-500',
    },
    'bantuan-pertanian': {
        title: 'Permohonan Bantuan Pupuk / Bibit / Alat',
        description: 'Permohonan bantuan sarana pertanian',
        icon: Sprout,
        color: 'bg-gradient-to-br from-amber-500 to-orange-500',
    },
    'keterangan-petani': {
        title: 'Surat Keterangan Petani',
        description: 'Surat keterangan sebagai petani atau buruh tani',
        icon: Tractor,
        color: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    },
    'izin-irigasi': {
        title: 'Surat Izin Irigasi / Air Pertanian',
        description: 'Surat izin penggunaan air untuk keperluan pertanian',
        icon: Droplets,
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    }
};

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

const dropdownOptions = {
  jenis_pemohon: [
    { value: 'perorangan', label: 'Perorangan' },
    { value: 'kelompok_tani', label: 'Kelompok Tani' },
  ],
  jenis_bantuan: [
    { value: 'pupuk', label: 'Pupuk' },
    { value: 'bibit', label: 'Bibit' },
    { value: 'alat_pertanian', label: 'Alat Pertanian' },
    { value: 'lainnya', label: 'Lainnya' },
  ],
  jenis_profesi: [
    { value: 'petani', label: 'Petani' },
    { value: 'buruh_tani', label: 'Buruh Tani' },
    { value: 'penggarap', label: 'Penggarap Lahan' },
  ],
  sumber_air: [
    { value: 'sungai', label: 'Sungai' },
    { value: 'sumur_bor', label: 'Sumur Bor' },
    { value: 'embung', label: 'Embung' },
    { value: 'irigasi_desa', label: 'Irigasi Desa' },
  ]
};

const permitFieldMap: Record<string, { 
  label: string; 
  name: string; 
  type: string; 
  required?: boolean;
  inputType?: 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
  pattern?: string;
  title?: string;
}> = {
  // Izin Pengelolaan Lahan
  nama_pemohon_lahan: { 
    label: 'Nama Pemohon', 
    name: 'nama_pemohon_lahan', 
    type: 'text', 
    required: true,
    placeholder: 'Nama lengkap pemohon atau kelompok tani',
    description: 'Warga atau kelompok tani'
  },
  jenis_pemohon: {
    label: 'Jenis Pemohon',
    name: 'jenis_pemohon',
    type: 'select',
    required: true,
    options: dropdownOptions.jenis_pemohon,
    placeholder: 'Pilih jenis pemohon'
  },
  lokasi_lahan: { 
    label: 'Lokasi Lahan', 
    name: 'lokasi_lahan', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan lokasi lahan'
  },
  luas_lahan: { 
    label: 'Luas Lahan', 
    name: 'luas_lahan', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan luas lahan (dalam hektar)'
  },
  
  // Bantuan Pertanian
  nama_pemohon_bantuan: { 
    label: 'Nama Pemohon', 
    name: 'nama_pemohon_bantuan', 
    type: 'text', 
    required: true,
    placeholder: 'Nama lengkap pemohon atau ketua kelompok tani',
    description: 'Individu atau kelompok tani'
  },
  jenis_bantuan: {
    label: 'Jenis Bantuan',
    name: 'jenis_bantuan',
    type: 'select',
    required: true,
    options: dropdownOptions.jenis_bantuan,
    placeholder: 'Pilih jenis bantuan yang diminta'
  },
  alasan_kebutuhan: { 
    label: 'Alasan Kebutuhan', 
    name: 'alasan_kebutuhan', 
    type: 'textarea', 
    required: true,
    placeholder: 'Jelaskan alasan membutuhkan bantuan tersebut'
  },
  
  // Keterangan Petani
  nama_petani: { 
    label: 'Nama', 
    name: 'nama_petani', 
    type: 'text', 
    required: true,
    placeholder: 'Nama lengkap sesuai KTP',
    description: 'Nama pemohon'
  },
  jenis_profesi: {
    label: 'Jenis Profesi',
    name: 'jenis_profesi',
    type: 'select',
    required: true,
    options: dropdownOptions.jenis_profesi,
    placeholder: 'Pilih jenis profesi'
  },
  lokasi_bertani: { 
    label: 'Lokasi Bertani', 
    name: 'lokasi_bertani', 
    type: 'text', 
    required: true,
    placeholder: 'Lokasi lahan pertanian'
  },
  masa_aktif_bertani: { 
    label: 'Masa Aktif Bertani', 
    name: 'masa_aktif_bertani', 
    type: 'text', 
    required: true,
    placeholder: 'Contoh: 5 tahun terakhir'
  },
  tujuan_surat: { 
    label: 'Tujuan Surat', 
    name: 'tujuan_surat', 
    type: 'textarea', 
    required: true,
    placeholder: 'Tujuan pembuatan surat keterangan petani'
  },
  
  // Izin Irigasi
  nama_pemohon_irigasi: { 
    label: 'Nama Pemohon', 
    name: 'nama_pemohon_irigasi', 
    type: 'text', 
    required: true,
    placeholder: 'Nama lengkap pemohon',
    description: 'Nama petani'
  },
  sumber_air: {
    label: 'Sumber Air',
    name: 'sumber_air',
    type: 'select',
    required: true,
    options: dropdownOptions.sumber_air,
    placeholder: 'Pilih sumber air yang akan digunakan'
  },
  jenis_tanaman: { 
    label: 'Jenis Tanaman', 
    name: 'jenis_tanaman', 
    type: 'text', 
    required: true,
    placeholder: 'Jenis tanaman yang akan dibudidayakan'
  },
  
  // Common fields
  nik: { 
    label: 'NIK', 
    name: 'nik', 
    type: 'text', 
    required: true,
    placeholder: 'Nomor KTP',
    pattern: '^[0-9]{16}$',
    title: 'NIK harus terdiri dari 16 digit angka'
  }
  
  // Domisili Fields
  alamat_domisili: {
    label: 'Alamat Domisili',
    name: 'alamat_domisili',
    type: 'textarea',
    required: true,
    placeholder: 'Alamat tinggal saat ini'
  },
  lama_tinggal: {
    label: 'Lama Tinggal',
    name: 'lama_tinggal',
    type: 'text',
    required: true,
    placeholder: 'Contoh: sejak tahun 2020'
  },
  rt_rw: {
    label: 'RT/RW',
    name: 'rt_rw',
    type: 'text',
    required: true,
    placeholder: 'Contoh: 001/002'
  },
  
  // Izin Tinggal Pendatang Fields
  alamat_asal: {
    label: 'Alamat Asal',
    name: 'alamat_asal',
    type: 'text',
    required: true,
    placeholder: 'Alamat asal daerah/kota'
  },
  tujuan_pindah: {
    label: 'Tujuan Pindah',
    name: 'tujuan_pindah',
    type: 'text',
    required: true,
    placeholder: 'Contoh: Bekerja, sekolah, dll'
  },
  rt_rw_tujuan: {
    label: 'RT/RW Tujuan',
    name: 'rt_rw_tujuan',
    type: 'text',
    required: true,
    placeholder: 'RT/RW lokasi tujuan tinggal'
  },
  
  // Izin Keluar Negeri Fields
  tujuan_keberangkatan: {
    label: 'Tujuan Keberangkatan',
    name: 'tujuan_keberangkatan',
    type: 'text',
    required: true,
    placeholder: 'Contoh: TKI, Umrah, Studi, dll'
  },
  negara_tujuan: {
    label: 'Negara Tujuan',
    name: 'negara_tujuan',
    type: 'text',
    required: true,
    placeholder: 'Negara yang dituju'
  },
  periode_waktu: {
    label: 'Periode / Waktu',
    name: 'periode_waktu',
    type: 'text',
    required: true,
    placeholder: 'Estimasi waktu berangkat dan durasi'
  },
  
  // Keterangan Tidak Bekerja Fields
  alasan_tidak_bekerja: {
    label: 'Alasan Tidak Bekerja',
    name: 'alasan_tidak_bekerja',
    type: 'text',
    required: true,
    placeholder: 'Contoh: Sakit, pengangguran, dll'
  },
  tujuan_surat: {
    label: 'Tujuan Surat',
    name: 'tujuan_surat',
    type: 'text',
    required: true,
    placeholder: 'Contoh: Bantuan sosial, KIS, dll'
  },
  jenis_kelamin: { 
    label: 'Jenis Kelamin', 
    name: 'jenis_kelamin', 
    type: 'select',
    options: dropdownOptions.jenis_kelamin,
    required: true
  },
  tempat_lahir: { 
    label: 'Tempat Lahir', 
    name: 'tempat_lahir', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan tempat lahir'
  },
  tanggal_lahir: { 
    label: 'Tanggal Lahir', 
    name: 'tanggal_lahir', 
    type: 'date', 
    required: true,
    placeholder: 'Masukkan tanggal lahir'
  },
  agama: { 
    label: 'Agama', 
    name: 'agama', 
    type: 'select',
    options: dropdownOptions.agama,
    required: true
  },
  status_perkawinan: { 
    label: 'Status Perkawinan', 
    name: 'status_perkawinan', 
    type: 'select',
    options: dropdownOptions.status_perkawinan,
    required: true
  },
  pendidikan_terakhir: { 
    label: 'Pendidikan Terakhir', 
    name: 'pendidikan_terakhir', 
    type: 'select',
    options: dropdownOptions.pendidikan_terakhir,
    required: true
  },
  status_pekerjaan: { 
    label: 'Status Pekerjaan', 
    name: 'status_pekerjaan', 
    type: 'select',
    options: dropdownOptions.status_pekerjaan,
    required: true
  },
  alamat: { 
    label: 'Alamat', 
    name: 'alamat', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alamat lengkap'
  },
  tujuan_skck: { 
    label: 'Tujuan SKCK', 
    name: 'tujuan_skck', 
    type: 'select',
    options: dropdownOptions.tujuan_skck,
    required: true
  },
  status_kepemilikan_rumah: { 
    label: 'Status Kepemilikan Rumah', 
    name: 'status_kepemilikan_rumah', 
    type: 'select',
    options: dropdownOptions.status_kepemilikan_rumah,
    required: true
  },
  tujuan_keluar_negeri: { 
    label: 'Tujuan Keluar Negeri', 
    name: 'tujuan_keluar_negeri', 
    type: 'select',
    options: dropdownOptions.tujuan_keluar_negeri,
    required: true
  },
  status_kewarganegaraan: { 
    label: 'Status Kewarganegaraan', 
    name: 'status_kewarganegaraan', 
    type: 'select',
    options: dropdownOptions.status_kewarganegaraan,
    required: true
  },
  lama_tinggal: { 
    label: 'Lama Tinggal', 
    name: 'lama_tinggal', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan lama tinggal'
  },
  alamat_asal: { 
    label: 'Alamat Asal', 
    name: 'alamat_asal', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alamat asal'
  },
  alamat_domisili: { 
    label: 'Alamat Domisili', 
    name: 'alamat_domisili', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alamat domisili'
  },
  tujuan_pindah: { 
    label: 'Tujuan Pindah', 
    name: 'tujuan_pindah', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan tujuan pindah'
  },
  negara_tujuan: { 
    label: 'Negara Tujuan', 
    name: 'negara_tujuan', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan negara tujuan'
  },
  tgl_berangkat: { 
    label: 'Tanggal Berangkat', 
    name: 'tgl_berangkat', 
    type: 'date', 
    required: true,
    placeholder: 'Masukkan tanggal berangkat'
  },
  tgl_kembali: { 
    label: 'Tanggal Kembali', 
    name: 'tgl_kembali', 
    type: 'date', 
    required: true,
    placeholder: 'Masukkan tanggal kembali'
  },
  tujuan_keberangkatan: { 
    label: 'Tujuan Keberangkatan', 
    name: 'tujuan_keberangkatan', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan tujuan keberangkatan'
  },
  nama_kontak_darurat: { 
    label: 'Nama Kontak Darurat', 
    name: 'nama_kontak_darurat', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan nama kontak darurat'
  },
  telp_kontak_darurat: { 
    label: 'Telepon Kontak Darurat', 
    name: 'telp_kontak_darurat', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan telepon kontak darurat'
  },
  hubungan_kontak_darurat: { 
    label: 'Hubungan Kontak Darurat', 
    name: 'hubungan_kontak_darurat', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan hubungan kontak darurat'
  },
  alasan_tidak_bekerja: { 
    label: 'Alasan Tidak Bekerja', 
    name: 'alasan_tidak_bekerja', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alasan tidak bekerja'
  },
  tujuan_pembuatan_surat: { 
    label: 'Tujuan Pembuatan Surat', 
    name: 'tujuan_pembuatan_surat', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan tujuan pembuatan surat'
  },
  terakhir_bekerja: { 
    label: 'Terakhir Bekerja', 
    name: 'terakhir_bekerja', 
    type: 'date', 
    required: true,
    placeholder: 'Masukkan terakhir bekerja'
  },
  nama_perusahaan_terakhir: { 
    label: 'Nama Perusahaan Terakhir', 
    name: 'nama_perusahaan_terakhir', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan nama perusahaan terakhir'
  },
  jabatan_terakhir: { 
    label: 'Jabatan Terakhir', 
    name: 'jabatan_terakhir', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan jabatan terakhir'
  },
  lama_bekerja: { 
    label: 'Lama Bekerja', 
    name: 'lama_bekerja', 
    type: 'text', 
    required: true,
    placeholder: 'Masukkan lama bekerja'
  },
  alasan_berhenti: { 
    label: 'Alasan Berhenti', 
    name: 'alasan_berhenti', 
    type: 'textarea', 
    required: true,
    placeholder: 'Masukkan alasan berhenti'
  }
};

const permitFields: Record<string, string[]> = {
  // Izin Pengelolaan Lahan
  'pengelolaan-lahan': [
    'nama_pemohon_lahan',
    'jenis_pemohon',
    'nik',
    'lokasi_lahan',
    'luas_lahan'
  ],
  
  // Bantuan Pertanian
  'bantuan-pertanian': [
    'nama_pemohon_bantuan',
    'nik',
    'jenis_bantuan',
    'alasan_kebutuhan'
  ],
  
  // Keterangan Petani
  'keterangan-petani': [
    'nama_petani',
    'nik',
    'jenis_profesi',
    'lokasi_bertani',
    'masa_aktif_bertani',
    'tujuan_surat'
  ],
  
  // Izin Irigasi
  'izin-irigasi': [
    'nama_pemohon_irigasi',
    'nik',
    'sumber_air',
    'jenis_tanaman'
  ]
};

interface AgriculturePermitFormProps {
  type: string;
}

export default function AgriculturePermitForm({ type }: AgriculturePermitFormProps) {
  // Get the permit type details
  const permitType = permitTypes[type as keyof typeof permitTypes];
  
  // Initialize form data with all possible fields
  const initialFormData: FormData = {
    type,
    file: null as File | null,
    // Common fields
    nik: '',
    
    // Izin Pengelolaan Lahan
    nama_pemohon_lahan: '',
    jenis_pemohon: '',
    lokasi_lahan: '',
    luas_lahan: '',
    
    // Bantuan Pertanian
    nama_pemohon_bantuan: '',
    jenis_bantuan: '',
    alasan_kebutuhan: '',
    
    // Keterangan Petani
    nama_petani: '',
    jenis_profesi: '',
    lokasi_bertani: '',
    masa_aktif_bertani: '',
    tujuan_surat: '',
    
    // Izin Irigasi
    nama_pemohon_irigasi: '',
    sumber_air: '',
    jenis_tanaman: '',
    
    // Initialize all fields from permitFieldMap
    ...Object.fromEntries(
      Object.values(permitFieldMap).map(field => [field.name, ''])
    )
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    
    // Add all form data to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    // Append files if any
    files.forEach((file) => {
      formData.append('dokumen_pendukung[]', file);
    });

    try {
      const response = await post(route('pengajuan-pribadi.store', { type }), {
        onSuccess: () => {
          toast({
            title: 'Berhasil',
            description: `Pengajuan ${permitTypes[type as keyof typeof permitTypes]?.title || 'permohonan pertanian'} berhasil dikirim`,
            variant: 'default',
          });
          // Reset form
          setData(initialFormData);
          setFiles([]);
        },
        onError: (errors) => {
          console.error('Error submitting form:', errors);
          toast({
            title: 'Gagal',
            description: 'Terjadi kesalahan saat mengajukan permohonan',
            variant: 'destructive',
          });
        },
        forceFormData: true,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan teknis',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
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
                Ajukan {permitType?.title || 'Perizinan Pribadi'}
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
                  {permitFields[type]?.map((key: string) => {
                    const field = permitFieldMap[key as keyof typeof permitFieldMap];
                    if (!field) return null;
                    
                    const permitType = permitTypes[type as keyof typeof permitTypes];
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

