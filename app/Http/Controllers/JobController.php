<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Job;

class JobController extends Controller
{
    public function registerPost(Request $request)
    {
        // Validate job-specific fields
        $validatedData = $request->validate([
            'jobTitle' => 'required|string|max:255',
            'minPrice' => 'numeric|nullable',
            'maxPrice' => 'numeric|nullable|gte:minPrice',
            'salaryType' => 'required',
            'jobLocation' => 'required',
            'postingDate' => 'required|date',
            'experienceLevel' => 'required',
            'employmentType' => 'required',
            'description' => 'required',
        ]);

        // Begin a database transaction
        DB::beginTransaction();

        try {
            // Create the job record and associate it with the company
            $job = new Job();
            $job->fill($validatedData);
            $job->company_id = Auth::user()->id;
            $job->save();

            // Commit the transaction
            DB::commit();

            // Optionally, perform additional actions after registration

            return redirect()->route('home')->with('success', 'Job created successfully');
            
        } catch (\Exception $e) {
            // Rollback the transaction if an exception occurs
            DB::rollBack();

            // Log the error or handle it gracefully
            return redirect()->back()->with('error', 'Failed to create job: ' . $e->getMessage());
        }
    }

    // Return the Fetched Data from the Database
    public function index()
    {
        $jobs = Job::all();
        return $jobs;
    }



    // Other methods...
}
