<?php

namespace App\Http\Controllers\Api;

use App\Events\OrderPlaced;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;




class OrderController extends Controller
{
        use AuthorizesRequests;


     /**
     * Store a newly created order in storage.
     * The StoreOrderRequest handles all validation.
     */
    public function store(StoreOrderRequest $request)
    {
        // We use a database transaction to ensure that if any step fails
        // (e.g., stock update), the entire operation is rolled back.
        $order = DB::transaction(function () use ($request) {
            $validated = $request->validated();
            
            // 1. Calculate the total cost and prepare data for attaching.
            $totalCost = 0;
            $productsToAttach = [];
            
            // Find all products in a single query for efficiency.
            $productsInOrder = Product::find(collect($validated['products'])->pluck('product_id'));

            foreach ($validated['products'] as $item) {
                $product = $productsInOrder->find($item['product_id']);
                
                // Add the item's cost to the total.
                $totalCost += $product->price * $item['quantity'];

                // 2. Decrement the stock for the purchased product.
                $product->decrement('stock', $item['quantity']);

                // Prepare the data for the pivot table.
                $productsToAttach[$item['product_id']] = ['quantity' => $item['quantity']];
            }

            // 3. Create the order for the currently authenticated user.
            $order = $request->user()->orders()->create([
                'total_cost' => $totalCost,
            ]);

            // 4. Attach the products to the order using the many-to-many relationship.
            $order->products()->attach($productsToAttach);

            // 5. Fire the 'OrderPlaced' event.
            OrderPlaced::dispatch($order);

            return $order;
        });

        // Return the newly created order with its products, with a 201 Created status.
        return response()->json($order->load('products'), 201);
    }

    /**
     * Display the specified order.
     */
    public function show($id)
    {

        $order = Order::findOrFail($id);

        $this->authorize('view', $order);

        // Eager load the related products and return the order as JSON.
        return response()->json($order->load('products'));
    }
}