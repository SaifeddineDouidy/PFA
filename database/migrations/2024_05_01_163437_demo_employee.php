<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demoemployee', function (Blueprint $table) {
            $table->bigIncrements('idemp');
            $table->string('fullName');
            $table->string('cin');
            $table->bigInteger('phoneNumber');
            $table->string('email');
            $table->longText('cvFile');
            $table->longText('motivationLetter');
            $table->timestamp('createAt')->default(now());
            $table->string('status_candidat');
            $table->string('jobTitle');
            $table->string('companyName');
            $table->string('companyLogo');
            $table->timestamps();

        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};