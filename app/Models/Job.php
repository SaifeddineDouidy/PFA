<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    // Définissez les attributs modifiables (si nécessaire)
    protected $fillable = [
        'title',
        'company_name',
        'min_salary',
        'max_salary',
        'salary_type',
        'location',
        'posting_date',
        'experience_level',
        'description',
        'posted_by',
        // Ajoutez d'autres attributs au besoin
    ];
}
