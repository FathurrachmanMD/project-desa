import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratIzinKeluarNegeri } from '@/data/personal-permits';

interface SuratIzinKeluarNegeriColumnsProps {
  onView: (data: SuratIzinKeluarNegeri) => void;
  onEdit: (data: SuratIzinKeluarNegeri) => void;
  onDelete: (data: SuratIzinKeluarNegeri) => void;
}

export const createSuratIzinKeluarNegeriColumns = ({ onView, onEdit, onDelete }: SuratIzinKeluarNegeriColumnsProps): ColumnDef<SuratIzinKeluarNegeri>[] => [
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
    accessorKey: 'tujuan_keberangkatan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Keberangkatan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('tujuan_keberangkatan')}</div>
    ),
  },
  {
    accessorKey: 'negara_tujuan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Negara Tujuan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate font-medium">{row.getValue('negara_tujuan')}</div>
    ),
  },
  {
    accessorKey: 'periode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Periode / Waktu" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate">{row.getValue('periode')}</div>
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
