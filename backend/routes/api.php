<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Todo\Http\Controllers\TodoController;
use Modules\User\Http\Controllers\UserController;

Route::prefix('auth')->group(function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('register', [UserController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(
    function () {
        Route::post('/logout', [UserController::class, 'logout']);
        Route::get('/user', [UserController::class, 'user']);
        Route::prefix('todos')->group(function () {
            Route::get('/', [TodoController::class, 'get']);
            Route::post('/', [TodoController::class, 'set']);
            Route::post('/share/{id}', [TodoController::class, 'shareTodo']);
            Route::get('/share/get', [TodoController::class, 'getSharedTodo']);
            Route::get('/{id}', [TodoController::class, 'single']);
            Route::put('/{id}', [TodoController::class, 'update']);
            Route::delete('/{id}', [TodoController::class, 'destroy']);
        });
    }
);
