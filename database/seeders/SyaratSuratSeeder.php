<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SyaratSuratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $syarat = [
            'Fotokopi KK',
            'Fotokopi KTP',
            'Fotokopi Surat Nikah/Akta Nikah/Kutipan Akta Perkawinan',
            'Fotokopi Akta Kelahiran/Surat Kelahiran bagi keluarga yang ikut pindah',
            'Surat Pindah Datang dari tempat asal', 
            'Surat Keterangan Kematian dari Rumah Sakit, Rumah Ibadah, dll.',
            'Surat Keterangan Cerai',
            'Fotokopi Ijasah Terakhir',
            'SK. PNS/KARIP/SK. TNI – POLRI',
            'Surat Keterangan Kematian dari Kepala Desa/Kelurahan', 
            'Surat imigrasi / STMD (Surat Tanda Melapor Diri)',
            'NPWP Perusahaan',
            'Akta Pendirian Usaha',
            'Dokumen Kepemilikan Tempat Usaha',
            'Izin Lingkungan', 
            'Foto Lokasi Usaha',
            'Surat Pengantar RT/RW',
            'Fotokopi Paspor',
            'Surat keterangan kerja/sekolah',
            'Surat keterangan dari kelurahan asal',  
            'Bukti kepemilikan/sewa tempat tinggal',
            'Pas foto 3x4',
            'Sertifikat Tanah',
            'Gambar Rencana',
            'Surat Kuasa',
            'Sertifikat Lahan',
            'Surat Pernyataan Pengelolaan Lahan',
            'Denah Lokasi/Lahan',
            'Surat Pengantar Kelompok Tani',
            'Proposal Permohonan Bantuan',
            'Surat Pernyataan Tanggung Jawab',
            'Bukti Kepemilikan Lahan/Sewa',
            'Rencana Penggunaan Air'
        ];

        foreach ($syarat as $item) {
            DB::table('syarat_surat')->insert([
                'nama' => $item,
            ]);
        }
    }
}
