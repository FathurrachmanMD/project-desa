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
  nibData
} from '@/data/business-permits';

interface PermitTableProps {
  type: 'sku' | 'iumk' | 'situ' | 'nib';
  searchPlaceholder?: string;
}

export function PermitTable({ type, searchPlaceholder }: PermitTableProps) {
  switch (type) {
    case 'sku':
      return (
        <DataTable
          columns={skuColumns}
          data={skuData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'iumk':
      return (
        <DataTable
          columns={iumkColumns}
          data={iumkData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'situ':
      return (
        <DataTable
          columns={situColumns}
          data={situData}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'nib':
      return (
        <DataTable
          columns={nibColumns}
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
