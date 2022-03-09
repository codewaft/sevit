<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TemplateFactory extends Factory
{
    public function definition()
    {
        return [
            "title" => $this->faker->sentence(6),
            "content" => $this->faker->text(1600),
        ];
    }
}
