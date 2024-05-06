import React from 'react';

const FileInput = ({ id, value, onChange, ...props }) => {
    // Function to handle the file change event
    const handleFileChange = (e) => {
        // Log the selected file to the console
        console.log(e.target.files[0]);
        // Call the provided `onChange` function with the selected file
        onChange(e.target.files[0]);
    };

    return (
        // Render the file input element
        <input
            id={id}
            type="file"
            // Apply some default styling classes
            className="mt-1 block w-full"
            // Call the `handleFileChange` function when the file is changed
            onChange={handleFileChange}
            // Pass along any additional props that were provided
            {...props}
        />
    );
};

export default FileInput;