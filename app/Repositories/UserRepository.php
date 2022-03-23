<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function get()
    {
        return User::first();
    }

    public function getOneByUsername($username)
    {
        return User::whereUsername($username)->first();
    }
}
