<?php

namespace App\Services;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Config\Repository as Config;
use App\Contracts\Auth\LoginService as LoginContract;

class LoginService implements LoginContract
{
    /**
     * @var Guard
     */
    private $auth;

    /**
     * @var Config
     */
    private $config;

    public function __construct(Guard $guard, Config $config)
    {
        $this->auth = $guard;
        $this->config = $config;
    }

    /**
     * Log the user in.
     *
     * @param array $credentials
     * @param bool $remember
     * @return mixed
     */
    public function login(array $credentials, $remember = false)
    {
        foreach ($this->getIdentifiers() as $identifier)
        {
            if ($this->auth->attempt([$identifier => $credentials[$identifier], 'password' => $credentials['password']], $remember))
                return $this->auth->user();
        }

        return false;
    }

    /**
     * Get auth identifiers from config. If the config key does not exist, return email and username
     *
     * @return array
     */
    private function getIdentifiers()
    {
        return $this->config->get('auth.identifiers', ['email', 'username']);
    }

    /**
     * Log the user out.
     *
     * @return void
     */
    public function logout()
    {
        $this->auth->logout();
    }
}