<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;
// use Cache;

class ProductController extends Controller
{
    /**
     * Display a listing of the products with filtering, pagination, and caching.
     */
    public function index(Request $request)
    {
        // Build a unique cache key based on query parameters
        $queryParams = http_build_query($request->query());
        $cacheKey = 'products.index.' . $queryParams;

        // Cache for 1 hour (3600 seconds)
        return Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = Product::query();

            // 1. Filtering by name
            $query->when($request->filled('name'), function ($q) use ($request) {
                return $q->where('name', 'like', '%' . $request->name . '%');
            });

            // 2. Filtering by category
            $query->when($request->filled('category'), function ($q) use ($request) {
                return $q->where('category', $request->category);
            });

            // 3. Filtering by price range
            $query->when($request->filled('min_price'), function ($q) use ($request) {
                return $q->where('price', '>=', $request->min_price);
            });

            $query->when($request->filled('max_price'), function ($q) use ($request) {
                return $q->where('price', '<=', $request->max_price);
            });

            // 4. Pagination
            return $query->paginate(10);
        });
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'required|string|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validation for the image
        ]);

        // Handle the file upload
        if ($request->hasFile('image')) {
            // Store the image in 'storage/app/public/products'
            // The 'public' disk is configured in config/filesystems.php
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product = Product::create($validated);
        
        // When a new product is added, clear the product cache
        Cache::flush();

        return response()->json($product, 201);
    }

    
}