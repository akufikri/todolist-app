<?php

namespace Modules\Todo\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Modules\Todo\Models\Todo;

class TodoNotif extends Notification implements ShouldQueue
{
    use Queueable;

    protected $todo;
    protected $sharedByUser;

    public function __construct(Todo $todo, $sharedByUser)
    {
        $this->todo = $todo;
        $this->sharedByUser = $sharedByUser;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Todo Shared With You')
            ->line($this->sharedByUser->name . ' has shared a todo with you.')
            ->line('Todo Title: ' . $this->todo->title)
            ->line('Todo Description: ' . $this->todo->description)
            ->action('View Todo', url('http://localhost:5173'))
            ->line('Thank you for using our application!');
    }

    public function toArray($notifiable): array
    {
        return [
            'todo_id' => $this->todo->id,
            'shared_by' => $this->sharedByUser->id,
        ];
    }
}
