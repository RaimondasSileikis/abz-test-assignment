<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexUserRequest;
use App\Http\Requests\ShowUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index(IndexUserRequest $request)
    {

        $perPage = $request->input('count', 5);
        $page = $request->input('page', 1);

        $users = User::orderBy('id', 'asc')
            ->paginate($perPage, ['*'], 'page', $page);

        if ($users->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'page' => $users->currentPage(),
            'total_pages' => $users->lastPage(),
            'total_users' => $users->total(),
            'count' => $users->count(),
            'links' => [
                'next_url' => $users->nextPageUrl(),
                'prev_url' => $users->previousPageUrl(),
            ],
            'users' => UserResource::collection($users),
        ]);
    }

    public function show($userId)
    {

        if (!is_numeric($userId)) {
            return response()->json([
                'success' => false,
                'message' => 'The user id must be an integer',
            ], 400);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'user' => new UserResource($user),
        ], 200);
    }


    public function store(StoreUserRequest $request)
    {

        $photoPath = $request->file('photo')->store('photos', 'public');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'position_id' => $request->position_id,
            'photo' => $photoPath,
        ]);

        return response()->json([
            'success' => true,
            'user_id' => $user->id,
            'message' => 'New user successfully registered',
        ], 201);
    }


    public function getToken()
    {

        $user = User::latest()->first();

        if (!$user) {
            $user = User::create([
                'name' => 'Token Generator',
                'email' => 'token@generator.com',
            ]);
        };

        $token = JWTAuth::fromUser($user);

        User::where('email', 'token@generator.com')->delete();

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user
        ]);
    }
}
