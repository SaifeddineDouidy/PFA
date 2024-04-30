<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::where('role', 'employee')->get();

        foreach ($users as $user) {
            Employee::create([
                'user_id' => $user->id,
                'fullname' => 'John Doe',
                'cin' => 'T100000',
                'email' => $user->email,
                'password' => $user->password,
                'phoneNumber' => '212767252054',
                'educationLevel' => 'Ingénieur (BAC+5)',
                'cv_path' => 'path/to/cv.pdf',
                'motivation_letter_path' => 'path/to/motivation-letter.pdf'
            ]);
        }
    }
}