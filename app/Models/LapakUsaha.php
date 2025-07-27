<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LapakUsaha extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_produk',
        'harga_produk',
        'kategori_id',
        'deskripsi',
        'nama_penjual',
        'no_whatsapp',
        'link_gambar',
        'status',
    ];

    /**
     * Get the category that owns the product.
     */
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriProduk::class);
    }
}