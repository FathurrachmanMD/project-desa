import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, Users, Home, FileText, User, MapPin, Globe, Briefcase, ArrowRight } from 'lucide-react';

const permitTypes = [
    {
        id: 'izin-hajatan',
        title: 'Surat Izin Hajatan',
        description: 'Izin penyelenggaraan hajatan atau acara keluarga',
        icon: Calendar,
        color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        fields: [
            'Nama Pemohon',
            'Jenis Acara',
            'Tanggal Acara',
            'Waktu Kegiatan',
            'Lokasi Acara',
            'Dampak Keramaian (Ya/Tidak)'
        ]
    },
    {
        id: 'acara-publik',
        title: 'Surat Izin Acara Publik',
        description: 'Izin penyelenggaraan acara untuk umum',
        icon: Users,
        color: 'bg-gradient-to-br from-green-500 to-teal-600',
        fields: [
            'Nama Penyelenggara',
            'Nama Acara',
            'Tanggal & Waktu Acara',
            'Lokasi Acara',
            'Rekomendasi Keamanan (Sudah/Belum)'
        ]
    },
    {
        id: 'sarana-umum',
        title: 'Izin Penggunaan Sarana Umum Desa',
        description: 'Izin penggunaan fasilitas umum milik desa',
        icon: Home,
        color: 'bg-gradient-to-br from-amber-500 to-orange-500',
        fields: [
            'Nama Pemohon',
            'Jenis Fasilitas',
            'Tanggal Penggunaan',
            'Keperluan'
        ]
    },
    {
        id: 'skck',
        title: 'Surat Pengantar SKCK',
        description: 'Surat pengantar untuk keperluan administrasi kepolisian',
        icon: FileText,
        color: 'bg-gradient-to-br from-purple-500 to-pink-500',
        fields: [
            'Nama Pemohon',
            'NIK',
            'Tujuan SKCK',
            'Tempat Tujuan SKCK'
        ]
    },
    {
        id: 'domisili',
        title: 'Surat Keterangan Domisili',
        description: 'Surat keterangan tempat tinggal resmi',
        icon: MapPin,
        color: 'bg-gradient-to-br from-red-500 to-rose-500',
        fields: [
            'Nama Pemohon',
            'Alamat Domisili',
            'Lama Tinggal',
            'RT/RW'
        ]
    },
    {
        id: 'izin-tinggal',
        title: 'Surat Izin Tinggal Pendatang',
        description: 'Surat izin tinggal untuk pendatang baru',
        icon: User,
        color: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
        fields: [
            'Nama Pendatang',
            'Alamat Asal',
            'Tujuan Pindah',
            'RT/RW Tujuan'
        ]
    },
    {
        id: 'izin-keluar-negeri',
        title: 'Surat Izin Keluar Negeri',
        description: 'Surat izin untuk keperluan ke luar negeri',
        icon: Globe,
        color: 'bg-gradient-to-br from-violet-500 to-purple-600',
        fields: [
            'Nama Pemohon',
            'Tujuan Keberangkatan',
            'Negara Tujuan',
            'Periode / Waktu'
        ]
    },
    {
        id: 'keterangan-tidak-kerja',
        title: 'Surat Keterangan Tidak Bekerja',
        description: 'Surat keterangan status tidak bekerja',
        icon: Briefcase,
        color: 'bg-gradient-to-br from-slate-600 to-gray-600',
        fields: [
            'Nama Pemohon',
            'Alasan Tidak Bekerja',
            'Tujuan Surat'
        ]
    }
];

export default function FormAcara() {
    return (
        <>
            <Head title="Form Perizinan Acara - Desa Drawati" />

            <Navbar />
            {/* Section: Perizinan Acara */}
            <section className="bg-white w-full pt-32 pb-8 md:pt-40 md:pb-12 border-b">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E4359] mb-2">Perizinan Acara & Administrasi</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Layanan perizinan acara dan administrasi warga yang mudah, cepat, dan transparan.</p>
                </div>
            </section>
            <div className="min-h-screen">
                <div className="relative isolate overflow-hidden pt-24">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1E4359] to-[#2A5B73] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                        
                        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20 hover:bg-[#1E4359]/15">
                                    Pilih Jenis Layanan
                                </Badge>
                                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                    Form Perizinan Acara & Administrasi
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                                    Pilih jenis layanan yang Anda butuhkan. Pastikan data yang Anda berikan sesuai dengan dokumen resmi.
                                </p>
                            </div>
                        </div>
                        
                        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#2A5B73] to-[#1E4359] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
                        </div>
                    </div>
                    
                    <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <div className="grid gap-8 sm:grid-cols-2">
                                {permitTypes.map((permit) => (
                                    <motion.div
                                        key={permit.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link href={`/form-acara/form/${permit.id}`}>
                                            <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                                <CardHeader className="space-y-4">
                                                    <div className={`${permit.color} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                        <permit.icon className="w-8 h-8 text-white" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl mb-2">{permit.title}</CardTitle>
                                                        <p className="text-gray-600 text-sm">{permit.description}</p>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-3">
                                                        <h4 className="text-sm font-semibold">Data yang Dibutuhkan:</h4>
                                                        <ul className="space-y-2">
                                                            {permit.fields.map((field, index) => (
                                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E4359] mt-1.5 flex-shrink-0" />
                                                                    <span>{field}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-6 flex items-center text-[#1E4359] font-medium text-sm group-hover:gap-2 transition-all">
                                                        <span>Ajukan Sekarang</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}