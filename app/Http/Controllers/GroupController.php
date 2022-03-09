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

    public function paginate()
    {
        $groups = $this->group->getPaginate();
        return Response::ok($groups);
    }
}
