<?php

namespace Modules\Todo\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Todo\Database\Factories\TodoFactory;
use Modules\User\Models\User;
use Sqits\UserStamps\Concerns\HasUserStamps as UserStamps;
use Kalnoy\Nestedset\NodeTrait;

class Todo extends Model
{
    use HasFactory, SoftDeletes, UserStamps, NodeTrait;

    protected $fillable = [
        'title',
        'description',
        'parent_id'
    ];

    public $table = 'todos';

    protected $dates = [
        'start_date',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function sharedUsers()
    {
        return $this->morphToMany(User::class, 'shareable', 'share_todos', 'todo_id', 'user_id');
    }

    // Tambahkan metode untuk mendapatkan children
    public function children()
    {
        return $this->hasMany(Todo::class, 'parent_id');
    }

    // Tambahkan metode untuk mendapatkan parent
    public function parent()
    {
        return $this->belongsTo(Todo::class, 'parent_id');
    }
}
