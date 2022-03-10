<?php

namespace App\Repositories;

use App\Models\Contact;
use App\Models\Group;

class ContactRepository
{
    public function createOne($data, $groupTitles)
    {
        $contact = Contact::create($data);
        collect($groupTitles)->each(function ($title) use ($contact) {
            $groupData = ["title" => $title];
            $group = Group::firstOrCreate($groupData);
            $group->contacts()->attach($contact);
        });
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
