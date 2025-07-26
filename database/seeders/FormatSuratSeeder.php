<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class FormatSuratSeeder extends Seeder
{
    function buildInput(string $name, string $type = 'text', string $placeholder = ''): array {
        return [
            'name' => $name,
            'value' => '',             // default empty string
            'required' => true,        // default to true, adjust as needed
            'label' => ucfirst($name), // capitalize first letter for label
            'placeholder' => $placeholder ?: 'Masukkan ' . $name,
            'type' => $type,
            'minLength' => null,       // set if needed, otherwise null
            'maxLength' => null,
            'pattern' => null,         // regex pattern, null if none
            'options' => null,         // array for select options, null if none
            'disabled' => false,
            'readOnly' => false,
            'inputMode' => null,       // e.g. 'numeric', 'email', null if none
        ];
    }


    public function run()
    {
        $formats = [
            ['kategori_id' => 1, 'nama' => 'Surat Keterangan Usaha (SKU)', 'slug' => 'sku', 'deskripsi' => 'Surat keterangan yang menyatakan keberadaan usaha', 'template' => '<p>Nama: {nama}</p><p>Jenis Kelamin: {jk}</p>',
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

            ['kategori_id' => 2, 'nama' => 'hajatan'],
            ['kategori_id' => 2, 'nama' => 'acara publik'],
            ['kategori_id' => 2, 'nama' => 'sarana umum'],

            ['kategori_id' => 3, 'nama' => 'IMB/PBG'],
            ['kategori_id' => 3, 'nama' => 'lahan desa'],
            ['kategori_id' => 3, 'nama' => 'tidak sengketa'],
            ['kategori_id' => 3, 'nama' => 'renovasi'],

            ['kategori_id' => 4, 'nama' => 'Surat Pengantar SKCK', 'slug' => 'skck', 'deskripsi' => 'Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian', 
            'form_isian' => [
                
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Domisili', 'slug' => 'domisili', 'deskripsi' => 'Surat keterangan tempat tinggal resmi', 
            'form_isian' => [
                
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Izin Tinggal Pendatang', 'slug' => 'pendatang', 'deskripsi' => 'Surat izin tinggal untuk pendatang', 
            'form_isian' => [
                
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Izin Keluar Negeri', 'slug' => 'luar-negeri', 'deskripsi' => 'Surat izin untuk keperluan keluar negeri', 
            'form_isian' => [
                
            ]],
            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Tidak Bekerja', 'slug' => 'tidak-bekerja', 'deskripsi' => 'Surat keterangan status tidak bekerja', 
            'form_isian' => [
                
            ]],

            ['kategori_id' => 5, 'nama' => 'lahan'],
            ['kategori_id' => 5, 'nama' => 'bantuan'],
            ['kategori_id' => 5, 'nama' => 'keterangan'],
            ['kategori_id' => 5, 'nama' => 'irigasi'],
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

