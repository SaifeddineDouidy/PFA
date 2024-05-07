<?php

namespace App\Observers;

use App\Models\Applications;
use App\Models\Notifications;

class ApplicationObserver
{
    /**
     * Handle the Application "updated" event.
     */
    public function updated(Applications $application)
    {
        if ($application->isDirty('status') && in_array($application->status, ['accepted', 'refused'])) {
            // Create a notification for the user who submitted the application
            Notifications::create([
                'user_id' => $application->user_id,
                'application_id' => $application->id,
                'message' => 'Your application has been ' . $application->status,
            ]);
        }
    }
}