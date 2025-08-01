<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
use App\Models\Penduduk;
use App\Models\Surat;
use Illuminate\Http\Request;

class LapakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function createFromSurat (Surat $surat) {
        // create or find penduduk by where surat.form.nik match
        Lapak::create([
            'nama' => $surat->nama_usaha,
            'penduduk_id' => $penduduk->id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'penduduk_id' => 'nullable|exists:penduduk,id',
                'telepon'     => 'nullable|string|max:20',
                'lat'         => 'nullable|string|max:20',
                'lng'         => 'nullable|string|max:20',
                'zoom'        => 'nullable|integer|min:0|max:21',
                'status'      => 'boolean',
                'created_by'  => 'nullable|exists:users,id',
                'updated_by'  => 'nullable|exists:users,id',
            ]);

            $item = Lapak::create($validated);
            return response()->json($item, 201);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Lapak $lapak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lapak $lapak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $item = Lapak::findOrFail($id);

            $validated = $request->validate([
                'penduduk_id' => 'nullable|exists:penduduk,id',
                'telepon'     => 'nullable|string|max:20',
                'lat'         => 'nullable|string|max:20',
                'lng'         => 'nullable|string|max:20',
                'zoom'        => 'nullable|integer|min:0|max:21',
                'status'      => 'boolean',
                'updated_by'  => 'nullable|exists:users,id',
            ]);

            $item->update($validated);
            return response()->json($item);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Data not found',
            ], 404);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get lapak milik user yang sedang login
     */
    public function getUserLapak()
    {
        try {
            $user = auth()->user();
            
            // Fallback untuk testing - gunakan user ID 1 jika tidak ada auth
            $userId = $user ? $user->id : 1;

            // Ambil semua lapak yang dibuat oleh user yang sedang login
            $lapaks = Lapak::where('created_by', $userId)
                ->with(['penduduk'])
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $lapaks
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch lapak data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get semua produk dari lapak yang dibuat berdasarkan surat SKU yang disetujui
     */
    public function getUserProducts()
    {
        try {
            // Ambil surat-surat SKU yang sudah disetujui (kategori_id = 1 untuk usaha)
            $approvedSurats = \App\Models\Surat::with(['format', 'penduduk'])
                ->whereHas('format', function($query) {
                    $query->where('kategori_id', 1); // kategori usaha
                })
                ->where('status', 'disetujui')
                ->get();

            $allProducts = [];
            
            foreach ($approvedSurats as $surat) {
                // Cari lapak yang dibuat dari surat ini
                $lapaks = Lapak::where('penduduk_id', $surat->penduduk_id)
                    ->with(['products.kategori'])
                    ->get();
                
                foreach ($lapaks as $lapak) {
                    foreach ($lapak->products as $product) {
                        if ($product->status) { // hanya produk yang aktif
                            $allProducts[] = [
                                'id' => $product->id,
                                'title' => $product->nama,
                                'price' => 'Rp ' . number_format($product->harga, 0, ',', '.'),
                                'category' => $product->kategori ? $product->kategori->kategori : 'Tidak Berkategori',
                                'sellerName' => $lapak->nama,
                                'sellerPhone' => $lapak->telepon,
                                'description' => $product->deskripsi,
                                'imgSrc' => $product->foto ? '/storage/' . $product->foto : '/placeholder-product.jpg',
                                'lapakName' => $lapak->nama,
                                'satuan' => $product->satuan,
                                'status' => $product->status ? 'aktif' : 'nonaktif',
                                // Tambahan info dari surat
                                'pengajuan_nama' => $surat->penduduk->nama ?? $surat->form['nama_pemohon'] ?? 'Tidak diketahui',
                                'nik' => $surat->form['nik'] ?? 'Tidak diketahui',
                                'nama_usaha' => $surat->form['nama_usaha'] ?? $lapak->nama,
                                'jenis_usaha' => $surat->form['jenis_usaha'] ?? 'Tidak diketahui',
                                'alamat_usaha' => $surat->form['alamat_usaha'] ?? 'Tidak diketahui',
                                'lama_usaha' => $surat->form['lama_usaha'] ?? 'Tidak diketahui',
                                'tanggal_disetujui' => $surat->updated_at->format('Y-m-d H:i:s')
                            ];
                        }
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'data' => $allProducts,
                'total' => count($allProducts),
                'message' => 'Data produk dari surat SKU yang disetujui berhasil diambil'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $item = Lapak::findOrFail($id);
            $item->delete();
            return response()->json(['message' => 'Deleted successfully']);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
