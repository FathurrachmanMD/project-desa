import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { FadeInView, StaggerAnimation, StaggerItem, AnimatedCard, Typewriter } from '@/components/animations';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <FadeInView className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Welcome Section */}
                <div className="mb-6">
                    <Typewriter 
                        text="Selamat Datang di Dashboard Desa" 
                        className="text-2xl font-bold text-gray-800 dark:text-white"
                        speed={80}
                    />
                    <FadeInView delay={2} direction="up" className="mt-2">
                        <p className="text-gray-600 dark:text-gray-300">
                            Kelola data dan layanan desa dengan mudah dan efisien
                        </p>
                    </FadeInView>
                </div>

                {/* Stats Cards */}
                <StaggerAnimation className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <StaggerItem>
                        <AnimatedCard className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border hover-lift">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Total Penduduk</h3>
                                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                                </div>
                            </div>
                        </AnimatedCard>
                    </StaggerItem>
                    <StaggerItem>
                        <AnimatedCard className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border hover-lift">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Izin Aktif</h3>
                                    <p className="text-3xl font-bold text-green-600">56</p>
                                </div>
                            </div>
                        </AnimatedCard>
                    </StaggerItem>
                    <StaggerItem>
                        <AnimatedCard className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border hover-lift">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold mb-2">Kegiatan</h3>
                                    <p className="text-3xl font-bold text-purple-600">12</p>
                                </div>
                            </div>
                        </AnimatedCard>
                    </StaggerItem>
                </StaggerAnimation>

                {/* Main Content */}
                <FadeInView delay={0.8} className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border hover-lift">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-4">Area Konten Utama</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Konten dashboard akan ditampilkan di sini
                            </p>
                        </div>
                    </div>
                </FadeInView>
            </FadeInView>
        </AppLayout>
    );
}
