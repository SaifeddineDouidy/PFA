import React from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const Banner = ({ query, locationQuery, handleInputChange, handleLocationInputChange, handleSubmit }) => {
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
            <h1 className='text-5xl font-bold text-primary mb-3'>Find your <span className='text-blue'>new Job</span> today</h1>
            <p className='text-lg text-black/70 mb-8'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</p>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
                    <div className='flex md:rounded-md rounded shadow-sm outline-none focus-within:outline-2 focus-within:outline-blue-500 md:w-1/2 w-full'>
                        <input
                            type="text"
                            name='title'
                            id='title'
                            placeholder='What position are you looking for'
                            className='block flex-1 border-0 bg-transparent py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base sm:leading-6 rounded-md'
                            onChange={handleInputChange}
                            value={query}
                        />
                        <FiSearch className='absolute mt-3.5 ml-3 text-gray-400' />
                    </div>
                    <div className='flex md:rounded-md rounded shadow-sm outline-none focus-within:outline-2 focus-within:outline-blue-500 md:w-1/3 w-full'>
                        <input
                            type="text"
                            name='location'
                            id='location'
                            placeholder='Location'
                            className='block flex-1 border-0 bg-transparent py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base sm:leading-6 rounded-md'
                            onChange={handleLocationInputChange}
                            value={locationQuery}
                        />
                        <FiMapPin className='absolute mt-3.5 ml-3 text-gray-400' />
                    </div>
                    <button className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded' type='submit'>Search</button>
                </div>
            </form>
        </div>
    );
};

export { Banner };
