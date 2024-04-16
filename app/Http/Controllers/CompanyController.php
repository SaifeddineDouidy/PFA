<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function register(Request $request)
    {
        // Validate additional student-specific fields
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phoneNumber' => 'required',
            'country' => 'required',
            'companyName' => 'required',
            'companySize' => 'required',
            'jobTitle' => 'required',
            'desiredRecruitments' => 'required',
            

            // Add other student-specific fields here
        ]);

        // Begin a database transaction
        DB::transaction(function () use ($request) {
            // Create the user record
            $user = new User();
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = "company";
            $user->save();

            // Create the student record and associate it with the user
            $company = new Company();
            $company->user_id = $user->id;
            $company->firstname = $request->firstname;
            $company->lastname = $request->lastname;
            $company->email = $request->email;
            $company->password = Hash::make($request->password);
            $company->phoneNumber = $request->phoneNumber;
            $company->country = $request->country;
            $company->companyName = $request->companyName;
            $company->companySize = $request->companySize;
            $company->jobTitle = $request->jobTitle;
            $company->desiredRecruitments = $request->desiredRecruitments;
            // Set other student attributes
            $company->save();
        });

        // Optionally, perform additional actions after registration

        return redirect()->route('home'); // Redirect to the dashboard or another appropriate page
    }
    

    // The rest of the methods remain unchanged
}
