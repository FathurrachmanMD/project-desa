<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Surat extends Model
{
    use HasFactory;

    protected $table = "surat";

    protected $fillable = [
        'penduduk_id',
        'format_id',
        'nomor_surat',
        'kode_surat',
        'form',
        'syarat',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'form' => 'array',
        'syarat' => 'array',
    ];

    // Relasi ke Penduduk
    public function penduduk()
    {
        return $this->belongsTo(Penduduk::class);
    }

    // Relasi ke FormatSurat
    public function format()
    {
        return $this->belongsTo(FormatSurat::class, 'format_id');
    }

    // User yang membuat surat
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // User yang terakhir mengubah surat
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
