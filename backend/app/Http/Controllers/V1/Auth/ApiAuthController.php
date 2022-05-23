<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;


class ApiAuthController extends Controller
{
 
    /**
     * Maximum attempts
     * User limited to 5 login attempts at a time.
     */
    protected $maxAttempts = 5;

    /**
     * Lock Timeout
     * Account lock times out after 10 minutes.
     */
    protected $decayMinutes = 10;

    
    public function username()
    {
        return 'email';
    }

    public function login(Request $request)
    {
    
    }

    public function register(CreateLearnerRequest $request)
    {
    
    }

    
}
