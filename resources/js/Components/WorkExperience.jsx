import React from 'react';
import InputFields from './InputFields'; // Ensure this import path is correct

const WorkExperience = ({ handleFilterChange, selectedWorkExperience }) => {
  // Define the work experience filter options
  const experienceLevels = [
    { value: '', title: 'All' },
    { value: 'Junior-level', title: 'Junior-level' },
    { value: 'Medium-level', title: 'Medium-level' },
    { value: 'Senior-level', title: 'Senior-level' },
    { value: 'Any experience', title: 'Any experience' },
  ];

  // Handle the checkbox change for each work experience option
  const handleWorkExperienceCheckboxChange = (type, isChecked) => {
    if (isChecked) {
      // Call the handleFilterChange function with the 'work-exp' filter type and the selected work experience
      handleFilterChange('work-exp', type);
    } else {
      // Call the handleFilterChange function with the 'work-exp' filter type and the deselected work experience
      handleFilterChange('work-exp', type, false);
    }
  };

  return (
    <div className="">
      {/* Work experience filter section */}
      <h4 className="text-lg font-medium mb-2 ">Work Experience</h4>
      <div className="">
        {/* Render the work experience filter options */}
        {experienceLevels.map((type, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            <InputFields
              key={index}
              handleFilterChange={handleWorkExperienceCheckboxChange}
              value={type.value}
              title={type.title}
              name="employment-type"
              checked={selectedWorkExperience.includes(type.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;