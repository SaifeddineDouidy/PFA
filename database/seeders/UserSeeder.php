<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create sample users
        $users = [
            [
                'email' => 'employee@example.com',
                'password' => Hash::make('password123'),
                'role' => 'employee'
            ],
            [
                'email' => 'company@example.com',
                'password' => Hash::make('password456'),
                'role' => 'company'
            ],
            [
                'email' => 'guest@example.com',
                'password' => Hash::make('password789'),
                'role' => 'guest'
            ]
        ];

        foreach ($users as $user) {
            User::create([
                'email' => $user['email'],
                'password' => $user['password'],
                'role' => $user['role']
            ]);
        }
    }
}