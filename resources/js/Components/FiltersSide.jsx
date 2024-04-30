import React from 'react';
import Locations from './Locations';
import Salary from './Salary';
import JobPostingDate from './JobPostingDate';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';



const FiltersSide = ({ handleFilterChange, clearFilters, selectedLocations, selectedWorkExperience, selectedEmploymentType }) => {
 return (
    <div className='space-y-5'>
      <div className="border-b border-gray-300 pb-5">
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <button onClick={clearFilters} className="text-[#f04b22] hover:underline">Clear Filters</button>
      </div>
      <div className="border-b border-gray-300 pb-5">
        <Locations handleFilterChange={handleFilterChange} selectedLocations={selectedLocations} filterType="location" />
      </div>
      <div className="border-b border-gray-300 pb-5">
        <Salary handleFilterChange={handleFilterChange} filterType="salary" />
      </div>
      <div>
        <JobPostingDate handleFilterChange={handleFilterChange} filterType="date" />
      </div>
      <div>
        <WorkExperience handleFilterChange={handleFilterChange} selectedWorkExperience={selectedWorkExperience} />
      </div>
      <div>
        <EmploymentType handleFilterChange={handleFilterChange} filterType="employment-type"  selectedEmploymentType={selectedEmploymentType} />
      </div>
    </div>
 );
};

export default FiltersSide;
