<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'username' => 'muukrls',
            'email'    => 'test@email.com',
            'password' => Hash::make('password')
        ]);
    }
}