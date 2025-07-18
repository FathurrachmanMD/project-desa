import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';
import { 
  User, 
  MapPin, 
  Building, 
  FileText, 
  CheckCircle,
  XCircle,
  Printer
} from 'lucide-react';
import { 
  IzinMendirikanBangunan,
  IzinBangunLahanDesa,
  SuratTidakSengketaTanah,
  IzinRenovasiPerluasan
} from '@/data/building-permits';

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
    // Implement print functionality similar to other permits
    console.log('Print building permit:', data);
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
        return 'Detail Izin Renovasi atau Perluasan Bangunan';
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
            Jenis Bangunan
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{data.jenis_bangunan}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Alamat Bangunan
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.alamat_bangunan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
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
            Tujuan Pembangunan
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{data.tujuan_pembangunan}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Nama Lahan / Titik Lokasi
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.nama_lahan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Rekomendasi Kepala Desa
          </Label>
          <div className="flex items-center gap-2">
            {data.rekomendasi_kades === 'Ya' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <Badge variant={data.rekomendasi_kades === 'Ya' ? 'default' : 'destructive'}>
              {data.rekomendasi_kades}
            </Badge>
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
            Status Sengketa
          </Label>
          <div className="flex items-center gap-2">
            {data.status_sengketa === 'Tidak' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <Badge variant={data.status_sengketa === 'Tidak' ? 'default' : 'destructive'}>
              {data.status_sengketa}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Lokasi Tanah
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.lokasi_tanah}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tujuan Penggunaan
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.tujuan_penggunaan}</span>
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
            Jenis Renovasi
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{data.jenis_renovasi}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Lokasi Bangunan
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.lokasi_bangunan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tanah
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Perizinan</CardTitle>
            </CardHeader>
            <CardContent>
              {type === 'imb' && renderIMBDetails(data as IzinMendirikanBangunan)}
              {type === 'lahan-desa' && renderLahanDesaDetails(data as IzinBangunLahanDesa)}
              {type === 'tidak-sengketa' && renderTidakSengketaDetails(data as SuratTidakSengketaTanah)}
              {type === 'renovasi' && renderRenovasiDetails(data as IzinRenovasiPerluasan)}
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
                  <span className="text-sm font-medium">Status Terkini</span>
                  <StatusBadge status={data.status} type="building" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Cetak Dokumen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
