<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function register(Request $request)
    {
        // Validate additional student-specific fields
        $request->validate([
            'fullname' => 'required|string|max:255',
            'cin' => 'required',
            'cne' => 'required',
            'phoneNumber' => 'required',
            'schoolName' => 'required',
            // Add other student-specific fields here
        ]);

        // Begin a database transaction
        DB::transaction(function () use ($request) {
            // Create the user record
            $user = new User();
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = "student";
            $user->save();

            // Create the student record and associate it with the user
            $student = new Student();
            $student->user_id = $user->id;
            $student->fullname = $request->fullname;
            $student->cin = $request->cin;
            $student->cne = $request->cne;
            $student->email = $request->email;
            $student->password = Hash::make($request->password);
            $student->phoneNumber = $request->phoneNumber;
            $student->schoolName = $request->schoolName;
            // Set other student attributes
            $student->save();
        });

        // Redirect to the login page after successful registration
        return Inertia::location(route('login'));
    }
    

    // The rest of the methods remain unchanged
}
