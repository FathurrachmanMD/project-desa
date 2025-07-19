import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  IzinPengelolaanLahan,
  PermohonanBantuan,
  SuratKeteranganPetani,
  SuratIzinIrigasi
} from '@/data/agricultural-permits';

interface AgriculturalPermitEditModalProps {
  data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi | null;
  type: 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => void;
}

interface FormData {
  [key: string]: string | number;
}

interface FormErrors {
  [key: string]: string;
}

export function AgriculturalPermitEditModal({ 
  data, 
  type, 
  open, 
  onOpenChange,
  onSave
}: AgriculturalPermitEditModalProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setErrors({});
    }
  }, [data, open]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (type === 'pengelolaan-lahan') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.lokasi_lahan) newErrors.lokasi_lahan = 'Lokasi lahan wajib diisi';
      if (!formData.tujuan_pengelolaan) newErrors.tujuan_pengelolaan = 'Tujuan pengelolaan wajib diisi';
      if (!formData.luas_lahan) newErrors.luas_lahan = 'Luas lahan wajib diisi';
    } else if (type === 'permohonan-bantuan') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.jenis_bantuan) newErrors.jenis_bantuan = 'Jenis bantuan wajib diisi';
      if (!formData.jumlah) newErrors.jumlah = 'Jumlah wajib diisi';
      if (!formData.alasan_kebutuhan) newErrors.alasan_kebutuhan = 'Alasan kebutuhan wajib diisi';
    } else if (type === 'surat-keterangan-petani') {
      if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
      if (!formData.jenis_profesi) newErrors.jenis_profesi = 'Jenis profesi wajib diisi';
      if (!formData.lokasi_bertani) newErrors.lokasi_bertani = 'Lokasi bertani wajib diisi';
      if (!formData.masa_aktif) newErrors.masa_aktif = 'Masa aktif wajib diisi';
      if (!formData.tujuan_surat) newErrors.tujuan_surat = 'Tujuan surat wajib diisi';
    } else if (type === 'surat-izin-irigasi') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.sumber_air) newErrors.sumber_air = 'Sumber air wajib diisi';
      if (!formData.lokasi_penggunaan_air) newErrors.lokasi_penggunaan_air = 'Lokasi penggunaan air wajib diisi';
      if (!formData.jenis_tanaman) newErrors.jenis_tanaman = 'Jenis tanaman wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedData = {
        ...formData,
        tanggal_diubah: new Date().toISOString(),
      };
      
      onSave(updatedData as unknown as IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi);
      onOpenChange(false);
      
      alert('Data perizinan berhasil diperbarui');
    } catch {
      alert('Terjadi kesalahan saat memperbarui data');
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'pengelolaan-lahan':
        return 'Edit Izin Pengelolaan Lahan Desa / Tanah Negara';
      case 'permohonan-bantuan':
        return 'Edit Permohonan Bantuan Pupuk / Bibit / Alat';
      case 'surat-keterangan-petani':
        return 'Edit Surat Keterangan Petani atau Buruh Tani';
      case 'surat-izin-irigasi':
        return 'Edit Surat Izin Irigasi / Air Pertanian';
      default:
        return 'Edit Perizinan Pertanian';
    }
  };

  const renderPengelolaanLahanForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pemohon">Nama Pemohon</Label>
          <Input
            id="nama_pemohon"
            placeholder="Masukkan nama pemohon"
            value={formData.nama_pemohon || ''}
            onChange={(e) => handleInputChange('nama_pemohon', e.target.value)}
            className={errors.nama_pemohon ? 'border-red-500' : ''}
          />
          {errors.nama_pemohon && (
            <span className="text-red-500 text-sm">{errors.nama_pemohon}</span>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tujuan_pengelolaan">Tujuan Pengelolaan</Label>
          <Input
            id="tujuan_pengelolaan"
            placeholder="Masukkan tujuan pengelolaan"
            value={formData.tujuan_pengelolaan || ''}
            onChange={(e) => handleInputChange('tujuan_pengelolaan', e.target.value)}
            className={errors.tujuan_pengelolaan ? 'border-red-500' : ''}
          />
          {errors.tujuan_pengelolaan && (
            <span className="text-red-500 text-sm">{errors.tujuan_pengelolaan}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_lahan">Lokasi Lahan</Label>
        <Input
          id="lokasi_lahan"
          placeholder="Masukkan lokasi lahan"
          value={formData.lokasi_lahan || ''}
          onChange={(e) => handleInputChange('lokasi_lahan', e.target.value)}
          className={errors.lokasi_lahan ? 'border-red-500' : ''}
        />
        {errors.lokasi_lahan && (
          <span className="text-red-500 text-sm">{errors.lokasi_lahan}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="luas_lahan">Luas Lahan</Label>
          <Input
            id="luas_lahan"
            placeholder="Masukkan luas lahan"
            value={formData.luas_lahan || ''}
            onChange={(e) => handleInputChange('luas_lahan', e.target.value)}
            className={errors.luas_lahan ? 'border-red-500' : ''}
          />
          {errors.luas_lahan && (
            <span className="text-red-500 text-sm">{errors.luas_lahan}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status Pengajuan</Label>
          <Select value={formData.status as string} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diproses">Diproses</SelectItem>
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPermohonanBantuanForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pemohon">Nama Pemohon</Label>
          <Input
            id="nama_pemohon"
            placeholder="Masukkan nama pemohon"
            value={formData.nama_pemohon || ''}
            onChange={(e) => handleInputChange('nama_pemohon', e.target.value)}
            className={errors.nama_pemohon ? 'border-red-500' : ''}
          />
          {errors.nama_pemohon && (
            <span className="text-red-500 text-sm">{errors.nama_pemohon}</span>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jenis_bantuan">Jenis Bantuan</Label>
          <Input
            id="jenis_bantuan"
            placeholder="Masukkan jenis bantuan"
            value={formData.jenis_bantuan || ''}
            onChange={(e) => handleInputChange('jenis_bantuan', e.target.value)}
            className={errors.jenis_bantuan ? 'border-red-500' : ''}
          />
          {errors.jenis_bantuan && (
            <span className="text-red-500 text-sm">{errors.jenis_bantuan}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jumlah">Jumlah / Volume</Label>
          <Input
            id="jumlah"
            placeholder="Masukkan jumlah atau volume"
            value={formData.jumlah || ''}
            onChange={(e) => handleInputChange('jumlah', e.target.value)}
            className={errors.jumlah ? 'border-red-500' : ''}
          />
          {errors.jumlah && (
            <span className="text-red-500 text-sm">{errors.jumlah}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status Pengajuan</Label>
          <Select value={formData.status as string} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diproses">Diproses</SelectItem>
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alasan_kebutuhan">Alasan Kebutuhan</Label>
        <Input
          id="alasan_kebutuhan"
          placeholder="Masukkan alasan kebutuhan"
          value={formData.alasan_kebutuhan || ''}
          onChange={(e) => handleInputChange('alasan_kebutuhan', e.target.value)}
          className={errors.alasan_kebutuhan ? 'border-red-500' : ''}
        />
        {errors.alasan_kebutuhan && (
          <span className="text-red-500 text-sm">{errors.alasan_kebutuhan}</span>
        )}
      </div>
    </div>
  );

  const renderSuratKeteranganPetaniForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            id="nama"
            placeholder="Masukkan nama"
            value={formData.nama || ''}
            onChange={(e) => handleInputChange('nama', e.target.value)}
            className={errors.nama ? 'border-red-500' : ''}
          />
          {errors.nama && (
            <span className="text-red-500 text-sm">{errors.nama}</span>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jenis_profesi">Jenis Profesi</Label>
          <Select value={formData.jenis_profesi as string} onValueChange={(value) => handleInputChange('jenis_profesi', value)}>
            <SelectTrigger className={errors.jenis_profesi ? 'border-red-500' : ''}>
              <SelectValue placeholder="Pilih jenis profesi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petani">Petani</SelectItem>
              <SelectItem value="Buruh Tani">Buruh Tani</SelectItem>
            </SelectContent>
          </Select>
          {errors.jenis_profesi && (
            <span className="text-red-500 text-sm">{errors.jenis_profesi}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_bertani">Lokasi Bertani</Label>
        <Input
          id="lokasi_bertani"
          placeholder="Masukkan lokasi bertani"
          value={formData.lokasi_bertani || ''}
          onChange={(e) => handleInputChange('lokasi_bertani', e.target.value)}
          className={errors.lokasi_bertani ? 'border-red-500' : ''}
        />
        {errors.lokasi_bertani && (
          <span className="text-red-500 text-sm">{errors.lokasi_bertani}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="masa_aktif">Masa Aktif Bertani</Label>
          <Input
            id="masa_aktif"
            placeholder="Masukkan masa aktif bertani"
            value={formData.masa_aktif || ''}
            onChange={(e) => handleInputChange('masa_aktif', e.target.value)}
            className={errors.masa_aktif ? 'border-red-500' : ''}
          />
          {errors.masa_aktif && (
            <span className="text-red-500 text-sm">{errors.masa_aktif}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status Pengajuan</Label>
          <Select value={formData.status as string} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diproses">Diproses</SelectItem>
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tujuan_surat">Tujuan Surat</Label>
        <Input
          id="tujuan_surat"
          placeholder="Masukkan tujuan surat"
          value={formData.tujuan_surat || ''}
          onChange={(e) => handleInputChange('tujuan_surat', e.target.value)}
          className={errors.tujuan_surat ? 'border-red-500' : ''}
        />
        {errors.tujuan_surat && (
          <span className="text-red-500 text-sm">{errors.tujuan_surat}</span>
        )}
      </div>
    </div>
  );

  const renderSuratIzinIrigasiForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pemohon">Nama Pemohon</Label>
          <Input
            id="nama_pemohon"
            placeholder="Masukkan nama pemohon"
            value={formData.nama_pemohon || ''}
            onChange={(e) => handleInputChange('nama_pemohon', e.target.value)}
            className={errors.nama_pemohon ? 'border-red-500' : ''}
          />
          {errors.nama_pemohon && (
            <span className="text-red-500 text-sm">{errors.nama_pemohon}</span>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sumber_air">Sumber Air</Label>
          <Input
            id="sumber_air"
            placeholder="Masukkan sumber air"
            value={formData.sumber_air || ''}
            onChange={(e) => handleInputChange('sumber_air', e.target.value)}
            className={errors.sumber_air ? 'border-red-500' : ''}
          />
          {errors.sumber_air && (
            <span className="text-red-500 text-sm">{errors.sumber_air}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_penggunaan_air">Lokasi Penggunaan Air</Label>
        <Input
          id="lokasi_penggunaan_air"
          placeholder="Masukkan lokasi penggunaan air"
          value={formData.lokasi_penggunaan_air || ''}
          onChange={(e) => handleInputChange('lokasi_penggunaan_air', e.target.value)}
          className={errors.lokasi_penggunaan_air ? 'border-red-500' : ''}
        />
        {errors.lokasi_penggunaan_air && (
          <span className="text-red-500 text-sm">{errors.lokasi_penggunaan_air}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jenis_tanaman">Jenis Tanaman</Label>
          <Input
            id="jenis_tanaman"
            placeholder="Masukkan jenis tanaman"
            value={formData.jenis_tanaman || ''}
            onChange={(e) => handleInputChange('jenis_tanaman', e.target.value)}
            className={errors.jenis_tanaman ? 'border-red-500' : ''}
          />
          {errors.jenis_tanaman && (
            <span className="text-red-500 text-sm">{errors.jenis_tanaman}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status Pengajuan</Label>
          <Select value={formData.status as string} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diproses">Diproses</SelectItem>
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'pengelolaan-lahan':
        return renderPengelolaanLahanForm();
      case 'permohonan-bantuan':
        return renderPermohonanBantuanForm();
      case 'surat-keterangan-petani':
        return renderSuratKeteranganPetaniForm();
      case 'surat-izin-irigasi':
        return renderSuratIzinIrigasiForm();
      default:
        return null;
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
