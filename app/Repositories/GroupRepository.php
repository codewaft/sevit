<?php

namespace App\Repositories;

use App\Models\Group;

class GroupRepository
{
    public function createOne($data)
    {
        return Group::create($data);
    }

    public function getOne($id)
    {
        return Group::findOrFail($id);
    }

    public function editOne($id, $data)
    {
        $group = Group::findOrFail($id);
        $group->update($data);
        return $group;
    }

    public function deleteOne($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();
        return $group;
    }

    public function getAll()
    {
        return Group::latest()->get();
    }

    public function getPagination()
    {
        return Group::latest()->paginate();
    }
}
