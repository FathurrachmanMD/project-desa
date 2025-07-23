<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ProdukController extends Controller
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
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

            $validated["created_by"] = auth()->id();
            $validated["updated_by"] = auth()->id();

            $item = Produk::create($validated);
            return response()->json($item, 201);

        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
        //
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
        try {
            $item = Produk::findOrFail($id);
            $item->delete();
            return response()->json(['message' => 'Deleted successfully']);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Delete failed', 'error' => $e->getMessage()], 500);
        }
    }
}
