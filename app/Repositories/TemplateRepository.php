<?php

namespace App\Repositories;

use App\Models\Template;

class TemplateRepository
{
    public function createOne($data)
    {
        return Template::create($data);
    }

    public function getOne($id)
    {
        return Template::findOrFail($id);
    }

    public function deleteOne($id)
    {
        $group = Template::findOrFail($id);
        $group->delete();
        return $group;
    }

    public function getAll()
    {
        return Template::latest()->get();
    }

    public function getPagination()
    {
        return Template::latest()->paginate();
    }
}
