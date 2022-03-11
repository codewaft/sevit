<?php

namespace App\Repositories;

use App\Models\Broadcast;

class BroadcastRepository
{
    protected function getContactIdsFromBroadcast($broadcast)
    {
        return $broadcast
            ->groups()
            ->with("contacts")
            ->get()
            ->pluck("contacts")
            ->flatten()
            ->pluck("id")
            ->unique();
    }

    public function createOne($data, $groupIds)
    {
        $broadcast = Broadcast::create($data);
        $broadcast->groups()->sync($groupIds);
        $contactIds = $this->getContactIdsFromBroadcast($broadcast);
        $messageBuilder = fn($contact_id) => compact("contact_id");
        $messages = $contactIds->map($messageBuilder);
        $broadcast->messages()->createMany($messages);
        return $broadcast->fresh();
    }

    public function getOne($id)
    {
        return Broadcast::findOrFail($id);
    }

    public function editOne($id, $data, $groupIds)
    {
        $broadcast = Broadcast::findOrFail($id);
        $broadcast->groups()->sync($groupIds);
        $contactIds = $this->getContactIdsFromBroadcast($broadcast);
        $messageBuilder = fn($contact_id) => compact("contact_id");
        $messages = $contactIds->map($messageBuilder);
        $broadcast->messages()->delete();
        $broadcast->messages()->createMany($messages);
        return $broadcast->fresh();
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

    public function getMessagePagination($id)
    {
        $broadcast = Broadcast::findOrFail($id);
        return $broadcast->messages()->paginate();
    }
}
