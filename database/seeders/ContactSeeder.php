<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Group;

class ContactSeeder extends Seeder
{
    public function run()
    {
        $contacts = Contact::factory()
            ->count(rand(25, 30))
            ->create();
        $contacts->each(function ($contact) {
            $groups = Group::inRandomOrder()
                ->limit(rand(0, 5))
                ->get();
            $contact->groups()->sync($groups);
        });
    }
}
