<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job; // Assurez-vous d'importer le modèle Job
use Inertia\Inertia;

class CreateJobController extends Controller
{
    public function store(Request $request)
    {
        // Validez les données soumises par le formulaire
        $validatedData = $request->validate([
            'jobTitle' => 'required|string|max:255',
            'companyName' => 'required|string|max:255',
            'minPrice' => 'required|numeric',
            'maxPrice' => 'required|numeric',
            'salaryType' => 'required|string|in:Hourly,Monthly,Yearly',
            'jobLocation' => 'required|string|max:255',
            'postingDate' => 'required|date',
            'experienceLevel' => 'required|string|in:NoExperience,Internship,Work remotely',
            'description' => 'required|string',
            'postedBy' => 'required|email',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        // Créez un nouvel emploi à partir des données validées
        $job = new Job();
        $job->title = $validatedData['jobTitle'];
        $job->company_name = $validatedData['companyName'];
        $job->min_salary = $validatedData['minPrice'];
        $job->max_salary = $validatedData['maxPrice'];
        $job->salary_type = $validatedData['salaryType'];
        $job->location = $validatedData['jobLocation'];
        $job->posting_date = $validatedData['postingDate'];
        $job->experience_level = $validatedData['experienceLevel'];
        $job->description = $validatedData['description'];
        $job->posted_by = $validatedData['postedBy'];
        // Ajoutez d'autres attributs au besoin
        $job->save();

        // Redirigez ou retournez une réponse appropriée
        return Inertia::location(route('dashboardC'))->with('success', 'Votre offre d\'emploi a été créée avec succès!');

    }
}
