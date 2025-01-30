<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Tinify\Tinify;
use Tymon\JWTAuth\Facades\JWTAuth;

require_once base_path('vendor/autoload.php');

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

        $photo = $request->file('photo');

        Tinify::setKey(env('TINYPNG_API_KEY'));

        $sourceData = file_get_contents($photo->getRealPath());
        $optimizedImage = \Tinify\fromBuffer($sourceData)->resize([
            "method" => "cover",
            "width" => 70,
            "height" => 70
        ])->toBuffer();

        $filename =  Str::random(2) . uniqid() . '.jpeg';
        Storage::disk('public')->put("images/users/{$filename}", $optimizedImage);

        $photoUrl = URL::to(Storage::url("images/users/{$filename}"));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'position_id' => $request->position_id,
            'photo' => $photoUrl,
        ]);

        return response()->json([
            'success' => true,
            'user_id' => $user->id,
            'message' => 'New user successfully registered',
            'photo' => $photoUrl
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
