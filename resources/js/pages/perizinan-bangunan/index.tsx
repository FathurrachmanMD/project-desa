import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildingPermitTable } from '@/components/building-permit-table';
import { BuildingPermitDetailModal } from '@/components/building-permit-detail-modal';
import { BuildingPermitEditModal } from '@/components/building-permit-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useCrudToast, usePermitToast } from '@/hooks/useToast';
import { 
  imbData as originalImbData, 
  lahanDesaData as originalLahanDesaData, 
  tidakSengketaData as originalTidakSengketaData,
  renovasiData as originalRenovasiData,
  IzinMendirikanBangunan,
  IzinBangunLahanDesa,
  SuratTidakSengketaTanah,
  IzinRenovasiPerluasan
} from '@/data/building-permits';
import { type BreadcrumbItem } from '@/types';
import { 
  Building, 
  TreePine, 
  FileCheck, 
  Wrench,
  ListFilter
} from 'lucide-react';
import NewButton from '@/components/new-button';

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

export default function PerizinanBangunan() {
  const [activeTab, setActiveTab] = useState('imb');
  const [selectedData, setSelectedData] = useState<IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Toast hooks
  const { updateSuccess, deleteSuccess, deleteError } = useCrudToast();
  const { approveSuccess } = usePermitToast();
  
  // State management for each data type
  const [imbData, setImbData] = useState<IzinMendirikanBangunan[]>(originalImbData);
  const [lahanDesaData, setLahanDesaData] = useState<IzinBangunLahanDesa[]>(originalLahanDesaData);
  const [tidakSengketaData, setTidakSengketaData] = useState<SuratTidakSengketaTanah[]>(originalTidakSengketaData);
  const [renovasiData, setRenovasiData] = useState<IzinRenovasiPerluasan[]>(originalRenovasiData);
  
  // Create a building permits array that always uses the latest state
  const buildingPermitTypes = [
    { key: 'imb', label: 'Izin Mendirikan Bangunan (IMB/PBG)', data: imbData },
    { key: 'lahan-desa', label: 'Izin Bangun di Lahan Milik Desa', data: lahanDesaData },
    { key: 'tidak-sengketa', label: 'Surat Tidak Sengketa Tanah', data: tidakSengketaData },
    { key: 'renovasi', label: 'Izin Renovasi atau Perluasan Bangunan', data: renovasiData },
  ];

  const handleView = (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => {
    // Update the data in local state based on type
    switch (activeTab) {
      case 'imb': {
        const newData = imbData.map(item => 
          item.id === updatedData.id ? updatedData as IzinMendirikanBangunan : item
        );
        setImbData(newData);
        break;
      }
      case 'lahan-desa': {
        const newData = lahanDesaData.map(item => 
          item.id === updatedData.id ? updatedData as IzinBangunLahanDesa : item
        );
        setLahanDesaData(newData);
        break;
      }
      case 'tidak-sengketa': {
        const newData = tidakSengketaData.map(item => 
          item.id === updatedData.id ? updatedData as SuratTidakSengketaTanah : item
        );
        setTidakSengketaData(newData);
        break;
      }
      case 'renovasi': {
        const newData = renovasiData.map(item => 
          item.id === updatedData.id ? updatedData as IzinRenovasiPerluasan : item
        );
        setRenovasiData(newData);
        break;
      }
    }
    
    setIsEditModalOpen(false);
    updateSuccess('Data perizinan bangunan');
  };

  const handleConfirmDelete = async () => {
    if (!dataToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete the data from the state based on type
      switch (activeTab) {
        case 'imb': {
          const newData = imbData.filter(item => item.id !== dataToDelete.id);
          setImbData(newData);
          break;
        }
        case 'lahan-desa': {
          const newData = lahanDesaData.filter(item => item.id !== dataToDelete.id);
          setLahanDesaData(newData);
          break;
        }
        case 'tidak-sengketa': {
          const newData = tidakSengketaData.filter(item => item.id !== dataToDelete.id);
          setTidakSengketaData(newData);
          break;
        }
        case 'renovasi': {
          const newData = renovasiData.filter(item => item.id !== dataToDelete.id);
          setRenovasiData(newData);
          break;
        }
      }
      
      setIsDeleteModalOpen(false);
      setDataToDelete(null);
      deleteSuccess('Data perizinan bangunan');
    } catch {
      deleteError('Terjadi kesalahan saat menghapus data perizinan bangunan');
    } finally {
      setIsDeleting(false);
    }
  };

  const getDeleteModalContent = () => {
    if (!dataToDelete) return { title: '', description: '' };
    
    let title = '';
    let description = '';
    
    switch (activeTab) {
      case 'imb': {
        const imbData = dataToDelete as IzinMendirikanBangunan;
        title = 'Hapus Izin Mendirikan Bangunan';
        description = `Apakah Anda yakin ingin menghapus izin mendirikan bangunan untuk ${imbData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'lahan-desa': {
        const lahanData = dataToDelete as IzinBangunLahanDesa;
        title = 'Hapus Izin Bangun di Lahan Milik Desa';
        description = `Apakah Anda yakin ingin menghapus izin bangun di lahan milik desa untuk ${lahanData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'tidak-sengketa': {
        const sengketaData = dataToDelete as SuratTidakSengketaTanah;
        title = 'Hapus Surat Tidak Sengketa Tanah';
        description = `Apakah Anda yakin ingin menghapus surat tidak sengketa tanah untuk ${sengketaData.nama_pemilik_tanah}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'renovasi': {
        const renovasiData = dataToDelete as IzinRenovasiPerluasan;
        title = 'Hapus Izin Renovasi atau Perluasan Bangunan';
        description = `Apakah Anda yakin ingin menghapus izin renovasi atau perluasan bangunan untuk ${renovasiData.nama_pemilik}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      default: {
        title = 'Hapus Data';
        description = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.';
      }
    }
    
    return { title, description };
  };

  const getDataForTab = (tabKey: string) => {
    switch (tabKey) {
      case 'imb':
        return imbData;
      case 'lahan-desa':
        return lahanDesaData;
      case 'tidak-sengketa':
        return tidakSengketaData;
      case 'renovasi':
        return renovasiData;
      default:
        return [];
    }
  };

  const getStatusCounts = (data: Array<{ status: string }>) => {
    const counts = {
      total: data.length,
      diproses: data.filter(item => item.status === 'Diproses').length,
      disetujui: data.filter(item => item.status === 'Disetujui').length,
      ditolak: data.filter(item => item.status === 'Ditolak').length,
    };
    return counts;
  };

  const currentTabData = getDataForTab(activeTab);
  const statusCounts = getStatusCounts(currentTabData);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Perizinan Bangunan" />
      
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
            <CardTitle>Data Perizinan Bangunan</CardTitle>
            <CardDescription className='flex items-center align-middle'>
              <span className='grow'>Kelola semua jenis perizinan usaha yang diajukan warga</span>
              <NewButton href={`form/create/${activeTab}`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                {buildingPermitTypes.map((permit) => {
                  const Icon = permitIcons[permit.key as keyof typeof permitIcons];
                  const counts = getStatusCounts(permit.data);
                  
                  return (
                    <TabsTrigger 
                      key={permit.key} 
                      value={permit.key}
                      className="flex flex-col items-center gap-2 p-4 h-auto"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {permit.key === 'imb' && 'IMB/PBG'}
                          {permit.key === 'lahan-desa' && 'LAHAN DESA'}
                          {permit.key === 'tidak-sengketa' && 'TIDAK SENGKETA'}
                          {permit.key === 'renovasi' && 'RENOVASI'}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {counts.total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {buildingPermitTypes.map((permit) => {
                const tabData = getDataForTab(permit.key);
                return (
                  <TabsContent key={permit.key} value={permit.key} className="mt-2">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{permit.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            Total {tabData.length} pengajuan
                          </p>
                        </div>
                      </div>
                      
                      <BuildingPermitTable
                        type={permit.key as 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi'}
                        data={permit.data}
                        searchPlaceholder={`Cari ${permit.label.toLowerCase()}...`}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <BuildingPermitDetailModal
        data={selectedData}
        type={activeTab as 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi'}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Edit Modal */}
      <BuildingPermitEditModal
        data={selectedData}
        type={activeTab as 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi'}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title={getDeleteModalContent().title}
        description={getDeleteModalContent().description}
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}
