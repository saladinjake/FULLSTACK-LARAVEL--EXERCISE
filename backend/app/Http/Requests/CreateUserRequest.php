<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUserRequest extends FormRequest
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
            'email' => 'required|email|max:150|string|unique:users',
            'password' => 'required|min:6',
            'mobilePhone' => 'required|max:20|unique:users',
            'employeeId' => 'required|max:150|string',
            'avatar' => 'required|max:250|string',
            'roleType' => 'required|max:3',
            'superAdminPreviledges' => '',
            'adminPreviledges'=> '',
            'employeesPreviledges'=> '',
            'hrPreviledges'=> '',
            // 'account_type' => ['required', Rule::in($type)],
        ];
    }

    public function messages()
    {
        return [
            'password.regex' => 'Password should have a minimum of eight characters and at least one letter and one number',
            
        ];
    }
}
