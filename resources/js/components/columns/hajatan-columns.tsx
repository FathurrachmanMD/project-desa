import { ColumnDef } from '@tanstack/react-table';
import { SuratIzinHajatan } from '@/data/event-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';

interface HajatnColumnsProps {
  onView?: (data: SuratIzinHajatan) => void;
  onEdit?: (data: SuratIzinHajatan) => void;
  onDelete?: (data: SuratIzinHajatan) => void;
}

export const createHajatnColumns = ({ onView, onEdit, onDelete }: HajatnColumnsProps = {}): ColumnDef<SuratIzinHajatan>[] => [
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
    accessorKey: 'jenis_acara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Acara" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate font-medium">
        {row.getValue('jenis_acara')}
      </div>
    ),
  },
  {
    accessorKey: 'tanggal_acara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Acara" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue('tanggal_acara')).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'lokasi_acara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokasi Acara" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate text-sm">
        {row.getValue('lokasi_acara')}
      </div>
    ),
  },
  {
    accessorKey: 'dampak_keramaian',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dampak Keramaian" />
    ),
    cell: ({ row }) => {
      const dampak = row.getValue('dampak_keramaian') as 'Ya' | 'Tidak';
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          dampak === 'Ya' 
            ? 'bg-orange-100 text-orange-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {dampak}
        </div>
      );
    },
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
