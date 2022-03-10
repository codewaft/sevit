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
        return Contact::findOrFail($contact->id);
    }

    public function getOne($id)
    {
        return Contact::findOrFail($id);
    }

    public function editOne($id, $groupTitles)
    {
        $contact = Contact::findOrFail($id);
        $contact->groups()->detach();
        collect($groupTitles)->each(function ($title) use ($contact) {
            $groupData = ["title" => $title];
            $group = Group::firstOrCreate($groupData);
            $group->contacts()->attach($contact);
        });
        return Contact::findOrFail($contact->id);
    }

    public function deleteOne($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return $contact;
    }

    public function getPagination()
    {
        return Contact::latest()->paginate();
    }
}
