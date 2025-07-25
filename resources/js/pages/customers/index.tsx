import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomerTable } from '@/components/customer-table';
import { CustomerDetailModal } from '@/components/customer-detail-modal';
import { CustomerEditModal } from '@/components/customer-edit-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { createCustomerColumns } from '@/components/columns/customer-columns';
import { customersData as originalCustomersData, Customer } from '@/data/customers';
import { useCrudToast } from '@/hooks/useToast';
import { type BreadcrumbItem } from '@/types';
import { 
  Users, 
  UserPlus,
  UserCheck,
  UserX,
  Shield
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Manajemen Customer',
    href: '/customers',
  },
];

export default function Customers() {
  const [customersData, setCustomersData] = useState<Customer[]>(originalCustomersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Toast hooks
  const { updateSuccess, deleteSuccess, deleteError } = useCrudToast();

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedCustomer: Customer) => {
    const newData = customersData.map(item => 
      item.id === updatedCustomer.id ? updatedCustomer : item
    );
    setCustomersData(newData);
    setIsEditModalOpen(false);
    updateSuccess('Data customer');
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newData = customersData.filter(item => item.id !== customerToDelete.id);
      setCustomersData(newData);
      
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
      deleteSuccess('Data customer');
    } catch {
      deleteError('Data customer');
    } finally {
      setIsDeleting(false);
    }
  };

  // Statistics
  const totalCustomers = customersData.length;
  const activeCustomers = customersData.filter(c => c.status_akun === 'Aktif').length;
  const inactiveCustomers = customersData.filter(c => c.status_akun === 'Nonaktif').length;
  const suspendedCustomers = customersData.filter(c => c.status_akun === 'Suspended').length;

  const columns = createCustomerColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Customer" />
      
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Customer
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola data customer yang telah terdaftar dalam sistem
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Tambah Customer
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Customer</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                Customer terdaftar
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Customer Aktif</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
              <p className="text-xs text-muted-foreground">
                {((activeCustomers / totalCustomers) * 100).toFixed(1)}% dari total
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Customer Nonaktif</CardTitle>
              <UserX className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{inactiveCustomers}</div>
              <p className="text-xs text-muted-foreground">
                {((inactiveCustomers / totalCustomers) * 100).toFixed(1)}% dari total
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Customer Suspended</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{suspendedCustomers}</div>
              <p className="text-xs text-muted-foreground">
                {((suspendedCustomers / totalCustomers) * 100).toFixed(1)}% dari total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Daftar Customer</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Total {totalCustomers} customer terdaftar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CustomerTable data={customersData} columns={columns} />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CustomerDetailModal
        customer={selectedCustomer}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      <CustomerEditModal
        customer={selectedCustomer}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Customer"
        description={
          customerToDelete
            ? `Apakah Anda yakin ingin menghapus customer "${customerToDelete.nama}"? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait customer.`
            : ''
        }
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}
