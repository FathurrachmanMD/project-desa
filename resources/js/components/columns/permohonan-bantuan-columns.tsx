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
import { PermohonanBantuan } from '@/data/agricultural-permits';

interface PermohonanBantuanColumnsProps {
  onView: (data: PermohonanBantuan) => void;
  onEdit: (data: PermohonanBantuan) => void;
  onDelete: (data: PermohonanBantuan) => void;
}

export const createPermohonanBantuanColumns = ({ onView, onEdit, onDelete }: PermohonanBantuanColumnsProps): ColumnDef<PermohonanBantuan>[] => [
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
    accessorKey: 'jenis_bantuan',
    header: 'Jenis Bantuan',
    cell: ({ row }) => (
      <div>{row.getValue('jenis_bantuan')}</div>
    ),
  },
  {
    accessorKey: 'jumlah',
    header: 'Jumlah / Volume',
    cell: ({ row }) => (
      <div>{row.getValue('jumlah')}</div>
    ),
  },
  {
    accessorKey: 'alasan_kebutuhan',
    header: 'Alasan Kebutuhan',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('alasan_kebutuhan')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} type="agricultural" />
    ),
  },
  {
    accessorKey: 'tanggal_pengajuan',
    header: 'Tanggal Pengajuan',
    cell: ({ row }) => {
      const date = new Date(row.getValue('tanggal_pengajuan'));
      return (
        <div className="text-sm">
          {date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      );
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
            <DropdownMenuItem 
              onClick={() => onDelete(data)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
