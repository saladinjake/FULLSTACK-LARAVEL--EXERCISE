<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permission Types
         *
         */
        $Permissionitems = [
           //employee or user
            [
                'name'        => 'Can View Users',
                'slug'        => 'view.users',
                'description' => 'Can view users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Users',
                'slug'        => 'create.users',
                'description' => 'Can create new users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Users',
                'slug'        => 'edit.users',
                'description' => 'Can edit users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Users',
                'slug'        => 'delete.users',
                'description' => 'Can delete users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Users',
                'slug'        => 'can.manage.users',
                'description' => 'Allows for the creation, enabling and disabling of users in the client company',
                'model'       => 'Permission',
            ],

            




      //hr's


            [
                'name'        => 'Can View HR Department',
                'slug'        => 'view.hr',
                'description' => 'Can view hr',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create HR Department',
                'slug'        => 'create.hr',
                'description' => 'Can create new hr',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit HR Department',
                'slug'        => 'edit.hr',
                'description' => 'Can edit hr',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete HR Department',
                'slug'        => 'delete.hr',
                'description' => 'Can delete hr',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage HR Department',
                'slug'        => 'can.manage.hr',
                'description' => 'Allows for the creation, enabling and disabling of hr in the client company',
                'model'       => 'Permission',
            ],



            //admin
            [
                'name'        => 'Can View Admin',
                'slug'        => 'view.admin',
                'description' => 'Can view admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Admin',
                'slug'        => 'create.admin',
                'description' => 'Can create new admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Admin',
                'slug'        => 'edit.admin',
                'description' => 'Can edit admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Admin',
                'slug'        => 'delete.admin',
                'description' => 'Can delete admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Admin',
                'slug'        => 'can.manage.admin',
                'description' => 'Allows for the creation, enabling and disabling of admin in the client company',
                'model'       => 'Permission',
            ],







            //admin
            [
                'name'        => 'Can View SuperAdmin',
                'slug'        => 'view.superadmin',
                'description' => 'Can view super admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create SuperAdmin',
                'slug'        => 'create.superadmin',
                'description' => 'Can create new superadmin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit SuperAdmin',
                'slug'        => 'edit.superadmin',
                'description' => 'Can edit superadmin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete SuperAdmin',
                'slug'        => 'delete.superadmin',
                'description' => 'Can delete superadmin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage SuperAdmin',
                'slug'        => 'can.manage.superadmin',
                'description' => 'Allows for the creation, enabling and disabling of superadmin in the client company',
                'model'       => 'Permission',
            ],




        ];
        /*
         * Add Permission Items
         *
         */
        foreach ($Permissionitems as $Permissionitem) {
            $newPermissionitem = config('roles.models.permission')::where('slug', '=', $Permissionitem['slug'])->first();
            if ($newPermissionitem === null) {
                $newPermissionitem = config('roles.models.permission')::create([
                    'name'          => $Permissionitem['name'],
                    'slug'          => $Permissionitem['slug'],
                    'description'   => $Permissionitem['description'],
                    'model'         => $Permissionitem['model'],
                ]);
            }
        }
    }
}
