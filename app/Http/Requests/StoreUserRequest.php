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
            'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'phone' => 'required|string|regex:/^[\+]{0,1}380([0-9]{9})$/',
            'position_id' => 'required|integer|exists:positions,id',
            'photo' => 'required|image|mimes:jpeg,jpg|max:5120|dimensions:min_width=70,min_height=70',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.min' => 'The name must be at least 2 characters.',
            'name.max' => 'The name must not exceed 60 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'phone.required' => 'The phone field is required.',
            'phone.regex' => 'The phone must start with +380 and be 12 digits long.',
            'position_id.required' => 'The position id field is required.',
            'position_id.integer' => 'The position id must be an integer.',
            'position_id.exists' => 'The selected position id is invalid.',
            'photo.required' => 'The photo field is required.',
            'photo.image' => 'The photo must be an image.',
            'photo.mimes' => 'The photo must be a jpeg or jpg file.',
            'photo.max' => 'The photo may not be greater than 5 MB.',
            'photo.dimensions' => 'The photo must be at least 70x70 pixels.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'fails' => $validator->errors(),
            ], 422)
        );
    }
}
