<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Surat;
use App\Models\Penduduk;

echo "=== MENAMBAHKAN DATA SURAT SKU UNTUK TESTING ===\n";

// Cari atau buat penduduk untuk "bagas"
$pendudukBagas = Penduduk::where('nama', 'bagas')->first();
if (!$pendudukBagas) {
    $pendudukBagas = Penduduk::create([
        'nama' => 'bagas',
        'nik' => '3201010101010001', 
        'tempat_lahir' => 'Bandung',
        'tanggal_lahir' => '1990-01-01',
        'jenis_kelamin' => 'Laki-laki',
        'alamat' => 'Jl. Mawar No.25, Bandung',
        'agama' => 'Islam',
        'status_perkawinan' => 'Belum Kawin',
        'pekerjaan' => 'Wiraswasta',
        'kewarganegaraan' => 'WNI'
    ]);
    echo "Penduduk 'bagas' berhasil dibuat.\n";
}

// Buat surat SKU untuk Toko Kelontong Budi
$suratBudi = Surat::create([
    'penduduk_id' => $pendudukBagas->id,
    'format_id' => 2,
    'status' => 'disetujui',
    'form' => [
        'nama_pemohon' => 'bagas',
        'nik' => '3201010101010001',
        'nama_usaha' => 'Toko Kelontong Budi',
        'jenis_usaha' => 'jamu nge fly',
        'alamat_usaha' => 'Jl. Mawar No.25, Bandung',
        'lama_usaha' => '2 tahun, 3 bulan'
    ],
    'created_at' => '2025-08-01 17:56:55',
    'updated_at' => '2025-08-01 17:56:55'
]);

echo "Surat SKU untuk 'Toko Kelontong Budi' berhasil dibuat dengan ID: {$suratBudi->id}\n";

// Buat surat SKU untuk toko cihuy  
$suratCihuy = Surat::create([
    'penduduk_id' => $pendudukBagas->id,
    'format_id' => 2,
    'status' => 'disetujui',
    'form' => [
        'nama_pemohon' => 'bagas',
        'nik' => '3201010101010001',
        'nama_usaha' => 'toko cihuy',
        'jenis_usaha' => 'jamu nge fly',
        'alamat_usaha' => 'Jl. Melati No.12, Bandung',
        'lama_usaha' => '2 tahun, 3 bulan'
    ],
    'created_at' => '2025-08-01 18:09:47',
    'updated_at' => '2025-08-01 18:09:47'
]);

echo "Surat SKU untuk 'toko cihuy' berhasil dibuat dengan ID: {$suratCihuy->id}\n";

echo "\n=== CEK ULANG DATA SURAT SKU YANG DISETUJUI ===\n";
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
