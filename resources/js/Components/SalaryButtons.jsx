import React from 'react';

const SalaryButtons = ({ onClickHandler, value, title, isChecked }) => {
 const handleClick = () => {
    onClickHandler('salaryType', value, !isChecked);
 };

 return (
    <button
      onClick={handleClick}
      className={`block w-full px-4 py-1 border text-base hover:bg-blue hover:text-white mb-2 ${isChecked ? 'bg-blue text-white' : ''}`}
    >
      {title}
    </button>
 );
};

export default SalaryButtons;