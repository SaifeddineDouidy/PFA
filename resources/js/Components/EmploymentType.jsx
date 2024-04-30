import React, { useState } from 'react';
import InputFields from './InputFields';

const EmploymentType = ({ handleFilterChange, selectedEmploymentType = [] }) => {
  const employmentTypes = [
    { value: '', title: 'All' },
    { value: 'Full-time', title: 'Full-time' },
    { value: 'Part-time', title: 'Part-time' },
    { value: 'Internship', title: 'Internship' },
  ];

  const handleEmploymentTypeCheckboxChange = (type, isChecked) => {
    if (isChecked) {
      handleFilterChange('employment-type', type);
    } else {
      handleFilterChange('employment-type', type, false);
    }
  };

  return (
    <div className="">
      <h4 className="text-lg font-medium mb-2 ">Type of employment</h4>
      <div className="">
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