import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { IzinBangunLahanDesa } from '@/data/building-permits';

interface LahanDesaColumnsProps {
  onView: (data: IzinBangunLahanDesa) => void;
  onEdit: (data: IzinBangunLahanDesa) => void;
  onDelete: (data: IzinBangunLahanDesa) => void;
}

export const createLahanDesaColumns = ({ onView, onEdit, onDelete }: LahanDesaColumnsProps): ColumnDef<IzinBangunLahanDesa>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'nama_pemohon',
    header: 'Nama Pemohon',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemohon')}</div>
    ),
  },
  {
    accessorKey: 'nama_lahan',
    header: 'Nama Lahan / Titik Lokasi',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('nama_lahan')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_pembangunan',
    header: 'Tujuan Pembangunan',
    cell: ({ row }) => (
      <div>{row.getValue('tujuan_pembangunan')}</div>
    ),
  },
  {
    accessorKey: 'rekomendasi_kades',
    header: 'Rekomendasi Kepala Desa',
    cell: ({ row }) => {
      const rekomendasi = row.getValue('rekomendasi_kades') as string;
      return (
        <Badge variant={rekomendasi === 'Ya' ? 'default' : 'destructive'}>
          {rekomendasi}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} type="building" />
    ),
  },
  {
    accessorKey: 'tanggal_pengajuan',
    header: 'Tanggal Pengajuan',
    cell: ({ row }) => {
      const date = new Date(row.getValue('tanggal_pengajuan'));
      return <div>{date.toLocaleDateString('id-ID')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(data)}>
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(data)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(data)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
