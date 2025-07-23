import React from 'react';
import { DataTable } from '@/components/data-table';
import { createSuratPengantarSKCKColumns } from '@/components/columns/pengantar-skck-columns';
import { createSuratKeteranganDomisiliColumns } from '@/components/columns/keterangan-domisili-columns';
import { createSuratIzinTinggalPendatangColumns } from '@/components/columns/izin-tinggal-pendatang-columns';
import { createSuratIzinKeluarNegeriColumns } from '@/components/columns/izin-keluar-negeri-columns';
import { createSuratKeteranganTidakBekerjaColumns } from '@/components/columns/keterangan-tidak-bekerja-columns';
import { 
  SuratPengantarSKCK,
  SuratKeteranganDomisili,
  SuratIzinTinggalPendatang,
  SuratIzinKeluarNegeri,
  SuratKeteranganTidakBekerja
} from '@/data/personal-permits';

interface PersonalPermitTableProps {
  type: 'pengantar-skck' | 'keterangan-domisili' | 'izin-tinggal-pendatang' | 'izin-keluar-negeri' | 'keterangan-tidak-bekerja';
  data?: SuratPengantarSKCK[] | SuratKeteranganDomisili[] | SuratIzinTinggalPendatang[] | SuratIzinKeluarNegeri[] | SuratKeteranganTidakBekerja[];
  searchPlaceholder?: string;
  onView?: (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => void;
  onEdit?: (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => void;
  onDelete?: (data: SuratPengantarSKCK | SuratKeteranganDomisili | SuratIzinTinggalPendatang | SuratIzinKeluarNegeri | SuratKeteranganTidakBekerja) => void;
}

export function PersonalPermitTable({ 
  type, 
  data = [],
  searchPlaceholder,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {}
}: PersonalPermitTableProps) {
  switch (type) {
    case 'pengantar-skck':
      return (
        <DataTable
          columns={createSuratPengantarSKCKColumns({ 
            onView: onView as (data: SuratPengantarSKCK) => void, 
            onEdit: onEdit as (data: SuratPengantarSKCK) => void, 
            onDelete: onDelete as (data: SuratPengantarSKCK) => void 
          })}
          data={data as SuratPengantarSKCK[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'keterangan-domisili':
      return (
        <DataTable
          columns={createSuratKeteranganDomisiliColumns({ 
            onView: onView as (data: SuratKeteranganDomisili) => void, 
            onEdit: onEdit as (data: SuratKeteranganDomisili) => void, 
            onDelete: onDelete as (data: SuratKeteranganDomisili) => void 
          })}
          data={data as SuratKeteranganDomisili[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_warga"
          enableStatusFilter={true}
        />
      );
    case 'izin-tinggal-pendatang':
      return (
        <DataTable
          columns={createSuratIzinTinggalPendatangColumns({ 
            onView: onView as (data: SuratIzinTinggalPendatang) => void, 
            onEdit: onEdit as (data: SuratIzinTinggalPendatang) => void, 
            onDelete: onDelete as (data: SuratIzinTinggalPendatang) => void 
          })}
          data={data as SuratIzinTinggalPendatang[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pendatang"
          enableStatusFilter={true}
        />
      );
    case 'izin-keluar-negeri':
      return (
        <DataTable
          columns={createSuratIzinKeluarNegeriColumns({ 
            onView: onView as (data: SuratIzinKeluarNegeri) => void, 
            onEdit: onEdit as (data: SuratIzinKeluarNegeri) => void, 
            onDelete: onDelete as (data: SuratIzinKeluarNegeri) => void 
          })}
          data={data as SuratIzinKeluarNegeri[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    case 'keterangan-tidak-bekerja':
      return (
        <DataTable
          columns={createSuratKeteranganTidakBekerjaColumns({ 
            onView: onView as (data: SuratKeteranganTidakBekerja) => void, 
            onEdit: onEdit as (data: SuratKeteranganTidakBekerja) => void, 
            onDelete: onDelete as (data: SuratKeteranganTidakBekerja) => void 
          })}
          data={data as SuratKeteranganTidakBekerja[]}
          searchPlaceholder={searchPlaceholder}
          searchColumn="nama_pemohon"
          enableStatusFilter={true}
        />
      );
    default:
      return null;
  }
}
