import React, { useState } from 'react';
import InputFields from './InputFields';

const JobPostingDate = ({ handleFilterChange, selectedDate }) => {
  const [checkedDates, setCheckedDates] = useState(selectedDate);

  // Calculate the date ranges for the filter options
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Define the posting date filter options
  const postingDates = [
    { value: '', title: 'All Time' },
    { value: twentyFourHoursAgo.toLocaleDateString(), title: 'Last 24 Hours' },
    { value: sevenDaysAgo.toLocaleDateString(), title: 'Last 7 Days' },
    { value: thirtyDaysAgo.toLocaleDateString(), title: 'Last Month' },
  ];

  // Handle the checkbox change for each posting date option
  const handlePostingDateCheckboxChange = (date, isChecked) => {
    if (isChecked) {
      // Call the handleFilterChange function with the 'date' filter type and the selected date
      handleFilterChange('date', date);
    } else {
      // Call the handleFilterChange function with the 'date' filter type and the deselected date
      handleFilterChange('date', date, false);
    }
  };

  return (
    <div className="">
      {/* Job posting date filter section */}
      <h4 className="text-lg font-medium mb-2 ">Date of Posting</h4>
      <div className="">
        {/* Render the posting date filter options */}
        {postingDates.map((dateOption, index) => (
          <div key={index} style={{ marginBottom: '0.1rem' }}>
            <InputFields
              key={index}
              handleFilterChange={handlePostingDateCheckboxChange}
              value={dateOption.value}
              title={dateOption.title}
              name="date"
              checked={selectedDate.includes(dateOption.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostingDate;