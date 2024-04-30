<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

 /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, EmployeeController $employeeController, CompanyController $companyController): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            // Include validation rules for other common fields
        ]);
    
        // Determine the role based on the submitted data
        $role = $request->input('accountType') === 'employee' ? 'employee' : 'company';
    
        // Create a new user record with the determined role
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $role,
            // Include other common fields here
        ]);
    
        // Trigger the registration event
        event(new Registered($user));
    
        // Log in the newly registered user
        Auth::login($user);
    
        // Call the respective controller method based on the role
        if ($role === 'employee') {
            $employeeController->register($request); // No need to pass $user
        } else {
            $companyController->register($request); // No need to pass $user
        }
    
        return redirect(route('dashboard', absolute: false));
    }
    
}
