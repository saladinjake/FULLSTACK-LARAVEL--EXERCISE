<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
         //change to true if login is required
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'firstname' => 'required|max:150|string',
            'lastname' => 'required|max:150|string',
            'email' => 'required|email|max:150|string',
            'password' => '',
            'mobilePhone' => 'required|max:20',
            'employeeId' => 'required|max:150|string',
            'avatar' => 'required|max:250|string',
            'roleType' => 'required|max:3'
            // 'account_type' => ['required', Rule::in($type)],
        ];
    }

    public function messages()
    {
        return [
            
            
        ];
    }
}
