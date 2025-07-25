import React from 'react';
import { DataTable } from '@/components/data-table';
import { createPengelolaanLahanColumns } from '@/components/columns/pengelolaan-lahan-columns';
import { createPermohonanBantuanColumns } from '@/components/columns/permohonan-bantuan-columns';
import { createSuratKeteranganPetaniColumns } from '@/components/columns/surat-keterangan-petani-columns';
import { createSuratIzinIrigasiColumns } from '@/components/columns/surat-izin-irigasi-columns';
import { 
  IzinPengelolaanLahan,
  PermohonanBantuan,
  SuratKeteranganPetani,
  SuratIzinIrigasi
} from '@/data/agricultural-permits';

interface AgriculturalPermitTableProps {
  type: 'pengelolaan-lahan' | 'permohonan-bantuan' | 'surat-keterangan-petani' | 'surat-izin-irigasi';
  data?: IzinPengelolaanLahan[] | PermohonanBantuan[] | SuratKeteranganPetani[] | SuratIzinIrigasi[];
  searchPlaceholder?: string;
  onView?: (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => void;
  onEdit?: (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => void;
  onDelete?: (data: IzinPengelolaanLahan | PermohonanBantuan | SuratKeteranganPetani | SuratIzinIrigasi) => void;
}

export function AgriculturalPermitTable({ 
  type, 
  data = [],
  searchPlaceholder,
  onView,
  onEdit,
  onDelete 
}: AgriculturalPermitTableProps) {
  switch (type) {
    case 'pengelolaan-lahan':
      return (
        <DataTable
          columns={createPengelolaanLahanColumns({ 
            onView: onView as (data: IzinPengelolaanLahan) => void,
            onEdit: onEdit as (data: IzinPengelolaanLahan) => void,
            onDelete: onDelete as (data: IzinPengelolaanLahan) => void
          })}
          data={data as IzinPengelolaanLahan[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'permohonan-bantuan':
      return (
        <DataTable
          columns={createPermohonanBantuanColumns({ 
            onView: onView as (data: PermohonanBantuan) => void,
            onEdit: onEdit as (data: PermohonanBantuan) => void,
            onDelete: onDelete as (data: PermohonanBantuan) => void
          })}
          data={data as PermohonanBantuan[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'surat-keterangan-petani':
      return (
        <DataTable
          columns={createSuratKeteranganPetaniColumns({ 
            onView: onView as (data: SuratKeteranganPetani) => void,
            onEdit: onEdit as (data: SuratKeteranganPetani) => void,
            onDelete: onDelete as (data: SuratKeteranganPetani) => void
          })}
          data={data as SuratKeteranganPetani[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama"
          enableStatusFilter={true}
        />
      );
    case 'surat-izin-irigasi':
      return (
        <DataTable
          columns={createSuratIzinIrigasiColumns({ 
            onView: onView as (data: SuratIzinIrigasi) => void,
            onEdit: onEdit as (data: SuratIzinIrigasi) => void,
            onDelete: onDelete as (data: SuratIzinIrigasi) => void
          })}
          data={data as SuratIzinIrigasi[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
