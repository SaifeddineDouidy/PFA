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
        Schema::create('company_jobs', function (Blueprint $table) {
            $table->id(); // Jobs id
            $table->unsignedBigInteger('company_id'); // Add company_id foreign key
            $table->string('jobTitle');
            $table->string('minPrice');
            $table->string('maxPrice');
            $table->string('salaryType');
            $table->string('jobLocation');
            $table->date('postingDate');
            $table->string('experienceLevel');
            $table->string('employmentType');
            $table->longText('description');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade'); // Updated reference to 'companies' table

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_jobs');
    }
};
