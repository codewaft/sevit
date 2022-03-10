<?php

namespace App\Repositories;

use App\Models\Template;

class TemplateRepository
{
    public function getAll()
    {
        return Template::latest()->get();
    }

    public function getPagination()
    {
        return Template::latest()->paginate();
    }
}
