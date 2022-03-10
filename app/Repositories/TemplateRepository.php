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

    public function editOne($id, $data)
    {
        $template = Template::findOrFail($id);
        $template->update($data);
        return $template;
    }

    public function deleteOne($id)
    {
        $template = Template::findOrFail($id);
        $template->delete();
        return $template;
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
