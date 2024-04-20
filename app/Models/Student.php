<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['fullname', 'cin', 'cne', 'phoneNumber', 'schoolName', 'email', 'password', 'cv_path',
    'motivation_letter_path',];


    /**
     * Define a one-to-one inverse relationship with the User model.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }
    
}
