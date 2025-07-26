import AppLayout from '@/Layouts/AppLayout'; // Pastikan path layout Anda benar
import ProductCard from '@/Components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Head } from '@inertiajs/react';

// Definisikan tipe data
type Product = {
    id: number;
    slug: string;
    name: string;
    price: number;
    unit: string | null;
    imageUrl: string;
};

type Category = {
    id: number;
    name: string;
    slug: string;
};

type PaginatedProducts = {
    data: Product[];
};

// Definisikan tipe untuk props halaman
type IndexProps = {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
    };
};

export default function Index({ products, categories, filters }: IndexProps) {
    const currentCategory = filters.category;

    return (
        <AppLayout>
            <Head title="Produk Unggulan" />

            <div className="container py-10 mx-auto">
                <h1 className="mb-8 text-4xl font-bold">Produk Unggulan</h1>
                <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
                    <div className="relative flex-grow">
                        <Input type="search" placeholder="Cari produk..." className="pl-10" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                         <Link href="/products" preserveState>
                            <Button variant={!currentCategory ? 'default' : 'outline'}>Semua</Button>
                        </Link>
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/products?category=${cat.slug}`} preserveState>
                                <Button variant={currentCategory === cat.slug ? 'default' : 'outline'}>{cat.name}</Button>
                            </Link>
                        ))}
                    </div>
                </div>

                {products.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
                )}
            </div>
        </AppLayout>
    );
}