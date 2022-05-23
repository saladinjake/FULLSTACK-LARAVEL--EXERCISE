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
        $instructorRole = config('roles.models.role')::where('name', '=', 'HrAdmin')->first();
        $hodRole = config('roles.models.role')::where('name', '=', 'Hod')->first();
        $userRole = config('roles.models.role')::where('name', '=', 'User')->first();
        $permissions = config('roles.models.permission')::all();
        $hodPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Department')->first();
        $adminPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Users')->first();
        $userPerm = config('roles.models.permission')::where('name', '=', 'Can View History')->first();
        $coursePerm = config('roles.models.permission')::where('name', '=', 'Can Manage History')->first();
        $programPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Programs')->first();

        /*
         * Add Users
         *
         */
        if (config('roles.models.defaultUser')::where('email', '=', 'superadmin@binghr.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'username' => 'Superuser',
                'firstname'     => 'Binghr',
                'lastname'     => 'Superadmin',
                'email'    => 'superadmin@binghr.org',
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

        if (config('roles.models.defaultUser')::where('email', '=', 'admin@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Binghr',
                'lastname'     => 'Admin',
                'email'    => 'admin@binghr.org',
                'mobilePhone' => '07000004278',
                'password' => bcrypt('password'),
                'category' => 'ADM',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($adminRole);
            $newUser->attachPermission($adminPerm);
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'instructor@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'Hr',
                'lastname'     => 'Guy',
                'email'    => 'hr@binghr.org',
                'mobilePhone' => '08130870416',
                'password' => bcrypt('password'),
                'category' => 'HRM',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($instructorRole);
            $newUser->attachPermission($coursePerm);
            $newUser->attachPermission($programPerm);
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'hod@bnghr.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'HOD',
                'lastname'     => 'Guy',
                'email'    => 'hod@binghr.org',
                'mobilePhone' => '07038797386',
                'password' => bcrypt('password'),
                'category' => 'HOD',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($hodRole);
            $newUser->attachPermission($hodPerm);
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'user@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'firstname'     => 'User',
                'lastname'     => 'Guy',
                'email'    => 'user@binghr.com',
                'mobilePhone' => '07038797386',
                'password' => bcrypt('password'),
                'category' => 'EMP',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($userRole);
            $newUser->attachPermission($userPerm);
        }
    }
}
