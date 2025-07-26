<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Surat;
use App\Models\Penduduk;

class DashboardController extends Controller
{
    public function index () {
        $total_surat = Surat::count();
        $total_izin_usaha = Surat::whereHas('format', function ($query) {
            $query->where('kategori_id', 1);
        })->count();
        $total_izin_bangunan = Surat::whereHas('format', function ($query) {
            $query->where('kategori_id', 2);
        })->count();
        $total_izin_acara = Surat::whereHas('format', function ($query) {
            $query->where('kategori_id', 3);
        })->count();
        $total_izin_pribadi = Surat::whereHas('format', function ($query) {
            $query->where('kategori_id', 4);
        })->count();
        $total_izin_pertanian = Surat::whereHas('format', function ($query) {
            $query->where('kategori_id', 5);
        })->count();
        $total_penduduk = Penduduk::count();
        $diproses = Surat::where('status', 'diproses')->count();
        $disetujui = Surat::where('status', 'disetujui')->count();

        $percentage = $total_surat > 0 ? round(($disetujui / $total_surat) * 100, 2) : 0;

        return response()->json([
            'total_izin_usaha' => $total_izin_usaha,
            'total_izin_bangunan' => $total_izin_bangunan,
            'total_izin_acara' => $total_izin_acara,
            'total_izin_pribadi' => $total_izin_pribadi,
            'total_izin_pertanian' => $total_izin_pertanian,
            'diproses' => $diproses,
            'disetujui' => $disetujui,
            'approval_percentage' => $percentage,
            'total_penduduk' => $total_penduduk,
            'total_surat' => $total_surat
        ]);
    }
}
