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
        // Validate additional company-specific fields
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phoneNumber' => 'required',
            'country' => 'required',
            'companyName' => 'required',
            'companySize' => 'required',
            'jobTitle' => 'required',
            'aboutDesc' => 'required',
            

            // Add other company-specific fields here
        ]);

        // Begin a database transaction
        DB::transaction(function () use ($request) {
            // Create the user record
            $user = new User();
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = "company";
            $user->save();

            // Create the company record and associate it with the user
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
            $company->aboutDesc = $request->aboutDesc;
            // Set other company attributes
            $company->save();
        });

        // Optionally, perform additional actions after registration

        return redirect()->route('login'); // Redirect to the dashboard or another appropriate page
    }
    // Return the Fetched Data from the Database
    public function index()
    {
        $comapnies = Company::all();
        return $comapnies;
    }
    

    // The rest of the methods remain unchanged
}
