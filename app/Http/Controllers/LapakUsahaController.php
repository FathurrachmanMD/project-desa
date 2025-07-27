<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProdukRequest;
use App\Models\KategoriProduk;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    public function index(): Response
    {
        // ✨ DIUBAH: Hanya ambil produk dengan status 'approved'
        $productsFromDb = Produk::with('kategori')
            ->where('status', 'approved')
            ->latest()
            ->get();

        $products = $productsFromDb->map(function ($produk) {
            return [
                'id'          => $produk->id,
                'imgSrc'      => $produk->link_gambar,
                'title'       => $produk->nama_produk,
                'price'       => $produk->harga_produk,
                'category'    => $produk->kategori->nama,
                'sellerName'  => $produk->nama_penjual,
                'sellerPhone' => $produk->no_whatsapp,
                'description' => $produk->deskripsi,
            ];
        });

        return Inertia::render('LapakUsaha', [
            'initialProducts' => $products
        ]);
    }

    public function store(StoreProdukRequest $request)
    {
        $validated = $request->validated();
        $kategori = KategoriProduk::where('nama', $validated['category'])->firstOrFail();

        // ✨ DIUBAH: Saat membuat produk, status otomatis diatur ke 'pending'
        Produk::create([
            'nama_produk'  => $validated['title'],
            'harga_produk' => $validated['price'],
            'kategori_id'  => $kategori->id,
            'deskripsi'    => $validated['description'],
            'nama_penjual' => $validated['sellerName'],
            'no_whatsapp'  => $validated['sellerPhone'],
            'link_gambar'  => $validated['imgSrc'],
            'status'       => 'pending', // Status default saat pengajuan
        ]);

        return to_route('lapak.index')->with('message', 'Produk berhasil diajukan dan akan segera direview!');
    }
}