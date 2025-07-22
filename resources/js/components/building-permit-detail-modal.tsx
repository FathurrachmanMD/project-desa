import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/status-badge';
import { 
  IzinMendirikanBangunan, 
  IzinBangunLahanDesa, 
  SuratTidakSengketaTanah, 
  IzinRenovasiPerluasan 
} from '@/data/building-permits';
import { 
  Building, 
  MapPin, 
  User, 
  FileText,
  Target,
  Home,
  CheckCircle,
  Printer
} from 'lucide-react';

interface BuildingPermitDetailModalProps {
  data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan | null;
  type: 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuildingPermitDetailModal({ 
  data, 
  type, 
  open, 
  onOpenChange 
}: BuildingPermitDetailModalProps) {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePrint = () => {
    console.log('Print permit', data, type);
  };

  const getModalTitle = () => {
    switch (type) {
      case 'imb':
        return 'Detail Izin Mendirikan Bangunan (IMB/PBG)';
      case 'lahan-desa':
        return 'Detail Izin Bangun di Lahan Milik Desa';
      case 'tidak-sengketa':
        return 'Detail Surat Tidak Sengketa Tanah';
      case 'renovasi':
        return 'Detail Izin Renovasi / Perluasan Bangunan';
      default:
        return 'Detail Perizinan Bangunan';
    }
  };

  const renderIMBDetails = (data: IzinMendirikanBangunan) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Alamat Bangunan
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.alamat_bangunan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Bangunan
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{data.jenis_bangunan}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.status_tanah}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{data.status_tanah}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="building" />
        </div>
      </div>
    </div>
  );

  const renderLahanDesaDetails = (data: IzinBangunLahanDesa) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Lahan
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_lahan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tujuan Pembangunan
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{data.tujuan_pembangunan}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Rekomendasi Kades
          </Label>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            <Badge variant={data.rekomendasi_kades === 'Ya' ? 'default' : 'secondary'}>
              {data.rekomendasi_kades}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Rekomendasi Kades
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{data.rekomendasi_kades}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="building" />
        </div>
      </div>
    </div>
  );

  const renderTidakSengketaDetails = (data: SuratTidakSengketaTanah) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemilik Tanah
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_pemilik_tanah}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lokasi Tanah
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.lokasi_tanah}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Sengketa
          </Label>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            <Badge variant={data.status_sengketa === 'Tidak' ? 'default' : 'destructive'}>
              {data.status_sengketa}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tujuan Penggunaan
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{data.tujuan_penggunaan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Sengketa
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{data.status_sengketa}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="building" />
        </div>
      </div>
    </div>
  );

  const renderRenovasiDetails = (data: IzinRenovasiPerluasan) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemilik
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_pemilik}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lokasi Bangunan
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.lokasi_bangunan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Renovasi
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span>{data.jenis_renovasi}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.status_tanah}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{data.status_tanah}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="building" />
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (type) {
      case 'imb':
        return renderIMBDetails(data as IzinMendirikanBangunan);
      case 'lahan-desa':
        return renderLahanDesaDetails(data as IzinBangunLahanDesa);
      case 'tidak-sengketa':
        return renderTidakSengketaDetails(data as SuratTidakSengketaTanah);
      case 'renovasi':
        return renderRenovasiDetails(data as IzinRenovasiPerluasan);
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang pengajuan perizinan ini
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pengajuan</CardTitle>
            </CardHeader>
            <CardContent>
              {renderDetails()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Riwayat Pengajuan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tanggal Pengajuan</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(data.tanggal_pengajuan)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ID Pengajuan</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {data.id}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Cetak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
