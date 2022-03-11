<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Services\Validation;
use App\Repositories\BroadcastRepository;

class BroadcastController extends Controller
{
    protected $broadcast;

    public function __construct(BroadcastRepository $broadcast)
    {
        $this->broadcast = $broadcast;
    }

    public function create(Request $request)
    {
        $rule = [
            "title" => "required|string|max:255",
            "template" => "required|integer|exists:templates,id",
            "groups" => "required|array",
            "groups.*" => "required|integer|exists:groups,id",
            "schedule" => "required|date|after:now",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = [
            "title" => $request->title,
            "template_id" => $request->template,
            "scheduled_at" => $request->schedule,
        ];
        $broadcast = $this->broadcast->createOne($data, $request->groups);
        return Response::ok($broadcast);
    }

    public function read($id)
    {
        $broadcast = $this->broadcast->getOne($id);
        return Response::ok($broadcast);
    }

    public function edit(Request $request, $id)
    {
        $rule = [
            "title" => "required|string|max:255",
            "template" => "required|integer|exists:templates,id",
            "groups" => "required|array",
            "groups.*" => "required|integer|exists:groups,id",
            "schedule" => "required|date|after:now",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = [
            "title" => $request->title,
            "template_id" => $request->template,
            "scheduled_at" => $request->schedule,
        ];
        $broadcast = $this->broadcast->editOne($id, $data, $request->groups);
        return Response::ok($broadcast);
    }

    public function delete($id)
    {
        $broadcast = $this->broadcast->deleteOne($id);
        return Response::ok($broadcast);
    }

    public function paginate()
    {
        $pagination = $this->broadcast->getPagination();
        return Response::ok($pagination);
    }
}
