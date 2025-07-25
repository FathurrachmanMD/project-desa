import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { User, FileText, Home, MapPin, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

// Define types
type PermitType = 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja' | 'surat-pindah' | 'sktm' | 'ktp';

interface FormData {
    [key: string]: string | File | null;
    nama_lengkap: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    status_perkawinan: string;
    pendidikan_terakhir: string;
    pekerjaan: string;
    alamat: string;
    rt: string;
    rw: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
    no_hp: string;
    email: string;
    keterangan: string;
    dokumen_ktp: File | null;
    dokumen_kk: File | null;
    dokumen_pendukung: File | null;
    tanggal_pengajuan: string;
}

type DropdownOptions = {
    [key: string]: Array<{ value: string; label: string }>;
};

type PermitField = {
    label: string;
    name: string;
    type: string;
    required?: boolean;
    inputType?: 'select' | 'textarea';
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
};

interface FormProps {
    type: 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja' | 'surat-pindah';
}

const permitTypes = {
    'pengantar-skck': {
        title: 'Pengantar SKCK',
        description: 'Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian',
        icon: FileText,
        color: 'bg-gradient-to-br from-blue-500 to-purple-500',
    },
    'keterangan-domisili': {
        title: 'Keterangan Domisili',
        description: 'Surat keterangan tempat tinggal resmi',
        icon: Home,
        color: 'bg-gradient-to-br from-orange-500 to-red-500',
    },
    'izin-tinggal-pendatang': {
        title: 'Izin Tinggal Pendatang',
        description: 'Surat izin tinggal untuk pendatang',
        icon: User,
        color: 'bg-gradient-to-br from-green-500 to-teal-500',
    },
    'izin-keluar-negeri': {
        title: 'Izin Keluar Negeri',
        description: 'Surat izin untuk keperluan keluar negeri',
        icon: MapPin,
        color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    'keterangan-tidak-bekerja': {
        title: 'Keterangan Tidak Bekerja',
        description: 'Surat keterangan belum memiliki pekerjaan',
        icon: FileText,
        color: 'bg-gradient-to-br from-amber-500 to-orange-500',
    },
    'surat-pindah': {
        title: 'Surat Keterangan Pindah',
        description: 'Surat keterangan untuk pindah domisili',
        icon: Home,
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    }
};

const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
};

const dropdownOptions: DropdownOptions = {
    jenis_kelamin: [
        { value: 'laki-laki', label: 'Laki-laki' },
        { value: 'perempuan', label: 'Perempuan' },
    ],
    status_perkawinan: [
        { value: 'belum_menikah', label: 'Belum Menikah' },
        { value: 'menikah', label: 'Menikah' },
        { value: 'cerai_hidup', label: 'Cerai Hidup' },
        { value: 'cerai_mati', label: 'Cerai Mati' },
    ],
    agama: [
        { value: 'islam', label: 'Islam' },
        { value: 'kristen', label: 'Kristen' },
        { value: 'katolik', label: 'Katolik' },
        { value: 'hindu', label: 'Hindu' },
        { value: 'buddha', label: 'Buddha' },
        { value: 'konghucu', label: 'Konghucu' },
    ],
    pendidikan_terakhir: [
        { value: 'sd', label: 'SD/Sederajat' },
        { value: 'smp', label: 'SMP/Sederajat' },
        { value: 'sma', label: 'SMA/Sederajat' },
        { value: 'd1', label: 'Diploma 1' },
        { value: 'd2', label: 'Diploma 2' },
        { value: 'd3', label: 'Diploma 3' },
        { value: 's1', label: 'Strata 1' },
        { value: 's2', label: 'Strata 2' },
        { value: 's3', label: 'Strata 3' },
    ]
};

// Field configuration for each permit type
const permitFieldMap: Record<string, PermitField> = {
    nama_lengkap: { 
        label: 'Nama Lengkap', 
        name: 'nama_lengkap', 
        type: 'text', 
        required: true,
        placeholder: 'Masukkan nama lengkap sesuai KTP'
    },
    nik: { 
        label: 'NIK', 
        name: 'nik', 
        type: 'text',
        required: true,
        placeholder: 'Masukkan NIK 16 digit'
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
        required: true
    },
    jenis_kelamin: { 
        label: 'Jenis Kelamin', 
        name: 'jenis_kelamin', 
        type: 'select',
        required: true,
        options: dropdownOptions.jenis_kelamin
    },
    agama: { 
        label: 'Agama', 
        name: 'agama', 
        type: 'select',
        required: true,
        options: dropdownOptions.agama
    },
    status_perkawinan: { 
        label: 'Status Perkawinan', 
        name: 'status_perkawinan', 
        type: 'select',
        required: true,
        options: dropdownOptions.status_perkawinan
    },
    pendidikan_terakhir: { 
        label: 'Pendidikan Terakhir', 
        name: 'pendidikan_terakhir', 
        type: 'select',
        required: true,
        options: dropdownOptions.pendidikan_terakhir
    },
    pekerjaan: { 
        label: 'Pekerjaan', 
        name: 'pekerjaan', 
        type: 'text',
        required: true,
        placeholder: 'Contoh: Karyawan Swasta, Wiraswasta, dll.'
    },
    alamat: { 
        label: 'Alamat', 
        name: 'alamat', 
        type: 'textarea',
        required: true,
        placeholder: 'Masukkan alamat lengkap'
    },
    rt: { 
        label: 'RT', 
        name: 'rt', 
        type: 'text',
        required: true,
        placeholder: 'Contoh: 001'
    },
    rw: { 
        label: 'RW', 
        name: 'rw', 
        type: 'text',
        required: true,
        placeholder: 'Contoh: 002'
    },
    kelurahan: { 
        label: 'Kelurahan/Desa', 
        name: 'kelurahan', 
        type: 'text',
        required: true,
        placeholder: 'Masukkan nama kelurahan/desa'
    },
    kecamatan: { 
        label: 'Kecamatan', 
        name: 'kecamatan', 
        type: 'text',
        required: true,
        placeholder: 'Masukkan nama kecamatan'
    },
    kota: { 
        label: 'Kota/Kabupaten', 
        name: 'kota', 
        type: 'text',
        required: true,
        placeholder: 'Masukkan nama kota/kabupaten'
    },
    provinsi: { 
        label: 'Provinsi', 
        name: 'provinsi', 
        type: 'text',
        required: true,
        placeholder: 'Masukkan nama provinsi'
    },
    no_hp: { 
        label: 'Nomor HP/WhatsApp', 
        name: 'no_hp', 
        type: 'tel',
        required: true,
        placeholder: 'Contoh: 081234567890'
    },
    email: { 
        label: 'Email', 
        name: 'email', 
        type: 'email',
        required: true,
        placeholder: 'contoh@email.com'
    },
    keterangan: { 
        label: 'Keterangan', 
        name: 'keterangan', 
        type: 'textarea',
        required: false,
    }
};

// Define which fields are required for each permit type
const permitFields: Record<string, string[]> = {
    'pengantar-skck': [
        'nama_pemohon', 'nik', 'tujuan_skck', 'tempat_tujuan_skck'
    ],
    'keterangan-domisili': [
        'nama_warga', 'alamat_domisili', 'lama_tinggal', 'rt_rw'
    ],
    'izin-tinggal-pendatang': [
        'nama_pendatang', 'alamat_asal', 'tujuan_pindah', 'rt_rw_tujuan'
    ],
    'izin-keluar-negeri': [
        'nama_pemohon', 'tujuan_keberangkatan', 'negara_tujuan', 'periode'
    ],
    'keterangan-tidak-bekerja': [
        'nama_pemohon', 'alasan_tidak_bekerja', 'tujuan_surat'
    ],
    'surat-pindah': [
        'nama_pemohon', 'alamat_asal', 'alamat_tujuan', 'alasan_pindah', 'rt_rw_tujuan'
    ]
};
interface PersonalPermitFormProps {
    type: PermitType;
}

const PersonalPermitForm: React.FC<{ type: PermitType }> = ({ type }) => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    
    // Get current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Initialize form data with default values
    const initialFormData: FormData = {
        nama_lengkap: '',
        nik: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        agama: '',
        status_perkawinan: '',
        pendidikan_terakhir: '',
        pekerjaan: '',
        alamat: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        kode_pos: '',
        no_hp: '',
        email: '',
        keterangan: '',
        dokumen_ktp: null,
        dokumen_kk: null,
        dokumen_pendukung: null,
        tanggal_pengajuan: getCurrentDate(),
    };
    
    const { data, setData, post, processing, errors } = useForm<FormData>(initialFormData);

    // Get fields based on the type
    const fields = type && permitFields[type] ? permitFields[type] : [];
    const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };
    
    const handleSelectChange = (field: keyof FormData) => (value: string) => {
        setData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };
    
    const handleFileChange = (field: 'dokumen_ktp' | 'dokumen_kk' | 'dokumen_pendukung') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await post(route(`permohonan.${type}.store`), {
                onSuccess: () => {
                    toast.showToast.success(
                        'Pengajuan Berhasil',
                        'Pengajuan berhasil dikirim!'
                    );
                    setTimeout(() => window.location.href = '/form-pribadi', 3000);
                },
                onError: (errors: any) => {
                    toast.showToast.error(
                        'Kesalahan Validasi',
                        'Mohon periksa kembali data yang dimasukkan.'
                    );
                    setIsLoading(false);
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
            toast.showToast.error(
                'Kesalahan Sistem',
                'Terjadi kesalahan teknis.'
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Permohonan ${permitType?.title || ''}`} />
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        className="px-0 py-2 -ml-2 hover:bg-transparent hover:underline"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                    </Button>
                </div>
                
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
                                Ajukan {permitType?.title || 'Permohonan'}
                            </h1>
                            <p className="text-gray-600 max-w-2xl">
                                {permitType?.description || 'Silakan lengkapi formulir di bawah ini dengan data yang valid dan lengkap.'}
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="overflow-hidden border border-gray-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-semibold">Formulir Permohonan</CardTitle>
                            <p className="text-blue-100 text-sm opacity-90">
                                Mohon isi data dengan lengkap dan benar.
                            </p>
                        </div>
                    </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map((fieldKey) => {
                                        const field = permitFieldMap[fieldKey as keyof typeof permitFieldMap];
                                        if (!field) return null;
                                        
                                        const error = errors[field.name as keyof typeof errors];
                                        const fieldValue = data[field.name as keyof typeof data] || '';
                                        
                                        return (
                                            <div key={fieldKey} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                                        {field.label}
                                                    </Label>
                                                    {field.required && (
                                                        <span className="text-xs text-red-500">Wajib diisi</span>
                                                    )}
                                                </div>
                                                
                                                {field.type === 'textarea' ? (
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={fieldValue as string}
                                                        onChange={(e) => setData(field.name, e.target.value)}
                                                        disabled={isLoading}
                                                        placeholder={field.placeholder}
                                                        className={cn(
                                                            'min-h-[100px] text-sm',
                                                            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
                                                            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                                        )}
                                                    />
                                                ) : (
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={field.type}
                                                        value={fieldValue as string}
                                                        onChange={(e) => setData(field.name, e.target.value)}
                                                        disabled={isLoading}
                                                        placeholder={field.placeholder}
                                                        className={cn(
                                                            'h-11 text-sm',
                                                            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
                                                            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                                        )}
                                                    />
                                                )}
                                                
                                                {error && (
                                                    <p className="text-sm text-red-600 mt-1">{error as string}</p>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* File Upload Section */}
                                    <div className="space-y-6">
                                        {/* KTP Upload */}
                                        <div className="space-y-2">
                                            <Label htmlFor="dokumen_ktp">Unggah Dokumen KTP</Label>
                                            <div className="mt-2">
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="file"
                                                        id="dokumen_ktp"
                                                        accept="image/*,.pdf"
                                                        onChange={handleFileChange('dokumen_ktp')}
                                                        className="hidden"
                                                        required
                                                    />
                                                    <label
                                                        htmlFor="dokumen_ktp"
                                                        className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Pilih File KTP
                                                    </label>
                                                    <span className="text-sm text-gray-500">
                                                        {data.dokumen_ktp ? data.dokumen_ktp.name : 'Belum ada file dipilih'}
                                                    </span>
                                                </div>
                                                {data.dokumen_ktp && (
                                                    <p className="text-sm text-green-600 mt-1">
                                                        {data.dokumen_ktp.name} ({Math.round(data.dokumen_ktp.size / 1024)} KB)
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                            </div>
                                        </div>

                                        {/* KK Upload - Conditionally shown based on permit type */}
                                        {type !== 'keterangan-tidak-mampu' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="dokumen_kk">Unggah Dokumen KK</Label>
                                                <div className="mt-2">
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="file"
                                                            id="dokumen_kk"
                                                            accept="image/*,.pdf"
                                                            onChange={handleFileChange('dokumen_kk')}
                                                            className="hidden"
                                                            required={type !== 'keterangan-tidak-mampu'}
                                                        />
                                                        <label
                                                            htmlFor="dokumen_kk"
                                                            className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Pilih File KK
                                                        </label>
                                                        <span className="text-sm text-gray-500">
                                                            {data.dokumen_kk ? data.dokumen_kk.name : 'Belum ada file dipilih'}
                                                        </span>
                                                    </div>
                                                    {data.dokumen_kk && (
                                                        <p className="text-sm text-green-600 mt-1">
                                                            {data.dokumen_kk.name} ({Math.round(data.dokumen_kk.size / 1024)} KB)
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Supporting Documents Upload */}
                                        <div className="space-y-2">
                                            <Label htmlFor="dokumen_pendukung">Dokumen Pendukung Lainnya (Opsional)</Label>
                                            <div className="mt-2">
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="file"
                                                        id="dokumen_pendukung"
                                                        accept="image/*,.pdf"
                                                        onChange={handleFileChange('dokumen_pendukung')}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="dokumen_pendukung"
                                                        className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Pilih Dokumen Pendukung
                                                    </label>
                                                    <span className="text-sm text-gray-500">
                                                        {data.dokumen_pendukung ? data.dokumen_pendukung.name : 'Belum ada file dipilih'}
                                                    </span>
                                                </div>
                                                {data.dokumen_pendukung && (
                                                    <p className="text-sm text-green-600 mt-1">
                                                        {data.dokumen_pendukung.name} ({Math.round(data.dokumen_pendukung.size / 1024)} KB)
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing || isLoading}>
                                        {isLoading ? 'Mengirim...' : 'Kirim Permohonan'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
