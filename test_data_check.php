<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Surat;
use App\Models\Lapak;
use App\Models\Produk;

echo "=== CEK DATA SURAT SKU YANG DISETUJUI ===\n";
$surats = Surat::where('status', 'disetujui')
    ->where('format_id', 2)
    ->with('penduduk')
    ->get();

echo "Total surat SKU disetujui: " . $surats->count() . "\n\n";

foreach ($surats as $surat) {
    echo "ID: {$surat->id}\n";
    echo "Nama Pemohon: " . ($surat->form['nama_pemohon'] ?? 'null') . "\n";
    echo "Nama Usaha: " . ($surat->form['nama_usaha'] ?? 'null') . "\n";
    echo "Penduduk: " . ($surat->penduduk->nama ?? 'null') . "\n";
    echo "NIK: " . ($surat->form['nik'] ?? 'null') . "\n";
    echo "Updated: {$surat->updated_at}\n";
    echo "---\n";
}

echo "\n=== CEK DATA LAPAK ===\n";
$lapaks = Lapak::all();
echo "Total lapak: " . $lapaks->count() . "\n\n";

foreach ($lapaks as $lapak) {
    echo "ID: {$lapak->id}, Nama: {$lapak->nama}, Produk: " . $lapak->products->count() . "\n";
}

echo "\n=== CEK DATA PRODUK ===\n";
$products = Produk::where('status', true)->get();
echo "Total produk aktif: " . $products->count() . "\n";

foreach ($products as $product) {
    echo "ID: {$product->id}, Nama: {$product->nama}, Lapak ID: {$product->lapak_id}\n";
}
