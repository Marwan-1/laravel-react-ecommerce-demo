<?php

namespace App\Observers;

use App\Models\Product;
use Cache;

class ProductObserver
{
    public function saved(Product $product): void
    {
        // This clears all cache starting with 'products.index.'
        Cache::flush(); 
    }

    public function deleted(Product $product): void
    {
        Cache::flush();
    }
}
