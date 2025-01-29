<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::positions() as $name) {
            Position::create([
                'name' => $name
            ]);
        }

    }
    public static function positions()
    {
        return ([
            'Lawyer',
            'Content manager',
            'Security',
            'Designer',
        ]);
    }
}
