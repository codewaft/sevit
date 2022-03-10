<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Response;
use App\Services\Validation;
use App\Services\Twillio;
use App\Utils\Str;
use App\Repositories\ContactRepository;

class ContactController extends Controller
{
    protected $contact;

    public function __construct(ContactRepository $contact)
    {
        $this->contact = $contact;
    }

    public function create(Request $request)
    {
        $request->merge([
            "phone" => Str::removeWhitespaces($request->phone),
        ]);
        $rule = [
            "phone" => "required|string|unique:contacts,phone|max:255",
            "groups" => "required|array",
            "groups.*" => "required|string|max:255",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $error = Twillio::validatePhone($request->phone);
        if ($error) {
            return Response::badRequest($error);
        }
        $data = ["phone" => $request->phone];
        $contact = $this->contact->createOne($data, $request->groups);
        return Response::ok($contact);
    }

    public function read($id)
    {
        $contact = $this->contact->getOne($id);
        return Response::ok($contact);
    }

    public function edit(Request $request, $id)
    {
        $rule = [
            "groups" => "required|array",
            "groups.*" => "required|string|max:255",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $contact = $this->contact->editOne($id, $request->groups);
        return Response::ok($contact);
    }

    public function delete($id)
    {
        $contact = $this->contact->deleteOne($id);
        return Response::ok($contact);
    }

    public function paginate()
    {
        $pagination = $this->contact->getPagination();
        return Response::ok($pagination);
    }
}
