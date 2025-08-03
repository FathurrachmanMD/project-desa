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
        Schema::table('produk', function (Blueprint $table) {
            $table->foreignId('lapak_user_id')->nullable()->after('lapak_id')->constrained('lapak_user')->onDelete('set null');
            $table->index('lapak_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produk', function (Blueprint $table) {
            $table->dropForeign(['lapak_user_id']);
            $table->dropColumn('lapak_user_id');
        });
    }
};
