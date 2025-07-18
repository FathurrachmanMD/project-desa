<?php

namespace App\Http\Controllers;

use App\Models\Lapak;
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
