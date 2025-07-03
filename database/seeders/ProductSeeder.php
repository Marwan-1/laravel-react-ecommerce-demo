<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Product::factory()->count(50)->create();

         $products = [
            [
                'name' => 'Gradient Graphic T-shirt',
                'description' => 'A stylish t-shirt with a vibrant gradient design, perfect for a casual look.',
                'image' => 'products/gradient-t-shirt.jpg', // Path to your image in storage/app/public/
                'price' => 145.00,
                'stock' => 25,
                'category' => 'T-shirts',
            ],
            [
                'name' => 'Sleeve Striped T-shirt',
                'description' => 'An orange t-shirt with distinctive striped detailing on the sleeves.',
                'image' => 'products/orange-sleeve-shirt.jpg',
                'price' => 130.00,
                'stock' => 28,
                'category' => 'T-shirts',
            ],
            [
                'name' => 'Skinny Fit Jeans',
                'description' => 'Comfortable and stylish skinny fit jeans, a wardrobe essential.',
                'image' => 'products/skinny-jeans.jpg',
                'price' => 240.00,
                'stock' => 15,
                'category' => 'Jeans',
            ],
            [
                'name' => 'Checkered Shirt',
                'description' => 'A classic red and black checkered flannel shirt for a rugged, timeless look.',
                'image' => 'products/checkered-shirt.jpg',
                'price' => 180.00,
                'stock' => 22,
                'category' => 'Shirts',
            ],
            
            [
                'name' => 'Black Striped T-shirt',
                'description' => 'A bold black and white striped t-shirt for a modern, monochrome style.',
                'image' => 'products/striped-t-shirt.jpg',
                'price' => 120.00,
                'stock' => 30,
                'category' => 'T-shirts',
            ],
             [
                'name' => 'Polo with Tipping Details',
                'description' => 'Classic polo shirt in red with tipping details on the collar and cuffs.',
                'image' => 'products/red-polo.jpg',
                'price' => 180.00,
                'stock' => 18,
                'category' => 'Polo',
            ],
        ];

        foreach ($products as $productData) {
            // Use updateOrCreate to avoid duplicates. It will find a product
            // with the same name or create a new one if it doesn't exist.
            Product::updateOrCreate(['name' => $productData['name']], $productData);
        }
    }
}
