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
        Schema::create('lapak_user', function (Blueprint $table) {
            $table->id();
            
            // Informasi Usaha
            $table->string('nama_usaha');
            $table->string('slug')->unique();
            $table->string('jenis_usaha');
            $table->text('alamat_usaha');
            
            // Informasi Pemilik
            $table->string('pemilik_nama');
            $table->string('pemilik_nik', 16);
            
            // Kontak
            $table->string('telepon', 20)->nullable();
            $table->string('email')->nullable();
            
            // Status dan Tanggal
            $table->boolean('status')->default(true);
            $table->datetime('tanggal_disetujui')->nullable();
            
            // Foreign Keys
            $table->foreignId('surat_id')->nullable()->constrained('surat')->onDelete('set null');
            $table->foreignId('penduduk_id')->nullable()->constrained('penduduk')->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Indexes
            $table->index('slug');
            $table->index('status');
            $table->index(['nama_usaha', 'status']);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapak_user');
    }
};
