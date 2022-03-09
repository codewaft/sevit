<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Broadcast;
use App\Models\Contact;
use App\Models\Message;

class MessageSeeder extends Seeder
{
    public function run()
    {
        Broadcast::inRandomOrder()
            ->limit(rand(15, 20))
            ->get()
            ->each(function ($broadcast) {
                Contact::inRandomOrder()
                    ->limit(rand(15, 20))
                    ->get()
                    ->each(function ($contact) use ($broadcast) {
                        $messages = Message::factory()
                            ->count(rand(1, 5))
                            ->make(["broadcast_id" => $broadcast->id])
                            ->toArray();
                        $contact->messages()->createMany($messages);
                    });
            });
    }
}
