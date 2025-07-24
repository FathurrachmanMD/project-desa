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
            'Perizinan Usaha',
            'Perizinan Bangunan',
            'Perizinan Keramaian',
            'Perizinan Pribadi',
            'Perizinan Pertanian',
        ];

        foreach ($kategori as $item) {
            DB::table('kategori_surat')->insert([
                'nama' => $item,
            ]);
        }
    }
}
