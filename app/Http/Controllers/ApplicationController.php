<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class ApplicationController extends Controller
{
    public function create($postId)
{
    $jobPost = Job::findOrFail($postId);
    return inertia('ApplicationsPostsPage', [
        'jobPost' => $jobPost
    ]);
}
}
