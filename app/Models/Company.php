<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['firstname', 'lastname', 'email', 'password', 'phoneNumber', 'country', 'region', 'city', 'companyName', 'companySize', 'jobTitle', 'desiredRecruitments'];

    /**
     * Define a one-to-one inverse relationship with the User model.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }
    
}
