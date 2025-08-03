<?php

namespace Database\Seeders;

use App\Models\LapakUser;
use App\Models\Surat;
use App\Models\Penduduk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LapakUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample lapak user data
        $lapakUserData = [
            [
                'nama_usaha' => 'Warung Bu Sari',
                'jenis_usaha' => 'Warung Makan',
                'alamat_usaha' => 'Desa Drawati, RT 01/RW 02, Jl. Raya Desa No. 15',
                'pemilik_nama' => 'Sari Wulandari',
                'pemilik_nik' => '3507142304850001',
                'telepon' => '081234567890',
                'email' => 'warungbusari@gmail.com',
                'status' => true,
                'tanggal_disetujui' => now()->subMonths(6),
            ],
            [
                'nama_usaha' => 'Toko Sembako Makmur',
                'jenis_usaha' => 'Toko Kelontong',
                'alamat_usaha' => 'Desa Drawati, RT 03/RW 01, Jl. Masjid No. 8',
                'pemilik_nama' => 'Ahmad Makmur',
                'pemilik_nik' => '3507141508750002',
                'telepon' => '081987654321',
                'email' => 'tokomakmur@yahoo.com',
                'status' => true,
                'tanggal_disetujui' => now()->subMonths(4),
            ],
            [
                'nama_usaha' => 'Bengkel Motor Jaya',
                'jenis_usaha' => 'Bengkel Motor',
                'alamat_usaha' => 'Desa Drawati, RT 05/RW 03, Jl. Pemuda No. 22',
                'pemilik_nama' => 'Joko Suprapto',
                'pemilik_nik' => '3507140712800003',
                'telepon' => '085123456789',
                'status' => true,
                'tanggal_disetujui' => now()->subMonths(8),
            ],
            [
                'nama_usaha' => 'Salon Cantik Indah',
                'jenis_usaha' => 'Salon Kecantikan',
                'alamat_usaha' => 'Desa Drawati, RT 02/RW 01, Jl. Kartini No. 5',
                'pemilik_nama' => 'Indah Permatasari',
                'pemilik_nik' => '3507146611900004',
                'telepon' => '082345678901',
                'email' => 'salonindah@gmail.com',
                'status' => true,
                'tanggal_disetujui' => now()->subMonths(3),
            ],
            [
                'nama_usaha' => 'Fotocopy Digital Print',
                'jenis_usaha' => 'Fotocopy & Print',
                'alamat_usaha' => 'Desa Drawati, RT 04/RW 02, Jl. Pendidikan No. 12',
                'pemilik_nama' => 'Budi Santoso',
                'pemilik_nik' => '3507142309850005',
                'telepon' => '087654321098',
                'status' => true,
                'tanggal_disetujui' => now()->subMonths(2),
            ],
            [
                'nama_usaha' => 'Laundry Bersih Wangi',
                'jenis_usaha' => 'Laundry',
                'alamat_usaha' => 'Desa Drawati, RT 06/RW 04, Jl. Melati No. 18',
                'pemilik_nama' => 'Rina Melati',
                'pemilik_nik' => '3507145504920006',
                'telepon' => '089876543210',
                'email' => 'laundrybersih@gmail.com',
                'status' => true,
                'tanggal_disetujui' => now()->subMonth(),
            ],
        ];

        foreach ($lapakUserData as $data) {
            LapakUser::create($data + [
                'created_by' => 1,
                'updated_by' => 1,
            ]);
        }

        // Create additional random lapak users
        LapakUser::factory(10)->active()->create();
        
        // Create some inactive lapak users
        LapakUser::factory(3)->inactive()->create();

        $this->command->info('LapakUser seeder completed successfully!');
    }
}
