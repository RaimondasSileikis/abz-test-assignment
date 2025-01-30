<?php

use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/token', [UserController::class, 'getToken']);

});
