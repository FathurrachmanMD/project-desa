<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use App\Models\KategoriSurat;
use App\Models\JenisSurat;
use App\Models\Pemohon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Menampilkan dashboard admin
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        // Statistik dashboard
        $stats = [
            'total_pengajuan_hari_ini' => PengajuanSurat::whereDate('created_at', today())->count(),
            'menunggu_verifikasi' => PengajuanSurat::where('status', 'menunggu_verifikasi')->count(),
            'disetujui_bulan_ini' => PengajuanSurat::where('status', 'disetujui')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            'ditolak_bulan_ini' => PengajuanSurat::where('status', 'ditolak')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            'total_pemohon' => Pemohon::count(),
            'total_jenis_surat' => JenisSurat::where('is_active', true)->count(),
        ];

        // Tren pengajuan 7 hari terakhir
        $pengajuanTrend = PengajuanSurat::selectRaw('DATE(created_at) as tanggal, COUNT(*) as jumlah')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupByRaw('DATE(created_at)')
            ->orderBy('tanggal')
            ->get();

        $stats['pengajuan_trend'] = $pengajuanTrend->map(function($item) {
            return [
                'tanggal' => $item->tanggal,
                'jumlah' => $item->jumlah
            ];
        });

        // Kategori surat paling populer
        $kategoriPopuler = KategoriSurat::withCount(['pengajuan_surat' => function($query) {
            $query->whereMonth('created_at', now()->month);
        }])
        ->orderBy('pengajuan_surat_count', 'desc')
        ->take(5)
        ->get();

        $stats['kategori_populer'] = $kategoriPopuler->map(function($item) {
            return [
                'kategori' => $item->nama_kategori,
                'jumlah' => $item->pengajuan_surat_count
            ];
        });

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }

    /**
     * Menampilkan notifikasi untuk admin
     * 
     * @return array
     */
    public function getNotifications()
    {
        $notifications = [
            'total' => PengajuanSurat::where('status', 'menunggu_verifikasi')->count(),
            'unread' => PengajuanSurat::where('status', 'menunggu_verifikasi')
                ->where('created_at', '>=', now()->subDays(1))
                ->count(),
        ];

        return response()->json($notifications);
    }

    /**
     * Pencarian global
     * 
     * @param Request $request
     * @return \Inertia\Response
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        if (!$query) {
            return redirect()->back();
        }

        // Cari pengajuan surat
        $pengajuan = PengajuanSurat::with(['pemohon', 'jenis_surat'])
            ->where('nomor_pengajuan', 'like', "%{$query}%")
            ->orWhere('tujuan_surat', 'like', "%{$query}%")
            ->orWhereHas('pemohon', function($q) use ($query) {
                $q->where('nama_lengkap', 'like', "%{$query}%")
                  ->orWhere('nik', 'like', "%{$query}%");
            })
            ->orWhereHas('jenis_surat', function($q) use ($query) {
                $q->where('nama_surat', 'like', "%{$query}%");
            })
            ->limit(10)
            ->get();

        // Cari pemohon
        $pemohon = Pemohon::where('nama_lengkap', 'like', "%{$query}%")
            ->orWhere('nik', 'like', "%{$query}%")
            ->limit(10)
            ->get();

        // Cari jenis surat
        $jenisSurat = JenisSurat::where('nama_surat', 'like', "%{$query}%")
            ->orWhere('kode_surat', 'like', "%{$query}%")
            ->limit(10)
            ->get();

        return Inertia::render('search-results', [
            'query' => $query,
            'results' => [
                'pengajuan' => $pengajuan,
                'pemohon' => $pemohon,
                'jenis_surat' => $jenisSurat,
            ]
        ]);
    }
}
