import React from 'react';

const InputFields = ({ handleChange, value, title, name }) => {
 // Convert value to a string if it's not already a string
 const displayValue = value && typeof value !== 'string' ? String(value) : value;

 return (
    <label className='sidebar-label-container'>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
      />
      <span className='checkmark'></span>{title} {/* Use the title prop here */}
    </label>
 );
};

export default InputFields;
