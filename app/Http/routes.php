<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::group(['prefix' => 'api/v1'], function()
{
    Route::group(['prefix' => 'auth'], function()
    {
        Route::post('login', 'AuthController@postLogin');
        Route::get('login', 'AuthController@checkLogin');
        Route::post('logout', 'AuthController@logout');
    });

    Route::resource('posts', 'PostsController');
});
