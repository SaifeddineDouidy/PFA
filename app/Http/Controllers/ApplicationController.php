<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Applications;
use Illuminate\Support\Facades\Log;
use App\Models\Employee;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function create($postId)
    {
        $jobPost = Job::findOrFail($postId);
        return inertia('EmployeeApplicationsPostsPage', [
            'jobPost' => $jobPost
        ]);
    }

    public function store(Request $request)
    {
            // Log the entire request data
            Log::info('Request Data:', $request->all());        
            $validatedData = $request->validate([
            'cv_file' => 'required|file|max:2048', // maximum file size of 2MB
            'motivation_letter' => 'file|max:2048',
            'job_id' => 'required|exists:company_jobs,id',
            'company_id' => 'required|exists:companies,id',
        ], [
            'cv_file.required' => 'Please upload a CV file.',
            'cv_file.file' => 'The CV file must be a valid file.',
            'cv_file.max' => 'The CV file must not exceed 2MB in size.',
            'motivation_letter.file' => 'The motivation letter must be a valid file.',
            'motivation_letter.max' => 'The motivation letter must not exceed 2MB in size.',
            'job_id.required' => 'The job ID is required.',
            'job_id.exists' => 'The selected job does not exist.',
            'company_id.required' => 'The company ID is required.',
            'company_id.exists' => 'The selected company does not exist.',
        ]);

        $user = Auth::user();

        try {
            // Attempt to find an employee by email. If not found, it will throw a ModelNotFoundException.
            $employee = Employee::where('email', $user->email)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the exception, e.g., return an error response or redirect the user.
            return abort(404, 'Employee not found');
        }


        $cvPath = $request->file('cv_file')->store('employees/cvs', 'public');
        // Check if motivation_letter is present and store it; otherwise, skip this step
        if ($request->hasFile('motivation_letter')) {
            $motivationLetterPath = $request->file('motivation_letter')->store('employees/motivation-letters', 'public');
        } else {
            $motivationLetterPath = null; // Or whatever default value you prefer
        }
        $application = Applications::create([
            'employee_id' => $employee->id,
            'job_id' => $validatedData['job_id'],
            'company_id' => $validatedData['company_id'],
            'cv_path' => $cvPath,
            'motivation_letter_path' => $motivationLetterPath,
            'status' => 'pending',
        ]);

        return redirect()->route('applications.show', $application->id)
            ->with('success', 'Application submitted successfully!');
    }

    public function show(Application $application)
    {
        return inertia('EmployeeApplicationDetailsPage', [
            'application' => $application,
            'employee' => $application->employee,
            'job' => $application->job,
            'company' => $application->company,
        ]);
    }

    public function myApplications() // CHANGE THIS DEPENDING ON THE ROLE
    {
        $applications = Applications::where('employee_id', Auth::id())
            ->with('job', 'employee')
            ->get();
    
        // Log the entire request data
        Log::info('Applications Data:', $applications->all());
    
        return Inertia::render('EmployeeMyApplications', [
            'applications' => $applications->map(function ($application) {
                return [
                    'id' => $application->id,
                    'employee' => [
                        'fullname' => $application->employee->fullname,
                        'cin' => $application->employee->cin,
                        'phoneNumber' => $application->employee->phoneNumber,
                        'educationLevel' => $application->employee->educationLevel,
                        'email' => $application->employee->email,
                        'cv_path' => $application->employee->cv_path,
                        'motivation_letter_path' => $application->employee->motivation_letter_path,
                    ],
                    'job' => [
                        'jobTitle' => $application->job->jobTitle,
                        'minPrice' => $application->job->minPrice,
                        'maxPrice' => $application->job->maxPrice,
                        'salaryType' => $application->job->salaryType,
                        'jobLocation' => $application->job->jobLocation,
                        'postingDate' => $application->job->postingDate,
                        'experienceLevel' => $application->job->experienceLevel,
                        'employmentType' => $application->job->employmentType,
                        'description' => $application->job->description,
                        'requirments' => $application->job->requirments,
                    ],
                    'cv_path' => $application->cv_path,
                    'motivation_letter_path' => $application->motivation_letter_path,
                    'status' => $application->status,
                    'created_at' => $application->created_at,
                    'updated_at' => $application->updated_at,
                ];
            }),
        ]);
    }
}