<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SuratController extends Controller
{
    public function index()
    {
        $surats = Surat::latest()->get();
        return response()->json([
            'message' => 'Daftar surat berhasil ditampilkan',
            'total' => $surats->count(),
            'data' => $surats
        ], 200);
    }

    public function store(Request $request, $slug)
    {
        try {
            // Cari format_surat berdasarkan slug
            $format = \App\Models\FormatSurat::where('url_surat', $slug)->firstOrFail();

            // Validasi data permintaan
            $validated = $request->validate([
                'penduduk_id'   => 'exists:penduduk,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
            ]);

            // Tambahkan format_id dari hasil query slug
            $validated['format_id'] = $format->id;
            $validated['created_by'] = Auth::id();
            $validated['updated_by'] = Auth::id();

            // Simpan surat baru
            $surat = Surat::create($validated);

            return response()->json([
                'message' => 'Surat berhasil disimpan',
                'data' => $surat
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => "Format dengan slug '{$slug}' tidak ditemukan"
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    public function show($slug)
    {
        $surats = Surat::with('format')
            ->whereHas('format', function ($query) use ($slug) {
                $query->where('url_surat', $slug);
            })
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Daftar surat berdasarkan format berhasil ditampilkan',
            'total' => $surats->count(),
            'data' => $surats
        ], 200);
    }

    public function update(Request $request, $id)
    {
        try {
            $item = Surat::findOrFail($id);

            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                // 'format_id'     => 'nullable|exists:format_surat,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'nullable|in:diproses,disetujui,ditolak,dicetak',
            ]);

            $validated['updated_by'] = Auth::id();

            $item->update($validated);

            return response()->json([
                'message' => 'Surat berhasil diperbarui',
                'data' => $item
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $surat = Surat::findOrFail($id);
            $surat->delete();

            return response()->json([
                'message' => 'Surat berhasil dihapus'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Surat tidak ditemukan'], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus surat',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
