<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;

class Validation
{
    public static function validate($request, $rule)
    {
        $validator = Validator::make($request->all(), $rule);
        if ($validator->fails()) {
            $messages = collect($validator->errors()->all());
            return $messages->first();
        }
        return null;
    }
}
