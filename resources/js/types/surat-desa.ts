// Types untuk Sistem Admin Surat Desa
// Definisi tipe data untuk aplikasi

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'kepala_desa' | 'sekretaris';
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface KategoriSurat {
  id: number;
  nama_kategori: string;
  deskripsi: string;
  icon: string;
  warna: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count?: {
    jenis_surat: number;
    pengajuan_surat: number;
  };
}

export interface JenisSurat {
  id: number;
  kategori_id: number;
  nama_surat: string;
  kode_surat: string;
  deskripsi: string;
  persyaratan: string[];
  template_surat: string;
  biaya: number;
  masa_berlaku_hari: number;
  perlu_approval_kepala_desa: boolean;
  estimasi_selesai_hari: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  kategori?: KategoriSurat;
  _count?: {
    pengajuan_surat: number;
  };
}

export interface Pemohon {
  id: number;
  nik: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: 'L' | 'P';
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  alamat_lengkap: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  kode_pos: string;
  no_telepon: string;
  email: string;
  foto_ktp: string;
  foto_kk: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type StatusPengajuan = 'draft' | 'menunggu_verifikasi' | 'disetujui' | 'ditolak' | 'revisi';
export type PrioritasPengajuan = 'rendah' | 'normal' | 'tinggi' | 'urgent';
export type StatusPembayaran = 'belum_bayar' | 'sudah_bayar' | 'gratis';

export interface PengajuanSurat {
  id: number;
  nomor_pengajuan: string;
  pemohon_id: number;
  jenis_surat_id: number;
  tujuan_surat: string;
  data_tambahan: Record<string, unknown>;
  dokumen_pendukung: string[];
  status: StatusPengajuan;
  keterangan: string;
  tanggal_pengajuan: string;
  tanggal_verifikasi?: string;
  tanggal_selesai?: string;
  diverifikasi_oleh?: number;
  disetujui_oleh?: number;
  prioritas: PrioritasPengajuan;
  estimasi_selesai: string;
  biaya_total: number;
  status_pembayaran: StatusPembayaran;
  created_at: string;
  updated_at: string;
  pemohon?: Pemohon;
  jenis_surat?: JenisSurat;
  verifikator?: User;
  penyetuju?: User;
  surat_hasil?: SuratHasil;
}

export interface SuratHasil {
  id: number;
  pengajuan_id: number;
  nomor_surat: string;
  isi_surat: string;
  file_pdf: string;
  tanggal_berlaku: string;
  tanggal_kadaluarsa?: string;
  ditandatangani_oleh?: number;
  qr_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  penandatangan?: User;
}

export interface RiwayatStatus {
  id: number;
  pengajuan_id: number;
  status_lama: string;
  status_baru: string;
  keterangan: string;
  diubah_oleh?: number;
  created_at: string;
  pengubah?: User;
}

export interface LogAktivitas {
  id: number;
  user_id?: number;
  tipe_aktivitas: string;
  modul: string;
  deskripsi: string;
  data_lama?: Record<string, unknown>;
  data_baru?: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  user?: User;
}

export interface PengaturanSistem {
  id: number;
  kunci: string;
  nilai: string;
  deskripsi: string;
  tipe_data: 'string' | 'number' | 'boolean' | 'json';
  kategori: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notifikasi {
  id: number;
  user_id: number;
  judul: string;
  pesan: string;
  tipe: 'info' | 'success' | 'warning' | 'error';
  tindakan?: string;
  url_tindakan?: string;
  is_read: boolean;
  created_at: string;
}

// Stats untuk Dashboard
export interface DashboardStats {
  total_pengajuan_hari_ini: number;
  menunggu_verifikasi: number;
  disetujui_bulan_ini: number;
  ditolak_bulan_ini: number;
  total_pemohon: number;
  total_jenis_surat: number;
  pengajuan_trend: {
    tanggal: string;
    jumlah: number;
  }[];
  kategori_populer: {
    kategori: string;
    jumlah: number;
  }[];
}

// Filter untuk pencarian
export interface FilterPengajuan {
  search?: string;
  status?: StatusPengajuan;
  jenis_surat_id?: number;
  kategori_id?: number;
  prioritas?: PrioritasPengajuan;
  tanggal_dari?: string;
  tanggal_sampai?: string;
  pemohon_id?: number;
  page?: number;
  limit?: number;
}

// Response API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form validation
export interface FormErrors {
  [key: string]: string[];
}

// Komponen UI
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  className?: string;
}

export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  icon?: string;
  disabled?: boolean;
}
