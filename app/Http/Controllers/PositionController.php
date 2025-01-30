<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {

        $positions = Position::select('id', 'name')->get();

        if ($positions->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Positions not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'positions' => $positions,
        ]);
    }
}
