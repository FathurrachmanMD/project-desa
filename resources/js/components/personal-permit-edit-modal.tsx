import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCrudToast } from '@/hooks/useToast';
import { 
  SuratPengantarSKCK,
  SuratKeteranganDomisili,
  SuratIzinTinggalPendatang,
  SuratIzinKeluarNegeri,
  SuratKeteranganTidakBekerja
} from '@/data/personal-permits';
import { Edit } from 'lucide-react';

interface PersonalPermitEditModalProps {
  data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja | null;
  type: 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => void;
}

export function PersonalPermitEditModal({ 
  data, 
  type, 
  open, 
  onOpenChange,
  onSave
}: PersonalPermitEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { updateSuccess, updateError } = useCrudToast();

  useEffect(() => {
    if (data) {
      setFormData({ ...data } as Record<string, string | number>);
    }
  }, [data]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'pengantar-skck') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.nik) newErrors.nik = 'NIK wajib diisi';
      if (!formData.tujuan_skck) newErrors.tujuan_skck = 'Tujuan SKCK wajib diisi';
      if (!formData.tempat_tujuan_skck) newErrors.tempat_tujuan_skck = 'Tempat tujuan SKCK wajib diisi';
    } else if (type === 'keterangan-domisili') {
      if (!formData.nama_warga) newErrors.nama_warga = 'Nama warga wajib diisi';
      if (!formData.alamat_domisili) newErrors.alamat_domisili = 'Alamat domisili wajib diisi';
      if (!formData.lama_tinggal) newErrors.lama_tinggal = 'Lama tinggal wajib diisi';
      if (!formData.rt_rw) newErrors.rt_rw = 'RT/RW wajib diisi';
    } else if (type === 'izin-tinggal-pendatang') {
      if (!formData.nama_pendatang) newErrors.nama_pendatang = 'Nama pendatang wajib diisi';
      if (!formData.alamat_asal) newErrors.alamat_asal = 'Alamat asal wajib diisi';
      if (!formData.tujuan_pindah) newErrors.tujuan_pindah = 'Tujuan pindah wajib diisi';
      if (!formData.rt_rw_tujuan) newErrors.rt_rw_tujuan = 'RT/RW tujuan wajib diisi';
    } else if (type === 'izin-keluar-negeri') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.tujuan_keberangkatan) newErrors.tujuan_keberangkatan = 'Tujuan keberangkatan wajib diisi';
      if (!formData.negara_tujuan) newErrors.negara_tujuan = 'Negara tujuan wajib diisi';
      if (!formData.periode) newErrors.periode = 'Periode wajib diisi';
    } else if (type === 'keterangan-tidak-bekerja') {
      if (!formData.nama_pemohon) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
      if (!formData.alasan_tidak_bekerja) newErrors.alasan_tidak_bekerja = 'Alasan tidak bekerja wajib diisi';
      if (!formData.tujuan_surat) newErrors.tujuan_surat = 'Tujuan surat wajib diisi';
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
      
      onSave(updatedData as unknown as SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja);
      onOpenChange(false);
      
      // Show success message
      updateSuccess('Data perizinan');
    } catch {
      updateError('Terjadi kesalahan saat memperbarui data perizinan');
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'pengantar-skck':
        return 'Edit Surat Pengantar SKCK';
      case 'keterangan-domisili':
        return 'Edit Surat Keterangan Domisili';
      case 'izin-tinggal-pendatang':
        return 'Edit Surat Izin Tinggal Pendatang';
      case 'izin-keluar-negeri':
        return 'Edit Surat Izin Keluar Negeri';
      case 'keterangan-tidak-bekerja':
        return 'Edit Surat Keterangan Tidak Bekerja';
      default:
        return 'Edit Perizinan Pribadi';
    }
  };

  const renderPengantarSKCKForm = () => (
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
          {errors.nama_pemohon && <p className="text-sm text-red-500">{errors.nama_pemohon}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nik">NIK</Label>
          <Input
            id="nik"
            placeholder="Masukkan NIK"
            value={formData.nik || ''}
            onChange={(e) => handleInputChange('nik', e.target.value)}
            className={errors.nik ? 'border-red-500' : ''}
          />
          {errors.nik && <p className="text-sm text-red-500">{errors.nik}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tujuan_skck">Tujuan SKCK</Label>
          <Input
            id="tujuan_skck"
            placeholder="Masukkan tujuan SKCK"
            value={formData.tujuan_skck || ''}
            onChange={(e) => handleInputChange('tujuan_skck', e.target.value)}
            className={errors.tujuan_skck ? 'border-red-500' : ''}
          />
          {errors.tujuan_skck && <p className="text-sm text-red-500">{errors.tujuan_skck}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tempat_tujuan_skck">Tempat Tujuan SKCK</Label>
          <Input
            id="tempat_tujuan_skck"
            placeholder="Masukkan tempat tujuan SKCK"
            value={formData.tempat_tujuan_skck || ''}
            onChange={(e) => handleInputChange('tempat_tujuan_skck', e.target.value)}
            className={errors.tempat_tujuan_skck ? 'border-red-500' : ''}
          />
          {errors.tempat_tujuan_skck && <p className="text-sm text-red-500">{errors.tempat_tujuan_skck}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan</Label>
        <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status as string || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Verifikasi">Verifikasi</SelectItem>
            <SelectItem value="Disetujui">Disetujui</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderKeteranganDomisiliForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_warga">Nama Warga</Label>
          <Input
            id="nama_warga"
            placeholder="Masukkan nama warga"
            value={formData.nama_warga || ''}
            onChange={(e) => handleInputChange('nama_warga', e.target.value)}
            className={errors.nama_warga ? 'border-red-500' : ''}
          />
          {errors.nama_warga && <p className="text-sm text-red-500">{errors.nama_warga}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rt_rw">RT/RW</Label>
          <Input
            id="rt_rw"
            placeholder="Masukkan RT/RW"
            value={formData.rt_rw || ''}
            onChange={(e) => handleInputChange('rt_rw', e.target.value)}
            className={errors.rt_rw ? 'border-red-500' : ''}
          />
          {errors.rt_rw && <p className="text-sm text-red-500">{errors.rt_rw}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alamat_domisili">Alamat Domisili</Label>
          <Input
            id="alamat_domisili"
            placeholder="Masukkan alamat domisili"
            value={formData.alamat_domisili || ''}
            onChange={(e) => handleInputChange('alamat_domisili', e.target.value)}
            className={errors.alamat_domisili ? 'border-red-500' : ''}
          />
          {errors.alamat_domisili && <p className="text-sm text-red-500">{errors.alamat_domisili}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lama_tinggal">Lama Tinggal</Label>
          <Input
            id="lama_tinggal"
            placeholder="Masukkan lama tinggal"
            value={formData.lama_tinggal || ''}
            onChange={(e) => handleInputChange('lama_tinggal', e.target.value)}
            className={errors.lama_tinggal ? 'border-red-500' : ''}
          />
          {errors.lama_tinggal && <p className="text-sm text-red-500">{errors.lama_tinggal}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan</Label>
        <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status as string || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Verifikasi">Verifikasi</SelectItem>
            <SelectItem value="Disetujui">Disetujui</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderIzinTinggalPendatangForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_pendatang">Nama Pendatang</Label>
          <Input
            id="nama_pendatang"
            placeholder="Masukkan nama pendatang"
            value={formData.nama_pendatang || ''}
            onChange={(e) => handleInputChange('nama_pendatang', e.target.value)}
            className={errors.nama_pendatang ? 'border-red-500' : ''}
          />
          {errors.nama_pendatang && <p className="text-sm text-red-500">{errors.nama_pendatang}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rt_rw_tujuan">RT/RW Tujuan</Label>
          <Input
            id="rt_rw_tujuan"
            placeholder="Masukkan RT/RW tujuan"
            value={formData.rt_rw_tujuan || ''}
            onChange={(e) => handleInputChange('rt_rw_tujuan', e.target.value)}
            className={errors.rt_rw_tujuan ? 'border-red-500' : ''}
          />
          {errors.rt_rw_tujuan && <p className="text-sm text-red-500">{errors.rt_rw_tujuan}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alamat_asal">Alamat Asal</Label>
          <Input
            id="alamat_asal"
            placeholder="Masukkan alamat asal"
            value={formData.alamat_asal || ''}
            onChange={(e) => handleInputChange('alamat_asal', e.target.value)}
            className={errors.alamat_asal ? 'border-red-500' : ''}
          />
          {errors.alamat_asal && <p className="text-sm text-red-500">{errors.alamat_asal}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tujuan_pindah">Tujuan Pindah</Label>
          <Input
            id="tujuan_pindah"
            placeholder="Masukkan tujuan pindah"
            value={formData.tujuan_pindah || ''}
            onChange={(e) => handleInputChange('tujuan_pindah', e.target.value)}
            className={errors.tujuan_pindah ? 'border-red-500' : ''}
          />
          {errors.tujuan_pindah && <p className="text-sm text-red-500">{errors.tujuan_pindah}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan</Label>
        <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status as string || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Verifikasi">Verifikasi</SelectItem>
            <SelectItem value="Disetujui">Disetujui</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderIzinKeluarNegeriForm = () => (
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
          {errors.nama_pemohon && <p className="text-sm text-red-500">{errors.nama_pemohon}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="negara_tujuan">Negara Tujuan</Label>
          <Input
            id="negara_tujuan"
            placeholder="Masukkan negara tujuan"
            value={formData.negara_tujuan || ''}
            onChange={(e) => handleInputChange('negara_tujuan', e.target.value)}
            className={errors.negara_tujuan ? 'border-red-500' : ''}
          />
          {errors.negara_tujuan && <p className="text-sm text-red-500">{errors.negara_tujuan}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tujuan_keberangkatan">Tujuan Keberangkatan</Label>
          <Input
            id="tujuan_keberangkatan"
            placeholder="Masukkan tujuan keberangkatan"
            value={formData.tujuan_keberangkatan || ''}
            onChange={(e) => handleInputChange('tujuan_keberangkatan', e.target.value)}
            className={errors.tujuan_keberangkatan ? 'border-red-500' : ''}
          />
          {errors.tujuan_keberangkatan && <p className="text-sm text-red-500">{errors.tujuan_keberangkatan}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="periode">Periode / Waktu</Label>
          <Input
            id="periode"
            placeholder="Masukkan periode"
            value={formData.periode || ''}
            onChange={(e) => handleInputChange('periode', e.target.value)}
            className={errors.periode ? 'border-red-500' : ''}
          />
          {errors.periode && <p className="text-sm text-red-500">{errors.periode}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan</Label>
        <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status as string || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Verifikasi">Verifikasi</SelectItem>
            <SelectItem value="Disetujui">Disetujui</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderKeteranganTidakBekerjaForm = () => (
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
          {errors.nama_pemohon && <p className="text-sm text-red-500">{errors.nama_pemohon}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="alasan_tidak_bekerja">Alasan Tidak Bekerja</Label>
          <Input
            id="alasan_tidak_bekerja"
            placeholder="Masukkan alasan tidak bekerja"
            value={formData.alasan_tidak_bekerja || ''}
            onChange={(e) => handleInputChange('alasan_tidak_bekerja', e.target.value)}
            className={errors.alasan_tidak_bekerja ? 'border-red-500' : ''}
          />
          {errors.alasan_tidak_bekerja && <p className="text-sm text-red-500">{errors.alasan_tidak_bekerja}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tujuan_surat">Tujuan Surat</Label>
        <textarea
          id="tujuan_surat"
          placeholder="Masukkan tujuan surat"
          className={`w-full px-3 py-2 border rounded-md min-h-[100px] ${
            errors.tujuan_surat ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.tujuan_surat || ''}
          onChange={(e) => handleInputChange('tujuan_surat', e.target.value)}
        />
        {errors.tujuan_surat && <p className="text-sm text-red-500">{errors.tujuan_surat}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status Pengajuan</Label>
        <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status as string || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Verifikasi">Verifikasi</SelectItem>
            <SelectItem value="Disetujui">Disetujui</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'pengantar-skck':
        return renderPengantarSKCKForm();
      case 'keterangan-domisili':
        return renderKeteranganDomisiliForm();
      case 'izin-tinggal-pendatang':
        return renderIzinTinggalPendatangForm();
      case 'izin-keluar-negeri':
        return renderIzinKeluarNegeriForm();
      case 'keterangan-tidak-bekerja':
        return renderKeteranganTidakBekerjaForm();
      default:
        return renderPengantarSKCKForm();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
