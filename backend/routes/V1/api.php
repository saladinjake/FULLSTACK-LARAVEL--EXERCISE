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
        return formatResponse(200, 'API Homepage', true);
    });

    
});
