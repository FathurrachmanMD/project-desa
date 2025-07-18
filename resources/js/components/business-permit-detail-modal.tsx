import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';
import { 
  FileText, 
  Building, 
  MapPin, 
  Globe,
  User,
  Calendar,
  MapPin as LocationIcon,
  DollarSign,
  Printer
} from 'lucide-react';

// Inline print function
const printPermit = (
  data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB,
  type: 'sku' | 'iumk' | 'situ' | 'nib'
): void => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  let htmlContent = '';
  const currentDate = formatDate(new Date().toISOString());
  
  switch (type) {
    case 'sku': {
      const skuData = data as SuratKeteranganUsaha;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Surat Keterangan Usaha</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .content { margin: 20px 0; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { width: 200px; font-weight: bold; }
            .info-value { flex: 1; }
            .footer { margin-top: 50px; text-align: right; }
            .signature { margin-top: 80px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PEMERINTAH DESA SUKAMAJU</h1>
            <h2>SURAT KETERANGAN USAHA</h2>
            <p>Nomor: ${skuData.id}/SKU/${new Date().getFullYear()}</p>
          </div>
          
          <div class="content">
            <p>Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, dengan ini menerangkan bahwa:</p>
            
            <div class="info-row">
              <div class="info-label">Nama</div>
              <div class="info-value">: ${skuData.nama_pemohon}</div>
            </div>
            <div class="info-row">
              <div class="info-label">NIK</div>
              <div class="info-value">: ${skuData.nik}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Nama Usaha</div>
              <div class="info-value">: ${skuData.nama_usaha}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Alamat Usaha</div>
              <div class="info-value">: ${skuData.alamat_usaha}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Lama Usaha</div>
              <div class="info-value">: ${skuData.lama_usaha}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Status</div>
              <div class="info-value">: ${skuData.status}</div>
            </div>
            
            <p style="margin-top: 30px;">Benar-benar menjalankan usaha di wilayah Desa Sukamaju.</p>
          </div>
          
          <div class="footer">
            <p>Sukamaju, ${currentDate}</p>
            <p>Kepala Desa Sukamaju</p>
            <div class="signature">
              <p><strong>Budi Santoso, S.Sos</strong></p>
            </div>
          </div>
        </body>
        </html>
      `;
      break;
    }
    default:
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><title>Dokumen Perizinan</title></head>
        <body>
          <h1>Dokumen Perizinan</h1>
          <p>Data: ${JSON.stringify(data, null, 2)}</p>
        </body>
        </html>
      `;
  }

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
};

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
  onOpenChange,
}: BusinessPermitDetailModalProps) {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disetujui':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Ditolak':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Diproses':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'sku':
        return 'Detail Surat Keterangan Usaha';
      case 'iumk':
        return 'Detail Izin Usaha Mikro Kecil';
      case 'situ':
        return 'Detail Surat Izin Tempat Usaha';
      case 'nib':
        return 'Detail Rekomendasi NIB/OSS';
      default:
        return 'Detail Perizinan Usaha';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sku':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'iumk':
        return <Building className="h-5 w-5 text-green-600" />;
      case 'situ':
        return <MapPin className="h-5 w-5 text-purple-600" />;
      case 'nib':
        return <Globe className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  const handlePrint = () => {
    printPermit(data, type);
  };

  const renderSKUDetails = (skuData: SuratKeteranganUsaha) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Pemohon</p>
            <p className="text-sm text-muted-foreground">{skuData.nama_pemohon}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">NIK</p>
            <p className="text-sm text-muted-foreground">{skuData.nik}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Usaha</p>
            <p className="text-sm text-muted-foreground">{skuData.nama_usaha}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Lama Usaha</p>
            <p className="text-sm text-muted-foreground">{skuData.lama_usaha}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <LocationIcon className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Alamat Usaha</p>
          <p className="text-sm text-muted-foreground">{skuData.alamat_usaha}</p>
        </div>
      </div>
    </div>
  );

  const renderIUMKDetails = (iumkData: IzinUsahaMikroKecil) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Pemohon</p>
            <p className="text-sm text-muted-foreground">{iumkData.nama_pemohon}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">NIK</p>
            <p className="text-sm text-muted-foreground">{iumkData.nik}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Usaha</p>
            <p className="text-sm text-muted-foreground">{iumkData.nama_usaha}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Jenis Usaha</p>
            <p className="text-sm text-muted-foreground">{iumkData.jenis_usaha}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Modal Usaha</p>
            <p className="text-sm text-muted-foreground">{iumkData.modal_usaha}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LocationIcon className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Status Tempat Usaha</p>
            <p className="text-sm text-muted-foreground">{iumkData.status_tempat_usaha}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSITUDetails = (situData: SuratIzinTempatUsaha) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Pemohon</p>
            <p className="text-sm text-muted-foreground">{situData.nama_pemohon}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Jenis Usaha</p>
            <p className="text-sm text-muted-foreground">{situData.jenis_usaha}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <LocationIcon className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Status Lahan</p>
            <p className="text-sm text-muted-foreground">{situData.status_lahan}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Rekomendasi RT/RW</p>
            <p className="text-sm text-muted-foreground">{situData.rekomendasi_rtrw}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <LocationIcon className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Alamat Usaha</p>
          <p className="text-sm text-muted-foreground">{situData.alamat_usaha}</p>
        </div>
      </div>
    </div>
  );

  const renderNIBDetails = (nibData: RekomendasiNIB) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Pemohon</p>
            <p className="text-sm text-muted-foreground">{nibData.nama_pemohon}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">NIK</p>
            <p className="text-sm text-muted-foreground">{nibData.nik}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Nama Usaha</p>
            <p className="text-sm text-muted-foreground">{nibData.nama_usaha}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Tujuan</p>
            <p className="text-sm text-muted-foreground">{nibData.tujuan}</p>
          </div>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">No. Pengajuan</p>
              <p className="text-lg font-semibold">{data.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </div>
          </div>

          {/* Details */}
          {renderDetails()}

          {/* Footer Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Tanggal Pengajuan</p>
              <p className="text-sm text-muted-foreground">{formatDate(data.tanggal_pengajuan)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Cetak Dokumen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
