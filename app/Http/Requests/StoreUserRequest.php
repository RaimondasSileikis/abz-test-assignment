<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:60',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|regex:/^\+380\d{9}$/|unique:users,phone',
            'position_id' => 'required|integer|exists:positions,id',
            'photo' => 'required|image|mimes:jpeg,jpg|max:5120|dimensions:min_width=70,min_height=70',
        ];
    }

   
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        if ($errors->has('email') || $errors->has('phone')) {
            throw new HttpResponseException(
                response()->json([
                    'success' => false,
                    'message' => 'User with this phone or email already exists',
                ], 409)
            );
        }

        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'fails' => $errors,
            ], 422)
        );
    }
}
