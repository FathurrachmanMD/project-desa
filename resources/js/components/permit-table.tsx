import React from 'react';
import { DataTable } from '@/components/data-table';
import { skuColumns } from '@/components/columns/sku-columns';
import { iumkColumns } from '@/components/columns/iumk-columns';
import { situColumns } from '@/components/columns/situ-columns';
import { nibColumns } from '@/components/columns/nib-columns';
import { 
  skuData, 
  iumkData, 
  situData, 
  nibData,
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';

interface PermitTableProps {
  type: 'sku' | 'iumk' | 'situ' | 'nib';
  searchPlaceholder?: string;
  onView?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
  onEdit?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
  onDelete?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
}

export function PermitTable({ type, searchPlaceholder, onView, onEdit, onDelete }: PermitTableProps) {
  switch (type) {
    case 'sku':
      return (
        <DataTable
          columns={skuColumns(onView, onEdit, onDelete)}
          data={skuData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'iumk':
      return (
        <DataTable
          columns={iumkColumns(onView, onEdit, onDelete)}
          data={iumkData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'situ':
      return (
        <DataTable
          columns={situColumns(onView, onEdit, onDelete)}
          data={situData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'nib':
      return (
        <DataTable
          columns={nibColumns(onView, onEdit, onDelete)}
          data={nibData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
