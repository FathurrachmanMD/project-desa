<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Penduduk;
use App\Models\User;
use App\Models\Surat;

class Lapak extends Model
{
    use HasFactory;

    protected $table = 'lapak';

    protected $fillable = [
        'penduduk_id',
        'nama',
        'deskripsi',
        'jenis_usaha',
        'telepon',
        'email',
        'alamat',
        'lat',
        'lng',
        'zoom',
        'status',
        'surat_id',
        'created_by',
        'updated_by',
    ];

    // Optional: Relationships
    public function penduduk()
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function surat()
    {
        return $this->belongsTo(Surat::class, 'surat_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function produk()
    {
        return $this->hasMany(Produk::class, 'lapak_id', 'id');
    }
}
