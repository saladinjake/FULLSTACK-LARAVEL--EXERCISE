<?php

    function interpreteUserCategory($status)
    {
        
        if ($status == 'SUP') {
            return 'SuperAdmin';
        } elseif ($status == 'ADM') {
            return 'Admin';
        } elseif ($status == 'EMP') {
            return 'Employee';
        } elseif ($status == 'HRM') {
            return 'HrAdmin';
        } elseif ($status == 'HOD') {
            return 'Hod';
        
        } elseif ($status == 'TML') {
            return 'TeamLead';
        
        }elseif ($status == 'TMM') {
            return 'TeamMember';
        
        }elseif ($status == 'DEV') {
            return 'Developer';
        
        }else {
            return 'Unassigned';
        }
    }

    function getRoleUsers($roleId)
    {
        $queryRolesPivot = DB::table(config('roles.roleUserTable'));
        $users = [];
        if ($roleId) {
            $queryRolesPivot->where('role_id', '=', $roleId);
        }
        $pivots = $queryRolesPivot->get();
        if ($pivots->count() > 0) {
            foreach ($pivots as $pivot) {
                $users[] = $this->getUser($pivot->user_id);
            }
        }
        return $users;
    }

    function twoDecimalPlace($value)
    {
        $convert = number_format($value, 2);
        return $convert;
    }

?>
