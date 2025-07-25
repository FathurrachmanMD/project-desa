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

const dropdownOptions = {
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
const permitFieldMap: Record<string, { 
    label: string; 
    name: string; 
    type: string;
    required?: boolean;
    inputType?: 'select' | 'textarea';
    options?: { value: string; label: string }[];
    placeholder?: string;
}> = {
    required?: boolean;
    inputType?: 'select' | 'textarea';
    options?: { value: string; label: string }[];
    placeholder?: string;
}> = {
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
    type: keyof typeof permitTypes;
}

export default function PersonalPermitForm({ type }: PersonalPermitFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    
    // Initialize form data
    const initialFormData = Object.fromEntries(
        Object.entries(permitFields).flatMap(([_, fields]) => 
            fields.map(field => [field, ''])
        )
    );
    
    const { data, setData, post, processing, errors } = useForm({
        ...initialFormData,
        dokumen_ktp: null as File | null,
        dokumen_kk: null as File | null,
        dokumen_pendukung: null as File | null,
        tanggal_pengajuan: getCurrentDate(),
    });

    // Get fields based on the type
    const fields = type && permitFields[type] ? permitFields[type] : [];
    const permitType = permitTypes[type as keyof typeof permitTypes];
    
    const handleSelectChange = (name: string, value: string) => {
        setData(name as keyof typeof data, value);
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files?.[0]) {
            setData(fieldName as keyof typeof data, e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await post(route(`permohonan.${type}.store`), {
                onSuccess: () => {
                    showToast(
                        'success',
                        'Pengajuan Berhasil',
                        'Pengajuan berhasil dikirim!',
                        { duration: 3000 }
                    );
                    setTimeout(() => window.location.href = '/form-pribadi', 3000);
                },
                onError: (errors) => {
                    showToast(
                        'error',
                        'Kesalahan Validasi',
                        'Mohon periksa kembali data yang dimasukkan.'
                    );
                    console.error('Form errors:', errors);
                },
                onFinish: () => setIsSubmitting(false),
                forceFormData: true,
            });
        } catch (error) {
            console.error('Submission error:', error);
            showToast('error', 'Kesalahan Sistem', 'Terjadi kesalahan teknis.');
            setIsSubmitting(false);
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
                                                
                                                {field.inputType === 'textarea' ? (
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={fieldValue as string}
                                                        onChange={(e) => setData(field.name, e.target.value)}
                                                        disabled={isSubmitting}
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
                                                        disabled={isSubmitting}
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

                                    <div className="space-y-2">
                                        <Label htmlFor="kecamatan">Kecamatan</Label>
                                        <Input
                                            id="kecamatan"
                                            value={data.kecamatan}
                                            onChange={(e) => setData('kecamatan', e.target.value)}
                                            placeholder="Masukkan kecamatan"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kota">Kota/Kabupaten</Label>
                                        <Input
                                            id="kota"
                                            value={data.kota}
                                            onChange={(e) => setData('kota', e.target.value)}
                                            placeholder="Masukkan kota/kabupaten"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="provinsi">Provinsi</Label>
                                        <Input
                                            id="provinsi"
                                            value={data.provinsi}
                                            onChange={(e) => setData('provinsi', e.target.value)}
                                            placeholder="Masukkan provinsi"
                                            required
                                        />
                                    </div>

                                    {type === 'sktm' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="keterangan">Keterangan Keperluan</Label>
                                            <Textarea
                                                id="keterangan"
                                                value={data.keterangan}
                                                onChange={(e) => setData('keterangan', e.target.value)}
                                                placeholder="Jelaskan keperluan surat keterangan tidak mampu"
                                                required={type === 'sktm'}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label>Unggah Dokumen KTP</Label>
                                        <FileUpload
                                            file={data.dokumen_ktp}
                                            onFileChange={(file) => setData('dokumen_ktp', file)}
                                            accept="image/*,.pdf"
                                            required
                                        />
                                        <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                    </div>

                                    {type !== 'ktp' && (
                                        <div className="space-y-2">
                                            <Label>Unggah Dokumen KK</Label>
                                            <FileUpload
                                                file={data.dokumen_kk}
                                                onFileChange={(file) => setData('dokumen_kk', file)}
                                                accept="image/*,.pdf"
                                                required={type !== 'ktp'}
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label>Dokumen Pendukung Lainnya</Label>
                                        <FileUpload
                                            file={data.dokumen_pendukung}
                                            onFileChange={(file) => setData('dokumen_pendukung', file)}
                                            accept="image/*,.pdf"
                                        />
                                        <p className="text-xs text-gray-500">Unggah dokumen pendukung lainnya (opsional)</p>
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
