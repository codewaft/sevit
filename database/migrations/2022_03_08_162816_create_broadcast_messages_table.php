<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("broadcast_messages", function (Blueprint $table) {
            $table->foreignId("contact_id")->constrained();
            $table->string("message_id");
            $table->enum("status", ["scheduled", "processed", "failed"]);
            $table->timestampTz("processed_at");
        });
    }

    public function down()
    {
        Schema::dropIfExists("broadcast_messages");
    }
};
