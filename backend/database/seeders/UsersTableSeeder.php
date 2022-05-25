<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminRole = config('roles.models.role')::where('name', '=', 'SuperAdmin')->first();
        $adminRole = config('roles.models.role')::where('name', '=', 'Admin')->first();
        $hrRole = config('roles.models.role')::where('name', '=', 'HrAdmin')->first();
        $userRole = config('roles.models.role')::where('name', '=', 'Employee')->first();

        $permissions = config('roles.models.permission')::all();

        $hrPerm = config('roles.models.permission')::where('name', '=', 'Can Manage HR Department')->first();

        $adminPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Users')->first();
        $userPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Employee')->first();

        $guestPerm = config('roles.models.permission')::where('name', '=', 'Can Manage MyRecord')->first();
       
        /*
         * Add Users
         *
         */
        if (config('roles.models.defaultUser')::where('email', '=', 'superadmin@binghr.io')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'username' => 'Superuser',
                'firstname'     => 'Binghr',
                'lastname'     => 'Superadmin',
                'email'    => 'superadmin@binghr.io',
                'mobilePhone' => '07000004278',
                'password' => bcrypt('secret'),
                'category' => 'SUP',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($superAdminRole);
            foreach ($permissions as $permission) {
                $newUser->attachPermission($permission);
            }
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'admin@binghr.io')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Binghr',
                'lastname'     => 'Admin',
                'email'    => 'admin@binghr.io',
                'mobilePhone' => '07000004278',
                'password' => bcrypt('password'),
                'category' => 'ADM',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($adminRole);
            $newUser->attachPermission($adminPerm);
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'hr@binghr.io')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Hr',
                'lastname'     => 'Guy',
                'email'    => 'hr@binghr.io',
                'mobilePhone' => '08130870416',
                'password' => bcrypt('password'),
                'category' => 'HRM',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($hrRole);
            $newUser->attachPermission($userPerm);
            
        }


        if (config('roles.models.defaultUser')::where('email', '=', 'employee@binghr.io')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Jake',
                'lastname'     => 'Saladin',
                'email'    => 'employee@binghr.io',
                'mobilePhone' => '07038797386',
                'password' => bcrypt('password'),
                'category' => 'EMP',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($userRole);
            $newUser->attachPermission( $guestPerm);
        }
    }
}
