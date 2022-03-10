<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function getOne($id)
    {
        return Broadcast::with(["template", "groups"])->findOrFail($id);
    }

    public function deleteOne($id)
    {
        $broadcast = Broadcast::with(["template", "groups"])->findOrFail($id);
        $broadcast->delete();
        return $broadcast;
    }

    public function getPagination()
    {
        return Broadcast::with(["template", "groups"])
            ->latest()
            ->paginate();
    }
}
