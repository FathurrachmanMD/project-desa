<?php

namespace App\Services;

use App\Models\Surat;
use App\Models\Lapak;
use Illuminate\Support\Facades\Auth;

class LapakService
{
    public function createFromSurat(Surat $surat)
    {
        $lapak = Lapak::firstOrCreate(
            [
                'penduduk_id' => $surat->penduduk_id,
                'nama' => $surat->form["nama_usaha"],
            ],
            [
                'telepon' => $surat->form["nomor_hp"],
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]
        );
    }
}
