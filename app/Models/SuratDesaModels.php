<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriSurat extends Model
{
    use HasFactory;

    protected $table = 'kategori_surat';

    protected $fillable = [
        'nama_kategori',
        'deskripsi',
        'icon',
        'warna',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Relasi dengan jenis surat
     */
    public function jenis_surat()
    {
        return $this->hasMany(JenisSurat::class, 'kategori_id');
    }

    /**
     * Relasi dengan pengajuan surat melalui jenis surat
     */
    public function pengajuan_surat()
    {
        return $this->hasManyThrough(PengajuanSurat::class, JenisSurat::class, 'kategori_id', 'jenis_surat_id');
    }

    /**
     * Scope untuk kategori aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}

class JenisSurat extends Model
{
    use HasFactory;

    protected $table = 'jenis_surat';

    protected $fillable = [
        'kategori_id',
        'nama_surat',
        'kode_surat',
        'deskripsi',
        'persyaratan',
        'template_surat',
        'biaya',
        'masa_berlaku_hari',
        'perlu_approval_kepala_desa',
        'estimasi_selesai_hari',
        'is_active',
    ];

    protected $casts = [
        'persyaratan' => 'array',
        'biaya' => 'decimal:2',
        'masa_berlaku_hari' => 'integer',
        'perlu_approval_kepala_desa' => 'boolean',
        'estimasi_selesai_hari' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi dengan kategori surat
     */
    public function kategori()
    {
        return $this->belongsTo(KategoriSurat::class, 'kategori_id');
    }

    /**
     * Relasi dengan pengajuan surat
     */
    public function pengajuan_surat()
    {
        return $this->hasMany(PengajuanSurat::class, 'jenis_surat_id');
    }

    /**
     * Scope untuk jenis surat aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}

class Pemohon extends Model
{
    use HasFactory;

    protected $table = 'pemohon';

    protected $fillable = [
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'status_perkawinan',
        'pekerjaan',
        'alamat_lengkap',
        'rt',
        'rw',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'kode_pos',
        'no_telepon',
        'email',
        'foto_ktp',
        'foto_kk',
        'is_active',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi dengan pengajuan surat
     */
    public function pengajuan_surat()
    {
        return $this->hasMany(PengajuanSurat::class, 'pemohon_id');
    }

    /**
     * Scope untuk pemohon aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Accessor untuk alamat lengkap dengan RT/RW
     */
    public function getAlamatLengkapFormatAttribute()
    {
        return $this->alamat_lengkap . " RT {$this->rt} RW {$this->rw}, {$this->kelurahan}, {$this->kecamatan}, {$this->kabupaten}";
    }
}

class PengajuanSurat extends Model
{
    use HasFactory;

    protected $table = 'pengajuan_surat';

    protected $fillable = [
        'nomor_pengajuan',
        'pemohon_id',
        'jenis_surat_id',
        'tujuan_surat',
        'data_tambahan',
        'dokumen_pendukung',
        'status',
        'keterangan',
        'tanggal_pengajuan',
        'tanggal_verifikasi',
        'tanggal_selesai',
        'diverifikasi_oleh',
        'disetujui_oleh',
        'prioritas',
        'estimasi_selesai',
        'biaya_total',
        'status_pembayaran',
    ];

    protected $casts = [
        'data_tambahan' => 'array',
        'dokumen_pendukung' => 'array',
        'tanggal_pengajuan' => 'datetime',
        'tanggal_verifikasi' => 'datetime',
        'tanggal_selesai' => 'datetime',
        'estimasi_selesai' => 'date',
        'biaya_total' => 'decimal:2',
    ];

    /**
     * Relasi dengan pemohon
     */
    public function pemohon()
    {
        return $this->belongsTo(Pemohon::class, 'pemohon_id');
    }

    /**
     * Relasi dengan jenis surat
     */
    public function jenis_surat()
    {
        return $this->belongsTo(JenisSurat::class, 'jenis_surat_id');
    }

    /**
     * Relasi dengan user yang memverifikasi
     */
    public function verifikator()
    {
        return $this->belongsTo(User::class, 'diverifikasi_oleh');
    }

    /**
     * Relasi dengan user yang menyetujui
     */
    public function penyetuju()
    {
        return $this->belongsTo(User::class, 'disetujui_oleh');
    }

    /**
     * Relasi dengan surat hasil
     */
    public function surat_hasil()
    {
        return $this->hasOne(SuratHasil::class, 'pengajuan_id');
    }

    /**
     * Relasi dengan riwayat status
     */
    public function riwayat_status()
    {
        return $this->hasMany(RiwayatStatus::class, 'pengajuan_id');
    }

    /**
     * Scope untuk filter berdasarkan status
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk filter berdasarkan prioritas
     */
    public function scopePrioritas($query, $prioritas)
    {
        return $query->where('prioritas', $prioritas);
    }

    /**
     * Scope untuk pengajuan hari ini
     */
    public function scopeToday($query)
    {
        return $query->whereDate('tanggal_pengajuan', today());
    }

    /**
     * Scope untuk pengajuan bulan ini
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('tanggal_pengajuan', now()->month)
                    ->whereYear('tanggal_pengajuan', now()->year);
    }

    /**
     * Accessor untuk status label
     */
    public function getStatusLabelAttribute()
    {
        $labels = [
            'draft' => 'Draft',
            'menunggu_verifikasi' => 'Menunggu Verifikasi',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'revisi' => 'Perlu Revisi',
        ];

        return $labels[$this->status] ?? $this->status;
    }

    /**
     * Accessor untuk prioritas label
     */
    public function getPrioritasLabelAttribute()
    {
        $labels = [
            'rendah' => 'Rendah',
            'normal' => 'Normal',
            'tinggi' => 'Tinggi',
            'urgent' => 'Urgent',
        ];

        return $labels[$this->prioritas] ?? $this->prioritas;
    }

    /**
     * Accessor untuk status warna
     */
    public function getStatusColorAttribute()
    {
        $colors = [
            'draft' => 'gray',
            'menunggu_verifikasi' => 'yellow',
            'disetujui' => 'green',
            'ditolak' => 'red',
            'revisi' => 'blue',
        ];

        return $colors[$this->status] ?? 'gray';
    }

    /**
     * Accessor untuk prioritas warna
     */
    public function getPrioritasColorAttribute()
    {
        $colors = [
            'rendah' => 'green',
            'normal' => 'blue',
            'tinggi' => 'yellow',
            'urgent' => 'red',
        ];

        return $colors[$this->prioritas] ?? 'blue';
    }
}

class SuratHasil extends Model
{
    use HasFactory;

    protected $table = 'surat_hasil';

    protected $fillable = [
        'pengajuan_id',
        'nomor_surat',
        'isi_surat',
        'file_pdf',
        'tanggal_berlaku',
        'tanggal_kadaluarsa',
        'ditandatangani_oleh',
        'qr_code',
        'is_active',
    ];

    protected $casts = [
        'tanggal_berlaku' => 'date',
        'tanggal_kadaluarsa' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi dengan pengajuan surat
     */
    public function pengajuan()
    {
        return $this->belongsTo(PengajuanSurat::class, 'pengajuan_id');
    }

    /**
     * Relasi dengan user yang menandatangani
     */
    public function penandatangan()
    {
        return $this->belongsTo(User::class, 'ditandatangani_oleh');
    }

    /**
     * Scope untuk surat aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Accessor untuk status berlaku
     */
    public function getStatusBerlakuAttribute()
    {
        if (!$this->tanggal_kadaluarsa) {
            return 'Berlaku Selamanya';
        }

        if ($this->tanggal_kadaluarsa < now()) {
            return 'Kadaluarsa';
        }

        return 'Berlaku';
    }
}

class RiwayatStatus extends Model
{
    use HasFactory;

    protected $table = 'riwayat_status';

    protected $fillable = [
        'pengajuan_id',
        'status_lama',
        'status_baru',
        'keterangan',
        'diubah_oleh',
    ];

    /**
     * Relasi dengan pengajuan surat
     */
    public function pengajuan()
    {
        return $this->belongsTo(PengajuanSurat::class, 'pengajuan_id');
    }

    /**
     * Relasi dengan user yang mengubah status
     */
    public function pengubah()
    {
        return $this->belongsTo(User::class, 'diubah_oleh');
    }
}
