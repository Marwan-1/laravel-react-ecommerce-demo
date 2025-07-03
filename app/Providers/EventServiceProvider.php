<?php

namespace App\Providers;

// Add these use statements at the top
use App\Events\OrderPlaced;
use App\Listeners\SendAdminOrderNotification;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        // ... other default mappings

        OrderPlaced::class => [
            SendAdminOrderNotification::class,
        ],
    ];
    // ...
}