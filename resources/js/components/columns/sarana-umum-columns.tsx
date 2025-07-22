import { ColumnDef } from '@tanstack/react-table';
import { IzinPenggunaanSaranaUmum } from '@/data/event-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';

interface SaranaUmumColumnsProps {
  onView?: (data: IzinPenggunaanSaranaUmum) => void;
  onEdit?: (data: IzinPenggunaanSaranaUmum) => void;
  onDelete?: (data: IzinPenggunaanSaranaUmum) => void;
}

export const createSaranaUmumColumns = ({ onView, onEdit, onDelete }: SaranaUmumColumnsProps = {}): ColumnDef<IzinPenggunaanSaranaUmum>[] => [
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
    accessorKey: 'jenis_fasilitas',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Fasilitas" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('jenis_fasilitas')}
      </div>
    ),
  },
  {
    accessorKey: 'tanggal_penggunaan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Penggunaan" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('tanggal_penggunaan')).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'keperluan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keperluan" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate text-sm">
        {row.getValue('keperluan')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Pengajuan" />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} type="event" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
