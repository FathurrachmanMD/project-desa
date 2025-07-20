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
  SuratPengantarSKCK,
  SuratKeteranganDomisili,
  SuratIzinTinggalPendatang,
  SuratIzinKeluarNegeri,
  SuratKeteranganTidakBekerja
} from '@/data/personal-permits';
import { 
  User, 
  IdCard, 
  Target, 
  MapPin, 
  Home,
  Clock,
  Plane,
  Calendar,
  FileText,
  Printer 
} from 'lucide-react';

interface PersonalPermitDetailModalProps {
  data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja | null;
  type: 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonalPermitDetailModal({ 
  data, 
  type, 
  open, 
  onOpenChange 
}: PersonalPermitDetailModalProps) {
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
      case 'pengantar-skck':
        return 'Detail Surat Pengantar SKCK';
      case 'keterangan-domisili':
        return 'Detail Surat Keterangan Domisili';
      case 'izin-tinggal-pendatang':
        return 'Detail Surat Izin Tinggal Pendatang';
      case 'izin-keluar-negeri':
        return 'Detail Surat Izin Keluar Negeri';
      case 'keterangan-tidak-bekerja':
        return 'Detail Surat Keterangan Tidak Bekerja';
      default:
        return 'Detail Perizinan Pribadi';
    }
  };

  const renderPengantarSKCKDetails = (data: SuratPengantarSKCK) => (
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
            Tujuan SKCK
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.tujuan_skck}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tempat Tujuan SKCK
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.tempat_tujuan_skck}</span>
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
          <StatusBadge status={data.status} type="personal" />
        </div>
      </div>
    </div>
  );

  const renderKeteranganDomisiliDetails = (data: SuratKeteranganDomisili) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Warga
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_warga}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            RT/RW
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.rt_rw}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Alamat Domisili
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.alamat_domisili}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lama Tinggal
          </Label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.lama_tinggal}</span>
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
          <StatusBadge status={data.status} type="personal" />
        </div>
      </div>
    </div>
  );

  const renderIzinTinggalPendatangDetails = (data: SuratIzinTinggalPendatang) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Pendatang
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.nama_pendatang}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Alamat Asal
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.alamat_asal}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tujuan Pindah
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.tujuan_pindah}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            RT/RW Tujuan
          </Label>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.rt_rw_tujuan}</span>
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
          <StatusBadge status={data.status} type="personal" />
        </div>
      </div>
    </div>
  );

  const renderIzinKeluarNegeriDetails = (data: SuratIzinKeluarNegeri) => (
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
            Tujuan Keberangkatan
          </Label>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.tujuan_keberangkatan}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Negara Tujuan
          </Label>
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.negara_tujuan}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Periode
          </Label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.periode}</span>
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
          <StatusBadge status={data.status} type="personal" />
        </div>
      </div>
    </div>
  );

  const renderKeteranganTidakBekerjaDetails = (data: SuratKeteranganTidakBekerja) => (
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
            Alasan Tidak Bekerja
          </Label>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.alasan_tidak_bekerja}</span>
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
          <StatusBadge status={data.status} type="personal" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Tujuan Surat
        </Label>
        <div className="p-3 bg-muted rounded-lg">
          <span className="text-sm">{data.tujuan_surat}</span>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (type) {
      case 'pengantar-skck':
        return renderPengantarSKCKDetails(data as SuratPengantarSKCK);
      case 'keterangan-domisili':
        return renderKeteranganDomisiliDetails(data as SuratKeteranganDomisili);
      case 'izin-tinggal-pendatang':
        return renderIzinTinggalPendatangDetails(data as SuratIzinTinggalPendatang);
      case 'izin-keluar-negeri':
        return renderIzinKeluarNegeriDetails(data as SuratIzinKeluarNegeri);
      case 'keterangan-tidak-bekerja':
        return renderKeteranganTidakBekerjaDetails(data as SuratKeteranganTidakBekerja);
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