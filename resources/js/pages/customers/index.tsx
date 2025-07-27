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
  Users, 
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  User
} from 'lucide-react';

import DataTable from 'react-data-table-component';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Customer',
    href: '/customers',
  },
];

type PendudukItem = {
  status: string;
  [key: string]: any;
};

type StatusCounts = {
  total: number;
  aktif: number;
  nonaktif: number;
  suspended: number;
};

type PendudukResponse = {
    list: PendudukItem[];
    statusCounts: StatusCounts | null;
  };

export default function Penduduk() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState<PendudukItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idDelete, setIdDelete] = useState(0);
  
  const { showToast } = useToast();

  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    total: 0,
    aktif: 0,
    nonaktif: 0,
    suspended: 0,
  });

  const getData = async (): Promise<PendudukResponse> => {
    try {
      const response = await axios.get(`${API_URL}/penduduk`);
      const list = response.data.data || [];
      showToast.success(response.data.message);
      return {
        list,
        statusCounts: {
          total: list.length,
          aktif: response.data.aktif,
          nonaktif: response.data.nonaktif,
          suspended: response.data.suspended,
        },
      };
    } catch (error) {
      console.error(error);
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
      const response = await axios.delete(`${API_URL}/penduduk/${idDelete}`);
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
    const result = await getData();
    setData(result.list);
    if (result.statusCounts) setStatusCounts(result.statusCounts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Penduduk" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Penduduk
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua penduduk dalam satu dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <User className="h-3.5 w-3.5" />
              <span>Total Penduduk</span>
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Penduduk</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <p className="text-xs text-muted-foreground">
                Semua penduduk
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Penduduk Aktif</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.aktif}</div>
              <p className="text-xs text-muted-foreground">
                Aktif
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Penduduk Nonaktif</CardTitle>
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.nonaktif}</div>
              <p className="text-xs text-muted-foreground">
                Nonaktif
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Penduduk Suspended</CardTitle>
              <div className="h-2 w-2 rounded-full bg-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.suspended}</div>
              <p className="text-xs text-muted-foreground">
                Suspended
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
              {/* <NewButton href={`form/create/${activeTab}`}/> */}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={"penduduk"} className="w-full">
              <TabsContent key={"penduduk"} value={"penduduk"} className='mt-2'>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      {/* should be "penduduk" label name */}
                      <h3 className="text-lg font-semibold">Penduduk</h3>
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
                        data={data}
                        columns={[
                          {
                            name: "ID",
                            selector: row => row.id,
                            sortable: true
                          },
                          {
                            name: "Nama Penduduk",
                            selector: row => row.nama,
                            sortable: true
                          },
                          {
                            name: "NIK",
                            selector: row => row.nik,
                            sortable: true
                          },
                          {
                            name: "Status",
                            selector: row => row.status,
                            sortable: true,
                            cell: row => {
                              const variant = row.status == 'nonaktif' ? 'warning' : (row.status == 'aktif' ? 'success' : (row.status == 'suspended' ? 'destructive' : 'secondary'));
                              return (<Badge variant={variant}>{row.status.toUpperCase()}</Badge>)
                            }
                          },
                          {
                            name: "Aksi",
                            cell: row => (
                              <div className="flex items-center gap-2">
                                <Link href={`customers/form/${row.id}`}>
                                  <Button className='bg-yellow-500' type='button'>Edit</Button>
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
