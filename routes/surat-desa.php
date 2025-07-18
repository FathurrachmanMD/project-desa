<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PengajuanSuratController;
use App\Http\Controllers\KategoriSuratController;
use App\Http\Controllers\JenisSuratController;
use App\Http\Controllers\PemohonController;
use App\Http\Controllers\SuratHasilController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SuratController;

/*
|--------------------------------------------------------------------------
| Web Routes - Sistem Admin Surat Desa
|--------------------------------------------------------------------------
|
| Route untuk aplikasi admin surat desa
| Semua route memerlukan autentikasi
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/surat', [SuratController::class, 'show']);
    Route::post('/surat', [SuratController::class, 'store']);
    Route::put('/surat/{id}', [SuratController::class, 'update']);
    Route::delete('/surat/{id}', [SuratController::class, 'destroy']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/search', [DashboardController::class, 'search'])->name('search');
    Route::get('/notifications', [DashboardController::class, 'getNotifications'])->name('notifications');

    // Pengajuan Surat
    Route::resource('pengajuan', PengajuanSuratController::class);
    Route::patch('pengajuan/{pengajuan}/verifikasi', [PengajuanSuratController::class, 'verifikasi'])->name('pengajuan.verifikasi');
    Route::get('pengajuan/{pengajuan}/cetak', [PengajuanSuratController::class, 'cetak'])->name('pengajuan.cetak');
    Route::get('pengajuan/{pengajuan}/download', [PengajuanSuratController::class, 'download'])->name('pengajuan.download');

    // Kategori Surat
    Route::resource('kategori-surat', KategoriSuratController::class);
    Route::patch('kategori-surat/{kategori}/toggle-status', [KategoriSuratController::class, 'toggleStatus'])->name('kategori-surat.toggle-status');

    // Jenis Surat
    Route::resource('jenis-surat', JenisSuratController::class);
    Route::patch('jenis-surat/{jenis}/toggle-status', [JenisSuratController::class, 'toggleStatus'])->name('jenis-surat.toggle-status');
    Route::post('jenis-surat/{jenis}/duplicate', [JenisSuratController::class, 'duplicate'])->name('jenis-surat.duplicate');

    // Template Surat
    Route::prefix('template-surat')->name('template-surat.')->group(function () {
        Route::get('/', [JenisSuratController::class, 'templates'])->name('index');
        Route::get('/{jenis}/edit', [JenisSuratController::class, 'editTemplate'])->name('edit');
        Route::put('/{jenis}', [JenisSuratController::class, 'updateTemplate'])->name('update');
        Route::get('/{jenis}/preview', [JenisSuratController::class, 'previewTemplate'])->name('preview');
    });

    // Pemohon
    Route::resource('pemohon', PemohonController::class);
    Route::patch('pemohon/{pemohon}/toggle-status', [PemohonController::class, 'toggleStatus'])->name('pemohon.toggle-status');
    Route::get('pemohon/{pemohon}/pengajuan', [PemohonController::class, 'pengajuan'])->name('pemohon.pengajuan');
    Route::post('pemohon/import', [PemohonController::class, 'import'])->name('pemohon.import');
    Route::get('pemohon/export', [PemohonController::class, 'export'])->name('pemohon.export');

    // Surat Hasil
    Route::prefix('surat-hasil')->name('surat-hasil.')->group(function () {
        Route::get('/', [SuratHasilController::class, 'index'])->name('index');
        Route::get('/{surat}', [SuratHasilController::class, 'show'])->name('show');
        Route::get('/{surat}/cetak', [SuratHasilController::class, 'cetak'])->name('cetak');
        Route::get('/{surat}/download', [SuratHasilController::class, 'download'])->name('download');
        Route::patch('/{surat}/toggle-status', [SuratHasilController::class, 'toggleStatus'])->name('toggle-status');
        Route::post('/{surat}/regenerate', [SuratHasilController::class, 'regenerate'])->name('regenerate');
    });

    // Laporan
    Route::prefix('laporan')->name('laporan.')->group(function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('/statistik', [LaporanController::class, 'statistik'])->name('statistik');
        Route::get('/bulanan', [LaporanController::class, 'bulanan'])->name('bulanan');
        Route::get('/tahunan', [LaporanController::class, 'tahunan'])->name('tahunan');
        Route::get('/custom', [LaporanController::class, 'custom'])->name('custom');
        Route::post('/export', [LaporanController::class, 'export'])->name('export');
    });

    // Pengaturan
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [SettingsController::class, 'index'])->name('index');
        Route::get('/sistem', [SettingsController::class, 'sistem'])->name('sistem');
        Route::put('/sistem', [SettingsController::class, 'updateSistem'])->name('sistem.update');
        
        // Manajemen User
        Route::get('/users', [SettingsController::class, 'users'])->name('users');
        Route::post('/users', [SettingsController::class, 'storeUser'])->name('users.store');
        Route::put('/users/{user}', [SettingsController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [SettingsController::class, 'deleteUser'])->name('users.delete');
        Route::patch('/users/{user}/toggle-status', [SettingsController::class, 'toggleUserStatus'])->name('users.toggle-status');
        Route::post('/users/{user}/reset-password', [SettingsController::class, 'resetPassword'])->name('users.reset-password');
        
        // Log Aktivitas
        Route::get('/logs', [SettingsController::class, 'logs'])->name('logs');
        Route::delete('/logs/clear', [SettingsController::class, 'clearLogs'])->name('logs.clear');
        
        // Backup & Restore
        Route::get('/backup', [SettingsController::class, 'backup'])->name('backup');
        Route::post('/backup/create', [SettingsController::class, 'createBackup'])->name('backup.create');
        Route::post('/backup/restore', [SettingsController::class, 'restoreBackup'])->name('backup.restore');
        Route::delete('/backup/{file}', [SettingsController::class, 'deleteBackup'])->name('backup.delete');
    });

    // API Routes untuk komponen yang memerlukan data dinamis
    Route::prefix('api')->name('api.')->group(function () {
        Route::get('/jenis-surat/{kategori}', [JenisSuratController::class, 'getByKategori'])->name('jenis-surat.by-kategori');
        Route::get('/pemohon/search', [PemohonController::class, 'search'])->name('pemohon.search');
        Route::get('/pengajuan/stats', [PengajuanSuratController::class, 'stats'])->name('pengajuan.stats');
        Route::get('/dashboard/stats', [DashboardController::class, 'stats'])->name('dashboard.stats');
        Route::get('/dashboard/notifications', [DashboardController::class, 'getNotifications'])->name('dashboard.notifications');
    });

    // Routes khusus untuk quick actions
    Route::prefix('quick')->name('quick.')->group(function () {
        Route::post('/pengajuan/approve/{pengajuan}', [PengajuanSuratController::class, 'quickApprove'])->name('pengajuan.approve');
        Route::post('/pengajuan/reject/{pengajuan}', [PengajuanSuratController::class, 'quickReject'])->name('pengajuan.reject');
        Route::post('/pengajuan/priority/{pengajuan}', [PengajuanSuratController::class, 'setPriority'])->name('pengajuan.priority');
        Route::get('/search/global', [DashboardController::class, 'globalSearch'])->name('search.global');
    });
});

/*
|--------------------------------------------------------------------------
| Public Routes - Verifikasi Surat
|--------------------------------------------------------------------------
|
| Route publik untuk verifikasi surat oleh masyarakat
|
*/

Route::prefix('verifikasi')->name('verifikasi.')->group(function () {
    Route::get('/', [SuratHasilController::class, 'verifikasi'])->name('index');
    Route::post('/', [SuratHasilController::class, 'cekVerifikasi'])->name('cek');
    Route::get('/{nomor_surat}', [SuratHasilController::class, 'showVerifikasi'])->name('show');
});

/*
|--------------------------------------------------------------------------
| Routes untuk Testing & Development
|--------------------------------------------------------------------------
|
| Route ini hanya untuk development dan testing
| Hapus pada production
|
*/

if (app()->environment('local')) {
    Route::prefix('dev')->name('dev.')->group(function () {
        Route::get('/seed-data', function () {
            // Seed data untuk testing
            Artisan::call('db:seed', ['--class' => 'SuratDesaSeeder']);
            return response()->json(['message' => 'Data seeded successfully']);
        });
        
        Route::get('/clear-cache', function () {
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');
            return response()->json(['message' => 'Cache cleared successfully']);
        });
    });
}
