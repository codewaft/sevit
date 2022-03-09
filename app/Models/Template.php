<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = ["title", "content"];

    public function broadcasts()
    {
        return $this->hasMany(Broadcast::class);
    }
}
