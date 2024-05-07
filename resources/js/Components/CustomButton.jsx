import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    // Render a button element
    <button
      // Call the onClick function when the button is clicked
      onClick={onClick}
      // Use the provided 'type' prop, or default to 'button'
      type={type || "button"}
      // Apply the base styles and additional styles from the 'containerStyles' prop
      className={`inline-flex items-center ${containerStyles} hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
    >
      {/* Render the button title */}
      {title}

      {/* If an 'iconRight' prop is provided, render it inside a div with some spacing */}
      {iconRight && <div className='ml-2'>{iconRight}</div>}
      
    </button>
  );
};

export default CustomButton;