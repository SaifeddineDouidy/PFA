import React, { useEffect, useState } from 'react';
import InputFields from './InputFields';

const Locations = ({ handleChange }) => {
    // State to hold locations data
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const jobLocations = data.map(post => post.jobLocation);
                setLocations(jobLocations);
            })
            .catch(error => {
                console.error('Error fetching Job Locations:', error);
            });
    }, []);

    return (
        <div className=''>
            <h4 className='text-lg font-medium mb-2 '>Locations</h4>

            <div className=''>
                <label className="sidebar-label-container">
                    <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                    <span className='checkmark'></span>All
                </label>
                {/* Use the 'locations' state variable here */}
                {locations.map((location, index) => (
                    <div key={index}>
                        <InputFields name='test' handleChange={handleChange} title={location} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Locations;
