<?php

namespace App\Repositories;

use App\Models\Group;

class GroupRepository
{
    public function getPaginate()
    {
        return Group::latest()->paginate();
    }
}
