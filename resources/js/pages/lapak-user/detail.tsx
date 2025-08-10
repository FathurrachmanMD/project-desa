import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

// Import komponen UI yang digunakan
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Import Ikon dari lucide-react (hanya yang terpakai)
import { 
    ArrowLeft, Store, MapPin, Phone, Calendar, CheckCircle, Building2,
    MessageCircle, Utensils, Coffee, HandMetal, Package 
} from 'lucide-react';


// --- INTERFACE & TIPE DATA ---

interface LapakDetail {
    id: number;
    nama_lapak: string;
    telepon: string;
    usaha: {
        nama_usaha: string;
        jenis_usaha: string;
        alamat_usaha: string;
    };
    pemilik: {
        nama: string;
    };
}

interface Product {
    id: number;
    imgSrc: string;
    title: string;
    price: string;
    category: 'pangan' | 'minuman' | 'kerajinan';
    sellerName: string;
    sellerPhone: string;
    description: string;
}

// Tipe data untuk form telah dihapus karena tidak digunakan


// --- DUMMY DATA ---

// Data 'allLapaks' telah dihapus karena tidak digunakan
const dummyLapakDetail: LapakDetail = {
    id: 1,
    nama_lapak: 'Warung Nasi Ibu Siti',
    telepon: '081234567890',
    pemilik: {
        nama: 'Siti Rohmah',
    },
    usaha: {
        nama_usaha: 'Warung Nasi Ibu Siti',
        jenis_usaha: 'Rumah Makan',
        alamat_usaha: 'Kp. Drawati RT 01 RW 02, Desa Drawati, Kec. Paseh, Kab. Bandung',
    },
};

const dummyLapakProducts: Product[] = [
    {
        id: 101,
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Made%27s_Warung_Nasi_Campur.jpg',
        title: 'Nasi Rames Komplit',
        price: 'Rp 15.000',
        category: 'pangan',
        sellerName: 'Warung Nasi Ibu Siti',
        sellerPhone: '6281234567890',
        description: 'Nasi rames dengan lauk ayam goreng, orek tempe, sayur, dan sambal. Kenyang dan lezat!',
    },
    {
        id: 102,
        imgSrc: 'https://cdn0-production-images-kly.akamaized.net/8_C32Y92O48YLv2V4Q5kY_K9AJE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3103239/original/079148300_1586937512-es_teh_manis.jpg',
        title: 'Es Teh Manis Segar',
        price: 'Rp 4.000',
        category: 'minuman',
        sellerName: 'Warung Nasi Ibu Siti',
        sellerPhone: '6281234567890',
        description: 'Teh manis dingin yang diseduh dari daun teh pilihan, cocok untuk melepas dahaga.',
    },
];

// --- KOMPONEN UTAMA ---

const LapakUserDetail: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<'semua' | 'pangan' | 'minuman' | 'kerajinan'>('semua');
    const [lapakDetail] = useState<LapakDetail | null>(dummyLapakDetail);

    // Sisa state dan handler untuk form telah dihapus

    const categoryButtons = [
        { name: 'semua', label: 'Semua', icon: Package },
        { name: 'pangan', label: 'Pangan', icon: Utensils },
        { name: 'minuman', label: 'Minuman', icon: Coffee },
        { name: 'kerajinan', label: 'Kerajinan', icon: HandMetal },
    ];

    // **PERBAIKAN 1: Menambahkan logika untuk memfilter produk berdasarkan kategori yang aktif**
    const filteredProducts = dummyLapakProducts.filter(product => {
        if (activeCategory === 'semua') {
            return true; // Tampilkan semua produk jika kategori 'semua' aktif
        }
        return product.category === activeCategory; // Tampilkan produk yang kategorinya cocok
    });
    
    if (!lapakDetail) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Data lapak tidak ditemukan.</div>;

    return (
        <>
            <Head title={`${lapakDetail.nama_lapak} - Detail Lapak`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <motion.nav 
                    className="bg-white shadow-sm border-b sticky top-0 z-50"
                    initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
                >
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/lapak-user">
                            <Button variant="ghost" className="flex items-center space-x-2 text-[#1E4359] hover:text-[#2A5B73] hover:bg-blue-50">
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Kembali ke Daftar Lapak</span>
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <h1 className="text-lg font-semibold text-gray-800">{lapakDetail.usaha.nama_usaha}</h1>
                                <p className="text-sm text-gray-500">Detail Usaha</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center shadow-lg">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Hero Section - Informasi Lapak */}
                <motion.section 
                    className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] text-white py-16"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="container mx-auto px-6 text-center">
                        <motion.h1 className="text-4xl md:text-5xl font-bold mb-3">{lapakDetail.usaha.nama_usaha}</motion.h1>
                        <motion.p className="text-xl text-blue-100 mb-4">{lapakDetail.usaha.jenis_usaha}</motion.p>
                        <motion.div className="flex items-center justify-center gap-2 mb-6 max-w-2xl mx-auto">
                            <MapPin className="w-5 h-5 text-blue-200 flex-shrink-0" />
                            <p className="text-blue-200">{lapakDetail.usaha.alamat_usaha}</p>
                        </motion.div>
                        <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                            <CheckCircle className="w-5 h-5 text-green-300" />
                            <span className="text-green-100 font-medium">Usaha Resmi Berizin</span>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Content Section - Detail Pemilik & Kontak */}
                <motion.section 
                    className="py-12"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="shadow-lg"><CardHeader className="flex flex-row items-center gap-3 space-y-0"><div className="w-10 h-10 bg-[#1E4359] rounded-lg flex items-center justify-center"><Building2 className="w-5 h-5 text-white" /></div><h3 className="font-semibold text-gray-800">Pemilik Usaha</h3></CardHeader><CardContent><p className="text-lg font-medium text-[#1E4359]">{lapakDetail.pemilik.nama}</p></CardContent></Card>
                            <Card className="shadow-lg"><CardHeader className="flex flex-row items-center gap-3 space-y-0"><div className="w-10 h-10 bg-[#2A5B73] rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div><h3 className="font-semibold text-gray-800">Kontak</h3></CardHeader><CardContent><p className="text-lg font-medium text-[#2A5B73]">{lapakDetail.telepon}</p></CardContent></Card>
                        </div>
                    </div>
                </motion.section>

                {/* Tombol Filter Kategori */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {categoryButtons.map(({ name, label, icon: Icon }) => (
                                <div key={name} className="text-center">
                                    <Button
                                        variant="ghost"
                                        className={`h-28 w-28 rounded-full shadow-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                                            activeCategory === name ? 'bg-orange-100' : 'bg-white'
                                        }`}
                                        onClick={() => setActiveCategory(name as 'semua' | 'pangan' | 'minuman' | 'kerajinan')}
                                    >
                                        <Icon className="h-10 w-10 text-gray-700" />
                                    </Button>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-800 capitalize">{label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Daftar Produk */}
                <section id="products" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 capitalize">Produk dari {lapakDetail.nama_lapak}</h2>
                            {/* **PERBAIKAN 2: Tombol dan Dialog Form Pengajuan telah dihapus** */}
                        </div>
                        
                        {/* Grid untuk menampilkan produk yang sudah difilter */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Menggunakan 'filteredProducts' bukan 'dummyLapakProducts' */}
                            {filteredProducts.map((item) => (
                                <Dialog key={item.id}>
                                    <DialogTrigger asChild>
                                        <Card className="overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"><CardHeader className="p-0"><img src={item.imgSrc} alt={item.title} className="w-full h-56 object-cover" /></CardHeader><CardContent className="p-6"><h3 className="text-xl font-bold text-gray-900 truncate">{item.title}</h3><p className="text-lg font-semibold text-orange-600 mt-2">{item.price}</p></CardContent></Card>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-3xl">
                                        <DialogHeader><DialogTitle className="text-3xl font-bold">{item.title}</DialogTitle><DialogDescription>Kategori: <span className="capitalize font-semibold text-orange-600">{item.category}</span></DialogDescription></DialogHeader>
                                        <div className="grid gap-6 py-4 grid-cols-1 md:grid-cols-2">
                                            <img src={item.imgSrc} alt={item.title} className="w-full h-80 rounded-lg object-cover" />
                                            <div className="flex flex-col space-y-4">
                                                <div><h4 className="font-semibold text-lg text-gray-800">Deskripsi Produk</h4><p className="text-gray-600">{item.description}</p></div>
                                                <div><h4 className="font-semibold text-lg text-gray-800">Harga</h4><p className="text-2xl font-bold text-orange-600">{item.price}</p></div>
                                                <div><h4 className="font-semibold text-lg text-gray-800">Penjual</h4><p className="text-gray-600">{item.sellerName}</p></div>
                                                <Button className="w-full mt-auto" onClick={() => { const message = encodeURIComponent(`Halo, saya tertarik dengan produk "${item.title}". Apakah masih tersedia?`); window.open(`https://wa.me/${item.sellerPhone}?text=${message}`, '_blank'); }}><MessageCircle className="mr-2 h-4 w-4" /> Hubungi Penjual via WhatsApp</Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                            {/* Pesan jika tidak ada produk setelah difilter */}
                            {filteredProducts.length === 0 && (
                                <div className="col-span-full text-center py-10">
                                    <p className="text-gray-500 text-lg">Tidak ada produk dalam kategori ini.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LapakUserDetail;