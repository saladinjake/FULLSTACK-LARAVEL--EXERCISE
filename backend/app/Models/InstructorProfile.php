<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class InstructorProfile extends BaseModel
{
    use HasFactory, SoftDeletes, MediaAlly;

    protected $fillable = [
        'user_id', 'gender', 'date_of_birth', 'country_id', 'category_id', 'brief_introduction', 'detailed_introduction', 'employment_status',
        'marital_status', 'industry_id', 'experience_level', 'education_level', 'degree_obtained', 'language', 'facebook_url', 'linkedin_url', 'twitter_url',
        'current_employer_name', 'current_employer_designation', 'previous_employer_name', 'previous_employer_designation', 'previous_institutions', 'niche_courses', 'other_info', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
         'user_id', 'id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function bundles()
    {
        return $this->hasMany(Bundle::class);
    }

}
