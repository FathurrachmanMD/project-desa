import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalPermitTable } from '@/components/personal-permit-table';
import { PersonalPermitDetailModal } from '@/components/personal-permit-detail-modal';
import { PersonalPermitEditModal } from '@/components/personal-permit-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useCrudToast, usePermitToast } from '@/hooks/useToast';
import { 
  pengantarSKCKData as originalPengantarSKCKData, 
  keteranganDomisiliData as originalKeteranganDomisiliData, 
  izinTinggalPendatangData as originalIzinTinggalPendatangData,
  izinKeluarNegeriData as originalIzinKeluarNegeriData,
  keteranganTidakBekerjaData as originalKeteranganTidakBekerjaData,
  SuratPengantarSKCK,
  SuratKeteranganDomisili,
  SuratIzinTinggalPendatang,
  SuratIzinKeluarNegeri,
  SuratKeteranganTidakBekerja
} from '@/data/personal-permits';
import { type BreadcrumbItem } from '@/types';
import { 
  FileText, 
  Home, 
  UserPlus, 
  Plane, 
  UserX,
  ListFilter
} from 'lucide-react';
import NewButton from '@/components/new-button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan Pribadi',
    href: '/perizinan-pribadi',
  },
];

const permitIcons = {
  'pengantar-skck': FileText,
  'keterangan-domisili': Home,
  'izin-tinggal-pendatang': UserPlus,
  'izin-keluar-negeri': Plane,
  'keterangan-tidak-bekerja': UserX,
};

export default function PerizinanPribadi() {
  const [activeTab, setActiveTab] = useState('pengantar-skck');
  const [selectedData, setSelectedData] = useState<SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Toast hooks
  const { updateSuccess, deleteSuccess, deleteError } = useCrudToast();
  const { approveSuccess } = usePermitToast();
  
  // State management for each data type
  const [pengantarSKCKData, setPengantarSKCKData] = useState<SuratPengantarSKCK[]>(originalPengantarSKCKData);
  const [keteranganDomisiliData, setKeteranganDomisiliData] = useState<SuratKeteranganDomisili[]>(originalKeteranganDomisiliData);
  const [izinTinggalPendatangData, setIzinTinggalPendatangData] = useState<SuratIzinTinggalPendatang[]>(originalIzinTinggalPendatangData);
  const [izinKeluarNegeriData, setIzinKeluarNegeriData] = useState<SuratIzinKeluarNegeri[]>(originalIzinKeluarNegeriData);
  const [keteranganTidakBekerjaData, setKeteranganTidakBekerjaData] = useState<SuratKeteranganTidakBekerja[]>(originalKeteranganTidakBekerjaData);
  
  // Create a personal permits array that always uses the latest state
  const personalPermitTypes = [
    { key: 'pengantar-skck', label: 'Surat Pengantar SKCK', data: pengantarSKCKData },
    { key: 'keterangan-domisili', label: 'Surat Keterangan Domisili', data: keteranganDomisiliData },
    { key: 'izin-tinggal-pendatang', label: 'Surat Izin Tinggal Pendatang', data: izinTinggalPendatangData },
    { key: 'izin-keluar-negeri', label: 'Surat Izin Keluar Negeri (Informal)', data: izinKeluarNegeriData },
    { key: 'keterangan-tidak-bekerja', label: 'Surat Keterangan Tidak Bekerja', data: keteranganTidakBekerjaData },
  ];

  const handleView = (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => {
    // Update the data in local state based on type
    switch (activeTab) {
      case 'pengantar-skck': {
        const newData = pengantarSKCKData.map(item => 
          item.id === updatedData.id ? updatedData as SuratPengantarSKCK : item
        );
        setPengantarSKCKData(newData);
        break;
      }
      case 'keterangan-domisili': {
        const newData = keteranganDomisiliData.map(item => 
          item.id === updatedData.id ? updatedData as SuratKeteranganDomisili : item
        );
        setKeteranganDomisiliData(newData);
        break;
      }
      case 'izin-tinggal-pendatang': {
        const newData = izinTinggalPendatangData.map(item => 
          item.id === updatedData.id ? updatedData as SuratIzinTinggalPendatang : item
        );
        setIzinTinggalPendatangData(newData);
        break;
      }
      case 'izin-keluar-negeri': {
        const newData = izinKeluarNegeriData.map(item => 
          item.id === updatedData.id ? updatedData as SuratIzinKeluarNegeri : item
        );
        setIzinKeluarNegeriData(newData);
        break;
      }
      case 'keterangan-tidak-bekerja': {
        const newData = keteranganTidakBekerjaData.map(item => 
          item.id === updatedData.id ? updatedData as SuratKeteranganTidakBekerja : item
        );
        setKeteranganTidakBekerjaData(newData);
        break;
      }
    }
    
    setIsEditModalOpen(false);
    updateSuccess('Data perizinan pribadi');
  };

  const handleConfirmDelete = async () => {
    if (!dataToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete the data from the state based on type
      switch (activeTab) {
        case 'pengantar-skck': {
          const newData = pengantarSKCKData.filter(item => item.id !== dataToDelete.id);
          setPengantarSKCKData(newData);
          break;
        }
        case 'keterangan-domisili': {
          const newData = keteranganDomisiliData.filter(item => item.id !== dataToDelete.id);
          setKeteranganDomisiliData(newData);
          break;
        }
        case 'izin-tinggal-pendatang': {
          const newData = izinTinggalPendatangData.filter(item => item.id !== dataToDelete.id);
          setIzinTinggalPendatangData(newData);
          break;
        }
        case 'izin-keluar-negeri': {
          const newData = izinKeluarNegeriData.filter(item => item.id !== dataToDelete.id);
          setIzinKeluarNegeriData(newData);
          break;
        }
        case 'keterangan-tidak-bekerja': {
          const newData = keteranganTidakBekerjaData.filter(item => item.id !== dataToDelete.id);
          setKeteranganTidakBekerjaData(newData);
          break;
        }
      }
      
      setIsDeleteModalOpen(false);
      setDataToDelete(null);
      deleteSuccess('Data perizinan pribadi');
    } catch {
      deleteError('Terjadi kesalahan saat menghapus data perizinan pribadi');
    } finally {
      setIsDeleting(false);
    }
  };

  const getDeleteModalContent = () => {
    if (!dataToDelete) return { title: '', description: '' };
    
    let title = '';
    let description = '';
    
    switch (activeTab) {
      case 'pengantar-skck': {
        const pengantarData = dataToDelete as SuratPengantarSKCK;
        title = 'Hapus Surat Pengantar SKCK';
        description = `Apakah Anda yakin ingin menghapus surat pengantar SKCK untuk ${pengantarData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'keterangan-domisili': {
        const domisiliData = dataToDelete as SuratKeteranganDomisili;
        title = 'Hapus Surat Keterangan Domisili';
        description = `Apakah Anda yakin ingin menghapus surat keterangan domisili untuk ${domisiliData.nama_warga}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'izin-tinggal-pendatang': {
        const pendatangData = dataToDelete as SuratIzinTinggalPendatang;
        title = 'Hapus Surat Izin Tinggal Pendatang';
        description = `Apakah Anda yakin ingin menghapus surat izin tinggal pendatang untuk ${pendatangData.nama_pendatang}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'izin-keluar-negeri': {
        const keluarNegeriData = dataToDelete as SuratIzinKeluarNegeri;
        title = 'Hapus Surat Izin Keluar Negeri';
        description = `Apakah Anda yakin ingin menghapus surat izin keluar negeri untuk ${keluarNegeriData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'keterangan-tidak-bekerja': {
        const tidakBekerjaData = dataToDelete as SuratKeteranganTidakBekerja;
        title = 'Hapus Surat Keterangan Tidak Bekerja';
        description = `Apakah Anda yakin ingin menghapus surat keterangan tidak bekerja untuk ${tidakBekerjaData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
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
      case 'pengantar-skck':
        return pengantarSKCKData;
      case 'keterangan-domisili':
        return keteranganDomisiliData;
      case 'izin-tinggal-pendatang':
        return izinTinggalPendatangData;
      case 'izin-keluar-negeri':
        return izinKeluarNegeriData;
      case 'keterangan-tidak-bekerja':
        return keteranganTidakBekerjaData;
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
      <Head title="Manajemen Perizinan Pribadi" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan Pribadi
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan pribadi dalam satu dashboard
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
            <CardTitle>Data Perizinan Pribadi</CardTitle>
            <CardDescription className='flex items-center align-middle'>
              <span className='grow'>Kelola semua jenis perizinan usaha yang diajukan warga</span>
              <NewButton href={`form/create/${activeTab}`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full mb-8">
                {personalPermitTypes.map((permit) => {
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
                          {permit.key === 'pengantar-skck' && 'SKCK'}
                          {permit.key === 'keterangan-domisili' && 'DOMISILI'}
                          {permit.key === 'izin-tinggal-pendatang' && 'PENDATANG'}
                          {permit.key === 'izin-keluar-negeri' && 'LUAR NEGERI'}
                          {permit.key === 'keterangan-tidak-bekerja' && 'TIDAK BEKERJA'}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {counts.total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {personalPermitTypes.map((permit) => {
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
                      
                      <PersonalPermitTable
                        type={permit.key as 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja'}
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
      <PersonalPermitDetailModal
        data={selectedData}
        type={activeTab as 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja'}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Edit Modal */}
      <PersonalPermitEditModal
        data={selectedData}
        type={activeTab as 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja'}
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
