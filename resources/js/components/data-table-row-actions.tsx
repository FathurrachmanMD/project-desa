import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  onView?: (data: TData) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
  onView,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onView && (
          <DropdownMenuItem onClick={() => onView(row.original)}>
            <Eye className="mr-2 h-4 w-4" />
            Detail
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {(onView || onEdit) && onDelete && <DropdownMenuSeparator />}
        {onDelete && (
          <DropdownMenuItem 
            onClick={() => onDelete(row.original)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
