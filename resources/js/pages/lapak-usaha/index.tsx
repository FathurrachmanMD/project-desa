// index.tsx

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Import komponen UI yang diperlukan
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Import Ikon
import { Utensils, Coffee, HandMetal, Package, MessageCircle, PlusCircle, ChevronDown, 
    Building,
    FileText,
    Briefcase,
    Calendar,
    TreePine,
} from 'lucide-react';

// Interface dan Data Produk (Tidak ada perubahan)
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

const initialProducts: Product[] = [
    {
        id: 1,
        imgSrc: 'https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/08/10-manfaat-beras-untuk-kecantikan-750x375.webp',
        title: 'Beras Pulen Organik',
        price: 'Rp 16.000 / L',
        category: 'pangan',
        sellerName: 'Kelompok Tani Makmur',
        sellerPhone: '6281234567890',
        description: 'Beras pulen hasil panen organik dari sawah Desa Drawati, tanpa pestisida dan pemutih. Sangat cocok untuk konsumsi keluarga sehari-hari.',
    },
    {
        id: 2,
        imgSrc: 'https://media.dinomarket.com/docs/imgTD/2022-02/_SMine_1645691788366_240222150228_ll.jpg_xl.jpg',
        title: 'Keranjang Bambu Estetik',
        price: 'Rp 35.000',
        category: 'kerajinan',
        sellerName: 'Ibu Siti Kerajinan',
        sellerPhone: '6281234567891',
        description: 'Keranjang serbaguna yang dianyam dengan tangan dari bambu pilihan. Kuat, tahan lama, dan memiliki nilai estetika tinggi untuk dekorasi rumah.',
    },
    {
        id: 3,
        imgSrc: 'https://dikemas.com/uploads/2020/08/dikemas-ria-dia-3.jpg',
        title: 'Kopi Luwak Asli Drawati',
        price: 'Rp 25.000 / 100g',
        category: 'minuman',
        sellerName: 'Kopi Kang Ujang',
        sellerPhone: '6281234567892',
        description: 'Biji kopi luwak asli yang diproses secara tradisional, menghasilkan aroma yang khas dan cita rasa yang lembut dengan tingkat keasaman rendah.',
    },
];

type NewProductForm = Partial<Omit<Product, 'id'>>;

const LapakUsaha: React.FC = () => {
    
    const [activeCategory, setActiveCategory] = useState<'semua' | 'pangan' | 'minuman' | 'kerajinan'>('semua');

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
    
    const initialFormState: NewProductForm = {
        title: '',
        price: '',
        category: undefined,
        sellerName: '',
        sellerPhone: '',
        description: '',
        imgSrc: ''
    };
    const [newProduct, setNewProduct] = useState<NewProductForm>(initialFormState);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: 'pangan' | 'minuman' | 'kerajinan') => {
        setNewProduct(prev => ({ ...prev, category: value }));
    };

    const filteredProducts = initialProducts.filter(product => {
        if (activeCategory === 'semua') return true;
        return product.category === activeCategory;
    });

    const categoryButtons = [
        { name: 'semua', label: 'Semua', icon: Package },
        { name: 'pangan', label: 'Pangan', icon: Utensils },
        { name: 'minuman', label: 'Minuman', icon: Coffee },
        { name: 'kerajinan', label: 'Kerajinan', icon: HandMetal },
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
                                        href={'/'} // Gunakan Link dan href yang valid
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
                                        href={'/lapak-usaha'} // Gunakan Link dan href yang valid
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
            <Head title="Lapak Usaha Desa Drawati" />
            
            <main className="bg-gray-50">
                <section
                    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
                    style={{ backgroundImage: "url('https://asset-2.tstatic.net/wartakota/foto/bank/images/Suasana-persawahan-di-Desa-Drawati-Paseh-Kabupaten-Bandung.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Lapak Usaha Desa Drawati</h1>
                        <p className="max-w-2xl mx-auto">
                            Temukan dan dukung produk-produk unggulan dari pelaku usaha Desa Drawati. Tersedia aneka ragam produk UMKM yang berkualitas.
                        </p>
                    </div>
                </section>

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
                                        onClick={() => setActiveCategory(name as any)}
                                    >
                                        <Icon className="h-10 w-10 text-gray-700" />
                                    </Button>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-800 capitalize">{label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 capitalize">
                                {activeCategory === 'semua' ? 'Semua Produk' : `Kategori: ${activeCategory}`}
                            </h2>

                            <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <form>
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl">Form Pengajuan Produk Baru</DialogTitle>
                                            <DialogDescription>
                                                Isi detail produk Anda. Data akan diperiksa oleh admin sebelum ditampilkan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="title" className="text-right">Nama Produk</Label>
                                                <Input id="title" name="title" value={newProduct.title} onChange={handleInputChange} className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="price" className="text-right">Harga</Label>
                                                <Input id="price" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="cth: Rp 25.000 / item" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="category" className="text-right">Kategori</Label>
                                                <Select onValueChange={handleCategoryChange} required>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Pilih kategori produk" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pangan">Pangan</SelectItem>
                                                        <SelectItem value="minuman">Minuman</SelectItem>
                                                        <SelectItem value="kerajinan">Kerajinan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="description" className="text-right">Deskripsi</Label>
                                                <Textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="sellerName" className="text-right">Nama Penjual</Label>
                                                <Input id="sellerName" name="sellerName" value={newProduct.sellerName} onChange={handleInputChange} className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="sellerPhone" className="text-right">No. WhatsApp</Label>
                                                <Input id="sellerPhone" name="sellerPhone" value={newProduct.sellerPhone} onChange={handleInputChange} placeholder="cth: 628123456789" className="col-span-3" required />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="imgSrc" className="text-right">Link Gambar</Label>
                                                <Input id="imgSrc" name="imgSrc" value={newProduct.imgSrc} onChange={handleInputChange} placeholder="https://url-gambar-produk.com/gambar.jpg" className="col-span-3" required />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button>
                                                Kirim untuk Persetujuan
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((item) => (
                                <Dialog key={item.id}>
                                    <DialogTrigger asChild>
                                        <Card className="overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                                            <CardHeader className="p-0">
                                                <img src={item.imgSrc} alt={item.title} className="w-full h-56 object-cover" />
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 truncate">{item.title}</h3>
                                                <p className="text-lg font-semibold text-orange-600 mt-2">{item.price}</p>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-3xl font-bold">{item.title}</DialogTitle>
                                            <DialogDescription>
                                                Kategori: <span className="capitalize font-semibold text-orange-600">{item.category}</span>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-6 py-4 grid-cols-1 md:grid-cols-2">
                                            <img src={item.imgSrc} alt={item.title} className="w-full h-80 rounded-lg object-cover" />
                                            <div className="flex flex-col space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-800">Deskripsi Produk</h4>
                                                    <p className="text-gray-600">{item.description}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-800">Harga</h4>
                                                    <p className="text-2xl font-bold text-orange-600">{item.price}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-800">Penjual</h4>
                                                    <p className="text-gray-600">{item.sellerName}</p>
                                                </div>
                                                <Button
                                                    className="w-full mt-auto"
                                                    onClick={() => {
                                                        const message = encodeURIComponent(`Halo, saya tertarik dengan produk "${item.title}". Apakah masih tersedia?`);
                                                        window.open(`https://wa.me/${item.sellerPhone}?text=${message}`, '_blank');
                                                    }}
                                                >
                                                    <MessageCircle className="mr-2 h-4 w-4" /> Hubungi Penjual via WhatsApp
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default LapakUsaha;