<?php

namespace Database\Seeders;

use App\Models\KategoriProduk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['kategori' => 'Umum', 'slug' => 'umum'],
            ['kategori' => 'Pangan', 'slug' => 'pangan'],
            ['kategori' => 'Kerajinan', 'slug' => 'kerajinan'],
            ['kategori' => 'Pertanian', 'slug' => 'pertanian'],
            ['kategori' => 'Jasa', 'slug' => 'jasa'],
        ];

        foreach ($categories as $category) {
            KategoriProduk::firstOrCreate(
                ['kategori' => $category['kategori']],
                [
                    'slug' => $category['slug'],
                    'status' => true
                ]
            );
        }
    }
}
