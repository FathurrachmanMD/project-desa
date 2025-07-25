// Types for the event permit data
export type EventStatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

export interface SuratIzinHajatan {
  id: string;
  nama_pemohon: string;
  jenis_acara: string;
  tanggal_acara: string;
  lokasi_acara: string;
  dampak_keramaian: 'Ya' | 'Tidak';
  status: EventStatusType;
  tanggal_pengajuan: string;
}

export interface SuratIzinAcaraPublik {
  id: string;
  nama_penyelenggara: string;
  nama_acara: string;
  tanggal_waktu_acara: string;
  lokasi_acara: string;
  rekomendasi_keamanan: 'Sudah' | 'Belum';
  status: EventStatusType;
  tanggal_pengajuan: string;
}

export interface IzinPenggunaanSaranaUmum {
  id: string;
  nama_pemohon: string;
  jenis_fasilitas: string;
  tanggal_penggunaan: string;
  keperluan: string;
  status: EventStatusType;
  tanggal_pengajuan: string;
}

// Dummy data for Surat Izin Hajatan
export const hajatnData: SuratIzinHajatan[] = [
  {
    id: 'HAJ001',
    nama_pemohon: 'Ahmad Fauzi',
    jenis_acara: 'Pernikahan',
    tanggal_acara: '2025-08-01',
    lokasi_acara: 'Jl. Anggrek No. 7, Cileunyi',
    dampak_keramaian: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-24',
  },
  {
    id: 'HAJ002',
    nama_pemohon: 'Siti Nurhaliza',
    jenis_acara: 'Khitanan',
    tanggal_acara: '2025-08-05',
    lokasi_acara: 'Jl. Melati No. 15, Bandung',
    dampak_keramaian: 'Tidak',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-24',
  },
  {
    id: 'HAJ003',
    nama_pemohon: 'Budi Santoso',
    jenis_acara: 'Ulang Tahun',
    tanggal_acara: '2025-07-30',
    lokasi_acara: 'Jl. Mawar No. 22, Cimahi',
    dampak_keramaian: 'Ya',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-23',
  },
  {
    id: 'HAJ004',
    nama_pemohon: 'Dewi Lestari',
    jenis_acara: 'Walimah',
    tanggal_acara: '2025-08-15',
    lokasi_acara: 'Jl. Dahlia No. 8, Sukabumi',
    dampak_keramaian: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'HAJ005',
    nama_pemohon: 'Rina Marlina',
    jenis_acara: 'Aqiqah',
    tanggal_acara: '2025-08-20',
    lokasi_acara: 'Jl. Kenanga No. 12, Bogor',
    dampak_keramaian: 'Tidak',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-18',
  },
  {
    id: 'HAJ006',
    nama_pemohon: 'Sandi Pratama',
    jenis_acara: 'Pernikahan',
    tanggal_acara: '2025-08-25',
    lokasi_acara: 'Jl. Mawar No. 18, Bogor',
    dampak_keramaian: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-20',
  },
  {
    id: 'HAJ007',
    nama_pemohon: 'Tini Wulandari',
    jenis_acara: 'Syukuran',
    tanggal_acara: '2025-08-28',
    lokasi_acara: 'Jl. Dahlia No. 22, Bogor',
    dampak_keramaian: 'Tidak',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-19',
  },
  {
    id: 'HAJ008',
    nama_pemohon: 'Udin Sedunia',
    jenis_acara: 'Khitanan',
    tanggal_acara: '2025-09-02',
    lokasi_acara: 'Jl. Anggrek No. 26, Bogor',
    dampak_keramaian: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-21',
  },
  {
    id: 'HAJ009',
    nama_pemohon: 'Vina Kusuma',
    jenis_acara: 'Ulang Tahun',
    tanggal_acara: '2025-09-05',
    lokasi_acara: 'Jl. Cempaka No. 30, Bogor',
    dampak_keramaian: 'Tidak',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-22',
  },
  {
    id: 'HAJ010',
    nama_pemohon: 'Wawan Kurniawan',
    jenis_acara: 'Tahlilan',
    tanggal_acara: '2025-09-08',
    lokasi_acara: 'Jl. Tulip No. 34, Bogor',
    dampak_keramaian: 'Tidak',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-23',
  },
  {
    id: 'HAJ011',
    nama_pemohon: 'Xenia Pratiwi',
    jenis_acara: 'Pengajian',
    tanggal_acara: '2025-09-12',
    lokasi_acara: 'Jl. Sakura No. 38, Bogor',
    dampak_keramaian: 'Ya',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-24',
  },
  {
    id: 'HAJ012',
    nama_pemohon: 'Yudi Hermawan',
    jenis_acara: 'Arisan',
    tanggal_acara: '2025-09-15',
    lokasi_acara: 'Jl. Lily No. 42, Bogor',
    dampak_keramaian: 'Tidak',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-25',
  },
];

// Dummy data for Surat Izin Acara Publik
export const acaraPublikData: SuratIzinAcaraPublik[] = [
  {
    id: 'PUB001',
    nama_penyelenggara: 'Panitia Pensi SMAN 1',
    nama_acara: 'Pensi Festival 2025',
    tanggal_waktu_acara: '2025-09-10 17:00 - 21:00',
    lokasi_acara: 'Lapangan Desa Sukamaju',
    rekomendasi_keamanan: 'Sudah',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
  {
    id: 'PUB002',
    nama_penyelenggara: 'Komunitas Seni Budaya',
    nama_acara: 'Festival Seni Tradisional',
    tanggal_waktu_acara: '2025-08-25 14:00 - 18:00',
    lokasi_acara: 'Balai Desa Cijulang',
    rekomendasi_keamanan: 'Belum',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'PUB003',
    nama_penyelenggara: 'Karang Taruna RT 05',
    nama_acara: 'Turnamen Futsal',
    tanggal_waktu_acara: '2025-08-12 08:00 - 17:00',
    lokasi_acara: 'Lapangan Futsal Desa',
    rekomendasi_keamanan: 'Sudah',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-05',
  },
  {
    id: 'PUB004',
    nama_penyelenggara: 'Paguyuban Pedagang',
    nama_acara: 'Bazar Ramadhan',
    tanggal_waktu_acara: '2025-09-20 16:00 - 22:00',
    lokasi_acara: 'Alun-alun Desa',
    rekomendasi_keamanan: 'Sudah',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'PUB005',
    nama_penyelenggara: 'Yayasan Pendidikan',
    nama_acara: 'Lomba Cerdas Cermat',
    tanggal_waktu_acara: '2025-08-30 09:00 - 15:00',
    lokasi_acara: 'Gedung Serbaguna',
    rekomendasi_keamanan: 'Belum',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-13',
  },
];

// Dummy data for Izin Penggunaan Sarana Umum Desa
export const saranaUmumData: IzinPenggunaanSaranaUmum[] = [
  {
    id: 'SAR001',
    nama_pemohon: 'Lembaga Karang Taruna',
    jenis_fasilitas: 'Balai Desa',
    tanggal_penggunaan: '2025-07-25',
    keperluan: 'Pelatihan Kewirausahaan',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'SAR002',
    nama_pemohon: 'PKK Desa',
    jenis_fasilitas: 'Aula Serbaguna',
    tanggal_penggunaan: '2025-08-05',
    keperluan: 'Pelatihan Memasak',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'SAR003',
    nama_pemohon: 'Kelompok Tani',
    jenis_fasilitas: 'Lapangan Desa',
    tanggal_penggunaan: '2025-08-15',
    keperluan: 'Pameran Hasil Pertanian',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'SAR004',
    nama_pemohon: 'Komunitas Olahraga',
    jenis_fasilitas: 'Lapangan Badminton',
    tanggal_penggunaan: '2025-08-20',
    keperluan: 'Turnamen Bulutangkis',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'SAR005',
    nama_pemohon: 'Kelompok Seni',
    jenis_fasilitas: 'Panggung Terbuka',
    tanggal_penggunaan: '2025-09-01',
    keperluan: 'Pertunjukan Seni',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-18',
  },
];

// Status badge configuration
export const eventStatusConfig = {
  Diproses: {
    label: 'Diproses',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  Disetujui: {
    label: 'Disetujui',
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  Ditolak: {
    label: 'Ditolak',
    className: 'bg-red-100 text-red-800 border-red-300',
  },
};

// Event permit types
export const eventPermitTypes = [
  { key: 'hajatan', label: 'Surat Izin Hajatan', data: hajatnData },
  { key: 'acara-publik', label: 'Surat Izin Acara Publik', data: acaraPublikData },
  { key: 'sarana-umum', label: 'Izin Penggunaan Sarana Umum', data: saranaUmumData },
];
