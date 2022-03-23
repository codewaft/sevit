<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\Response;
use App\Services\Validation;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    protected $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    public function signIn(Request $request)
    {
        $rule = [
            "username" => "required|string|exists:users,username",
            "password" => "required|string",
        ];
        $error = Validation::validate($request, $rule);
        if ($error) {
            return Response::unprocessable($error);
        }
        $user = $this->user->getOneByUsername($request->username);
        if (!Hash::check($request->password, $user->password)) {
            return Response::unprocessable("Invalid credentials");
        }
        $response = ["token" => $user->createToken("auth")->plainTextToken];
        return Response::ok($response);
    }

    public function read()
    {
        $user = $this->user->get();
        return Response::ok($user);
    }
}
