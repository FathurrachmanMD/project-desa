import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
  Clock,
  Printer,
  Shield,
  Building2
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

  // Fungsi render digantikan dengan inline rendering di dalam return statement

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{getModalTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Type-specific details */}
          {type === 'hajatan' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Pemohon</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinHajatan).nama_pemohon}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Jenis Acara</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinHajatan).jenis_acara}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Lokasi Acara</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinHajatan).lokasi_acara}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Acara</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate((data as SuratIzinHajatan).tanggal_acara)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Dampak Keramaian</Label>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      (data as SuratIzinHajatan).dampak_keramaian === 'Ya' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {(data as SuratIzinHajatan).dampak_keramaian}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status Pengajuan</Label>
                  <StatusBadge status={data.status} type="event" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
                  </div>
                </div>
                
                <div></div>
              </div>
            </>
          )}
          
          {type === 'acara-publik' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Penyelenggara</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinAcaraPublik).nama_penyelenggara}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Acara</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinAcaraPublik).nama_acara}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Lokasi Acara</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinAcaraPublik).lokasi_acara}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal & Waktu Acara</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as SuratIzinAcaraPublik).tanggal_waktu_acara}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Rekomendasi Keamanan</Label>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      (data as SuratIzinAcaraPublik).rekomendasi_keamanan === 'Sudah' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(data as SuratIzinAcaraPublik).rekomendasi_keamanan}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status Pengajuan</Label>
                  <StatusBadge status={data.status} type="event" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
                  </div>
                </div>
                
                <div></div>
              </div>
            </>
          )}
          
          {type === 'sarana-umum' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Nama Pemohon</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as IzinPenggunaanSaranaUmum).nama_pemohon}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Jenis Fasilitas</Label>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as IzinPenggunaanSaranaUmum).jenis_fasilitas}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Penggunaan</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate((data as IzinPenggunaanSaranaUmum).tanggal_penggunaan)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Keperluan</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{(data as IzinPenggunaanSaranaUmum).keperluan}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(data.tanggal_pengajuan)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status Pengajuan</Label>
                  <StatusBadge status={data.status} type="event" />
                </div>
              </div>
            </>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">ID Dokumen: {data.id}</p>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={handlePrint} variant="default" className="bg-black hover:bg-gray-800">
            <Printer className="h-4 w-4 mr-2" />
            Cetak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
