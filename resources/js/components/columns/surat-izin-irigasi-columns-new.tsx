import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratIzinIrigasi } from '@/data/agricultural-permits';

interface SuratIzinIrigasiColumnsProps {
  onView: (data: SuratIzinIrigasi) => void;
  onEdit: (data: SuratIzinIrigasi) => void;
  onDelete: (data: SuratIzinIrigasi) => void;
}

export const createSuratIzinIrigasiColumns = ({ onView, onEdit, onDelete }: SuratIzinIrigasiColumnsProps): ColumnDef<SuratIzinIrigasi>[] => [
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
    accessorKey: 'sumber_air',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sumber Air" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('sumber_air')}
      </div>
    ),
  },
  {
    accessorKey: 'lokasi_penggunaan_air',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Penggunaan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_penggunaan_air')}</div>
    ),
  },
  {
    accessorKey: 'jenis_tanaman',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Tanaman" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue('jenis_tanaman')}</div>
    ),
  },
  {
    accessorKey: 'luas_area_irigasi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Luas Area" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('luas_area_irigasi')}</div>
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
