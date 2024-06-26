<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Add user_id foreign key
            $table->string('fullname');
            $table->string('cin')->unique();
            $table->string('email')->default("default@gmail.com")->unique();
            $table->string('password');
            $table->string('phoneNumber');
            $table->string('educationLevel');
            $table->string('cv_path')->nullable(); // Add CV file path column
            $table->string('motivation_letter_path')->nullable(); // Add Motivation Letter file path column
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Define foreign key constraint

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
