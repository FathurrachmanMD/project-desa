import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { IzinPengelolaanLahan } from '@/data/agricultural-permits';

interface PengelolaanLahanColumnsProps {
  onView: (data: IzinPengelolaanLahan) => void;
  onEdit: (data: IzinPengelolaanLahan) => void;
  onDelete: (data: IzinPengelolaanLahan) => void;
}

export const createPengelolaanLahanColumns = ({ onView, onEdit, onDelete }: PengelolaanLahanColumnsProps): ColumnDef<IzinPengelolaanLahan>[] => [
  {
    id: 'nomor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return (
        <div className="font-medium text-center">
          {pageIndex * pageSize + row.index + 1}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'nama_pemohon',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pemohon" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemohon')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_lahan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Lahan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_lahan')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_pengelolaan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Pengelolaan" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('tujuan_pengelolaan')}</div>
    ),
  },
  {
    accessorKey: 'luas_lahan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Luas Lahan" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('luas_lahan')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pengajuan" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} type="agricultural" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'tanggal_pengajuan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pengajuan" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('tanggal_pengajuan'));
      return (
        <div className="text-sm">
          {date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aksi" />
    ),
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
