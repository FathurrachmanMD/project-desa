import React from 'react';
import { DataTable } from '@/components/data-table';
import { createHajatnColumns } from '@/components/columns/hajatan-columns';
import { createAcaraPublikColumns } from '@/components/columns/acara-publik-columns';
import { createSaranaUmumColumns } from '@/components/columns/sarana-umum-columns';
import { 
  SuratIzinHajatan,
  SuratIzinAcaraPublik,
  IzinPenggunaanSaranaUmum
} from '@/data/event-permits';

interface EventPermitTableProps {
  type: 'hajatan' | 'acara-publik' | 'sarana-umum';
  data?: SuratIzinHajatan[] | SuratIzinAcaraPublik[] | IzinPenggunaanSaranaUmum[];
  searchPlaceholder?: string;
  onView?: (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => void;
  onEdit?: (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => void;
  onDelete?: (data: SuratIzinHajatan | SuratIzinAcaraPublik | IzinPenggunaanSaranaUmum) => void;
}

export function EventPermitTable({ 
  type, 
  data = [],
  searchPlaceholder,
  onView,
  onEdit,
  onDelete 
}: EventPermitTableProps) {
  switch (type) {
    case 'hajatan':
      return (
        <DataTable
          columns={createHajatnColumns({ onView, onEdit, onDelete })}
          data={data as SuratIzinHajatan[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'acara-publik':
      return (
        <DataTable
          columns={createAcaraPublikColumns({ onView, onEdit, onDelete })}
          data={data as SuratIzinAcaraPublik[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_penyelenggara"
          enableStatusFilter={true}
        />
      );
    case 'sarana-umum':
      return (
        <DataTable
          columns={createSaranaUmumColumns({ onView, onEdit, onDelete })}
          data={data as IzinPenggunaanSaranaUmum[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
