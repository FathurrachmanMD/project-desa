import React from 'react';
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

// Kosong untuk sementara, interface dan data akan ditambahkan di masa depan

const LapakUser: React.FC = () => {

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
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Lapak Saya</h1>
                            <p className="max-w-2xl mx-auto">
                                Kelola produk dan usaha Anda di platform digital Desa Drawati. Mulai jualan dan kembangkan bisnis lokal Anda bersama kami.
                            </p>
                        </motion.div>
                    </div>
                </section>
                
                {/* Products Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Lapak Saya
                            </h2>

                            {/* Tombol Ajukan Lapak yang mengarah ke form create surat SKU */}
                            <Link href="/surat/form/create/sku">
                                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                                    <Plus className="mr-2 h-4 w-4" /> 
                                    Ajukan Lapak
                                </Button>
                            </Link>
                        </div>

                        {/* Empty State */}
                        <motion.div 
                            className="text-center py-20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Store className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                Belum Ada Lapak
                            </h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Anda belum memiliki produk yang terdaftar. Mulai dengan mengajukan lapak terlebih dahulu untuk mendapatkan izin usaha.
                            </p>
                            <Link href="/surat/form/create/sku">
                                <Button className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajukan Lapak Sekarang
                                </Button>
                            </Link>
                        </motion.div>
                        
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                Cara Memulai Lapak Anda
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
                                    <h3 className="text-xl font-semibold mb-2">1. Ajukan Perizinan</h3>
                                    <p className="text-gray-600">
                                        Ajukan Surat Keterangan Usaha (SKU) untuk mendapatkan izin resmi berjualan
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
                                    <h3 className="text-xl font-semibold mb-2">2. Tambah Produk</h3>
                                    <p className="text-gray-600">
                                        Setelah disetujui, tambahkan produk-produk unggulan Anda ke dalam lapak
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
                                    <h3 className="text-xl font-semibold mb-2">3. Terima Pesanan</h3>
                                    <p className="text-gray-600">
                                        Pelanggan dapat menghubungi Anda langsung melalui WhatsApp untuk bertransaksi
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
