import { FadeInView, StaggerAnimation, StaggerItem, Typewriter } from '@/components/animations';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { UsersTable } from '@/components/dashboard/users-table';
import { hajatnData, acaraPublikData, saranaUmumData } from '@/data/event-permits';
import { imbData, lahanDesaData, tidakSengketaData, renovasiData } from '@/data/building-permits';
import { 
  pengantarSKCKData, 
  keteranganDomisiliData, 
  izinTinggalPendatangData, 
  izinKeluarNegeriData, 
  keteranganTidakBekerjaData 
} from '@/data/personal-permits';
import { skuData, iumkData, situData, nibData } from '@/data/business-permits';
import { izinLahanData, rekomendasiPupukData, suratKeteranganPetaniData } from '@/data/agriculture-permits';
import { customersData } from '@/data/customers';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Activity,
  UserCheck,
  Clock,
  CheckCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Calculate statistics from real data
const calculateStats = () => {
    // Event permits
    const totalEventPermits = hajatnData.length + acaraPublikData.length + saranaUmumData.length;
    
    // Building permits
    const totalBuildingPermits = imbData.length + lahanDesaData.length + tidakSengketaData.length + renovasiData.length;
    
    // Personal permits
    const totalPersonalPermits = pengantarSKCKData.length + keteranganDomisiliData.length + 
                                izinTinggalPendatangData.length + izinKeluarNegeriData.length + 
                                keteranganTidakBekerjaData.length;
    
    // Business permits
    const totalBusinessPermits = skuData.length + iumkData.length + situData.length + nibData.length;
    
    // Agriculture permits
    const totalAgriculturePermits = izinLahanData.length + rekomendasiPupukData.length + suratKeteranganPetaniData.length;
    
    // Total all permits
    const totalAllPermits = totalEventPermits + totalBuildingPermits + totalPersonalPermits + totalBusinessPermits + totalAgriculturePermits;
    
    const totalCustomers = customersData.length;
    
    // Count by status for all permits
    const allPermits = [
        ...hajatnData, ...acaraPublikData, ...saranaUmumData,
        ...imbData, ...lahanDesaData, ...tidakSengketaData, ...renovasiData,
        ...pengantarSKCKData, ...keteranganDomisiliData, ...izinTinggalPendatangData, 
        ...izinKeluarNegeriData, ...keteranganTidakBekerjaData,
        ...skuData, ...iumkData, ...situData, ...nibData,
        ...izinLahanData, ...rekomendasiPupukData, ...suratKeteranganPetaniData
    ];
    
    const approvedPermits = allPermits.filter(item => item.status === 'Disetujui').length;
    const pendingPermits = allPermits.filter(item => item.status === 'Diproses').length;
    const rejectedPermits = allPermits.filter(item => item.status === 'Ditolak').length;
    
    const activeCustomers = customersData.filter(customer => customer.status_akun === 'Aktif').length;
    
    // Calculate approval rate
    const approvalRate = totalAllPermits > 0 ? Math.round((approvedPermits / totalAllPermits) * 100) : 0;
    
    return {
        totalAllPermits,
        totalEventPermits,
        totalBuildingPermits,
        totalPersonalPermits,
        totalBusinessPermits,
        totalAgriculturePermits,
        approvedPermits,
        pendingPermits,
        rejectedPermits,
        totalCustomers,
        activeCustomers,
        approvalRate
    };
};

export default function Dashboard() {
    const stats = calculateStats();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <FadeInView className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Welcome Section */}
                <div className="mb-2">
                    <Typewriter 
                        text="Dashboard Sistem Informasi Desa" 
                        className="text-3xl font-bold text-gray-800 dark:text-white"
                        speed={80}
                    />
                    <FadeInView delay={2} direction="up" className="mt-2">
                        <p className="text-gray-600 dark:text-gray-300">
                            Kelola data dan layanan desa dengan mudah dan efisien
                        </p>
                    </FadeInView>
                </div>

                {/* Statistics Cards */}
                <div className="w-full">
                    <StaggerAnimation className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <StaggerItem>
                            <Link href="/dashboard" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Total Perizinan
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                                            <FileText className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalAllPermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            {stats.approvedPermits} disetujui, {stats.pendingPermits} diproses
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/event-permits" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Perizinan Acara
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-emerald-100 rounded-lg flex-shrink-0">
                                            <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalEventPermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            Hajatan, Publik, Sarana
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/building-permits" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Perizinan Bangunan
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
                                            <Activity className="h-3 w-3 lg:h-4 lg:w-4 text-amber-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalBuildingPermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            IMB, Renovasi, Lahan Desa
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/personal-permits" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Perizinan Pribadi
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-purple-100 rounded-lg flex-shrink-0">
                                            <Users className="h-3 w-3 lg:h-4 lg:w-4 text-purple-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalPersonalPermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            SKCK, Domisili, Keluar Negeri
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/business-permits" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Perizinan Usaha
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-orange-100 rounded-lg flex-shrink-0">
                                            <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-orange-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalBusinessPermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            SKU, IUMK, SITU, NIB
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/agriculture-permits" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Perizinan Pertanian
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-teal-100 rounded-lg flex-shrink-0">
                                            <Activity className="h-3 w-3 lg:h-4 lg:w-4 text-teal-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalAgriculturePermits}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            Lahan, Pupuk, Keterangan Petani
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                        <StaggerItem>
                            <Link href="/customers" className="block h-full">
                                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 lg:px-4 pt-2 lg:pt-3">
                                        <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                                            Total Warga
                                        </CardTitle>
                                        <div className="p-1 lg:p-1.5 bg-rose-100 rounded-lg flex-shrink-0">
                                            <UserCheck className="h-3 w-3 lg:h-4 lg:w-4 text-rose-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 px-3 lg:px-4 pb-2 lg:pb-3">
                                        <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalCustomers}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                                            {stats.activeCustomers} aktif
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </StaggerItem>
                    </StaggerAnimation>
                </div>

                {/* Main Content with Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Statistik</TabsTrigger>
                        <TabsTrigger value="activities">Aktivitas Terbaru</TabsTrigger>
                        <TabsTrigger value="users">Daftar Pengguna</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                        <FadeInView delay={0.4}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Statistik Bulanan
                                    </CardTitle>
                                    <CardDescription>
                                        Grafik perbandingan semua jenis perizinan (Acara, Bangunan, Pribadi, Usaha, Pertanian)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <OverviewChart />
                                </CardContent>
                            </Card>
                        </FadeInView>
                    </TabsContent>
                    
                    <TabsContent value="activities" className="space-y-4">
                        <FadeInView delay={0.4}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        Aktivitas Terbaru
                                    </CardTitle>
                                    <CardDescription>
                                        Aktivitas pengguna dan status perizinan terkini
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentActivities />
                                </CardContent>
                            </Card>
                        </FadeInView>
                    </TabsContent>
                    
                    <TabsContent value="users" className="space-y-4">
                        <FadeInView delay={0.4}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Manajemen Pengguna
                                    </CardTitle>
                                    <CardDescription>
                                        Daftar dan status pengguna yang terdaftar dalam sistem
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UsersTable />
                                </CardContent>
                            </Card>
                        </FadeInView>
                    </TabsContent>
                </Tabs>

                {/* Quick Stats Footer */}
                <FadeInView delay={0.6} className="grid gap-4 md:grid-cols-3">
                    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <div>
                                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                        Menunggu Persetujuan
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                                        {stats.pendingPermits}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                        Disetujui Total
                                    </p>
                                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                        {stats.approvedPermits}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                        Tingkat Persetujuan
                                    </p>
                                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                        {stats.approvalRate}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </FadeInView>
            </FadeInView>
        </AppLayout>
    );
}
