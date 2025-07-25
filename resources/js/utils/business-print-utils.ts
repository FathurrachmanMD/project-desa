import { 
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateSKUPrintContent = (data: SuratKeteranganUsaha): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Surat Keterangan Usaha</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .title { font-size: 18px; font-weight: bold; margin: 10px 0; }
        .subtitle { font-size: 14px; margin: 5px 0; }
        .content { margin: 20px 0; }
        .info-row { display: flex; margin: 10px 0; }
        .info-label { width: 200px; font-weight: bold; }
        .info-value { flex: 1; }
        .footer { margin-top: 50px; text-align: right; }
        .signature { margin-top: 80px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PEMERINTAH DESA SUKAMAJU</h1>
        <h2>SURAT KETERANGAN USAHA</h2>
        <p>Nomor: ${data.id}/SKU/${new Date().getFullYear()}</p>
      </div>
      
      <div class="content">
        <p>Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan Sukamaju, dengan ini menerangkan bahwa:</p>
        
        <div class="info-row">
          <div class="info-label">Nama</div>
          <div class="info-value">: ${data.nama_pemohon}</div>
        </div>
        <div class="info-row">
          <div class="info-label">NIK</div>
          <div class="info-value">: ${data.nik}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Nama Usaha</div>
          <div class="info-value">: ${data.nama_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Alamat Usaha</div>
          <div class="info-value">: ${data.alamat_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Lama Usaha</div>
          <div class="info-value">: ${data.lama_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Pengajuan</div>
          <div class="info-value">: ${data.status}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Tanggal Pengajuan</div>
          <div class="info-value">: ${formatDate(data.tanggal_pengajuan)}</div>
        </div>
        
        <p style="margin-top: 30px;">
          Benar-benar menjalankan usaha di wilayah Desa Sukamaju dan surat keterangan ini dibuat untuk keperluan administrasi.
        </p>
        
        <p>Demikian surat keterangan ini dibuat dengan sebenarnya.</p>
      </div>
      
      <div class="footer">
        <p>Sukamaju, ${formatDate(new Date().toISOString())}</p>
        <p>Kepala Desa Sukamaju</p>
        <div class="signature">
          <p><strong>Budi Santoso, S.Sos</strong></p>
          <p>NIP. 19801234567890123456</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateIUMKPrintContent = (data: IzinUsahaMikroKecil): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Izin Usaha Mikro Kecil</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .title { font-size: 18px; font-weight: bold; margin: 10px 0; }
        .subtitle { font-size: 14px; margin: 5px 0; }
        .content { margin: 20px 0; }
        .info-row { display: flex; margin: 10px 0; }
        .info-label { width: 200px; font-weight: bold; }
        .info-value { flex: 1; }
        .footer { margin-top: 50px; text-align: right; }
        .signature { margin-top: 80px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PEMERINTAH DESA SUKAMAJU</h1>
        <h2>IZIN USAHA MIKRO KECIL (IUMK)</h2>
        <p>Nomor: ${data.id}/IUMK/${new Date().getFullYear()}</p>
      </div>
      
      <div class="content">
        <p>Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan Sukamaju, dengan ini memberikan izin kepada:</p>
        
        <div class="info-row">
          <div class="info-label">Nama</div>
          <div class="info-value">: ${data.nama_pemohon}</div>
        </div>
        <div class="info-row">
          <div class="info-label">NIK</div>
          <div class="info-value">: ${data.nik}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Nama Usaha</div>
          <div class="info-value">: ${data.nama_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Jenis Usaha</div>
          <div class="info-value">: ${data.jenis_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Modal Usaha</div>
          <div class="info-value">: ${data.modal_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Tempat Usaha</div>
          <div class="info-value">: ${data.status_tempat_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Pengajuan</div>
          <div class="info-value">: ${data.status}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Tanggal Pengajuan</div>
          <div class="info-value">: ${formatDate(data.tanggal_pengajuan)}</div>
        </div>
        
        <p style="margin-top: 30px;">
          Untuk menjalankan usaha mikro kecil di wilayah Desa Sukamaju dengan ketentuan yang berlaku.
        </p>
        
        <p>Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>
      
      <div class="footer">
        <p>Sukamaju, ${formatDate(new Date().toISOString())}</p>
        <p>Kepala Desa Sukamaju</p>
        <div class="signature">
          <p><strong>Budi Santoso, S.Sos</strong></p>
          <p>NIP. 19801234567890123456</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateSITUPrintContent = (data: SuratIzinTempatUsaha): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Surat Izin Tempat Usaha</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .title { font-size: 18px; font-weight: bold; margin: 10px 0; }
        .subtitle { font-size: 14px; margin: 5px 0; }
        .content { margin: 20px 0; }
        .info-row { display: flex; margin: 10px 0; }
        .info-label { width: 200px; font-weight: bold; }
        .info-value { flex: 1; }
        .footer { margin-top: 50px; text-align: right; }
        .signature { margin-top: 80px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PEMERINTAH DESA SUKAMAJU</h1>
        <h2>SURAT IZIN TEMPAT USAHA (SITU)</h2>
        <p>Nomor: ${data.id}/SITU/${new Date().getFullYear()}</p>
      </div>
      
      <div class="content">
        <p>Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan Sukamaju, dengan ini memberikan izin kepada:</p>
        
        <div class="info-row">
          <div class="info-label">Nama</div>
          <div class="info-value">: ${data.nama_pemohon}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Alamat Usaha</div>
          <div class="info-value">: ${data.alamat_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Jenis Usaha</div>
          <div class="info-value">: ${data.jenis_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Lahan</div>
          <div class="info-value">: ${data.status_lahan}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Rekomendasi RT/RW</div>
          <div class="info-value">: ${data.rekomendasi_rtrw}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Pengajuan</div>
          <div class="info-value">: ${data.status}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Tanggal Pengajuan</div>
          <div class="info-value">: ${formatDate(data.tanggal_pengajuan)}</div>
        </div>
        
        <p style="margin-top: 30px;">
          Untuk menjalankan usaha pada lokasi tersebut di atas dengan ketentuan yang berlaku.
        </p>
        
        <p>Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>
      
      <div class="footer">
        <p>Sukamaju, ${formatDate(new Date().toISOString())}</p>
        <p>Kepala Desa Sukamaju</p>
        <div class="signature">
          <p><strong>Budi Santoso, S.Sos</strong></p>
          <p>NIP. 19801234567890123456</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateNIBPrintContent = (data: RekomendasiNIB): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Rekomendasi NIB/OSS</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .title { font-size: 18px; font-weight: bold; margin: 10px 0; }
        .subtitle { font-size: 14px; margin: 5px 0; }
        .content { margin: 20px 0; }
        .info-row { display: flex; margin: 10px 0; }
        .info-label { width: 200px; font-weight: bold; }
        .info-value { flex: 1; }
        .footer { margin-top: 50px; text-align: right; }
        .signature { margin-top: 80px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PEMERINTAH DESA SUKAMAJU</h1>
        <h2>SURAT REKOMENDASI NIB/OSS</h2>
        <p>Nomor: ${data.id}/NIB/${new Date().getFullYear()}</p>
      </div>
      
      <div class="content">
        <p>Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan Sukamaju, dengan ini memberikan rekomendasi kepada:</p>
        
        <div class="info-row">
          <div class="info-label">Nama</div>
          <div class="info-value">: ${data.nama_pemohon}</div>
        </div>
        <div class="info-row">
          <div class="info-label">NIK</div>
          <div class="info-value">: ${data.nik}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Nama Usaha</div>
          <div class="info-value">: ${data.nama_usaha}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Tujuan</div>
          <div class="info-value">: ${data.tujuan}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status Pengajuan</div>
          <div class="info-value">: ${data.status}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Tanggal Pengajuan</div>
          <div class="info-value">: ${formatDate(data.tanggal_pengajuan)}</div>
        </div>
        
        <p style="margin-top: 30px;">
          Untuk keperluan pengurusan NIB (Nomor Induk Berusaha) melalui sistem OSS (Online Single Submission).
        </p>
        
        <p>Demikian surat rekomendasi ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
      </div>
      
      <div class="footer">
        <p>Sukamaju, ${formatDate(new Date().toISOString())}</p>
        <p>Kepala Desa Sukamaju</p>
        <div class="signature">
          <p><strong>Budi Santoso, S.Sos</strong></p>
          <p>NIP. 19801234567890123456</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const printPermit = (
  data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB,
  type: 'sku' | 'iumk' | 'situ' | 'nib'
): void => {
  let htmlContent = '';
  
  switch (type) {
    case 'sku':
      htmlContent = generateSKUPrintContent(data as SuratKeteranganUsaha);
      break;
    case 'iumk':
      htmlContent = generateIUMKPrintContent(data as IzinUsahaMikroKecil);
      break;
    case 'situ':
      htmlContent = generateSITUPrintContent(data as SuratIzinTempatUsaha);
      break;
    case 'nib':
      htmlContent = generateNIBPrintContent(data as RekomendasiNIB);
      break;
    default:
      console.error('Unknown permit type:', type);
      return;
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
