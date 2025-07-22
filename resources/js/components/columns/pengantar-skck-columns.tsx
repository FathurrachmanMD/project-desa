import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratPengantarSKCK } from '@/data/personal-permits';

interface SuratPengantarSKCKColumnsProps {
  onView: (data: SuratPengantarSKCK) => void;
  onEdit: (data: SuratPengantarSKCK) => void;
  onDelete: (data: SuratPengantarSKCK) => void;
}

export const createSuratPengantarSKCKColumns = ({ onView, onEdit, onDelete }: SuratPengantarSKCKColumnsProps): ColumnDef<SuratPengantarSKCK>[] => [
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
    accessorKey: 'nik',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIK" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('nik')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_skck',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan SKCK" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('tujuan_skck')}</div>
    ),
  },
  {
    accessorKey: 'tempat_tujuan_skck',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tempat Tujuan SKCK" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('tempat_tujuan_skck')}</div>
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
