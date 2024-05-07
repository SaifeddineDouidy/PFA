<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeProfileController;
use App\Http\Controllers\SavedPostsController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use App\Models\Job;
use App\Models\Company;
use App\Models\Employee;
use Illuminate\Http\Request;

// Route to get the CSRF token
Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrfToken' => csrf_token()]);
});

// Route to fetch the Jobs data
Route::get('/posts', [JobController::class, 'index'])->name('jobs.index');

// Route to fetch the Jobs data
Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');




// Home page route
Route::get('/', function () {
    return Inertia::render('LandingPage');
});


// Register page route
Route::get('/signup', function () {
    return Inertia::render('SignUp');
})->name('signup');


Route::get('employee/{userId}/dashboard', function ($userId) {
    // Your logic here
    return Inertia::render('EmployeeDashboard', [
        'userId' => $userId,
        // Other data as needed
    ]);
})->name('employee.dashboard');



// Company dashboard route
Route::get('/company{userId}/dashboard', function ($userId) {
    return Inertia::render('CompanyDashboard', [
        'userId' => $userId,
        // Pass any other data you need to your component
    ]);
})->name('company.dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    // Route for serving JSON data
    Route::get('/api/saved-posts', [SavedPostsController::class, 'index'])->name('api.saved-posts.index');

    // Route for rendering the HTML page
    Route::get('/saved-posts', [SavedPostsController::class, 'showPage'])->name('saved-posts');

    // Route for saving a post
    Route::post('/saved-posts', [SavedPostsController::class, 'store'])->name('saved-posts.store');

    // Route for deleting a saved post
    Route::delete('/saved-posts', [SavedPostsController::class, 'destroy'])->name('saved-posts.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    // Route to display the application form for a specific job post
    Route::get('/applications/{postId}', function ($postId) {
        $job = Job::findOrFail($postId);
        $company = $job->company;

        return Inertia::render('EmployeeApplicationsPostsPage', [
            'job' => $job,
            'company' => $company,
            'postId' => $postId,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('applications.create');

    // Route to handle the application submission
    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');

    // Route to display the applications submitted by the user
    Route::get('/my-applications', [ApplicationController::class, 'myApplications'])->name('my-applications');

    // Route to delete an application
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');
});



// Job Details Route
Route::get('/detailjobs/{id}', function ($id) {
    // Fetch the job data from your database based on the provided $id
    $job = Job::findOrFail($id);
    $company = $job->company;

    // Pass the job data to the DetailedJob component
    return Inertia::render('EmployeeDetailedJob', [
        'job' => $job,
        'company' => $company,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->name('detail-jobs');

Route::middleware('auth')->group(function () {
    // employee profile routes
    Route::get('/employee/profile', [EmployeeProfileController::class, 'edit'])->name('employee.profile.edit');
    Route::patch('/employee/profile', [EmployeeProfileController::class, 'update'])->name('employee.profile.update');
    Route::delete('/employee/profile', [EmployeeProfileController::class, 'destroy'])->name('employee.profile.destroy');

    // Company profile routes
    Route::get('/company/profile', [ProfileController::class, 'edit'])->name('company.profile.edit');
    Route::patch('/company/profile', [ProfileController::class, 'update'])->name('company.profile.update');
    Route::delete('/company/profile', [ProfileController::class, 'destroy'])->name('company.profile.destroy');

    //User Profile deletion route
    Route::delete('/company/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route for registering a employee
Route::post('/register/employee', [EmployeeController::class, 'register'])->name('register.employee');

// Route for registering a company
Route::post('/register/company', [CompanyController::class, 'register'])->name('register.company');

// Include authentication routes from auth.php file
require __DIR__.'/auth.php';
