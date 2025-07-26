<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\FormUsahaController;

Route::get('/surat/{slug}', [SuratController::class, 'index']);
Route::post('/surat/{slug}', [SuratController::class, 'store']);
Route::put('/surat/{id}', [SuratController::class, 'update']);
Route::delete('/surat/{id}', [SuratController::class, 'destroy']);

Route::get('/penduduk', [PendudukController::class, 'index']);
Route::post('/penduduk', [PendudukController::class, 'store']);
Route::put('/penduduk/{id}', [PendudukController::class, 'update']);
Route::delete('/penduduk/{id}', [PendudukController::class, 'destroy']);

Route::get('/form-usaha', [FormUsahaController::class, 'index']);
Route::get('/form-usaha/form/{slug}', [FormUsahaController::class, 'show']);