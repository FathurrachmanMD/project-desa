import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/status-badge';
import { 
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';
import { 
  User, 
  MapPin, 
  Building, 
  FileText,
  Printer,
  Calendar,
  Target,
  IdCard,
  Coins,
  CheckCircle
} from 'lucide-react';

interface BusinessPermitDetailModalProps {
  data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB | null;
  type: 'sku' | 'iumk' | 'situ' | 'nib';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusinessPermitDetailModal({ 
  data, 
  type, 
  open, 
  onOpenChange 
}: BusinessPermitDetailModalProps) {
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
      case 'sku':
        return 'Detail Surat Keterangan Usaha (SKU)';
      case 'iumk':
        return 'Detail Izin Usaha Mikro Kecil (IUMK)';
      case 'situ':
        return 'Detail Surat Izin Tempat Usaha (SITU)';
      case 'nib':
        return 'Detail Rekomendasi NIB / OSS';
      default:
        return 'Detail Perizinan Usaha';
    }
  };

  const renderSKUDetails = (data: SuratKeteranganUsaha) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            NIK
          </Label>
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nik}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_usaha}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Alamat Usaha
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.alamat_usaha}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lama Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.lama_usaha}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Pengajuan
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Status Pengajuan
        </Label>
        <StatusBadge status={data.status} type="business" />
      </div>
    </div>
  );

  const renderIUMKDetails = (data: IzinUsahaMikroKecil) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            NIK
          </Label>
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nik}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_usaha}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.jenis_usaha}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Modal Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.modal_usaha}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Tempat Usaha
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.status_tempat_usaha}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Pengajuan
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="business" />
        </div>
      </div>
    </div>
  );

  const renderSITUDetails = (data: SuratIzinTempatUsaha) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Alamat Usaha
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.alamat_usaha}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Lahan
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.status_lahan}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Jenis Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.jenis_usaha}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Rekomendasi RT/RW
          </Label>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.rekomendasi_rtrw}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Pengajuan
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Status Pengajuan
        </Label>
        <StatusBadge status={data.status} type="business" />
      </div>
    </div>
  );

  const renderNIBDetails = (data: RekomendasiNIB) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pemohon
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_pemohon}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            NIK
          </Label>
          <div className="flex items-center gap-2">
            <IdCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nik}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Usaha
          </Label>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_usaha}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tujuan
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.tujuan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Pengajuan
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="business" />
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (type) {
      case 'sku':
        return renderSKUDetails(data as SuratKeteranganUsaha);
      case 'iumk':
        return renderIUMKDetails(data as IzinUsahaMikroKecil);
      case 'situ':
        return renderSITUDetails(data as SuratIzinTempatUsaha);
      case 'nib':
        return renderNIBDetails(data as RekomendasiNIB);
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {renderDetails()}

          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            ID Dokumen: {data.id}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Cetak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
