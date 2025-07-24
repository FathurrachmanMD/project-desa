export interface Customer {
  id: string;
  nama: string;
  email: string;
  nik: string;
  no_telepon: string;
  alamat: string;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  pekerjaan: string;
  status_akun: 'Aktif' | 'Nonaktif' | 'Suspended';
  tanggal_daftar: string;
  terakhir_login: string;
  total_pengajuan: number;
}

export const customerStatusConfig = {
  'Aktif': {
    label: 'Aktif',
    className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
  },
  'Nonaktif': {
    label: 'Nonaktif',
    className: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800'
  },
  'Suspended': {
    label: 'Suspended',
    className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
  }
};

export type CustomerStatusType = keyof typeof customerStatusConfig;

export const customersData: Customer[] = [
  {
    id: 'CUST001',
    nama: 'Ahmad Suryadi',
    email: 'ahmad.suryadi@email.com',
    nik: '3201234567890001',
    no_telepon: '081234567890',
    alamat: 'Jl. Merdeka No. 123, RT 01/RW 02, Kelurahan Sumber Jaya',
    tanggal_lahir: '1985-03-15',
    jenis_kelamin: 'Laki-laki',
    pekerjaan: 'Wiraswasta',
    status_akun: 'Aktif',
    tanggal_daftar: '2025-07-24',
    terakhir_login: '2025-07-24',
    total_pengajuan: 5
  },
  {
    id: 'CUST002',
    nama: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    nik: '3201234567890002',
    no_telepon: '081234567891',
    alamat: 'Jl. Kebon Jeruk No. 45, RT 03/RW 01, Kelurahan Maju Jaya',
    tanggal_lahir: '1990-08-22',
    jenis_kelamin: 'Perempuan',
    pekerjaan: 'Pegawai Swasta',
    status_akun: 'Aktif',
    tanggal_daftar: '2025-07-24',
    terakhir_login: '2025-07-24',
    total_pengajuan: 3
  },
  {
    id: 'CUST003',
    nama: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    nik: '3201234567890003',
    no_telepon: '081234567892',
    alamat: 'Jl. Raya Utama No. 78, RT 02/RW 03, Kelurahan Sejahtera',
    tanggal_lahir: '1982-12-05',
    jenis_kelamin: 'Laki-laki',
    pekerjaan: 'Petani',
    status_akun: 'Nonaktif',
    tanggal_daftar: '2025-07-23',
    terakhir_login: '2025-07-20',
    total_pengajuan: 8
  },
  {
    id: 'CUST004',
    nama: 'Dewi Sartika',
    email: 'dewi.sartika@email.com',
    nik: '3201234567890004',
    no_telepon: '081234567893',
    alamat: 'Jl. Pahlawan No. 32, RT 05/RW 02, Kelurahan Damai',
    tanggal_lahir: '1988-06-18',
    jenis_kelamin: 'Perempuan',
    pekerjaan: 'Guru',
    status_akun: 'Aktif',
    tanggal_daftar: '2025-07-23',
    terakhir_login: '2025-07-23',
    total_pengajuan: 2
  },
  {
    id: 'CUST005',
    nama: 'Rizki Pratama',
    email: 'rizki.pratama@email.com',
    nik: '3201234567890005',
    no_telepon: '081234567894',
    alamat: 'Jl. Cemara No. 67, RT 04/RW 01, Kelurahan Indah',
    tanggal_lahir: '1995-11-30',
    jenis_kelamin: 'Laki-laki',
    pekerjaan: 'Mahasiswa',
    status_akun: 'Suspended',
    tanggal_daftar: '2024-05-12',
    terakhir_login: '2025-05-20',
    total_pengajuan: 1
  },
  {
    id: 'CUST006',
    nama: 'Maya Sari',
    email: 'maya.sari@email.com',
    nik: '3201234567890006',
    no_telepon: '081234567895',
    alamat: 'Jl. Melati No. 89, RT 01/RW 04, Kelurahan Harmoni',
    tanggal_lahir: '1987-04-25',
    jenis_kelamin: 'Perempuan',
    pekerjaan: 'Ibu Rumah Tangga',
    status_akun: 'Aktif',
    tanggal_daftar: '2024-06-08',
    terakhir_login: '2025-07-21',
    total_pengajuan: 4
  },
  {
    id: 'CUST007',
    nama: 'Andi Wijaya',
    email: 'andi.wijaya@email.com',
    nik: '3201234567890007',
    no_telepon: '081234567896',
    alamat: 'Jl. Anggrek No. 12, RT 03/RW 05, Kelurahan Berkah',
    tanggal_lahir: '1983-09-14',
    jenis_kelamin: 'Laki-laki',
    pekerjaan: 'Pegawai Negeri',
    status_akun: 'Aktif',
    tanggal_daftar: '2024-07-15',
    terakhir_login: '2025-07-23',
    total_pengajuan: 6
  },
  {
    id: 'CUST008',
    nama: 'Fatimah Zahra',
    email: 'fatimah.zahra@email.com',
    nik: '3201234567890008',
    no_telepon: '081234567897',
    alamat: 'Jl. Mawar No. 55, RT 02/RW 01, Kelurahan Tentram',
    tanggal_lahir: '1992-01-08',
    jenis_kelamin: 'Perempuan',
    pekerjaan: 'Dokter',
    status_akun: 'Aktif',
    tanggal_daftar: '2024-08-22',
    terakhir_login: '2025-07-22',
    total_pengajuan: 7
  }
];
