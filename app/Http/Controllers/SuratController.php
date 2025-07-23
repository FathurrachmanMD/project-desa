<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Enums\JenisSuratEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SuratController extends Controller
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
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'format_id'     => 'required|exists:format_surat,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'in:draft,diajukan,disetujui,ditolak,dicetak',
            ]);

            $validated['created_by'] = auth()->id();
            $validated['updated_by'] = auth()->id();

            $surat = Surat::create($validated);

            return response()->json($surat, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Surat $surat)
    {
        try {
            $surats = Surat::all();
            
            return response()->json([
                'message' => 'Surat berhasil ditampilkan',
                'total' => $surats->count(),
                'data' => $surats
            ])->setStatusCode(200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Surat Gagal ditampilkan: ' . $th->getMessage()])->setStatusCode(500);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Surat Gagal ditampilkan: ' . $e->getMessage()])->setStatusCode(500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Surat $surat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $item = Surat::findOrFail($id);

            $validated = $request->validate([
                'penduduk_id'   => 'nullable|exists:penduduk,id',
                'format_id'     => 'nullable|exists:format_surat,id',
                'nomor_surat'   => 'nullable|string|max:255',
                'kode_surat'    => 'nullable|string|max:255',
                'form'          => 'nullable|array',
                'syarat'        => 'nullable|array',
                'status'        => 'in:draft,diajukan,disetujui,ditolak,dicetak',
            ]);

            $validated['updated_by'] = auth()->id();

            $item->update($validated);

            return response()->json($item);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $e->errors()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Surat $surat, $id)
    {
        try {
            $surat = Surat::findOrFail($id);
            $surat->delete();

            return response()->json([
            'message' => 'Surat berhasil dihapus',
            ])->setStatusCode(200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Surat gagal dihapus: ' . $th->getMessage()])->setStatusCode(500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Surat gagal dihapus: ' . $e->getMessage()])->setStatusCode(500);
        }
    }
}
