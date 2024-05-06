import { Link } from '@inertiajs/react';

/**
 * NavLink component renders a link with specified styling based on its active state.
 * @param {boolean} active - Whether the link is currently active or not.
 * @param {string} className - Additional classes to be applied to the link.
 * @param {ReactNode} children - Child elements of the link.
 * @param {object} props - Additional props to be passed to the link component.
 * @returns {JSX.Element} Rendered NavLink component.
 */
export default function NavLink({ active = false, className = '', children, ...props }) {
    // Concatenate the classes based on the active state and provided className
    const linkClasses = `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
        active
            ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 '
            : 'border-transparent text-gray-500 hover:text-blue hover:border-blue focus:text-gray-700 focus:border-gray-300 '
    }${className}`;

    // Render the link component with the calculated classes and other props
    return (
        <Link {...props} className={linkClasses}>
            {children}
        </Link>
    );
}
