import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratKeteranganTidakBekerja } from '@/data/personal-permits';

interface SuratKeteranganTidakBekerjaColumnsProps {
  onView: (data: SuratKeteranganTidakBekerja) => void;
  onEdit: (data: SuratKeteranganTidakBekerja) => void;
  onDelete: (data: SuratKeteranganTidakBekerja) => void;
}

export const createSuratKeteranganTidakBekerjaColumns = ({ onView, onEdit, onDelete }: SuratKeteranganTidakBekerjaColumnsProps): ColumnDef<SuratKeteranganTidakBekerja>[] => [
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
    accessorKey: 'alasan_tidak_bekerja',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alasan Tidak Bekerja" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('alasan_tidak_bekerja')}</div>
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
