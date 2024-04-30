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


// Welcome page route
Route::get('/home', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Home page route
Route::get('/', function () {
    return Inertia::render('PageAccueil');
});

// Employee Home page route
Route::get('/employee/home', function () {
    return Inertia::render('AuthPageAccueil');
})->name('employee.home');

// Register page route
Route::get('/signup', function () {
    return Inertia::render('SignUp');
})->name('signup');


// Employee dashboard route
Route::get('employee/dashboard', function () {
    return Inertia::render('EmployeeDashboard');
})->name('employee.dashboard');

// Company dashboard route
Route::get('/company/dashboard', function () {
    return Inertia::render('CompanyDashboard');
})->name('company.dashboard');

// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Saved Posts routes
Route::get('/saved-posts', [SavedPostsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('saved-posts');

Route::post('/saved-posts', [SavedPostsController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('saved-posts.store');

Route::delete('/saved-posts', [SavedPostsController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('saved-posts.destroy');

    Route::get('/applications/{postId}', function ($postId) {
        $job = Job::findOrFail($postId);
        $company = $job->company;
    
        return Inertia::render('ApplicationsPostsPage', [
            'job' => $job,
            'company' => $company,
            'postId' => $postId, // Explicitly pass postId
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->name('applications.show')->middleware(['auth', 'verified']);
    

// Job Details Route
Route::get('/detailjobs/{id}', function ($id) {
    // Fetch the job data from your database based on the provided $id
    $job = Job::findOrFail($id);
    $company = $job->company;

    // Pass the job data to the DetailedJob component
    return Inertia::render('DetailedJob', [
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
});

// Route for registering a employee
Route::post('/register/employee', [EmployeeController::class, 'register'])->name('register.employee');

// Route for registering a company
Route::post('/register/company', [CompanyController::class, 'register'])->name('register.company');

// Include authentication routes from auth.php file
require __DIR__.'/auth.php';
