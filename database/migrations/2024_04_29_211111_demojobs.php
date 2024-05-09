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
        Schema::create('demojobs', function (Blueprint $table) {
            $table->bigIncrements("_id");
            $table->text('description');
            $table->decimal('salary');
            $table->string('jobTitle');
            $table->string('companyName');
            $table->integer('minPrice');
            $table->integer('maxPrice');
            $table->string('salaryType');
            $table->string('jobLocation');
            $table->date('postingDate');
            $table->string('experienceLevel');
            $table->text('skills');
            $table->string('companyLogo');
            $table->string('employmentType');
            $table->string('postedBy');
            $table->timestamp('createAt')->default(now());
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