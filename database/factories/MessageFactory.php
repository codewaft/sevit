<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Message;

class MessageFactory extends Factory
{
    public function definition()
    {
        return [
            "reference_id" => $this->faker->randomElement([
                $this->faker->uuid(),
                null,
            ]),
            "status" => $this->faker->randomElement(Message::$status),
            "processed_at" => $this->faker->randomElement([
                $this->faker->dateTime(),
                null,
            ]),
        ];
    }
}
