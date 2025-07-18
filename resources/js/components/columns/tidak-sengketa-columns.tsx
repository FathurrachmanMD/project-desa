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
import { SuratTidakSengketaTanah } from '@/data/building-permits';

interface TidakSengketaColumnsProps {
  onView: (data: SuratTidakSengketaTanah) => void;
  onEdit: (data: SuratTidakSengketaTanah) => void;
  onDelete: (data: SuratTidakSengketaTanah) => void;
}

export const createTidakSengketaColumns = ({ onView, onEdit, onDelete }: TidakSengketaColumnsProps): ColumnDef<SuratTidakSengketaTanah>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'nama_pemilik_tanah',
    header: 'Nama Pemilik Tanah',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_pemilik_tanah')}</div>
    ),
  },
  {
    accessorKey: 'lokasi_tanah',
    header: 'Lokasi Tanah',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('lokasi_tanah')}</div>
    ),
  },
  {
    accessorKey: 'status_sengketa',
    header: 'Status Sengketa',
    cell: ({ row }) => {
      const status = row.getValue('status_sengketa') as string;
      return (
        <Badge variant={status === 'Tidak' ? 'default' : 'destructive'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'tujuan_penggunaan',
    header: 'Tujuan Penggunaan',
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue('tujuan_penggunaan')}</div>
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
