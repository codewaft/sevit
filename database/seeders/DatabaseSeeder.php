<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $this->call([
            GroupSeeder::class,
            ContactSeeder::class,
            TemplateSeeder::class,
            BroadcastSeeder::class,
            MessageSeeder::class,
        ]);
    }
}
