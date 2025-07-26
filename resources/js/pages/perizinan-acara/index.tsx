import * as React from 'react';
const { useState } = React;
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventPermitTable } from '@/components/event-permit-table';
import { EventPermitDetailModal } from '@/components/event-permit-detail-modal';
import { EventPermitEditModal } from '@/components/event-permit-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useCrudToast, usePermitToast } from '@/hooks/useToast';
import { 
  eventPermitTypes as originalEventPermitTypes,
  hajatnData as originalHajatnData, 
  acaraPublikData as originalAcaraPublikData, 
  saranaUmumData as originalSaranaUmumData,
  SuratIzinHajatan,
  SuratIzinAcaraPublik,
  IzinPenggunaanSaranaUmum
} from '@/data/event-permits';
import { type BreadcrumbItem } from '@/types';
import { 
  Calendar, 
  Users, 
  Building2, 
  ListFilter
} from 'lucide-react';
import NewButton from '@/components/new-button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan Acara',
    href: '/perizinan-acara',
  },
];

const permitIcons = {
  'hajatan': Calendar,
  'acara-publik': Users,
  'sarana-umum': Building2,
};

export default function PerizinanAcara() {
  // Toast hooks
  const { updateSuccess, deleteSuccess, deleteError } = useCrudToast();

  const [activeTab, setActiveTab] = useState('hajatan');
  const [selectedData, setSelectedData] = useState<SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State management for each data type
  const [hajatnData, setHajatnData] = useState<SuratIzinHajatan[]>(originalHajatnData);
  const [acaraPublikData, setAcaraPublikData] = useState<SuratIzinAcaraPublik[]>(originalAcaraPublikData);
  const [saranaUmumData, setSaranaUmumData] = useState<IzinPenggunaanSaranaUmum[]>(originalSaranaUmumData);
  
  // Create a event permits array that always uses the latest state
  const eventPermitTypes = [
    { key: 'hajatan', label: 'Perizinan Hajatan', data: hajatnData },
    { key: 'acara-publik', label: 'Perizinan Acara Publik', data: acaraPublikData },
    { key: 'sarana-umum', label: 'Perizinan Penggunaan Sarana Umum', data: saranaUmumData },
  ];

  const handleView = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    // Update the data in local state based on type
    switch (activeTab) {
      case 'hajatan': {
        const newData = hajatnData.map(item => 
          item.id === updatedData.id ? updatedData as SuratIzinHajatan : item
        );
        setHajatnData(newData);
        break;
      }
      case 'acara-publik': {
        const newData = acaraPublikData.map(item => 
          item.id === updatedData.id ? updatedData as SuratIzinAcaraPublik : item
        );
        setAcaraPublikData(newData);
        break;
      }
      case 'sarana-umum': {
        const newData = saranaUmumData.map(item => 
          item.id === updatedData.id ? updatedData as IzinPenggunaanSaranaUmum : item
        );
        setSaranaUmumData(newData);
        break;
      }
    }
    
    setIsEditModalOpen(false);
    updateSuccess('Data perizinan acara');
  };

  const handleConfirmDelete = async () => {
    if (!dataToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete the data from the state based on type
      switch (activeTab) {
        case 'hajatan': {
          const newData = hajatnData.filter(item => item.id !== dataToDelete.id);
          setHajatnData(newData);
          break;
        }
        case 'acara-publik': {
          const newData = acaraPublikData.filter(item => item.id !== dataToDelete.id);
          setAcaraPublikData(newData);
          break;
        }
        case 'sarana-umum': {
          const newData = saranaUmumData.filter(item => item.id !== dataToDelete.id);
          setSaranaUmumData(newData);
          break;
        }
      }
      
      setIsDeleteModalOpen(false);
      setDataToDelete(null);
      deleteSuccess('Data perizinan acara');
    } catch {
      deleteError('Terjadi kesalahan saat menghapus data perizinan acara');
    } finally {
      setIsDeleting(false);
    }
  };

  const getDeleteModalContent = () => {
    if (!dataToDelete) return { title: '', description: '' };
    
    let title = '';
    let description = '';
    
    switch (activeTab) {
      case 'hajatan': {
        const hajatnData = dataToDelete as SuratIzinHajatan;
        title = 'Hapus Surat Izin Hajatan';
        description = `Apakah Anda yakin ingin menghapus surat izin hajatan untuk ${hajatnData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'acara-publik': {
        const acaraData = dataToDelete as SuratIzinAcaraPublik;
        title = 'Hapus Surat Izin Acara Publik';
        description = `Apakah Anda yakin ingin menghapus surat izin acara publik "${acaraData.nama_acara}" dari ${acaraData.nama_penyelenggara}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'sarana-umum': {
        const saranaData = dataToDelete as IzinPenggunaanSaranaUmum;
        title = 'Hapus Izin Penggunaan Sarana Umum';
        description = `Apakah Anda yakin ingin menghapus izin penggunaan sarana umum untuk ${saranaData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
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
      case 'hajatan':
        return hajatnData;
      case 'acara-publik':
        return acaraPublikData;
      case 'sarana-umum':
        return saranaUmumData;
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
      <Head title="Manajemen Perizinan Acara" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan Acara
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan acara dalam satu dashboard
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle>Data Perizinan Acara</CardTitle>
            <CardDescription className='flex items-center align-middle'>
                <span className='grow'>Kelola semua jenis perizinan usaha yang diajukan warga</span>
                <NewButton href={`form/create/${activeTab}`}/>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                {eventPermitTypes.map((permit) => {
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
                          {permit.key === 'hajatan' && 'HAJATAN'}
                          {permit.key === 'acara-publik' && 'ACARA PUBLIK'}
                          {permit.key === 'sarana-umum' && 'SARANA UMUM'}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {counts.total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {eventPermitTypes.map((permit) => {
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
                      
                      <EventPermitTable
                        type={permit.key as 'hajatan' | 'acara-publik' | 'sarana-umum'}
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
      <EventPermitDetailModal
        data={selectedData}
        type={activeTab as 'hajatan' | 'acara-publik' | 'sarana-umum'}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Edit Modal */}
      <EventPermitEditModal
        data={selectedData}
        type={activeTab as 'hajatan' | 'acara-publik' | 'sarana-umum'}
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
