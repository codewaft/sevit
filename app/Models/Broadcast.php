<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Broadcast extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ["template_id", "title", "scheduled_at"];
    protected $with = ["template", "groups"];
    protected $appends = ["status", "messagesCount", "completedMessagesCount"];
    protected $casts = ["scheduled_at" => "datetime"];

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

    public function getMessagesCountAttribute()
    {
        return $this->messages()->count();
    }

    public function getCompletedMessagesCountAttribute()
    {
        return $this->messages()
            ->whereIn("status", ["processed", "failed"])
            ->count();
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
