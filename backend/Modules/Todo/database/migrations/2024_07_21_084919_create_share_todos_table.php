<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('share_todos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('todo_id');
            $table->unsignedBigInteger('user_id');
            $table->string('shareable_type');
            $table->unsignedBigInteger('shareable_id');
            $table->softDeletes();
            $table->timestamps();

            // Add foreign keys
            $table->foreign('todo_id')->references('id')->on('todos')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Add indexes
            $table->index(['shareable_type', 'shareable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('share_todos', function (Blueprint $table) {
            $table->dropForeign(['todo_id']);
            $table->dropForeign(['user_id']);
            $table->dropIndex(['shareable_type', 'shareable_id']);
        });

        Schema::dropIfExists('share_todos');
    }
};
