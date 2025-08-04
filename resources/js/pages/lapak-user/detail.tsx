import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Store, AlertCircle } from 'lucide-react';

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
                <div className="text-center">
                    <Store className="w-16 h-16 mx-auto text-gray-300 mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Memuat Detail Lapak...</h3>
                    <p className="text-gray-500">Sedang mengambil informasi lapak</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto text-red-300 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Link href="/lapak-user">
                        <button className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white px-6 py-2 rounded-lg">
                            <ArrowLeft className="mr-2 h-4 w-4 inline" />
                            Kembali ke Lapak User
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${lapakDetail?.nama_lapak || 'Detail Lapak'} - Lapak User`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Header */}
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/lapak-user">
                                <button className="flex items-center text-[#1E4359] hover:text-[#2A5B73] transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Lapak User
                                </button>
                            </Link>
                            <div className="text-right">
                                <h1 className="text-lg font-semibold text-gray-800">{lapakDetail?.nama_lapak}</h1>
                                <p className="text-sm text-gray-500">Detail Lapak</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Banner Section */}
                <div className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                                <Store className="w-10 h-10" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{lapakDetail?.usaha.nama_usaha}</h1>
                            <p className="text-xl text-blue-100 mb-2">{lapakDetail?.usaha.jenis_usaha}</p>
                            <p className="text-blue-200 max-w-2xl mx-auto">
                                {lapakDetail?.usaha.alamat_usaha}
                            </p>
                            <div className="mt-6">
                                <span className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-100 rounded-full text-sm">
                                    ✓ Usaha Resmi Disetujui
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty Content Area */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center text-gray-500">
                        <p className="text-lg">Halaman dalam pengembangan</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LapakUserDetail;