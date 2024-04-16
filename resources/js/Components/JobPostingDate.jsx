import React from 'react';
import InputFields from './InputFields';

const JobPostingDate = ({ handleChange }) => {
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
            <div className=''>
                <label className="sidebar-label-container">
                    <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                    <span className='checkmark'></span>All Time
                </label>
                <InputFields 
                    name='test' 
                    handleChange={handleChange} 
                    value={twentyFourHoursAgoDate} 
                    title="Last 24 Hours"
                />
                <InputFields 
                    name='test' 
                    handleChange={handleChange} 
                    value={sevenDaysAgoDate} 
                    title="Last 7 Days"
                />
                <InputFields 
                    name='test' 
                    handleChange={handleChange} 
                    value={thirtyDaysAgoDate} 
                    title="Last Month"
                />
            </div>
        </div>
    );
};

export default JobPostingDate;
