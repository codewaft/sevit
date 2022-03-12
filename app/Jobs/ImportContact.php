<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\Twillio;
use App\Services\Validation;
use App\Repositories\ContactRepository;

class ImportContact implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $contact;
    protected $phone;
    protected $groups;

    public function __construct($phone, $groups)
    {
        $this->contact = new ContactRepository();
        $this->phone = $phone;
        $this->groups = $groups;
    }

    protected function validateData()
    {
        $data = [
            "phone" => $this->phone,
            "groups" => $this->groups,
        ];
        $rule = [
            "phone" => "required|string|unique:contacts,phone|max:255",
            "groups" => "required|array",
            "groups.*" => "required|string|max:255",
        ];
        return Validation::validate($data, $rule);
    }

    public function handle()
    {
        $dataError = $this->validateData();
        if ($dataError) {
            throw new Exception($dataError);
        }
        $phoneError = Twillio::validatePhone($this->phone);
        if ($phoneError) {
            throw new Exception($phoneError);
        }
        $contactData = ["phone" => $this->phone];
        $this->contact->createOne($contactData, $this->groups);
    }
}
