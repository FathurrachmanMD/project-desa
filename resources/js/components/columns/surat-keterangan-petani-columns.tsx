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
import { SuratKeteranganPetani } from '@/data/agricultural-permits';

interface SuratKeteranganPetaniColumnsProps {
  onView: (data: SuratKeteranganPetani) => void;
  onEdit: (data: SuratKeteranganPetani) => void;
  onDelete: (data: SuratKeteranganPetani) => void;
}

export const createSuratKeteranganPetaniColumns = ({ onView, onEdit, onDelete }: SuratKeteranganPetaniColumnsProps): ColumnDef<SuratKeteranganPetani>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama')}</div>
    ),
  },
  {
    accessorKey: 'jenis_profesi',
    header: 'Jenis Profesi',
    cell: ({ row }) => (
      <div>{row.getValue('jenis_profesi')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_bertani',
    header: 'Lokasi Bertani',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_bertani')}</div>
    ),
  },
  {
    accessorKey: 'masa_aktif',
    header: 'Masa Aktif Bertani',
    cell: ({ row }) => (
      <div>{row.getValue('masa_aktif')}</div>
    ),
  },
  {
    accessorKey: 'tujuan_surat',
    header: 'Tujuan Surat',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('tujuan_surat')}</div>
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
