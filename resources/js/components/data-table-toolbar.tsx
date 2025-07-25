import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchColumn?: string;
  enableStatusFilter?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Cari...",
  searchColumn = "nama_pemohon",
  enableStatusFilter = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex flex-1 items-center space-x-3">
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="h-9 w-[180px] lg:w-[280px]"
        />
        {enableStatusFilter && table.getColumn("status") && (
          <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) =>
              table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="h-9 w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Diproses">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Diproses
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="Disetujui">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Disetujui
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="Ditolak">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Ditolak
                  </Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
