import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratKeteranganDomisili } from '@/data/personal-permits';

interface SuratKeteranganDomisiliColumnsProps {
  onView: (data: SuratKeteranganDomisili) => void;
  onEdit: (data: SuratKeteranganDomisili) => void;
  onDelete: (data: SuratKeteranganDomisili) => void;
}

export const createSuratKeteranganDomisiliColumns = ({ onView, onEdit, onDelete }: SuratKeteranganDomisiliColumnsProps): ColumnDef<SuratKeteranganDomisili>[] => [
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
    accessorKey: 'nama_warga',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Warga" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_warga')}</div>
    ),
  },
  {
    accessorKey: 'alamat_domisili',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat Domisili" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('alamat_domisili')}</div>
    ),
  },
  {
    accessorKey: 'lama_tinggal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lama Tinggal" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate">{row.getValue('lama_tinggal')}</div>
    ),
  },
  {
    accessorKey: 'rt_rw',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RT/RW" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('rt_rw')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pengajuan" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} type="personal" />
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
