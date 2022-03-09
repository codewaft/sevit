<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Broadcast;

return new class extends Migration {
    public function up()
    {
        Schema::create("broadcasts", function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->foreignId("template_id")->constrained();
            $table->enum("status", Broadcast::$status)->default("scheduled");
            $table->timestampTz("scheduled_at");
            $table->timestampsTz();
        });
    }

    public function down()
    {
        Schema::dropIfExists("broadcasts");
    }
};
