import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { SuratTidakSengketaTanah } from '@/data/building-permits';

interface TidakSengketaColumnsProps {
  onView: (data: SuratTidakSengketaTanah) => void;
  onEdit: (data: SuratTidakSengketaTanah) => void;
  onDelete: (data: SuratTidakSengketaTanah) => void;
}

export const createTidakSengketaColumns = ({ onView, onEdit, onDelete }: TidakSengketaColumnsProps): ColumnDef<SuratTidakSengketaTanah>[] => [
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
    accessorKey: 'nama_pemilik_tanah',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pemilik Tanah" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemilik_tanah')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_tanah',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Tanah" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_tanah')}</div>
    ),
  },
  {
    accessorKey: 'status_sengketa',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Sengketa" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status_sengketa') as 'Tidak Ada Sengketa' | 'Ada Sengketa';
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'Tidak Ada Sengketa' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'tujuan_penggunaan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Penggunaan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('tujuan_penggunaan')}</div>
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
