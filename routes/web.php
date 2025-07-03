<?php

use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

// This route will match any path and serve the React app.
// React Router will then handle the specific frontend route.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');



// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
