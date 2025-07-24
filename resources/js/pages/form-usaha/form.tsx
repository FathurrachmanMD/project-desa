import { Head } from '@inertiajs/react';
import { AppLayout } from '@/components/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';
import { FadeInView } from '@/components/animations';
import type { BreadcrumbItem } from '@/types';
import { Building2, FileText, ShoppingBag, Store, Briefcase } from 'lucide-react';

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

export default function FormUsahaDetail({ type }: FormProps) {
    const permit = permitTypes[type];
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Form Usaha', href: '/form-usaha' },
        { title: permit.title, href: `/form-usaha/form/${type}` }
    ];

    return (
        <>
            <Head title={`${permit.title} - Desa Drawati`} />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="min-h-screen pt-24 pb-10 bg-gray-50">
                    <FadeInView>
                        <div className="max-w-3xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-12">
                                <div className={`w-16 h-16 ${permit.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    <permit.icon className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{permit.title}</h1>
                                <p className="text-gray-600 max-w-2xl mx-auto">{permit.description}</p>
                            </div>

                            <Card className="p-8">
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_pemilik">Nama Pemilik</Label>
                                            <Input
                                                id="nama_pemilik"
                                                placeholder="Masukkan nama pemilik usaha"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK</Label>
                                            <Input
                                                id="nik"
                                                placeholder="Masukkan NIK"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nama_usaha">Nama Usaha</Label>
                                        <Input
                                            id="nama_usaha"
                                            placeholder="Masukkan nama usaha"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="alamat">Alamat Usaha</Label>
                                        <Textarea
                                            id="alamat"
                                            placeholder="Masukkan alamat lengkap usaha"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jenis_usaha">Jenis Usaha</Label>
                                        <Input
                                            id="jenis_usaha"
                                            placeholder="Contoh: Toko Kelontong, Warung Makan, dll"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="modal_usaha">Modal Usaha</Label>
                                        <Input
                                            id="modal_usaha"
                                            type="number"
                                            placeholder="Masukkan modal usaha dalam rupiah"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Upload Dokumen Persyaratan</Label>
                                        <div className="grid gap-6 mt-2">
                                            <FileUpload
                                                label="KTP Pemilik"
                                                hint="Format: JPG, PNG, PDF (Max 2MB)"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                            />
                                            <FileUpload
                                                label="NPWP"
                                                hint="Format: JPG, PNG, PDF (Max 2MB)"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                            />
                                            <FileUpload
                                                label="Foto Lokasi Usaha"
                                                hint="Format: JPG, PNG (Max 2MB)"
                                                accept=".jpg,.jpeg,.png"
                                            />
                                            {type === 'siup' && (
                                                <FileUpload
                                                    label="Akta Pendirian Usaha"
                                                    hint="Format: PDF (Max 5MB)"
                                                    accept=".pdf"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button 
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                                            size="lg"
                                        >
                                            Submit Permohonan
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </FadeInView>
                </div>
            </AppLayout>
        </>
    );
}
