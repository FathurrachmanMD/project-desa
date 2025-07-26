<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PendudukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Penduduk::latest()->get();

        return response()->json([
            'message' => 'Daftar penduduk berhasil diambil',
            'total' => $data->count(),
            'aktif' => $data->where('status', 'aktif')->count(),
            'nonaktif' => $data->where('status', 'nonaktif')->count(),
            'suspended' => $data->where('status', 'suspended')->count(),
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama'             => 'required|string|max:255',
                'nik'              => 'required|string|max:255|unique:penduduk,nik',
                'sex'              => 'nullable|in:L,P',
                'pekerjaan'        => 'nullable|string|max:255',
                'tempatlahir'      => 'nullable|string|max:255',
                'tanggallahir'     => 'nullable|date',
                'status'           => 'nullable|in:aktif,nonaktif,suspended',
                'alamat_sekarang'  => 'nullable|string',
                'email'            => 'nullable|email|max:255',
                'telepon'          => 'nullable|string|max:255',
            ]);

            $validated['created_by'] = Auth::id();
            $validated['updated_by'] = Auth::id();

            $data = Penduduk::create($validated);

            return response()->json([
                'message' => 'Surat berhasil disimpan',
                'data' => $data
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Penduduk $penduduk)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penduduk $penduduk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $penduduk = Penduduk::findOrFail($id);

            $validated = $request->validate([
                'nama'             => 'sometimes|required|string|max:255',
                'nik'              => 'sometimes|required|string|max:255|unique:penduduk,nik,' . $penduduk->id,
                'sex'              => 'nullable|in:L,P',
                'pekerjaan'        => 'nullable|string|max:255',
                'tempatlahir'      => 'nullable|string|max:255',
                'tanggallahir'     => 'nullable|date',
                'status'           => 'nullable|in:aktif,nonaktif,suspended',
                'alamat_sekarang'  => 'nullable|string',
                'email'            => 'nullable|email|max:255',
                'telepon'          => 'nullable|string|max:255',
            ]);

            $validated['updated_by'] = Auth::id();

            $penduduk->update($validated);

            return response()->json([
                'message' => 'Penduduk berhasil diperbarui',
                'data' => $penduduk
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $penduduk = Penduduk::findOrFail($id);

            $penduduk->delete();

            return response()->json([
                'message' => 'Penduduk berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus penduduk',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}