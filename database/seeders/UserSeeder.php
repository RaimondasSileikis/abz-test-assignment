<?php

namespace Database\Seeders;

use Alirezasedghi\LaravelImageFaker\Services\Picsum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 45) as $_) {

            User::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => '+380' . fake()->numerify('#########'),
                'position_id' => rand(1, 4),
                'photo' => (new Picsum())->imageUrl(70, 70) . "?random=" . rand(1000, 9999),
            ]);
        }
    }
}
