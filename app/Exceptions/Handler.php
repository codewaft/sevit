<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Services\Response;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];

    protected $dontFlash = [
        "current_password",
        "password",
        "password_confirmation",
    ];

    public function register()
    {
        $this->reportable(function (Throwable $e) {});

        $this->renderable(function (AuthenticationException $e, $request) {
            return Response::unauthorized();
        });
    }
}
