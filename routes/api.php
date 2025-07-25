<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuratController;

Route::get('/surat/{slug}', [SuratController::class, 'show']);
Route::post('/surat/{slug}', [SuratController::class, 'store']);
Route::put('/surat/{id}', [SuratController::class, 'update']);
Route::delete('/surat/{id}', [SuratController::class, 'destroy']);