<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{ 
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total_cost',
    ];



    public function products() {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
