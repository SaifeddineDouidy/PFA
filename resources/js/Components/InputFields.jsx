import React from 'react';

const InputFields = ({ handleFilterChange, value, title, name, checked }) => {
  const handleRadioChange = (event) => {
     handleFilterChange(name, event.target.value);
  };
 
  return (
     <label className='sidebar-label-container'>
       <input
         type="radio"
         name={name}
         value={value}
         checked={checked}
         onChange={handleRadioChange}
       />
       <span className='checkmark ml-2'></span>{title}
     </label>
  );
};

export default InputFields;
