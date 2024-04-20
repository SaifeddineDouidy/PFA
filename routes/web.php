<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use App\Models\Job;
use App\Models\Company;
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

// Student Home page route
Route::get('/student/home', function () {
    return Inertia::render('AuthPageAccueil');
})->name('student.home');

// Register page route
Route::get('/signup', function () {
    return Inertia::render('SignUp');
})->name('signup');

// Student dashboard route
Route::get('student/dashboard', function () {
    return Inertia::render('StudentDashboard');
})->name('student.dashboard');

// Company dashboard route
Route::get('/company/dashboard', function () {
    return Inertia::render('CompanyDashboard');
})->name('company.dashboard');

// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// JOb Details Route
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

// Routes protected by auth middleware
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route for registering a student
Route::post('/register/student', [StudentController::class, 'register'])->name('register.student');

// Route for registering a company
Route::post('/register/company', [CompanyController::class, 'register'])->name('register.company');

// Include authentication routes from auth.php file
require __DIR__.'/auth.php';
