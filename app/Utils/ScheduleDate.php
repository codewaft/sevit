<?php

namespace App\Utils;

use Carbon\Carbon;

class ScheduleDate
{
    protected static $format = "Y-m-d H:i";

    public static function now()
    {
        return now()->format(self::$format);
    }

    public static function parse($date)
    {
        return Carbon::parse($date)->format(self::$format);
    }
}
