<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuratController;


Route::get('/surat', [SuratController::class, 'show']);
Route::post('/surat', [SuratController::class, 'store']);
Route::put('/surat/{id}', [SuratController::class, 'update']);
Route::delete('/surat/{id}', [SuratController::class, 'destroy']);