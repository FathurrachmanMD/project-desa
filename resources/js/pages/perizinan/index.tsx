import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PermitTable } from '@/components/permit-table';
import { BusinessPermitDetailModal } from '@/components/business-permit-detail-modal';
import { BusinessPermitEditModal } from '@/components/business-permit-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { 
  permitTypes, 
  skuData, 
  iumkData, 
  situData, 
  nibData,
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';
import { type BreadcrumbItem } from '@/types';
import { 
  FileText, 
  Building, 
  MapPin, 
  Globe,
  ListFilter
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Perizinan Usaha',
    href: '/perizinan',
  },
];

const permitIcons = {
  sku: FileText,
  iumk: Building,
  situ: MapPin,
  nib: Globe,
};

export default function PerizinanUsaha() {
  const [activeTab, setActiveTab] = useState('sku');
  const [selectedData, setSelectedData] = useState<SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => {
    setSelectedData(data);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => {
    setDataToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => {
    // Here you would typically update the data in your state management or API
    console.log('Updated data:', updatedData);
    alert('Data berhasil diperbarui');
  };

  const handleConfirmDelete = async () => {
    if (!dataToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically delete the data from your state management or API
      console.log('Deleted data:', dataToDelete);
      
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
      case 'sku': {
        const skuData = dataToDelete as SuratKeteranganUsaha;
        title = 'Hapus Surat Keterangan Usaha';
        description = `Apakah Anda yakin ingin menghapus surat keterangan usaha "${skuData.nama_usaha}" milik ${skuData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'iumk': {
        const iumkData = dataToDelete as IzinUsahaMikroKecil;
        title = 'Hapus Izin Usaha Mikro Kecil';
        description = `Apakah Anda yakin ingin menghapus izin usaha mikro kecil "${iumkData.nama_usaha}" milik ${iumkData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'situ': {
        const situData = dataToDelete as SuratIzinTempatUsaha;
        title = 'Hapus Surat Izin Tempat Usaha';
        description = `Apakah Anda yakin ingin menghapus surat izin tempat usaha untuk ${situData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
        break;
      }
      case 'nib': {
        const nibData = dataToDelete as RekomendasiNIB;
        title = 'Hapus Rekomendasi NIB/OSS';
        description = `Apakah Anda yakin ingin menghapus rekomendasi NIB/OSS "${nibData.nama_usaha}" milik ${nibData.nama_pemohon}? Tindakan ini tidak dapat dibatalkan.`;
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
      case 'sku':
        return skuData;
      case 'iumk':
        return iumkData;
      case 'situ':
        return situData;
      case 'nib':
        return nibData;
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
      <Head title="Manajemen Perizinan Usaha" />
      
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Perizinan Usaha
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua jenis perizinan usaha dalam satu dashboard
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
          <CardHeader className="pb-3">
            <CardTitle>Data Perizinan</CardTitle>
            <CardDescription>
              Kelola semua jenis perizinan usaha yang diajukan warga
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-6">
                {permitTypes.map((permit) => {
                  const Icon = permitIcons[permit.key as keyof typeof permitIcons];
                  const counts = getStatusCounts(permit.data);
                  
                  return (
                    <TabsTrigger 
                      key={permit.key} 
                      value={permit.key}
                      className="flex flex-col items-center gap-1 p-3 h-auto"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {permit.key.toUpperCase()}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {counts.total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {permitTypes.map((permit) => {
                const tabData = getDataForTab(permit.key);
                return (
                  <TabsContent key={permit.key} value={permit.key} className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{permit.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            Total {tabData.length} pengajuan
                          </p>
                        </div>
                      </div>
                      
                      <PermitTable
                        type={permit.key as 'sku' | 'iumk' | 'situ' | 'nib'}
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
      <BusinessPermitDetailModal
        data={selectedData}
        type={activeTab as 'sku' | 'iumk' | 'situ' | 'nib'}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Edit Modal */}
      <BusinessPermitEditModal
        data={selectedData}
        type={activeTab as 'sku' | 'iumk' | 'situ' | 'nib'}
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
