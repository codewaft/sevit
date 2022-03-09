<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Services\Validation;
use App\Repositories\ContactRepository;

class ContactController extends Controller
{
    protected $contact;

    public function __construct(ContactRepository $contact)
    {
        $this->contact = $contact;
    }

    public function read($id)
    {
        $contact = $this->contact->getOne($id);
        return Response::ok($contact);
    }

    public function list()
    {
        $contacts = $this->contact->getAll();
        return Response::ok($contacts);
    }

    public function paginate()
    {
        $pagination = $this->contact->getPagination();
        return Response::ok($pagination);
    }
}
