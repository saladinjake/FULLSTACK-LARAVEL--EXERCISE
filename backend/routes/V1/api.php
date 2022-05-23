<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/



Route::prefix('v1')->group(function () {
    Route::get('/', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });


    Route::get('/users', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });


    Route::get('/users/{id}/edit', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });

    Route::post('/users/{id}', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });


    Route::put('/users/{id}/edit', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });

    Route::delete('/users/{id}/delete', function () {
        return formatResponse(200, 'BINGHR API Homepage', true);
    });

});