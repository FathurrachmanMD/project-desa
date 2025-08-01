<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriProduk extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi jamak
    protected $table = 'kategori_produk';

    protected $fillable = [
        'kategori',
        'slug',
        'status'
    ];

    /**
     * Get the products for the category.
     */
    public function produks(): HasMany
    {
        return $this->hasMany(Produk::class, 'kategori_id');
    }
}