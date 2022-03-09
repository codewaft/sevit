<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;

Route::get("/sign-in", [UserController::class, "signIn"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::prefix("/groups")->group(function () {
        Route::get("/", [GroupController::class, "list"]);
        Route::get("/paginate", [GroupController::class, "paginate"]);
    });
});
