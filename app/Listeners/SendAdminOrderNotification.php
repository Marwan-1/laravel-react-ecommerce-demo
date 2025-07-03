<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Log;

class SendAdminOrderNotification
{
    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event): void
    {
        // For the test, we simply log the information.
        // In a real application, this is where you would dispatch a Mailable.
        Log::info("Order Placed: A new order (#{$event->order->id}) has been created by user #{$event->order->user_id}.");
    }
}