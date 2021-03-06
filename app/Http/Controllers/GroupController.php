<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Services\Validation;
use App\Repositories\GroupRepository;

class GroupController extends Controller
{
    protected $group;

    public function __construct(GroupRepository $group)
    {
        $this->group = $group;
    }

    public function create(Request $request)
    {
        $rule = [
            "title" => "required|string|unique:groups,title|max:255",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = ["title" => $request->title];
        $group = $this->group->createOne($data);
        return Response::ok($group);
    }

    public function read($id)
    {
        $group = $this->group->getOne($id);
        return Response::ok($group);
    }

    public function edit(Request $request, $id)
    {
        $rule = [
            "title" => "required|string|unique:groups,title,$id|max:255",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = ["title" => $request->title];
        $group = $this->group->editOne($id, $data);
        return Response::ok($group);
    }

    public function delete($id)
    {
        $group = $this->group->deleteOne($id);
        return Response::ok($group);
    }

    public function list()
    {
        $groups = $this->group->getAll();
        return Response::ok($groups);
    }

    public function paginate()
    {
        $pagination = $this->group->getPagination();
        return Response::ok($pagination);
    }
}
