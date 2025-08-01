import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

// Import komponen UI yang diperlukan
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Import Ikon
import { MessageCircle, ChevronDown, 
    Building,
    FileText,
    Briefcase,
    Calendar,
    TreePine,
    Plus,
    Store,
    Package
} from 'lucide-react';

// Interface untuk produk yang berasal dari surat yang disetujui
interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    sellerName: string;
    sellerPhone: string;
    description: string;
    imgSrc: string;
    lapakName: string;
    satuan: string;
    status: string;
    // Data tambahan dari surat pengajuan
    pengajuan_nama: string;
    nik: string;
    nama_usaha: string;
    jenis_usaha: string;
    alamat_usaha: string;
    lama_usaha: string;
    tanggal_disetujui: string;
}

const LapakUser: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch products ketika component mount
    useEffect(() => {
        fetchUserProducts();
    }, []);

    const fetchUserProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/lapak-user/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Tambahkan auth header jika diperlukan
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            if (data.status === 'success') {
                setProducts(data.data);
            } else {
                setError(data.message || 'Failed to load products');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const perizinanServices = [
        { name: "Perizinan Pribadi", href: "/login", icon: FileText },
        { name: "Perizinan Bangunan", href: "/login", icon: Building },
        { name: "Perizinan Acara", href: "/login", icon: Calendar },
        { name: "Perizinan Usaha", href: "/login", icon: Briefcase },
        { name: "Perizinan Pertanian", href: "/login", icon: TreePine },
    ];

    return (
        <>
            {/* Navigation */}
            <motion.nav 
                className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <motion.div 
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center">
                                <img 
                                    src="/logo-drawati.png" 
                                    alt="Logo Desa Drawati" 
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1E4359]">Desa Drawati</h2>
                            </div>
                        </motion.div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button>
                                <Link
                                    href={'/'} 
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Beranda
                                </Link>
                            </button>
                            
                            {/* Perizinan Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium flex items-center space-x-1">
                                        <span>Perizinan</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-2">
                                    {perizinanServices.map((service, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <Link 
                                                href={service.href}
                                                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#1E4359]/5 transition-colors cursor-pointer"
                                            >
                                                <service.icon className="w-4 h-4 text-[#1E4359]" />
                                                <span className="text-gray-700">{service.name}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <button>
                                <Link
                                    href={'/lapak-usaha'} 
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Lapak
                                </Link>
                            </button>
                            <button 
                                onClick={() => scrollToSection('services')}
                                className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            >
                                Layanan
                            </button>
                            <button 
                                onClick={() => scrollToSection('about')}
                                className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            >
                                Tentang
                            </button>
                            <button 
                                onClick={() => scrollToSection('contact')}
                                className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            >
                                Kontak
                            </button>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-[#1E4359] hover:bg-[#1E4359]/5">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <Head title="Lapak Saya - Desa Drawati" />
            
            <main className="bg-gray-50">
                {/* Hero Section */}
                <section
                    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
                    style={{ backgroundImage: "url('https://asset-2.tstatic.net/wartakota/foto/bank/images/Suasana-persawahan-di-Desa-Drawati-Paseh-Kabupaten-Bandung.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Store className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lapak Usaha Desa</h1>
                            <p className="max-w-2xl mx-auto">
                                Daftar usaha yang telah memperoleh Surat Keterangan Usaha (SKU) dan terdaftar resmi di Desa Drawati. Dukung ekonomi lokal dengan berbelanja dari usaha warga setempat.
                            </p>
                        </motion.div>
                    </div>
                </section>
                
                {/* Products Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Usaha Berizin SKU
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Usaha yang telah memperoleh Surat Keterangan Usaha dari Desa Drawati
                                </p>
                            </div>

                            {/* Tombol Ajukan Lapak yang mengarah ke form create surat SKU */}
                            <Link href="/surat/form/create/sku">
                                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                                    <Plus className="mr-2 h-4 w-4" /> 
                                    Ajukan SKU
                                </Button>
                            </Link>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <motion.div 
                                className="text-center py-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Package className="w-24 h-24 mx-auto text-gray-300 mb-6 animate-pulse" />
                                <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                    Memuat Lapak...
                                </h3>
                                <p className="text-gray-500">
                                    Sedang mengambil data lapak Anda
                                </p>
                            </motion.div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                            <motion.div 
                                className="text-center py-20"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Store className="w-24 h-24 mx-auto text-red-300 mb-6" />
                                <h3 className="text-2xl font-semibold text-red-600 mb-4">
                                    Gagal Memuat Data
                                </h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    {error}
                                </p>
                                <Button 
                                    onClick={fetchUserProducts}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                                >
                                    Coba Lagi
                                </Button>
                            </motion.div>
                        )}

                        {/* Products Grid */}
                        {!loading && !error && products.length > 0 && (
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={product.imgSrc}
                                                alt={product.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                                                {product.nama_usaha}
                                            </h3>
                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Pemilik:</span>
                                                    <span className="font-medium text-gray-700">{product.pengajuan_nama}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">NIK:</span>
                                                    <span className="font-medium text-gray-700">{product.nik}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Jenis Usaha:</span>
                                                    <span className="font-medium text-gray-700">{product.jenis_usaha}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Alamat:</span>
                                                    <span className="font-medium text-gray-700 text-right">{product.alamat_usaha}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Lama Usaha:</span>
                                                    <span className="font-medium text-gray-700">{product.lama_usaha}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pt-2 border-t">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                    Disetujui
                                                </span>
                                                <span className="text-xs">
                                                    {new Date(product.tanggal_disetujui).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    className="flex-1 bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white"
                                                >
                                                    Lihat Detail
                                                </Button>
                                                {product.sellerPhone && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="px-3"
                                                        onClick={() => window.open(`https://wa.me/${product.sellerPhone.replace(/\D/g, '')}`, '_blank')}
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && products.length === 0 && (
                            <motion.div 
                                className="text-center py-20"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Store className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                    Belum Ada Usaha Berizin
                                </h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    Belum ada usaha yang memperoleh Surat Keterangan Usaha (SKU) dari Desa Drawati. Ajukan permohonan SKU untuk mendaftarkan usaha Anda.
                                </p>
                                <Link href="/surat/form/create/sku">
                                    <Button className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Ajukan SKU Sekarang
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                        
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                Cara Mendaftarkan Usaha Anda
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div 
                                    className="p-6 bg-white rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">1. Ajukan SKU</h3>
                                    <p className="text-gray-600">
                                        Ajukan permohonan Surat Keterangan Usaha (SKU) untuk mendapatkan izin resmi dari desa
                                    </p>
                                </motion.div>

                                <motion.div 
                                    className="p-6 bg-white rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">2. Menunggu Persetujuan</h3>
                                    <p className="text-gray-600">
                                        Permohonan SKU akan diproses dan diperiksa oleh perangkat desa untuk persetujuan
                                    </p>
                                </motion.div>

                                <motion.div 
                                    className="p-6 bg-white rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">3. Usaha Terdaftar</h3>
                                    <p className="text-gray-600">
                                        Setelah disetujui, usaha Anda akan terdaftar resmi dan muncul di halaman ini
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default LapakUser;
