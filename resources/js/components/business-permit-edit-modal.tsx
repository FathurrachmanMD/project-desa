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
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';
import { 
  FileText, 
  Building, 
  MapPin, 
  Globe
} from 'lucide-react';

interface BusinessPermitEditModalProps {
  data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB | null;
  type: 'sku' | 'iumk' | 'situ' | 'nib';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
}

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  id?: string;
  nama_pemohon?: string;
  nik?: string;
  nama_usaha?: string;
  alamat_usaha?: string;
  lama_usaha?: string;
  jenis_usaha?: string;
  modal_usaha?: string;
  status_tempat_usaha?: string;
  status_lahan?: string;
  rekomendasi_rtrw?: string;
  tujuan?: string;
  status?: string;
  tanggal_pengajuan?: string;
}

export function BusinessPermitEditModal({
  data,
  type,
  open,
  onOpenChange,
  onSave,
}: BusinessPermitEditModalProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setErrors({});
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    switch (type) {
      case 'sku':
        if (!formData.nama_pemohon?.trim()) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
        if (!formData.nik?.trim()) newErrors.nik = 'NIK wajib diisi';
        if (!formData.nama_usaha?.trim()) newErrors.nama_usaha = 'Nama usaha wajib diisi';
        if (!formData.alamat_usaha?.trim()) newErrors.alamat_usaha = 'Alamat usaha wajib diisi';
        if (!formData.lama_usaha?.trim()) newErrors.lama_usaha = 'Lama usaha wajib diisi';
        break;
      case 'iumk':
        if (!formData.nama_pemohon?.trim()) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
        if (!formData.nik?.trim()) newErrors.nik = 'NIK wajib diisi';
        if (!formData.nama_usaha?.trim()) newErrors.nama_usaha = 'Nama usaha wajib diisi';
        if (!formData.jenis_usaha?.trim()) newErrors.jenis_usaha = 'Jenis usaha wajib diisi';
        if (!formData.modal_usaha?.trim()) newErrors.modal_usaha = 'Modal usaha wajib diisi';
        if (!formData.status_tempat_usaha?.trim()) newErrors.status_tempat_usaha = 'Status tempat usaha wajib diisi';
        break;
      case 'situ':
        if (!formData.nama_pemohon?.trim()) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
        if (!formData.alamat_usaha?.trim()) newErrors.alamat_usaha = 'Alamat usaha wajib diisi';
        if (!formData.jenis_usaha?.trim()) newErrors.jenis_usaha = 'Jenis usaha wajib diisi';
        if (!formData.status_lahan?.trim()) newErrors.status_lahan = 'Status lahan wajib diisi';
        if (!formData.rekomendasi_rtrw?.trim()) newErrors.rekomendasi_rtrw = 'Rekomendasi RT/RW wajib diisi';
        break;
      case 'nib':
        if (!formData.nama_pemohon?.trim()) newErrors.nama_pemohon = 'Nama pemohon wajib diisi';
        if (!formData.nik?.trim()) newErrors.nik = 'NIK wajib diisi';
        if (!formData.nama_usaha?.trim()) newErrors.nama_usaha = 'Nama usaha wajib diisi';
        if (!formData.tujuan?.trim()) newErrors.tujuan = 'Tujuan wajib diisi';
        break;
    }

    if (!formData.status?.trim()) newErrors.status = 'Status wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData as SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'sku':
        return 'Edit Surat Keterangan Usaha';
      case 'iumk':
        return 'Edit Izin Usaha Mikro Kecil';
      case 'situ':
        return 'Edit Surat Izin Tempat Usaha';
      case 'nib':
        return 'Edit Rekomendasi NIB/OSS';
      default:
        return 'Edit Perizinan Usaha';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sku':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'iumk':
        return <Building className="h-5 w-5 text-green-600" />;
      case 'situ':
        return <MapPin className="h-5 w-5 text-purple-600" />;
      case 'nib':
        return <Globe className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  const renderSKUForm = () => (
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
          <Label htmlFor="nik">NIK</Label>
          <Input
            id="nik"
            placeholder="Masukkan NIK"
            value={formData.nik || ''}
            onChange={(e) => handleInputChange('nik', e.target.value)}
            className={errors.nik ? 'border-red-500' : ''}
          />
          {errors.nik && (
            <p className="text-sm text-red-500">{errors.nik}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_usaha">Nama Usaha</Label>
          <Input
            id="nama_usaha"
            placeholder="Masukkan nama usaha"
            value={formData.nama_usaha || ''}
            onChange={(e) => handleInputChange('nama_usaha', e.target.value)}
            className={errors.nama_usaha ? 'border-red-500' : ''}
          />
          {errors.nama_usaha && (
            <p className="text-sm text-red-500">{errors.nama_usaha}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lama_usaha">Lama Usaha</Label>
          <Input
            id="lama_usaha"
            placeholder="Masukkan lama usaha"
            value={formData.lama_usaha || ''}
            onChange={(e) => handleInputChange('lama_usaha', e.target.value)}
            className={errors.lama_usaha ? 'border-red-500' : ''}
          />
          {errors.lama_usaha && (
            <p className="text-sm text-red-500">{errors.lama_usaha}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_usaha">Alamat Usaha</Label>
        <Input
          id="alamat_usaha"
          placeholder="Masukkan alamat usaha"
          value={formData.alamat_usaha || ''}
          onChange={(e) => handleInputChange('alamat_usaha', e.target.value)}
          className={errors.alamat_usaha ? 'border-red-500' : ''}
        />
        {errors.alamat_usaha && (
          <p className="text-sm text-red-500">{errors.alamat_usaha}</p>
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
  );

  const renderIUMKForm = () => (
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
          <Label htmlFor="nik">NIK</Label>
          <Input
            id="nik"
            placeholder="Masukkan NIK"
            value={formData.nik || ''}
            onChange={(e) => handleInputChange('nik', e.target.value)}
            className={errors.nik ? 'border-red-500' : ''}
          />
          {errors.nik && (
            <p className="text-sm text-red-500">{errors.nik}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_usaha">Nama Usaha</Label>
          <Input
            id="nama_usaha"
            placeholder="Masukkan nama usaha"
            value={formData.nama_usaha || ''}
            onChange={(e) => handleInputChange('nama_usaha', e.target.value)}
            className={errors.nama_usaha ? 'border-red-500' : ''}
          />
          {errors.nama_usaha && (
            <p className="text-sm text-red-500">{errors.nama_usaha}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jenis_usaha">Jenis Usaha</Label>
          <Input
            id="jenis_usaha"
            placeholder="Masukkan jenis usaha"
            value={formData.jenis_usaha || ''}
            onChange={(e) => handleInputChange('jenis_usaha', e.target.value)}
            className={errors.jenis_usaha ? 'border-red-500' : ''}
          />
          {errors.jenis_usaha && (
            <p className="text-sm text-red-500">{errors.jenis_usaha}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modal_usaha">Modal Usaha</Label>
          <Input
            id="modal_usaha"
            placeholder="Masukkan modal usaha"
            value={formData.modal_usaha || ''}
            onChange={(e) => handleInputChange('modal_usaha', e.target.value)}
            className={errors.modal_usaha ? 'border-red-500' : ''}
          />
          {errors.modal_usaha && (
            <p className="text-sm text-red-500">{errors.modal_usaha}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status_tempat_usaha">Status Tempat Usaha</Label>
          <Select value={formData.status_tempat_usaha as string} onValueChange={(value) => handleInputChange('status_tempat_usaha', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status tempat usaha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Milik Sendiri">Milik Sendiri</SelectItem>
              <SelectItem value="Sewa">Sewa</SelectItem>
              <SelectItem value="Kontrak">Kontrak</SelectItem>
            </SelectContent>
          </Select>
          {errors.status_tempat_usaha && (
            <p className="text-sm text-red-500">{errors.status_tempat_usaha}</p>
          )}
        </div>
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
  );

  const renderSITUForm = () => (
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
          <Label htmlFor="jenis_usaha">Jenis Usaha</Label>
          <Input
            id="jenis_usaha"
            placeholder="Masukkan jenis usaha"
            value={formData.jenis_usaha || ''}
            onChange={(e) => handleInputChange('jenis_usaha', e.target.value)}
            className={errors.jenis_usaha ? 'border-red-500' : ''}
          />
          {errors.jenis_usaha && (
            <p className="text-sm text-red-500">{errors.jenis_usaha}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status_lahan">Status Lahan</Label>
          <Select value={formData.status_lahan as string} onValueChange={(value) => handleInputChange('status_lahan', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status lahan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Milik Sendiri">Milik Sendiri</SelectItem>
              <SelectItem value="Sewa">Sewa</SelectItem>
              <SelectItem value="Kontrak">Kontrak</SelectItem>
            </SelectContent>
          </Select>
          {errors.status_lahan && (
            <p className="text-sm text-red-500">{errors.status_lahan}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rekomendasi_rtrw">Rekomendasi RT/RW</Label>
          <Select value={formData.rekomendasi_rtrw as string} onValueChange={(value) => handleInputChange('rekomendasi_rtrw', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih rekomendasi RT/RW" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sudah">Sudah</SelectItem>
              <SelectItem value="Belum">Belum</SelectItem>
            </SelectContent>
          </Select>
          {errors.rekomendasi_rtrw && (
            <p className="text-sm text-red-500">{errors.rekomendasi_rtrw}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_usaha">Alamat Usaha</Label>
        <Input
          id="alamat_usaha"
          placeholder="Masukkan alamat usaha"
          value={formData.alamat_usaha || ''}
          onChange={(e) => handleInputChange('alamat_usaha', e.target.value)}
          className={errors.alamat_usaha ? 'border-red-500' : ''}
        />
        {errors.alamat_usaha && (
          <p className="text-sm text-red-500">{errors.alamat_usaha}</p>
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
  );

  const renderNIBForm = () => (
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
          <Label htmlFor="nik">NIK</Label>
          <Input
            id="nik"
            placeholder="Masukkan NIK"
            value={formData.nik || ''}
            onChange={(e) => handleInputChange('nik', e.target.value)}
            className={errors.nik ? 'border-red-500' : ''}
          />
          {errors.nik && (
            <p className="text-sm text-red-500">{errors.nik}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nama_usaha">Nama Usaha</Label>
          <Input
            id="nama_usaha"
            placeholder="Masukkan nama usaha"
            value={formData.nama_usaha || ''}
            onChange={(e) => handleInputChange('nama_usaha', e.target.value)}
            className={errors.nama_usaha ? 'border-red-500' : ''}
          />
          {errors.nama_usaha && (
            <p className="text-sm text-red-500">{errors.nama_usaha}</p>
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
        <Label htmlFor="tujuan">Tujuan</Label>
        <Input
          id="tujuan"
          placeholder="Masukkan tujuan"
          value={formData.tujuan || ''}
          onChange={(e) => handleInputChange('tujuan', e.target.value)}
          className={errors.tujuan ? 'border-red-500' : ''}
        />
        {errors.tujuan && (
          <p className="text-sm text-red-500">{errors.tujuan}</p>
        )}
      </div>
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'sku':
        return renderSKUForm();
      case 'iumk':
        return renderIUMKForm();
      case 'situ':
        return renderSITUForm();
      case 'nib':
        return renderNIBForm();
      default:
        return null;
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
