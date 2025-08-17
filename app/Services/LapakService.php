<?php

namespace App\Services;

use App\Models\Surat;
use App\Models\Lapak;
use App\Models\Produk;
use App\Models\KategoriProduk;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LapakService
{
    public function createFromSurat(Surat $surat)
    {
        try {
            // Ambil data dari form surat
            $formData = $surat->form;
            
            Log::info('Creating lapak from surat', ['surat_id' => $surat->id, 'form_data' => $formData]);
            
            // Buat atau cari lapak berdasarkan penduduk_id dan nama_usaha
            $lapak = Lapak::firstOrCreate(
                [
                    'penduduk_id' => $surat->penduduk_id,
                    'nama' => $formData["nama_usaha"] ?? 'Lapak ' . ($surat->penduduk->nama ?? 'User'),
                ],
                [
                    'surat_id' => $surat->id,
                    'telepon' => $formData["nomor_hp"] ?? $surat->penduduk->nomor_hp ?? '',
                    'status' => 'disetujui',
                    'alamat' => $formData["alamat_usaha"] ?? $formData["alamat"],
                    'created_by' => $surat->created_by ?? Auth::id(),
                    'updated_by' => $surat->updated_by ?? Auth::id(),
                ]
            );

            Log::info('Lapak created/found', ['lapak_id' => $lapak->id, 'was_recently_created' => $lapak->wasRecentlyCreated]);

            // Jika lapak baru dibuat, buat produk default berdasarkan data surat
            // if ($lapak->wasRecentlyCreated) {
            //     $this->createDefaultProduct($lapak, $formData, $surat);
            // }

            return $lapak;
        } catch (\Exception $e) {
            Log::error('Error creating lapak from surat', [
                'surat_id' => $surat->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function createDefaultProduct(Lapak $lapak, array $formData, Surat $surat)
    {
        try {
            // Cari kategori berdasarkan jenis usaha atau buat kategori "Umum"
            $jenisUsaha = $formData["jenis_usaha"] ?? 'umum';
            $kategoriName = $this->mapJenisUsahaToKategori($jenisUsaha);
            
            $kategori = KategoriProduk::firstOrCreate([
                'kategori' => $kategoriName
            ], [
                'slug' => strtolower(str_replace(' ', '-', $kategoriName)),
                'status' => true
            ]);

            // Buat produk default berdasarkan data dari form surat
            $produk = Produk::create([
                'lapak_id' => $lapak->id,
                'kategori_id' => $kategori->id,
                'nama' => $formData["nama_produk"] ?? $formData["nama_usaha"] ?? 'Produk ' . $lapak->nama,
                'harga' => $this->extractPrice($formData["harga_produk"] ?? $formData["modal_usaha"] ?? "0"),
                'satuan' => $formData["satuan"] ?? $formData["satuan_produk"] ?? 'pcs',
                'deskripsi' => $formData["deskripsi_produk"] ?? $formData["deskripsi_usaha"] ?? 'Produk dari ' . $lapak->nama,
                'status' => true,
                'created_by' => $surat->created_by ?? Auth::id(),
                'updated_by' => $surat->updated_by ?? Auth::id(),
            ]);

            Log::info('Product created', ['product_id' => $produk->id, 'lapak_id' => $lapak->id]);

            return $produk;
        } catch (\Exception $e) {
            Log::error('Error creating product', [
                'lapak_id' => $lapak->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    private function mapJenisUsahaToKategori($jenisUsaha)
    {
        $mapping = [
            'makanan' => 'Pangan',
            'minuman' => 'Pangan', 
            'kuliner' => 'Pangan',
            'kerajinan' => 'Kerajinan',
            'pertanian' => 'Pertanian',
            'jasa' => 'Jasa',
        ];

        $jenisLower = strtolower($jenisUsaha);
        return $mapping[$jenisLower] ?? 'Umum';
    }

    private function extractPrice($priceString)
    {
        // Hapus karakter non-digit dari string harga
        $price = preg_replace('/[^0-9]/', '', $priceString);
        return $price ? (int) $price : 0;
    }
}
