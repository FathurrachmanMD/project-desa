<?php

namespace App\Http\Controllers;

use App\Models\LapakUser;
use App\Models\Surat;
use App\Models\Penduduk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class LapakUserController extends Controller
{
    /**
     * Display a listing of lapak users for public view
     */
    public function index(): JsonResponse
    {
        try {
            $lapakUsers = LapakUser::with(['penduduk', 'surat'])
                ->active()
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($lapak) {
                    return [
                        'id' => $lapak->id,
                        'nama_usaha' => $lapak->nama_usaha,
                        'slug' => $lapak->slug,
                        'jenis_usaha' => $lapak->jenis_usaha,
                        'alamat_usaha' => $lapak->alamat_usaha,
                        'pemilik_nama' => $lapak->pemilik_nama,
                        'pemilik_nik' => $lapak->pemilik_nik,
                        'telepon' => $lapak->telepon,
                        'status' => $lapak->status_text,
                        'tanggal_disetujui' => $lapak->tanggal_disetujui_formatted,
                        'created_at' => $lapak->created_at->format('Y-m-d H:i:s'),
                    ];
                });

            return response()->json([
                'status' => 'success',
                'data' => $lapakUsers,
                'total' => $lapakUsers->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch lapak user data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show detail of specific lapak user by slug
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $lapakUser = LapakUser::with(['penduduk', 'surat', 'produk.kategori'])
                ->bySlug($slug)
                ->active()
                ->first();

            if (!$lapakUser) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak user not found or inactive'
                ], 404);
            }

            $data = [
                'id' => $lapakUser->id,
                'nama_lapak' => $lapakUser->nama_usaha,
                'slug' => $lapakUser->slug,
                'telepon' => $lapakUser->telepon,
                'alamat' => $lapakUser->alamat_usaha,
                'status' => $lapakUser->status_text,
                'pemilik' => [
                    'nama' => $lapakUser->pemilik_nama,
                    'nik' => $lapakUser->pemilik_nik,
                    'telepon' => $lapakUser->telepon,
                ],
                'usaha' => [
                    'nama_usaha' => $lapakUser->nama_usaha,
                    'jenis_usaha' => $lapakUser->jenis_usaha,
                    'alamat_usaha' => $lapakUser->alamat_usaha,
                    'tanggal_disetujui' => $lapakUser->tanggal_disetujui_formatted,
                ],
                'produk' => $lapakUser->produk->map(function ($produk) {
                    return [
                        'id' => $produk->id,
                        'nama' => $produk->nama,
                        'harga' => $produk->harga,
                        'harga_formatted' => 'Rp ' . number_format($produk->harga, 0, ',', '.'),
                        'kategori' => $produk->kategori->nama ?? 'Tidak ada kategori',
                        'deskripsi' => $produk->deskripsi,
                        'foto' => $produk->foto,
                        'satuan' => $produk->satuan,
                        'stok' => $produk->stok,
                        'status' => $produk->status,
                    ];
                }),
                'total_produk' => $lapakUser->produk->count(),
                'produk_aktif' => $lapakUser->produk->where('status', 'aktif')->count(),
            ];

            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch lapak user detail',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created lapak user
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nama_usaha' => 'required|string|max:255',
                'jenis_usaha' => 'required|string|max:255',
                'alamat_usaha' => 'required|string',
                'pemilik_nama' => 'required|string|max:255',
                'pemilik_nik' => 'required|string|size:16|unique:lapak_user,pemilik_nik',
                'telepon' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'surat_id' => 'nullable|exists:surat,id',
                'penduduk_id' => 'nullable|exists:penduduk,id',
            ]);

            $validated['slug'] = Str::slug($validated['nama_usaha']);
            $validated['status'] = true;
            $validated['tanggal_disetujui'] = now();
            $validated['created_by'] = auth()->id() ?? 1;
            $validated['updated_by'] = auth()->id() ?? 1;

            $lapakUser = LapakUser::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Lapak user created successfully',
                'data' => $lapakUser
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create lapak user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified lapak user
     */
    public function update(Request $request, LapakUser $lapakUser): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nama_usaha' => 'sometimes|required|string|max:255',
                'jenis_usaha' => 'sometimes|required|string|max:255',
                'alamat_usaha' => 'sometimes|required|string',
                'pemilik_nama' => 'sometimes|required|string|max:255',
                'pemilik_nik' => 'sometimes|required|string|size:16|unique:lapak_user,pemilik_nik,' . $lapakUser->id,
                'telepon' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'status' => 'sometimes|boolean',
            ]);

            if (isset($validated['nama_usaha'])) {
                $validated['slug'] = Str::slug($validated['nama_usaha']);
            }

            $validated['updated_by'] = auth()->id() ?? 1;

            $lapakUser->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Lapak user updated successfully',
                'data' => $lapakUser->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update lapak user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified lapak user
     */
    public function destroy(LapakUser $lapakUser): JsonResponse
    {
        try {
            $lapakUser->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Lapak user deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete lapak user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create lapak user from approved SKU surat
     */
    public function createFromSurat(Surat $surat): JsonResponse
    {
        try {
            if ($surat->status !== 'disetujui' || $surat->format_id !== 2) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Surat must be approved SKU format'
                ], 400);
            }

            // Check if lapak user already exists for this surat
            $existingLapak = LapakUser::where('surat_id', $surat->id)->first();
            if ($existingLapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak user already exists for this surat'
                ], 400);
            }

            $lapakUser = LapakUser::create([
                'nama_usaha' => $surat->form['nama_usaha'],
                'jenis_usaha' => $surat->form['jenis_usaha'],
                'alamat_usaha' => $surat->form['alamat_usaha'],
                'pemilik_nama' => $surat->form['nama_pemohon'],
                'pemilik_nik' => $surat->form['nik'],
                'telepon' => $surat->form['telepon'] ?? null,
                'surat_id' => $surat->id,
                'penduduk_id' => $surat->penduduk_id,
                'status' => true,
                'tanggal_disetujui' => $surat->updated_at,
                'created_by' => auth()->id() ?? 1,
                'updated_by' => auth()->id() ?? 1,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Lapak user created from surat successfully',
                'data' => $lapakUser
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create lapak user from surat',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
