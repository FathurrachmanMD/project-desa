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
        Schema::create('surat', function (Blueprint $table) {
            $table->id();

            // $table->unsignedBigInteger('config_id')->nullable()->index();

            $table->enum('jenis', ['masuk', 'keluar']); // penanda jenis surat

            $table->smallInteger('nomor_urut')->nullable();
            $table->string('nomor_surat', 35)->nullable();
            $table->string('kode_surat', 10)->nullable();

            $table->date('tanggal_surat');
            $table->date('tanggal_penerimaan')->nullable();    // hanya untuk surat masuk
            $table->timestamp('tanggal_catat')->nullable()->useCurrent(); // hanya untuk surat keluar
            $table->date('tanggal_pengiriman')->nullable();    // hanya untuk surat keluar

            // Pengirim atau Tujuan (gunakan satu kolom serbaguna)
            $table->string('pengirim')->nullable(); // surat masuk
            $table->string('tujuan')->nullable();   // surat keluar

            $table->string('isi_singkat')->nullable();
            $table->string('isi_disposisi')->nullable(); // hanya untuk surat masuk
            $table->string('berkas_scan')->nullable();
            $table->string('lokasi_arsip')->nullable();

            $table->boolean('ekspedisi')->nullable()->default(false); // hanya untuk surat keluar
            $table->string('tanda_terima')->nullable(); // hanya untuk surat keluar
            $table->string('keterangan')->nullable();   // hanya untuk surat keluar

            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            // Relasi user
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat');
    }
};
