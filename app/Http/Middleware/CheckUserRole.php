<?php

// app/Http/Middleware/CheckUserRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserRole
{
    public function handle(Request $request, Closure $next)
    {
        
            $user = Auth::user();

            if ($user->role === 'student') {
                return redirect()->route('student.dashboard');
            } elseif ($user->role === 'company') {
                return redirect()->route('company.dashboard');
            } elseif ($user->role === 'guest') {
                return redirect()->route('guest.dashboard');
            }
        

        // Example logging in middleware


        return $next($request);
    }
}
