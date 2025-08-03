<?php

namespace Database\Seeders;

use App\Models\Lapak;
use App\Models\Produk;
use App\Models\KategoriProduk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LapakTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat lapak test untuk user ID 1
        $lapak1 = Lapak::create([
            'nama' => 'Toko Pak Budi',
            'telepon' => '628123456789',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        $lapak2 = Lapak::create([
            'nama' => 'Warung Bu Sari',
            'telepon' => '628987654321',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        // Ambil kategori yang sudah ada
        $kategoriPangan = KategoriProduk::where('kategori', 'Pangan')->first();
        $kategoriKerajinan = KategoriProduk::where('kategori', 'Kerajinan')->first();
        $kategoriUmum = KategoriProduk::where('kategori', 'Umum')->first();

        // Buat produk untuk lapak 1
        Produk::create([
            'lapak_id' => $lapak1->id,
            'kategori_id' => $kategoriPangan ? $kategoriPangan->id : 1,
            'nama' => 'Nasi Gudeg Jogja',
            'harga' => 15000,
            'satuan' => 'porsi',
            'deskripsi' => 'Nasi gudeg khas Jogja dengan ayam kampung dan sambal krecek',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Produk::create([
            'lapak_id' => $lapak1->id,
            'kategori_id' => $kategoriPangan ? $kategoriPangan->id : 1,
            'nama' => 'Es Teh Manis',
            'harga' => 3000,
            'satuan' => 'gelas',
            'deskripsi' => 'Es teh manis segar untuk menemani makan',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        // Buat produk untuk lapak 2
        Produk::create([
            'lapak_id' => $lapak2->id,
            'kategori_id' => $kategoriKerajinan ? $kategoriKerajinan->id : 1,
            'nama' => 'Tas Anyaman Bambu',
            'harga' => 45000,
            'satuan' => 'pcs',
            'deskripsi' => 'Tas anyaman bambu handmade dengan motif tradisional',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);

        Produk::create([
            'lapak_id' => $lapak2->id,
            'kategori_id' => $kategoriUmum ? $kategoriUmum->id : 1,
            'nama' => 'Kopi Tubruk Desa',
            'harga' => 5000,
            'satuan' => 'cangkir',
            'deskripsi' => 'Kopi tubruk asli dari biji kopi lokal dengan rasa yang khas',
            'status' => true,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
