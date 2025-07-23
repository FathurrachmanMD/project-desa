// Types for the agricultural permit data
export type AgriculturalStatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

export interface IzinPengelolaanLahan {
  id: string;
  nama_pemohon: string;
  lokasi_lahan: string;
  tujuan_pengelolaan: string;
  luas_lahan: string;
  status: AgriculturalStatusType;
  tanggal_pengajuan: string;
}

export interface PermohonanBantuan {
  id: string;
  nama_pemohon: string;
  jenis_bantuan: string;
  jumlah: string;
  alasan_kebutuhan: string;
  status: AgriculturalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratKeteranganPetani {
  id: string;
  nama: string;
  jenis_profesi: string;
  lokasi_bertani: string;
  masa_aktif: string;
  tujuan_surat: string;
  status: AgriculturalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratIzinIrigasi {
  id: string;
  nama_pemohon: string;
  sumber_air: string;
  lokasi_penggunaan_air: string;
  jenis_tanaman: string;
  status: AgriculturalStatusType;
  tanggal_pengajuan: string;
}

// Dummy data for Izin Pengelolaan Lahan Desa / Tanah Negara
export const pengelolaanLahanData: IzinPengelolaanLahan[] = [
  {
    id: 'PL001',
    nama_pemohon: 'Kelompok Tani Subur Jaya',
    lokasi_lahan: 'Blok A - Tanah Negara RT 03/RW 01',
    tujuan_pengelolaan: 'Kebun',
    luas_lahan: '1.5 Hektar',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'PL002',
    nama_pemohon: 'Samsul Bahri',
    lokasi_lahan: 'Blok B - Tanah Negara RT 02/RW 01',
    tujuan_pengelolaan: 'Sawah',
    luas_lahan: '2.0 Hektar',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-25',
  },
  {
    id: 'PL003',
    nama_pemohon: 'Kelompok Tani Makmur',
    lokasi_lahan: 'Blok C - Lahan Desa RT 01/RW 02',
    tujuan_pengelolaan: 'Perkebunan',
    luas_lahan: '3.2 Hektar',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-05',
  },
  {
    id: 'PL004',
    nama_pemohon: 'Ahmad Soleh',
    lokasi_lahan: 'Blok D - Tanah Negara RT 04/RW 02',
    tujuan_pengelolaan: 'Tambak',
    luas_lahan: '0.8 Hektar',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-06-15',
  },
  {
    id: 'PL005',
    nama_pemohon: 'Kelompok Tani Sejahtera',
    lokasi_lahan: 'Blok E - Lahan Desa RT 03/RW 03',
    tujuan_pengelolaan: 'Kebun Sayur',
    luas_lahan: '1.2 Hektar',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-30',
  }
];

// Dummy data for Permohonan Bantuan Pupuk / Bibit / Alat
export const permohonanBantuanData: PermohonanBantuan[] = [
  {
    id: 'PB001',
    nama_pemohon: 'Sukiman',
    jenis_bantuan: 'Bibit Jagung',
    jumlah: '100 Kg',
    alasan_kebutuhan: 'Awal musim tanam',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
  {
    id: 'PB002',
    nama_pemohon: 'Tukiran',
    jenis_bantuan: 'Pupuk Urea',
    jumlah: '500 Kg',
    alasan_kebutuhan: 'Pemupukan musim hujan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'PB003',
    nama_pemohon: 'Kelompok Tani Maju',
    jenis_bantuan: 'Alat Semprot',
    jumlah: '5 Unit',
    alasan_kebutuhan: 'Pengendalian hama',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'PB004',
    nama_pemohon: 'Ratna Sari',
    jenis_bantuan: 'Bibit Padi',
    jumlah: '200 Kg',
    alasan_kebutuhan: 'Persiapan musim tanam',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-01',
  },
  {
    id: 'PB005',
    nama_pemohon: 'Bambang Sutrisno',
    jenis_bantuan: 'Pupuk NPK',
    jumlah: '300 Kg',
    alasan_kebutuhan: 'Pemeliharaan tanaman',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-06-28',
  }
];

// Dummy data for Surat Keterangan Petani atau Buruh Tani
export const suratKeteranganPetaniData: SuratKeteranganPetani[] = [
  {
    id: 'SKP001',
    nama: 'Sari Wulandari',
    jenis_profesi: 'Buruh Tani',
    lokasi_bertani: 'Sawah Desa Sukamaju',
    masa_aktif: '3 Tahun',
    tujuan_surat: 'Pengajuan bantuan pupuk',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-13',
  },
  {
    id: 'SKP002',
    nama: 'Joko Widodo',
    jenis_profesi: 'Petani',
    lokasi_bertani: 'Kebun Desa Makmur',
    masa_aktif: '5 Tahun',
    tujuan_surat: 'Syarat kredit usaha tani',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-05',
  },
  {
    id: 'SKP003',
    nama: 'Dewi Sartika',
    jenis_profesi: 'Buruh Tani',
    lokasi_bertani: 'Perkebunan Desa Sejahtera',
    masa_aktif: '2 Tahun',
    tujuan_surat: 'Pendaftaran asuransi pertanian',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'SKP004',
    nama: 'Hartono',
    jenis_profesi: 'Petani',
    lokasi_bertani: 'Tambak Desa Subur',
    masa_aktif: '7 Tahun',
    tujuan_surat: 'Pengajuan bantuan alat',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-29',
  },
  {
    id: 'SKP005',
    nama: 'Sumiati',
    jenis_profesi: 'Buruh Tani',
    lokasi_bertani: 'Ladang Desa Maju',
    masa_aktif: '1 Tahun',
    tujuan_surat: 'Verifikasi status petani',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-06-20',
  }
];

// Dummy data for Surat Izin Irigasi / Air Pertanian
export const suratIzinIrigasiData: SuratIzinIrigasi[] = [
  {
    id: 'SII001',
    nama_pemohon: 'Dedi Kurniawan',
    sumber_air: 'Sungai Cipeles',
    lokasi_penggunaan_air: 'Lahan Sawah Blok C',
    jenis_tanaman: 'Padi',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-09',
  },
  {
    id: 'SII002',
    nama_pemohon: 'Kelompok Tani Tirta',
    sumber_air: 'Irigasi Desa',
    lokasi_penggunaan_air: 'Sawah Blok A-B',
    jenis_tanaman: 'Padi',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-02',
  },
  {
    id: 'SII003',
    nama_pemohon: 'Rohmat Hidayat',
    sumber_air: 'Sumur Bor',
    lokasi_penggunaan_air: 'Kebun Sayur Blok D',
    jenis_tanaman: 'Sayuran',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'SII004',
    nama_pemohon: 'Wahyu Setiawan',
    sumber_air: 'Sungai Cimanuk',
    lokasi_penggunaan_air: 'Tambak Blok E',
    jenis_tanaman: 'Ikan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-07',
  },
  {
    id: 'SII005',
    nama_pemohon: 'Kelompok Tani Sejahtera',
    sumber_air: 'Mata Air Desa',
    lokasi_penggunaan_air: 'Perkebunan Blok F',
    jenis_tanaman: 'Kelapa Sawit',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-25',
  }
];

// Status configuration for agricultural permits
export const agriculturalStatusConfig = {
  'Diproses': {
    label: 'Diproses',
    className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  },
  'Disetujui': {
    label: 'Disetujui',
    className: 'border-green-200 bg-green-50 text-green-800',
  },
  'Ditolak': {
    label: 'Ditolak',
    className: 'border-red-200 bg-red-50 text-red-800',
  },
};

// Export all permit types for easy reference
export const agriculturalPermitTypes = [
  { key: 'pengelolaan-lahan', label: 'Izin Pengelolaan Lahan Desa / Tanah Negara', data: pengelolaanLahanData },
  { key: 'permohonan-bantuan', label: 'Permohonan Bantuan Pupuk / Bibit / Alat', data: permohonanBantuanData },
  { key: 'surat-keterangan-petani', label: 'Surat Keterangan Petani atau Buruh Tani', data: suratKeteranganPetaniData },
  { key: 'surat-izin-irigasi', label: 'Surat Izin Irigasi / Air Pertanian', data: suratIzinIrigasiData },
];
