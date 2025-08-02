<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Produk;

echo "=== UPDATE STOK PRODUK MANUAL ===\n";

// Update produk ID 14 dengan stok 50
$product = Produk::find(14);
if ($product) {
    echo "Produk ditemukan: {$product->nama}\n";
    echo "Stok sebelum: {$product->stok}\n";
    
    $product->stok = 50;
    $product->save();
    
    echo "Stok sesudah: {$product->stok}\n";
    echo "Update berhasil!\n";
} else {
    echo "Produk ID 14 tidak ditemukan\n";
}

echo "\n=== CEK SEMUA PRODUK ===\n";
$products = Produk::all();

foreach ($products as $product) {
    echo "ID: {$product->id}, Nama: {$product->nama}, Stok: {$product->stok}\n";
}
