import { ColumnDef } from '@tanstack/react-table';
import { SuratIzinTempatUsaha } from '@/data/business-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';

export const situColumns = (
  onView?: (data: SuratIzinTempatUsaha) => void,
  onEdit?: (data: SuratIzinTempatUsaha) => void,
  onDelete?: (data: SuratIzinTempatUsaha) => void
): ColumnDef<SuratIzinTempatUsaha>[] => [
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
    accessorKey: 'alamat_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat Usaha" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-sm">
        {row.getValue('alamat_usaha')}
      </div>
    ),
  },
  {
    accessorKey: 'status_lahan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Lahan" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue('status_lahan')}</div>
    ),
  },
  {
    accessorKey: 'jenis_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Usaha" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue('jenis_usaha')}</div>
    ),
  },
  {
    accessorKey: 'rekomendasi_rtrw',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rekomendasi RT/RW" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('rekomendasi_rtrw') as string;
      return (
        <Badge 
          variant="outline" 
          className={status === 'Sudah' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
        >
          {status}
        </Badge>
      );
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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={onView ? () => onView(row.original) : undefined}
        onEdit={onEdit ? () => onEdit(row.original) : undefined}
        onDelete={onDelete ? () => onDelete(row.original) : undefined}
      />
    ),
  },
];
