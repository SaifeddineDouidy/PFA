import { forwardRef, useEffect, useRef } from 'react';

/**
 * TextInput component renders a text input field.
 * @param {object} param0 - Object containing props passed to the component.
 * @param {string} type - Type of input field (default: 'text').
 * @param {string} className - Additional CSS classes for styling.
 * @param {boolean} isFocused - Flag to determine if the input should be focused.
 * @param {object} props - Additional props passed to the input element.
 * @param {React.RefObject} ref - Ref forwarded to the input element.
 * @returns {JSX.Element} Rendered TextInput component.
 */
const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    // Create a ref for the input element
    const inputRef = useRef();

    useEffect(() => {
        // If the isFocused flag is true, focus the input element
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`border-gray-300 text-primary focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
            ref={ref || inputRef} // Forwarded ref or local ref
        />
    );
});

export default TextInput;
