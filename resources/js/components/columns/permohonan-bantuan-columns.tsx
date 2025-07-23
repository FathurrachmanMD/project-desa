import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { PermohonanBantuan } from '@/data/agricultural-permits';

interface PermohonanBantuanColumnsProps {
  onView: (data: PermohonanBantuan) => void;
  onEdit: (data: PermohonanBantuan) => void;
  onDelete: (data: PermohonanBantuan) => void;
}

export const createPermohonanBantuanColumns = ({ onView, onEdit, onDelete }: PermohonanBantuanColumnsProps): ColumnDef<PermohonanBantuan>[] => [
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
    accessorKey: 'jenis_bantuan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Bantuan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('jenis_bantuan')}
      </div>
    ),
  },
  {
    accessorKey: 'jumlah',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('jumlah')}</div>
    ),
  },
  {
    accessorKey: 'alasan_kebutuhan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alasan Kebutuhan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('alasan_kebutuhan')}</div>
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
