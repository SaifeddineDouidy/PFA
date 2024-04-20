import React from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';

const Cards = ({ data, companies }) => {
    const { id, company_id, jobTitle, minPrice, maxPrice, salaryType, jobLocation, experienceLevel, employmentType, postingDate, description } = data;

    // Find the company object that matches the company_id
    const company = companies.find(c => c.id === company_id);
    const companyName = company ? company.companyName : 'Unknown Company';

    return (
        <section className='card'>
            <div className='flex gap-4 flex-col sm:flex-row items-start'>
                <div>
                    <h4 className='text-primary mb-1'>{companyName}</h4>
                    <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
                    <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                        <span className='flex items-center gap-2'><FiMapPin /> {jobLocation}</span>
                        <span className='flex items-center gap-2'><FiClock /> {employmentType}</span>
                        <span className='flex items-center gap-1'><FiDollarSign /> {parseInt(minPrice)}-{parseInt(maxPrice)}</span>
                        <span className='flex items-center gap-2'><FiCalendar /> {postingDate}</span>
                    </div>
                    <p className='text-base text-primary/70'>{description}</p>
                </div>
            </div>
        </section>
    );
};

export default Cards;