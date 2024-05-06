import React, { useEffect, useState } from 'react';
import InputFields from './InputFields';

const Locations = ({ handleFilterChange, selectedLocations = [] }) => {
  const [locations, setLocations] = useState([]);

  // Fetch the unique job locations from the '/posts' endpoint
  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => {
        // Extract the unique job locations from the data
        const uniqueJobLocations = [...new Set(data.map(post => post.jobLocation))];
        setLocations(uniqueJobLocations);
      })
      .catch(error => {
        console.error('Error fetching Job Locations:', error);
      });
  }, []);

  // Handle the  change for each location
  const handleLocationChange = (location, isChecked) => {
    if (isChecked) {
      // Call the handleFilterChange function with the 'location' filter type and the selected location
      handleFilterChange('location', location);
    } else {
      // Call the handleFilterChange function with the 'location' filter type and the deselected location
      handleFilterChange('location', location, false);
    }
  };

  return (
    <div className="">
      {/* Locations filter section */}
      <h4 className="text-lg font-medium mb-2">Locations</h4>
      <div className="">
        {/* All option */}
        <div style={{ marginBottom: '0.1rem' }}>
          <InputFields
            handleFilterChange={handleLocationChange}
            value=""
            title="All"
            name="location"
          />
        </div>

        {/* Individual locations */}
        {locations.map((location, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            <InputFields
              handleFilterChange={handleLocationChange}
              value={location}
              title={location}
              name="location"
              checked={selectedLocations.includes(location)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;