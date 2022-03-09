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

    public function getOne($id)
    {
        return Group::findOrFail($id);
    }

    public function deleteOne($id)
    {
        $group = Group::findOrFail($id);
        $group = $group->delete();
        return $group;
    }
}
