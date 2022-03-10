<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TemplateController;

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
        Route::post("/", [ContactController::class, "create"]);
        Route::get("/{id}", [ContactController::class, "read"]);
        Route::patch("/{id}", [ContactController::class, "edit"]);
        Route::delete("/{id}", [ContactController::class, "delete"]);
        Route::get("/", [ContactController::class, "list"]);
        Route::get("/paginate", [ContactController::class, "paginate"]);
    });
    Route::prefix("/templates")->group(function () {
        Route::get("/", [TemplateController::class, "list"]);
    });
});
