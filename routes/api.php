<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\FormatSuratController;
use App\Http\Controllers\LapakController;
use App\Http\Controllers\ProdukController;

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

Route::get('/lapak', [LapakController::class, 'index']);
Route::get('/lapak/{id}', [LapakController::class, 'show']);
Route::post('/lapak', [LapakController::class, 'store']);
Route::put('/lapak/{id?}', [LapakController::class, 'update']);
Route::delete('/lapak/{id}', [LapakController::class, 'destroy']);

// Routes khusus untuk user lapak (sementara tanpa auth untuk testing)
Route::get('/lapak-user', [LapakController::class, 'getUserLapak']);
Route::get('/lapak-user/products', [LapakController::class, 'getUserProducts']);
Route::get('/lapak-user/{slug}', [LapakController::class, 'getLapakDetail']);

// New LapakUser dedicated routes
Route::prefix('lapak-users')->group(function () {
    Route::get('/', [App\Http\Controllers\LapakUserController::class, 'index']);
    Route::get('/{slug}', [App\Http\Controllers\LapakUserController::class, 'show']);
    Route::post('/', [App\Http\Controllers\LapakUserController::class, 'store']);
    Route::put('/{lapakUser}', [App\Http\Controllers\LapakUserController::class, 'update']);
    Route::delete('/{lapakUser}', [App\Http\Controllers\LapakUserController::class, 'destroy']);
    Route::post('/from-surat/{surat}', [App\Http\Controllers\LapakUserController::class, 'createFromSurat']);
});

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{id}', [ProdukController::class, 'show']);
Route::post('/produk', [ProdukController::class, 'store']);
Route::put('/produk/{id?}', [ProdukController::class, 'update']);
Route::delete('/produk/{id}', [ProdukController::class, 'destroy']);

// not here

Route::get('/format-surat/{kategori}', [FormatSuratController::class, 'index']);
Route::get('/format-surat/form/{slug}', [FormatSuratController::class, 'show']);