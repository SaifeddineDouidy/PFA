import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
 return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center ${containerStyles} hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
    >
      {title}

      {iconRight && <div className='ml-2'>{iconRight}</div>}
    </button>
 );
};

export default CustomButton;
