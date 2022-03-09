<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Broadcast;
use App\Models\Group;
use App\Models\Template;

class BroadcastSeeder extends Seeder
{
    public function run()
    {
        Template::inRandomOrder()
            ->limit(rand(20, 25))
            ->get()
            ->each(function ($template) {
                $broadcasts = Broadcast::factory()
                    ->count(rand(1, 3))
                    ->make()
                    ->toArray();
                $template->broadcasts()->createMany($broadcasts);
            });
        Broadcast::inRandomOrder()
            ->limit(rand(15, 20))
            ->get()
            ->each(function ($broadcast) {
                $groups = Group::inRandomOrder()
                    ->limit(rand(1, 5))
                    ->get();
                $broadcast->groups()->sync($groups);
            });
    }
}
