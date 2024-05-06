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
    /**
     * Store a newly saved post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $postId = $request->input('postId');

        try {
            Log::info('Attempting to save post with ID: ' . $postId . ' for user ' . $user->id);

            $existingSavedPost = SavedPosts::where('user_id', $user->id)
                ->where('job_id', $postId)
                ->first();

            if ($existingSavedPost) {
                Log::warning('Post with ID: ' . $postId . ' already saved for user ' . $user->id);
                return response()->json(['message' => 'Post already saved'], 200);
            }

            $savedPost = SavedPosts::create([
                'user_id' => $user->id,
                'job_id' => $postId,
            ]);

            Log::info('Post with ID: ' . $postId . ' saved successfully for user ' . $user->id);

            return response()->json($savedPost, 201);
        } catch (\Exception $e) {
            Log::error('Error saving post: ' . $e->getMessage());
            return Inertia::location(route('saved-posts'))->with('message', 'An error occurred while saving the post.');
        }
    }

    /**
     * Render the HTML page for saved posts.
     *
     * @return \Inertia\Response
     */
    public function showPage()
    {
        $user = auth()->user();
        $savedPosts = SavedPosts::with('job')->where('user_id', $user->id)->get();

        Log::info('Retrieving saved posts for user ' . $user->id);

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
                'saved_at' => $savedPost->created_at,
            ];
        });

        return Inertia::render('EmployeeSavedPosts', ['savedPosts' => $formattedSavedPosts]);
    }

    /**
     * Return JSON data for saved posts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();
        $savedPosts = SavedPosts::with('job')->where('user_id', $user->id)->get();

        Log::info('Retrieving saved posts JSON data for user ' . $user->id);

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
                'saved_at' => $savedPost->created_at,
            ];
        });

        return response()->json($formattedSavedPosts);
    }

    /**
     * Delete a saved post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $user = auth()->user();
        $postId = $request->input('postId');

        Log::info('Attempting to delete saved post with ID: ' . $postId . ' for user ' . $user->id);

        $savedPost = SavedPosts::where('user_id', $user->id)
            ->where('job_id', $postId)
            ->first();

        if ($savedPost) {
            $deleted = $savedPost->delete();
            Log::info('Saved post with ID: ' . $postId . ' deleted successfully for user ' . $user->id);
            return Inertia::location(route('saved-posts'))->with('message', 'Post deleted successfully');
        } else {
            Log::warning('Saved post with ID: ' . $postId . ' not found or already deleted for user ' . $user->id);
            return Inertia::location(route('saved-posts'))->with('message', 'Post not found or already deleted');
        }
    }
}