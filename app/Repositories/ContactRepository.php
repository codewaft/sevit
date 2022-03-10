<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepository
{
    public function createOne($data, $groupData)
    {
        $contact = Contact::create($data);
        $contact->groups()->createMany($groupData);
        return Contact::with("groups")->findOrFail($contact->id);
    }

    public function getOne($id)
    {
        return Contact::with("groups")->findOrFail($id);
    }

    public function deleteOne($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return $contact;
    }

    public function getAll()
    {
        return Contact::latest()->get();
    }

    public function getPagination()
    {
        return Contact::with("groups")
            ->latest()
            ->paginate();
    }
}
