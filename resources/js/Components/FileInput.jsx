import React from 'react';

const FileInput = ({ id, value, onChange, ...props }) => {
    const handleFileChange = (e) => {
        onChange(e.target.files[0]);
    };

    return (
        <input
            id={id}
            type="file"
            className="mt-1 block w-full"
            value={value}
            onChange={handleFileChange}
            {...props}
        />
    );
};

export default FileInput;