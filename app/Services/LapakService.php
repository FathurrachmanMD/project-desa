<?php

namespace App\Services;

use App\Models\Surat;
use App\Models\Lapak;
use App\Models\Produk;
use App\Models\KategoriProduk;
use Illuminate\Support\Facades\Auth;

class LapakService
{
    public function createFromSurat(Surat $surat)
    {
        // Ambil data dari form surat
        $formData = $surat->form;
        
        // Buat atau cari lapak berdasarkan penduduk_id dan nama_usaha
        $lapak = Lapak::firstOrCreate(
            [
                'penduduk_id' => $surat->penduduk_id,
                'nama' => $formData["nama_usaha"] ?? 'Lapak ' . $surat->penduduk->nama,
            ],
            [
                'telepon' => $formData["nomor_hp"] ?? $surat->penduduk->nomor_hp,
                'status' => true,
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]
        );

        // Jika lapak baru dibuat, buat produk default berdasarkan data surat
        if ($lapak->wasRecentlyCreated) {
            $this->createDefaultProduct($lapak, $formData);
        }

        return $lapak;
    }

    private function createDefaultProduct(Lapak $lapak, array $formData)
    {
        // Cari kategori default atau buat kategori "Umum"
        $kategori = KategoriProduk::firstOrCreate([
            'kategori' => 'Umum'
        ], [
            'slug' => 'umum',
            'status' => true
        ]);

        // Buat produk default berdasarkan data dari form surat
        Produk::create([
            'lapak_id' => $lapak->id,
            'kategori_id' => $kategori->id,
            'nama' => $formData["nama_produk"] ?? $formData["nama_usaha"] ?? 'Produk ' . $lapak->nama,
            'harga' => $this->extractPrice($formData["harga_produk"] ?? "0"),
            'satuan' => $formData["satuan"] ?? 'pcs',
            'deskripsi' => $formData["deskripsi_produk"] ?? $formData["deskripsi_usaha"] ?? 'Produk dari ' . $lapak->nama,
            'status' => true,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);
    }

    private function extractPrice($priceString)
    {
        // Hapus karakter non-digit dari string harga
        $price = preg_replace('/[^0-9]/', '', $priceString);
        return $price ? (int) $price : 0;
    }
}
