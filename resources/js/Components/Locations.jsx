import React, { useEffect, useState } from 'react';
import InputFields from './InputFields';

const Locations = ({ handleFilterChange, selectedLocations = [] }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then(res => res.json())
      .then(data => {
        const uniqueJobLocations = [...new Set(data.map(post => post.jobLocation))];
        setLocations(uniqueJobLocations);
      })
      .catch(error => {
        console.error('Error fetching Job Locations:', error);
      });
  }, []);

  const handleLocationCheckboxChange = (location, isChecked) => {
    if (isChecked) {
      handleFilterChange('location', location);
    } else {
      handleFilterChange('location', location, false);
    }
  };

  return (
    <div className="">
      <h4 className="text-lg font-medium mb-2">Locations</h4>
      <div className="">
        <div style={{ marginBottom: '0.1rem' }}>
          <InputFields
            handleFilterChange={handleLocationCheckboxChange}
            value=""
            title="All"
            name="location"
          />
        </div>
        {locations.map((location, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            <InputFields
              handleFilterChange={handleLocationCheckboxChange}
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