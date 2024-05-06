/**
 * PrimaryButton component renders a primary button with specified styling and behavior.
 * @param {string} className - Additional classes to be applied to the button.
 * @param {boolean} disabled - Whether the button is disabled or not.
 * @param {ReactNode} children - Child elements of the button.
 * @param {object} props - Additional props to be passed to the button component.
 * @returns {JSX.Element} Rendered PrimaryButton component.
 */
export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    // Concatenate the classes based on the disabled state and provided className
    const buttonClasses = `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
        disabled && 'opacity-25'
    } ${className}`;

    // Render the button component with the calculated classes and other props
    return (
        <button {...props} className={buttonClasses} disabled={disabled}>
            {children}
        </button>
    );
}
