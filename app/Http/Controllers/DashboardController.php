<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User;
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
        
        $activities = Surat::with('format', 'format.kategori')->latest()->get();
        // dont know if this means user or penduduk
        $users = User::all();

        // return response()->json([
        //     $activities
        // ], 200, );

        return Inertia::render('dashboard', [
            'total' => [
                'izin_usaha' => $total_izin_usaha,
                'izin_bangunan' => $total_izin_bangunan,
                'izin_acara' => $total_izin_acara,
                'izin_pribadi' => $total_izin_pribadi,
                'izin_pertanian' => $total_izin_pertanian,
                'diproses' => $diproses,
                'disetujui' => $disetujui,
                'approval_percentage' => $percentage,
                'penduduk' => $total_penduduk,
                'surat' => $total_surat
            ],
            'activities' => [
                'data' => $activities,
                'total' => $activities->count()
            ],
            'users' => [
                'data' => $users,
                'total' => $users->count()
            ]
        ]);
    }
}
