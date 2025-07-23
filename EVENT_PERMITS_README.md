# Event Permit Management System

## Overview

This is a comprehensive event permit management system for the Perizinan Acara (Event Permits) dashboard. The system allows admin users to manage three types of event permits with full CRUD operations and a modern UI interface.

## Features

### 🏛️ Dashboard Admin - Perizinan Acara

- **Interactive DataTables** for 3 types of event permits
- **Global Search** functionality
- **Pagination** with customizable page sizes
- **Status Filtering** (Diproses, Disetujui, Ditolak)
- **Statistics Cards** showing permit counts by status
- **Responsive Design** with mobile-friendly layout

### 📋 Three Types of Event Permits

#### 1. Surat Izin Hajatan (Family Event Permit)

**Columns:**

- Nama Pemohon (Applicant Name)
- Jenis Acara (Event Type)
- Tanggal Acara (Event Date)
- Lokasi Acara (Event Location)
- Dampak Keramaian (Crowd Impact: Ya/Tidak)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "HAJ001",
    "nama_pemohon": "Ahmad Fauzi",
    "jenis_acara": "Pernikahan",
    "tanggal_acara": "2025-08-01",
    "lokasi_acara": "Jl. Anggrek No. 7, Cileunyi",
    "dampak_keramaian": "Ya",
    "status": "Diproses",
    "tanggal_pengajuan": "2025-07-15"
}
```

#### 2. Surat Izin Acara Publik (Public Event Permit)

**Columns:**

- Nama Penyelenggara (Organizer Name)
- Nama Acara (Event Name)
- Tanggal & Waktu Acara (Event Date & Time)
- Lokasi Acara (Event Location)
- Rekomendasi Keamanan (Security Recommendation: Sudah/Belum)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "PUB001",
    "nama_penyelenggara": "Panitia Pensi SMAN 1",
    "nama_acara": "Pensi Festival 2025",
    "tanggal_waktu_acara": "2025-09-10 17:00 - 21:00",
    "lokasi_acara": "Lapangan Desa Sukamaju",
    "rekomendasi_keamanan": "Sudah",
    "status": "Disetujui",
    "tanggal_pengajuan": "2025-07-08"
}
```

#### 3. Izin Penggunaan Sarana Umum Desa (Village Public Facility Usage Permit)

**Columns:**

- Nama Pemohon (Applicant Name)
- Jenis Fasilitas (Facility Type)
- Tanggal Penggunaan (Usage Date)
- Keperluan (Purpose)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "SAR001",
    "nama_pemohon": "Lembaga Karang Taruna",
    "jenis_fasilitas": "Balai Desa",
    "tanggal_penggunaan": "2025-07-25",
    "keperluan": "Pelatihan Kewirausahaan",
    "status": "Ditolak",
    "tanggal_pengajuan": "2025-07-10"
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

- Currently logs to console (ready for implementation)
- Modal form for editing permit details
- Validation and error handling

### 🗑️ Hapus (Delete)

- Currently logs to console (ready for implementation)
- Confirmation dialog for safety
- Soft delete functionality

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
│   │   ├── hajatan-columns.tsx
│   │   ├── acara-publik-columns.tsx
│   │   └── sarana-umum-columns.tsx
│   ├── event-permit-table.tsx
│   ├── event-permit-detail-modal.tsx
│   └── status-badge.tsx
├── data/
│   └── event-permits.ts
└── pages/
    └── perizinan-acara/
        └── index.tsx
```

### 🎨 UI Components Used

- **Card, CardContent, CardHeader, CardTitle** - Layout containers
- **Badge** - Status indicators
- **Tabs, TabsContent, TabsList, TabsTrigger** - Navigation tabs
- **Dialog, DialogContent, DialogHeader** - Modal dialogs
- **Button** - Interactive elements
- **Input** - Form controls
- **DataTable** - Table component with sorting/filtering

### 🔗 Routing

- **Route:** `/perizinan-acara`
- **Name:** `perizinan-acara.index`
- **Authentication:** Required (auth, verified middleware)

## Status Configuration

All three permit types use standardized status values:

- **Diproses** (Processing) - Yellow badge
- **Disetujui** (Approved) - Green badge
- **Ditolak** (Rejected) - Red badge

## Future Enhancements

1. **Form Validation** for create/edit operations
2. **File Upload** for supporting documents
3. **Email Notifications** for status changes
4. **PDF Generation** for official permits
5. **Advanced Filtering** by date ranges
6. **Export Functionality** (Excel, PDF)
7. **Audit Trail** for tracking changes
8. **Bulk Operations** for multiple permits

## Installation

1. Files are already created in the project structure
2. Route is registered in `routes/web.php`
3. Components are ready to use
4. Navigate to `/perizinan-acara` to access the dashboard

## Usage

1. **Access Dashboard:** Navigate to `/perizinan-acara`
2. **Switch Between Permits:** Use the tabs at the top
3. **Search:** Use the global search bar
4. **Filter:** Use status filters in the table
5. **View Details:** Click the actions menu and select "Detail"
6. **Edit/Delete:** Use the respective actions (implementation pending)

The system is fully responsive and follows the existing design patterns from the business permit system, ensuring consistency across the application.
