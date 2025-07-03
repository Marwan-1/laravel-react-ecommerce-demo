<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Product;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * We'll return true since authorization is handled by the 'auth:sanctum' middleware on the route.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
             // The request must contain a 'products' array.
            'products' => 'required|array',

            // The following rules apply to each item within the 'products' array.
            'products.*.product_id' => [
                'required',
                'integer',
                // The product_id must exist in the 'products' table.
                Rule::exists('products', 'id'),
            ],
            'products.*.quantity' => [
                'required',
                'integer',
                'min:1', // Must order at least 1 item.
                // Custom validation rule to check for sufficient stock.
                function ($attribute, $value, $fail) {
                    // The attribute name is like 'products.0.quantity'. We extract the index '0'.
                    $index = explode('.', $attribute)[1];
                    // Using the index, we get the corresponding product_id from the input.
                    $productId = $this->input("products.{$index}.product_id");

                    // Only run the check if a product_id was provided.
                    if ($productId) {
                        $product = Product::find($productId);
                        // If the requested quantity exceeds the stock, fail validation.
                        if ($product && $product->stock < $value) {
                            $fail("Only {$product->stock} units of {$product->name} are available.");
                        }
                    }
                },
            ],
        ];
    }
}