<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public static $status = ["scheduled", "processed", "failed"];

    protected $fillable = [
        "contact_id",
        "reference_id",
        "status",
        "processed_at",
    ];
    public $timestamps = false;

    protected function processed_at()
    {
        return Attribute::make(set: fn($value) => strtotime($value));
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function broadcast()
    {
        return $this->belongsTo(Broadcast::class);
    }
}
