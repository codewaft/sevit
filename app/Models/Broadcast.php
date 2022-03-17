<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Utils\ScheduleDate;

class Broadcast extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ["template_id", "title", "scheduled_at"];
    protected $with = ["template", "groups"];
    protected $appends = ["status"];

    protected function scheduledAt(): Attribute
    {
        return Attribute::make(set: fn($value) => ScheduleDate::parse($value));
    }

    public function status(): Attribute
    {
        $existsMessages = fn($status) => $this->messages()
            ->whereStatus($status)
            ->exists();
        $attribute = fn($status) => new Attribute(get: fn() => $status);
        if ($existsMessages("processed") || $existsMessages("failed")) {
            if ($existsMessages("scheduled")) {
                return $attribute("processing");
            } else {
                return $attribute("completed");
            }
        } else {
            return $attribute("scheduled");
        }
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
