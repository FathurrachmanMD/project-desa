<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class FormatSuratSeeder extends Seeder
{
    public function run()
    {
        $formats = [
            ['kategori_id' => 1, 'nama' => 'Surat Keterangan Usaha (SKU)', 'slug' => 'sku', 'deskripsi' => 'Surat keterangan yang menyatakan keberadaan usaha',
            'template' => '<p>Nama: {nama}</p><p>Jenis Kelamin: {jk}</p>',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'lama_usaha', 'label' => 'Lama Usaha', 'placeholder' => 'Contoh: 2 Tahun', 'type' => 'text', 'required' => true],
            ]],
            ['kategori_id' => 1, 'nama' => 'Izin Usaha Mikro Kecil (IUMK)', 'slug' => 'iumk', 'deskripsi' => 'Izin untuk usaha mikro dan kecil',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'modal_usaha', 'label' => 'Modal Usaha', 'placeholder' => 'Masukkan Modal Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'status_tempat_usaha', 'label' => 'Status Tempat Usaha', 'type' => 'select', 'required' => true, 'options' => ['Sewa', 'Milik Sendiri']],
            ]],
            ['kategori_id' => 1, 'nama' => 'Surat Izin Tempat Usaha (SITU)', 'slug' => 'situ', 'deskripsi' => 'Izin yang menyatakan keabsahan lokasi tempat usaha',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sewa', 'Hibah', 'Milik Sendiri']],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'rekom_rt_rw', 'label' => 'Rekomendasi RT/RW', 'type' => 'select', 'required' => true, 'options' => ['Sudah', 'Belum']],
            ]],
            ['kategori_id' => 1, 'nama' => 'Nomor Induk Berusaha (NIB)', 'slug' => 'nib', 'deskripsi' => 'Identitas pelaku usaha untuk memulai dan menjalankan usaha',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan', 'label' => 'Tujuan Pendaftaran NIB', 'placeholder' => 'Contoh: Legalitas Usaha', 'type' => 'text', 'required' => true],
            ]],
            ['kategori_id' => 2, 'nama' => 'Izin Mendirikan Bangunan (IMB / PBG)', 'slug' => 'imb-pbg', 'deskripsi' => 'Perizinan untuk mendirikan bangunan baru',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],
            ['kategori_id' => 2, 'nama' => 'Izin Bangun di Lahan Desa', 'slug' => 'lahan-desa', 'deskripsi' => 'Perizinan untuk membangun di lahan desa',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],
            ['kategori_id' => 2, 'nama' => 'Surat Tidak Sengketa Tanah', 'slug' => 'sengketa', 'deskripsi' => 'Surat pernyataan tidak adanya sengketa tanah',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],
            ['kategori_id' => 2, 'nama' => 'Izin Renovasi atau Perluasan Bangunan', 'slug' => 'renovasi', 'deskripsi' => 'Perizinan untuk renovasi atau memperluas bangunan',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],

            ['kategori_id' => 3, 'nama' => 'Surat Izin Hajatan', 'slug' => 'hajatan', 'deskripsi' => 'Izin penyelenggaraan hajatan atau acara keluarga',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Lengkap Anda', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_acara', 'label' => 'Jenis Acara', 'placeholder' => 'Contoh: Pernikahan, Sunatan, dll.', 'type' => 'text', 'required' => true],
                ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                ['name' => 'tanggal_acara', 'label' => 'Tanggal Acara', 'type' => 'date', 'required' => true],
                ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                ['name' => 'lokasi_acara', 'label' => 'Lokasi Acara', 'placeholder' => 'Masukkan Lokasi Acara', 'type' => 'text', 'required' => true],
                ['name' => 'perkiraan_tamu', 'label' => 'Perkiraan Jumlah Tamu', 'placeholder' => 'Contoh: 100', 'type' => 'number', 'required' => true],
            ]],
            ['kategori_id' => 3, 'nama' => 'Surat Izin Acara Publik', 'slug' => 'acara-publik', 'deskripsi' => 'Izin penyelenggaraan acara untuk umum',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                ['name' => 'tujuan_acara', 'label' => 'Tujuan Acara', 'placeholder' => 'Tuliskan Deskripsi Singkat', 'type' => 'textarea', 'required' => true],
                ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                ['name' => 'tanggal_acara', 'label' => 'Tanggal Acara', 'type' => 'date', 'required' => true],
                ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                ['name' => 'lokasi_acara', 'label' => 'Lokasi Acara', 'placeholder' => 'Masukkan Lokasi Acara', 'type' => 'text', 'required' => true],
                ['name' => 'perkiraan_tamu', 'label' => 'Perkiraan Jumlah Tamu', 'placeholder' => 'Contoh: 100', 'type' => 'number', 'required' => true],
            ]],
            ['kategori_id' => 3, 'nama' => 'Izin Penggunaan Sarana Umum Desa', 'slug' => 'sarana-umum', 'deskripsi' => 'Izin penggunaan fasilitas umum milik desa',
            'form_isian' => [
                    ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                    ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                    ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                    ['name' => 'tujuan_penggunaan', 'label' => 'Tujuan Penggunaan', 'placeholder' => 'Tuliskan Deskripsi Singkat', 'type' => 'textarea', 'required' => true],
                    ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                    ['name' => 'tanggal_penggunaan', 'label' => 'Tanggal penggunaan', 'type' => 'date', 'required' => true],
                    ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                    ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                    ['name' => 'lokasi_fasilitas', 'label' => 'Lokasi Fasilitas', 'placeholder' => 'Masukkan Lokasi Fasilitas Desa', 'type' => 'text', 'required' => true]
            ]],

            ['kategori_id' => 4, 'nama' => 'Surat Pengantar SKCK', 'slug' => 'skck', 'deskripsi' => 'Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian', 
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan Nomor Induk Kependudukan', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_skck', 'label' => 'Tujuan SKCK', 'placeholder' => 'Masukkan Tujuan Pembuatan SKCK', 'type' => 'text', 'required' => true],
                ['name' => 'tempat_tujuan', 'label' => 'Tempat Tujuan SKCK', 'placeholder' => 'Masukkan Tempat Tujuan', 'type' => 'text', 'required' => true]    
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Domisili', 'slug' => 'domisili', 'deskripsi' => 'Surat keterangan tempat tinggal resmi', 
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Domisili', 'placeholder' => 'Masukkan Alamat Domisili', 'type' => 'text', 'required' => true],
                ['name' => 'lama_tinggal', 'label' => 'Lama Tinggal', 'placeholder' => 'Masukkan Lama Tinggal (misal: 2 tahun)', 'type' => 'text', 'required' => true],
                ['name' => 'rt_rw', 'label' => 'RT/RW', 'placeholder' => 'Contoh: 04/09', 'type' => 'text', 'required' => true],    
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Izin Tinggal Pendatang', 'slug' => 'pendatang', 'deskripsi' => 'Surat izin tinggal untuk pendatang', 
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Pendatang', 'type' => 'text', 'required' => true],
                ['name' => 'alamat_asal', 'label' => 'Alamat Asal', 'placeholder' => 'Masukkan Alamat Asal', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_pindah', 'label' => 'Tujuan Pindah', 'placeholder' => 'Masukkan Tujuan Pindah', 'type' => 'text', 'required' => true],
                ['name' => 'rt_rw_tujuan', 'label' => 'RT/RW Tujuan', 'placeholder' => 'Contoh: 01/05', 'type' => 'text', 'required' => true],    
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Izin Keluar Negeri', 'slug' => 'luar-negeri', 'deskripsi' => 'Surat izin untuk keperluan keluar negeri', 
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_keberangkatan', 'label' => 'Tujuan Keberangkatan', 'placeholder' => 'Misal: Studi, Liburan, dll.', 'type' => 'text', 'required' => true],
                ['name' => 'negara_tujuan', 'label' => 'Negara Tujuan', 'placeholder' => 'Masukkan Negara Tujuan', 'type' => 'text', 'required' => true],
                ['name' => 'periode', 'label' => 'Periode/Waktu', 'placeholder' => 'Masukkan Periode Keberangkatan', 'type' => 'text', 'required' => true],    
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Tidak Bekerja', 'slug' => 'tidak-bekerja', 'deskripsi' => 'Surat keterangan status tidak bekerja', 
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alasan', 'label' => 'Alasan Tidak Bekerja', 'placeholder' => 'Masukkan Alasan Tidak Bekerja', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_surat', 'label' => 'Tujuan Surat', 'placeholder' => 'Contoh: Bantuan Sosial', 'type' => 'text', 'required' => true],        
            ]],

            ['kategori_id' => 5, 'nama' => 'Izin Pengelolaan Lahan', 'slug' => 'lahan', 'deskripsi' => 'Izin pengelolaan lahan desa atau tanah negara untuk pertanian',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'lokasi_lahan', 'label' => 'Lokasi Lahan', 'placeholder' => 'Masukkan lokasi lahan yang akan dikelola', 'type' => 'text', 'required' => true],
                ['name' => 'luas_lahan', 'label' => 'Luas Lahan (m²)', 'placeholder' => 'Contoh: 1000', 'type' => 'number', 'required' => true],
                ['name' => 'tujuan_pengelolaan', 'label' => 'Tujuan Pengelolaan', 'placeholder' => 'Contoh: Pertanian, Perkebunan', 'type' => 'text', 'required' => true],
                ['name' => 'durasi_jumlah', 'label' => 'Durasi Pengelolaan', 'placeholder' => 'Contoh: 3', 'type' => 'number', 'required' => true],
                ['name' => 'durasi_satuan', 'label' => 'Satuan Durasi', 'type' => 'select', 'options' => ['Bulan', 'Tahun'], 'required' => true],
            ]],
            ['kategori_id' => 5, 'nama' => 'Permohonan Bantuan Pertanian', 'slug' => 'bantuan', 'deskripsi' => 'Permohonan bantuan pupuk, bibit, atau alat pertanian',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'jenis_bantuan', 'label' => 'Jenis Bantuan', 'type' => 'select', 'required' => true, 'options' => ['Pupuk', 'Bibit', 'Alat Pertanian', 'Lainnya']],
                ['name' => 'kebutuhan', 'label' => 'Jumlah/Kebutuhan', 'placeholder' => 'Contoh: 5 karung pupuk', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan', 'label' => 'Tujuan Penggunaan', 'placeholder' => 'Contoh: Tanaman Padi', 'type' => 'text', 'required' => true],
                ['name' => 'pengalaman', 'label' => 'Pengalaman Bertani', 'type' => 'select', 'options' => ['Kurang dari 1 tahun', '1-3 tahun', 'Lebih dari 3 tahun'], 'required' => true],        
            ]],
            ['kategori_id' => 5, 'nama' => 'Surat Keterangan Petani', 'slug' => 'keterangan', 'deskripsi' => 'Surat keterangan sebagai petani atau buruh tani',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['Petani Pemilik Lahan', 'Petani Penggarap', 'Buruh Tani'], 'required' => true],
                ['name' => 'komoditas', 'label' => 'Komoditas yang Ditanam', 'placeholder' => 'Contoh: Padi, Jagung', 'type' => 'text', 'required' => true],
                ['name' => 'lama_bertani', 'label' => 'Lama Menjadi Petani', 'placeholder' => 'Contoh: 5 Tahun', 'type' => 'text', 'required' => true],        
            ]],
            ['kategori_id' => 5, 'nama' => 'Surat Izin Irigasi', 'slug' => 'irigasi', 'deskripsi' => 'Surat izin penggunaan air untuk keperluan pertanian',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'lokasi_lahan', 'label' => 'Lokasi Lahan', 'placeholder' => 'Masukkan lokasi lahan yang akan dikelola', 'type' => 'text', 'required' => true],
                ['name' => 'luas_lahan', 'label' => 'Luas Lahan (m²)', 'placeholder' => 'Contoh: 1000', 'type' => 'number', 'required' => true],
                ['name' => 'tujuan_irigasi', 'label' => 'Tujuan Pengelolaan', 'placeholder' => 'Contoh: Pertanian, Perkebunan', 'type' => 'text', 'required' => true],
                ['name' => 'durasi_jumlah', 'label' => 'Durasi Pengelolaan', 'placeholder' => 'Contoh: 3', 'type' => 'number', 'required' => true],
                ['name' => 'durasi_satuan', 'label' => 'Satuan Durasi', 'type' => 'select', 'options' => ['Bulan', 'Tahun'], 'required' => true],
            ]]
        ];

        foreach ($formats as $format) {
            DB::table('format_surat')->insert([
                'nama' => $format['nama'],
                'deskripsi' => isset($format['deskripsi']) ? $format['deskripsi'] : null,
                'kategori_id' => $format['kategori_id'],
                'url_surat' => isset($format['slug']) ? $format['slug'] : Str::slug($format['nama']),
                'template' => isset($format['template']) ? $format['template'] : null,
                'form_isian' => isset($format['form_isian']) ? json_encode($format['form_isian']) : null,
                'created_by' => 1,
                'updated_by' => 1
            ]);
        }
    }
}

