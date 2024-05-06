import React from 'react';

const SalaryButtons = ({ onClickHandler, value, title, isChecked }) => {
  // Handle the button click event
  const handleClick = () => {
    // Call the onClickHandler function with the 'salaryType' filter type, the button value, and the negation of the current checked state
    onClickHandler('salaryType', value, !isChecked);
  };

  return (
    // Render the salary type button
    <button
      onClick={handleClick}
      className={`block w-full px-4 py-1 border text-base hover:bg-blue hover:text-white mb-2 ${
        isChecked ? 'bg-blue text-white' : ''
      }`}
    >
      {title}
    </button>
  );
};

export default SalaryButtons;