import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/status-badge';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { IzinBangunLahanDesa } from '@/data/building-permits';

interface LahanDesaColumnsProps {
  onView: (data: IzinBangunLahanDesa) => void;
  onEdit: (data: IzinBangunLahanDesa) => void;
  onDelete: (data: IzinBangunLahanDesa) => void;
}

export const createLahanDesaColumns = ({ onView, onEdit, onDelete }: LahanDesaColumnsProps): ColumnDef<IzinBangunLahanDesa>[] => [
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
    accessorKey: 'nama_lahan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Lahan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('nama_lahan')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_pembangunan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan Pembangunan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('tujuan_pembangunan')}</div>
    ),
  },
  {
    accessorKey: 'rekomendasi_kades',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rekomendasi Kades" />
    ),
    cell: ({ row }) => {
      const rekomendasi = row.getValue('rekomendasi_kades') as 'Disetujui' | 'Ditolak' | 'Menunggu';
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          rekomendasi === 'Disetujui' 
            ? 'bg-green-100 text-green-800' 
            : rekomendasi === 'Ditolak'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {rekomendasi}
        </div>
      );
    },
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
