<?php

namespace Modules\Todo\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\Todo\Models\Todo;
use Modules\User\Models\User;

class TodoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return true;
    }
    public function view(User $user, Todo $todo)
    {
        return $user->id === $todo->created_by;
    }
    public function create(User $user)
    {
        return true;
    }
    public function update(User $user, Todo $todo)
    {
        return $user->id === $todo->created_by;
    }
    public function delete(User $user, Todo $todo)
    {
        return $user->id === $todo->created_by;
    }
    public function share(User $user, Todo $todo)
    {
        return $user->id === $todo->created_by;
    }
    public function getSharedTodo(User $user)
    {
        return true;
    }
}
