<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Repositories\GroupRepository;

class GroupController extends Controller
{
    protected $group;

    public function __construct(GroupRepository $group)
    {
        $this->group = $group;
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

    public function read($id)
    {
        $groups = $this->group->getOne($id);
        return Response::ok($groups);
    }

    public function delete($id)
    {
        $group = $this->group->deleteOne($id);
        return Response::ok($group);
    }
}
