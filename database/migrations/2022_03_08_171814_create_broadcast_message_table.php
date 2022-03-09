<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("broadcast_message", function (Blueprint $table) {
            $table->foreignId("broadcast_id")->constrained();
            $table->foreignId("message_id")->constrained();
        });
    }

    public function down()
    {
        Schema::dropIfExists("broadcast_message");
    }
};
