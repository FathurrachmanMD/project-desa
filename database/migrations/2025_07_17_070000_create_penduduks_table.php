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
        Schema::create('penduduk', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('config_id')->nullable();
            $table->string('nama');
            $table->string('nik')->unique();
            $table->string('id_kk')->nullable();
            $table->string('kk_level')->nullable();
            $table->string('id_rtm')->nullable();
            $table->string('rtm_level')->nullable();
            $table->enum('sex', ['L', 'P']);
            $table->string('tempatlahir')->nullable();
            $table->date('tanggallahir')->nullable();
            $table->unsignedBigInteger('agama_id')->nullable();
            $table->unsignedBigInteger('pendidikan_kk_id')->nullable();
            $table->unsignedBigInteger('pendidikan_sedang_id')->nullable();
            $table->unsignedBigInteger('pekerjaan_id')->nullable();
            $table->string('status_kawin')->nullable();
            $table->unsignedBigInteger('warganegara_id')->nullable();
            $table->string('dokumen_pasport')->nullable();
            $table->string('dokumen_kitas')->nullable();
            $table->string('ayah_nik')->nullable();
            $table->string('ibu_nik')->nullable();
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->string('foto')->nullable();
            $table->unsignedBigInteger('golongan_darah_id')->nullable();
            $table->unsignedBigInteger('id_cluster')->nullable();
            $table->string('status')->nullable();
            $table->text('alamat_sebelumnya')->nullable();
            $table->text('alamat_sekarang')->nullable();
            $table->string('status_dasar')->nullable();
            $table->boolean('hamil')->nullable();
            $table->unsignedBigInteger('cacat_id')->nullable();
            $table->unsignedBigInteger('sakit_menahun_id')->nullable();
            $table->string('akta_lahir')->nullable();
            $table->string('akta_perkawinan')->nullable();
            $table->date('tanggalperkawinan')->nullable();
            $table->string('akta_perceraian')->nullable();
            $table->date('tanggalperceraian')->nullable();
            $table->unsignedBigInteger('cara_kb_id')->nullable();
            $table->string('telepon')->nullable();
            $table->date('tanggal_akhir_paspor')->nullable();
            $table->string('no_kk_sebelumnya')->nullable();
            $table->boolean('ktp_el')->nullable();
            $table->string('status_rekam')->nullable();
            $table->time('waktu_lahir')->nullable();
            $table->string('tempat_dilahirkan')->nullable();
            $table->string('jenis_kelahiran')->nullable();
            $table->integer('kelahiran_anak_ke')->nullable();
            $table->string('penolong_kelahiran')->nullable();
            $table->float('berat_lahir')->nullable();
            $table->float('panjang_lahir')->nullable();
            $table->string('tag_id_card')->nullable();
            $table->unsignedBigInteger('id_asuransi')->nullable();
            $table->string('no_asuransi')->nullable();
            $table->string('email')->nullable();
            $table->string('email_token')->nullable();
            $table->date('email_tgl_kadaluarsa')->nullable();
            $table->dateTime('email_tgl_verifikasi')->nullable();
            $table->string('telegram')->nullable();
            $table->string('telegram_token')->nullable();
            $table->date('telegram_tgl_kadaluarsa')->nullable();
            $table->dateTime('telegram_tgl_verifikasi')->nullable();
            $table->unsignedBigInteger('bahasa_id')->nullable();
            $table->text('ket')->nullable();
            $table->string('negara_asal')->nullable();
            $table->string('tempat_cetak_ktp')->nullable();
            $table->date('tanggal_cetak_ktp')->nullable();
            $table->string('suku')->nullable();
            $table->boolean('bpjs_ketenagakerjaan')->nullable();
            $table->string('hubung_warga')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penduduk');
    }
};
