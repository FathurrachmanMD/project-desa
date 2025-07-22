import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratIzinTinggalPendatang } from '@/data/personal-permits';

interface SuratIzinTinggalPendatangColumnsProps {
  onView: (data: SuratIzinTinggalPendatang) => void;
  onEdit: (data: SuratIzinTinggalPendatang) => void;
  onDelete: (data: SuratIzinTinggalPendatang) => void;
}

export const createSuratIzinTinggalPendatangColumns = ({ onView, onEdit, onDelete }: SuratIzinTinggalPendatangColumnsProps): ColumnDef<SuratIzinTinggalPendatang>[] => [
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
    accessorKey: 'nama_pendatang',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pendatang" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pendatang')}</div>
    ),
  },
  {
    accessorKey: 'alamat_asal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat Asal" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('alamat_asal')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_pindah',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Pindah" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('tujuan_pindah')}</div>
    ),
  },
  {
    accessorKey: 'rt_rw_tujuan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RT/RW Tujuan" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('rt_rw_tujuan')}</div>
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
