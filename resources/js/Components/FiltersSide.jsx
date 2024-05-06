import React from 'react';
import Locations from './Locations';
import Salary from './Salary';
import JobPostingDate from './JobPostingDate';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';
import { FiX } from 'react-icons/fi';

const FiltersSide = ({ handleFilterChange, clearFilters, selectedLocations, selectedDate, selectedWorkExperience, selectedEmploymentType }) => {
 return (
    <div className='space-y-5'>
      <div className="border-b border-gray-500 pb-5">
        <div className="flex justify-between items-center">
          <h3 className='text-lg font-bold'>Filters</h3>
          <button
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FiX />
          </button>
        </div>
      </div>
      <div className="border-b border-gray-500 pb-5">
        <Locations handleFilterChange={handleFilterChange} selectedLocations={selectedLocations} filterType="location" />
      </div>
      
      <div className='border-b border-gray-500 pb-5'>
        <JobPostingDate handleFilterChange={handleFilterChange} selectedDate={selectedDate} filterType="date" />
      </div>
      <div className='border-b border-gray-500 pb-5'>
        <WorkExperience handleFilterChange={handleFilterChange} selectedWorkExperience={selectedWorkExperience} />
      </div>
      <div className="border-b border-gray-500 pb-5">
        <EmploymentType handleFilterChange={handleFilterChange} filterType="employment-type" selectedEmploymentType={selectedEmploymentType} />
      </div>
      <div className="">
        <Salary handleFilterChange={handleFilterChange} filterType="salary" />
      </div>
    </div>
 );
};

export default FiltersSide;