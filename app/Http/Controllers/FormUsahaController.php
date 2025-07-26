<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\FormatSurat;

class FormUsahaController extends Controller
{
    public function index()
    {
        $formats = FormatSurat::with('kategori', 'syarat')
            ->where('kategori_id', 1)
            ->orWhereHas('kategori', function ($query) {
                $query->where('nama', 'Perizinan Usaha');
            })
            ->get();

        return response()->json($formats);
    }
}