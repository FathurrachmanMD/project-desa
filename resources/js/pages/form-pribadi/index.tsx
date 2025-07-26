import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { FileText, Home, Plane, User, FileCheck, ArrowRight } from 'lucide-react';

const permitTypes = [
    {
        id: 'skck',
        title: 'Surat Pengantar SKCK',
        description: 'Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian',
        icon: FileText,
        color: 'bg-gradient-to-br from-blue-500 to-purple-500',
        requirements: [
            'Fotokopi KTP',
            'Fotokopi KK',
            'Pas foto 3x4',
            'Surat pengantar RT/RW'
        ]
    },
    {
        id: 'domisili',
        title: 'Surat Keterangan Domisili',
        description: 'Surat keterangan tempat tinggal resmi',
        icon: Home,
        color: 'bg-gradient-to-br from-green-500 to-teal-500',
        requirements: [
            'Fotokopi KTP',
            'Fotokopi KK',
            'Surat pengantar RT/RW',
            'Bukti kepemilikan/sewa tempat tinggal'
        ]
    },
    {
        id: 'izin-tinggal',
        title: 'Surat Izin Tinggal Pendatang',
        description: 'Surat izin tinggal untuk pendatang',
        icon: User,
        color: 'bg-gradient-to-br from-orange-500 to-amber-500',
        requirements: [
            'Fotokopi KTP',
            'Fotokopi KK',
            'Surat pengantar RT/RW',
            'Surat keterangan dari kelurahan asal'
        ]
    },
    {
        id: 'izin-keluar-negeri',
        title: 'Surat Izin Keluar Negeri',
        description: 'Surat izin untuk keperluan ke luar negeri',
        icon: Plane,
        color: 'bg-gradient-to-br from-red-500 to-pink-500',
        requirements: [
            'Fotokopi KTP',
            'Fotokopi KK',
            'Fotokopi paspor',
            'Surat keterangan kerja/sekolah'
        ]
    },
    {
        id: 'keterangan-tidak-kerja',
        title: 'Surat Keterangan Tidak Bekerja',
        description: 'Surat keterangan status tidak bekerja',
        icon: FileCheck,
        color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
        requirements: [
            'Fotokopi KTP',
            'Fotokopi KK',
            'Surat pengantar RT/RW',
            'Surat keterangan dari kelurahan'
        ]
    }
];

export default function FormPribadi() {
    return (
        <>
            <Head title="Form Perizinan Pribadi - Desa Drawati" />

            <Navbar />
            {/* Section: Perizinan Usaha Modern */}
            <section className="bg-white w-full pt-32 pb-8 md:pt-40 md:pb-12 border-b">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E4359] mb-2">Perizinan Pribadi</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Layanan perizinan pribadi digital yang mudah, cepat, dan transparan untuk mendukung pelaku pribadi di Desa Drawati.</p>
                </div>
            </section>
            <div className="min-h-screen">
                <div className="relative isolate overflow-hidden pt-24">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1E4359] to-[#2A5B73] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                        
                        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20 hover:bg-[#1E4359]/15">
                                    Pilih Jenis Perizinan
                                </Badge>
                                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Form Perizinan Pribadi
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                                    Pilih jenis perizinan pribadi yang sesuai dengan kebutuhan Anda. 
                                    Setiap jenis perizinan memiliki persyaratan dan ketentuan yang berbeda.
                                </p>
                            </div>
                        </div>
                        
                        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#2A5B73] to-[#1E4359] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
                        </div>
                    </div>
                    
                    <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {permitTypes.map((permit) => (
                                <motion.div
                                    key={permit.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link href={`/form-pribadi/form/${permit.id}`}>
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
                                                    <h4 className="text-sm font-semibold">Persyaratan:</h4>
                                                    <ul className="space-y-2">
                                                        {permit.requirements.map((req, index) => (
                                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#1E4359] mt-1.5 flex-shrink-0" />
                                                                <span>{req}</span>
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
