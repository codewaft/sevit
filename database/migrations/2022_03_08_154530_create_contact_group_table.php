<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("contact_group", function (Blueprint $table) {
            $table->foreignId("contact_id")->constrained();
            $table->foreignId("group_id")->constrained();
        });
    }

    public function down()
    {
        Schema::dropIfExists("contact_group");
    }
};
