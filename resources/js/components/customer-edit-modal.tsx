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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Customer } from '@/data/customers';

interface CustomerEditModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Customer) => void;
}

export function CustomerEditModal({ 
  customer, 
  open, 
  onOpenChange,
  onSave 
}: CustomerEditModalProps) {
  const [formData, setFormData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customer && open) {
      setFormData({ ...customer });
    }
  }, [customer, open]);

  const handleSave = async () => {
    if (!formData) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Customer, value: string) => {
    if (!formData) return;
    
    setFormData({
      ...formData,
      [field]: value
    });
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Customer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informasi Pribadi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap *</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nik">NIK *</Label>
              <Input
                id="nik"
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                placeholder="Masukkan NIK"
                maxLength={16}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Masukkan email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="no_telepon">No. Telepon *</Label>
              <Input
                id="no_telepon"
                value={formData.no_telepon}
                onChange={(e) => handleInputChange('no_telepon', e.target.value)}
                placeholder="Masukkan nomor telepon"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat *</Label>
            <Textarea
              id="alamat"
              value={formData.alamat}
              onChange={(e) => handleInputChange('alamat', e.target.value)}
              placeholder="Masukkan alamat lengkap"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
              <Input
                id="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={(e) => handleInputChange('tanggal_lahir', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
              <Select
                value={formData.jenis_kelamin}
                onValueChange={(value) => handleInputChange('jenis_kelamin', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pekerjaan">Pekerjaan *</Label>
              <Input
                id="pekerjaan"
                value={formData.pekerjaan}
                onChange={(e) => handleInputChange('pekerjaan', e.target.value)}
                placeholder="Masukkan pekerjaan"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status_akun">Status Akun *</Label>
              <Select
                value={formData.status_akun}
                onValueChange={(value) => handleInputChange('status_akun', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status akun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            * Field wajib diisi
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
