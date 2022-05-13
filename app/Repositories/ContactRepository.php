<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepository
{
    public function createOne($data, $groupIds)
    {
        $contact = Contact::create($data);
        $contact->groups()->sync($groupIds);
        return Contact::findOrFail($contact->id);
    }

    public function getOne($id)
    {
        return Contact::findOrFail($id);
    }

    public function editOne($id, $data, $groupIds)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($data);
        $contact->groups()->sync($groupIds);
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

    public function getExport()
    {
        $exportBuilder = fn($contact) => [
            "name" => $contact->name,
            "phone" => $contact->phone,
            "groups" => $contact->groups->pluck("title")->implode(","),
        ];
        return Contact::latest()
            ->get()
            ->map($exportBuilder);
    }
}
