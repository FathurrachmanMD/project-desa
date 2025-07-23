<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Penduduk;
use App\Models\Surat;

class DashboardController extends Controller
{
    public function index () {
        $total_penduduk = Penduduk::count();
        $izin_aktif = Surat::whereIn('status', ['aktif'])->count();
        //where status active and id is surat kegiatan
        $total_kegiatan = Surat::whereIn('status', ['aktif'])->where('id', 1)->count();

        return Inertia::render('dashboard', [
            'total_penduduk' => $total_penduduk,
            'izin_aktif' => $izin_aktif,
            'total_kegiatan' => $total_kegiatan
        ]);
    }
}
