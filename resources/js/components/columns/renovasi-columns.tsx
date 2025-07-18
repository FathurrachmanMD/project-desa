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
import { IzinRenovasiPerluasan } from '@/data/building-permits';

interface RenovasiColumnsProps {
  onView: (data: IzinRenovasiPerluasan) => void;
  onEdit: (data: IzinRenovasiPerluasan) => void;
  onDelete: (data: IzinRenovasiPerluasan) => void;
}

export const createRenovasiColumns = ({ onView, onEdit, onDelete }: RenovasiColumnsProps): ColumnDef<IzinRenovasiPerluasan>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'nama_pemilik',
    header: 'Nama Pemilik',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemilik')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_bangunan',
    header: 'Lokasi Bangunan',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_bangunan')}</div>
    ),
  },
  {
    accessorKey: 'jenis_renovasi',
    header: 'Jenis Renovasi',
    cell: ({ row }) => (
      <div>{row.getValue('jenis_renovasi')}</div>
    ),
  },
  {
    accessorKey: 'status_tanah',
    header: 'Status Tanah',
    cell: ({ row }) => (
      <div>{row.getValue('status_tanah')}</div>
    ),
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
