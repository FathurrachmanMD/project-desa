import { ColumnDef } from '@tanstack/react-table';
import { SuratIzinAcaraPublik } from '@/data/event-permits';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableRowActions } from '@/components/data-table-row-actions';
import { StatusBadge } from '@/components/status-badge';

interface AcaraPublikColumnsProps {
  onView?: (data: SuratIzinAcaraPublik) => void;
  onEdit?: (data: SuratIzinAcaraPublik) => void;
  onDelete?: (data: SuratIzinAcaraPublik) => void;
}

export const createAcaraPublikColumns = ({ onView, onEdit, onDelete }: AcaraPublikColumnsProps = {}): ColumnDef<SuratIzinAcaraPublik>[] => [
  {
    id: 'nomor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return (
        <div className="font-medium text-center">
          {pageIndex * pageSize + row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: 'nama_penyelenggara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Penyelenggara" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('nama_penyelenggara')}</div>
    ),
  },
  {
    accessorKey: 'nama_acara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Acara" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[180px] truncate font-medium">
        {row.getValue('nama_acara')}
      </div>
    ),
  },
  {
    accessorKey: 'tanggal_waktu_acara',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal & Waktu Acara" />
    ),
    cell: ({ row }) => (
      <div className="text-sm whitespace-nowrap">
        {row.getValue('tanggal_waktu_acara')}
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
    accessorKey: 'rekomendasi_keamanan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rekomendasi Keamanan" />
    ),
    cell: ({ row }) => {
      const rekomendasi = row.getValue('rekomendasi_keamanan') as 'Sudah' | 'Belum';
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          rekomendasi === 'Sudah' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {rekomendasi}
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
