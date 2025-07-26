import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect, act } from 'react';
import axios from 'axios';
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
  Building, 
  TreePine, 
  FileCheck, 
  Wrench,
  ListFilter
} from 'lucide-react';

import DataTable from 'react-data-table-component';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan Bangunan',
    href: '/perizinan-bangunan',
  },
];

const permitIcons = {
  'imb': Building,
  'lahan-desa': TreePine,
  'tidak-sengketa': FileCheck,
  'renovasi': Wrench,
};

type SuratItem = {
    status: string;
    [key: string]: any;
  };

  type StatusCounts = {
    total: number;
    diproses: number;
    disetujui: number;
    ditolak: number;
  };

  type SuratResponse = {
    list: SuratItem[];
    statusCounts: StatusCounts | null;
  };

export default function PerizinanBangunan() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [activeTab, setActiveTab] = useState('imb');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idDelete, setIdDelete] = useState(0);
  
  const { showToast } = useToast();

  // Create a permits array that always uses the latest state
  const permitTypes = [
    { key: 'imb' },
    { key: 'lahan-desa' },
    { key: 'tidak-sengketa' },
    { key: 'renovasi' },
  ];

  // const [activeTab, setActiveTab] = useState('sku'); // example default tab
  const [tabData, setTabData] = useState<SuratItem[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    total: 0,
    diproses: 0,
    disetujui: 0,
    ditolak: 0,
  });

  const getDataForTab = async (tabKey: string): Promise<SuratResponse> => {
    try {
      const response = await axios.get(`${API_URL}/surat/${tabKey}`);
      const list = response.data.data || [];
      showToast.success(response.data.message);
      return {
        list,
        statusCounts: {
          total: list.length,
          diproses: response.data.diproses,
          disetujui: response.data.disetujui,
          ditolak: response.data.ditolak,
        },
      };
    } catch (error) {
      console.error(`Failed to fetch data for ${tabKey}:`, error);
      showToast.error("Terjadi kesalahan");
      return { list: [], statusCounts: null };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteModal = (id: number) => {
    setIdDelete(id);
    setIsDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/surat/form/${idDelete}`);
      showToast.success(response.data.message);
    } catch (error) {
      console.error(error);
      showToast.error("Terjadi kesalahan");
      return { list: [], statusCounts: null };
    } finally {
      fetchData();
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  }

  const fetchData = async () => {
    const result = await getDataForTab(activeTab);
    setTabData(result.list);
    if (result.statusCounts) setStatusCounts(result.statusCounts);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Perizinan Usaha" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan Bangunan
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan bangunan dalam satu dashboard
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
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.total}</div>
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
              <div className="text-2xl font-bold">{statusCounts.diproses}</div>
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
              <div className="text-2xl font-bold">{statusCounts.disetujui}</div>
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
              <div className="text-2xl font-bold">{statusCounts.ditolak}</div>
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
              <span className='grow'>Kelola semua jenis perizinan usaha yang diajukan warga</span>
              <NewButton href={`form/create/${activeTab}`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                {permitTypes.map((permit) => {
                  const Icon = permitIcons[permit.key as keyof typeof permitIcons];
                  // permit data is array of all surat in one kategori
                  // const counts = getStatusCounts(permit.data);
                  
                  return (
                    <TabsTrigger 
                      key={permit.key} 
                      value={permit.key}
                      className="flex flex-col items-center gap-2 p-4 h-auto"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {permit.key.toUpperCase()}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {/* {counts.total}  */}
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
                        Total {statusCounts.total} pengajuan
                      </p>
                    </div>
                  </div>
                  {
                    isLoading ? (
                      <div className="p-4 text-center text-muted-foreground">Loading data...</div>
                    )
                    : (
                      <DataTable
                        data={tabData}
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
                            name: "Luas Tanah",
                            selector: row => row.form.luas_tanah,
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
                                <Link href={`form/view/${row.id}`}>
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
