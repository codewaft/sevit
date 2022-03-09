<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/sign-in", [UserController::class, "signIn"]);

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});
