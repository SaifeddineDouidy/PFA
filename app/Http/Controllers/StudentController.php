<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;



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
            'cv_path' => 'nullable|file|max:3072|mimetypes:application/pdf',
            'motivation_letter_oath' => 'nullable|file|max:3072|mimetypes:application/pdf',
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

            // Handle CV file upload
            if ($request->hasFile('cv')) {
                $cvPath = $request->file('cv')->store('students/cvs', 'public');
                $student->cv_path = $cvPath;
            }

            // Handle Motivation Letter file upload
            if ($request->hasFile('motivationLetter')) {
                $motivationLetterPath = $request->file('motivationLetter')->store('students/motivation-letters', 'public');
                $student->motivation_letter_path = $motivationLetterPath;
            }

            $student->save();
        });

        // Redirect to the login page after successful registration
        return Inertia::location(route('login'));
    }


    // The rest of the methods remain unchanged
}
