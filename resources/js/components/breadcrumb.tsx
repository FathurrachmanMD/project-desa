import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                    {index === items.length - 1 ? (
                        <span className="font-medium text-gray-900">{item.title}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-gray-900 transition-colors"
                        >
                            {item.title}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
