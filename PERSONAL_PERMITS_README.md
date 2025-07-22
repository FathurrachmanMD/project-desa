# Personal Permit Management System

## Overview

This is a comprehensive personal permit management system for the Perizinan Pribadi (Personal Permits) dashboard. The system allows admin users to manage five types of personal permits with full CRUD operations and a modern UI interface.

## Features

### 🏛️ Dashboard Admin - Perizinan Pribadi

- **Interactive DataTables** for 5 types of personal permits
- **Global Search** functionality
- **Pagination** with customizable page sizes
- **Status Filtering** (Diproses, Disetujui, Ditolak)
- **Statistics Cards** showing permit counts by status
- **Responsive Design** with mobile-friendly layout

### 📋 Five Types of Personal Permits

#### 1. Surat Pengantar SKCK - Police Record Introduction Letter

**Columns:**

- Nama Pemohon (Applicant Name)
- NIK (National ID Number)
- Tujuan SKCK (SKCK Purpose)
- Tempat Tujuan SKCK (SKCK Destination)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "SKCK001",
    "nama_pemohon": "Andi Prasetyo",
    "nik": "3210123456789001",
    "tujuan_skck": "Melamar kerja",
    "tempat_tujuan_skck": "Polsek Cibiru",
    "status": "Diproses",
    "tanggal_pengajuan": "2025-07-15"
}
```

#### 2. Surat Keterangan Domisili - Residence Certificate

**Columns:**

- Nama Warga (Resident Name)
- Alamat Domisili (Residence Address)
- Lama Tinggal (Length of Stay)
- RT/RW (Neighborhood/Community Unit)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "DOM001",
    "nama_warga": "Siti Aminah",
    "alamat_domisili": "Jl. Merdeka No. 10",
    "lama_tinggal": "Sejak 2020",
    "rt_rw": "RT 03 / RW 04",
    "status": "Verifikasi",
    "tanggal_pengajuan": "2025-07-16"
}
```

#### 3. Surat Izin Tinggal Pendatang - Newcomer Residence Permit

**Columns:**

- Nama Pendatang (Newcomer Name)
- Alamat Asal (Origin Address)
- Tujuan Pindah (Moving Purpose)
- RT/RW Tujuan (Target Neighborhood/Community Unit)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "PND001",
    "nama_pendatang": "Rizky Hidayat",
    "alamat_asal": "Kab. Sumedang",
    "tujuan_pindah": "Bekerja",
    "rt_rw_tujuan": "RT 05 / RW 01",
    "status": "Disetujui",
    "tanggal_pengajuan": "2025-07-14"
}
```

#### 4. Surat Izin Keluar Negeri (Informal) - Informal Travel Abroad Permit

**Columns:**

- Nama Pemohon (Applicant Name)
- Tujuan Keberangkatan (Departure Purpose)
- Negara Tujuan (Destination Country)
- Periode / Waktu (Period / Time)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "LN001",
    "nama_pemohon": "Lutfi Maulana",
    "tujuan_keberangkatan": "Studi",
    "negara_tujuan": "Australia",
    "periode": "Agustus 2025",
    "status": "Ditolak",
    "tanggal_pengajuan": "2025-07-13"
}
```

#### 5. Surat Keterangan Tidak Bekerja - Unemployment Certificate

**Columns:**

- Nama Pemohon (Applicant Name)
- Alasan Tidak Bekerja (Reason for Unemployment)
- Tujuan Surat (Letter Purpose)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "TBK001",
    "nama_pemohon": "Dewi Sartika",
    "alasan_tidak_bekerja": "Pengangguran",
    "tujuan_surat": "Pengajuan KIS",
    "status": "Verifikasi",
    "tanggal_pengajuan": "2025-07-14"
}
```

## Actions Available

### 🔍 Detail (View)

- **Modal Dialog** with comprehensive permit information
- **Formatted Date Display** with Indonesian locale
- **Status Badges** with color coding
- **Responsive Layout** with grid system
- **Print Functionality** for official documents

### ✏️ Edit (Edit)

- **Modal Form** for editing permit details
- **Form Validation** with error handling
- **Field-specific validation** for each permit type
- **Loading states** during submission
- **Status management** with dropdown selection

### 🗑️ Hapus (Delete)

- **Confirmation Dialog** for safety
- **Type-specific messages** for better UX
- **Loading states** during deletion
- **State management** for immediate UI updates

## Status Configuration

All five permit types use standardized status values:

- **Draft** (Draft) - Gray badge
- **Verifikasi** (Verification) - Yellow badge
- **Disetujui** (Approved) - Green badge
- **Ditolak** (Rejected) - Red badge

## Technical Implementation

### 🛠️ Technologies Used

- **React** with TypeScript
- **Inertia.js** for SPA functionality
- **Tailwind CSS** for styling
- **Shadcn/UI** for component library
- **Tanstack Table** for data table functionality
- **Laravel** backend (PHP)

### 📁 File Structure

```
resources/js/
├── components/
│   ├── columns/
│   │   ├── pengantar-skck-columns.tsx
│   │   ├── keterangan-domisili-columns.tsx
│   │   ├── izin-tinggal-pendatang-columns.tsx
│   │   ├── izin-keluar-negeri-columns.tsx
│   │   └── keterangan-tidak-bekerja-columns.tsx
│   ├── personal-permit-table.tsx
│   ├── personal-permit-detail-modal.tsx
│   ├── personal-permit-edit-modal.tsx
│   └── status-badge.tsx (updated)
├── data/
│   └── personal-permits.ts
└── pages/
    └── perizinan-pribadi/
        └── index.tsx
```

### 🎨 UI Components Used

- **Card, CardContent, CardHeader, CardTitle** - Layout containers
- **Badge** - Status indicators
- **Tabs, TabsContent, TabsList, TabsTrigger** - Navigation tabs
- **Dialog, DialogContent, DialogHeader** - Modal dialogs
- **Button** - Interactive elements
- **Input, Label, Select** - Form controls
- **DataTable** - Table component with sorting/filtering

### 🔗 Routing

- **Route:** `/perizinan-pribadi`
- **Name:** `perizinan-pribadi.index`
- **Authentication:** Required (auth, verified middleware)

## Installation

1. Files are already created in the project structure
2. Route is registered in `routes/web.php`
3. Components are ready to use
4. Navigate to `/perizinan-pribadi` to access the dashboard

## Usage

1. **Access Dashboard:** Navigate to `/perizinan-pribadi`
2. **Switch Between Permits:** Use the tabs at the top (SKCK, DOMISILI, PENDATANG, LUAR NEGERI, TIDAK BEKERJA)
3. **Search:** Use the global search bar for each permit type
4. **Filter:** Use status filters in the table
5. **View Details:** Click the actions menu and select "Detail"
6. **Edit/Delete:** Use the respective actions with full validation

The system is fully responsive and follows the existing design patterns from the business, event, and building permit systems, ensuring consistency across the application.

## Future Enhancements

1. **Form Validation** for create/edit operations
2. **File Upload** for supporting documents
3. **Email Notifications** for status changes
4. **PDF Generation** for official permits
5. **Advanced Filtering** by date ranges
6. **Export Functionality** (Excel, PDF)
7. **Audit Trail** for tracking changes
8. **Bulk Operations** for multiple permits
9. **Integration with Government APIs** for SKCK and other official processes
10. **Digital Signature** support for approved documents
