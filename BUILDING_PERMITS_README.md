# Building Permit Management System

## Overview

This is a comprehensive building permit management system for the Perizinan Bangunan (Building Permits) dashboard. The system allows admin users to manage four types of building permits with full CRUD operations and a modern UI interface.

## Features

### 🏛️ Dashboard Admin - Perizinan Bangunan

- **Interactive DataTables** for 4 types of building permits
- **Global Search** functionality
- **Pagination** with customizable page sizes
- **Status Filtering** (Diproses, Disetujui, Ditolak)
- **Statistics Cards** showing permit counts by status
- **Responsive Design** with mobile-friendly layout

### 📋 Four Types of Building Permits

#### 1. Izin Mendirikan Bangunan (IMB/PBG) - Building Construction Permit

**Columns:**

- Nama Pemohon (Applicant Name)
- Alamat Bangunan (Building Address)
- Jenis Bangunan (Building Type)
- Status Tanah (Land Status)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "IMB001",
    "nama_pemohon": "Budi Santoso",
    "alamat_bangunan": "Jl. Mawar No. 4, Bandung",
    "jenis_bangunan": "Ruko",
    "status_tanah": "Milik sendiri",
    "status": "Diproses",
    "tanggal_pengajuan": "2025-07-15"
}
```

#### 2. Izin Bangun di Lahan Milik Desa - Village Land Building Permit

**Columns:**

- Nama Pemohon (Applicant Name)
- Nama Lahan / Titik Lokasi (Land Name / Location Point)
- Tujuan Pembangunan (Construction Purpose)
- Rekomendasi Kepala Desa (Village Head Recommendation: Ya/Tidak)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "LHN001",
    "nama_pemohon": "Lestari Wulandari",
    "nama_lahan": "Titik 3 - Tanah Desa Mekarjaya",
    "tujuan_pembangunan": "Posyandu",
    "rekomendasi_kades": "Ya",
    "status": "Disetujui",
    "tanggal_pengajuan": "2025-07-08"
}
```

#### 3. Surat Tidak Sengketa Tanah - Land Dispute-Free Certificate

**Columns:**

- Nama Pemilik Tanah (Land Owner Name)
- Lokasi Tanah (Land Location)
- Status Sengketa (Dispute Status: Tidak/Ya)
- Tujuan Penggunaan (Usage Purpose)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "TST001",
    "nama_pemilik_tanah": "Slamet Widodo",
    "lokasi_tanah": "Blok C No. 21, RT 04/RW 02",
    "status_sengketa": "Tidak",
    "tujuan_penggunaan": "Pembangunan rumah tinggal",
    "status": "Ditolak",
    "tanggal_pengajuan": "2025-07-10"
}
```

#### 4. Izin Renovasi atau Perluasan Bangunan - Building Renovation/Extension Permit

**Columns:**

- Nama Pemilik (Owner Name)
- Lokasi Bangunan (Building Location)
- Jenis Renovasi (Renovation Type)
- Status Tanah (Land Status)
- Status Pengajuan (Application Status)
- Aksi (Actions)

**Sample Data:**

```json
{
    "id": "RNV001",
    "nama_pemilik": "Rina Kusuma",
    "lokasi_bangunan": "Perum Griya Asri, Blok D2",
    "jenis_renovasi": "Perluasan",
    "status_tanah": "Sewa",
    "status": "Diproses",
    "tanggal_pengajuan": "2025-07-15"
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

### 🗑️ Hapus (Delete)

- **Confirmation Dialog** for safety
- **Type-specific messages** for better UX
- **Loading states** during deletion
- **State management** for immediate UI updates

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
│   │   ├── imb-columns.tsx
│   │   ├── lahan-desa-columns.tsx
│   │   ├── tidak-sengketa-columns.tsx
│   │   └── renovasi-columns.tsx
│   ├── building-permit-table.tsx
│   ├── building-permit-detail-modal.tsx
│   ├── building-permit-edit-modal.tsx
│   └── status-badge.tsx (updated)
├── data/
│   └── building-permits.ts
└── pages/
    └── perizinan-bangunan/
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

- **Route:** `/perizinan-bangunan`
- **Name:** `perizinan-bangunan.index`
- **Authentication:** Required (auth, verified middleware)

## Status Configuration

All four permit types use standardized status values:

- **Diproses** (Processing) - Yellow badge
- **Disetujui** (Approved) - Green badge
- **Ditolak** (Rejected) - Red badge

## Future Enhancements

1. **Form Validation** improvements for create/edit operations
2. **File Upload** for supporting documents (plans, photos, etc.)
3. **Email Notifications** for status changes
4. **PDF Generation** for official permits
5. **Advanced Filtering** by date ranges and permit types
6. **Export Functionality** (Excel, PDF)
7. **Audit Trail** for tracking changes
8. **Bulk Operations** for multiple permits
9. **Integration** with mapping services for location verification
10. **Workflow Management** for approval processes

## Installation

1. Files are already created in the project structure
2. Route should be registered in `routes/web.php`:
    ```php
    Route::get('/perizinan-bangunan', [BuildingPermitController::class, 'index'])
        ->middleware(['auth', 'verified'])
        ->name('perizinan-bangunan.index');
    ```
3. Components are ready to use
4. Navigate to `/perizinan-bangunan` to access the dashboard

## Usage

1. **Access Dashboard:** Navigate to `/perizinan-bangunan`
2. **Switch Between Permits:** Use the tabs at the top (IMB/PBG, LAHAN DESA, TIDAK SENGKETA, RENOVASI)
3. **Search:** Use the global search bar for each permit type
4. **Filter:** Use status filters in the table
5. **View Details:** Click the actions menu and select "Detail"
6. **Edit/Delete:** Use the respective actions with full validation

The system is fully responsive and follows the existing design patterns from the business and event permit systems, ensuring consistency across the application.

## Key Features

- **Complete CRUD Operations** for all permit types
- **Real-time Status Updates** with immediate UI feedback
- **Type-safe TypeScript** implementation
- **Consistent Design Language** across all permit systems
- **Mobile-responsive** interface
- **Accessibility** features with proper ARIA labels
- **Performance Optimized** with efficient state management

This building permit management system provides a comprehensive solution for managing all types of building-related permits in a village administration system.
