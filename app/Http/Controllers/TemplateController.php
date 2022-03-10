<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Services\Validation;
use App\Repositories\TemplateRepository;

class TemplateController extends Controller
{
    protected $template;

    public function __construct(TemplateRepository $template)
    {
        $this->template = $template;
    }

    public function create(Request $request)
    {
        $rule = [
            "title" => "required|string|max:255",
            "content" => "required|string|max:1600",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = [
            "title" => $request->title,
            "content" => $request->content,
        ];
        $template = $this->template->createOne($data);
        return Response::ok($template);
    }

    public function read($id)
    {
        $template = $this->template->getOne($id);
        return Response::ok($template);
    }

    public function delete($id)
    {
        $template = $this->template->deleteOne($id);
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
