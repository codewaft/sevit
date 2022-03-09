<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ContactController;

Route::get("/sign-in", [UserController::class, "signIn"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::prefix("/groups")->group(function () {
        Route::post("/", [GroupController::class, "create"]);
        Route::get("/{id}", [GroupController::class, "read"]);
        Route::patch("/{id}", [GroupController::class, "edit"]);
        Route::delete("/{id}", [GroupController::class, "delete"]);
        Route::get("/", [GroupController::class, "list"]);
        Route::get("/paginate", [GroupController::class, "paginate"]);
    });
    Route::prefix("/contacts")->group(function () {
        Route::get("/", [ContactController::class, "list"]);
    });
});
