import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import NewButton from '@/components/new-button';
import { type BreadcrumbItem } from '@/types';
import { 
  FileText, 
  Building, 
  MapPin, 
  Globe,
  ListFilter,
  Calendar,
  Users,
  Building2,
  TreePine,
  FileCheck,
  Wrench,
  Sprout,
  HandHeart,
  UserCheck,
  Droplets,
  Home,
  UserPlus,
  Plane,
  UserX
} from 'lucide-react';

import DataTable from 'react-data-table-component';
import { Surat } from '@/types/surat';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan',
    href: '/perizinan',
  },
];

const permitIcons = {
  'sku': FileText,
  'iumk': Building,
  'situ': MapPin,
  'nib': Globe,
  'hajatan': Calendar,
  'acara-publik': Users,
  'sarana-umum': Building2,
  'imb': Building,
  'lahan-desa': TreePine,
  'tidak-sengketa': FileCheck,
  'renovasi': Wrench,
  'pengelolaan-lahan': Sprout,
  'permohonan-bantuan': HandHeart,
  'surat-keterangan-petani': UserCheck,
  'surat-izin-irigasi': Droplets,
  'pengantar-skck': FileText,
  'keterangan-domisili': Home,
  'izin-tinggal-pendatang': UserPlus,
  'izin-keluar-negeri': Plane,
  'keterangan-tidak-bekerja': UserX,
};

type Props = {
    slug: String,
    data: Record<string, Surat[]>;       // e.g. { format_slug1: [surat1, surat2], ... }
    total: Record<string, number>;       // e.g. { format_slug1: 10, ... }
    diproses: Record<string, number>;
    disetujui: Record<string, number>;
    ditolak: Record<string, number>;
};

export default function Perizinan({ slug, data, total, diproses, disetujui, ditolak }: Props) {
  const [activeTab, setActiveTab] = useState(() => {
      // Get all keys from data object
      const keys = Object.keys(data);
      // Return the first key, or fallback to empty string if none
      return keys.length > 0 ? keys[0] : '';
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const { showToast } = useToast();
  
  const permitTypes = Object.keys(data).map((key) => ({
      key,
      data: data[key],  // surat array for this format
  }));


  const handleDeleteModal = (id: number) => {
      setIdDelete(id);
      setIsDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    router.delete(route('perizinan.destroy', {slug, id: idDelete}), {
      onSuccess: () => {
        showToast.success('Berhasil menghapus surat');
      },
      onError: () => {
        showToast.error('Terjadi kesalahan');
      },
      onFinish: () => {
        setIsDeleteModalOpen(false);
        router.reload();
      }
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Perizinan Usaha" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan {slug} dalam satu dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span>Perizinan Aktif</span>
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Pengajuan</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total[activeTab]}</div>
              <p className="text-xs text-muted-foreground">
                Semua pengajuan perizinan
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Diproses</CardTitle>
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{diproses[activeTab]}</div>
              <p className="text-xs text-muted-foreground">
                Sedang dalam proses
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disetujui[activeTab]}</div>
              <p className="text-xs text-muted-foreground">
                Telah disetujui
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
              <div className="h-2 w-2 rounded-full bg-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ditolak[activeTab]}</div>
              <p className="text-xs text-muted-foreground">
                Telah ditolak
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle>Data Perizinan</CardTitle>
            <CardDescription className='flex items-center align-middle'>
              <span className='grow'>Kelola semua jenis perizinan {slug} yang diajukan warga</span>
              <NewButton title='Tambah Perizinan' href={`/${activeTab}/create`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid grid-cols-${permitTypes.length < 5 ? permitTypes.length : 4} w-full mb-8`}>
                {permitTypes.map((permit) => {
                    const Icon = permitIcons[permit.key as keyof typeof permitIcons]; // if you have icon keyed by format slug

                    // You can calculate counts here or pass counts separately
                    const countsTotal = total[permit.key] ?? 0;

                    return (
                        <TabsTrigger
                        key={permit.key}
                        value={permit.key}
                        className="flex flex-col items-center gap-2 p-4 h-auto"
                        >
                        <div className="flex items-center gap-2">
                            {Icon && <Icon className="h-4 w-4" />}
                            <span className="text-xs font-medium">{permit.key.toUpperCase()}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                            {countsTotal}
                        </Badge>
                        </TabsTrigger>
                    );
                })}
              </TabsList>
              <TabsContent key={activeTab} value={activeTab} className='mt-2'>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      {/* should be activetab label name */}
                      <h3 className="text-lg font-semibold">{activeTab.toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">
                        Total {total[activeTab]} pengajuan
                      </p>
                    </div>
                  </div>
                  {
                    isLoading ? (
                      <div className="p-4 text-center text-muted-foreground">Loading data...</div>
                    )
                    : (
                      <DataTable
                        data={data[activeTab]}
                        columns={[
                          {
                            name: "ID",
                            selector: row => row.id,
                            sortable: true
                          },
                          {
                            name: "Nama Pemohon",
                            selector: row => row.form.nama,
                            sortable: true
                          },
                          {
                            name: "NIK",
                            selector: row => row.form.nik,
                            sortable: true
                          },
                          {
                            name: "Nama Usaha",
                            selector: row => row.form.nama_usaha,
                            sortable: true
                          },
                          {
                            name: "Status",
                            selector: row => row.status,
                            sortable: true,
                            cell: row => {
                              const variant = row.status == 'diproses' ? 'warning' : (row.status == 'disetujui' ? 'success' : (row.status == 'ditolak' ? 'destructive' : 'secondary'));
                              return (<Badge variant={variant}>{row.status.toUpperCase()}</Badge>)
                            }
                          },
                          {
                            name: "Aksi",
                            cell: row => (
                              <div className="flex items-center gap-2">
                                <Link href={`/perizinan/${slug}/${row.id}`}>
                                  <Button className='bg-gray-500' type='button'>Lihat</Button>
                                </Link>
                                <Button className='bg-red-500' type='button' onClick={() => handleDeleteModal(row.id)}>Hapus</Button>
                              </div>
                            )
                          }
                        ]}
                        pagination
                        highlightOnHover
                      />
                    )
                  }
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        title={"Hapus Surat"}
        description={`Apakah anda yakin akan menghapus data id:${idDelete}`}
        isLoading={isLoading}
      />
    </AppLayout>
  );
}