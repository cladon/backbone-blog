<?php

namespace App\Contracts\Auth;

interface LoginService {

    /**
     * Log the user in.
     *
     * @param array $credentials
     * @param bool $remember
     * @return mixed
     */
    public function login(array $credentials, $remember = false);

    /**
     * Log the user out.
     *
     * @return void
     */
    public function logout();

}