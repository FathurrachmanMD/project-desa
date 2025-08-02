import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Icons
import { 
    ArrowLeft, 
    Store, 
    Package, 
    MessageCircle, 
    ShoppingBag,
    Calendar,
    User,
    CheckCircle,
    AlertCircle,
    Building2,
    Plus,
    Edit,
    Trash2,
    Upload
} from 'lucide-react';

// Interface untuk detail lapak
interface LapakDetail {
    id: number;
    nama_lapak: string;
    slug: string;
    telepon: string;
    alamat: string;
    koordinat: {
        lat: string | null;
        lng: string | null;
        zoom: number | null;
    };
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
    produk: Array<{
        id: number;
        nama: string;
        harga: number;
        harga_formatted: string;
        kategori: string;
        deskripsi: string;
        foto: string;
        satuan: string;
        status: string;
        stok: number;
    }>;
    total_produk: number;
    produk_aktif: number;
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
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Memuat Detail Lapak...</h3>
                    <p className="text-gray-500">Sedang mengambil informasi lapak</p>
                </div>
            </div>
        );
    }

    if (error || !lapakDetail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto text-red-300 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Lapak Tidak Ditemukan</h3>
                    <p className="text-gray-500 mb-6">{error || 'Lapak yang Anda cari tidak ditemukan'}</p>
                    <Link href="/lapak-user">
                        <Button className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Daftar Lapak
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${lapakDetail.nama_lapak} - Lapak Desa Drawati`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Header */}
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/lapak-user">
                                <Button variant="ghost" size="sm" className="text-[#1E4359]">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>
                            <Badge variant={lapakDetail.status === 'Aktif' ? 'default' : 'secondary'}>
                                {lapakDetail.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] text-white py-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <Store className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-4xl font-bold mb-2">{lapakDetail.nama_lapak}</h1>
                            <p className="text-xl opacity-90 mb-4">{lapakDetail.usaha.jenis_usaha}</p>
                            <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {lapakDetail.pemilik.nama}
                                </div>
                                <div className="flex items-center">
                                    <Package className="w-4 h-4 mr-1" />
                                    {lapakDetail.total_produk} Produk
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Disetujui {lapakDetail.usaha.tanggal_disetujui}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Main Content - Produk */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                        <ShoppingBag className="mr-2 h-6 w-6" />
                                        Produk ({lapakDetail.total_produk})
                                    </h2>
                                    <div className="flex space-x-2">
                                        <Link href={`/lapak-user/${encodeURIComponent(lapakDetail.slug)}/kelola`}>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Package className="mr-2 h-4 w-4" />
                                                Kelola Produk
                                            </Button>
                                        </Link>
                                        {lapakDetail.pemilik.telepon && (
                                            <Button 
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => window.open(`https://wa.me/${lapakDetail.pemilik.telepon.replace(/\D/g, '')}`, '_blank')}
                                            >
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Hubungi Penjual
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {lapakDetail.produk.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {lapakDetail.produk.map((product) => (
                                            <motion.div
                                                key={product.id}
                                                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={product.foto}
                                                        alt={product.nama}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-lg mb-2">{product.nama}</h3>
                                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.deskripsi}</p>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-lg font-bold text-[#1E4359]">
                                                            {product.harga_formatted}
                                                        </span>
                                                        <Badge variant="outline">{product.kategori}</Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span>Per {product.satuan}</span>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            product.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {product.status === 'aktif' ? 'Tersedia' : 'Tidak Tersedia'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Produk</h3>
                                        <p className="text-gray-500">Lapak ini belum menambahkan produk apapun</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - Info Lapak */}
                        <div className="space-y-6">
                            
                            {/* Info Pemilik */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <User className="mr-2 h-5 w-5" />
                                    Informasi Pemilik
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-500">Nama</label>
                                        <p className="font-medium">{lapakDetail.pemilik.nama}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">NIK</label>
                                        <p className="font-medium font-mono">{lapakDetail.pemilik.nik}</p>
                                    </div>
                                    {lapakDetail.pemilik.telepon && (
                                        <div>
                                            <label className="text-sm text-gray-500">Telepon</label>
                                            <p className="font-medium">{lapakDetail.pemilik.telepon}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info Usaha */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <Building2 className="mr-2 h-5 w-5" />
                                    Informasi Usaha
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-500">Jenis Usaha</label>
                                        <p className="font-medium">{lapakDetail.usaha.jenis_usaha}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Alamat Usaha</label>
                                        <p className="font-medium">{lapakDetail.usaha.alamat_usaha}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Lama Usaha</label>
                                        <p className="font-medium">{lapakDetail.usaha.lama_usaha}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Tanggal Disetujui</label>
                                        <p className="font-medium flex items-center">
                                            <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                                            {lapakDetail.usaha.tanggal_disetujui}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-4">Statistik</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#1E4359]">{lapakDetail.total_produk}</div>
                                        <div className="text-sm text-gray-500">Total Produk</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{lapakDetail.produk_aktif}</div>
                                        <div className="text-sm text-gray-500">Produk Aktif</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LapakUserDetail;
