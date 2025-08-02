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
                        // Ambil surat-surat SKU yang sudah disetujui (format_id = 2 untuk SKU)
            $approvedSurats = Surat::where('status', 'disetujui')
                ->where('format_id', 2) // format_id untuk SKU
                ->with(['penduduk'])
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
     * Get produk dari lapak tertentu
     */
    public function getLapakProducts($slug)
    {
        try {
            $namaUsaha = urldecode($slug);
            
            $surat = Surat::where('status', 'disetujui')
                ->where('format_id', 2)
                ->where('form->nama_usaha', 'LIKE', '%' . $namaUsaha . '%')
                ->first();

            if (!$surat) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak tidak ditemukan'
                ], 404);
            }

            $lapak = Lapak::where('nama', $surat->form['nama_usaha'])
                ->with(['products.kategori'])
                ->first();

            if (!$lapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data lapak tidak ditemukan'
                ], 404);
            }

            $products = $lapak->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama' => $product->nama,
                    'harga' => $product->harga,
                    'harga_formatted' => 'Rp ' . number_format($product->harga, 0, ',', '.'),
                    'kategori_id' => $product->kategori_id,
                    'kategori' => $product->kategori ? $product->kategori->kategori : 'Tidak Berkategori',
                    'deskripsi' => $product->deskripsi,
                    'foto' => $product->foto ? '/storage/' . $product->foto : '/placeholder-product.jpg',
                    'satuan' => $product->satuan,
                    'status' => $product->status,
                    'stok' => $product->stok ?? 0
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => $products,
                'lapak' => [
                    'id' => $lapak->id,
                    'nama' => $lapak->nama
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Tambah produk baru ke lapak
     */
    public function storeLapakProduct($slug, Request $request)
    {
        try {
            $namaUsaha = urldecode($slug);
            
            $surat = Surat::where('status', 'disetujui')
                ->where('format_id', 2)
                ->where('form->nama_usaha', 'LIKE', '%' . $namaUsaha . '%')
                ->first();

            if (!$surat) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak tidak ditemukan'
                ], 404);
            }

            $lapak = Lapak::where('nama', $surat->form['nama_usaha'])->first();

            if (!$lapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data lapak tidak ditemukan'
                ], 404);
            }

            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'harga' => 'required|numeric|min:0',
                'kategori_id' => 'required|exists:kategori_produk,id',
                'deskripsi' => 'nullable|string',
                'satuan' => 'required|string|max:50',
                'stok' => 'nullable|integer|min:0',
                'foto' => 'nullable|image|max:2048',
                'status' => 'boolean'
            ]);

            // Handle file upload
            if ($request->hasFile('foto')) {
                $file = $request->file('foto');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('products', $filename, 'public');
                $validated['foto'] = $path;
            }

            $validated['lapak_id'] = $lapak->id;
            $validated['status'] = $validated['status'] ?? true;

            $product = \App\Models\Produk::create($validated);

            return response()->json([
                'status' => 'success',
                'data' => $product,
                'message' => 'Produk berhasil ditambahkan'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update produk
     */
    public function updateLapakProduct($slug, $productId, Request $request)
    {
        try {
            $namaUsaha = urldecode($slug);
            
            $surat = Surat::where('status', 'disetujui')
                ->where('format_id', 2)
                ->where('form->nama_usaha', 'LIKE', '%' . $namaUsaha . '%')
                ->first();

            if (!$surat) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak tidak ditemukan'
                ], 404);
            }

            $lapak = Lapak::where('nama', $surat->form['nama_usaha'])->first();

            if (!$lapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data lapak tidak ditemukan'
                ], 404);
            }

            $product = \App\Models\Produk::where('id', $productId)
                ->where('lapak_id', $lapak->id)
                ->first();

            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Produk tidak ditemukan'
                ], 404);
            }

            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'harga' => 'required|numeric|min:0',
                'kategori_id' => 'required|exists:kategori_produk,id',
                'deskripsi' => 'nullable|string',
                'satuan' => 'required|string|max:50',
                'stok' => 'nullable|integer|min:0',
                'foto' => 'nullable|image|max:2048',
                'status' => 'boolean'
            ]);

            // Handle file upload
            if ($request->hasFile('foto')) {
                // Delete old file if exists
                if ($product->foto && \Storage::disk('public')->exists($product->foto)) {
                    \Storage::disk('public')->delete($product->foto);
                }

                $file = $request->file('foto');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('products', $filename, 'public');
                $validated['foto'] = $path;
            }

            $product->update($validated);

            return response()->json([
                'status' => 'success',
                'data' => $product,
                'message' => 'Produk berhasil diupdate'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hapus produk
     */
    public function deleteLapakProduct($slug, $productId)
    {
        try {
            $namaUsaha = urldecode($slug);
            
            $surat = Surat::where('status', 'disetujui')
                ->where('format_id', 2)
                ->where('form->nama_usaha', 'LIKE', '%' . $namaUsaha . '%')
                ->first();

            if (!$surat) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Lapak tidak ditemukan'
                ], 404);
            }

            $lapak = Lapak::where('nama', $surat->form['nama_usaha'])->first();

            if (!$lapak) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data lapak tidak ditemukan'
                ], 404);
            }

            $product = \App\Models\Produk::where('id', $productId)
                ->where('lapak_id', $lapak->id)
                ->first();

            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Produk tidak ditemukan'
                ], 404);
            }

            // Delete file if exists
            if ($product->foto && \Storage::disk('public')->exists($product->foto)) {
                \Storage::disk('public')->delete($product->foto);
            }

            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Produk berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete product',
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
