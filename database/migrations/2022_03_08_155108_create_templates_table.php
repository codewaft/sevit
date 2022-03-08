<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("templates", function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("content", 1600);
            $table->timestampsTz();
        });
    }

    public function down()
    {
        Schema::dropIfExists("templates");
    }
};
