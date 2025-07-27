<?php

namespace App\Services;

use App\Models\Surat;
use App\Models\Penduduk;
use Illuminate\Support\Facades\Auth;

class PendudukService
{
    public function createFromSurat(Surat $surat)
    {
        // Try to find existing penduduk by NIK
        $penduduk = Penduduk::firstOrCreate(
            ['nik' => $surat->form["nik"]],
            [
                'nama' => $surat->form["nama"],
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]
        );

        // Associate penduduk with surat and save
        $surat->penduduk_id = $penduduk->id;
        $surat->save();
    }
}
