import React from 'react'
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
const Cards = ({data}) => {

  const {companyName,jobTitle, minPrice, maxPrice, salaryType, jobLocation, employementType, postingDate, description} = data;
  return (
    <BrowserRouter>
    <section className='card'>
        <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start' > 
            <div>
                <h4 className='text-primary mb-1'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>

                <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                    <span className='flex items-center gap-2'><FiMapPin/> {jobLocation}</span>
                    <span className='flex items-center gap-2'><FiClock/> {employementType}</span>
                    <span className='flex items-center gap-1'><FiDollarSign/> {parseInt(minPrice)}-{parseInt(maxPrice)}</span>
                    <span className='flex items-center gap-2'><FiCalendar/> {postingDate}</span>
                </div>
                <p className='text-base text-primary/70'>{description}</p>
            </div>
        </Link>
    </section>
    </BrowserRouter>
  )
}

export default Cards
