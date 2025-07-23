import { ColumnDef } from '@tanstack/react-table';
import { RekomendasiNIB } from '@/data/business-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';

export const nibColumns = (
  onView?: (data: RekomendasiNIB) => void,
  onEdit?: (data: RekomendasiNIB) => void,
  onDelete?: (data: RekomendasiNIB) => void
): ColumnDef<RekomendasiNIB>[] => [
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
    accessorKey: 'nik',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIK" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.getValue('nik')}</div>
    ),
  },
  {
    accessorKey: 'nama_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Usaha" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue('nama_usaha')}
      </div>
    ),
  },
  {
    accessorKey: 'tujuan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tujuan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate text-sm">
        {row.getValue('tujuan')}
      </div>
    ),
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
