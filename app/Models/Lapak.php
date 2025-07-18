<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lapak extends Model
{
    use HasFactory;

    protected $table = 'lapak';

    protected $fillable = [
        'penduduk_id',
        'telepon',
        'lat',
        'lng',
        'zoom',
        'status',
        'created_by',
        'updated_by',
    ];

    // Optional: Relationships
    public function penduduk()
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id', 'id');
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
