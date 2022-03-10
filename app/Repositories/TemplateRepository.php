<?php

namespace App\Repositories;

use App\Models\Template;

class TemplateRepository
{
    public function getOne($id)
    {
        return Template::findOrFail($id);
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
