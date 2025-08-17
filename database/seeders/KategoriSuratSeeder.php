<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSuratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategori = [
            'Perizinan Usaha' => 'usaha',
            'Perizinan Bangunan' => 'bangunan',
            'Perizinan Keramaian' => 'acara',
            'Perizinan Pribadi' => 'pribadi',
            'Perizinan Pertanian' => 'pertanian',
            'Pengajuan Produk' => 'produk',
        ];

        foreach ($kategori as $nama => $slug) {
            DB::table('kategori_surat')->insert([
                'nama' => $nama,
                'slug' => $slug,
            ]);
        }

    }
}
