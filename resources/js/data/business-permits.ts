// Types for the business permit data
export type StatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

export interface SuratKeteranganUsaha {
  id: string;
  nama_pemohon: string;
  nik: string;
  nama_usaha: string;
  alamat_usaha: string;
  lama_usaha: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

export interface IzinUsahaMikroKecil {
  id: string;
  nama_pemohon: string;
  nik: string;
  nama_usaha: string;
  jenis_usaha: string;
  modal_usaha: string;
  status_tempat_usaha: string;
  tanggal_pengajuan: string;
  status: StatusType;
}

export interface SuratIzinTempatUsaha {
  id: string;
  nama_pemohon: string;
  alamat_usaha: string;
  status_lahan: string;
  jenis_usaha: string;
  rekomendasi_rtrw: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

export interface RekomendasiNIB {
  id: string;
  nama_pemohon: string;
  nik: string;
  nama_usaha: string;
  tujuan: string;
  status: StatusType;
  tanggal_pengajuan: string;
}

// Dummy data for Surat Keterangan Usaha (SKU)
export const skuData: SuratKeteranganUsaha[] = [
  {
    id: 'SKU001',
    nama_pemohon: 'Dewi Lestari',
    nik: '3201010101010001',
    nama_usaha: 'Warung Kopi Bu Dewi',
    alamat_usaha: 'Jl. Melati No.12, Bandung',
    lama_usaha: '3 tahun, 6 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-24',
  },
  {
    id: 'SKU002',
    nama_pemohon: 'Budi Santoso',
    nik: '3201010101010002',
    nama_usaha: 'Toko Kelontong Budi',
    alamat_usaha: 'Jl. Mawar No.25, Bandung',
    lama_usaha: '2 tahun, 3 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-24',
  },
  {
    id: 'SKU003',
    nama_pemohon: 'Sari Indah',
    nik: '3201010101010003',
    nama_usaha: 'Salon Kecantikan Sari',
    alamat_usaha: 'Jl. Anggrek No.8, Bandung',
    lama_usaha: '1 tahun, 2 bulan',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-23',
  },
  {
    id: 'SKU004',
    nama_pemohon: 'Ahmad Fauzi',
    nik: '3201010101010004',
    nama_usaha: 'Bengkel Motor Ahmad',
    alamat_usaha: 'Jl. Dahlia No.15, Bandung',
    lama_usaha: '5 tahun, 8 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'SKU005',
    nama_pemohon: 'Maya Sari',
    nik: '3201010101010005',
    nama_usaha: 'Catering Maya',
    alamat_usaha: 'Jl. Tulip No.7, Bandung',
    lama_usaha: '4 tahun, 1 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'SKU006',
    nama_pemohon: 'Andi Setiawan',
    nik: '3201010101010006',
    nama_usaha: 'Toko Kelontong Andi',
    alamat_usaha: 'Jl. Mawar No.12, Bandung',
    lama_usaha: '6 tahun, 3 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-13',
  },
  {
    id: 'SKU007',
    nama_pemohon: 'Lina Kartika',
    nik: '3201010101010007',
    nama_usaha: 'Salon Lina',
    alamat_usaha: 'Jl. Anggrek No.18, Bandung',
    lama_usaha: '3 tahun, 7 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'SKU008',
    nama_pemohon: 'Rudi Hermawan',
    nik: '3201010101010008',
    nama_usaha: 'Bengkel Las Rudi',
    alamat_usaha: 'Jl. Kenanga No.25, Bandung',
    lama_usaha: '8 tahun, 2 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'SKU009',
    nama_pemohon: 'Siti Nurhaliza',
    nik: '3201010101010009',
    nama_usaha: 'Warung Siti',
    alamat_usaha: 'Jl. Cempaka No.30, Bandung',
    lama_usaha: '5 tahun, 9 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'SKU010',
    nama_pemohon: 'Budi Santoso',
    nik: '3201010101010010',
    nama_usaha: 'Fotocopy Budi',
    alamat_usaha: 'Jl. Sakura No.8, Bandung',
    lama_usaha: '2 tahun, 5 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'SKU011',
    nama_pemohon: 'Dewi Lestari',
    nik: '3201010101010011',
    nama_usaha: 'Toko Baju Dewi',
    alamat_usaha: 'Jl. Lily No.14, Bandung',
    lama_usaha: '4 tahun, 8 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'SKU012',
    nama_pemohon: 'Agus Prasetyo',
    nik: '3201010101010012',
    nama_usaha: 'Warung Kopi Agus',
    alamat_usaha: 'Jl. Melati No.22, Bandung',
    lama_usaha: '7 tahun, 1 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-09',
  },
  {
    id: 'SKU006',
    nama_pemohon: 'Nana Suryani',
    nik: '3201010101010006',
    nama_usaha: 'Salon Nana',
    alamat_usaha: 'Jl. Anggrek No.12, Bandung',
    lama_usaha: '3 tahun, 6 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'SKU007',
    nama_pemohon: 'Ovi Marlina',
    nik: '3201010101010007',
    nama_usaha: 'Toko Kelontong Ovi',
    alamat_usaha: 'Jl. Cempaka No.18, Bandung',
    lama_usaha: '6 tahun, 2 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'SKU008',
    nama_pemohon: 'Panji Kusuma',
    nik: '3201010101010008',
    nama_usaha: 'Warung Kopi Panji',
    alamat_usaha: 'Jl. Kenanga No.25, Bandung',
    lama_usaha: '2 tahun, 9 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'SKU009',
    nama_pemohon: 'Qory Amalina',
    nik: '3201010101010009',
    nama_usaha: 'Laundry Qory',
    alamat_usaha: 'Jl. Melati No.30, Bandung',
    lama_usaha: '1 tahun, 11 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-18',
  },
  {
    id: 'SKU010',
    nama_pemohon: 'Rizki Pratama',
    nik: '3201010101010010',
    nama_usaha: 'Fotocopy Rizki',
    alamat_usaha: 'Jl. Lily No.35, Bandung',
    lama_usaha: '4 tahun, 5 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-19',
  },
  {
    id: 'SKU011',
    nama_pemohon: 'Sari Wulandari',
    nik: '3201010101010011',
    nama_usaha: 'Bakery Sari',
    alamat_usaha: 'Jl. Sakura No.40, Bandung',
    lama_usaha: '3 tahun, 3 bulan',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-20',
  },
  {
    id: 'SKU012',
    nama_pemohon: 'Toni Hermawan',
    nik: '3201010101010012',
    nama_usaha: 'Jasa Cleaning Toni',
    alamat_usaha: 'Jl. Orchid No.45, Bandung',
    lama_usaha: '2 tahun, 7 bulan',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-21',
  },
];

// Dummy data for Izin Usaha Mikro Kecil (IUMK)
export const iumkData: IzinUsahaMikroKecil[] = [
  {
    id: 'IUMK001',
    nama_pemohon: 'Andi Saputra',
    nik: '3201020202020002',
    nama_usaha: 'Bakso Mas Andi',
    jenis_usaha: 'Kuliner',
    modal_usaha: 'Rp 12.000.000',
    status_tempat_usaha: 'Sewa',
    tanggal_pengajuan: '2025-07-12',
    status: 'Disetujui',
  },
  {
    id: 'IUMK002',
    nama_pemohon: 'Rina Wati',
    nik: '3201020202020003',
    nama_usaha: 'Es Krim Rina',
    jenis_usaha: 'Kuliner',
    modal_usaha: 'Rp 8.500.000',
    status_tempat_usaha: 'Milik Sendiri',
    tanggal_pengajuan: '2025-07-09',
    status: 'Diproses',
  },
  {
    id: 'IUMK003',
    nama_pemohon: 'Joko Widodo',
    nik: '3201020202020004',
    nama_usaha: 'Konveksi Joko',
    jenis_usaha: 'Produksi',
    modal_usaha: 'Rp 25.000.000',
    status_tempat_usaha: 'Sewa',
    tanggal_pengajuan: '2025-07-11',
    status: 'Ditolak',
  },
  {
    id: 'IUMK004',
    nama_pemohon: 'Lina Marlina',
    nik: '3201020202020005',
    nama_usaha: 'Toko Kue Lina',
    jenis_usaha: 'Kuliner',
    modal_usaha: 'Rp 15.000.000',
    status_tempat_usaha: 'Milik Sendiri',
    tanggal_pengajuan: '2025-07-13',
    status: 'Disetujui',
  },
  {
    id: 'IUMK005',
    nama_pemohon: 'Hendra Gunawan',
    nik: '3201020202020006',
    nama_usaha: 'Laundry Hendra',
    jenis_usaha: 'Jasa',
    modal_usaha: 'Rp 18.000.000',
    status_tempat_usaha: 'Sewa',
    tanggal_pengajuan: '2025-07-15',
    status: 'Diproses',
  },
];

// Dummy data for Surat Izin Tempat Usaha (SITU)
export const situData: SuratIzinTempatUsaha[] = [
  {
    id: 'SITU001',
    nama_pemohon: 'Siti Nurhaliza',
    alamat_usaha: 'Jl. Kenanga No.9, Cimahi',
    status_lahan: 'Milik Sendiri',
    jenis_usaha: 'Laundry',
    rekomendasi_rtrw: 'Sudah',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-06',
  },
  {
    id: 'SITU002',
    nama_pemohon: 'Rudi Hartono',
    alamat_usaha: 'Jl. Flamboyan No.22, Cimahi',
    status_lahan: 'Sewa',
    jenis_usaha: 'Fotocopy',
    rekomendasi_rtrw: 'Sudah',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-07',
  },
  {
    id: 'SITU003',
    nama_pemohon: 'Yuni Astuti',
    alamat_usaha: 'Jl. Sakura No.18, Cimahi',
    status_lahan: 'Milik Sendiri',
    jenis_usaha: 'Minimarket',
    rekomendasi_rtrw: 'Belum',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'SITU004',
    nama_pemohon: 'Dedi Setiawan',
    alamat_usaha: 'Jl. Teratai No.5, Cimahi',
    status_lahan: 'Sewa',
    jenis_usaha: 'Warnet',
    rekomendasi_rtrw: 'Sudah',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'SITU005',
    nama_pemohon: 'Fitri Handayani',
    alamat_usaha: 'Jl. Bougenville No.12, Cimahi',
    status_lahan: 'Milik Sendiri',
    jenis_usaha: 'Toko Baju',
    rekomendasi_rtrw: 'Sudah',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
];

// Dummy data for Rekomendasi NIB/OSS
export const nibData: RekomendasiNIB[] = [
  {
    id: 'NIB001',
    nama_pemohon: 'Rian Firmansyah',
    nik: '3201030303030003',
    nama_usaha: 'Rian Tech Solutions',
    tujuan: 'Mengajukan NIB melalui OSS',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
  {
    id: 'NIB002',
    nama_pemohon: 'Indah Pertiwi',
    nik: '3201030303030004',
    nama_usaha: 'Indah Creative Studio',
    tujuan: 'Legalitas usaha digital',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-09',
  },
  {
    id: 'NIB003',
    nama_pemohon: 'Bayu Wardana',
    nik: '3201030303030005',
    nama_usaha: 'Bayu Consulting',
    tujuan: 'Perizinan konsultan',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'NIB004',
    nama_pemohon: 'Ratna Sari',
    nik: '3201030303030006',
    nama_usaha: 'Ratna Online Shop',
    tujuan: 'E-commerce business',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'NIB005',
    nama_pemohon: 'Arief Budiman',
    nik: '3201030303030007',
    nama_usaha: 'Arief Transport',
    tujuan: 'Jasa transportasi online',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-13',
  },
];

// Status badge configuration
export const statusConfig = {
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

// Permit types
export const permitTypes = [
  { key: 'sku', label: 'Surat Keterangan Usaha (SKU)', data: skuData },
  { key: 'iumk', label: 'Izin Usaha Mikro Kecil (IUMK)', data: iumkData },
  { key: 'situ', label: 'Surat Izin Tempat Usaha (SITU)', data: situData },
  { key: 'nib', label: 'Rekomendasi NIB/OSS', data: nibData },
];
