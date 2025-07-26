import AppLayout from '@/Layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { FaWhatsapp } from 'react-icons/fa';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Halaman ini menerima satu objek `product` dari controller
export default function Show({ product }) {
    const whatsappMessage = `Halo, saya tertarik dengan produk ${product.name}. Apakah masih tersedia?`;
    const whatsappLink = `https://wa.me/${product.seller.phone}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <AppLayout>
            <Head title={product.name} />

            <div className="container py-12 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Product Image */}
                    <div>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto border rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <p className="mt-2 text-3xl font-semibold text-emerald-600">
                            {formatCurrency(product.price)} {product.unit ? `/ ${product.unit}` : ''}
                        </p>

                        <div className="mt-6">
                            <h2 className="text-xl font-bold">Deskripsi</h2>
                            <p className="mt-2 text-gray-700">{product.description}</p>
                        </div>
                        
                        <div className="mt-6">
                            <h2 className="text-xl font-bold">Informasi Penjual</h2>
                            <p className="mt-2 text-gray-700">
                                <strong>{product.seller.name}</strong>
                            </p>
                            <p className="text-sm text-gray-500">
                                Bergabung sejak {product.seller.joined}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 space-y-4 md:space-y-0 md:space-x-4">
                            <Button size="lg" className="w-full md:w-auto">Tambah ke Keranjang</Button>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="w-full md:w-auto">
                                    <FaWhatsapp className="w-5 h-5 mr-2" />
                                    Kirim via WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}