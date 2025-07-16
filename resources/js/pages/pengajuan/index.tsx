import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    type BreadcrumbItem, 
    type PengajuanSurat, 
    type FilterPengajuan, 
    type KategoriSurat, 
    type JenisSurat,
    type SharedData
} from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
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
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    MoreHorizontal,
    FileText,
    Download,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel, getPrioritasColor, getPrioritasLabel } from '@/utils/format';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

interface PengajuanPageProps extends SharedData {
    pengajuan: {
        data: PengajuanSurat[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    kategoris: KategoriSurat[];
    jenis_surat: JenisSurat[];
    filters: FilterPengajuan;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Pengajuan Surat', href: '/pengajuan' },
];

export default function PengajuanIndex() {
    const { props } = usePage<PengajuanPageProps>();
    const { pengajuan, kategoris, jenis_surat, filters } = props;
    
    const [search, setSearch] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [selectedKategori, setSelectedKategori] = useState(filters.kategori_id?.toString() || '');
    const [selectedJenis, setSelectedJenis] = useState(filters.jenis_surat_id?.toString() || '');
    const [showFilters, setShowFilters] = useState(false);

    const statusOptions = [
        { value: '', label: 'Semua Status' },
        { value: 'draft', label: 'Draft' },
        { value: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
        { value: 'disetujui', label: 'Disetujui' },
        { value: 'ditolak', label: 'Ditolak' },
        { value: 'revisi', label: 'Perlu Revisi' }
    ];

    const prioritasOptions = [
        { value: '', label: 'Semua Prioritas' },
        { value: 'rendah', label: 'Rendah' },
        { value: 'normal', label: 'Normal' },
        { value: 'tinggi', label: 'Tinggi' },
        { value: 'urgent', label: 'Urgent' }
    ];

    const handleFilter = () => {
        const params: Record<string, string | number> = {};
        
        if (search) params.search = search;
        if (selectedStatus) params.status = selectedStatus;
        if (selectedKategori) params.kategori_id = parseInt(selectedKategori);
        if (selectedJenis) params.jenis_surat_id = parseInt(selectedJenis);
        
        router.get('/pengajuan', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleResetFilter = () => {
        setSearch('');
        setSelectedStatus('');
        setSelectedKategori('');
        setSelectedJenis('');
        
        router.get('/pengajuan', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (page: number) => {
        const params: Record<string, string | number> = { ...filters, page };
        router.get('/pengajuan', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusIcon = (status: string) => {
        const icons: Record<string, React.ComponentType<{ className?: string }>> = {
            'draft': FileText,
            'menunggu_verifikasi': Clock,
            'disetujui': CheckCircle,
            'ditolak': XCircle,
            'revisi': AlertTriangle
        };
        const Icon = icons[status] || FileText;
        return <Icon className="h-4 w-4" />;
    };

    const filteredJenisSurat = selectedKategori 
        ? jenis_surat.filter(js => js.kategori_id === parseInt(selectedKategori))
        : jenis_surat;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengajuan Surat" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 ">
                            Pengajuan Surat
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Kelola semua pengajuan surat dari masyarakat
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/pengajuan/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Buat Pengajuan
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-gray-900">Filter & Pencarian</CardTitle>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {/* Search */}
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Cari berdasarkan nomor pengajuan, nama pemohon, atau tujuan surat..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button onClick={handleFilter}>
                                    <Search className="h-4 w-4 mr-2" />
                                    Cari
                                </Button>
                            </div>

                            {/* Advanced Filters */}
                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Kategori</label>
                                        <Select value={selectedKategori} onValueChange={setSelectedKategori}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Kategori</SelectItem>
                                                {kategoris.map(kategori => (
                                                    <SelectItem key={kategori.id} value={kategori.id.toString()}>
                                                        {kategori.nama_kategori}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Jenis Surat</label>
                                        <Select value={selectedJenis} onValueChange={setSelectedJenis}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis surat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Jenis</SelectItem>
                                                {filteredJenisSurat.map(jenis => (
                                                    <SelectItem key={jenis.id} value={jenis.id.toString()}>
                                                        {jenis.nama_surat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="flex items-end gap-2">
                                        <Button onClick={handleFilter} className="flex-1">
                                            Terapkan Filter
                                        </Button>
                                        <Button variant="outline" onClick={handleResetFilter}>
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card className="bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-gray-900">
                                Daftar Pengajuan ({pengajuan.meta.total} total)
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nomor Pengajuan</TableHead>
                                        <TableHead>Pemohon</TableHead>
                                        <TableHead>Jenis Surat</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Prioritas</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Biaya</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pengajuan.data.length > 0 ? (
                                        pengajuan.data.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">
                                                    {item.nomor_pengajuan}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{item.pemohon?.nama_lengkap}</div>
                                                        <div className="text-sm text-gray-500">{item.pemohon?.nik}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{item.jenis_surat?.nama_surat}</div>
                                                        <div className="text-sm text-gray-500">{item.jenis_surat?.kategori?.nama_kategori}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={cn("flex items-center gap-1", getStatusColor(item.status))}>
                                                        {getStatusIcon(item.status)}
                                                        {getStatusLabel(item.status)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={getPrioritasColor(item.prioritas)}>
                                                        {getPrioritasLabel(item.prioritas)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(item.tanggal_pengajuan)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {formatCurrency(item.biaya_total)}
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
                                                                <Link href={`/pengajuan/${item.id}`}>
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    Lihat Detail
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/pengajuan/${item.id}/edit`}>
                                                                    <Edit className="h-4 w-4 mr-2" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FileText className="h-8 w-8 text-gray-400" />
                                                    <p className="text-gray-500">Tidak ada pengajuan surat ditemukan</p>
                                                    <Button asChild size="sm">
                                                        <Link href="/pengajuan/create">
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Buat Pengajuan Pertama
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {pengajuan.meta.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {((pengajuan.meta.current_page - 1) * pengajuan.meta.per_page) + 1} - {Math.min(pengajuan.meta.current_page * pengajuan.meta.per_page, pengajuan.meta.total)} dari {pengajuan.meta.total} pengajuan
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pengajuan.meta.current_page - 1)}
                                        disabled={pengajuan.meta.current_page === 1}
                                    >
                                        Sebelumnya
                                    </Button>
                                    
                                    {Array.from({ length: pengajuan.meta.last_page }, (_, i) => i + 1)
                                        .filter(page => 
                                            page === 1 || 
                                            page === pengajuan.meta.last_page || 
                                            Math.abs(page - pengajuan.meta.current_page) <= 2
                                        )
                                        .map((page, index, array) => (
                                            <div key={page} className="flex items-center">
                                                {index > 0 && array[index - 1] !== page - 1 && (
                                                    <span className="px-2 text-gray-400">...</span>
                                                )}
                                                <Button
                                                    variant={page === pengajuan.meta.current_page ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </Button>
                                            </div>
                                        ))}
                                    
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pengajuan.meta.current_page + 1)}
                                        disabled={pengajuan.meta.current_page === pengajuan.meta.last_page}
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
