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
        Schema::create('lapak', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('config_id')->nullable()->index();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->string('jenis_usaha')->nullable();

            // $table->string('pemilik_nama');
            // $table->string('pemilik_nik', 16);

            $table->string('telepon', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('alamat');
            $table->string('lat', 20)->nullable();
            $table->string('lng', 20)->nullable();

            $table->tinyInteger('zoom')->default(10);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            $table->foreignId('surat_id')->nullable()->constrained('surat')->onDelete('set null');
            $table->foreignId('penduduk_id')->nullable()->constrained('penduduk')->onDelete('set null');

            $table->timestamps();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapak');
    }
};
