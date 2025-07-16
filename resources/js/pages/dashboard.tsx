import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DashboardStats } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    FileText, 
    Clock, 
    CheckCircle, 
    XCircle, 
    Users, 
    TrendingUp,
    AlertTriangle,
    Plus
} from 'lucide-react';
import { formatNumber } from '@/utils/format';
import { cn } from '@/lib/utils';

interface DashboardPageProps {
    stats: DashboardStats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<DashboardPageProps>();
    const stats = props.stats || {
        total_pengajuan_hari_ini: 0,
        menunggu_verifikasi: 0,
        disetujui_bulan_ini: 0,
        ditolak_bulan_ini: 0,
        total_pemohon: 0,
        total_jenis_surat: 0,
        pengajuan_trend: [],
        kategori_populer: []
    };

    const statCards = [
        {
            title: 'Pengajuan Hari Ini',
            value: stats.total_pengajuan_hari_ini,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            trend: '+12%',
            description: 'Dari kemarin'
        },
        {
            title: 'Menunggu Verifikasi',
            value: stats.menunggu_verifikasi,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            trend: stats.menunggu_verifikasi > 10 ? 'HIGH' : 'NORMAL',
            description: 'Perlu ditindaklanjuti'
        },
        {
            title: 'Disetujui Bulan Ini',
            value: stats.disetujui_bulan_ini,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            trend: '+8%',
            description: 'Dari bulan lalu'
        },
        {
            title: 'Ditolak Bulan Ini',
            value: stats.ditolak_bulan_ini,
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            trend: '-3%',
            description: 'Dari bulan lalu'
        }
    ];

    const quickActions = [
        {
            title: 'Buat Pengajuan Baru',
            description: 'Tambah pengajuan surat baru',
            icon: Plus,
            href: '/pengajuan/create',
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            title: 'Verifikasi Surat',
            description: `${stats.menunggu_verifikasi} surat menunggu`,
            icon: Clock,
            href: '/pengajuan?status=menunggu_verifikasi',
            color: 'bg-yellow-600 hover:bg-yellow-700'
        },
        {
            title: 'Kelola Pemohon',
            description: `${stats.total_pemohon} pemohon terdaftar`,
            icon: Users,
            href: '/pemohon',
            color: 'bg-green-600 hover:bg-green-700'
        },
        {
            title: 'Laporan',
            description: 'Lihat laporan lengkap',
            icon: TrendingUp,
            href: '/laporan',
            color: 'bg-purple-600 hover:bg-purple-700'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard Admin Surat Desa
                        </h1>
                        <p className="text-sm text-gray-600">
                            Kelola dan monitor semua pengajuan surat desa
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            {new Date().toLocaleDateString('id-ID', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </Badge>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((card, index) => (
                        <Card key={index} className="relative overflow-hidden bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {card.title}
                                </CardTitle>
                                <div className={cn("p-2 rounded-full", card.bgColor)}>
                                    <card.icon className={cn("h-4 w-4", card.color)} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatNumber(card.value)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <span>{card.description}</span>
                                    {card.trend && (
                                        <Badge 
                                            variant={card.trend === 'HIGH' ? 'destructive' : 'secondary'}
                                            className="text-xs"
                                        >
                                            {card.trend}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <Card key={index} className="group cursor-pointer hover:shadow-md transition-shadow bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-lg text-white", action.color)}>
                                        <action.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Pengajuan Terbaru */}
                    <Card className="lg:col-span-2 bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900">
                                <FileText className="h-5 w-5" />
                                Pengajuan Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Placeholder untuk tabel pengajuan terbaru */}
                                <div className="relative aspect-[2/1] overflow-hidden rounded-lg border border-gray-200">
                                    <PlaceholderPattern className="absolute inset-0 size-full stroke-gray-300" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                        <div className="text-center">
                                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">
                                                Tabel pengajuan terbaru akan ditampilkan di sini
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Kategori Populer */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900">
                                <TrendingUp className="h-5 w-5" />
                                Kategori Populer
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.kategori_populer.length > 0 ? (
                                    stats.kategori_populer.map((kategori, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm font-medium">{kategori.kategori}</span>
                                            </div>
                                            <Badge variant="secondary">{kategori.jumlah}</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">
                                            Belum ada data kategori populer
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Notifikasi dan Peringatan */}
                {stats.menunggu_verifikasi > 10 && (
                    <Card className="border-yellow-200 bg-yellow-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                <div className="flex-1">
                                    <h3 className="font-medium text-yellow-800">
                                        Peringatan: Banyak surat menunggu verifikasi
                                    </h3>
                                    <p className="text-sm text-yellow-700">
                                        Terdapat {stats.menunggu_verifikasi} surat yang menunggu verifikasi. 
                                        Segera proses untuk meningkatkan layanan.
                                    </p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                                >
                                    Proses Sekarang
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
