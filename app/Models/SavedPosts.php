<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedPosts extends Model
{
    // Define the fields that are fillable
    protected $fillable = ['user_id', 'job_id'];
    protected $table = 'saved_posts';

    /**
     * Define a many-to-one relationship with the Company model.
     * This means that a Post belongs to one Company.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

