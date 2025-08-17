import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Import komponen UI yang diperlukan
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// --- IMPOR BARU DARI DETAIL.TSX ---
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import axios from 'axios';

// Import Ikon
import { 
    MessageCircle, ChevronDown, Building, FileText, Briefcase, Calendar, TreePine, 
    Plus, Store, Package,
    // --- IMPOR IKON BARU DARI DETAIL.TSX ---
    PlusCircle, Utensils, Coffee, HandMetal, Check, ChevronsUpDown 
} from 'lucide-react';

// --- INTERFACE & TIPE DATA ---

// Interface untuk daftar Lapak Usaha
interface Lapak {
    id: number;
    nama: string;
    deskripsi: string;
    jenis_usaha: string;
    pemilik_nama: string;
    pemilik_nik: string;
    telepon?: string;
    email?: string;
    alamat: string;
    lat?: string;
    lng?: string;
    zoom: number;
    status: 'pending' | 'approved' | 'rejected';
    penduduk?: {
        id: number;
        nama: string;
        nik: string;
    };
    surat?: {
        id: number;
        nomor_surat: string;
        status: string;
    };
    created_by?: {
        id: number;
        name: string;
    };
}

interface Produk {
    id?: number | null;
    lapak_id: number | null;
    kategori_id?: number | null;

    nama: string;
    harga: number;
    satuan?: string | null;

    tipe_potongan?: boolean; // true = persen, false = nominal (or however you define it)
    potongan?: number;

    deskripsi: string;
    foto?: File | null;
    surat?: File | null;
    stok?: number;

    status?: boolean; // true = aktif, false = nonaktif

    // optional eager-loaded relations
    lapak?: {
        id: number;
        nama: string;
        deskripsi: string;
    };
    kategori?: {
        id: number;
        nama: string;
        slug: string;
    };
}

type Props = {
    data: Lapak[];
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

const LapakUser = ({data, total, pending, approved, rejected}: Props) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [lapaks, setLapaks] = useState<Lapak[]>(data);

    // --- LOGIKA FORM BARU DARI DETAIL.TSX ---
    const initialFormState: Produk = {
        lapak_id: null,
        nama: '',
        harga: 0,
        kategori_id: undefined,
        deskripsi: '',
        surat: null,
        foto: null,
    };
    const [newProduct, setNewProduct] = useState<Produk>(initialFormState);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [openLapakSelect, setOpenLapakSelect] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };
    const handleCategoryChange = (value: 'pangan' | 'minuman' | 'kerajinan') => {
        setNewProduct(prev => ({ ...prev, kategori_produk: value }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setNewProduct(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const token = localStorage.getItem("token"); // or wherever you store it

            // Validate data exists
            if (!newProduct || !newProduct.surat) {
                throw new Error('Form data is not properly initialized');
            }

            Object.entries(newProduct).forEach(([key, value]) => {
                if (typeof value === "string" && value.trim() !== "") {
                    formData.append(key, value);
                } else if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, String(value)); // convert safely
                }
            });

            // Add files - only add actual File objects
            if (newProduct.surat && newProduct.surat instanceof File) {
                formData.append("surat", newProduct.surat as Blob);
            }
            if (newProduct.foto && newProduct.foto instanceof File) {
                formData.append("foto", newProduct.foto as Blob);
            }

            console.log(newProduct)
            console.log(formData)

            // Validate id exists
            // if (!id || typeof id !== 'string') {
            // throw new Error('Invalid id parameter');
            // }

            const response = await axios.post(`${API_URL}/produk`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            });

            // Success handling here
            console.log("Submitted:", response.data);
            // showToast.success("Data Berhasil Disimpan");
        } catch (error) {
            // Error handling here
            console.error("Submission failed:", error);
            
            if (error instanceof Error) {
            // showToast.error('Kesalahan Sistem', error.message);
            } else {
            // showToast.error('Kesalahan Sistem', 'Gagal mengirim data');
            }
        } finally {
            // setIsSubmitting(false);
        }
        alert('Pengajuan produk terkirim (simulasi)');
        setIsFormModalOpen(false);
    }

    // --- AKHIR LOGIKA FORM BARU ---

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const perizinanServices = [
        { name: "Perizinan Pribadi", href: "/form-pribadi", icon: FileText },
        { name: "Perizinan Bangunan", href: "/form-bangunan", icon: Building },
        { name: "Perizinan Acara", href: "/form-acara", icon: Calendar },
        { name: "Perizinan Usaha", href: "/form-usaha", icon: Briefcase },
        { name: "Perizinan Pertanian", href: "/form-pertanian", icon: TreePine },
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
                {/* ... konten navigasi tidak berubah ... */}
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
                                    href={'/lapak'} 
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
                    {/* ... konten hero section tidak berubah ... */}
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

                            {/* --- PERUBAHAN DI SINI: Tombol diletakkan berdampingan --- */}
                            <div className="flex items-center gap-4">
                                {/* Tombol Ajukan Produk Baru (DIPINDAHKAN KE SINI) */}
                                <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <PlusCircle className="mr-2 h-4 w-4" /> Ajukan Produk Baru
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <form onSubmit={handleSubmit}>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">Form Pengajuan Produk</DialogTitle>
                                                <DialogDescription>Isi detail produk yang ingin Anda tampilkan di lapak.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                                                {/* Nama Lapak Dropdown */}
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">Nama Lapak</Label>
                                                    <Popover open={openLapakSelect} onOpenChange={setOpenLapakSelect}>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="outline" role="combobox" aria-expanded={openLapakSelect} className="col-span-3 justify-between">
                                                                {newProduct.lapak_id ? lapaks.find((lapak) => lapak.id === newProduct.lapak_id)?.nama : "Cari dan pilih lapak..."}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[400px] p-0">
                                                            <Command><CommandInput placeholder="Cari nama lapak..." /><CommandEmpty>Lapak tidak ditemukan.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {lapaks.map((lapak) => (
                                                                        <CommandItem key={lapak.id} value={lapak.nama} onSelect={() => { setNewProduct(prev => ({...prev, lapak_id: lapak.id})); setOpenLapakSelect(false); }}>
                                                                            <Check className={cn("mr-2 h-4 w-4", newProduct.lapak_id === lapak.id ? "opacity-100" : "opacity-0")} />
                                                                            {lapak.nama}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                {/* Form Fields Lainnya */}
                                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="nama_produk" className="text-right">Nama Produk</Label><Input id="nama" name="nama" value={newProduct.nama} onChange={handleInputChange} className="col-span-3" required /></div>
                                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="harga" className="text-right">Harga</Label><Input id="harga" name="harga" value={newProduct.harga} onChange={handleInputChange} placeholder="cth: Rp 25.000 / item" className="col-span-3" required /></div>
                                                <div className="grid grid-cols-4 items-center gap-4"><Label className="text-right">Kategori</Label><Select onValueChange={handleCategoryChange} required><SelectTrigger className="col-span-3"><SelectValue placeholder="Pilih kategori produk" /></SelectTrigger><SelectContent><SelectItem value="pangan"><Utensils className="inline-block mr-2 h-4 w-4" />Pangan</SelectItem><SelectItem value="minuman"><Coffee className="inline-block mr-2 h-4 w-4" />Minuman</SelectItem><SelectItem value="kerajinan"><HandMetal className="inline-block mr-2 h-4 w-4" />Kerajinan</SelectItem></SelectContent></Select></div>
                                                <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="deskripsi" className="text-right pt-2">Deskripsi</Label><Textarea id="deskripsi" name="deskripsi" value={newProduct.deskripsi} onChange={handleInputChange} className="col-span-3" required /></div>
                                                <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="surat" className="text-right pt-2">Bukti SKU</Label><div className="col-span-3"><Input id="surat" name="surat" type="file" onChange={handleFileChange} accept=".pdf, .png, .jpg, .jpeg" required /></div></div>
                                                <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="foto" className="text-right pt-2">Foto Produk</Label><div className="col-span-3"><Input id="foto" name="foto" type="file" onChange={handleFileChange} accept=".png, .jpg, .jpeg" required /></div></div>
                                            </div>
                                            <DialogFooter><Button type="submit">Kirim untuk Persetujuan</Button></DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                {/* Tombol Ajukan SKU (Tombol Asli) */}
                                <Link href="/form-usaha/form/sku">
                                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                                        <Plus className="mr-2 h-4 w-4" /> 
                                        Ajukan SKU
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {lapaks.length > 0 ? (
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {lapaks.map(lapak => (
                                    <motion.div
                                        key={lapak.id}
                                        className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                                    >
                                        {/* Header dengan gradient */}
                                        <div className="relative bg-gradient-to-br from-[#1E4359] via-[#2A5B73] to-[#1E4359] p-6 text-white">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                                        <Store className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-xl text-white group-hover:text-blue-100 transition-colors">
                                                            {lapak.nama}
                                                        </h3>
                                                        <p className="text-blue-100 text-sm font-medium">
                                                            {lapak.jenis_usaha}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                    <span className="text-white text-xs font-semibold">Usaha Berizin</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-4">
                                            {/* Pemilik */}
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Building className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-medium">Pemilik Usaha</p>
                                                    <p className="font-semibold text-gray-800">{lapak.penduduk?.nama}</p>
                                                </div>
                                            </div>

                                            {/* Alamat */}
                                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                                                    <TreePine className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-medium">Alamat Usaha</p>
                                                    <p className="font-semibold text-gray-800 text-sm leading-relaxed">{lapak.alamat}</p>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="pt-2">
                                                <Link href={`/lapak/${encodeURIComponent(lapak.id)}`} className="block">
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                                    >
                                                        <span className="group-hover:scale-105 transition-transform duration-200">
                                                            Lihat Detail Usaha
                                                        </span>
                                                        <motion.div
                                                            className="ml-2"
                                                            whileHover={{ x: 4 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            →
                                                        </motion.div>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                        // Empty State
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