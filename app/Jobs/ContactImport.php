<?php

namespace App\Jobs;

use Throwable;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Services\Twillio;
use App\Services\Validation;
use App\Repositories\ContactRepository;
use App\Repositories\GroupRepository;

class ContactImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $contactRepo;
    protected $groupRepo;
    protected $name;
    protected $phone;
    protected $groupTitles;

    public function __construct($name, $phone, $groupTitles)
    {
        $this->contactRepo = new ContactRepository();
        $this->groupRepo = new GroupRepository();
        $this->name = $name;
        $this->phone = $phone;
        $this->groupTitles = $this->sanitizeGroupTitles($groupTitles);
    }

    protected function sanitizeGroupTitles($groupTitles)
    {
        return collect($groupTitles)
            ->map(fn($title) => Str::of($title)->trim())
            ->filter(fn($title) => !Str::of($title)->isEmpty())
            ->unique()
            ->toArray();
    }

    protected function getGroupIds()
    {
        $groupIds = $this->groupRepo->getFromTitles($this->groupTitles);
        return $groupIds->pluck("id");
    }

    protected function validateData()
    {
        $data = [
            "name" => $this->name,
            "phone" => $this->phone,
            "groups" => $this->groupTitles,
        ];
        $rule = [
            "name" => "required|string|max:255",
            "phone" => "required|string|unique:contacts,phone|max:255",
            "groups" => "required|array",
            "groups.*" => "required|exists:groups,title",
        ];
        return Validation::validate($data, $rule);
    }

    public function middleware()
    {
        return [new WithoutOverlapping($this->phone)];
    }

    public function handle()
    {
        try {
            $dataError = $this->validateData();
            if ($dataError) {
                throw new Exception($dataError);
            }
            $phoneError = Twillio::validatePhone($this->phone);
            if ($phoneError) {
                throw new Exception($phoneError);
            }
            $contactData = ["name" => $this->name, "phone" => $this->phone];
            $groupIds = $this->getGroupIds();
            $this->contactRepo->createOne($contactData, $groupIds);
        } catch (Throwable $e) {
            Log::warning($e);
        }
    }
}
