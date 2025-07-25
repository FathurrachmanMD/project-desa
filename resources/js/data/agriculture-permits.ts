// Types for the agriculture permit data
export type StatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

export interface IzinPenggunaanLahan {
  id: string;
  nama_pemohon: string;
  nik: string;
  lokasi_lahan: string;
  luas_lahan: string;
  jenis_tanaman: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

export interface RekomendasiPupuk {
  id: string;
  nama_pemohon: string;
  nik: string;
  jenis_pupuk: string;
  jumlah_kebutuhan: string;
  nama_toko: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

export interface SuratKeteranganPetani {
  id: string;
  nama_pemohon: string;
  nik: string;
  jenis_usaha_tani: string;
  luas_garapan: string;
  hasil_panen: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

// Sample data for agriculture permits
export const izinLahanData: IzinPenggunaanLahan[] = [
  {
    id: 'IL001',
    nama_pemohon: 'Budi Santoso',
    nik: '3201010101010001',
    lokasi_lahan: 'Blok A, Desa Sukamaju',
    luas_lahan: '2.5 Ha',
    jenis_tanaman: 'Padi',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-15',
  },
  {
    id: 'IL002',
    nama_pemohon: 'Siti Aminah',
    nik: '3201010101010002',
    lokasi_lahan: 'Blok B, Desa Sukamaju',
    luas_lahan: '1.8 Ha',
    jenis_tanaman: 'Jagung',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-01',
  },
  {
    id: 'IL003',
    nama_pemohon: 'Ahmad Wijaya',
    nik: '3201010101010003',
    lokasi_lahan: 'Blok C, Desa Sukamaju',
    luas_lahan: '3.2 Ha',
    jenis_tanaman: 'Cabai',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-20',
  },
  {
    id: 'IL004',
    nama_pemohon: 'Rina Sari',
    nik: '3201010101010004',
    lokasi_lahan: 'Blok D, Desa Sukamaju',
    luas_lahan: '1.5 Ha',
    jenis_tanaman: 'Tomat',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-05',
  },
  {
    id: 'IL005',
    nama_pemohon: 'Joko Pramono',
    nik: '3201010101010005',
    lokasi_lahan: 'Blok E, Desa Sukamaju',
    luas_lahan: '2.0 Ha',
    jenis_tanaman: 'Kacang Tanah',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-10',
  },
];

export const rekomendasiPupukData: RekomendasiPupuk[] = [
  {
    id: 'RP001',
    nama_pemohon: 'Sutomo',
    nik: '3201010101010006',
    jenis_pupuk: 'Urea',
    jumlah_kebutuhan: '500 kg',
    nama_toko: 'Toko Tani Sejahtera',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-18',
  },
  {
    id: 'RP002',
    nama_pemohon: 'Wati Kusuma',
    nik: '3201010101010007',
    jenis_pupuk: 'NPK',
    jumlah_kebutuhan: '300 kg',
    nama_toko: 'Toko Pertanian Maju',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-02',
  },
  {
    id: 'RP003',
    nama_pemohon: 'Bambang Sutrisno',
    nik: '3201010101010008',
    jenis_pupuk: 'TSP',
    jumlah_kebutuhan: '250 kg',
    nama_toko: 'Toko Subur Jaya',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-25',
  },
  {
    id: 'RP004',
    nama_pemohon: 'Indah Permata',
    nik: '3201010101010009',
    jenis_pupuk: 'Kompos',
    jumlah_kebutuhan: '1000 kg',
    nama_toko: 'Koperasi Tani Mandiri',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
  {
    id: 'RP005',
    nama_pemohon: 'Rudi Hartono',
    nik: '3201010101010010',
    jenis_pupuk: 'KCl',
    jumlah_kebutuhan: '150 kg',
    nama_toko: 'Toko Agro Sentosa',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-12',
  },
];

export const suratKeteranganPetaniData: SuratKeteranganPetani[] = [
  {
    id: 'SKP001',
    nama_pemohon: 'Hasan Basri',
    nik: '3201010101010011',
    jenis_usaha_tani: 'Padi Sawah',
    luas_garapan: '2.5 Ha',
    hasil_panen: '12 ton/Ha',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-22',
  },
  {
    id: 'SKP002',
    nama_pemohon: 'Nurhayati',
    nik: '3201010101010012',
    jenis_usaha_tani: 'Hortikultura',
    luas_garapan: '1.2 Ha',
    hasil_panen: '8 ton/Ha',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-03',
  },
  {
    id: 'SKP003',
    nama_pemohon: 'Agus Salim',
    nik: '3201010101010013',
    jenis_usaha_tani: 'Palawija',
    luas_garapan: '1.8 Ha',
    hasil_panen: '6 ton/Ha',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-06-28',
  },
  {
    id: 'SKP004',
    nama_pemohon: 'Fatimah',
    nik: '3201010101010014',
    jenis_usaha_tani: 'Perikanan',
    luas_garapan: '0.8 Ha',
    hasil_panen: '2 ton/Ha',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-06',
  },
  {
    id: 'SKP005',
    nama_pemohon: 'Yusuf Ibrahim',
    nik: '3201010101010015',
    jenis_usaha_tani: 'Peternakan',
    luas_garapan: '1.5 Ha',
    hasil_panen: 'Sapi: 15 ekor',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-11',
  },
];

export const statusConfig = {
  Diproses: { color: 'bg-yellow-100 text-yellow-800', label: 'Diproses' },
  Disetujui: { color: 'bg-green-100 text-green-800', label: 'Disetujui' },
  Ditolak: { color: 'bg-red-100 text-red-800', label: 'Ditolak' },
};

export const permitTypes = [
  { value: 'izin-lahan', label: 'Izin Penggunaan Lahan' },
  { value: 'rekomendasi-pupuk', label: 'Rekomendasi Pupuk' },
  { value: 'surat-keterangan-petani', label: 'Surat Keterangan Petani' },
];
