import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AgriculturalPermitTable } from '@/components/agricultural-permit-table';
import { AgriculturalPermitDetailModal } from '@/components/agricultural-permit-detail-modal';
import { AgriculturalPermitEditModal } from '@/components/agricultural-permit-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { 
  pengelolaanLahanData as originalPengelolaanLahanData, 
  permohonanBantuanData as originalPermohonanBantuanData, 
  suratKeteranganPetaniData as originalSuratKeteranganPetaniData,
  suratIzinIrigasiData as originalSuratIzinIrigasiData,
  IzinPengelolaanLahan,
  PermohonanBantuan,
  SuratKeteranganPetani,
  SuratIzinIrigasi
} from '@/data/agricultural-permits';
import { type BreadcrumbItem } from '@/types';
import { 
  Sprout, 
  HandHeart, 
  UserCheck, 
  Droplets, 
  ListFilter
} from 'lucide-react';
import NewButton from '@/components/new-button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan Pertanian',
    href: '/perizinan-pertanian',
  },
];

const permitIcons = {
  'pengelolaan-lahan': Sprout,
  'permohonan-bantuan': HandHeart,
  'surat-keterangan-petani': UserCheck,
  'surat-izin-irigasi': Droplets,
};

export default function PerizinanPertanian() {
  const [activeTab, setActiveTab] = useState('pengelolaan-lahan');
  const [selectedData, setSelectedData] = useState<IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State management for each data type
  const [pengelolaanLahanData, setPengelolaanLahanData] = useState<IzinPengelolaanLahan[]>(originalPengelolaanLahanData);
  const [permohonanBantuanData, setPermohonanBantuanData] = useState<PermohonanBantuan[]>(originalPermohonanBantuanData);
  const [suratKeteranganPetaniData, setSuratKeteranganPetaniData] = useState<SuratKeteranganPetani[]>(originalSuratKeteranganPetaniData);
  const [suratIzinIrigasiData, setSuratIzinIrigasiData] = useState<SuratIzinIrigasi[]>(originalSuratIzinIrigasiData);
  
  // Create a agricultural permits array that always uses the latest state
  const agriculturalPermitTypes = [
    { key: 'pengelolaan-lahan', label: 'Izin Pengelolaan Lahan Desa / Tanah Negara', data: pengelolaanLahanData },
    { key: 'permohonan-bantuan', label: 'Permohonan Bantuan Pupuk / Bibit / Alat', data: permohonanBantuanData },
    { key: 'surat-keterangan-petani', label: 'Surat Keterangan Petani atau Buruh Tani', data: suratKeteranganPetaniData },
    { key: 'surat-izin-irigasi', label: 'Surat Izin Irigasi / Air Pertanian', data: suratIzinIrigasiData },
  ];

  const handleView = (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => {
    // Update the data in local state based on type
    switch (activeTab) {
      case 'pengelolaan-lahan': {
        const newData = pengelolaanLahanData.map(item => 
          item.id === updatedData.id ? updatedData as IzinPengelolaanLahan : item
        );
        setPengelolaanLahanData(newData);
        break;
      }
      case 'permohonan-bantuan': {
        const newData = permohonanBantuanData.map(item => 
          item.id === updatedData.id ? updatedData as PermohonanBantuan : item
        );
        setPermohonanBantuanData(newData);
        break;
      }
      case 'surat-keterangan-petani': {
        const newData = suratKeteranganPetaniData.map(item => 
          item.id === updatedData.id ? updatedData as SuratKeteranganPetani : item
        );
        setSuratKeteranganPetaniData(newData);
        break;
      }
      case 'surat-izin-irigasi': {
        const newData = suratIzinIrigasiData.map(item => 
          item.id === updatedData.id ? updatedData as SuratIzinIrigasi : item
        );
        setSuratIzinIrigasiData(newData);
        break;
      }
    }
    
    setIsEditModalOpen(false);
    alert('Data berhasil diperbarui');
  };

  const handleConfirmDelete = async () => {
    if (!dataToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete the data from the state based on type
      switch (activeTab) {
        case 'pengelolaan-lahan': {
          const newData = pengelolaanLahanData.filter(item => item.id !== dataToDelete.id);
          setPengelolaanLahanData(newData);
          break;
        }
        case 'permohonan-bantuan': {
          const newData = permohonanBantuanData.filter(item => item.id !== dataToDelete.id);
          setPermohonanBantuanData(newData);
          break;
        }
        case 'surat-keterangan-petani': {
          const newData = suratKeteranganPetaniData.filter(item => item.id !== dataToDelete.id);
          setSuratKeteranganPetaniData(newData);
          break;
        }
        case 'surat-izin-irigasi': {
          const newData = suratIzinIrigasiData.filter(item => item.id !== dataToDelete.id);
          setSuratIzinIrigasiData(newData);
          break;
        }
      }
      
      setIsDeleteModalOpen(false);
      setDataToDelete(null);
      alert('Data berhasil dihapus');
    } catch {
      alert('Terjadi kesalahan saat menghapus data');
    } finally {
      setIsDeleting(false);
    }
  };

  const getDeleteModalContent = () => {
    if (!dataToDelete) return { title: '', description: '' };
    
    let title = '';
    let description = '';
    
    switch (activeTab) {
      case 'pengelolaan-lahan': {
        const lahanData = dataToDelete as IzinPengelolaanLahan;
        title = 'Hapus Izin Pengelolaan Lahan';
        description = `Apakah Anda yakin ingin menghapus izin pengelolaan lahan untuk ${lahanData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'permohonan-bantuan': {
        const bantuanData = dataToDelete as PermohonanBantuan;
        title = 'Hapus Permohonan Bantuan';
        description = `Apakah Anda yakin ingin menghapus permohonan bantuan "${bantuanData.jenis_bantuan}" dari ${bantuanData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'surat-keterangan-petani': {
        const keteranganData = dataToDelete as SuratKeteranganPetani;
        title = 'Hapus Surat Keterangan Petani';
        description = `Apakah Anda yakin ingin menghapus surat keterangan petani untuk ${keteranganData.nama}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'surat-izin-irigasi': {
        const irigasiData = dataToDelete as SuratIzinIrigasi;
        title = 'Hapus Surat Izin Irigasi';
        description = `Apakah Anda yakin ingin menghapus surat izin irigasi untuk ${irigasiData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
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
      case 'pengelolaan-lahan':
        return pengelolaanLahanData;
      case 'permohonan-bantuan':
        return permohonanBantuanData;
      case 'surat-keterangan-petani':
        return suratKeteranganPetaniData;
      case 'surat-izin-irigasi':
        return suratIzinIrigasiData;
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
      <Head title="Manajemen Perizinan Pertanian" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan Pertanian
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan pertanian dalam satu dashboard
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
              <Sprout className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle>Data Perizinan Pertanian</CardTitle>
            <CardDescription className='flex items-center align-middle'>
              <span className='grow'>Kelola semua jenis perizinan usaha yang diajukan warga</span>
              <NewButton href={`form/create/${activeTab}`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                {agriculturalPermitTypes.map((permit) => {
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
                          {permit.key === 'pengelolaan-lahan' && 'LAHAN'}
                          {permit.key === 'permohonan-bantuan' && 'BANTUAN'}
                          {permit.key === 'surat-keterangan-petani' && 'KETERANGAN'}
                          {permit.key === 'surat-izin-irigasi' && 'IRIGASI'}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {counts.total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {agriculturalPermitTypes.map((permit) => {
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
                      
                      <AgriculturalPermitTable
                        type={permit.key as 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi'}
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
      <AgriculturalPermitDetailModal
        data={selectedData}
        type={activeTab as 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi'}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Edit Modal */}
      <AgriculturalPermitEditModal
        data={selectedData}
        type={activeTab as 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi'}
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
