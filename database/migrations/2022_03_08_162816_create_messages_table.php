<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Message;

return new class extends Migration {
    public function up()
    {
        Schema::create("messages", function (Blueprint $table) {
            $table->id();
            $table->foreignId("broadcast_id")->constrained();
            $table->foreignId("contact_id")->constrained();
            $table->string("reference_id")->nullable();
            $table->enum("status", Message::$status)->default("scheduled");
            $table->timestamp("processed_at")->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists("messages");
    }
};
