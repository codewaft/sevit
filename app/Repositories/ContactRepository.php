<?php

namespace App\Repositories;

use App\Models\Contact;

class ContactRepository
{
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
