import { forwardRef, useEffect, useRef } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    // Use the forwarded ref directly without creating a new ref inside the component
    useEffect(() => {
        // If the isFocused flag is true and the ref is valid, focus the input element
        if (isFocused && ref?.current) {
            ref.current.focus();
        }
    }, [isFocused, ref]); // Include ref in the dependency array

    return (
        <input
            {...props}
            type={type}
            className={`border-gray-300 text-primary focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
            ref={ref} // Forwarded ref or local ref
        />
    );
});

export default TextInput;