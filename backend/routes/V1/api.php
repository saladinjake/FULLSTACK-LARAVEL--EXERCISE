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
  Route::get('users', 'UsersController@index');
  Route::get('users/{id}/edit', 'UsersController@show');
  Route::post('users', 'UsersController@store');
  Route::put('users/{id}/edit', 'UsersController@update');
  Route::delete('users/{id}/delete','UsersController@destroy');
});