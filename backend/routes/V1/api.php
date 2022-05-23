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
  Route::get('/users', 'UserController@index');
  Route::get('/users/{id}/edit', 'UserController@show');
  Route::post('/users/{id}', 'UserController@store');
  Route::put('/users/{id}/edit', 'UserController@update');
  Route::delete('/users/{id}/delete','UserController@destroy' )
});