<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $this->call([UserSeeder::class]);

        if (App::environment("local")) {
            $this->call([
                GroupSeeder::class,
                ContactSeeder::class,
                TemplateSeeder::class,
                BroadcastSeeder::class,
                MessageSeeder::class,
            ]);
        }
    }
}
