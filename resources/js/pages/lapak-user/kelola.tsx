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
    ShoppingBag,
    Plus,
    Edit,
    Trash2,
    Upload,
    AlertCircle
} from 'lucide-react';

// Interface untuk produk
interface Product {
    id: number;
    nama: string;
    harga: number;
    harga_formatted: string;
    kategori_id: number;
    kategori: string;
    deskripsi: string;
    foto: string;
    satuan: string;
    status: boolean;
    stok: number;
}

// Interface untuk kategori produk
interface KategoriProduk {
    id: number;
    kategori: string;
}

// Interface untuk form produk
interface ProductForm {
    nama: string;
    harga: number | string;
    kategori_id: number | string;
    deskripsi: string;
    satuan: string;
    stok: number | string;
    status: boolean;
    foto?: File;
}

interface KelolaProps {
    slug: string;
}

const LapakUserKelola: React.FC<KelolaProps> = ({ slug }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<KategoriProduk[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lapakInfo, setLapakInfo] = useState<any>(null);
    
    // State untuk modal dan form
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [productForm, setProductForm] = useState<ProductForm>({
        nama: '',
        harga: '',
        kategori_id: '',
        deskripsi: '',
        satuan: '',
        stok: '',
        status: true
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [slug]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/lapak-user/${encodeURIComponent(slug)}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();
            if (data.status === 'success') {
                setProducts(data.data);
                setLapakInfo(data.lapak);
            } else {
                setError(data.message || 'Failed to load products');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/kategori-produk', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setProductForm({
                nama: product.nama,
                harga: product.harga,
                kategori_id: product.kategori_id,
                deskripsi: product.deskripsi,
                satuan: product.satuan,
                stok: product.stok,
                status: product.status
            });
        } else {
            setEditingProduct(null);
            setProductForm({
                nama: '',
                harga: '',
                kategori_id: '',
                deskripsi: '',
                satuan: '',
                stok: '',
                status: true
            });
        }
        setShowProductModal(true);
    };

    const handleCloseModal = () => {
        setShowProductModal(false);
        setEditingProduct(null);
        setProductForm({
            nama: '',
            harga: '',
            kategori_id: '',
            deskripsi: '',
            satuan: '',
            stok: '',
            status: true
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('nama', productForm.nama);
            formData.append('harga', productForm.harga.toString());
            formData.append('kategori_id', productForm.kategori_id.toString());
            formData.append('deskripsi', productForm.deskripsi);
            formData.append('satuan', productForm.satuan);
            formData.append('stok', productForm.stok.toString());
            formData.append('status', productForm.status ? '1' : '0');
            
            if (productForm.foto) {
                formData.append('foto', productForm.foto);
            }

            const url = editingProduct 
                ? `/api/lapak-user/${encodeURIComponent(slug)}/products/${editingProduct.id}`
                : `/api/lapak-user/${encodeURIComponent(slug)}/products`;
            
            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success') {
                toast.success(data.message);
                handleCloseModal();
                fetchProducts();
            } else {
                toast.error(data.message || 'Failed to save product');
            }
        } catch (err) {
            toast.error('An error occurred while saving product');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (productId: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            return;
        }

        try {
            const response = await fetch(`/api/lapak-user/${encodeURIComponent(slug)}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 'success') {
                toast.success(data.message);
                fetchProducts();
            } else {
                toast.error(data.message || 'Failed to delete product');
            }
        } catch {
            toast.error('An error occurred while deleting product');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Memuat Produk...</h3>
                    <p className="text-gray-500">Sedang mengambil data produk</p>
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
                    <Link href={`/lapak-user/${encodeURIComponent(slug)}`}>
                        <Button className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Detail Lapak
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`Kelola Produk - ${lapakInfo?.nama || 'Lapak'}`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation Header */}
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={`/lapak-user/${encodeURIComponent(slug)}`}>
                                <Button variant="ghost" size="sm" className="text-[#1E4359]">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Detail
                                </Button>
                            </Link>
                            <div className="text-right">
                                <h1 className="text-lg font-semibold text-gray-800">{lapakInfo?.nama}</h1>
                                <p className="text-sm text-gray-500">Kelola Produk</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <ShoppingBag className="mr-2 h-6 w-6" />
                                Kelola Produk ({products.length})
                            </h2>
                            
                            <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
                                <DialogTrigger asChild>
                                    <Button 
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => handleOpenModal()}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Produk
                                    </Button>
                                </DialogTrigger>
                                
                                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                                        </DialogTitle>
                                    </DialogHeader>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="nama">Nama Produk</Label>
                                            <Input
                                                id="nama"
                                                value={productForm.nama}
                                                onChange={(e) => setProductForm({...productForm, nama: e.target.value})}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="harga">Harga</Label>
                                            <Input
                                                id="harga"
                                                type="number"
                                                value={productForm.harga}
                                                onChange={(e) => setProductForm({...productForm, harga: e.target.value})}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="kategori">Kategori</Label>
                                            <Select 
                                                value={productForm.kategori_id.toString()} 
                                                onValueChange={(value) => setProductForm({...productForm, kategori_id: value})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.kategori}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="satuan">Satuan</Label>
                                            <Input
                                                id="satuan"
                                                value={productForm.satuan}
                                                onChange={(e) => setProductForm({...productForm, satuan: e.target.value})}
                                                placeholder="pcs, kg, liter, dll"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="stok">Stok</Label>
                                            <Input
                                                id="stok"
                                                type="number"
                                                value={productForm.stok}
                                                onChange={(e) => setProductForm({...productForm, stok: e.target.value})}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="deskripsi">Deskripsi</Label>
                                            <Textarea
                                                id="deskripsi"
                                                value={productForm.deskripsi}
                                                onChange={(e) => setProductForm({...productForm, deskripsi: e.target.value})}
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="foto">Foto Produk</Label>
                                            <Input
                                                id="foto"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setProductForm({...productForm, foto: e.target.files?.[0]})}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="status"
                                                checked={productForm.status}
                                                onChange={(e) => setProductForm({...productForm, status: e.target.checked})}
                                            />
                                            <Label htmlFor="status">Produk Aktif</Label>
                                        </div>

                                        <div className="flex space-x-2 pt-4">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={handleCloseModal}
                                                className="flex-1"
                                            >
                                                Batal
                                            </Button>
                                            <Button 
                                                type="submit" 
                                                disabled={submitting}
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                {submitting ? 'Menyimpan...' : (editingProduct ? 'Update' : 'Simpan')}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
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
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-lg">{product.nama}</h3>
                                                <Badge variant={product.status ? 'default' : 'secondary'}>
                                                    {product.status ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.deskripsi}</p>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-lg font-bold text-[#1E4359]">
                                                    {product.harga_formatted}
                                                </span>
                                                <Badge variant="outline">{product.kategori}</Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                <span>Per {product.satuan}</span>
                                                <span>Stok: {product.stok}</span>
                                            </div>
                                            
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleOpenModal(product)}
                                                    className="flex-1"
                                                >
                                                    <Edit className="mr-1 h-3 w-3" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(product.id)}
                                                    className="px-3"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Produk</h3>
                                <p className="text-gray-500 mb-6">Mulai dengan menambahkan produk pertama Anda</p>
                                <Button 
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleOpenModal()}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Produk Pertama
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LapakUserKelola;
