import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    type BreadcrumbItem, 
    type KategoriSurat,
    type SharedData
} from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
    Plus, 
    Search, 
    Eye, 
    Edit, 
    Trash2, 
    MoreHorizontal,
    FolderOpen,
    FileText,
    Settings
} from 'lucide-react';
import { formatDate, formatNumber } from '@/utils/format';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

interface KategoriPageProps extends SharedData {
    kategoris: KategoriSurat[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori Surat', href: '/kategori-surat' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'store': FolderOpen,
    'home': FolderOpen,
    'calendar': FolderOpen,
    'user': FolderOpen,
    'leaf': FolderOpen,
    'default': FolderOpen
};

export default function KategoriSuratIndex() {
    const { props } = usePage<KategoriPageProps>();
    const { kategoris } = props;
    
    const [search, setSearch] = useState('');

    const filteredKategoris = kategoris.filter(kategori =>
        kategori.nama_kategori.toLowerCase().includes(search.toLowerCase()) ||
        kategori.deskripsi.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getIconComponent = (iconName: string) => {
        const Icon = iconMap[iconName] || iconMap.default;
        return Icon;
    };

    const handleToggleStatus = (kategori: KategoriSurat) => {
        router.patch(`/kategori-surat/${kategori.id}/toggle-status`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (kategori: KategoriSurat) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${kategori.nama_kategori}"?`)) {
            router.delete(`/kategori-surat/${kategori.id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Surat" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 ">
                            Kategori Surat
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Kelola kategori surat yang tersedia di sistem
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/kategori-surat/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Kategori
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari kategori berdasarkan nama atau deskripsi..."
                                value={search}
                                onChange={handleSearch}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 ">Total Kategori</p>
                                    <p className="text-2xl font-bold text-gray-900 ">
                                        {formatNumber(kategoris.length)}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <FolderOpen className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 ">Kategori Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900 ">
                                        {formatNumber(kategoris.filter(k => k.is_active).length)}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-full">
                                    <Settings className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 ">Total Jenis Surat</p>
                                    <p className="text-2xl font-bold text-gray-900 ">
                                        {formatNumber(kategoris.reduce((sum, k) => sum + (k._count?.jenis_surat || 0), 0))}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <FileText className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Daftar Kategori ({filteredKategoris.length} kategori)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Jenis Surat</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredKategoris.length > 0 ? (
                                        filteredKategoris.map((kategori) => {
                                            const IconComponent = getIconComponent(kategori.icon);
                                            return (
                                                <TableRow key={kategori.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div 
                                                                className="p-2 rounded-lg"
                                                                style={{ backgroundColor: `${kategori.warna}20` }}
                                                            >
                                                                <IconComponent 
                                                                    className="h-5 w-5" 
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 ">
                                                                    {kategori.nama_kategori}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {kategori.warna}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="max-w-md">
                                                            <p className="text-sm text-gray-600  truncate">
                                                                {kategori.deskripsi}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary">
                                                                {kategori._count?.jenis_surat || 0} jenis
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge 
                                                            variant={kategori.is_active ? "default" : "secondary"}
                                                            className={cn(
                                                                kategori.is_active 
                                                                    ? "bg-green-100 text-green-800" 
                                                                    : "bg-gray-100 text-gray-800"
                                                            )}
                                                        >
                                                            {kategori.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm text-gray-600 ">
                                                            {formatDate(kategori.created_at)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/kategori-surat/${kategori.id}`}>
                                                                        <Eye className="h-4 w-4 mr-2" />
                                                                        Lihat Detail
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/kategori-surat/${kategori.id}/edit`}>
                                                                        <Edit className="h-4 w-4 mr-2" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleToggleStatus(kategori)}
                                                                >
                                                                    <Settings className="h-4 w-4 mr-2" />
                                                                    {kategori.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem 
                                                                    className="text-red-600"
                                                                    onClick={() => handleDelete(kategori)}
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Hapus
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FolderOpen className="h-8 w-8 text-gray-400" />
                                                    <p className="text-gray-500">
                                                        {search ? 'Tidak ada kategori yang ditemukan' : 'Belum ada kategori surat'}
                                                    </p>
                                                    {!search && (
                                                        <Button asChild size="sm">
                                                            <Link href="/kategori-surat/create">
                                                                <Plus className="h-4 w-4 mr-2" />
                                                                Tambah Kategori Pertama
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
