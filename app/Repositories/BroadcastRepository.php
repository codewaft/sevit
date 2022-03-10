<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function getPagination()
    {
        return Broadcast::latest()->paginate();
    }
}
