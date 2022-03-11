<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function createOne($data, $groupIds)
    {
        $broadcast = Broadcast::create($data);
        $broadcast->groups()->sync($groupIds);
        return Broadcast::findOrFail($broadcast->id);
    }

    public function getOne($id)
    {
        return Broadcast::findOrFail($id);
    }

    public function deleteOne($id)
    {
        $broadcast = Broadcast::findOrFail($id);
        $broadcast->delete();
        return $broadcast;
    }

    public function getPagination()
    {
        return Broadcast::latest()->paginate();
    }
}
