<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;

Route::get("/sign-in", [UserController::class, "signIn"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/groups/paginate", [GroupController::class, "paginate"]);
});
