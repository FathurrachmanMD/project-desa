<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\FormatSuratController;

// todo: put a middleware here

Route::get('dashboard', [DashboardController::class, 'index']);

Route::get('/surat/form/{id}', [SuratController::class, 'show']); // get specific surat
Route::put('/surat/status/{id}', [SuratController::class, 'updateStatus']);
Route::delete('/surat/form/{id}', [SuratController::class, 'destroy']);

Route::get('/surat/{slug}', [SuratController::class, 'index']); // prob need to change these
Route::post('/surat/{slug}', [SuratController::class, 'store']);
// Route::put('/surat/{id}', [SuratController::class, 'update']); old, please update
// Route::delete('/surat/{id}', [SuratController::class, 'destroy']);

Route::get('/penduduk', [PendudukController::class, 'index']);
Route::get('/penduduk/{id}', [PendudukController::class, 'show']);
Route::post('/penduduk', [PendudukController::class, 'store']);
Route::put('/penduduk/form/{id?}', [PendudukController::class, 'update']);
Route::delete('/penduduk/{id}', [PendudukController::class, 'destroy']);

// not here

Route::get('/format-surat/{kategori}', [FormatSuratController::class, 'index']);
Route::get('/format-surat/form/{slug}', [FormatSuratController::class, 'show']);