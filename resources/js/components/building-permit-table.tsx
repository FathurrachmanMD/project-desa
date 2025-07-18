import React from 'react';
import { DataTable } from '@/components/data-table';
import { createIMBColumns } from '@/components/columns/imb-columns';
import { createLahanDesaColumns } from '@/components/columns/lahan-desa-columns';
import { createTidakSengketaColumns } from '@/components/columns/tidak-sengketa-columns';
import { createRenovasiColumns } from '@/components/columns/renovasi-columns';
import { 
  IzinMendirikanBangunan,
  IzinBangunLahanDesa,
  SuratTidakSengketaTanah,
  IzinRenovasiPerluasan
} from '@/data/building-permits';

interface BuildingPermitTableProps {
  type: 'imb' | 'lahan-desa' | 'tidak-sengketa' | 'renovasi';
  data?: IzinMendirikanBangunan[] | IzinBangunLahanDesa[] | SuratTidakSengketaTanah[] | IzinRenovasiPerluasan[];
  searchPlaceholder?: string;
  onView?: (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => void;
  onEdit?: (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => void;
  onDelete?: (data: IzinMendirikanBangunan | IzinBangunLahanDesa | SuratTidakSengketaTanah | IzinRenovasiPerluasan) => void;
}

export function BuildingPermitTable({ 
  type, 
  data = [],
  searchPlaceholder,
  onView,
  onEdit,
  onDelete 
}: BuildingPermitTableProps) {
  switch (type) {
    case 'imb':
      return (
        <DataTable
          columns={createIMBColumns({ 
            onView: onView as (data: IzinMendirikanBangunan) => void,
            onEdit: onEdit as (data: IzinMendirikanBangunan) => void,
            onDelete: onDelete as (data: IzinMendirikanBangunan) => void
          })}
          data={data as IzinMendirikanBangunan[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'lahan-desa':
      return (
        <DataTable
          columns={createLahanDesaColumns({ 
            onView: onView as (data: IzinBangunLahanDesa) => void,
            onEdit: onEdit as (data: IzinBangunLahanDesa) => void,
            onDelete: onDelete as (data: IzinBangunLahanDesa) => void
          })}
          data={data as IzinBangunLahanDesa[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'tidak-sengketa':
      return (
        <DataTable
          columns={createTidakSengketaColumns({ 
            onView: onView as (data: SuratTidakSengketaTanah) => void,
            onEdit: onEdit as (data: SuratTidakSengketaTanah) => void,
            onDelete: onDelete as (data: SuratTidakSengketaTanah) => void
          })}
          data={data as SuratTidakSengketaTanah[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemilik_tanah"
          enableStatusFilter={true}
        />
      );
    case 'renovasi':
      return (
        <DataTable
          columns={createRenovasiColumns({ 
            onView: onView as (data: IzinRenovasiPerluasan) => void,
            onEdit: onEdit as (data: IzinRenovasiPerluasan) => void,
            onDelete: onDelete as (data: IzinRenovasiPerluasan) => void
          })}
          data={data as IzinRenovasiPerluasan[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemilik"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
