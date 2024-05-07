<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeProfileController extends ProfileController
{
    /**
     * Display the employee's profile form.
     */
    public function edit(Request $request): Response
    {
        \Log::info('REQUEST:', $request->all());

        $user = $request->user();
        $employee = Employee::where('user_id', $user->id)->first();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'employee' => [
                'fullname' => $employee->fullname,
                'cin' => $employee->cin,
                'phoneNumber' => $employee->phoneNumber,
                'educationLevel' => $employee->educationLevel,

            ],
        ]);
    }

    
/**
 * Update the employee's profile information.
 */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        \Log::info('EmployeeProfileController@update request data:', $request->all());
            $user = $request->user();
        $employee = Employee::where('user_id', $user->id)->first();

        // Update the user's profile information
        $user->fill($request->validated());
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $employee->email = $user->email;
        }
        $user->save();
        $employee->save();

        // Update info in the employees table
        $employee->fullname = $request->input('fullname');
        $employee->cin = $request->input('cin');
        $employee->phoneNumber = $request->input('phoneNumber');
        $employee->educationLevel = $request->input('educationLevel');

        // Handle CV file upload
        {/*if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('employee/cvs', 'public');
            $employee->cv_path = $cvPath;
        } elseif ($employee->cv_path) {
            // If no new CV is uploaded, but there's an existing one, keep the existing one
            $employee->cv_path = $employee->cv_path;
        } else {
            // If no CV is uploaded and there's no existing one, set it to null
            $employee->cv_path = null;
        }

        // Handle Motivation Letter file upload
        if ($request->hasFile('motivationLetter')) {
            $motivationLetterPath = $request->file('motivationLetter')->store('employees/motivation-letters', 'public');
            $employee->motivation_letter_path = $motivationLetterPath;
        } elseif ($employee->motivation_letter_path) {
            // If no new Motivation Letter is uploaded, but there's an existing one, keep the existing one
            $employee->motivation_letter_path = $employee->motivation_letter_path;
        } else {
            // If no Motivation Letter is uploaded and there's no existing one, set it to null
            $employee->motivation_letter_path = null;
        }*/}

        $employee->save();

        return Redirect::route('employee.profile.edit');
    }

    /**
     * Delete the employee's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $employee = employee::where('user_id', $user->id)->first();

        Auth::logout();

        $employee->delete();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}