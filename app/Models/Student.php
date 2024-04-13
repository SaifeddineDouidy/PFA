<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['fullname', 'cin', 'cne', 'phoneNumber', 'schoolName', 'email', 'password'];


    /**
     * Define a one-to-one inverse relationship with the User model.
     */
    public function user()
    {
        return $this->morphOne(User::class, 'profile');
    }
    
}
