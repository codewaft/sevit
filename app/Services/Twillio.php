<?php

namespace App\Services;

use Throwable;
use Twilio\Rest\Client;

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
            return "Invalid phone number ${phone}";
        }
    }
}
