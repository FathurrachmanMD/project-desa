<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KlasifikasiSurat extends Model
{
    use HashFactory;
    
    protected $table = "klasifikasi_surat";
}
