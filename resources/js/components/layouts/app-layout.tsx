import { PropsWithChildren } from 'react';
import { Navbar } from '@/components/navbar';
import { Breadcrumb } from '@/components/breadcrumb';
import type { BreadcrumbItem } from '@/types';

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
        </div>
    );
}
