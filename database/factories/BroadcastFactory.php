<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Utils\ScheduleDate;

class BroadcastFactory extends Factory
{
    public function definition()
    {
        return [
            "title" => $this->faker->sentence(6),
            "scheduled_at" => ScheduleDate::now(),
        ];
    }
}
