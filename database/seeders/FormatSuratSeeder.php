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
            ['kategori_id' => 1, 'nama' => 'Surat Keterangan Usaha (SKU)', 'slug' => 'sku', 'deskripsi' => 'Surat keterangan yang menyatakan keberadaan usaha', 'template' => '<p>Nama: {nama}</p><p>Jenis Kelamin: {jk}</p>', 'form_isian' => ['nama', 'jk']],
            ['kategori_id' => 1, 'nama' => 'Izin Usaha Mikro Kecil (IUMK)', 'slug' => 'iumk', 'deskripsi' => 'Izin untuk usaha mikro dan kecil'],
            ['kategori_id' => 1, 'nama' => 'Surat Izin Tempat Usaha (SITU)', 'slug' => 'situ', 'deskripsi' => 'Izin yang menyatakan keabsahan lokasi tempat usaha'],
            ['kategori_id' => 1, 'nama' => 'Nomor Induk Berusaha (NIB)', 'slug' => 'nib', 'deskripsi' => 'Identitas pelaku usaha untuk memulai dan menjalankan usaha'],

            ['kategori_id' => 2, 'nama' => 'hajatan'],
            ['kategori_id' => 2, 'nama' => 'acara publik'],
            ['kategori_id' => 2, 'nama' => 'sarana umum'],

            ['kategori_id' => 3, 'nama' => 'IMB/PBG'],
            ['kategori_id' => 3, 'nama' => 'lahan desa'],
            ['kategori_id' => 3, 'nama' => 'tidak sengketa'],
            ['kategori_id' => 3, 'nama' => 'renovasi'],

            ['kategori_id' => 4, 'nama' => 'SKCK'],
            ['kategori_id' => 4, 'nama' => 'domisili'],
            ['kategori_id' => 4, 'nama' => 'pendatang'],
            ['kategori_id' => 4, 'nama' => 'luar negeri'],
            ['kategori_id' => 4, 'nama' => 'tidak bekerja'],

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

