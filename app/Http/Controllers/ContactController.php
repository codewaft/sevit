<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ContactImport;
use App\Services\Response;
use App\Services\Validation;
use App\Services\Twillio;
use App\Services\Csv;
use App\Utils\Str;
use App\Repositories\ContactRepository;
use SebastianBergmann\Environment\Console;

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
            "name" => "required|string|max:255",
            "phone" => "required|string|unique:contacts,phone|max:255",
            "groups" => "required|array",
            "groups.*" => "required|integer|exists:groups,id",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $error = Twillio::validatePhone($request->phone);
        if ($error) {
            return Response::badRequest($error);
        }
        $data = ["name" => $request->name, "phone" => $request->phone];
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
            "name" => "required|string|max:255",
            "groups" => "required|array",
            "groups.*" => "required|integer|exists:groups,id",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $data = ["name" => $request->name];
        $contact = $this->contact->editOne($id, $data, $request->groups);
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

    public function import(Request $request)
    {
        $rule = [
            "contacts" => "required|file|mimes:csv,txt",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        [$header, $contacts] = Csv::parse($request->contacts);
        $headerRule = [
            "name" => "required|in:Name",
            "phone" => "required|in:Phone",
            "groups" => "required|in:Groups",
        ];
        $headerMessages = [
            "name.required" => "First coulmn should be 'Name'",
            "name.in" => "First coulmn header should be 'Name'",
            "phone.required" => "Second coulmn should be 'Phone'",
            "phone.in" => "Second coulmn header should be 'Phone'",
            "groups.required" => "Third coulmn should be 'Groups'",
            "groups.in" => "Third coulmn header should be 'Groups'",
        ];
        $headerError = Validation::validate($header, $headerRule, $headerMessages);
        if ($headerError) {
            return Response::unprocessable($headerError);
        }
        $queueDispatcher = function ($contact) {
            [$name, $phone, $groupStr] = $contact;
            $trim = fn($value) => trim($value);
            $groups = collect(explode(",", $groupStr))
                ->map($trim)
                ->toArray();
            ContactImport::dispatch($name, $phone, $groups);
        };
        $contacts->each($queueDispatcher);
        return Response::ok($contacts);
    }

    public function export()
    {
        $contacts = $this->contact->getExport();
        $headers = ["Name", "Phone", "Groups"];
        $csv = Csv::build($headers, $contacts);
        return Response::ok($csv);
    }
}
