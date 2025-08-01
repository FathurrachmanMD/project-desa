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
     * Get semua produk dari lapak milik user
     */
    public function getUserProducts()
    {
        try {
            $user = auth()->user();
            
            // Fallback untuk testing - gunakan user ID 1 jika tidak ada auth
            $userId = $user ? $user->id : 1;

            // Ambil semua lapak milik user
            $lapakIds = Lapak::where('created_by', $userId)->pluck('id');

            // Ambil semua produk dari lapak-lapak tersebut
            $products = \App\Models\Produk::whereIn('lapak_id', $lapakIds)
                ->with(['lapak', 'kategori'])
                ->where('status', true)
                ->get();

            // Format data untuk frontend
            $formattedProducts = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->nama,
                    'price' => 'Rp ' . number_format($product->harga, 0, ',', '.'),
                    'category' => $product->kategori ? $product->kategori->kategori : 'Tidak Berkategori',
                    'sellerName' => $product->lapak ? $product->lapak->nama : 'Tidak Diketahui',
                    'sellerPhone' => $product->lapak ? $product->lapak->telepon : '',
                    'description' => $product->deskripsi,
                    'imgSrc' => $product->foto ? '/storage/' . $product->foto : '/placeholder-product.jpg',
                    'lapakName' => $product->lapak ? $product->lapak->nama : 'Tidak Diketahui',
                    'satuan' => $product->satuan,
                    'status' => $product->status
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => $formattedProducts
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
