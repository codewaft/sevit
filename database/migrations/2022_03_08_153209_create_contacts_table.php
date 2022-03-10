<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create("contacts", function (Blueprint $table) {
            $table->id();
            $table->string("phone")->unique();
            $table->softDeletesTz();
            $table->timestampsTz();
        });
    }

    public function down()
    {
        Schema::dropIfExists("contacts");
    }
};
