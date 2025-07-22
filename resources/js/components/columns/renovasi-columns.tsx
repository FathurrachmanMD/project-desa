import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { IzinRenovasiPerluasan } from '@/data/building-permits';

interface RenovasiColumnsProps {
  onView: (data: IzinRenovasiPerluasan) => void;
  onEdit: (data: IzinRenovasiPerluasan) => void;
  onDelete: (data: IzinRenovasiPerluasan) => void;
}

export const createRenovasiColumns = ({ onView, onEdit, onDelete }: RenovasiColumnsProps): ColumnDef<IzinRenovasiPerluasan>[] => [
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
    accessorKey: 'nama_pemilik',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pemilik" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemilik')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_bangunan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Bangunan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_bangunan')}</div>
    ),
  },
  {
    accessorKey: 'jenis_renovasi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Renovasi" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('jenis_renovasi')}
      </div>
    ),
  },
  {
    accessorKey: 'status_tanah',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Tanah" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('status_tanah')}</div>
    ),
  },
  {
    accessorKey: 'luas_area_renovasi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Luas Area" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('luas_area_renovasi')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pengajuan" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} type="building" />
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
