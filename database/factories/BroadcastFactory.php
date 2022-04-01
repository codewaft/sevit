<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BroadcastFactory extends Factory
{
    public function definition()
    {
        return [
            "title" => $this->faker->sentence(6),
            "scheduled_at" => now()->addMinutes(-2),
        ];
    }
}
