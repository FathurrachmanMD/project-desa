<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('onboarding');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('perizinan', function () {
        return Inertia::render('perizinan/index');
    })->name('perizinan.index');
    
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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
