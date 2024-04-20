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
            'cv' => 'nullable|file|max:3072|mimetypes:application/pdf',
            'motivation_letter' => 'nullable|file|max:3072|mimetypes:application/pdf',
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
                $cvPath = $request->file('cv')->store('students/cvs', 'private');
                $student->cv_path = $cvPath;
            }

            // Handle Motivation Letter file upload
            if ($request->hasFile('motivation_letter')) {
                $motivationLetterPath = $request->file('motivation_letter')->store('students/motivation-letters', 'private');
                $student->motivation_letter_path = $motivationLetterPath;
            }            
            $student->save();
        });

        // Redirect to the login page after successful registration
        return Inertia::location(route('login'));
    }

    public function updateFiles(Request $request)
{
    $request->validate([
        'cv' => 'nullable|file|max:3072', // 3MB file size limit
        'motivationLetter' => 'nullable|file|max:3072', // 3MB file size limit
    ]);

    $user = $request->user();

    if ($request->hasFile('cv')) {
        $cvPath = $request->file('cv')->store('students/cvs', 'private');
        $user->student->cv_path = $cvPath;
    }

    if ($request->hasFile('motivationLetter')) {
        $motivationLetterPath = $request->file('motivationLetter')->store('students/motivation-letters', 'private');
        $user->student->motivation_letter_path = $motivationLetterPath;
    }

    $user->student->save();

    return response()->json(['message' => 'Files updated successfully.']);
}
    

    // The rest of the methods remain unchanged
}
