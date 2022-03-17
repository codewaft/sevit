<?php

namespace App\Services;

use Throwable;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Log;

class Twillio
{
    protected static function client()
    {
        $sid = env("TWILLIO_ACCOUNT_SID");
        $token = env("TWILLIO_AUTH_TOKEN");
        return new Client($sid, $token);
    }

    public static function validatePhone($phone)
    {
        try {
            self::client()
                ->lookups->v1->phoneNumbers($phone)
                ->fetch();
            return null;
        } catch (Throwable $e) {
            Log::warning($e);
            return "Invalid phone number ${phone}";
        }
    }

    public static function sendMessage($phone, $body)
    {
        try {
            $options = [
                "from" => env("TWILLIO_PHONE_NUMBER"),
                "body" => $body,
            ];
            $message = self::client()->messages->create($phone, $options);
            return [null, $message->sid];
        } catch (Throwable $e) {
            Log::warning($e);
            return ["Error messaging to ${phone}", null];
        }
    }
}
