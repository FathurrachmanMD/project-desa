// Types for the personal permit data
export type PersonalStatusType = 'Diproses' | 'Disetujui' | 'Ditolak';

// Status configuration for UI
export const personalStatusConfig: Record<PersonalStatusType, { label: string; className: string }> = {
  'Diproses': { 
    label: 'Diproses', 
    className: 'border-yellow-300 text-yellow-700 bg-yellow-50' 
  },
  'Disetujui': { 
    label: 'Disetujui', 
    className: 'border-green-300 text-green-700 bg-green-50' 
  },
  'Ditolak': { 
    label: 'Ditolak', 
    className: 'border-red-300 text-red-700 bg-red-50' 
  },
};

export interface SuratPengantarSKCK {
  id: string;
  nama_pemohon: string;
  nik: string;
  tujuan_skck: string;
  tempat_tujuan_skck: string;
  status: PersonalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratKeteranganDomisili {
  id: string;
  nama_warga: string;
  alamat_domisili: string;
  lama_tinggal: string;
  rt_rw: string;
  status: PersonalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratIzinTinggalPendatang {
  id: string;
  nama_pendatang: string;
  alamat_asal: string;
  tujuan_pindah: string;
  rt_rw_tujuan: string;
  status: PersonalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratIzinKeluarNegeri {
  id: string;
  nama_pemohon: string;
  tujuan_keberangkatan: string;
  negara_tujuan: string;
  periode: string;
  status: PersonalStatusType;
  tanggal_pengajuan: string;
}

export interface SuratKeteranganTidakBekerja {
  id: string;
  nama_pemohon: string;
  alasan_tidak_bekerja: string;
  tujuan_surat: string;
  status: PersonalStatusType;
  tanggal_pengajuan: string;
}

// Dummy data for Surat Pengantar SKCK
export const pengantarSKCKData: SuratPengantarSKCK[] = [
  {
    id: 'SKCK001',
    nama_pemohon: 'Andi Prasetyo',
    nik: '3210123456789001',
    tujuan_skck: 'Melamar kerja',
    tempat_tujuan_skck: 'Polsek Cibiru',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'SKCK002',
    nama_pemohon: 'Budi Hartono',
    nik: '3210987654321002',
    tujuan_skck: 'Mengurus visa',
    tempat_tujuan_skck: 'Polres Bandung',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'SKCK003',
    nama_pemohon: 'Citra Dewi',
    nik: '3210456789123003',
    tujuan_skck: 'Daftar CPNS',
    tempat_tujuan_skck: 'Polda Jabar',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'SKCK004',
    nama_pemohon: 'Deni Ramadhan',
    nik: '3210789123456004',
    tujuan_skck: 'Mengurus beasiswa',
    tempat_tujuan_skck: 'Polsek Cileunyi',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'SKCK005',
    nama_pemohon: 'Eka Sari',
    nik: '3210321654987005',
    tujuan_skck: 'Keperluan sekolah',
    tempat_tujuan_skck: 'Polsek Cibiru',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-08',
  },
];

// Dummy data for Surat Keterangan Domisili
export const keteranganDomisiliData: SuratKeteranganDomisili[] = [
  {
    id: 'DOM001',
    nama_warga: 'Siti Aminah',
    alamat_domisili: 'Jl. Merdeka No. 10',
    lama_tinggal: 'Sejak 2020',
    rt_rw: 'RT 03 / RW 04',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'DOM002',
    nama_warga: 'Ahmad Subandi',
    alamat_domisili: 'Jl. Cendana No. 25',
    lama_tinggal: 'Sejak 2018',
    rt_rw: 'RT 01 / RW 02',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-13',
  },
  {
    id: 'DOM003',
    nama_warga: 'Rina Kusumawati',
    alamat_domisili: 'Jl. Melati No. 8',
    lama_tinggal: 'Sejak 2022',
    rt_rw: 'RT 05 / RW 01',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-17',
  },
  {
    id: 'DOM004',
    nama_warga: 'Bambang Wijaya',
    alamat_domisili: 'Jl. Kenanga No. 15',
    lama_tinggal: 'Sejak 2019',
    rt_rw: 'RT 02 / RW 03',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'DOM005',
    nama_warga: 'Maya Sari',
    alamat_domisili: 'Jl. Dahlia No. 12',
    lama_tinggal: 'Sejak 2021',
    rt_rw: 'RT 04 / RW 05',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-09',
  },
];

// Dummy data for Surat Izin Tinggal Pendatang
export const izinTinggalPendatangData: SuratIzinTinggalPendatang[] = [
  {
    id: 'PND001',
    nama_pendatang: 'Rizky Hidayat',
    alamat_asal: 'Kab. Sumedang',
    tujuan_pindah: 'Bekerja',
    rt_rw_tujuan: 'RT 05 / RW 01',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'PND002',
    nama_pendatang: 'Lia Permata',
    alamat_asal: 'Kab. Garut',
    tujuan_pindah: 'Kuliah',
    rt_rw_tujuan: 'RT 02 / RW 03',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'PND003',
    nama_pendatang: 'Dodi Setiawan',
    alamat_asal: 'Kab. Tasikmalaya',
    tujuan_pindah: 'Mengikuti keluarga',
    rt_rw_tujuan: 'RT 01 / RW 04',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'PND004',
    nama_pendatang: 'Fitri Rahayu',
    alamat_asal: 'Kab. Cianjur',
    tujuan_pindah: 'Bekerja',
    rt_rw_tujuan: 'RT 03 / RW 02',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'PND005',
    nama_pendatang: 'Agus Salim',
    alamat_asal: 'Kab. Bekasi',
    tujuan_pindah: 'Berwirausaha',
    rt_rw_tujuan: 'RT 04 / RW 01',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-10',
  },
];

// Dummy data for Surat Izin Keluar Negeri
export const izinKeluarNegeriData: SuratIzinKeluarNegeri[] = [
  {
    id: 'LN001',
    nama_pemohon: 'Lutfi Maulana',
    tujuan_keberangkatan: 'Studi',
    negara_tujuan: 'Australia',
    periode: 'Agustus 2025',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-13',
  },
  {
    id: 'LN002',
    nama_pemohon: 'Indira Sari',
    tujuan_keberangkatan: 'Wisata',
    negara_tujuan: 'Jepang',
    periode: 'September 2025',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'LN003',
    nama_pemohon: 'Rahman Ali',
    tujuan_keberangkatan: 'Bekerja',
    negara_tujuan: 'Malaysia',
    periode: 'Oktober 2025',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-16',
  },
  {
    id: 'LN004',
    nama_pemohon: 'Nurul Huda',
    tujuan_keberangkatan: 'Umroh',
    negara_tujuan: 'Arab Saudi',
    periode: 'November 2025',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-11',
  },
  {
    id: 'LN005',
    nama_pemohon: 'Hadi Kusuma',
    tujuan_keberangkatan: 'Bisnis',
    negara_tujuan: 'Singapura',
    periode: 'Desember 2025',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-09',
  },
];

// Dummy data for Surat Keterangan Tidak Bekerja
export const keteranganTidakBekerjaData: SuratKeteranganTidakBekerja[] = [
  {
    id: 'TBK001',
    nama_pemohon: 'Dewi Sartika',
    alasan_tidak_bekerja: 'Pengangguran',
    tujuan_surat: 'Pengajuan KIS',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-14',
  },
  {
    id: 'TBK002',
    nama_pemohon: 'Joni Setiawan',
    alasan_tidak_bekerja: 'Sedang mencari kerja',
    tujuan_surat: 'Bantuan sosial',
    status: 'Diproses',
    tanggal_pengajuan: '2025-07-15',
  },
  {
    id: 'TBK003',
    nama_pemohon: 'Sari Handayani',
    alasan_tidak_bekerja: 'Ibu rumah tangga',
    tujuan_surat: 'Pengajuan BPJS',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-12',
  },
  {
    id: 'TBK004',
    nama_pemohon: 'Rudi Hartono',
    alasan_tidak_bekerja: 'Disabilitas',
    tujuan_surat: 'Program bantuan pemerintah',
    status: 'Disetujui',
    tanggal_pengajuan: '2025-07-10',
  },
  {
    id: 'TBK005',
    nama_pemohon: 'Lestari Wulan',
    alasan_tidak_bekerja: 'Sedang kuliah',
    tujuan_surat: 'Pengajuan beasiswa',
    status: 'Ditolak',
    tanggal_pengajuan: '2025-07-08',
  },
];

// Export permit types array for easy access
export const personalPermitTypes = [
  { key: 'pengantar-skck', label: 'Surat Pengantar SKCK', data: pengantarSKCKData },
  { key: 'keterangan-domisili', label: 'Surat Keterangan Domisili', data: keteranganDomisiliData },
  { key: 'izin-tinggal-pendatang', label: 'Surat Izin Tinggal Pendatang', data: izinTinggalPendatangData },
  { key: 'izin-keluar-negeri', label: 'Surat Izin Keluar Negeri (Informal)', data: izinKeluarNegeriData },
  { key: 'keterangan-tidak-bekerja', label: 'Surat Keterangan Tidak Bekerja', data: keteranganTidakBekerjaData },
];
