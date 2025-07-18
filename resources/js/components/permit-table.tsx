import React from 'react';
import { DataTable } from '@/components/data-table';
import { skuColumns } from '@/components/columns/sku-columns';
import { iumkColumns } from '@/components/columns/iumk-columns';
import { situColumns } from '@/components/columns/situ-columns';
import { nibColumns } from '@/components/columns/nib-columns';
import { 
  SuratKeteranganUsaha,
  IzinUsahaMikroKecil,
  SuratIzinTempatUsaha,
  RekomendasiNIB
} from '@/data/business-permits';

interface PermitTableProps {
  type: 'sku' | 'iumk' | 'situ' | 'nib';
  data?: SuratKeteranganUsaha[] | IzinUsahaMikroKecil[] | SuratIzinTempatUsaha[] | RekomendasiNIB[];
  searchPlaceholder?: string;
  onView?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
  onEdit?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
  onDelete?: (data: SuratKeteranganUsaha | IzinUsahaMikroKecil | SuratIzinTempatUsaha | RekomendasiNIB) => void;
}

export function PermitTable({ type, data = [], searchPlaceholder, onView, onEdit, onDelete }: PermitTableProps) {
  switch (type) {
    case 'sku':
      return (
        <DataTable
          columns={skuColumns(onView, onEdit, onDelete)}
          data={data as SuratKeteranganUsaha[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'iumk':
      return (
        <DataTable
          columns={iumkColumns(onView, onEdit, onDelete)}
          data={data as IzinUsahaMikroKecil[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'situ':
      return (
        <DataTable
          columns={situColumns(onView, onEdit, onDelete)}
          data={data as SuratIzinTempatUsaha[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'nib':
      return (
        <DataTable
          columns={nibColumns(onView, onEdit, onDelete)}
          data={data as RekomendasiNIB[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
