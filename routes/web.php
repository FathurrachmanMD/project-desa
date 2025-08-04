<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/onboarding', function () {
    return Inertia::render('onboarding');
})->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Form Surat
    Route::get('form/create/{id}', function ($slug) {
        return Inertia::render('surat/form-create', [
            'slug' => $slug
        ]);
    });
    Route::get('surat/form/create/{slug}', function ($slug) {
        return Inertia::render('surat/form-create', [
            'slug' => $slug
        ]);
    })->name('surat.form.create');
    Route::get('form/view/{id}', function ($id) {
        return Inertia::render('surat/form-view', [
            'id' => $id
        ]);
    });

    Route::get('customers', function () {
        return Inertia::render('customers/index');
    })->name('customers.index');
    Route::get('customers/form/{id?}', function ($id = null) {
        return Inertia::render('customers/form', [
            'id' => $id
        ]);
    });
});

Route::get('perizinan-acara', function () {
    return Inertia::render('perizinan-acara/index');
})->name('perizinan-acara.index');

Route::get('perizinan-bangunan', function () {
    return Inertia::render('perizinan-bangunan/index');
})->name('perizinan-bangunan.index');

Route::get('perizinan-pertanian', function () {
    return Inertia::render('perizinan-pertanian/index');
})->name('perizinan-pertanian.index');

Route::get('perizinan-pribadi', function () {
    return Inertia::render('perizinan-pribadi/index');
})->name('perizinan-pribadi.index');

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

Route::get('/lapak-user', function () {
    return Inertia::render('lapak-user/index');
})->name('lapak-user');

Route::get('/lapak-user/{slug}', function ($slug) {
    return Inertia::render('lapak-user/detail', [
        'slug' => $slug
    ]);
})->name('lapak-user.detail');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
