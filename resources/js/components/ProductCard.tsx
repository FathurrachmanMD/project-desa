import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Definisikan tipe data untuk product
type Product = {
    id: number;
    slug: string;
    name: string;
    price: number;
    unit: string | null;
    imageUrl: string;
};

// Definisikan tipe untuk props komponen
type ProductCardProps = {
    product: Product;
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.slug}`}>
            <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-40"
                    />
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="mb-2 text-lg font-bold">{product.name}</CardTitle>
                    <p className="text-base font-semibold text-emerald-600">
                        {formatCurrency(product.price)} {product.unit ? `/ ${product.unit}` : ''}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}