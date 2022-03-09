<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GroupFactory extends Factory
{
    public function definition()
    {
        return [
            "title" => $this->faker->sentence(6),
        ];
    }
}
