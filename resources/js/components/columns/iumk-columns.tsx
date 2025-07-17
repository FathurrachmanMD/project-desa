import { ColumnDef } from '@tanstack/react-table';
import { IzinUsahaMikroKecil } from '@/data/business-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';

export const iumkColumns: ColumnDef<IzinUsahaMikroKecil>[] = [
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
    accessorKey: 'jenis_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Usaha" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue('jenis_usaha')}</div>
    ),
  },
  {
    accessorKey: 'modal_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modal Usaha" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium text-green-600">
        {row.getValue('modal_usaha')}
      </div>
    ),
  },
  {
    accessorKey: 'status_tempat_usaha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Tempat" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue('status_tempat_usaha')}</div>
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
        onView={(data) => console.log('View:', data)}
        onEdit={(data) => console.log('Edit:', data)}
        onDelete={(data) => console.log('Delete:', data)}
      />
    ),
  },
];
