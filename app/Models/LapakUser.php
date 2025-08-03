<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LapakUser extends Model
{
    use HasFactory;

    protected $table = 'lapak_user';

    protected $fillable = [
        'nama_usaha',
        'slug',
        'pemilik_nama',
        'pemilik_nik',
        'jenis_usaha',
        'alamat_usaha',
        'telepon',
        'email',
        'status',
        'tanggal_disetujui',
        'surat_id',
        'penduduk_id',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'tanggal_disetujui' => 'datetime',
        'status' => 'boolean',
    ];

    // Relationships
    public function surat()
    {
        return $this->belongsTo(Surat::class, 'surat_id', 'id');
    }

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

    public function produk()
    {
        return $this->hasMany(Produk::class, 'lapak_user_id', 'id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    public function scopeBySlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    // Mutators
    public function setNamaUsahaAttribute($value)
    {
        $this->attributes['nama_usaha'] = $value;
        $this->attributes['slug'] = \Str::slug($value);
    }

    // Accessors
    public function getStatusTextAttribute()
    {
        return $this->status ? 'Aktif' : 'Nonaktif';
    }

    public function getTanggalDisetujuiFormattedAttribute()
    {
        return $this->tanggal_disetujui ? $this->tanggal_disetujui->format('d F Y') : null;
    }
}
