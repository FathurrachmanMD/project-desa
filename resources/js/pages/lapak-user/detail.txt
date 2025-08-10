import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Store, 
    AlertCircle, 
    MapPin,
    Phone,
    Calendar,
    CheckCircle,
    Building2
} from 'lucide-react';

interface LapakDetail {
    id: number;
    nama_lapak: string;
    slug: string;
    telepon: string;
    alamat: string;
    status: string;
    pemilik: {
        nama: string;
        nik: string;
        telepon: string;
    };
    usaha: {
        nama_usaha: string;
        jenis_usaha: string;
        alamat_usaha: string;
        lama_usaha: string;
        tanggal_disetujui: string;
    };
}

interface DetailProps {
    slug: string;
}

const LapakUserDetail: React.FC<DetailProps> = ({ slug }) => {
    const [lapakDetail, setLapakDetail] = useState<LapakDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLapakDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/lapak-user/${encodeURIComponent(slug)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lapak detail');
                }

                const data = await response.json();
                if (data.status === 'success') {
                    setLapakDetail(data.data);
                } else {
                    setError(data.message || 'Failed to load lapak detail');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchLapakDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Store className="w-16 h-16 mx-auto text-[#1E4359] mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Memuat Detail Lapak...</h3>
                    <p className="text-gray-500">Sedang mengambil informasi lapak</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div 
                    className="text-center max-w-md mx-auto px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <AlertCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Link href="/lapak-user">
                        <motion.button 
                            className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 inline" />
                            Kembali ke Lapak User
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${lapakDetail?.nama_lapak || 'Detail Lapak'} - Lapak User`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Simple Modern Navbar */}
                <motion.nav 
                    className="bg-white shadow-sm border-b sticky top-0 z-50"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/lapak-user">
                                <motion.button 
                                    className="flex items-center space-x-2 px-4 py-2 text-[#1E4359] hover:text-[#2A5B73] hover:bg-blue-50 rounded-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Kembali</span>
                                </motion.button>
                            </Link>
                            
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <h1 className="text-lg font-semibold text-gray-800">{lapakDetail?.usaha.nama_usaha}</h1>
                                    <p className="text-sm text-gray-500">Detail Usaha</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center shadow-lg">
                                    <Store className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Hero Section - Simplified */}
                <motion.section 
                    className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] text-white py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="container mx-auto px-6">
                        <motion.div 
                            className="text-center"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {/* Main Icon */}
                            <motion.div 
                                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-xl"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                            >
                                <Store className="w-10 h-10 text-white" />
                            </motion.div>

                            {/* Business Name */}
                            <motion.h1 
                                className="text-4xl md:text-5xl font-bold mb-3"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                {lapakDetail?.usaha.nama_usaha}
                            </motion.h1>

                            {/* Business Type */}
                            <motion.p 
                                className="text-xl text-blue-100 mb-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                {lapakDetail?.usaha.jenis_usaha}
                            </motion.p>

                            {/* Address */}
                            <motion.div 
                                className="flex items-center justify-center gap-2 mb-6 max-w-2xl mx-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <MapPin className="w-5 h-5 text-blue-200 flex-shrink-0" />
                                <p className="text-blue-200">
                                    {lapakDetail?.usaha.alamat_usaha}
                                </p>
                            </motion.div>

                            {/* Status Badge */}
                            <motion.div 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.4, duration: 0.5 }}
                            >
                                <CheckCircle className="w-5 h-5 text-green-300" />
                                <span className="text-green-100 font-medium">Usaha Resmi Berizin</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Content Section - Simplified */}
                <motion.section 
                    className="py-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                >
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Info Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Owner Info */}
                                <motion.div 
                                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                                    whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-[#1E4359] rounded-lg flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Pemilik Usaha</h3>
                                    </div>
                                    <p className="text-lg font-medium text-[#1E4359]">{lapakDetail?.pemilik.nama}</p>
                                </motion.div>

                                {/* Contact Info */}
                                {lapakDetail?.telepon && (
                                    <motion.div 
                                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                                        whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-[#2A5B73] rounded-lg flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-gray-800">Kontak</h3>
                                        </div>
                                        <p className="text-lg font-medium text-[#2A5B73]">{lapakDetail.telepon}</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Main Info Card */}
                            <motion.div 
                                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                            >
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl mb-6 shadow-lg">
                                        <CheckCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                        Usaha Terdaftar Resmi
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Usaha ini telah terdaftar secara resmi dan memiliki izin operasional dari Desa Drawati. 
                                        Semua produk dan layanan yang ditawarkan telah melalui verifikasi sesuai dengan 
                                        standar yang berlaku.
                                    </p>

                                    {/* Approval Date */}
                                    {lapakDetail?.usaha.tanggal_disetujui && (
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                                            <Calendar className="w-5 h-5 text-[#1E4359]" />
                                            <span className="text-[#1E4359] font-medium">
                                                Disetujui pada {lapakDetail.usaha.tanggal_disetujui}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </>
    );
};

export default LapakUserDetail;