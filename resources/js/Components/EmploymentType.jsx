import React from 'react';
import InputFields from './InputFields';

const EmploymentType = ({ handleFilterChange, selectedEmploymentType = [] }) => {
  // Define the employment type filter options
  const employmentTypes = [
    { value: '', title: 'All' },
    { value: 'Full-time', title: 'Full-time' },
    { value: 'Part-time', title: 'Part-time' },
    { value: 'Internship', title: 'Internship' },
  ];

  // Handle the checkbox change for each employment type option
  const handleEmploymentTypeCheckboxChange = (type, isChecked) => {
    if (isChecked) {
      // Call the handleFilterChange function with the 'employment-type' filter type and the selected employment type
      handleFilterChange('employment-type', type);
    } else {
      // Call the handleFilterChange function with the 'employment-type' filter type and the deselected employment type
      handleFilterChange('employment-type', type, false);
    }
  };

  return (
    <div className="">
      {/* Employment type filter section */}
      <h4 className="text-lg font-medium mb-2 ">Type of employment</h4>
      <div className="">
        {/* Render the employment type filter options */}
        {employmentTypes.map((type, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            <InputFields
              key={index}
              handleFilterChange={handleEmploymentTypeCheckboxChange}
              value={type.value}
              title={type.title}
              name="employment-type"
              checked={selectedEmploymentType.includes(type.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmploymentType;