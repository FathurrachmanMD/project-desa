import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    type BreadcrumbItem, 
    type KategoriSurat, 
    type JenisSurat, 
    type Pemohon,
    type SharedData
} from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { 
    FileText, 
    User, 
    Upload, 
    CheckCircle, 
    AlertCircle,
    ArrowLeft,
    Info
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/format';
import { usePage } from '@inertiajs/react';

interface CreatePengajuanProps extends SharedData {
    kategoris: KategoriSurat[];
    jenis_surat: JenisSurat[];
    pemohon?: Pemohon;
}

interface PengajuanFormData {
    pemohon_id: string;
    jenis_surat_id: string;
    tujuan_surat: string;
    data_tambahan: string;
    prioritas: string;
    dokumen_pendukung: File[];
    [key: string]: string | File[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Pengajuan Surat', href: '/pengajuan' },
    { title: 'Buat Pengajuan', href: '/pengajuan/create' },
];

export default function CreatePengajuan() {
    const { props } = usePage<CreatePengajuanProps>();
    const { kategoris, jenis_surat, pemohon } = props;
    
    const [selectedKategori, setSelectedKategori] = useState<string>('');
    const [selectedJenis, setSelectedJenis] = useState<JenisSurat | null>(null);
    const [showPersyaratan, setShowPersyaratan] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const { data, setData, post, processing, errors } = useForm<PengajuanFormData>({
        pemohon_id: pemohon?.id.toString() || '',
        jenis_surat_id: '',
        tujuan_surat: '',
        data_tambahan: '{}',
        prioritas: 'normal',
        dokumen_pendukung: []
    });

    const filteredJenisSurat = selectedKategori 
        ? jenis_surat.filter(js => js.kategori_id === parseInt(selectedKategori))
        : jenis_surat;

    const handleKategoriChange = (value: string) => {
        setSelectedKategori(value);
        setSelectedJenis(null);
        setData('jenis_surat_id', '');
    };

    const handleJenisSuratChange = (value: string) => {
        const jenis = jenis_surat.find(js => js.id === parseInt(value));
        setSelectedJenis(jenis || null);
        setData('jenis_surat_id', value);
        setShowPersyaratan(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setUploadedFiles(prev => [...prev, ...files]);
        setData('dokumen_pendukung', [...uploadedFiles, ...files]);
    };

    const removeFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        setData('dokumen_pendukung', newFiles);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData = new FormData();
        submitData.append('pemohon_id', data.pemohon_id);
        submitData.append('jenis_surat_id', data.jenis_surat_id);
        submitData.append('tujuan_surat', data.tujuan_surat);
        submitData.append('prioritas', data.prioritas);
        submitData.append('data_tambahan', data.data_tambahan);
        
        uploadedFiles.forEach((file, index) => {
            submitData.append(`dokumen_pendukung[${index}]`, file);
        });

        post('/pengajuan');
    };

    const prioritasOptions = [
        { value: 'rendah', label: 'Rendah', color: 'bg-green-100 text-green-800' },
        { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
        { value: 'tinggi', label: 'Tinggi', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Pengajuan Surat" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/pengajuan">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 ">
                                Buat Pengajuan Surat
                            </h1>
                            <p className="text-sm text-gray-600 ">
                                Isi formulir untuk membuat pengajuan surat baru
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Pemohon Info */}
                    {pemohon && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Informasi Pemohon
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Nama Lengkap</Label>
                                        <p className="text-sm text-gray-600 ">
                                            {pemohon.nama_lengkap}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">NIK</Label>
                                        <p className="text-sm text-gray-600 ">
                                            {pemohon.nik}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Alamat</Label>
                                        <p className="text-sm text-gray-600 ">
                                            {pemohon.alamat_lengkap}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">No. Telepon</Label>
                                        <p className="text-sm text-gray-600 ">
                                            {pemohon.no_telepon}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Pilih Jenis Surat */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Pilih Jenis Surat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="kategori">Kategori Surat</Label>
                                    <Select value={selectedKategori} onValueChange={handleKategoriChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori surat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {kategoris.map(kategori => (
                                                <SelectItem key={kategori.id} value={kategori.id.toString()}>
                                                    {kategori.nama_kategori}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_surat_id && (
                                        <p className="text-sm text-red-600 mt-1">{errors.jenis_surat_id}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="jenis_surat">Jenis Surat</Label>
                                    <Select 
                                        value={data.jenis_surat_id} 
                                        onValueChange={handleJenisSuratChange}
                                        disabled={!selectedKategori}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis surat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredJenisSurat.map(jenis => (
                                                <SelectItem key={jenis.id} value={jenis.id.toString()}>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>{jenis.nama_surat}</span>
                                                        <Badge variant="outline" className="ml-2">
                                                            {formatCurrency(jenis.biaya)}
                                                        </Badge>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Informasi Jenis Surat */}
                            {selectedJenis && (
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-blue-900 ">
                                                {selectedJenis.nama_surat}
                                            </h4>
                                            <p className="text-sm text-blue-700  mt-1">
                                                {selectedJenis.deskripsi}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                                <div>
                                                    <span className="text-sm font-medium text-blue-800 ">
                                                        Biaya:
                                                    </span>
                                                    <p className="text-sm text-blue-700 ">
                                                        {formatCurrency(selectedJenis.biaya)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-blue-800 ">
                                                        Estimasi:
                                                    </span>
                                                    <p className="text-sm text-blue-700 ">
                                                        {selectedJenis.estimasi_selesai_hari} hari kerja
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-blue-800 ">
                                                        Persetujuan:
                                                    </span>
                                                    <p className="text-sm text-blue-700 ">
                                                        {selectedJenis.perlu_approval_kepala_desa ? 'Kepala Desa' : 'Admin'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Persyaratan */}
                    {selectedJenis && showPersyaratan && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" />
                                    Persyaratan Dokumen
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Pastikan semua dokumen persyaratan sudah disiapkan sebelum mengajukan surat.
                                    </AlertDescription>
                                </Alert>
                                
                                <div className="mt-4 space-y-2">
                                    {selectedJenis.persyaratan.map((syarat, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-blue-600 ">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-700 ">
                                                {syarat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Detail Pengajuan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Pengajuan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="tujuan_surat">
                                    Tujuan/Keperluan Surat <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="tujuan_surat"
                                    placeholder="Jelaskan tujuan atau keperluan surat ini..."
                                    value={data.tujuan_surat}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('tujuan_surat', e.target.value)}
                                    className="mt-1"
                                    rows={3}
                                />
                                {errors.tujuan_surat && (
                                    <p className="text-sm text-red-600 mt-1">{errors.tujuan_surat}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="prioritas">Prioritas</Label>
                                <Select value={data.prioritas} onValueChange={(value) => setData('prioritas', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih prioritas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {prioritasOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={option.color}>
                                                        {option.label}
                                                    </Badge>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upload Dokumen */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5" />
                                Upload Dokumen Pendukung
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="dokumen">Pilih File</Label>
                                    <Input
                                        id="dokumen"
                                        type="file"
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileUpload}
                                        className="mt-1"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Format yang didukung: PDF, JPG, PNG. Maksimal 5MB per file.
                                    </p>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>File yang diupload:</Label>
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                                <span className="text-sm">{file.name}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing} className="flex-1 md:flex-none">
                            {processing ? 'Menyimpan...' : 'Buat Pengajuan'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/pengajuan">Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
