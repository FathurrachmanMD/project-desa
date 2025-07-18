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
import { Loader2 } from 'lucide-react';
import { 
  IzinMendirikanBangunan,
  IzinBangunLahanDesa,
  SuratTidakSengketaTanah,
  IzinRenovasiPerluasan
} from '@/data/building-permits';

interface BuildingPermitEditModalProps {
  data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan | null;
  type: 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => void;
}

interface FormData {
  [key: string]: string | number;
}

interface FormErrors {
  [key: string]: string;
}

export function BuildingPermitEditModal({ 
  data, 
  type, 
  open, 
  onOpenChange,
  onSave
}: BuildingPermitEditModalProps) {
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

    if (type === 'imb') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.alamat_bangunan) newErrors.alamat_bangunan = 'Alamat bangunan wajib diisi';
      if (!formData.jenis_bangunan) newErrors.jenis_bangunan = 'Jenis bangunan wajib diisi';
      if (!formData.status_tanah) newErrors.status_tanah = 'Status tanah wajib diisi';
    } else if (type === 'lahan-desa') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.nama_lahan) newErrors.nama_lahan = 'Nama lahan wajib diisi';
      if (!formData.tujuan_pembangunan) newErrors.tujuan_pembangunan = 'Tujuan pembangunan wajib diisi';
      if (!formData.rekomendasi_kades) newErrors.rekomendasi_kades = 'Rekomendasi kepala desa wajib diisi';
    } else if (type === 'tidak-sengketa') {
      if (!formData.nama_pemilik_tanah) newErrors.nama_pemilik_tanah = 'Nama pemilik tanah wajib diisi';
      if (!formData.lokasi_tanah) newErrors.lokasi_tanah = 'Lokasi tanah wajib diisi';
      if (!formData.status_sengketa) newErrors.status_sengketa = 'Status sengketa wajib diisi';
      if (!formData.tujuan_penggunaan) newErrors.tujuan_penggunaan = 'Tujuan penggunaan wajib diisi';
    } else if (type === 'renovasi') {
      if (!formData.nama_pemilik) newErrors.nama_pemilik = 'Nama pemilik wajib diisi';
      if (!formData.lokasi_bangunan) newErrors.lokasi_bangunan = 'Lokasi bangunan wajib diisi';
      if (!formData.jenis_renovasi) newErrors.jenis_renovasi = 'Jenis renovasi wajib diisi';
      if (!formData.status_tanah) newErrors.status_tanah = 'Status tanah wajib diisi';
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
      
      onSave(updatedData as unknown as IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan);
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
      case 'imb':
        return 'Edit Izin Mendirikan Bangunan (IMB/PBG)';
      case 'lahan-desa':
        return 'Edit Izin Bangun di Lahan Milik Desa';
      case 'tidak-sengketa':
        return 'Edit Surat Tidak Sengketa Tanah';
      case 'renovasi':
        return 'Edit Izin Renovasi atau Perluasan Bangunan';
      default:
        return 'Edit Perizinan Bangunan';
    }
  };

  const renderIMBForm = () => (
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
            <p className="text-sm text-red-500">{errors.nama_pemohon}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jenis_bangunan">Jenis Bangunan</Label>
          <Input
            id="jenis_bangunan"
            placeholder="Masukkan jenis bangunan"
            value={formData.jenis_bangunan || ''}
            onChange={(e) => handleInputChange('jenis_bangunan', e.target.value)}
            className={errors.jenis_bangunan ? 'border-red-500' : ''}
          />
          {errors.jenis_bangunan && (
            <p className="text-sm text-red-500">{errors.jenis_bangunan}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_bangunan">Alamat Bangunan</Label>
        <Input
          id="alamat_bangunan"
          placeholder="Masukkan alamat bangunan"
          value={formData.alamat_bangunan || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('alamat_bangunan', e.target.value)}
          className={errors.alamat_bangunan ? 'border-red-500' : ''}
        />
        {errors.alamat_bangunan && (
          <p className="text-sm text-red-500">{errors.alamat_bangunan}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status_tanah">Status Tanah</Label>
          <Select
            value={formData.status_tanah as string || ''}
            onValueChange={(value) => handleInputChange('status_tanah', value)}
          >
            <SelectTrigger className={errors.status_tanah ? 'border-red-500' : ''}>
              <SelectValue placeholder="Pilih status tanah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Milik sendiri">Milik sendiri</SelectItem>
              <SelectItem value="Sewa">Sewa</SelectItem>
            </SelectContent>
          </Select>
          {errors.status_tanah && (
            <p className="text-sm text-red-500">{errors.status_tanah}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status as string || ''}
            onValueChange={(value) => handleInputChange('status', value)}
          >
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

  const renderLahanDesaForm = () => (
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
            <p className="text-sm text-red-500">{errors.nama_pemohon}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tujuan_pembangunan">Tujuan Pembangunan</Label>
          <Input
            id="tujuan_pembangunan"
            placeholder="Masukkan tujuan pembangunan"
            value={formData.tujuan_pembangunan || ''}
            onChange={(e) => handleInputChange('tujuan_pembangunan', e.target.value)}
            className={errors.tujuan_pembangunan ? 'border-red-500' : ''}
          />
          {errors.tujuan_pembangunan && (
            <p className="text-sm text-red-500">{errors.tujuan_pembangunan}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_lahan">Nama Lahan / Titik Lokasi</Label>
        <Input
          id="nama_lahan"
          placeholder="Masukkan nama lahan atau titik lokasi"
          value={formData.nama_lahan || ''}
          onChange={(e) => handleInputChange('nama_lahan', e.target.value)}
          className={errors.nama_lahan ? 'border-red-500' : ''}
        />
        {errors.nama_lahan && (
          <p className="text-sm text-red-500">{errors.nama_lahan}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rekomendasi_kades">Rekomendasi Kepala Desa</Label>
          <Select
            value={formData.rekomendasi_kades as string || ''}
            onValueChange={(value) => handleInputChange('rekomendasi_kades', value)}
          >
            <SelectTrigger className={errors.rekomendasi_kades ? 'border-red-500' : ''}>
              <SelectValue placeholder="Pilih rekomendasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ya">Ya</SelectItem>
              <SelectItem value="Tidak">Tidak</SelectItem>
            </SelectContent>
          </Select>
          {errors.rekomendasi_kades && (
            <p className="text-sm text-red-500">{errors.rekomendasi_kades}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status as string || ''}
            onValueChange={(value) => handleInputChange('status', value)}
          >
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

  const renderTidakSengketaForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pemilik_tanah">Nama Pemilik Tanah</Label>
          <Input
            id="nama_pemilik_tanah"
            placeholder="Masukkan nama pemilik tanah"
            value={formData.nama_pemilik_tanah || ''}
            onChange={(e) => handleInputChange('nama_pemilik_tanah', e.target.value)}
            className={errors.nama_pemilik_tanah ? 'border-red-500' : ''}
          />
          {errors.nama_pemilik_tanah && (
            <p className="text-sm text-red-500">{errors.nama_pemilik_tanah}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status_sengketa">Status Sengketa</Label>
          <Select
            value={formData.status_sengketa as string || ''}
            onValueChange={(value) => handleInputChange('status_sengketa', value)}
          >
            <SelectTrigger className={errors.status_sengketa ? 'border-red-500' : ''}>
              <SelectValue placeholder="Pilih status sengketa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tidak">Tidak</SelectItem>
              <SelectItem value="Ya">Ya</SelectItem>
            </SelectContent>
          </Select>
          {errors.status_sengketa && (
            <p className="text-sm text-red-500">{errors.status_sengketa}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_tanah">Lokasi Tanah</Label>
        <Input
          id="lokasi_tanah"
          placeholder="Masukkan lokasi tanah"
          value={formData.lokasi_tanah || ''}
          onChange={(e) => handleInputChange('lokasi_tanah', e.target.value)}
          className={errors.lokasi_tanah ? 'border-red-500' : ''}
        />
        {errors.lokasi_tanah && (
          <p className="text-sm text-red-500">{errors.lokasi_tanah}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tujuan_penggunaan">Tujuan Penggunaan</Label>
          <Input
            id="tujuan_penggunaan"
            placeholder="Masukkan tujuan penggunaan"
            value={formData.tujuan_penggunaan || ''}
            onChange={(e) => handleInputChange('tujuan_penggunaan', e.target.value)}
            className={errors.tujuan_penggunaan ? 'border-red-500' : ''}
          />
          {errors.tujuan_penggunaan && (
            <p className="text-sm text-red-500">{errors.tujuan_penggunaan}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status as string || ''}
            onValueChange={(value) => handleInputChange('status', value)}
          >
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

  const renderRenovasiForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pemilik">Nama Pemilik</Label>
          <Input
            id="nama_pemilik"
            placeholder="Masukkan nama pemilik"
            value={formData.nama_pemilik || ''}
            onChange={(e) => handleInputChange('nama_pemilik', e.target.value)}
            className={errors.nama_pemilik ? 'border-red-500' : ''}
          />
          {errors.nama_pemilik && (
            <p className="text-sm text-red-500">{errors.nama_pemilik}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jenis_renovasi">Jenis Renovasi</Label>
          <Input
            id="jenis_renovasi"
            placeholder="Masukkan jenis renovasi"
            value={formData.jenis_renovasi || ''}
            onChange={(e) => handleInputChange('jenis_renovasi', e.target.value)}
            className={errors.jenis_renovasi ? 'border-red-500' : ''}
          />
          {errors.jenis_renovasi && (
            <p className="text-sm text-red-500">{errors.jenis_renovasi}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_bangunan">Lokasi Bangunan</Label>
        <Input
          id="lokasi_bangunan"
          placeholder="Masukkan lokasi bangunan"
          value={formData.lokasi_bangunan || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lokasi_bangunan', e.target.value)}
          className={errors.lokasi_bangunan ? 'border-red-500' : ''}
        />
        {errors.lokasi_bangunan && (
          <p className="text-sm text-red-500">{errors.lokasi_bangunan}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status_tanah">Status Tanah</Label>
          <Select
            value={formData.status_tanah as string || ''}
            onValueChange={(value) => handleInputChange('status_tanah', value)}
          >
            <SelectTrigger className={errors.status_tanah ? 'border-red-500' : ''}>
              <SelectValue placeholder="Pilih status tanah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Milik sendiri">Milik sendiri</SelectItem>
              <SelectItem value="Sewa">Sewa</SelectItem>
            </SelectContent>
          </Select>
          {errors.status_tanah && (
            <p className="text-sm text-red-500">{errors.status_tanah}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status as string || ''}
            onValueChange={(value) => handleInputChange('status', value)}
          >
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
      case 'imb':
        return renderIMBForm();
      case 'lahan-desa':
        return renderLahanDesaForm();
      case 'tidak-sengketa':
        return renderTidakSengketaForm();
      case 'renovasi':
        return renderRenovasiForm();
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
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
