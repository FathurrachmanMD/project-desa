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

            $table->unsignedBigInteger('penduduk_id')->nullable()->index();
            $table->foreign('penduduk_id')->references('id')->on('penduduk')->nullOnDelete();

            $table->unsignedBigInteger('format_id')->index();
            $table->foreign('format_id')->references('id')->on('format_surat')->cascadeOnDelete();

            $table->string('nomor_surat')->nullable();
            $table->string('kode_surat')->nullable();

            $table->json('form')->nullable();   // isi surat
            $table->json('syarat')->nullable(); // file syarat, misal: {ktp: '...', kk: '...'}

            $table->enum('status', ['draft', 'diajukan', 'disetujui', 'ditolak', 'dicetak'])->default('draft');

            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

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
