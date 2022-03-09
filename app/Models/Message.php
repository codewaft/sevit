<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ["reference_id", "status", "processed_at"];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function broadcasts()
    {
        return $this->belongsToMany(Broadcast::class);
    }
}
