<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Repositories\BroadcastRepository;

class BroadcastController extends Controller
{
    protected $broadcast;

    public function __construct(BroadcastRepository $broadcast)
    {
        $this->broadcast = $broadcast;
    }

    public function paginate()
    {
        $pagination = $this->broadcast->getPagination();
        return Response::ok($pagination);
    }
}
