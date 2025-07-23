<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produk extends Model
{
    use HasFactory;

    protected $table = 'produk';

    protected $fillable = [
        'lapak_id',
        'kategori_id',
        'nama',
        'harga',
        'satuan',
        'tipe_potongan',
        'potongan',
        'deskripsi',
        'foto',
        'status',
        'created_by',
        'updated_by',
    ];

    // Relationships
    public function lapak()
    {
        return $this->belongsTo(Lapak::class, 'lapak_id', 'id');
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriProduk::class, 'kategori_id', 'id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
