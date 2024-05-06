import React from 'react';

const InputFields = ({ handleFilterChange, value, title, name, checked }) => {
  // Handle the checkbox change event
  const handleCheckboxChange = (event) => {
    // Call the handleFilterChange function with the checkbox value and checked state
    handleFilterChange(event.target.value, event.target.checked);
  };

  return (
    // Render the input field with a label
    <label className="sidebar-label-container">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark ml-2"></span>
      {title}
    </label>
  );
};

export default InputFields;