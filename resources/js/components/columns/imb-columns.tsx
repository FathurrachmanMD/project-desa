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
import { IzinMendirikanBangunan } from '@/data/building-permits';

interface IMBColumnsProps {
  onView: (data: IzinMendirikanBangunan) => void;
  onEdit: (data: IzinMendirikanBangunan) => void;
  onDelete: (data: IzinMendirikanBangunan) => void;
}

export const createIMBColumns = ({ onView, onEdit, onDelete }: IMBColumnsProps): ColumnDef<IzinMendirikanBangunan>[] => [
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
    accessorKey: 'alamat_bangunan',
    header: 'Alamat Bangunan',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('alamat_bangunan')}</div>
    ),
  },
  {
    accessorKey: 'jenis_bangunan',
    header: 'Jenis Bangunan',
    cell: ({ row }) => (
      <div>{row.getValue('jenis_bangunan')}</div>
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
