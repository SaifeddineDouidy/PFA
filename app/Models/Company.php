<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    // Define the fields that are fillable
    protected $fillable = ['firstname', 'lastname', 'email', 'password', 'phoneNumber', 'country', 'companyName', 'companySize', 'jobTitle', 'desiredRecruitments'];

    /**
     * Define a one-to-one inverse relationship with the User model.
     * This means that a Company can be associated with one User.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }

    /**
     * Define a one-to-many relationship with the Jobs model.
     * This means that a Company can have many Jobs.
     */
    public function jobs()
    {
        return $this->hasMany(Jobs::class);
    }
    
}
