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
        Schema::create('produk', function (Blueprint $table) {
            $table->id();

            // $table->unsignedBigInteger('config_id')->nullable()->index();
            $table->unsignedBigInteger('lapak_id')->nullable()->index();
            $table->unsignedBigInteger('kategori_id')->nullable()->index();

            $table->string('nama')->nullable();
            $table->integer('harga')->nullable();
            $table->string('satuan', 20)->nullable();

            $table->boolean('tipe_potongan')->nullable()->default(true); // tinyint(1), default 1
            $table->integer('potongan')->default(0);

            $table->text('deskripsi')->nullable();
            $table->string('foto', 225)->nullable();

            $table->boolean('status')->default(true); // aktif/nonaktif

            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();

            $table->foreign('lapak_id')->references('id')->on('lapak')->nullOnDelete();
            $table->foreign('kategori_id')->references('id')->on('kategori_produk')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
