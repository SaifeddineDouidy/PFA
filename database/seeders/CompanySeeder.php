<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::where('role', 'company')->get();

        foreach ($users as $user) {
            Company::create([
                'user_id' => $user->id,
                'firstname' => 'Jane',
                'lastname' => 'Dice',
                'email' => $user->email,
                'password' => $user->password,
                'phoneNumber' => '212760445677',
                'country' => 'MA',
                'companyName' => 'Acme Inc.',
                'companySize' => '1000 - 4999 employees',
                'jobTitle' => 'Recruiter',
                'aboutDesc' => 'Acme Inc, we are a start-up technology company established in Morocco looking for talented individuals to join our team.'
            ]);
        }
    }
}