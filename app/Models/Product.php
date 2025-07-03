<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image', 
        'price',
        'stock',
        'category',
    ];

    /**
     * The accessors to append to the model's array form.
     * This makes 'image_url' automatically appear in the JSON response.
     *
     * @var array
     */
    protected $appends = ['image_url'];

    /**
     * Get the full URL for the product's image.
     * This is an "Accessor" in Laravel.
     *
     * @return string|null
     */
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            // Storage::url() generates the correct public URL for the file
            return Storage::url($this->image);
        }
        return null;
    }

    public function orders() {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }
}
