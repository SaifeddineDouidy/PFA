<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class StudentProfileController extends ProfileController
{
    /**
     * Display the student's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $student = Student::where('user_id', $user->id)->first();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'student' => [
                'fullname' => $student->fullname,
                'cv_path' => $student->cv_path,
                'motivation_letter_path' => $student->motivation_letter_path,
            ],
        ]);
    }

    /**
     * Update the student's profile information.
     */
   /**
/**
 * Update the student's profile information.
 */
public function update(ProfileUpdateRequest $request): RedirectResponse
{
    \Log::info('StudentProfileController@update request data:', $request->all());
    $user = $request->user();
    $student = Student::where('user_id', $user->id)->first();

    // Update the user's profile information
    $user->fill($request->validated());
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
        $student->email = $user->email;
    }
    $user->save();
    $student->save();

    // Update the fullname in the students table
    $student->fullname = $request->input('fullname');

    // Handle CV file upload
    if ($request->hasFile('cv')) {
        $cvPath = $request->file('cv')->store('students/cvs', 'public');
        $student->cv_path = $cvPath;
    } elseif ($student->cv_path) {
        // If no new CV is uploaded, but there's an existing one, keep the existing one
        $student->cv_path = $student->cv_path;
    } else {
        // If no CV is uploaded and there's no existing one, set it to null
        $student->cv_path = null;
    }

    // Handle Motivation Letter file upload
    if ($request->hasFile('motivationLetter')) {
        $motivationLetterPath = $request->file('motivationLetter')->store('students/motivation-letters', 'public');
        $student->motivation_letter_path = $motivationLetterPath;
    } elseif ($student->motivation_letter_path) {
        // If no new Motivation Letter is uploaded, but there's an existing one, keep the existing one
        $student->motivation_letter_path = $student->motivation_letter_path;
    } else {
        // If no Motivation Letter is uploaded and there's no existing one, set it to null
        $student->motivation_letter_path = null;
    }

    $student->save();

    return Redirect::route('student.profile.edit');
}

    /**
     * Delete the student's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $student = Student::where('user_id', $user->id)->first();

        Auth::logout();

        $student->delete();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}