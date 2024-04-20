import React from 'react';
import InputFields from './InputFields'; // Ensure this import path is correct

const EmploymentType = ({ handleFilterChange, selectedEmploymentType }) => {
 const employmentType = [
    { value: '', title: 'All' },
    { value: 'Full-time', title: 'Full-time' },
    { value: 'Part-time', title: 'Part-time' },
    { value: 'Internship', title: 'Internship'},

 ];

 return (
    <div className=''>
      <h4 className='text-lg font-medium mb-2 '>Type of employment</h4>
      <div className=''>
        {employmentType.map((level, index) => (
          <div key={index}>
            <InputFields
              handleFilterChange={handleFilterChange}
              value={level.value}
              title={level.title}
              name='employment-type'
              checked={selectedEmploymentType && selectedEmploymentType === level.value}
            />
          </div>
        ))}
      </div>
    </div>
 );
};

export default EmploymentType;
