<?php

namespace App\Utils;

class Response
{
    protected static function response($data, $code)
    {
        return response()->json($data, $code);
    }

    public static function ok($data)
    {
        return self::response($data, 200);
    }

    public static function created($data)
    {
        return self::response($data, 201);
    }

    public static function badRequest($message)
    {
        return self::response(compact("message"), 400);
    }

    public static function unauthorized()
    {
        $message = "Please sign in";
        return self::response(compact("message"), 401);
    }

    public static function serverError()
    {
        $message = "Something went wrong";
        return self::response(compact("message"), 500);
    }
}
