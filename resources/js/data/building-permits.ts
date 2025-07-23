// Types for the building permit data
export type BuildingStatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

export interface IzinMendirikanBangunan {
  id: string;
  nama_pemohon: string;
  alamat_bangunan: string;
  jenis_bangunan: string;
  status_tanah: string;
  status: BuildingStatusType;
  tanggal_pengajuan: string;
}

export interface IzinBangunLahanDesa {
  id: string;
  nama_pemohon: string;
  nama_lahan: string;
  tujuan_pembangunan: string;
  rekomendasi_kades: 'Ya' | 'Tidak';
  status: BuildingStatusType;
  tanggal_pengajuan: string;
}

export interface SuratTidakSengketaTanah {
  id: string;
  nama_pemilik_tanah: string;
  lokasi_tanah: string;
  status_sengketa: 'Tidak' | 'Ya';
  tujuan_penggunaan: string;
  status: BuildingStatusType;
  tanggal_pengajuan: string;
}

export interface IzinRenovasiPerluasan {
  id: string;
  nama_pemilik: string;
  lokasi_bangunan: string;
  jenis_renovasi: string;
  status_tanah: string;
  status: BuildingStatusType;
  tanggal_pengajuan: string;
}

// Dummy data for Izin Mendirikan Bangunan (IMB/PBG)
export const imbData: IzinMendirikanBangunan[] = [
  {
    id: 'IMB001',
    nama_pemohon: 'Budi Santoso',
    alamat_bangunan: 'Jl. Mawar No. 4, Bandung',
    jenis_bangunan: 'Ruko',
    status_tanah: 'Milik sendiri',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'IMB002',
    nama_pemohon: 'Siti Aminah',
    alamat_bangunan: 'Jl. Melati No. 12, Cimahi',
    jenis_bangunan: 'Rumah Tinggal',
    status_tanah: 'Milik sendiri',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'IMB003',
    nama_pemohon: 'Ahmad Rizki',
    alamat_bangunan: 'Jl. Anggrek No. 8, Sukabumi',
    jenis_bangunan: 'Warung',
    status_tanah: 'Sewa',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'IMB004',
    nama_pemohon: 'Dewi Lestari',
    alamat_bangunan: 'Jl. Dahlia No. 18, Bogor',
    jenis_bangunan: 'Kost',
    status_tanah: 'Milik sendiri',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'IMB005',
    nama_pemohon: 'Joko Widodo',
    alamat_bangunan: 'Jl. Sakura No. 25, Depok',
    jenis_bangunan: 'Gudang',
    status_tanah: 'Sewa',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-18',
  },
];

// Dummy data for Izin Bangun di Lahan Milik Desa
export const lahanDesaData: IzinBangunLahanDesa[] = [
  {
    id: 'LHN001',
    nama_pemohon: 'Lestari Wulandari',
    nama_lahan: 'Titik 3 - Tanah Desa Mekarjaya',
    tujuan_pembangunan: 'Posyandu',
    rekomendasi_kades: 'Ya',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
  {
    id: 'LHN002',
    nama_pemohon: 'Komunitas Remaja',
    nama_lahan: 'Titik 1 - Lapangan Desa',
    tujuan_pembangunan: 'Gazebo',
    rekomendasi_kades: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'LHN003',
    nama_pemohon: 'PKK Desa',
    nama_lahan: 'Titik 2 - Area Serbaguna',
    tujuan_pembangunan: 'Warung',
    rekomendasi_kades: 'Tidak',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-05',
  },
  {
    id: 'LHN004',
    nama_pemohon: 'Kelompok Tani',
    nama_lahan: 'Titik 4 - Lahan Kosong',
    tujuan_pembangunan: 'Gudang Penyimpanan',
    rekomendasi_kades: 'Ya',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'LHN005',
    nama_pemohon: 'Karang Taruna',
    nama_lahan: 'Titik 5 - Dekat Balai Desa',
    tujuan_pembangunan: 'Perpustakaan',
    rekomendasi_kades: 'Ya',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-13',
  },
];

// Dummy data for Surat Tidak Sengketa Tanah
export const tidakSengketaData: SuratTidakSengketaTanah[] = [
  {
    id: 'TST001',
    nama_pemilik_tanah: 'Slamet Widodo',
    lokasi_tanah: 'Blok C No. 21, RT 04/RW 02',
    status_sengketa: 'Tidak',
    tujuan_penggunaan: 'Pembangunan rumah tinggal',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'TST002',
    nama_pemilik_tanah: 'Rina Marlina',
    lokasi_tanah: 'Blok A No. 15, RT 02/RW 01',
    status_sengketa: 'Tidak',
    tujuan_penggunaan: 'Pembangunan kios',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'TST003',
    nama_pemilik_tanah: 'Bambang Sutrisno',
    lokasi_tanah: 'Blok B No. 8, RT 03/RW 01',
    status_sengketa: 'Tidak',
    tujuan_penggunaan: 'Pembangunan warung',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'TST004',
    nama_pemilik_tanah: 'Maya Sari',
    lokasi_tanah: 'Blok D No. 12, RT 05/RW 02',
    status_sengketa: 'Tidak',
    tujuan_penggunaan: 'Pembangunan bengkel',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-18',
  },
  {
    id: 'TST005',
    nama_pemilik_tanah: 'Hendra Gunawan',
    lokasi_tanah: 'Blok E No. 7, RT 01/RW 03',
    status_sengketa: 'Tidak',
    tujuan_penggunaan: 'Pembangunan gudang',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-14',
  },
];

// Dummy data for Izin Renovasi atau Perluasan Bangunan
export const renovasiData: IzinRenovasiPerluasan[] = [
  {
    id: 'RNV001',
    nama_pemilik: 'Rina Kusuma',
    lokasi_bangunan: 'Perum Griya Asri, Blok D2',
    jenis_renovasi: 'Perluasan',
    status_tanah: 'Sewa',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'RNV002',
    nama_pemilik: 'Andi Wijaya',
    lokasi_bangunan: 'Jl. Kenanga No. 22, Bandung',
    jenis_renovasi: 'Renovasi Total',
    status_tanah: 'Milik sendiri',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-09',
  },
  {
    id: 'RNV003',
    nama_pemilik: 'Sari Indah',
    lokasi_bangunan: 'Jl. Tulip No. 14, Cimahi',
    jenis_renovasi: 'Penambahan Lantai',
    status_tanah: 'Milik sendiri',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'RNV004',
    nama_pemilik: 'Dedi Setiawan',
    lokasi_bangunan: 'Komplek Permata, Blok A5',
    jenis_renovasi: 'Perluasan',
    status_tanah: 'Milik sendiri',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'RNV005',
    nama_pemilik: 'Fitri Handayani',
    lokasi_bangunan: 'Jl. Bougenville No. 9, Bogor',
    jenis_renovasi: 'Renovasi Atap',
    status_tanah: 'Sewa',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-13',
  },
];

// Status badge configuration
export const buildingStatusConfig = {
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

// Building permit types
export const buildingPermitTypes = [
  { key: 'imb', label: 'Izin Mendirikan Bangunan (IMB/PBG)', data: imbData },
  { key: 'lahan-desa', label: 'Izin Bangun di Lahan Milik Desa', data: lahanDesaData },
  { key: 'tidak-sengketa', label: 'Surat Tidak Sengketa Tanah', data: tidakSengketaData },
  { key: 'renovasi', label: 'Izin Renovasi atau Perluasan Bangunan', data: renovasiData },
];
