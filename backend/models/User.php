<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifyEmailNotification;
use CloudinaryLabs\CloudinaryLaravel\MediaAlly; // for profile upload field
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasRoleAndPermission,
        HasApiTokens, 
        MediaAlly;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->connection = env('APP_ENV') === 'testing' ? 'mysql_test' : env('DB_CONNECTION');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'firstname',  'lastname', 'email', 'mobilePhone', 'password', 'status', 'image_url', 'category',
    ];

    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'status',
        'category',
        'first_time_login', 'email_verified_at',
        'created_at', 'updated_at', 'deleted_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * Accessor.
     *
     * @param string $firstName
     * @return string
     */
    public function getFirstNameAttribute($firstName)
    {
        return ucfirst($firstName);
    }

    /**
     * Accessor.
     *
     * @param string $lastName
     * @return string
     */
    public function getLastNameAttribute($lastName)
    {
        return ucfirst($lastName);
    }

 
    
}
