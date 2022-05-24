<?php

namespace App\Services\V1;

use App\Models\User;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\CreateUserRequest;
use jeremykenedy\LaravelRoles\Models\Role;

class UserProfileService extends BaseService
{

    public function fetchAll()
    {
        try {
            $profiles = User::all();
            $counter = $profiles->count();
            if ($counter < 1) {
                return formatResponse(200, 'No users record', true, $profiles);
            } else {
                
                return formatResponse(200, 'Users profile(s) retrieved successfully', true, $profiles);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            $user = User::where(['id' => $id])->first();
            if (! $user) {
                return formatResponse(404, 'User doesn\'t exist!', false);
            } elseif (! $user->hasRole('user')) {
                return formatResponse(404, 'Provided user not found', false);
            } else {

                $profile = User::where('id', $id)->first();

                

                return formatResponse(200, 'user profile retrieved successfully', true, $profile);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {
            $check = User::where('id', $id)->first();
            if (! $check) {
                return formatResponse(404, 'User does not exist.', false);
            } else {
                $user = User::where('id', $id)->first();
                $user->delete($id);

                return formatResponse(200, 'User account deleted successfully.', true);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }



    public function create(CreateUserRequest $request)
    {
        try {
            $input = $request->validated();

            DB::transaction(function () use ($input, &$user) {
                $user = User::create([
                    'firstname' => ucwords($input['firstname']),
                    'lastname' => ucwords($input['lastname']),
                    'mobilePhone' => $input['mobilePhone'],
                    'email' => $input['email'],
                    'password' => bcrypt($input['password'])
                ]);

                $role = Role::where('name', '=', ucwords($input['role']))->first();
                $user->attachRole($role);
                

                
            });

            $user_roles = $user->roles;

            $success['firstname'] = $user->firstname;
            $success['lastname'] = $user->lastname;
            $success['email'] = $user->email;
            $success['mobilePhone'] = $user->mobilePhone;
            $success['roles'] = $user_roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);
            $success['token'] = $user->createToken('Personal Access Token')->accessToken;

            return formatResponse(201, 'Learner Account Created Successfully.', true, $success);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update(CreateUserRequest $request, $id){

    }


    
    public function getUser($id)
    {
        $user = User::where(['id' => $id])->first();

        return $user;
    }

    public function getRole($role)
    {
        $userRole = config('roles.models.role')::where('name', '=', $role)->pluck('id');
    }

    
    public function aRole($user) {
      return Role::where('name', '=', $user)->first();
    }


    public function fetchMany($begin, $perPage, $sortBy, $sortDirection){}





}
