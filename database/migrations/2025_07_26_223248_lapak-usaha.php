<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lapak-usaha', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED, auto increment, primary key
            $table->string('nama_produk', 100);
            $table->string('harga_produk', 50);
            $table->foreignId('kategori_id')->constrained('kategori_produk');
            $table->text('deskripsi');
            $table->string('nama_penjual', 100);
            $table->string('no_whatsapp', 100);
            $table->text('link_gambar');
            $table->string('status', 20)->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapak-usaha');
    }
};