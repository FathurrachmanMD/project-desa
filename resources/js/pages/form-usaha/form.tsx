import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';
import { FadeInView } from '@/components/animations';
import type { BreadcrumbItem } from '@/types';
import { Building2, FileText, ShoppingBag, Store, Briefcase } from 'lucide-react';

interface FormProps {
    type: 'siup' | 'nib' | 'situ' | 'sku' | 'iumk';
}

const permitTypes = {
    siup: {
        title: 'Surat Izin Usaha Perdagangan (SIUP)',
        description: 'Izin untuk menjalankan kegiatan usaha perdagangan',
        icon: Store,
        color: 'bg-gradient-to-br from-blue-500 to-purple-500',
    },
    nib: {
        title: 'Nomor Induk Berusaha (NIB)',
        description: 'Identitas pelaku usaha untuk memulai dan menjalankan usaha',
        icon: FileText,
        color: 'bg-gradient-to-br from-orange-500 to-red-500',
    },
    situ: {
        title: 'Surat Izin Tempat Usaha (SITU)',
        description: 'Izin yang menyatakan keabsahan lokasi tempat usaha',
        icon: Building2,
        color: 'bg-gradient-to-br from-pink-500 to-rose-500',
    },
    sku: {
        title: 'Surat Keterangan Usaha (SKU)',
        description: 'Surat keterangan yang menyatakan keberadaan usaha',
        icon: ShoppingBag,
        color: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    },
    iumk: {
        title: 'Izin Usaha Mikro Kecil (IUMK)',
        description: 'Izin untuk usaha mikro dan kecil',
        icon: Briefcase,
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    }
};

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

const permitFieldMap: Record<string, { label: string; name: string; type: string; required?: boolean; }> = {
  nama_pemohon: { label: 'Nama Pemohon', name: 'nama_pemohon', type: 'text', required: true },
  nik: { label: 'NIK', name: 'nik', type: 'text', required: true },
  nama_usaha: { label: 'Nama Usaha', name: 'nama_usaha', type: 'text', required: true },
  alamat_usaha: { label: 'Alamat Usaha', name: 'alamat_usaha', type: 'text', required: true },
  lama_usaha: { label: 'Lama Usaha', name: 'lama_usaha', type: 'text', required: true },
  jenis_usaha: { label: 'Jenis Usaha', name: 'jenis_usaha', type: 'text', required: true },
  modal_usaha: { label: 'Modal Usaha', name: 'modal_usaha', type: 'text', required: true },
  status_tempat_usaha: { label: 'Status Tempat Usaha', name: 'status_tempat_usaha', type: 'text', required: true },
  status_lahan: { label: 'Status Lahan', name: 'status_lahan', type: 'text', required: true },
  rekomendasi_rtrw: { label: 'Rekomendasi RT/RW', name: 'rekomendasi_rtrw', type: 'text', required: true },
  tujuan: { label: 'Tujuan', name: 'tujuan', type: 'text', required: true },
};

const permitFields: Record<string, string[]> = {
  sku: ['nama_pemohon', 'nik', 'nama_usaha', 'alamat_usaha', 'lama_usaha'],
  iumk: ['nama_pemohon', 'nik', 'nama_usaha', 'jenis_usaha', 'modal_usaha', 'status_tempat_usaha'],
  situ: ['nama_pemohon', 'alamat_usaha', 'status_lahan', 'jenis_usaha', 'rekomendasi_rtrw'],
  nib: ['nama_pemohon', 'nik', 'nama_usaha', 'tujuan'],
  siup: ['nama_pemohon', 'nik', 'nama_usaha', 'alamat_usaha', 'jenis_usaha', 'modal_usaha'],
};

interface BusinessPermitFormProps {
  type: string;
}

export default function BusinessPermitForm({ type }: BusinessPermitFormProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get fields based on the type
  const fields = type && permitFields[type as keyof typeof permitFields] 
    ? permitFields[type as keyof typeof permitFields] 
    : [];
    
  const permitType = type && permitTypes[type as keyof typeof permitTypes];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Add form data
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add file if exists
      if (file) {
        formData.append('file', file);
      }
      
      // Add type
      formData.append('type', type);
      
      // Send data to server
      const response = await fetch('/api/form-usaha/submit', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Gagal mengajukan permohonan');
      }
      
      const result = await response.json();
      alert('Pengajuan berhasil!');
      window.location.href = '/form-usaha';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-24 px-4 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Ajukan {permitType?.title || 'Perizinan Usaha'}</h1>
          <p className="text-gray-600">{permitType?.description || 'Silakan lengkapi formulir di bawah ini'}</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((key) => (
            permitFieldMap[key] ? (
              <div key={key}>
                <label className="block text-sm font-medium mb-1" htmlFor={key}>
                  {permitFieldMap[key].label}
                  {permitFieldMap[key].required && <span className="text-red-500">*</span>}
                </label>
                {permitFieldMap[key].type === 'textarea' ? (
                  <textarea
                    id={key}
                    name={key}
                    required={permitFieldMap[key].required}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring min-h-[100px]"
                    value={form[key] || ''}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                ) : (
                  <input
                    id={key}
                    name={key}
                    type={permitFieldMap[key].type}
                    required={permitFieldMap[key].required}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    value={form[key] || ''}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                )}
              </div>
            ) : null
          ))}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="file_upload">
              Upload Berkas Pendukung
            </label>
            <input
              id="file_upload"
              name="file_upload"
              type="file"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              onChange={handleFileChange}
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tanggal_pengajuan">
              Tanggal Pengajuan
            </label>
            <input
              id="tanggal_pengajuan"
              name="tanggal_pengajuan"
              type="text"
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={getCurrentDate()}
              readOnly
              tabIndex={-1}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? 'Mengirim...' : 'Ajukan Sekarang'}
          </button>
        </form>
      </main>
    </>
  );
}

