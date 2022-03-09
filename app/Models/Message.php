<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public static $status = ["scheduled", "processed", "failed"];

    protected $fillable = ["reference_id", "status", "processed_at"];
    public $timestamps = false;

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function broadcast()
    {
        return $this->belongsTo(Broadcast::class);
    }
}
