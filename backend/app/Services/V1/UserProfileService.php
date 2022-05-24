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
use App\Http\Requests\UpdateUserRequest;
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
                    
             'password' => bcrypt($input['password']),

             'firstname' =>ucwords($input['firstname']),
             'lastname'=> ucwords($input['lastname']),
             'email'=> $input['email'],
        
             'mobilePhone'=> $input['mobilePhone'],
             'employeeId'=> $input['employeeId'],
             'category' =>$input['roleType'],
             'avatar'=> $input['avatar'],
        // // 'superAdminPreviledges' => $input['mobilePhone'],
        // // 'adminPreviledges' => $input['mobilePhone'],
        // // 'employeesPreviledges' => $input['mobilePhone'],
        // // 'hrPreviledges' => $input['mobilePhone'],
        ]);
               $rolePlayingGames = interpreteUserCategory(ucwords($input['roleType']));
                $role = Role::where('name', '=', $rolePlayingGames)->first();
                $user->attachRole($role);
                

                
        });

            $user_roles = $user->roles;

            $success['firstname'] = $user->firstname;
            $success['lastname'] = $user->lastname;
            $success['email'] = $user->email;
            $success['mobilePhone'] = $user->mobilePhone;
            $success['roles'] = $user_roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);
           
          // removed access token since this is a free api access
            // $success['token'] = $user->createToken('Personal Access Token')->accessToken;

            return formatResponse(201, 'Learner Account Created Successfully.', true, $success);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update(UpdateUserRequest $request, $id){
      $user = User::where('id', $id)->first();
        if(!$user) {
          return response()->json([
              'success' => false,
              'message' => 'User  does not exist.',
          ], 404);
        }

         $input = $request->validated();


       if(isset($input["password"])) {
        $user->password = Hash::make($input['password']);
       }

     $user->firstname = ucwords($input['firstname']);
      $user->lastname=  ucwords($input['lastname']);
    $user->email = $input['email'];
    
    $user->mobilePhone = $input['mobilePhone'];
    $user->employeeId = $input['employeeId'];
    $user->category  =$input['roleType'];
    $user->avatar = $input['avatar'];
      try {

    $user->save();
             

    $rolePlayingGames = interpreteUserCategory(ucwords($input['roleType']));
                $role = Role::where('name', '=', $rolePlayingGames)->first();
                $user->attachRole($role);

            return response()->json([
                'success' => true,
                'message' => 'Profile  has been updated successfully',
            ], 200);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    
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
