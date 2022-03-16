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
            $table->foreignId("template_id")->constrained();
            $table->string("title");
            $table->timestamp("scheduled_at");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists("broadcasts");
    }
};
