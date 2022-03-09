<?php

namespace App\Repositories;

use App\Models\Group;

class GroupRepository
{
    public function getAll()
    {
        return Group::latest()->get();
    }

    public function getPagination()
    {
        return Group::latest()->paginate();
    }
}
