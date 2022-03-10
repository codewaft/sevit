<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Broadcast extends Model
{
    use HasFactory, SoftDeletes;

    public static $status = ["scheduled", "processing", "completed"];

    protected $fillable = ["template_id", "title", "status", "scheduled_at"];
    protected $with = ["template", "groups"];
    protected $casts = ["scheduled_at" => "datetime"];

    protected function scheduled_at()
    {
        return Attribute::make(set: fn($value) => strtotime($value));
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
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
