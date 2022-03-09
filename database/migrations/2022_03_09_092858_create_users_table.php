<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("users", function (Blueprint $table) {
            $table->id();
            $table->string("username");
            $table->string("password");
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists("users");
    }
};
