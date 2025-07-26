<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SyaratFormatSuratSeeder extends Seeder
{
    public function run(): void
    {
        $formats = [
            1 => [1, 2, 17, 16], // SKU
            2 => [1, 2, 17, 16], // IUMK
            3 => [1, 12, 13, 10], // SITU
            4 => [1, 12, 13, 14], // NIB
        ];

        foreach ($formats as $formatId => $syaratIds) {
            foreach ($syaratIds as $syaratId) {
                DB::table('syarat_format_surat')->insert([
                    'format_id' => $formatId,
                    'syarat_id' => $syaratId,
                ]);
            }
        }
    }
}
