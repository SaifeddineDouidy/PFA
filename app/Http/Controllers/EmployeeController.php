<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;



class EmployeeController extends Controller
{
    public function register(Request $request)
    {
        // Validate additional employee-specific fields
        $request->validate([
            'fullname' => 'required|string|max:255',
            'cin' => 'required',
            'phoneNumber' => 'required',
            'educationLevel' => 'required',
            'cv_path' => 'nullable|file|max:3072|mimetypes:application/pdf',
            'motivation_letter_oath' => 'nullable|file|max:3072|mimetypes:application/pdf',
            // Add other employee-specific fields here
        ]);

        // Begin a database transaction
        DB::transaction(function () use ($request) {
            // Create the user record
            $user = new User();
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = "employee";
            $user->save();

            // Create the employee record and associate it with the user
            $employee = new Employee();
            $employee->user_id = $user->id;
            $employee->fullname = $request->fullname;
            $employee->cin = $request->cin;
            $employee->email = $request->email;
            $employee->password = Hash::make($request->password);
            $employee->phoneNumber = $request->phoneNumber;
            $employee->educationLevel = $request->educationLevel;

            // Handle CV file upload
            if ($request->hasFile('cv')) {
                $cvPath = $request->file('cv')->store('employees/cvs', 'public');
                $employee->cv_path = $cvPath;
            }

            // Handle Motivation Letter file upload
            if ($request->hasFile('motivationLetter')) {
                $motivationLetterPath = $request->file('motivationLetter')->store('employees/motivation-letters', 'public');
                $employee->motivation_letter_path = $motivationLetterPath;
            }

            $employee->save();
        });

        // Redirect to the login page after successful registration
        return Inertia::location(route('login'));
    }


    // The rest of the methods remain unchanged
}
