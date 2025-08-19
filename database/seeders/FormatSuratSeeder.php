<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class FormatSuratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Definisikan style umum untuk konsistensi
        $container_style = "width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #000;";
        $header_style = "text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px;";
        $title_style = "font-size: 16px; font-weight: bold; text-decoration: underline; text-align: center; margin-bottom: 5px;";
        $nomor_style = "text-align: center; margin-top:0px; margin-bottom: 30px;";
        $table_style = "width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;";
        $td_key_style = "padding: 5px; vertical-align: top; width: 35%;";
        $td_val_style = "padding: 5px; vertical-align: top;";
        $footer_style = "margin-top: 50px; text-align: right; width: 40%; float: right;";
        $signature_style = "margin-top: 80px;";

        $formats = [
            // =================================================================
            // Kategori 1: USAHA
            // =================================================================
            ['kategori_id' => 1, 'nama' => 'Surat Keterangan Usaha (SKU)', 'slug' => 'sku', 'deskripsi' => 'Surat keterangan yang menyatakan keberadaan usaha',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN USAHA</h4>
                    <p style="'.$nomor_style.'">Nomor: 474/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, Kecamatan Paseh, Kabupaten Bandung, menerangkan dengan sesungguhnya bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Nomor HP</td><td style="'.$td_val_style.'">: {nomor_hp}</td></tr>
                    </table>
                    <p>Nama tersebut di atas adalah benar penduduk desa kami dan memiliki usaha sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Usaha</td><td style="'.$td_val_style.'">: <strong>{nama_usaha}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Usaha</td><td style="'.$td_val_style.'">: {jenis_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Usaha</td><td style="'.$td_val_style.'">: {alamat_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Lama Usaha</td><td style="'.$td_val_style.'">: {lama_usaha}</td></tr>
                    </table>
                    <p>Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
                    <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'lama_usaha', 'label' => 'Lama Usaha', 'placeholder' => 'Contoh: 2 Tahun', 'type' => 'text', 'required' => true],
            ]],
            
            ['kategori_id' => 1, 'nama' => 'Izin Usaha Mikro Kecil (IUMK)', 'slug' => 'iumk', 'deskripsi' => 'Izin untuk usaha mikro dan kecil',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">IZIN USAHA MIKRO DAN KECIL (IUMK)</h2>
                    </div>
                    <p style="'.$nomor_style.'">Nomor: 503/{no_surat}/IUMK/{bulan_romawi}/{tahun}</p>
                    <p>Berdasarkan Peraturan Presiden Nomor 98 Tahun 2014 tentang Perizinan untuk Usaha Mikro dan Kecil, dengan ini Camat Paseh setelah memperhatikan surat permohonan dari yang bersangkutan, memberikan Izin Usaha Mikro dan Kecil kepada:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: [Alamat Pemohon Sesuai KTP]</td></tr>
                        <tr><td style="'.$td_key_style.'">Nomor HP</td><td style="'.$td_val_style.'">: {nomor_hp}</td></tr>
                    </table>
                    <p>Untuk mendirikan Usaha Mikro dan Kecil yang mencakup perizinan dasar, dengan data sebagai berikut:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Usaha</td><td style="'.$td_val_style.'">: <strong>{nama_usaha}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Usaha</td><td style="'.$td_val_style.'">: {jenis_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Usaha</td><td style="'.$td_val_style.'">: {alamat_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Modal Usaha</td><td style="'.$td_val_style.'">: {modal_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Tempat Usaha</td><td style="'.$td_val_style.'">: {status_tempat_usaha}</td></tr>
                    </table>
                    <p>Izin ini berlaku selama yang bersangkutan masih menjalankan usahanya dan wajib melakukan pendaftaran ulang setiap 5 (lima) tahun sekali. Demikian Izin Usaha Mikro dan Kecil ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Ditetapkan di: Paseh</p>
                        <p>Pada tanggal: {tanggal_surat}</p>
                        <p>Camat Paseh</p>
                        <div style="'.$signature_style.'"><strong>( Asep Darajat )</strong><br/>NIP. .........................</div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'modal_usaha', 'label' => 'Modal Usaha', 'placeholder' => 'Masukkan Modal Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'status_tempat_usaha', 'label' => 'Status Tempat Usaha', 'type' => 'select', 'required' => true, 'options' => ['Sewa', 'Milik Sendiri']],
            ]],

            ['kategori_id' => 1, 'nama' => 'Surat Izin Tempat Usaha (SITU)', 'slug' => 'situ', 'deskripsi' => 'Izin yang menyatakan keabsahan lokasi tempat usaha',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">SURAT IZIN TEMPAT USAHA (SITU)</h2>
                    </div>
                    <p style="'.$nomor_style.'">Nomor: 503/{no_surat}/SITU/{bulan_romawi}/{tahun}</p>
                    <p>Berdasarkan Peraturan Daerah Kabupaten Bandung Nomor [Nomor Perda] Tahun [Tahun Perda] tentang Izin Gangguan dan Izin Tempat Usaha, dengan ini diberikan Izin Tempat Usaha kepada:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Nama Usaha</td><td style="'.$td_val_style.'">: <strong>{nama_usaha}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Usaha</td><td style="'.$td_val_style.'">: {jenis_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Usaha</td><td style="'.$td_val_style.'">: {alamat_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Tanah</td><td style="'.$td_val_style.'">: {status_tanah}</td></tr>
                    </table>
                    <p>Izin ini diberikan dengan ketentuan bahwa pemegang izin wajib mematuhi peraturan perundang-undangan yang berlaku, dan izin ini berlaku selama 3 (tiga) tahun serta dapat diperpanjang kembali.</p>
                     <p>Rekomendasi dari RT/RW setempat telah diterima ({rekom_rt_rw}).</p>
                    <p>Demikian Surat Izin Tempat Usaha ini dikeluarkan untuk dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Dikeluarkan di: Paseh</p>
                        <p>Pada tanggal: {tanggal_surat}</p>
                        <p>Atas Nama Bupati Bandung<br>Camat Paseh</p>
                        <div style="'.$signature_style.'"><strong>( Asep Darajat )</strong><br/>NIP. .........................</div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'alamat_usaha', 'label' => 'Alamat Usaha', 'placeholder' => 'Masukkan Alamat Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sewa', 'Hibah', 'Milik Sendiri']],
                ['name' => 'rekom_rt_rw', 'label' => 'Rekomendasi RT/RW', 'type' => 'select', 'required' => true, 'options' => ['Sudah', 'Belum']],
            ]],

            ['kategori_id' => 1, 'nama' => 'Surat Pengantar Nomor Induk Berusaha (NIB)', 'slug' => 'nib', 'deskripsi' => 'Surat Pengantar untuk mengurus NIB melalui sistem OSS.',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT PENGANTAR</h4>
                    <p style="'.$nomor_style.'">Nomor: 500/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, dengan ini memberikan surat pengantar kepada:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Nomor HP</td><td style="'.$td_val_style.'">: {nomor_hp}</td></tr>
                        <tr><td style="'.$td_key_style.'">Nama Usaha</td><td style="'.$td_val_style.'">: {nama_usaha}</td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Usaha</td><td style="'.$td_val_style.'">: {jenis_usaha}</td></tr>
                    </table>
                    <p>Adalah benar warga kami yang akan melakukan pendaftaran Nomor Induk Berusaha (NIB) melalui sistem Online Single Submission (OSS) dengan tujuan untuk <strong>{tujuan}</strong>.</p>
                    <p>Surat pengantar ini dibuat sebagai salah satu kelengkapan administrasi yang diperlukan. Mohon kepada pihak yang berkepentingan untuk memberikan bantuan dan fasilitas seperlunya.</p>
                    <p>Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nama_usaha', 'label' => 'Nama Usaha', 'placeholder' => 'Masukkan Nama Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'jenis_usaha', 'label' => 'Jenis Usaha', 'placeholder' => 'Masukkan Jenis Usaha', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan', 'label' => 'Tujuan Pendaftaran NIB', 'placeholder' => 'Contoh: Legalitas Usaha', 'type' => 'text', 'required' => true],
            ]],

            // =================================================================
            // Kategori 2: BANGUNAN & TANAH
            // =================================================================
            ['kategori_id' => 2, 'nama' => 'Keterangan Permohonan IMB / PBG', 'slug' => 'imb', 'deskripsi' => 'Surat keterangan dari desa untuk pengajuan IMB/PBG.',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN PERMOHONAN<br>PERSETUJUAN BANGUNAN GEDUNG (PBG)</h4>
                    <p style="'.$nomor_style.'">Nomor: 648/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan bahwa:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Pemohon</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                        <tr><td style="'.$td_key_style.'">Nomor HP / Email</td><td style="'.$td_val_style.'">: {nomor_hp} / {email}</td></tr>
                    </table>
                    <p>Benar nama tersebut di atas bermaksud untuk mendirikan bangunan pada sebidang tanah dengan rincian sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Tanah</td><td style="'.$td_val_style.'">: {alamat_tanah}</td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Tanah</td><td style="'.$td_val_style.'">: {luas_tanah} {satuan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Tanah</td><td style="'.$td_val_style.'">: {status_tanah} (No. {nomor_sertifikat})</td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Bangunan</td><td style="'.$td_val_style.'">: {jenis_bangunan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Rencana Luas Bangunan</td><td style="'.$td_val_style.'">: {luas_bangunan} m²</td></tr>
                        <tr><td style="'.$td_key_style.'">Rencana Tinggi Bangunan</td><td style="'.$td_val_style.'">: {tinggi_bangunan} meter</td></tr>
                        <tr><td style="'.$td_key_style.'">Rencana Jumlah Lantai</td><td style="'.$td_val_style.'">: {jumlah_lantai} lantai</td></tr>
                    </table>
                    <p>Berdasarkan sepengetahuan kami, tanah tersebut tidak dalam sengketa. Surat keterangan ini dibuat sebagai kelengkapan persyaratan untuk mengajukan Persetujuan Bangunan Gedung (PBG) kepada dinas terkait.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],

            ['kategori_id' => 2, 'nama' => 'Izin Bangun di Lahan Desa', 'slug' => 'lahan-desa', 'deskripsi' => 'Perizinan untuk membangun di lahan desa',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT IZIN MENDIRIKAN BANGUNAN DI LAHAN DESA</h4>
                    <p style="'.$nomor_style.'">Nomor: 648/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Setelah meninjau permohonan dari:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Pemohon</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Maka dengan ini, Pemerintah Desa Drawati memberikan izin untuk mendirikan bangunan di atas tanah milik desa (tanah kas desa) dengan rincian sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Tanah</td><td style="'.$td_val_style.'">: {alamat_tanah}</td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Tanah</td><td style="'.$td_val_style.'">: {luas_tanah} {satuan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Tanah</td><td style="'.$td_val_style.'">: {status_tanah} (No. {nomor_sertifikat})</td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Bangunan</td><td style="'.$td_val_style.'">: {jenis_bangunan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Rencana Luas Bangunan</td><td style="'.$td_val_style.'">: {luas_bangunan} m²</td></tr>
                    </table>
                    <p>Izin ini diberikan dengan syarat pemegang izin wajib mematuhi segala peraturan desa yang berlaku dan menggunakan bangunan sesuai dengan peruntukannya. Izin ini dapat ditinjau kembali apabila di kemudian hari ditemukan pelanggaran.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],

            ['kategori_id' => 2, 'nama' => 'Surat Tidak Sengketa Tanah', 'slug' => 'tidak-sengketa', 'deskripsi' => 'Surat pernyataan tidak adanya sengketa tanah',
            'template' => '
                <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT PERNYATAAN TIDAK SENGKETA</h4>
                    <p style="'.$nomor_style.'">Nomor: 593/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Dengan ini menyatakan dengan sebenarnya bahwa saya adalah pemilik sah atas sebidang tanah yang terletak di:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Tanah</td><td style="'.$td_val_style.'">: {alamat_tanah}</td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Tanah</td><td style="'.$td_val_style.'">: {luas_tanah} {satuan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Kepemilikan</td><td style="'.$td_val_style.'">: {status_tanah} (No. {nomor_sertifikat})</td></tr>
                    </table>
                    <p>Saya menyatakan bahwa tanah tersebut hingga saat ini tidak dalam keadaan sengketa, tidak menjadi jaminan utang-piutang, dan tidak sedang dalam proses hukum apapun dengan pihak lain.</p>
                    <p>Apabila di kemudian hari pernyataan ini terbukti tidak benar, saya bersedia dituntut sesuai dengan hukum yang berlaku.</p>
                     <div style="width: 100%; display: table; margin-top: 50px;">
                        <div style="display: table-cell; text-align: center;">
                             <p>Mengetahui,<br>Kepala Desa Drawati</p>
                            <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                        </div>
                        <div style="display: table-cell; text-align: center;">
                            <p>Drawati, {tanggal_surat}<br>Yang Membuat Pernyataan,</p>
                             <div style="margin-top: 65px; padding: 5px; border: 1px solid #000; width: 100px; margin-left: auto; margin-right: auto;">Materai 10000</div>
                            <div style="margin-top: 5px;"><strong>( {nama} )</strong></div>
                        </div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
            ]],

            ['kategori_id' => 2, 'nama' => 'Izin Renovasi atau Perluasan Bangunan', 'slug' => 'renovasi', 'deskripsi' => 'Perizinan untuk renovasi atau memperluas bangunan',
            'template' => '
                <div style="'.$container_style.'">
                    <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN IZIN RENOVASI/PERLUASAN BANGUNAN</h4>
                    <p style="'.$nomor_style.'">Nomor: 648/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan bahwa kami telah menerima permohonan dan tidak keberatan atas rencana renovasi/perluasan bangunan yang diajukan oleh:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Pemohon</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Adapun rincian bangunan yang akan direnovasi/diperluas adalah sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Bangunan</td><td style="'.$td_val_style.'">: {alamat_tanah}</td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Bangunan</td><td style="'.$td_val_style.'">: {jenis_bangunan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Bangunan Semula</td><td style="'.$td_val_style.'">: [Informasi Luas Semula] m²</td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Tambahan</td><td style="'.$td_val_style.'">: [Informasi Luas Tambahan] m²</td></tr>
                        <tr><td style="'.$td_key_style.'">Total Luas Bangunan</td><td style="'.$td_val_style.'">: {luas_bangunan} m²</td></tr>
                    </table>
                    <p>Surat keterangan ini dibuat untuk melengkapi persyaratan perizinan lebih lanjut ke tingkat kecamatan atau dinas terkait. Pemohon diharapkan tetap mematuhi peraturan yang berlaku selama proses renovasi/perluasan berlangsung.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'nomor_hp', 'label' => 'Nomor HP', 'placeholder' => 'Masukkan Nomor HP Anda..', 'type' => 'tel', 'required' => true],
                ['name' => 'email', 'label' => 'Email', 'placeholder' => 'Masukkan Email Anda..', 'type' => 'email', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Anda..', 'type' => 'textarea', 'required' => true],
                ['name' => 'alamat_tanah', 'label' => 'Alamat Tanah', 'placeholder' => 'Masukkan Alamat Tanah..', 'type' => 'text', 'required' => true],
                ['name' => 'luas_tanah', 'label' => 'Luas Tanah', 'placeholder' => 'Contoh: 200', 'type' => 'number', 'required' => true],
                ['name' => 'satuan', 'label' => 'Satuan Luas', 'type' => 'select', 'required' => true, 'options' => ['m²', 'ha']],
                ['name' => 'status_tanah', 'label' => 'Status Tanah', 'type' => 'select', 'required' => true, 'options' => ['Sertifikat Hak Milik', 'Hak Guna Bangunan', 'Hak Guna Usaha', 'Sewa Menyewa', 'Lainnya']],
                ['name' => 'nomor_sertifikat', 'label' => 'Nomor Sertifikat', 'placeholder' => 'Masukkan Nomor Sertifikat', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_bangunan', 'label' => 'Jenis Bangunan', 'type' => 'select', 'required' => true, 'options' => ['Rumah Tinggal', 'Kantor', 'Toko', 'Industri', 'Sosial']],
                ['name' => 'luas_bangunan', 'label' => 'Luas Bangunan (m2)', 'placeholder' => 'Contoh: 150', 'type' => 'number', 'required' => true],
                ['name' => 'tinggi_bangunan', 'label' => 'Tinggi Bangunan (meter)', 'placeholder' => 'Contoh: 10', 'type' => 'number', 'required' => true],
                ['name' => 'jumlah_lantai', 'label' => 'Jumlah Lantai', 'placeholder' => 'Contoh: 2', 'type' => 'number', 'required' => true],
            ]],

            // =================================================================
            // Kategori 3: ACARA & FASILITAS UMUM
            // =================================================================
            ['kategori_id' => 3, 'nama' => 'Surat Izin Hajatan', 'slug' => 'hajatan', 'deskripsi' => 'Izin penyelenggaraan hajatan atau acara keluarga',
            'template' => '
                <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT IZIN KERAMAIAN / HAJATAN</h4>
                    <p style="'.$nomor_style.'">Nomor: 300/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Berdasarkan permohonan dari:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                        <tr><td style="'.$td_key_style.'">Narahubung</td><td style="'.$td_val_style.'">: {narahubung}</td></tr>
                    </table>
                    <p>Dengan ini, Pemerintah Desa Drawati memberikan izin untuk menyelenggarakan acara keramaian/hajatan dengan rincian sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Jenis Acara</td><td style="'.$td_val_style.'">: <strong>{jenis_acara}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Tanggal Acara</td><td style="'.$td_val_style.'">: {tanggal_acara}</td></tr>
                        <tr><td style="'.$td_key_style.'">Waktu</td><td style="'.$td_val_style.'">: {waktu_mulai} s/d {waktu_selesai} WIB</td></tr>
                        <tr><td style="'.$td_key_style.'">Durasi</td><td style="'.$td_val_style.'">: {durasi}</td></tr>
                        <tr><td style="'.$td_key_style.'">Lokasi Acara</td><td style="'.$td_val_style.'">: {lokasi_acara}</td></tr>
                        <tr><td style="'.$td_key_style.'">Perkiraan Jumlah Tamu</td><td style="'.$td_val_style.'">: {perkiraan_tamu} orang</td></tr>
                    </table>
                    <p>Pemegang izin berkewajiban untuk menjaga ketertiban, keamanan, dan kebersihan selama acara berlangsung. Surat ini juga sebagai pengantar untuk perizinan lebih lanjut ke pihak Kepolisian (Polsek).</p>
                    <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Pemohon', 'placeholder' => 'Masukkan Alamat Lengkap Anda', 'type' => 'text', 'required' => true],
                ['name' => 'jenis_acara', 'label' => 'Jenis Acara', 'placeholder' => 'Contoh: Pernikahan, Sunatan, dll.', 'type' => 'text', 'required' => true],
                ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                ['name' => 'tanggal_acara', 'label' => 'Tanggal Acara', 'type' => 'date', 'required' => true],
                ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                ['name' => 'lokasi_acara', 'label' => 'Lokasi Acara', 'placeholder' => 'Masukkan Lokasi Acara', 'type' => 'text', 'required' => true],
                ['name' => 'perkiraan_tamu', 'label' => 'Perkiraan Jumlah Tamu', 'placeholder' => 'Contoh: 100', 'type' => 'number', 'required' => true],
            ]],

            ['kategori_id' => 3, 'nama' => 'Surat Izin Acara Publik', 'slug' => 'acara-publik', 'deskripsi' => 'Izin penyelenggaraan acara untuk umum',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT REKOMENDASI IZIN ACARA PUBLIK</h4>
                    <p style="'.$nomor_style.'">Nomor: 300/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Menindaklanjuti permohonan dari:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Penanggung Jawab</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Narahubung</td><td style="'.$td_val_style.'">: {narahubung}</td></tr>
                    </table>
                    <p>Pemerintah Desa Drawati pada prinsipnya tidak keberatan dan memberikan rekomendasi untuk penyelenggaraan acara publik sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Tujuan Acara</td><td style="'.$td_val_style.'">: <strong>{tujuan_acara}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Tanggal Acara</td><td style="'.$td_val_style.'">: {tanggal_acara}</td></tr>
                        <tr><td style="'.$td_key_style.'">Waktu</td><td style="'.$td_val_style.'">: {waktu_mulai} s/d {waktu_selesai} WIB</td></tr>
                        <tr><td style="'.$td_key_style.'">Lokasi Acara</td><td style="'.$td_val_style.'">: {lokasi_acara}</td></tr>
                        <tr><td style="'.$td_key_style.'">Perkiraan Jumlah Peserta</td><td style="'.$td_val_style.'">: {perkiraan_tamu} orang</td></tr>
                    </table>
                    <p>Surat rekomendasi ini dibuat sebagai pengantar untuk mengurus perizinan lebih lanjut kepada pihak Kepolisian dan/atau instansi terkait lainnya. Penyelenggara acara bertanggung jawab penuh atas keamanan dan ketertiban selama acara.</p>
                    <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                ['name' => 'tujuan_acara', 'label' => 'Tujuan Acara', 'placeholder' => 'Tuliskan Deskripsi Singkat', 'type' => 'textarea', 'required' => true],
                ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                ['name' => 'tanggal_acara', 'label' => 'Tanggal Acara', 'type' => 'date', 'required' => true],
                ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                ['name' => 'lokasi_acara', 'label' => 'Lokasi Acara', 'placeholder' => 'Masukkan Lokasi Acara', 'type' => 'text', 'required' => true],
                ['name' => 'perkiraan_tamu', 'label' => 'Perkiraan Jumlah Tamu', 'placeholder' => 'Contoh: 100', 'type' => 'number', 'required' => true],
            ]],

            ['kategori_id' => 3, 'nama' => 'Izin Penggunaan Sarana Umum Desa', 'slug' => 'sarana-umum', 'deskripsi' => 'Izin penggunaan fasilitas umum milik desa',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT IZIN PENGGUNAAN FASILITAS DESA</h4>
                    <p style="'.$nomor_style.'">Nomor: 420/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Berdasarkan permohonan yang diajukan oleh:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Narahubung</td><td style="'.$td_val_style.'">: {narahubung}</td></tr>
                    </table>
                    <p>Dengan ini Pemerintah Desa Drawati memberikan izin untuk menggunakan fasilitas milik desa dengan rincian sebagai berikut:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Fasilitas yang Digunakan</td><td style="'.$td_val_style.'">: <strong>{lokasi_fasilitas}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Tujuan Penggunaan</td><td style="'.$td_val_style.'">: {tujuan_penggunaan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Tanggal Penggunaan</td><td style="'.$td_val_style.'">: {tanggal_penggunaan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Waktu</td><td style="'.$td_val_style.'">: {waktu_mulai} s/d {waktu_selesai} WIB</td></tr>
                        <tr><td style="'.$td_key_style.'">Durasi</td><td style="'.$td_val_style.'">: {durasi}</td></tr>
                    </table>
                    <p>Peminjam bertanggung jawab penuh atas kebersihan, keamanan, dan keutuhan fasilitas yang digunakan. Segala kerusakan yang timbul menjadi tanggung jawab peminjam.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda..', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda..', 'type' => 'text', 'required' => true, 'minLength' => 16, 'maxLength' => 16, 'pattern' => '/^\d{16}$/', 'inputMode' => 'numeric'],
                ['name' => 'narahubung', 'label' => 'Kontak Narahubung', 'placeholder' => 'Masukkan Nomor HP yang Bisa Dihubungi', 'type' => 'tel', 'required' => true],
                ['name' => 'tujuan_penggunaan', 'label' => 'Tujuan Penggunaan', 'placeholder' => 'Tuliskan Deskripsi Singkat', 'type' => 'textarea', 'required' => true],
                ['name' => 'durasi', 'label' => 'Durasi', 'placeholder' => 'Contoh: 2 jam atau 3 hari', 'type' => 'text', 'required' => true],
                ['name' => 'tanggal_penggunaan', 'label' => 'Tanggal penggunaan', 'type' => 'date', 'required' => true],
                ['name' => 'waktu_mulai', 'label' => 'Waktu Mulai', 'type' => 'time', 'required' => true],
                ['name' => 'waktu_selesai', 'label' => 'Waktu Selesai', 'type' => 'time', 'required' => true],
                ['name' => 'lokasi_fasilitas', 'label' => 'Lokasi Fasilitas', 'placeholder' => 'Masukkan Lokasi Fasilitas Desa', 'type' => 'text', 'required' => true]
            ]],

            // =================================================================
            // Kategori 4: KEPENDUDUKAN
            // =================================================================
            ['kategori_id' => 4, 'nama' => 'Surat Pengantar SKCK', 'slug' => 'pengantar-skck', 'deskripsi' => 'Surat pengantar untuk membuat Surat Keterangan Catatan Kepolisian',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT PENGANTAR<br>CATATAN KEPOLISIAN (SKCK)</h4>
                    <p style="'.$nomor_style.'">Nomor: 331/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Tempat, Tgl Lahir</td><td style="'.$td_val_style.'">: [Tempat Lahir], [Tanggal Lahir]</td></tr>
                        <tr><td style="'.$td_key_style.'">Jenis Kelamin</td><td style="'.$td_val_style.'">: [Jenis Kelamin]</td></tr>
                        <tr><td style="'.$td_key_style.'">Agama</td><td style="'.$td_val_style.'">: [Agama]</td></tr>
                        <tr><td style="'.$td_key_style.'">Status Perkawinan</td><td style="'.$td_val_style.'">: [Status Perkawinan]</td></tr>
                        <tr><td style="'.$td_key_style.'">Pekerjaan</td><td style="'.$td_val_style.'">: [Pekerjaan]</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: [Alamat Lengkap Sesuai KTP]</td></tr>
                    </table>
                    <p>Nama tersebut di atas adalah benar penduduk Desa Drawati dan berkelakuan baik di lingkungan kami. Surat pengantar ini dibuat sebagai kelengkapan untuk mengurus SKCK di Polsek [Nama Polsek] dengan tujuan untuk <strong>{tujuan_skck}</strong> di <strong>{tempat_tujuan}</strong>.</p>
                    <p>Demikian surat pengantar ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan Nomor Induk Kependudukan', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_skck', 'label' => 'Tujuan SKCK', 'placeholder' => 'Masukkan Tujuan Pembuatan SKCK', 'type' => 'text', 'required' => true],
                ['name' => 'tempat_tujuan', 'label' => 'Tempat Tujuan SKCK', 'placeholder' => 'Masukkan Tempat Tujuan', 'type' => 'text', 'required' => true]
            ]],

            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Domisili', 'slug' => 'keterangan-domisili', 'deskripsi' => 'Surat keterangan tempat tinggal resmi',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN DOMISILI</h4>
                    <p style="'.$nomor_style.'">Nomor: 474/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan dengan sesungguhnya bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Tempat, Tgl Lahir</td><td style="'.$td_val_style.'">: [Tempat Lahir], [Tanggal Lahir]</td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: [NIK Pemohon]</td></tr>
                         <tr><td style="'.$td_key_style.'">Alamat KTP</td><td style="'.$td_val_style.'">: [Alamat Sesuai KTP]</td></tr>
                    </table>
                    <p>Adalah benar saat ini berdomisili atau bertempat tinggal di:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Domisili</td><td style="'.$td_val_style.'">: <strong>{alamat}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">RT/RW</td><td style="'.$td_val_style.'">: {rt_rw}</td></tr>
                        <tr><td style="'.$td_key_style.'">Desa/Kelurahan</td><td style="'.$td_val_style.'">: Drawati</td></tr>
                        <tr><td style="'.$td_key_style.'">Kecamatan</td><td style="'.$td_val_style.'">: Paseh</td></tr>
                        <tr><td style="'.$td_key_style.'">Lama Tinggal</td><td style="'.$td_val_style.'">: {lama_tinggal}</td></tr>
                    </table>
                    <p>Surat keterangan ini dibuat berdasarkan data yang ada pada kami dan sepengetahuan kami yang bersangkutan adalah warga yang berdomisili di wilayah kami.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat Domisili', 'placeholder' => 'Masukkan Alamat Domisili', 'type' => 'text', 'required' => true],
                ['name' => 'lama_tinggal', 'label' => 'Lama Tinggal', 'placeholder' => 'Masukkan Lama Tinggal (misal: 2 tahun)', 'type' => 'text', 'required' => true],
                ['name' => 'rt_rw', 'label' => 'RT/RW', 'placeholder' => 'Contoh: 04/09', 'type' => 'text', 'required' => true],
            ]],

            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Pendatang', 'slug' => 'izin-tinggal-pendatang', 'deskripsi' => 'Surat keterangan lapor diri untuk pendatang',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN PENDATANG</h4>
                    <p style="'.$nomor_style.'">Nomor: 475/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan bahwa kami telah menerima laporan kedatangan dari seorang warga:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: [NIK Pendatang]</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat Asal</td><td style="'.$td_val_style.'">: {alamat_asal}</td></tr>
                    </table>
                    <p>Yang bersangkutan telah melaporkan diri dan untuk sementara waktu akan tinggal di wilayah Desa Drawati dengan rincian:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Alamat Tujuan</td><td style="'.$td_val_style.'">: [Alamat Tujuan di Desa]</td></tr>
                        <tr><td style="'.$td_key_style.'">RT/RW Tujuan</td><td style="'.$td_val_style.'">: {rt_rw_tujuan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Tujuan Tinggal</td><td style="'.$td_val_style.'">: {tujuan_pindah}</td></tr>
                        <tr><td style="'.$td_key_style.'">Penjamin/Keluarga</td><td style="'.$td_val_style.'">: [Nama Penjamin/Keluarga]</td></tr>
                    </table>
                    <p>Surat keterangan ini sebagai bukti lapor diri dan berlaku selama 1 (satu) bulan sejak tanggal diterbitkan. Yang bersangkutan wajib menjaga tata tertib dan norma yang berlaku di masyarakat.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Pendatang', 'type' => 'text', 'required' => true],
                ['name' => 'alamat_asal', 'label' => 'Alamat Asal', 'placeholder' => 'Masukkan Alamat Asal', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_pindah', 'label' => 'Tujuan Pindah', 'placeholder' => 'Masukkan Tujuan Pindah', 'type' => 'text', 'required' => true],
                ['name' => 'rt_rw_tujuan', 'label' => 'RT/RW Tujuan', 'placeholder' => 'Contoh: 01/05', 'type' => 'text', 'required' => true],
            ]],

            ['kategori_id' => 4, 'nama' => 'Surat Izin Keluar Negeri', 'slug' => 'izin-keluar-negeri', 'deskripsi' => 'Surat izin untuk keperluan keluar negeri',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN UNTUK KEPERLUAN KE LUAR NEGERI</h4>
                    <p style="'.$nomor_style.'">Nomor: 478/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: [NIK Pemohon]</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: [Alamat Lengkap Sesuai KTP]</td></tr>
                    </table>
                    <p>Adalah benar warga kami yang akan melakukan perjalanan ke luar negeri dengan rincian sebagai berikut:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Tujuan Keberangkatan</td><td style="'.$td_val_style.'">: <strong>{tujuan_keberangkatan}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Negara Tujuan</td><td style="'.$td_val_style.'">: {negara_tujuan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Periode/Waktu</td><td style="'.$td_val_style.'">: {periode}</td></tr>
                    </table>
                    <p>Surat keterangan ini dibuat sebagai salah satu syarat dalam pengurusan dokumen perjalanan (Paspor/Visa) di Kantor Imigrasi. Sepengetahuan kami, yang bersangkutan berkelakuan baik dan tidak terlibat masalah hukum.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_keberangkatan', 'label' => 'Tujuan Keberangkatan', 'placeholder' => 'Misal: Studi, Liburan, dll.', 'type' => 'text', 'required' => true],
                ['name' => 'negara_tujuan', 'label' => 'Negara Tujuan', 'placeholder' => 'Masukkan Negara Tujuan', 'type' => 'text', 'required' => true],
                ['name' => 'periode', 'label' => 'Periode/Waktu', 'placeholder' => 'Masukkan Periode Keberangkatan', 'type' => 'text', 'required' => true],
            ]],

            ['kategori_id' => 4, 'nama' => 'Surat Keterangan Tidak Bekerja', 'slug' => 'keterangan-tidak-bekerja', 'deskripsi' => 'Surat keterangan status tidak bekerja',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN TIDAK BEKERJA</h4>
                    <p style="'.$nomor_style.'">Nomor: 470/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan dengan sebenarnya bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: [NIK Pemohon]</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: [Alamat Lengkap Sesuai KTP]</td></tr>
                    </table>
                    <p>Berdasarkan data kependudukan dan sepengetahuan kami, nama tersebut di atas hingga saat ini benar <strong>TIDAK/BELUM BEKERJA</strong> atau tidak memiliki penghasilan tetap. Alasan tidak bekerja adalah: <strong>{alasan}</strong>.</p>
                    <p>Surat keterangan ini dibuat untuk keperluan <strong>{tujuan_surat}</strong>.</p>
                    <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Lengkap', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alasan', 'label' => 'Alasan Tidak Bekerja', 'placeholder' => 'Masukkan Alasan Tidak Bekerja', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan_surat', 'label' => 'Tujuan Surat', 'placeholder' => 'Contoh: Bantuan Sosial', 'type' => 'text', 'required' => true],
            ]],

            // =================================================================
            // Kategori 5: PERTANIAN
            // =================================================================
            ['kategori_id' => 5, 'nama' => 'Izin Pengelolaan Lahan', 'slug' => 'pengelolaan-lahan', 'deskripsi' => 'Izin pengelolaan lahan desa atau tanah negara untuk pertanian',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT IZIN PENGELOLAAN LAHAN</h4>
                    <p style="'.$nomor_style.'">Nomor: 521/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Berdasarkan hasil musyawarah desa dan permohonan dari:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Pemerintah Desa Drawati memberikan izin untuk mengelola lahan milik desa/negara dengan rincian sebagai berikut:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Lokasi Lahan</td><td style="'.$td_val_style.'">: <strong>{lokasi_lahan}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Lahan</td><td style="'.$td_val_style.'">: {luas_lahan} m²</td></tr>
                        <tr><td style="'.$td_key_style.'">Tujuan Pengelolaan</td><td style="'.$td_val_style.'">: {tujuan_pengelolaan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Durasi Izin</td><td style="'.$td_val_style.'">: {durasi_jumlah} {durasi_satuan}</td></tr>
                    </table>
                    <p>Izin ini diberikan dengan kewajiban bagi pengelola untuk menjaga kesuburan tanah, tidak merusak lingkungan, dan mengikuti arahan dari pemerintah desa terkait pengelolaan lahan. Izin ini dapat dicabut apabila ditemukan pelanggaran.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'lokasi_lahan', 'label' => 'Lokasi Lahan', 'placeholder' => 'Masukkan lokasi lahan yang akan dikelola', 'type' => 'text', 'required' => true],
                ['name' => 'luas_lahan', 'label' => 'Luas Lahan (m²)', 'placeholder' => 'Contoh: 1000', 'type' => 'number', 'required' => true],
                ['name' => 'tujuan_pengelolaan', 'label' => 'Tujuan Pengelolaan', 'placeholder' => 'Contoh: Pertanian, Perkebunan', 'type' => 'text', 'required' => true],
                ['name' => 'durasi_jumlah', 'label' => 'Durasi Pengelolaan', 'placeholder' => 'Contoh: 3', 'type' => 'number', 'required' => true],
                ['name' => 'durasi_satuan', 'label' => 'Satuan Durasi', 'type' => 'select', 'options' => ['Bulan', 'Tahun'], 'required' => true],
            ]],

            ['kategori_id' => 5, 'nama' => 'Rekomendasi Bantuan Pertanian', 'slug' => 'permohonan-bantuan', 'deskripsi' => 'Rekomendasi desa untuk permohonan bantuan pertanian',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT REKOMENDASI PERMOHONAN BANTUAN PERTANIAN</h4>
                    <p style="'.$nomor_style.'">Nomor: 521/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, dengan ini memberikan rekomendasi kepada:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                        <tr><td style="'.$td_key_style.'">Pengalaman Bertani</td><td style="'.$td_val_style.'">: {pengalaman}</td></tr>
                    </table>
                    <p>Bahwa nama tersebut di atas adalah benar seorang petani di wilayah kami yang aktif dan layak untuk dipertimbangkan mendapatkan bantuan pertanian dari Dinas Pertanian Kabupaten Bandung. Adapun rincian permohonan bantuan adalah sebagai berikut:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Jenis Bantuan</td><td style="'.$td_val_style.'">: <strong>{jenis_bantuan}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Jumlah/Kebutuhan</td><td style="'.$td_val_style.'">: {kebutuhan}</td></tr>
                        <tr><td style="'.$td_key_style.'">Tujuan Penggunaan</td><td style="'.$td_val_style.'">: {tujuan}</td></tr>
                    </table>
                    <p>Demikian surat rekomendasi ini kami buat untuk menjadi bahan pertimbangan bagi pihak terkait. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'jenis_bantuan', 'label' => 'Jenis Bantuan', 'type' => 'select', 'required' => true, 'options' => ['Pupuk', 'Bibit', 'Alat Pertanian', 'Lainnya']],
                ['name' => 'kebutuhan', 'label' => 'Jumlah/Kebutuhan', 'placeholder' => 'Contoh: 5 karung pupuk', 'type' => 'text', 'required' => true],
                ['name' => 'tujuan', 'label' => 'Tujuan Penggunaan', 'placeholder' => 'Contoh: Tanaman Padi', 'type' => 'text', 'required' => true],
                ['name' => 'pengalaman', 'label' => 'Pengalaman Bertani', 'type' => 'select', 'options' => ['Kurang dari 1 tahun', '1-3 tahun', 'Lebih dari 3 tahun'], 'required' => true],
            ]],

            ['kategori_id' => 5, 'nama' => 'Surat Keterangan Petani', 'slug' => 'surat-keterangan-petani', 'deskripsi' => 'Surat keterangan sebagai petani atau buruh tani',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT KETERANGAN PETANI</h4>
                    <p style="'.$nomor_style.'">Nomor: 521/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Yang bertanda tangan di bawah ini, Kepala Desa Drawati, menerangkan dengan sebenarnya bahwa:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Lengkap</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Adalah benar warga kami dan berdasarkan data yang kami miliki, yang bersangkutan berprofesi sebagai <strong>{status}</strong> dengan rincian:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Komoditas yang Ditanam</td><td style="'.$td_val_style.'">: {komoditas}</td></tr>
                        <tr><td style="'.$td_key_style.'">Lama Menjadi Petani</td><td style="'.$td_val_style.'">: {lama_bertani}</td></tr>
                        <tr><td style="'.$td_key_style.'">Lokasi Lahan Garapan</td><td style="'.$td_val_style.'">: [Lokasi Lahan]</td></tr>
                    </table>
                    <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['Petani Pemilik Lahan', 'Petani Penggarap', 'Buruh Tani'], 'required' => true],
                ['name' => 'komoditas', 'label' => 'Komoditas yang Ditanam', 'placeholder' => 'Contoh: Padi, Jagung', 'type' => 'text', 'required' => true],
                ['name' => 'lama_bertani', 'label' => 'Lama Menjadi Petani', 'placeholder' => 'Contoh: 5 Tahun', 'type' => 'text', 'required' => true],
            ]],

            ['kategori_id' => 5, 'nama' => 'Surat Izin Irigasi', 'slug' => 'surat-izin-irigasi', 'deskripsi' => 'Surat izin penggunaan air untuk keperluan pertanian',
            'template' => '
                 <div style="'.$container_style.'">
                     <div style="'.$header_style.'">
                        <h3 style="margin: 0;">PEMERINTAH KABUPATEN BANDUNG</h3>
                        <h3 style="margin: 0;">KECAMATAN PASEH</h3>
                        <h2 style="margin: 0;">KEPALA DESA DRAWATI</h2>
                        <p style="margin: 0; font-size: 12px;">Alamat: Jl. Sukasari No.01, Drawati, Kec. Paseh, Kabupaten Bandung, Jawa Barat | Email: 	info@drawati.desa.id | Telp: (022) 84224092</p>
                    </div>
                    <h4 style="'.$title_style.'">SURAT IZIN PENGAMBILAN AIR IRIGASI</h4>
                    <p style="'.$nomor_style.'">Nomor: 522/{no_surat}/DS/{bulan_romawi}/{tahun}</p>
                    <p>Setelah memperhatikan permohonan dari petani atas nama:</p>
                    <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Nama Pemohon</td><td style="'.$td_val_style.'">: <strong>{nama}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">NIK</td><td style="'.$td_val_style.'">: {nik}</td></tr>
                        <tr><td style="'.$td_key_style.'">Alamat</td><td style="'.$td_val_style.'">: {alamat}</td></tr>
                    </table>
                    <p>Dengan ini Pemerintah Desa Drawati memberikan izin untuk melakukan pengambilan air dari saluran irigasi desa untuk keperluan pertanian dengan rincian:</p>
                     <table style="'.$table_style.'">
                        <tr><td style="'.$td_key_style.'">Lokasi Lahan</td><td style="'.$td_val_style.'">: <strong>{lokasi_lahan}</strong></td></tr>
                        <tr><td style="'.$td_key_style.'">Luas Lahan</td><td style="'.$td_val_style.'">: {luas_lahan} m²</td></tr>
                        <tr><td style="'.$td_key_style.'">Tujuan Penggunaan Air</td><td style="'.$td_val_style.'">: {tujuan_irigasi}</td></tr>
                        <tr><td style="'.$td_key_style.'">Periode Izin</td><td style="'.$td_val_style.'">: {durasi_jumlah} {durasi_satuan}</td></tr>
                    </table>
                    <p>Pemegang izin wajib menggunakan air secara bijak, menjaga kebersihan saluran irigasi, dan berkoordinasi dengan petugas pengairan atau kelompok tani setempat. Izin ini tidak untuk diperjualbelikan.</p>
                     <div style="'.$footer_style.'">
                        <p>Drawati, {tanggal_surat}</p>
                        <p>Kepala Desa Drawati</p>
                        <div style="'.$signature_style.'"><strong>( Dadang Jukarsa )</strong></div>
                    </div>
                </div>
            ',
            'form_isian' => [
                ['name' => 'nama', 'label' => 'Nama Pemohon', 'placeholder' => 'Masukkan Nama Anda', 'type' => 'text', 'required' => true],
                ['name' => 'nik', 'label' => 'NIK', 'placeholder' => 'Masukkan NIK Anda', 'type' => 'text', 'required' => true],
                ['name' => 'alamat', 'label' => 'Alamat', 'placeholder' => 'Masukkan Alamat Anda', 'type' => 'textarea', 'required' => true],
                ['name' => 'lokasi_lahan', 'label' => 'Lokasi Lahan', 'placeholder' => 'Masukkan lokasi lahan yang akan dikelola', 'type' => 'text', 'required' => true],
                ['name' => 'luas_lahan', 'label' => 'Luas Lahan (m²)', 'placeholder' => 'Contoh: 1000', 'type' => 'number', 'required' => true],
                ['name' => 'tujuan_irigasi', 'label' => 'Tujuan Pengelolaan', 'placeholder' => 'Contoh: Pertanian, Perkebunan', 'type' => 'text', 'required' => true],
                ['name' => 'durasi_jumlah', 'label' => 'Durasi Pengelolaan', 'placeholder' => 'Contoh: 3', 'type' => 'number', 'required' => true],
                ['name' => 'durasi_satuan', 'label' => 'Satuan Durasi', 'type' => 'select', 'options' => ['Bulan', 'Tahun'], 'required' => true],
            ]],

            // =================================================================
            // Kategori 6: PRODUK (INTERNAL)
            // =================================================================
            [
                'kategori_id' => 6,
                'nama' => 'Pengajuan Produk Baru',
                'slug' => 'pengajuan-produk',
                'deskripsi' => 'Formulir untuk mengajukan produk baru untuk ditampilkan di Lapak Usaha Desa.',
                'template' => '
                    <div style="'.$container_style.'">
                        <div style="'.$header_style.'">
                            <h2 style="margin: 0;">FORMULIR PENGAJUAN PRODUK BARU</h2>
                            <p style="margin: 0; font-size: 12px;">Lapak Usaha Desa Drawati</p>
                        </div>
                        <h4 style="text-align:center; margin-bottom: 30px;">Data Pengajuan</h4>
                        <p>Berikut adalah rincian data pengajuan produk baru yang telah dikirimkan oleh pemilik usaha untuk diverifikasi oleh admin desa.</p>
                        <table style="'.$table_style.'">
                            <tr><td style="'.$td_key_style.'">Nama Lapak</td><td style="'.$td_val_style.'">: <strong>{lapak_id}</strong></td></tr>
                            <tr><td style="'.$td_key_style.'">Nama Produk</td><td style="'.$td_val_style.'">: <strong>{nama_produk}</strong></td></tr>
                            <tr><td style="'.$td_key_style.'">Harga Produk</td><td style="'.$td_val_style.'">: {harga_produk}</td></tr>
                            <tr><td style="'.$td_key_style.'">Kategori Produk</td><td style="'.$td_val_style.'">: {kategori_produk}</td></tr>
                            <tr><td style="'.$td_key_style.'">Deskripsi Produk</td><td style="'.$td_val_style.'">: {deskripsi_produk}</td></tr>
                        </table>
                        <p><strong>Lampiran:</strong></p>
                        <ul>
                            <li>Bukti Kepemilikan Usaha: <em>(File terlampir: {bukti_usaha})</em></li>
                            <li>Gambar Produk: <em>(File terlampir: {gambar_produk})</em></li>
                        </ul>
                        <p>Pengajuan ini akan ditinjau lebih lanjut. Pemohon akan dihubungi jika pengajuan disetujui atau jika diperlukan informasi tambahan. Terima kasih.</p>
                        <div style="'.$footer_style.'">
                            <p>Tanggal Pengajuan: {tanggal_surat}</p>
                            <p>Admin Desa Drawati</p>
                            <div style="'.$signature_style.'"><strong>( Verifikasi Sistem )</strong></div>
                        </div>
                    </div>
                ',
                'form_isian' => [
                    ['name' => 'lapak_id', 'label' => 'Nama Lapak', 'placeholder' => 'Cari dan pilih lapak Anda...', 'type' => 'searchable-select', 'required' => true, 'options_source' => 'lapak'],
                    ['name' => 'bukti_usaha', 'label' => 'Bukti Kepemilikan Usaha', 'type' => 'file', 'required' => true, 'accept' => 'image/png, image/jpeg, image/jpg', 'description' => 'Unggah foto SKU atau bukti lain. Mendukung format .png, .jpg, .jpeg.'],
                    ['name' => 'nama_produk', 'label' => 'Nama Produk', 'placeholder' => 'Masukkan nama produk Anda', 'type' => 'text', 'required' => true],
                    ['name' => 'harga_produk', 'label' => 'Harga', 'placeholder' => 'cth: Rp 15.000 / kg', 'type' => 'text', 'required' => true],
                    ['name' => 'kategori_produk', 'label' => 'Kategori Produk', 'type' => 'select', 'required' => true, 'options' => ['Pangan', 'Minuman', 'Kerajinan']],
                    ['name' => 'deskripsi_produk', 'label' => 'Deskripsi Produk', 'placeholder' => 'Jelaskan keunggulan produk Anda', 'type' => 'textarea', 'required' => true],
                    ['name' => 'gambar_produk', 'label' => 'Foto Produk', 'type' => 'file', 'required' => true, 'accept' => 'image/png, image/jpeg, image/jpg', 'description' => 'Unggah foto produk terbaik Anda. Mendukung format .png, .jpg, .jpeg.']
                ]
            ]
        ];

        // Looping untuk memasukkan data ke database
        foreach ($formats as $format) {
            DB::table('format_surat')->insert([
                'nama' => $format['nama'],
                'deskripsi' => $format['deskripsi'] ?? null,
                'kategori_id' => $format['kategori_id'],
                'url_surat' => $format['slug'] ?? Str::slug($format['nama']),
                'template' => isset($format['template']) ? trim($format['template']) : null,
                'form_isian' => isset($format['form_isian']) ? json_encode($format['form_isian']) : null,
                'created_by' => 1, // Default user ID
                'updated_by' => 1, // Default user ID
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}