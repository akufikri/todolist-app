<?php

namespace Modules\Todo\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\User\Models\User;

class ShareTodo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['todo_id', 'user_id', 'shareable_type', 'shareable_id'];

    public function shareable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function todo()
    {
        return $this->belongsTo(Todo::class, 'todo_id');
    }
}
