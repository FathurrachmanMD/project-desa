import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2, AlertTriangle, X } from "lucide-react";
import { Customer, customersData, customerStatusConfig } from "@/data/customers";
import { CustomerDetailModal } from "@/components/customer-detail-modal";
import { CustomerEditModal } from "@/components/customer-edit-modal";
import { useToast } from "@/contexts/ToastContext";

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays > 0) {
    return `${diffInDays} hari lalu`;
  } else if (diffInHours > 0) {
    return `${diffInHours} jam lalu`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} menit lalu`;
  } else {
    return 'Baru saja';
  }
};

export function UsersTable() {
  const { showToast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(customersData);

  // Get the latest 5 customers sorted by registration date
  const latestCustomers = customers
    .sort((a, b) => new Date(b.tanggal_daftar).getTime() - new Date(a.tanggal_daftar).getTime())
    .slice(0, 5);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setDeletingCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCustomer) return;
    
    try {
      // Update the customers state
      setCustomers(prevCustomers => 
        prevCustomers.filter(c => c.id !== deletingCustomer.id)
      );
      
      showToast.success(
        'Customer Dihapus', 
        `${deletingCustomer.nama} berhasil dihapus dari sistem`
      );
      
      setIsDeleteModalOpen(false);
      setDeletingCustomer(null);
    } catch {
      showToast.error(
        'Gagal Menghapus', 
        'Terjadi kesalahan saat menghapus customer. Silakan coba lagi.'
      );
    }
  };

  const handleCustomerUpdated = (updatedCustomer: Customer) => {
    // Update the customers state
    setCustomers(prevCustomers => 
      prevCustomers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
    );
    
    showToast.success(
      'Data Diperbarui', 
      `Data ${updatedCustomer.nama} berhasil diperbarui`
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daftar Pengguna Terbaru</h3>
        <Button variant="outline" size="sm">
          Lihat Semua
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aktivitas Terakhir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestCustomers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{customer.nama}</p>
                    <p className="text-xs text-muted-foreground">
                      Bergabung: {new Date(customer.tanggal_daftar).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.no_telepon}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${customerStatusConfig[customer.status_akun].className}`}
                  >
                    {customerStatusConfig[customer.status_akun].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatTimeAgo(customer.terakhir_login)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewCustomer(customer)}
                      title={`Lihat detail ${customer.nama}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditCustomer(customer)}
                      title={`Edit ${customer.nama}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteClick(customer)}
                      title={`Hapus ${customer.nama}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Customer Edit Modal */}
      <CustomerEditModal
        customer={editingCustomer}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleCustomerUpdated}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Hapus data pengguna
            </DialogTitle>
            <DialogDescription className="text-left pt-2">
              Apakah Anda yakin ingin menghapus data pengguna untuk <strong>{deletingCustomer?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
