export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
      // Render a button element
      <button
        // Spread the passed-in props onto the button element
        {...props}
        // Apply the base styles and conditional styles based on the 'disabled' prop
        className={
          `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
            disabled && 'opacity-25'
          } ` + className
        }
        // Disable the button if the 'disabled' prop is true
        disabled={disabled}
      >
        {/* Render the children passed into the component */}
        {children}
      </button>
    );
  }