<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class IndexUserRequest extends FormRequest
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
    public function rules()
    {
        return [
            'count' => 'required|integer|min:1',
            'page' => 'required|integer|min:1',
        ];
    }
    
    public function messages()
    {
        return [
            'count.required' => 'The count parameter is required.',
            'count.integer' => 'The count must be an integer.',
            'count.min' => 'The count must be at least 1.',
            'page.required' => 'The page parameter is required.',
            'page.integer' => 'The page must be an integer.',
            'page.min' => 'The page must be at least 1.',
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
