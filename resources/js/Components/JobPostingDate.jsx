import React from 'react';
import InputFields from './InputFields';

const JobPostingDate = ({ handleFilterChange }) => {
    const now = new Date();
    
    const twentyFourHoursAgo = new Date(now - 24*60*60*1000);
    const sevenDaysAgo = new Date(now - 7*24*60*60*1000); // Corrected to days
    const thirtyDaysAgo = new Date(now - 30*24*60*60*1000); // Corrected to days

    // Using toLocaleDateString for formatting
    const twentyFourHoursAgoDate = twentyFourHoursAgo.toLocaleDateString();
    const sevenDaysAgoDate = sevenDaysAgo.toLocaleDateString();
    const thirtyDaysAgoDate = thirtyDaysAgo.toLocaleDateString();

    return (
        <div className=''>
            <h4 className='text-lg font-medium mb-2 '>Date of Posting</h4>
            <div>
                <label className="sidebar-label-container">
                    <input type="radio" name='date' id='all-dates' value="" onChange={(e) => handleFilterChange('date', e.target.value)} />
                    <span className='checkmark ml-2'></span>All Time
                </label>
            </div>
            <div>
                <InputFields 
                    name='date' 
                    handleFilterChange={handleFilterChange}
                    filterType='date'
                    value={twentyFourHoursAgoDate} 
                    title="Last 24 Hours"
                    className="bg-blue"
                />
            </div>
            <div>
                <InputFields 
                    name='date' 
                    handleFilterChange={handleFilterChange}
                    filterType='date'
                    value={sevenDaysAgoDate} 
                    title="Last 7 Days"
                />
            </div>
            <div>
                <InputFields 
                    name='date' 
                    handleFilterChange={handleFilterChange}
                    filterType='date'
                    value={thirtyDaysAgoDate} 
                    title="Last Month"
                />
            </div>
        </div>
    );
};

export default JobPostingDate;
