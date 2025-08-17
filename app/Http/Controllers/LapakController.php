<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
use App\Models\Penduduk;
use App\Models\Surat;
use Illuminate\Http\Request;

use Inertia\Inertia;

class LapakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // maybe only get approved lapak?
        $status = $request->get('status'); // optional filter
        $slug = $request->get('slug'); // optional filter for category

        $query = Lapak::with([
            'penduduk:id,nama,nik',
            'surat:id,nomor_surat,status',
            'createdBy:id,name',
        ]);

        if ($status) {
            $query->where('status', $status);
        }

        // example: filter by kategori slug (if relation exists)
        // if ($slug) {
        //     $query->whereHas('kategori', fn($q) => $q->where('slug', $slug));
        // }

        $lapak = $query->get();

        return Inertia::render('lapak/index', [
            'data' => $lapak,
            'total' => $lapak->count(),
            'pending' => $lapak->where('status', 'pending')->count(),
            'approved' => $lapak->where('status', 'approved')->count(),
            'rejected' => $lapak->where('status', 'rejected')->count(),
        ]);
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
     * Hanya menampilkan produk default/placeholder untuk setiap lapak yang disetujui
     */
    public function getUserProducts()
    {
        try {
            // Ambil daftar nama usaha unik dari surat SKU yang disetujui  
            $approvedUsahaNames = Surat::where('status', 'disetujui')
                ->where('format_id', 2)
                ->pluck('form')
                ->map(function($form) {
                    return $form['nama_usaha'] ?? null;
                })
                ->filter()
                ->unique()
                ->values();

            $allProducts = [];
            
            // Untuk setiap nama usaha unique, buat entry placeholder
            foreach ($approvedUsahaNames as $namaUsaha) {
                // Cari lapak berdasarkan nama usaha
                $lapak = Lapak::where('nama', $namaUsaha)->first();
                
                if ($lapak) {
                    // Ambil surat yang paling baru untuk info tambahan
                    $surat = Surat::where('status', 'disetujui')
                        ->where('format_id', 2)
                        ->where('form->nama_usaha', $namaUsaha)
                        ->with(['penduduk'])
                        ->orderBy('updated_at', 'desc')
                        ->first();
                    
                    // Buat entry placeholder untuk lapak ini (bukan produk user)
                    $allProducts[] = [
                        'id' => $lapak->id,
                        'title' => $namaUsaha,
                        'price' => 'Rp 0', // Placeholder price
                        'category' => 'Umum',
                        'sellerName' => $namaUsaha,
                        'sellerPhone' => $lapak->telepon,
                        'description' => "Produk dari {$namaUsaha}",
                        'imgSrc' => '/placeholder-product.jpg',
                        'lapakName' => $namaUsaha,
                        'satuan' => 'pcs',
                        'status' => 'aktif',
                        // Info dari surat terbaru
                        'pengajuan_nama' => $surat ? ($surat->penduduk->nama ?? $surat->form['nama_pemohon'] ?? 'Tidak diketahui') : 'Tidak diketahui',
                        'nik' => $surat ? ($surat->form['nik'] ?? 'Tidak diketahui') : 'Tidak diketahui',
                        'nama_usaha' => $namaUsaha,
                        'jenis_usaha' => $surat ? ($surat->form['jenis_usaha'] ?? 'Tidak diketahui') : 'Tidak diketahui',
                        'alamat_usaha' => $surat ? ($surat->form['alamat_usaha'] ?? 'Tidak diketahui') : 'Tidak diketahui',
                        'lama_usaha' => $surat ? ($surat->form['lama_usaha'] ?? 'Tidak diketahui') : 'Tidak diketahui',
                        'tanggal_disetujui' => $surat ? $surat->updated_at->format('Y-m-d H:i:s') : 'Tidak diketahui'
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'data' => $allProducts,
                'total' => count($allProducts),
                'message' => 'Data lapak dari surat SKU yang disetujui berhasil diambil'
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
     * Get detail lapak berdasarkan slug/nama usaha untuk halaman detail
     */
    public function getLapakDetail($slug)
    {
        try {
            // Decode slug jika menggunakan URL encoding
            $namaUsaha = urldecode($slug);
            
            // Cari surat SKU yang disetujui dengan nama usaha yang sesuai
            $surat = Surat::where('status', 'disetujui')
                ->where('format_id', 2) // Format ID untuk SKU
                ->where('form->nama_usaha', 'LIKE', '%' . $namaUsaha . '%')
                ->with(['penduduk', 'format'])
                ->first();

            if (!$surat) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak tidak ditemukan atau belum disetujui'
                ], 404);
            }

            // Cari lapak yang dibuat dari surat ini
            $lapak = Lapak::where('nama', $surat->form['nama_usaha'])
                ->with(['products.kategori'])
                ->first();

            if (!$lapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data lapak tidak ditemukan'
                ], 404);
            }

            // Format data lapak detail
            $lapakDetail = [
                'id' => $lapak->id,
                'nama_lapak' => $lapak->nama,
                'slug' => $slug,
                'telepon' => $lapak->telepon,
                'alamat' => $surat->form['alamat_usaha'] ?? 'Tidak diketahui',
                'koordinat' => [
                    'lat' => $lapak->lat,
                    'lng' => $lapak->lng,
                    'zoom' => $lapak->zoom
                ],
                'status' => $lapak->status ? 'Aktif' : 'Nonaktif',
                
                // Info dari surat pengajuan
                'pemilik' => [
                    'nama' => $surat->penduduk->nama ?? $surat->form['nama_pemohon'] ?? 'Tidak diketahui',
                    'nik' => $surat->form['nik'] ?? 'Tidak diketahui',
                    'telepon' => $lapak->telepon
                ],
                'usaha' => [
                    'nama_usaha' => $surat->form['nama_usaha'] ?? $lapak->nama,
                    'jenis_usaha' => $surat->form['jenis_usaha'] ?? 'Tidak diketahui',
                    'alamat_usaha' => $surat->form['alamat_usaha'] ?? 'Tidak diketahui',
                    'lama_usaha' => $surat->form['lama_usaha'] ?? 'Tidak diketahui',
                    'tanggal_disetujui' => $surat->updated_at->format('d/m/Y H:i')
                ],
                
                // Produk-produk dari lapak ini
                'produk' => $lapak->products->map(function ($product) use ($lapak) {
                    return [
                        'id' => $product->id,
                        'nama' => $product->nama,
                        'harga' => $product->harga,
                        'harga_formatted' => 'Rp ' . number_format($product->harga, 0, ',', '.'),
                        'kategori' => $product->kategori ? $product->kategori->kategori : 'Tidak Berkategori',
                        'deskripsi' => $product->deskripsi,
                        'foto' => $product->foto ? '/storage/' . $product->foto : '/placeholder-product.jpg',
                        'satuan' => $product->satuan,
                        'status' => $product->status ? 'aktif' : 'nonaktif',
                        'stok' => $product->stok ?? 0
                    ];
                }),
                
                'total_produk' => $lapak->products->count(),
                'produk_aktif' => $lapak->products->where('status', true)->count()
            ];

            return response()->json([
                'status' => 'success',
                'data' => $lapakDetail,
                'message' => 'Detail lapak berhasil diambil'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch lapak detail',
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
