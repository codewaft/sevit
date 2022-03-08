<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("broadcast_groups", function (Blueprint $table) {
            $table->foreignId("brodcast_id")->constrained();
            $table->foreignId("group_id")->constrained();
        });
    }

    public function down()
    {
        Schema::dropIfExists("broadcast_groups");
    }
};
