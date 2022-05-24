<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('employeeId')->nullable();
            $table->string('firstname')->nullable();
            $table->string('username')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->unique();
            $table->string('mobilePhone')->nullable();
            $table->string('avatar')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('image_url')->nullable();
            $table->enum('category',['SUP','ADM','HRM','EMP','HOD'])->default('EMP');
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8','9','10'])->default('1');
            $table->boolean('first_time_login')->default('1');
            $table->rememberToken();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
