<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function getOne($id)
    {
        return Broadcast::findOrFail($id);
    }

    public function getPagination()
    {
        return Broadcast::latest()->paginate();
    }
}
