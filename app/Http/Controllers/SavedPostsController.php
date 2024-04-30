<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\SavedPosts;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SavedPostsController extends Controller
{
    public function store(Request $request)
{
    $user = auth()->user();
    $postId = $request->input('postId');

    try {
        $existingSavedPost = SavedPosts::where('user_id', $user->id)
            ->where('job_id', $postId)
            ->first();

        if ($existingSavedPost) {
            return response()->json(['message' => 'Post already saved'], 200);
        }

        $savedPost = SavedPosts::create([
            'user_id' => $user->id,
            'job_id' => $postId,
        ]);

        return response()->json($savedPost, 201);
    } catch (\Exception $e) {
        // Log the error for debugging
        \Log::error('Error saving post: ' . $e->getMessage());

        // Redirect back to the saved posts page
        return Inertia::location(route('saved-posts'))->with('message', 'Post saved successfully');
    }
}

    public function index()
    {
        $user = auth()->user();
        $savedPosts = SavedPosts::with('job')->where('user_id', $user->id)->get();

        $formattedSavedPosts = $savedPosts->map(function ($savedPost) {
            $post = $savedPost->job;
            return [
                'id' => $savedPost->id,
                'job_id' => $post->id,
                'job_title' => $post->jobTitle,
                'job_location' => $post->jobLocation,
                'employment_type' => $post->employmentType,
                'min_price' => $post->minPrice,
                'max_price' => $post->maxPrice,
                'posting_date' => $post->postingDate,
                'description' => $post->description,
                'requirments' => $post->requirments,
            ];
        });

        // Return the HTML page with the JSON data as props
    return Inertia::render('SavedPosts', ['savedPosts' => $formattedSavedPosts]);
    }



    public function destroy(Request $request)
{

    $user = auth()->user();
    $postId = $request->input('postId'); // Assuming 'postId' is the correct input name

    // Attempt to find and delete the saved post
    $savedPost = SavedPosts::where('user_id', $user->id)
        ->where('job_id', $postId) // Assuming 'job_id' is the correct column name for the post ID
        ->first(); // Retrieve the first matching record

    if ($savedPost) {
        $deleted = $savedPost->delete(); // Delete the retrieved record
        return Inertia::location(route('saved-posts'))->with('message', 'Post deleted successfully');
    } else {
        return Inertia::location(route('saved-posts'))->with('message', 'Post not found or already deleted');
    }
}


    
}