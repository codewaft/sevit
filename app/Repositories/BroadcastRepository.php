<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    public function createOne($data, $groupIds)
    {
        $broadcast = Broadcast::create($data);
        $broadcast->groups()->sync($groupIds);
        $contactIds = $broadcast
            ->groups()
            ->with("contacts")
            ->get()
            ->pluck("contacts")
            ->flatten()
            ->pluck("id")
            ->unique();
        $messageBuilder = fn($contactId) => ["contact_id" => $contactId];
        $messages = $contactIds->map($messageBuilder);
        $broadcast->messages()->createMany($messages);
        return $broadcast->fresh();
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
