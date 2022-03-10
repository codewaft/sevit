<?php

namespace App\Utils;

class Str
{
    public static function removeWhitespaces($string)
    {
        return str_replace(" ", "", $string);
    }
}
