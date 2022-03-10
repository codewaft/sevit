<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Utils\Str;

class Contact extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ["phone"];
    protected $with = ["groups"];

    protected function phone()
    {
        $removeWhitespaces = fn($phone) => Str::removeWhitespaces($phone);
        return Attribute::make(set: $removeWhitespaces);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
