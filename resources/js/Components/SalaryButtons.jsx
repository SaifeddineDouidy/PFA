import React from 'react';

const SalaryButtons = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={() => onClickHandler('salaryType', value)}
      value={value}
      className='block w-full px-4 py-1 border text-base hover:bg-blue hover:text-white mb-2'
    >
      {title}
    </button>
  );
};

export default SalaryButtons;
