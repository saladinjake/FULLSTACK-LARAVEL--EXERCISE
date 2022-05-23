<?php

namespace App\Services\V1;

use App\Models\User;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use jeremykenedy\LaravelRoles\Models\Role;

class UserProfileService extends BaseService
{

    public function fetchAll()
    {
        try {
            $profiles = User::all();
            $counter = $profile->count();
            if ($counter < 1) {
                return formatResponse(200, 'No users record', true, $profile);
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





}
