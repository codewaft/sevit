<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepository
{
    public function getOne($id)
    {
        return Contact::with("groups")->findOrFail($id);
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
