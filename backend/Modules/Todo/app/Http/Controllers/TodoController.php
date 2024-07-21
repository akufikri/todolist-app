<?php

namespace Modules\Todo\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Todo\Jobs\SendTodoNotification;
use Modules\Todo\Models\ShareTodo;
use Modules\Todo\Models\Todo;
use Modules\Todo\Notifications\TodoNotif;
use Modules\Todo\Services\ValidationService;
use Illuminate\Support\Facades\Gate;
use Modules\User\Models\User;

class TodoController extends Controller
{
    protected $TodoValidation;

    public function __construct(ValidationService $TodoValidation)
    {
        $this->TodoValidation = $TodoValidation;
    }

    public function set(Request $request)
    {
        try {
            $this->TodoValidation->validate($request);

            $data = $request->only(['title', 'description', 'parent_id']);

            if (isset($data['parent_id'])) {
                $parentTodo = Todo::findOrFail($data['parent_id']);
                $todo = $parentTodo->children()->create($data);
            } else {
                $todo = Todo::create($data);
            }

            return response()->json([
                'message' => 'Todo created successfully',
                'data' => $todo
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function get()
    {
        $user = Auth::user();
        $todos = Todo::where('created_by', $user->id)
            ->defaultOrder()
            ->get()
            ->toTree();

        return response()->json($todos);
    }

    public function single($id)
    {
        $todo = Todo::with(['ancestors', 'descendants'])->findOrFail($id);

        Gate::authorize('view', $todo);

        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        Gate::authorize('update', $todo);

        $this->TodoValidation->validate($request);

        $data = $request->only(['title', 'description', 'parent_id']);

        if (isset($data['parent_id']) && $data['parent_id'] != $todo->parent_id) {
            $newParent = Todo::findOrFail($data['parent_id']);
            $todo->appendToNode($newParent)->save();
        }

        $todo->update($data);

        return response()->json([
            'message' => 'Todo updated successfully',
            'data' => $todo
        ], 200);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        Gate::authorize('delete', $todo);
        ShareTodo::where('todo_id', $id)->delete();
        $todo->delete(); // This will also delete all descendants

        return response()->json([
            'message' => 'Todo and all related shared todos deleted successfully'
        ], 200);
    }

    public function shareTodo(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $email = $request->input('email');
        $userToShare = User::where('email', $email)->firstOrFail();

        $todo = Todo::findOrFail($id);
        $user = Auth::user();

        Gate::authorize('share', $todo);

        $todo->sharedUsers()->attach($userToShare->id, [
            'shareable_id' => $todo->id,
            'shareable_type' => Todo::class
        ]);

        SendTodoNotification::dispatch($todo, $user, $userToShare->id);

        return response()->json([
            'message' => 'Todo shared successfully and notification queued'
        ], 200);
    }

    public function getSharedTodo()
    {
        try {
            $user = Auth::user();

            $sharedTodos = ShareTodo::where('user_id', $user->id)
                ->with(['todo', 'user'])
                ->latest()
                ->get();

            return response()->json($sharedTodos);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching shared todos',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
