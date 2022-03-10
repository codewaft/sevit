<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Repositories\TemplateRepository;

class TemplateController extends Controller
{
    protected $template;

    public function __construct(TemplateRepository $template)
    {
        $this->template = $template;
    }

    public function read($id)
    {
        $template = $this->template->getOne($id);
        return Response::ok($template);
    }

    public function list()
    {
        $templates = $this->template->getAll();
        return Response::ok($templates);
    }

    public function paginate()
    {
        $pagination = $this->template->getPagination();
        return Response::ok($pagination);
    }
}
