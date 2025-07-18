<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        // DB::beginTransaction();

        // $request->validate([
        //     'jenis' => 'required|enum:masuk,keluar',
        //     'nomor_urut' => 'nullable|integer',
        //     'nomor_surat' => 'nullable|string|max:35',
        //     'kode_surat' => 'nullable|string|max:10',
        //     'tanggal_surat' => 'required|date',
        //     'tanggal_penerimaan' => 'nullable|date',
        //     'pengirim' => 'nullable|string|max:255',
        //     'tujuan' => 'nullable|string|max:255',
        //     'isi_singkat' => 'nullable|string|max:255',
        //     'isi_disposisi' => 'nullable|string|max:255',
        //     'berkas_scan' => 'nullable|string|max:255',
        //     'lokasi_arsip' => 'nullable|string|max:255',
        //     'ekspedisi' => 'nullable|boolean',
        //     'tanda_terima' => 'nullable|string|max:255',
        //     'keterangan' => 'nullable|string|max:255',
        // ]);

        // $surat = new Surat();
        // $surat->jenis = $request->jenis;
        // $surat->nomor_urut = $request->nomor_urut;
        // $surat->nomor_surat = $request->nomor_surat;
        // $surat->kode_surat = $request->kode_surat;
        // $surat->tanggal_surat = $request->tanggal_surat;
        // $surat->tanggal_catat= now();
        // $surat->tanggal_penerimaan = $request->tanggal_penerimaan;
        // $surat->pengirim = $request->pengirim;
        // $surat->tujuan = $request->tujuan;
        // $surat->isi_singkat = $request->isi_singkat;
        // $surat->isi_disposisi = $request->isi_disposisi;
        // $surat->berkas_scan = $request->berkas_scan;        
        // $surat->lokasi_arsip = $request->lokasi_arsip;
        // $surat->ekspedisi = $request->ekspedisi;
        // $surat->tanda_terima = $request->tanda_terima;
        // $surat->keterangan = $request->keterangan;
        // $surat->created_at = now();
        // $surat->updated_at = now();
        // $surat->created_by = auth()->user()->id;
        // $surat->updated_by = auth()->user()->id;

        // $surat->save();

        // DB::commit();
        return response()->json(['message' => 'POST OK']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Surat $surat)
    {
        //
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
    public function update(Request $request, Surat $surat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Surat $surat)
    {
        //
    }
}
