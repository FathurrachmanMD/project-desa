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
  IzinPengelolaanLahan,
  PermohonanBantuan,
  SuratKeteranganPetani,
  SuratIzinIrigasi
} from '@/data/agricultural-permits';
import { 
  User, 
  MapPin, 
  Building, 
  FileText,
  Printer,
  Droplets,
  Sprout,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AgriculturalPermitDetailModalProps {
  data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi | null;
  type: 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgriculturalPermitDetailModal({ 
  data, 
  type, 
  open, 
  onOpenChange 
}: AgriculturalPermitDetailModalProps) {
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
    console.log('Print agricultural permit:', data);
  };

  const getModalTitle = () => {
    switch (type) {
      case 'pengelolaan-lahan':
        return 'Detail Izin Pengelolaan Lahan Desa / Tanah Negara';
      case 'permohonan-bantuan':
        return 'Detail Permohonan Bantuan Pupuk / Bibit / Alat';
      case 'surat-keterangan-petani':
        return 'Detail Surat Keterangan Petani atau Buruh Tani';
      case 'surat-izin-irigasi':
        return 'Detail Surat Izin Irigasi / Air Pertanian';
      default:
        return 'Detail Perizinan Pertanian';
    }
  };

  const renderPengelolaanLahanDetails = (data: IzinPengelolaanLahan) => (
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
            Tujuan Pengelolaan
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.tujuan_pengelolaan}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Lokasi Lahan
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.lokasi_lahan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Luas Lahan
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.luas_lahan}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="agricultural" />
        </div>
      </div>
    </div>
  );

  const renderPermohonanBantuanDetails = (data: PermohonanBantuan) => (
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
            Jenis Bantuan
          </Label>
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.jenis_bantuan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jumlah / Volume
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.jumlah}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="agricultural" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Alasan Kebutuhan
        </Label>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">{data.alasan_kebutuhan}</p>
        </div>
      </div>
    </div>
  );

  const renderSuratKeteranganPetaniDetails = (data: SuratKeteranganPetani) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Profesi
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.jenis_profesi}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Lokasi Bertani
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.lokasi_bertani}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Masa Aktif Bertani
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{data.masa_aktif}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="agricultural" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Tujuan Surat
        </Label>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">{data.tujuan_surat}</p>
        </div>
      </div>
    </div>
  );

  const renderSuratIzinIrigasiDetails = (data: SuratIzinIrigasi) => (
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
            Sumber Air
          </Label>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.sumber_air}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Lokasi Penggunaan Air
        </Label>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{data.lokasi_penggunaan_air}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Tanaman
          </Label>
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-muted-foreground" />
            <span>{data.jenis_tanaman}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="agricultural" />
        </div>
      </div>
    </div>
  );

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
              {type === 'pengelolaan-lahan' && renderPengelolaanLahanDetails(data as IzinPengelolaanLahan)}
              {type === 'permohonan-bantuan' && renderPermohonanBantuanDetails(data as PermohonanBantuan)}
              {type === 'surat-keterangan-petani' && renderSuratKeteranganPetaniDetails(data as SuratKeteranganPetani)}
              {type === 'surat-izin-irigasi' && renderSuratIzinIrigasiDetails(data as SuratIzinIrigasi)}
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
