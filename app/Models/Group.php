<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = ["title"];

    public function contacts()
    {
        return $this->belongsToMany(Contact::class);
    }

    public function broadcasts()
    {
        return $this->belongsToMany(Broadcast::class);
    }
}
