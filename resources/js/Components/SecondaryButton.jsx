/**
 * SecondaryButton component renders a secondary button with specified styling and behavior.
 * @param {string} type - The type of button (e.g., 'button', 'submit', 'reset').
 * @param {string} className - Additional classes to be applied to the button.
 * @param {boolean} disabled - Whether the button is disabled or not.
 * @param {ReactNode} children - Child elements of the button.
 * @param {object} props - Additional props to be passed to the button component.
 * @returns {JSX.Element} Rendered SecondaryButton component.
 */
export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    // Concatenate the classes based on the disabled state and provided className
    const buttonClasses = `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
        disabled && 'opacity-25'
    } ${className}`;

    // Render the button component with the calculated classes, type, and other props
    return (
        <button {...props} type={type} className={buttonClasses} disabled={disabled}>
            {children}
        </button>
    );
}
