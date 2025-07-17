import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventPermitTable } from '@/components/event-permit-table';
import { EventPermitDetailModal } from '@/components/event-permit-detail-modal';
import { 
  eventPermitTypes, 
  hajatnData, 
  acaraPublikData, 
  saranaUmumData,
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
  const [activeTab, setActiveTab] = useState('hajatan');
  const [selectedData, setSelectedData] = useState<SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleEdit = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    console.log('Edit:', data);
    // TODO: Implement edit functionality
  };

  const handleDelete = (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => {
    console.log('Delete:', data);
    // TODO: Implement delete functionality
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
      
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Admin - Perizinan Acara
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardTitle>Data Perizinan Acara</CardTitle>
            <CardDescription>
              Kelola semua jenis perizinan acara yang diajukan warga
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6">
                {eventPermitTypes.map((permit) => {
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
                      
                      <EventPermitTable
                        type={permit.key as 'hajatan' | 'acara-publik' | 'sarana-umum'}
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
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </AppLayout>
  );
}
