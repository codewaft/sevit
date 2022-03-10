<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function getOne($id)
    {
        return Broadcast::with(["template", "groups"])->findOrFail($id);
    }

    public function getPagination()
    {
        return Broadcast::with(["template", "groups"])
            ->latest()
            ->paginate();
    }
}
