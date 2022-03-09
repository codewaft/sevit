<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Template;

class TemplateSeeder extends Seeder
{
    public function run()
    {
        Template::factory()
            ->count(rand(25, 30))
            ->create();
    }
}
