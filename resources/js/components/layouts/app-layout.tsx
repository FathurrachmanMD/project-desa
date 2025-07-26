import { PropsWithChildren } from 'react';
import { Navbar } from '@/components/navbar';
import { Breadcrumb } from '@/components/breadcrumb';
import type { BreadcrumbItem } from '@/types';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                {breadcrumbs && (
                    <div className="border-b bg-white">
                        <div className="container py-4">
                            <Breadcrumb items={breadcrumbs} />
                        </div>
                    </div>
                )}
                {children}
            </main>

            <Toaster
    position="top-center"
    containerStyle={{
        zIndex: 9999,
    }}
    toastOptions={{
        // Style default (opsional, bisa dihapus jika tidak perlu)
        style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        duration: 4000,
        
        // Style khusus untuk success
        success: {
            style: {
                background: '#f0fdf4',   // Warna untuk bg-green-50
                color: '#15803d',        // Warna untuk text-green-700
                border: '1px solid #22c55e', // Warna untuk border-green-500
            },
        },
        
        // Style khusus untuk error
        error: {
            style: {
                background: '#fef2f2',   // Warna untuk bg-red-50
                color: '#b91c1c',        // Warna untuk text-red-700
                border: '1px solid #ef4444', // Warna untuk border-red-500
            },
        },
    }}
/>
        </div>
    );
}