<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    public function run()
    {
        Group::factory()
            ->count(rand(25, 30))
            ->create();
    }
}
