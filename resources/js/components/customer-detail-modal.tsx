import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Customer, customerStatusConfig } from '@/data/customers';
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  IdCard,
  Briefcase,
  Calendar,
  UserCheck,
  Clock,
  FileText,
  Printer
} from 'lucide-react';

interface CustomerDetailModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDetailModal({ 
  customer, 
  open, 
  onOpenChange 
}: CustomerDetailModalProps) {
  if (!customer) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePrint = () => {
    console.log('Print customer detail', customer);
  };

  const statusConfig = customerStatusConfig[customer.status_akun];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detail Customer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informasi Pribadi */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Nama Lengkap
                </Label>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.nama}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  NIK
                </Label>
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-mono">{customer.nik}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  No. Telepon
                </Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.no_telepon}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Alamat
              </Label>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{customer.alamat}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Tanggal Lahir
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(customer.tanggal_lahir)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Jenis Kelamin
                </Label>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.jenis_kelamin}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Pekerjaan
              </Label>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.pekerjaan}</span>
              </div>
            </div>
          </div>

          {/* Informasi Akun */}
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Status Akun
                </Label>
                <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-medium w-fit ${statusConfig.className}`}>
                  {statusConfig.label}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Total Pengajuan
                </Label>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{customer.total_pengajuan} pengajuan</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Tanggal Daftar
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(customer.tanggal_daftar)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Terakhir Login
                </Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(customer.terakhir_login)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            ID Customer: {customer.id}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Cetak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
