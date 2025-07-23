import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  SuratIzinHajatan, 
  SuratIzinAcaraPublik, 
  IzinPenggunaanSaranaUmum 
} from '@/data/event-permits';
import { Save, X } from 'lucide-react';

interface EventPermitEditModalProps {
  data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum | null;
  type: 'hajatan' | 'acara-publik' | 'sarana-umum';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => void;
}

export function EventPermitEditModal({ 
  data, 
  type, 
  open, 
  onOpenChange,
  onSave
}: EventPermitEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) {
      setFormData({ ...data } as Record<string, string | number>);
    }
  }, [data]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'hajatan') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.jenis_acara) newErrors.jenis_acara = 'Jenis acara wajib diisi';
      if (!formData.tanggal_acara) newErrors.tanggal_acara = 'Tanggal acara wajib diisi';
      if (!formData.lokasi_acara) newErrors.lokasi_acara = 'Lokasi acara wajib diisi';
      if (!formData.dampak_keramaian) newErrors.dampak_keramaian = 'Dampak keramaian wajib diisi';
    } else if (type === 'acara-publik') {
      if (!formData.nama_penyelenggara) newErrors.nama_penyelenggara = 'Nama penyelenggara wajib diisi';
      if (!formData.nama_acara) newErrors.nama_acara = 'Nama acara wajib diisi';
      if (!formData.tanggal_waktu_acara) newErrors.tanggal_waktu_acara = 'Tanggal & waktu acara wajib diisi';
      if (!formData.lokasi_acara) newErrors.lokasi_acara = 'Lokasi acara wajib diisi';
      if (!formData.rekomendasi_keamanan) newErrors.rekomendasi_keamanan = 'Rekomendasi keamanan wajib diisi';
    } else if (type === 'sarana-umum') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.jenis_fasilitas) newErrors.jenis_fasilitas = 'Jenis fasilitas wajib diisi';
      if (!formData.tanggal_penggunaan) newErrors.tanggal_penggunaan = 'Tanggal penggunaan wajib diisi';
      if (!formData.keperluan) newErrors.keperluan = 'Keperluan wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev: Record<string, string | number>) => ({
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
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedData = {
        ...formData,
        tanggal_diubah: new Date().toISOString(),
      };
      
      onSave(updatedData as unknown as SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum);
      onOpenChange(false);
      
      // Show success message (you can implement toast here)
      alert('Data perizinan berhasil diperbarui');
    } catch {
      alert('Terjadi kesalahan saat memperbarui data');
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'hajatan':
        return 'Edit Surat Izin Hajatan';
      case 'acara-publik':
        return 'Edit Surat Izin Acara Publik';
      case 'sarana-umum':
        return 'Edit Izin Penggunaan Sarana Umum';
      default:
        return 'Edit Perizinan';
    }
  };

  const renderHajatnForm = () => (
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
          <Label htmlFor="jenis_acara">Jenis Acara</Label>
          <Input
            id="jenis_acara"
            placeholder="Masukkan jenis acara"
            value={formData.jenis_acara || ''}
            onChange={(e) => handleInputChange('jenis_acara', e.target.value)}
            className={errors.jenis_acara ? 'border-red-500' : ''}
          />
          {errors.jenis_acara && (
            <p className="text-sm text-red-500">{errors.jenis_acara}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tanggal_acara">Tanggal Acara</Label>
          <Input
            id="tanggal_acara"
            type="date"
            value={formData.tanggal_acara || ''}
            onChange={(e) => handleInputChange('tanggal_acara', e.target.value)}
            className={errors.tanggal_acara ? 'border-red-500' : ''}
          />
          {errors.tanggal_acara && (
            <p className="text-sm text-red-500">{errors.tanggal_acara}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lokasi_acara">Lokasi Acara</Label>
          <Input
            id="lokasi_acara"
            placeholder="Masukkan lokasi acara"
            value={formData.lokasi_acara || ''}
            onChange={(e) => handleInputChange('lokasi_acara', e.target.value)}
            className={errors.lokasi_acara ? 'border-red-500' : ''}
          />
          {errors.lokasi_acara && (
            <p className="text-sm text-red-500">{errors.lokasi_acara}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dampak_keramaian">Dampak Keramaian</Label>
          <Select value={formData.dampak_keramaian as string} onValueChange={(value) => handleInputChange('dampak_keramaian', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih dampak keramaian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ya">Ya</SelectItem>
              <SelectItem value="Tidak">Tidak</SelectItem>
            </SelectContent>
          </Select>
          {errors.dampak_keramaian && (
            <p className="text-sm text-red-500">{errors.dampak_keramaian}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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

  const renderAcaraPublikForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_penyelenggara">Nama Penyelenggara</Label>
          <Input
            id="nama_penyelenggara"
            placeholder="Masukkan nama penyelenggara"
            value={formData.nama_penyelenggara || ''}
            onChange={(e) => handleInputChange('nama_penyelenggara', e.target.value)}
            className={errors.nama_penyelenggara ? 'border-red-500' : ''}
          />
          {errors.nama_penyelenggara && (
            <p className="text-sm text-red-500">{errors.nama_penyelenggara}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nama_acara">Nama Acara</Label>
          <Input
            id="nama_acara"
            placeholder="Masukkan nama acara"
            value={formData.nama_acara || ''}
            onChange={(e) => handleInputChange('nama_acara', e.target.value)}
            className={errors.nama_acara ? 'border-red-500' : ''}
          />
          {errors.nama_acara && (
            <p className="text-sm text-red-500">{errors.nama_acara}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tanggal_waktu_acara">Tanggal & Waktu Acara</Label>
          <Input
            id="tanggal_waktu_acara"
            placeholder="Masukkan tanggal dan waktu acara"
            value={formData.tanggal_waktu_acara || ''}
            onChange={(e) => handleInputChange('tanggal_waktu_acara', e.target.value)}
            className={errors.tanggal_waktu_acara ? 'border-red-500' : ''}
          />
          {errors.tanggal_waktu_acara && (
            <p className="text-sm text-red-500">{errors.tanggal_waktu_acara}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lokasi_acara">Lokasi Acara</Label>
          <Input
            id="lokasi_acara"
            placeholder="Masukkan lokasi acara"
            value={formData.lokasi_acara || ''}
            onChange={(e) => handleInputChange('lokasi_acara', e.target.value)}
            className={errors.lokasi_acara ? 'border-red-500' : ''}
          />
          {errors.lokasi_acara && (
            <p className="text-sm text-red-500">{errors.lokasi_acara}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rekomendasi_keamanan">Rekomendasi Keamanan</Label>
          <Select value={formData.rekomendasi_keamanan as string} onValueChange={(value) => handleInputChange('rekomendasi_keamanan', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih rekomendasi keamanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sudah">Sudah</SelectItem>
              <SelectItem value="Belum">Belum</SelectItem>
            </SelectContent>
          </Select>
          {errors.rekomendasi_keamanan && (
            <p className="text-sm text-red-500">{errors.rekomendasi_keamanan}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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

  const renderSaranaUmumForm = () => (
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
          <Label htmlFor="jenis_fasilitas">Jenis Fasilitas</Label>
          <Input
            id="jenis_fasilitas"
            placeholder="Masukkan jenis fasilitas"
            value={formData.jenis_fasilitas || ''}
            onChange={(e) => handleInputChange('jenis_fasilitas', e.target.value)}
            className={errors.jenis_fasilitas ? 'border-red-500' : ''}
          />
          {errors.jenis_fasilitas && (
            <p className="text-sm text-red-500">{errors.jenis_fasilitas}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tanggal_penggunaan">Tanggal Penggunaan</Label>
          <Input
            id="tanggal_penggunaan"
            type="date"
            value={formData.tanggal_penggunaan || ''}
            onChange={(e) => handleInputChange('tanggal_penggunaan', e.target.value)}
            className={errors.tanggal_penggunaan ? 'border-red-500' : ''}
          />
          {errors.tanggal_penggunaan && (
            <p className="text-sm text-red-500">{errors.tanggal_penggunaan}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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
        <Label htmlFor="keperluan">Keperluan</Label>
        <textarea
          id="keperluan"
          placeholder="Masukkan keperluan"
          className={`w-full px-3 py-2 border rounded-md min-h-[100px] ${
            errors.keperluan ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.keperluan || ''}
          onChange={(e) => handleInputChange('keperluan', e.target.value)}
        />
        {errors.keperluan && (
          <p className="text-sm text-red-500">{errors.keperluan}</p>
        )}
      </div>
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'hajatan':
        return renderHajatnForm();
      case 'acara-publik':
        return renderAcaraPublikForm();
      case 'sarana-umum':
        return renderSaranaUmumForm();
      default:
        return renderHajatnForm();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
