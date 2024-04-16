<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    // Define the fields that are fillable
    protected $fillable = ['jobTitle', 'minPrice', 'maxPrice', 'salaryType', 'jobLocation', 'postingDate', 'experienceLevel', 'employmentType', 'description'];

    /**
     * Define a many-to-one relationship with the Company model.
     * This means that a Post belongs to one Company.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}

