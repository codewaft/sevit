<?php

namespace App\Repositories;

use App\Models\Broadcast;
use App\Models\Contact;
use App\Utils\ScheduleDate;

class BroadcastRepository
{
    protected function getContactsFromBroadcast($broadcast)
    {
        return $broadcast->groups()->exists()
            ? $broadcast
                ->groups()
                ->with("contacts")
                ->get()
                ->pluck("contacts")
                ->flatten()
                ->unique("id")
            : Contact::all();
    }

    public function createOne($data, $groupIds = [])
    {
        $broadcast = Broadcast::create($data);
        $broadcast->groups()->sync($groupIds);
        $contacts = $this->getContactsFromBroadcast($broadcast);
        $messageBuilder = fn($contact) => ["contact_id" => $contact->id];
        $messages = $contacts->map($messageBuilder);
        $broadcast->messages()->createMany($messages);
        return $broadcast->fresh();
    }

    public function getOne($id)
    {
        return Broadcast::findOrFail($id);
    }

    public function editOne($id, $data, $groupIds = [])
    {
        $broadcast = Broadcast::findOrFail($id);
        $broadcast->update($data);
        $broadcast->groups()->sync($groupIds);
        $contacts = $this->getContactsFromBroadcast($broadcast);
        $messageBuilder = fn($contact) => ["contact_id" => $contact->id];
        $messages = $contacts->map($messageBuilder);
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

    public function getAllReadyToProcess()
    {
        return Broadcast::where(
            "scheduled_at",
            "=",
            ScheduleDate::now()
        )->get();
    }
}
