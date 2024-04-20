<?php
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Validator;
use App\Models\Job; // Update the model import
use Illuminate\Support\Facades\Schema; // Import Schema facade for checking column existence

class CompanyJobsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if the 'company_jobs' table has the 'jobTitle' column
        if (!Schema::hasColumn('company_jobs', 'jobTitle')) {
            echo "The 'company_jobs' table does not have the 'jobTitle' column.\n";
            return;
        }

        // Sample data
        $jobs = [
            [
                'company_id' => 1,
                'jobTitle' => 'Software Developer',
                'minPrice' => 5000,
                'maxPrice' => 8000,
                'salaryType' => 'Yearly',
                'jobLocation' => 'New York',
                'postingDate' => '2024-04-12',
                'experienceLevel' => 'Senior-level',
                'employmentType' => 'Full-time',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'requirments' => 'React, Spring Boot, Docker'
            ],
            [
                'company_id' => 1,
                'jobTitle' => 'UI / UX Designer',
                'minPrice' => 4000,
                'maxPrice' => 7000,
                'salaryType' => 'Monthly',
                'jobLocation' => 'Paris',
                'postingDate' => '2023-03-12',
                'experienceLevel' => 'Medium-level',
                'employmentType' => 'Part-time',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'requirments' => 'Figma, Adobe Photoshop, Blender'
            ],
            [
                'company_id' => 1,
                'jobTitle' => 'Backend Developer',
                'minPrice' => 8000,
                'maxPrice' => 10000,
                'salaryType' => 'Monthly',
                'jobLocation' => 'Casablanca',
                'postingDate' => '2023-02-12',
                'experienceLevel' => 'Medium-level',
                'employmentType' => 'Part-Time',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'requirments' => 'Laravel, Docker'
            ],
            [
                'company_id' => 1,
                'jobTitle' => 'Backend Developer',
                'minPrice' => 8000,
                'maxPrice' => 10000,
                'salaryType' => 'Monthly',
                'jobLocation' => 'Rabat',
                'postingDate' => '2024-01-12',
                'experienceLevel' => 'Junior-level',
                'employmentType' => 'Intership',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
            // Add more sample data as needed
        ];

        // Define validation rules
        $rules = [
            'jobTitle' => 'required|string|max:255',
            'minPrice' => 'numeric|nullable',
            'maxPrice' => 'numeric|nullable|gte:minPrice',
            'salaryType' => 'required',
            'jobLocation' => 'required',
            'postingDate' => 'required|date',
            'experienceLevel' => 'required',
            'employmentType' => 'required',
            'description' => 'required',
            'requirments' => 'required',
        ];

        // Validate and insert sample data into the company_jobs table
        foreach ($jobs as $job) {
            // Validate each job against the defined rules
            $validator = Validator::make($job, $rules);

            // If validation fails, display error messages and skip inserting the data
            if ($validator->fails()) {
                $errors = $validator->errors()->all();
                foreach ($errors as $error) {
                    echo "Validation Error: $error\n";
                }
                continue;
            }

            // If validation passes, insert the data into the company_jobs table
            Job::create($job); // Use the CompanyJob model for insertion
        }
    }
}
