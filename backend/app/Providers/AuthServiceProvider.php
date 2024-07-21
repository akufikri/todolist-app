<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Todo\Models\Todo;
use Illuminate\Support\Facades\Gate;
use Modules\Todo\Policies\TodoPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        Gate::policy(Todo::class, TodoPolicy::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
