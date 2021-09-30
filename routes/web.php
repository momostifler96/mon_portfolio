<?php

use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});
Route::get('/momo', function () {
    return view('momodevAdmin');
});
Route::get('/projet/{id}',[MailController::class,'selectprojet'])->name('selectprojet');
Route::get('/projetAll',[MailController::class,'projetAll'])->name('projetAll');

Route::post('/newMail',[MailController::class,'newMail'])->name('newmail');
Route::post('/newSite',[MailController::class,'newSite'])->name('newSite');