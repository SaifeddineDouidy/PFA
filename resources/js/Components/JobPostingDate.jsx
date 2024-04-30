
import React from 'react';
import InputFields from './InputFields';

const JobPostingDate = ({ handleFilterChange, selectedDate = [] }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const postingDates = [
    { value: '', title: 'All Time' },
    { value: twentyFourHoursAgo.toLocaleDateString(), title: 'Last 24 Hours' },
    { value: sevenDaysAgo.toLocaleDateString(), title: 'Last 7 Days' },
    { value: thirtyDaysAgo.toLocaleDateString(), title: 'Last Month' },
  ];

  const handlePostingDateCheckboxChange = (date, isChecked) => {
    handleFilterChange('date', date, isChecked);
  };

  return (
    <div className="">
      <h4 className="text-lg font-medium mb-2 ">Date of Posting</h4>
      <div className="">
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