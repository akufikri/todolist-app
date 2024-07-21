<?php

namespace Modules\Todo\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Modules\Todo\Models\Todo;
use Modules\Todo\Notifications\TodoNotif;
use Modules\User\Models\User;

class SendTodoNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $todo;
    protected $sharedByUser;
    protected $userToShareId;
    /**
     * Create a new job instance.
     */
    public function __construct(Todo $todo, User $sharedByUser, $userToShareId)
    {
        $this->todo = $todo;
        $this->sharedByUser = $sharedByUser;
        $this->userToShareId = $userToShareId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $userToShare = User::find($this->userToShareId);
        $userToShare->notify(new TodoNotif($this->todo, $this->sharedByUser));
    }
}
