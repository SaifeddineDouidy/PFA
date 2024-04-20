import React, { useEffect, useState } from 'react';
import InputFields from './InputFields';

const Locations = ({ handleFilterChange }) => {
    
    // State to hold locations data
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Extract job locations and remove duplicates by converting to a Set
                const uniqueJobLocations = [...new Set(data.map(post => post.jobLocation))];
                setLocations(uniqueJobLocations);
            })
            .catch(error => {
                console.error('Error fetching Job Locations:', error);
            });
    }, []);

    const handleLocationChange = (event) => {
        handleFilterChange('location', event.target.value);
    };

    return (
        <div className=''>
            <h4 className='text-lg font-medium mb-2 '>Locations</h4>
            <div className=''>
                <label className="sidebar-label-container">
                    <input type="radio" name='location' id='all-locations' value="" onChange={handleLocationChange} />
                    <span className='checkmark ml-2'></span>All
                </label>
                {/* Use the 'locations' state variable here */}
                {locations.map((location, index) => (
                    <div key={index} className="" >
                        <label className="sidebar-label-container">
                            <input type="radio" name='location' id={`location-${index}`} value={location} onChange={handleLocationChange} />
                            <span className='checkmark ml-2'></span>{location}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Locations;
