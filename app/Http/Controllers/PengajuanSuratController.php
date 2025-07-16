<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengajuanSurat;
use App\Models\KategoriSurat;
use App\Models\JenisSurat;
use App\Models\Pemohon;
use App\Models\SuratHasil;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengajuanSuratController extends Controller
{
    /**
     * Menampilkan daftar pengajuan surat
     * 
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = PengajuanSurat::with(['pemohon', 'jenis_surat.kategori', 'verifikator', 'penyetuju']);

        // Filter berdasarkan pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nomor_pengajuan', 'like', "%{$search}%")
                  ->orWhere('tujuan_surat', 'like', "%{$search}%")
                  ->orWhereHas('pemohon', function($pemohonQuery) use ($search) {
                      $pemohonQuery->where('nama_lengkap', 'like', "%{$search}%")
                                   ->orWhere('nik', 'like', "%{$search}%");
                  });
            });
        }

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan kategori
        if ($request->filled('kategori_id')) {
            $query->whereHas('jenis_surat', function($q) use ($request) {
                $q->where('kategori_id', $request->kategori_id);
            });
        }

        // Filter berdasarkan jenis surat
        if ($request->filled('jenis_surat_id')) {
            $query->where('jenis_surat_id', $request->jenis_surat_id);
        }

        // Filter berdasarkan prioritas
        if ($request->filled('prioritas')) {
            $query->where('prioritas', $request->prioritas);
        }

        // Filter berdasarkan tanggal
        if ($request->filled('tanggal_dari')) {
            $query->where('tanggal_pengajuan', '>=', $request->tanggal_dari);
        }

        if ($request->filled('tanggal_sampai')) {
            $query->where('tanggal_pengajuan', '<=', $request->tanggal_sampai);
        }

        // Urutkan berdasarkan tanggal pengajuan terbaru
        $query->orderBy('tanggal_pengajuan', 'desc');

        // Paginasi
        $pengajuan = $query->paginate(15);

        // Data untuk filter
        $kategoris = KategoriSurat::where('is_active', true)->get();
        $jenisSurat = JenisSurat::where('is_active', true)->get();

        return Inertia::render('pengajuan/index', [
            'pengajuan' => $pengajuan,
            'kategoris' => $kategoris,
            'jenis_surat' => $jenisSurat,
            'filters' => $request->all()
        ]);
    }

    /**
     * Menampilkan form untuk membuat pengajuan baru
     * 
     * @return \Inertia\Response
     */
    public function create()
    {
        $kategoris = KategoriSurat::where('is_active', true)->get();
        $jenisSurat = JenisSurat::where('is_active', true)->with('kategori')->get();

        return Inertia::render('pengajuan/create', [
            'kategoris' => $kategoris,
            'jenis_surat' => $jenisSurat,
        ]);
    }

    /**
     * Menyimpan pengajuan surat baru
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'pemohon_id' => 'required|exists:pemohon,id',
            'jenis_surat_id' => 'required|exists:jenis_surat,id',
            'tujuan_surat' => 'required|string|max:1000',
            'prioritas' => 'required|in:rendah,normal,tinggi,urgent',
            'dokumen_pendukung.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB max
        ]);

        DB::beginTransaction();

        try {
            // Generate nomor pengajuan
            $nomorPengajuan = $this->generateNomorPengajuan();

            // Ambil data jenis surat untuk menghitung biaya
            $jenisSurat = JenisSurat::findOrFail($request->jenis_surat_id);

            // Upload dokumen pendukung
            $dokumenPendukung = [];
            if ($request->hasFile('dokumen_pendukung')) {
                foreach ($request->file('dokumen_pendukung') as $file) {
                    $path = $file->store('dokumen-pendukung', 'public');
                    $dokumenPendukung[] = $path;
                }
            }

            // Hitung estimasi selesai
            $estimasiSelesai = now()->addDays($jenisSurat->estimasi_selesai_hari);

            // Buat pengajuan surat
            $pengajuan = PengajuanSurat::create([
                'nomor_pengajuan' => $nomorPengajuan,
                'pemohon_id' => $request->pemohon_id,
                'jenis_surat_id' => $request->jenis_surat_id,
                'tujuan_surat' => $request->tujuan_surat,
                'data_tambahan' => json_decode($request->data_tambahan ?? '{}', true),
                'dokumen_pendukung' => $dokumenPendukung,
                'status' => 'menunggu_verifikasi',
                'prioritas' => $request->prioritas,
                'estimasi_selesai' => $estimasiSelesai,
                'biaya_total' => $jenisSurat->biaya,
                'status_pembayaran' => $jenisSurat->biaya > 0 ? 'belum_bayar' : 'gratis',
                'tanggal_pengajuan' => now(),
            ]);

            // Log aktivitas
            $this->logActivity('create', 'pengajuan_surat', "Membuat pengajuan surat baru: {$nomorPengajuan}");

            DB::commit();

            return redirect()->route('pengajuan.show', $pengajuan->id)
                ->with('success', 'Pengajuan surat berhasil dibuat');

        } catch (\Exception $e) {
            DB::rollback();
            
            // Hapus file yang sudah diupload jika ada error
            foreach ($dokumenPendukung as $file) {
                Storage::disk('public')->delete($file);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan saat membuat pengajuan'])
                ->withInput();
        }
    }

    /**
     * Menampilkan detail pengajuan surat
     * 
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $pengajuan = PengajuanSurat::with([
            'pemohon',
            'jenis_surat.kategori',
            'verifikator',
            'penyetuju',
            'surat_hasil'
        ])->findOrFail($id);

        // Ambil riwayat status
        $riwayatStatus = $pengajuan->riwayat_status()->with('pengubah')->orderBy('created_at', 'desc')->get();

        return Inertia::render('pengajuan/show', [
            'pengajuan' => $pengajuan,
            'riwayat_status' => $riwayatStatus,
        ]);
    }

    /**
     * Menampilkan form edit pengajuan
     * 
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $pengajuan = PengajuanSurat::with(['pemohon', 'jenis_surat'])->findOrFail($id);
        
        // Hanya bisa edit jika status masih draft atau revisi
        if (!in_array($pengajuan->status, ['draft', 'revisi'])) {
            return redirect()->route('pengajuan.show', $id)
                ->with('error', 'Pengajuan tidak dapat diedit karena sudah diproses');
        }

        $kategoris = KategoriSurat::where('is_active', true)->get();
        $jenisSurat = JenisSurat::where('is_active', true)->with('kategori')->get();

        return Inertia::render('pengajuan/edit', [
            'pengajuan' => $pengajuan,
            'kategoris' => $kategoris,
            'jenis_surat' => $jenisSurat,
        ]);
    }

    /**
     * Update pengajuan surat
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $pengajuan = PengajuanSurat::findOrFail($id);

        // Validasi status
        if (!in_array($pengajuan->status, ['draft', 'revisi'])) {
            return redirect()->route('pengajuan.show', $id)
                ->with('error', 'Pengajuan tidak dapat diedit karena sudah diproses');
        }

        $request->validate([
            'tujuan_surat' => 'required|string|max:1000',
            'prioritas' => 'required|in:rendah,normal,tinggi,urgent',
            'dokumen_pendukung.*' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        DB::beginTransaction();

        try {
            // Upload dokumen baru jika ada
            $dokumenBaru = [];
            if ($request->hasFile('dokumen_pendukung')) {
                foreach ($request->file('dokumen_pendukung') as $file) {
                    $path = $file->store('dokumen-pendukung', 'public');
                    $dokumenBaru[] = $path;
                }
            }

            // Gabungkan dengan dokumen lama
            $dokumenLama = $pengajuan->dokumen_pendukung ?? [];
            $semuaDokumen = array_merge($dokumenLama, $dokumenBaru);

            // Update pengajuan
            $pengajuan->update([
                'tujuan_surat' => $request->tujuan_surat,
                'prioritas' => $request->prioritas,
                'dokumen_pendukung' => $semuaDokumen,
                'data_tambahan' => json_decode($request->data_tambahan ?? '{}', true),
                'status' => 'menunggu_verifikasi', // Reset status ke menunggu verifikasi
            ]);

            // Log aktivitas
            $this->logActivity('update', 'pengajuan_surat', "Mengupdate pengajuan surat: {$pengajuan->nomor_pengajuan}");

            DB::commit();

            return redirect()->route('pengajuan.show', $pengajuan->id)
                ->with('success', 'Pengajuan surat berhasil diupdate');

        } catch (\Exception $e) {
            DB::rollback();
            
            // Hapus file yang sudah diupload jika ada error
            foreach ($dokumenBaru as $file) {
                Storage::disk('public')->delete($file);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan saat mengupdate pengajuan'])
                ->withInput();
        }
    }

    /**
     * Verifikasi pengajuan surat
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verifikasi(Request $request, $id)
    {
        $pengajuan = PengajuanSurat::findOrFail($id);

        $request->validate([
            'status' => 'required|in:disetujui,ditolak,revisi',
            'keterangan' => 'required_if:status,ditolak,revisi|string|max:1000',
        ]);

        $pengajuan->update([
            'status' => $request->status,
            'keterangan' => $request->keterangan,
            'tanggal_verifikasi' => now(),
            'diverifikasi_oleh' => auth()->id(),
        ]);

        // Jika disetujui, buat surat hasil
        if ($request->status === 'disetujui') {
            $this->buatSuratHasil($pengajuan);
        }

        // Log aktivitas
        $this->logActivity('verifikasi', 'pengajuan_surat', "Verifikasi pengajuan surat: {$pengajuan->nomor_pengajuan} - Status: {$request->status}");

        return redirect()->route('pengajuan.show', $id)
            ->with('success', 'Pengajuan surat berhasil diverifikasi');
    }

    /**
     * Hapus pengajuan surat
     * 
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $pengajuan = PengajuanSurat::findOrFail($id);

        // Hanya bisa hapus jika status draft atau ditolak
        if (!in_array($pengajuan->status, ['draft', 'ditolak'])) {
            return redirect()->route('pengajuan.index')
                ->with('error', 'Pengajuan tidak dapat dihapus karena sudah diproses');
        }

        // Hapus file dokumen
        if ($pengajuan->dokumen_pendukung) {
            foreach ($pengajuan->dokumen_pendukung as $file) {
                Storage::disk('public')->delete($file);
            }
        }

        // Hapus pengajuan
        $pengajuan->delete();

        // Log aktivitas
        $this->logActivity('delete', 'pengajuan_surat', "Menghapus pengajuan surat: {$pengajuan->nomor_pengajuan}");

        return redirect()->route('pengajuan.index')
            ->with('success', 'Pengajuan surat berhasil dihapus');
    }

    /**
     * Generate nomor pengajuan unik
     * 
     * @return string
     */
    private function generateNomorPengajuan()
    {
        $prefix = 'PGJ';
        $date = now()->format('Ymd');
        $counter = PengajuanSurat::whereDate('created_at', today())->count() + 1;
        
        return sprintf('%s-%s-%04d', $prefix, $date, $counter);
    }

    /**
     * Buat surat hasil setelah pengajuan disetujui
     * 
     * @param PengajuanSurat $pengajuan
     * @return void
     */
    private function buatSuratHasil($pengajuan)
    {
        $jenisSurat = $pengajuan->jenis_surat;
        $nomorSurat = $this->generateNomorSurat($jenisSurat->kode_surat);
        
        // Generate isi surat dari template
        $isiSurat = $this->generateIsiSurat($pengajuan);
        
        // Buat surat hasil
        SuratHasil::create([
            'pengajuan_id' => $pengajuan->id,
            'nomor_surat' => $nomorSurat,
            'isi_surat' => $isiSurat,
            'tanggal_berlaku' => now(),
            'tanggal_kadaluarsa' => $jenisSurat->masa_berlaku_hari > 0 
                ? now()->addDays($jenisSurat->masa_berlaku_hari) 
                : null,
            'ditandatangani_oleh' => auth()->id(),
        ]);

        // Update status pengajuan
        $pengajuan->update([
            'tanggal_selesai' => now(),
            'disetujui_oleh' => auth()->id(),
        ]);
    }

    /**
     * Generate nomor surat
     * 
     * @param string $kode
     * @return string
     */
    private function generateNomorSurat($kode)
    {
        $counter = SuratHasil::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count() + 1;
        
        return sprintf('%s-%04d/%02d/%d', $kode, $counter, now()->month, now()->year);
    }

    /**
     * Generate isi surat dari template
     * 
     * @param PengajuanSurat $pengajuan
     * @return string
     */
    private function generateIsiSurat($pengajuan)
    {
        $template = $pengajuan->jenis_surat->template_surat;
        $pemohon = $pengajuan->pemohon;
        
        // Replace placeholder dengan data aktual
        $replacements = [
            '{{nama_lengkap}}' => $pemohon->nama_lengkap,
            '{{nik}}' => $pemohon->nik,
            '{{alamat}}' => $pemohon->alamat_lengkap,
            '{{tujuan_surat}}' => $pengajuan->tujuan_surat,
            '{{tanggal_surat}}' => now()->format('d F Y'),
            '{{nama_kepala_desa}}' => config('app.nama_kepala_desa', 'Kepala Desa'),
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $template);
    }

    /**
     * Log aktivitas sistem
     * 
     * @param string $tipe
     * @param string $modul
     * @param string $deskripsi
     * @return void
     */
    private function logActivity($tipe, $modul, $deskripsi)
    {
        DB::table('log_aktivitas')->insert([
            'user_id' => auth()->id(),
            'tipe_aktivitas' => $tipe,
            'modul' => $modul,
            'deskripsi' => $deskripsi,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'created_at' => now(),
        ]);
    }
}
