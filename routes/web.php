<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\LapakController;
use App\Http\Controllers\ProdukController;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/onboarding', function () {
    return Inertia::render('onboarding');
})->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('surat/form/create/{slug}', function ($slug) {
        return Inertia::render('surat/form-create', [
            'slug' => $slug
        ]);
    })->name('surat.form.create');

    Route::get('perizinan/{slug}', [SuratController::class, 'index'])->name('perizinan.show');
    Route::get('perizinan/{slug}/{id}/create', function ($slug, $id) {
        return Inertia::render('admin/perizinan/create', [
            'slug' => $slug,
            'id' => $id
        ]);
    });
    Route::get('perizinan/{slug}/{id}', [SuratController::class, 'show']);
    Route::put('perizinan/{slug}/{id}', [SuratController::class, 'update']);
    Route::delete('perizinan/{slug}/{id}', [SuratController::class, 'destroy'])->name('perizinan.destroy');

    Route::get('customers', function () {
        return Inertia::render('customers/index');
    })->name('customers.index');
    Route::get('customers/form/{id?}', function ($id = null) {
        return Inertia::render('customers/form', [
            'id' => $id
        ]);
    });
});


// Form Usaha Routes
Route::get('form-usaha', function () {
    return Inertia::render('forms/usaha');
})->name('form-usaha.index');
Route::get('form-usaha/form/{slug}', function (string $slug) {
    return Inertia::render('forms/form', [
        'slug' => $slug
    ]);
})->name('form-usaha.form');

// Form Pribadi Routes
Route::get('form-pribadi', function () {
    return Inertia::render('forms/pribadi');
})->name('form-pribadi.index');
Route::get('form-pribadi/form/{slug}', function (string $slug) {
    return Inertia::render('forms/form', [
        'slug' => $slug
    ]);
})->name('form-pribadi.form');

// Form Pertanian Routes
Route::get('form-pertanian', function () {
    return Inertia::render('forms/pertanian');
})->name('form-pertanian.index');
Route::get('form-pertanian/form/{slug}', function (string $slug) {
    return Inertia::render('forms/form', [
        'slug' => $slug
    ]);
})->name('form-pertanian.form');

// Form Acara Routes
Route::get('form-acara', function () {
    return Inertia::render('forms/acara');
})->name('form-acara.index');

Route::get('form-acara/form/{slug}', function (string $slug) {
    return Inertia::render('forms/form', [
        'slug' => $slug
    ]);
})->name('form-acara.form');

// Form Bangunan Routes
Route::get('form-bangunan', function () {
    return Inertia::render('forms/bangunan');
})->name('form-bangunan.index');

Route::get('form-bangunan/form/{slug}', function (string $slug) {
    return Inertia::render('forms/form', [
        'slug' => $slug
    ]);
})->name('form-bangunan.form');

Route::get('/lapak-usaha', function () {
    return Inertia::render('lapak-usaha/index');
})->name('lapak-usaha');

Route::get('/lapak', [LapakController::class, 'index'])->name('lapak-user');
Route::get('/lapak/{id}', [ProdukController::class, 'index'])->name('lapak-detail');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
