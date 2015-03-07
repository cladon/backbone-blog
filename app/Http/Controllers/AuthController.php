<?php namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Contracts\Auth\LoginService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * @var LoginService
     */
    private $auth;

    /**
     * @param LoginService $auth
     */
    public function __construct(LoginService $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle a login request.
     *
     * @param AuthRequest $request
     * @return Response
     */
    public function postLogin(AuthRequest $request)
    {
        $user = $this->auth->login($request->except('remember'), $request->has('remember'));

        if (!$user)
            return response()->json('Unauthorized', 401);

        return response()->json(['user' => $user->toArray()]);
    }

    /**
     * Check if the user is logged in.
     *
     * @param Request $request
     * @return Response
     */
    public function checkLogin(Request $request)
    {
        $user = $request->user();
        if ($user == null)
            return response()->json('Unauthorized', 401);

        return response()->json($user);
    }

    public function logout()
    {
        $this->auth->logout();

        return response()->json('', 204);
    }
}
