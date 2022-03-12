<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class Validation
{
    public static function validate($data, $rule, $messages = [])
    {
        $data = $data instanceof Request ? $data->all() : $data;
        $validator = Validator::make($data, $rule, $messages);
        if ($validator->fails()) {
            $messages = collect($validator->errors()->all());
            return $messages->first();
        }
        return null;
    }
}
