import React from 'react';
import InputFields from './InputFields'; // Ensure this import path is correct

const WorkExperience = ({ handleFilterChange, selectedWorkExperience }) => {
 const experienceLevels = [
    { value: '', title: 'All' },
    { value: 'Junior-level', title: 'Junior-level' },
    { value: 'Medium-level', title: 'Medium-level' },
    { value: 'Senior-level', title: 'Senior-level' },
    { value: 'Any experience', title: 'Any experience' },
 ];

 return (
    <div className=''>
      <h4 className='text-lg font-medium mb-2 '>Work Experience</h4>
      <div className=''>
        {experienceLevels.map((level, index) => (
          <div key={index}>
            <InputFields
              handleFilterChange={handleFilterChange}
              value={level.value}
              title={level.title}
              name='work-exp'
              checked={selectedWorkExperience && selectedWorkExperience === level.value}
            />
          </div>
        ))}
      </div>
    </div>
 );
};

export default WorkExperience;
