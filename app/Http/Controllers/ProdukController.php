<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Lapak;
use App\Models\KategoriProduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ambil semua data penduduk
        $produk = Produk::with(['lapak'])->get();
        $slug = 'produk';

        // Hitung jumlah total dan berdasarkan status
        $total      = $produk->count();

        // Return sesuai format yang kamu mau
        return Inertia::render('admin/produk/index', [
            'slug' => $slug,
            'data' => [
                $slug => $produk
            ],
            'total' => [
                $slug => $total
            ],
            'diproses' => [
                $slug => $produk->where('status', 'diproses')->count()
            ],
            'disetujui' => [
                $slug => $produk->where('status', 'disetujui')->count()
            ],
            'ditolak' => [
                $slug => $produk->where('status', 'ditolak')->count()
            ],
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
                'lapak_id'      => 'nullable|exists:lapak,id',
                'kategori_id'   => 'nullable|exists:kategori_produk,id',
                'kategori_produk' => 'nullable|string',
                'nama'          => 'required|string',
                'harga'         => 'nullable|integer',
                'satuan'        => 'nullable|string|max:20',
                'tipe_potongan' => 'boolean',
                'potongan'      => 'nullable|integer',
                'deskripsi'     => 'nullable|string',
                'foto'          => 'nullable|file|mimes:jpg,jpeg,png',
                'surat'          => 'nullable|file|mimes:pdf,jpg,jpeg,png',
            ]);

            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store('foto', 'public');
                $url = Storage::disk('public')->url($path);
                $validated['foto'] = $url;
            }
            if ($request->hasFile('surat')) {
                $path = $request->file('surat')->store('surat', 'public');
                $url = Storage::disk('public')->url($path);
                $validated['surat'] = $url;
            }

            if (!empty($validated['kategori_produk'])) {
                $kategori = KategoriProduk::where('slug', $validated['kategori_produk'])->first();

                if ($kategori) {
                    $validated['kategori_id'] = $kategori->id;
                }
            }

            $validated["created_by"] = auth()->id();
            $validated["updated_by"] = auth()->id();

            $item = Produk::create($validated);

            return response()->json($item, 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error', 'error' => $e->getMessage()], 500);
        }
    }


    public function show(Request $req, $id = null)
    {
        $produkData = null;
        
        // --- EDIT MODE ---
        // If an ID is provided, fetch the existing data.
        if ($id) {
            $produk = Produk::findOrFail($id);

            // Prepare a simple, flat array of data for the 'produk' prop.
            // The keys here MUST match the keys in the `inputs` config of the React component.
            $produkData = [
                'nama'      => $produk->nama,
                'harga'     => $produk->harga,
                'satuan'    => $produk->satuan,
                'deskripsi' => $produk->deskripsi,
                'stok'      => $produk->stok,
                'status'    => $produk->status,
            ];
        }
        
        // --- RENDER INERTIA VIEW ---
        // The component path 'Produk/Form' should map to 'resources/js/Pages/Produk/Form.tsx'.
        return Inertia::render('admin/produk/form', [
            'id' => $id,
            /**
             * Pass the flattened $produkData object.
             * If we are in create mode, this will be null, and the React
             * component will initialize its own default empty state.
             */
            'produk' => $produkData,
            'slug'   => 'produk', // Example slug, can be made dynamic if needed.
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $item = Produk::findOrFail($id);

            $validated = $request->validate([
                'lapak_id'      => 'nullable|exists:lapak,id',
                'kategori_id'   => 'nullable|exists:kategori_produk,id',
                'nama'          => 'nullable|string',
                'harga'         => 'nullable|integer',
                'satuan'        => 'nullable|string|max:20',
                'tipe_potongan' => 'nullable|boolean',
                'potongan'      => 'nullable|integer',
                'deskripsi'     => 'nullable|string',
                'foto'          => 'nullable|string|max:225',
                'status'        => 'boolean',
            ]);
            
            $validated["updated_by"] = auth()->id();

            $item->update($validated);
            return response()->json($item);

        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $slug = 'produk';

        try {
            $produk = Produk::findOrFail($id);
            $produk->delete();

            return redirect()->route('produk.index', $slug)
                ->with('success', 'produk berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            return redirect()->route('produk.index', $slug)
                ->with('error', 'produk tidak ditemukan');
        } catch (\Exception $e) {
            return redirect()->route('produk.index', $slug)
                ->with('error', 'Gagal menghapus produk: ' . $e->getMessage());
        }
    }
}
