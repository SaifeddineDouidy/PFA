import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

// Create a React context for managing the dropdown state
const DropDownContext = createContext();

// Dropdown component - the main container for the dropdown
const Dropdown = ({ children }) => {
    // Use the useState hook to manage the open/close state of the dropdown
    const [open, setOpen] = useState(false);

    // Function to toggle the open state of the dropdown
    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    // Provide the dropdown state and toggle function to the child components
    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

// Trigger component - the element that triggers the dropdown to open and close
const Trigger = ({ children }) => {
    // Get the dropdown state and toggle function from the context
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            {/* Render the trigger element and call the toggleOpen function when clicked */}
            <div onClick={toggleOpen}>{children}</div>

            {/* Render a full-screen overlay when the dropdown is open, to close it when clicked outside */}
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

// Content component - the dropdown menu content
const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
    // Get the dropdown state and setOpen function from the context
    const { open, setOpen } = useContext(DropDownContext);

    // Determine the alignment classes based on the 'align' prop
    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    // Determine the width classes based on the 'width' prop
    let widthClasses = '';
    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            {/* Use the Transition component from @headlessui/react to animate the dropdown content */}
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {/* Render the dropdown content */}
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

// DropdownLink component - a specialized link component for use within the dropdown
const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

// Export the Dropdown component and its child components
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;