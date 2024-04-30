import React from 'react';

const InputFields = ({ handleFilterChange, value, title, name, checked }) => {
  const handleCheckboxChange = (event) => {
    handleFilterChange(event.target.value, event.target.checked);
  };

  return (
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