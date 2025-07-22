import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratKeteranganPetani } from '@/data/agricultural-permits';

interface SuratKeteranganPetaniColumnsProps {
  onView: (data: SuratKeteranganPetani) => void;
  onEdit: (data: SuratKeteranganPetani) => void;
  onDelete: (data: SuratKeteranganPetani) => void;
}

export const createSuratKeteranganPetaniColumns = ({ onView, onEdit, onDelete }: SuratKeteranganPetaniColumnsProps): ColumnDef<SuratKeteranganPetani>[] => [
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
    accessorKey: 'nama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama')}</div>
    ),
  },
  {
    accessorKey: 'jenis_profesi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Profesi" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('jenis_profesi')}
      </div>
    ),
  },
  {
    accessorKey: 'lokasi_bertani',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Bertani" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_bertani')}</div>
    ),
  },
  {
    accessorKey: 'masa_aktif',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Masa Aktif" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('masa_aktif')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_surat',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Surat" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('tujuan_surat')}</div>
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
