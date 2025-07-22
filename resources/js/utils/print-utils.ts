import { 
  SuratIzinHajatan, 
  SuratIzinAcaraPublik, 
  IzinPenggunaanSaranaUmum 
} from '@/data/event-permits';

export const printUtils = {
  formatDate: (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  generateHajatnPrintContent: (data: SuratIzinHajatan) => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">SURAT IZIN HAJATAN</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${data.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Pemohon</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.nama_pemohon}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Jenis Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.jenis_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${printUtils.formatDate(data.tanggal_acara)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Lokasi Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${data.lokasi_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Dampak Keramaian</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${data.dampak_keramaian}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk mengadakan acara tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menjaga keamanan dan ketertiban selama acara berlangsung</li>
            <li>Tidak mengganggu ketenangan masyarakat sekitar</li>
            <li>Mematuhi protokol kesehatan yang berlaku</li>
            <li>Bertanggung jawab penuh terhadap acara yang diselenggarakan</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Pemohon,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${data.nama_pemohon}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${data.status === 'Disetujui' ? '#10b981' : data.status === 'Ditolak' ? '#ef4444' : '#f59e0b'}">${data.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${printUtils.formatDate(data.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `;
  },

  generateAcaraPublikPrintContent: (data: SuratIzinAcaraPublik) => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">SURAT IZIN ACARA PUBLIK</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${data.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Penyelenggara</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.nama_penyelenggara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Nama Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.nama_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal & Waktu Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${printUtils.formatDate(data.tanggal_waktu_acara)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Lokasi Acara</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${data.lokasi_acara}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Rekomendasi Keamanan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${data.rekomendasi_keamanan}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk mengadakan acara tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menjaga keamanan dan ketertiban selama acara berlangsung</li>
            <li>Tidak mengganggu ketenangan masyarakat sekitar</li>
            <li>Mematuhi protokol kesehatan yang berlaku</li>
            <li>Memiliki izin dari pihak kepolisian jika diperlukan</li>
            <li>Bertanggung jawab penuh terhadap acara yang diselenggarakan</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Penyelenggara,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${data.nama_penyelenggara}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${data.status === 'Disetujui' ? '#10b981' : data.status === 'Ditolak' ? '#ef4444' : '#f59e0b'}">${data.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${printUtils.formatDate(data.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `;
  },

  generateSaranaUmumPrintContent: (data: IzinPenggunaanSaranaUmum) => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">PEMERINTAH DESA</h1>
          <h2 style="margin: 5px 0; font-size: 20px; color: #1a1a1a;">IZIN PENGGUNAAN SARANA UMUM</h2>
          <div style="width: 100px; height: 2px; background: #333; margin: 10px auto;"></div>
          <p style="margin: 10px 0; font-size: 14px;">Nomor: ${data.id}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <p style="margin: 0 0 20px 0; line-height: 1.6;">
            Yang bertanda tangan di bawah ini, Kepala Desa menerangkan bahwa:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; width: 200px; vertical-align: top;">Nama Pemohon</td>
              <td style="padding: 8px 0; width: 20px;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.nama_pemohon}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Jenis Fasilitas</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.jenis_fasilitas}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Tanggal Penggunaan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${printUtils.formatDate(data.tanggal_penggunaan)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;">Keperluan</td>
              <td style="padding: 8px 0;">:</td>
              <td style="padding: 8px 0;">${data.keperluan}</td>
            </tr>
          </table>

          <p style="margin: 20px 0; line-height: 1.6;">
            Berdasarkan permohonan yang bersangkutan, maka dengan ini kami memberikan izin untuk menggunakan sarana umum tersebut dengan ketentuan:
          </p>

          <ol style="margin: 20px 0; padding-left: 20px; line-height: 1.6;">
            <li>Menggunakan sarana umum sesuai dengan keperluan yang telah disebutkan</li>
            <li>Menjaga kebersihan dan keutuhan sarana umum</li>
            <li>Tidak merusak fasilitas yang ada</li>
            <li>Mengembalikan sarana umum dalam kondisi semula</li>
            <li>Bertanggung jawab penuh terhadap penggunaan sarana umum</li>
          </ol>

          <p style="margin: 20px 0; line-height: 1.6;">
            Demikian surat izin ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Pemohon,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">${data.nama_pemohon}</p>
          </div>
          <div style="text-align: center; width: 200px;">
            <p style="margin: 0;">Kepala Desa,</p>
            <div style="height: 80px;"></div>
            <p style="margin: 0; font-weight: bold; text-decoration: underline;">________________</p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Status: <span style="font-weight: bold; color: ${data.status === 'Disetujui' ? '#10b981' : data.status === 'Ditolak' ? '#ef4444' : '#f59e0b'}">${data.status}</span>
          </p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Tanggal Pengajuan: ${printUtils.formatDate(data.tanggal_pengajuan)}
          </p>
        </div>
      </div>
    `;
  },

  printPermit: (
    data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum, 
    type: 'hajatan' | 'acara-publik' | 'sarana-umum'
  ) => {
    let printContent: string;
    
    switch (type) {
      case 'hajatan':
        printContent = printUtils.generateHajatnPrintContent(data as SuratIzinHajatan);
        break;
      case 'acara-publik':
        printContent = printUtils.generateAcaraPublikPrintContent(data as SuratIzinAcaraPublik);
        break;
      case 'sarana-umum':
        printContent = printUtils.generateSaranaUmumPrintContent(data as IzinPenggunaanSaranaUmum);
        break;
      default:
        printContent = printUtils.generateHajatnPrintContent(data as SuratIzinHajatan);
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Cetak Surat Izin</title>
            <style>
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${printContent}
            <div class="no-print" style="text-align: center; margin: 20px 0;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Cetak Dokumen
              </button>
              <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                Tutup
              </button>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
    }
  }
};
