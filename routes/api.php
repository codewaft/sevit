<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\BroadcastController;

Route::post("/users/sign-in", [UserController::class, "signIn"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::prefix("/users")->group(function () {
        Route::get("/", [UserController::class, "read"]);
        Route::get("/sign-out", [UserController::class, "signOut"]);
    });
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
        Route::get("/paginate", [ContactController::class, "paginate"]);
        Route::post("/import", [ContactController::class, "import"]);
        Route::get("/export", [ContactController::class, "export"]);
    });
    Route::prefix("/templates")->group(function () {
        Route::post("/", [TemplateController::class, "create"]);
        Route::get("/{id}", [TemplateController::class, "read"]);
        Route::patch("/{id}", [TemplateController::class, "edit"]);
        Route::delete("/{id}", [TemplateController::class, "delete"]);
        Route::get("/", [TemplateController::class, "list"]);
        Route::get("/paginate", [TemplateController::class, "paginate"]);
    });
    Route::prefix("/broadcasts")->group(function () {
        Route::post("/", [BroadcastController::class, "create"]);
        Route::get("/{id}", [BroadcastController::class, "read"]);
        Route::patch("/{id}", [BroadcastController::class, "edit"]);
        Route::delete("/{id}", [BroadcastController::class, "delete"]);
        Route::get("/paginate", [BroadcastController::class, "paginate"]);
        Route::get("/{id}/messages/paginate", [BroadcastController::class, "paginateMessages"]);
    });
});
