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
import { printUtils } from '@/utils/print-utils';
import { 
  SuratIzinHajatan, 
  SuratIzinAcaraPublik, 
  IzinPenggunaanSaranaUmum 
} from '@/data/event-permits';
import { 
  Calendar, 
  MapPin, 
  User, 
  Shield,
  Clock,
  AlertTriangle,
  Printer
} from 'lucide-react';

interface EventPermitDetailModalProps {
  data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum | null;
  type: 'hajatan' | 'acara-publik' | 'sarana-umum';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventPermitDetailModal({ 
  data, 
  type, 
  open, 
  onOpenChange 
}: EventPermitDetailModalProps) {
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
    printUtils.printPermit(data, type);
  };

  const getModalTitle = () => {
    switch (type) {
      case 'hajatan':
        return 'Detail Surat Izin Hajatan';
      case 'acara-publik':
        return 'Detail Surat Izin Acara Publik';
      case 'sarana-umum':
        return 'Detail Izin Penggunaan Sarana Umum';
      default:
        return 'Detail Perizinan';
    }
  };

  const renderHajatnDetails = (data: SuratIzinHajatan) => (
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
            Jenis Acara
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.jenis_acara}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Acara
          </Label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(data.tanggal_acara)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lokasi Acara
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{data.lokasi_acara}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Dampak Keramaian
          </Label>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <Badge variant={data.dampak_keramaian === 'Ya' ? 'destructive' : 'secondary'}>
              {data.dampak_keramaian}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="event" />
        </div>
      </div>
    </div>
  );

  const renderAcaraPublikDetails = (data: SuratIzinAcaraPublik) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Penyelenggara
          </Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_penyelenggara}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Nama Acara
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.nama_acara}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal & Waktu Acara
          </Label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{data.tanggal_waktu_acara}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Lokasi Acara
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{data.lokasi_acara}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Rekomendasi Keamanan
          </Label>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Badge variant={data.rekomendasi_keamanan === 'Sudah' ? 'default' : 'destructive'}>
              {data.rekomendasi_keamanan}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="event" />
        </div>
      </div>
    </div>
  );

  const renderSaranaUmumDetails = (data: IzinPenggunaanSaranaUmum) => (
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
            Jenis Fasilitas
          </Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{data.jenis_fasilitas}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Tanggal Penggunaan
          </Label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(data.tanggal_penggunaan)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Status Pengajuan
          </Label>
          <StatusBadge status={data.status} type="event" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Keperluan
        </Label>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">{data.keperluan}</p>
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
              {type === 'hajatan' && renderHajatnDetails(data as SuratIzinHajatan)}
              {type === 'acara-publik' && renderAcaraPublikDetails(data as SuratIzinAcaraPublik)}
              {type === 'sarana-umum' && renderSaranaUmumDetails(data as IzinPenggunaanSaranaUmum)}
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
