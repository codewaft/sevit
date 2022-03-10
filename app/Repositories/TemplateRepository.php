<?php

namespace App\Repositories;

use App\Models\Template;

class TemplateRepository
{
    public function getAll()
    {
        return Template::latest()->get();
    }
}
