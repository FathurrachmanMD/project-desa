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
            $table->unsignedBigInteger('penduduk_id')->nullable()->index(); // relasi ke penduduk

            $table->string('telepon', 20)->nullable();
            $table->string('lat', 20)->nullable();
            $table->string('lng', 20)->nullable();

            $table->tinyInteger('zoom')->default(10);
            $table->boolean('status')->default(true); // tinyint(1)

            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();

            $table->foreign('penduduk_id')->references('id')->on('penduduk')->nullOnDelete();
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
