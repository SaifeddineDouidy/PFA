import React from 'react';

const FileInput = ({ id, value, onChange, ...props }) => {
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        onChange(e.target.files[0]);
    };

    return (
        <input
            id={id}
            type="file"
            className="mt-1 block w-full"
            onChange={handleFileChange}
            {...props}
        />
    );
};

export default FileInput;