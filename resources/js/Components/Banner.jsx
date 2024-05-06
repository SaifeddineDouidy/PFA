import React, { useRef } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const Banner = ({ handleSubmit }) => {
    // Create refs for the title and location input fields
    const titleInputRef = useRef();
    const locationInputRef = useRef();

    // Function to handle the search form submission
    const handleSearch = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const title = titleInputRef.current.value; // Get the value from the title input field
        const location = locationInputRef.current.value; // Get the value from the location input field
        handleSubmit(title, location); // Pass the search criteria to the handleSubmit function
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
            {/* Banner content */}
            <h1 className='text-5xl font-bold text-primary mb-3'>Find your <span className='text-blue'>new Job</span> today</h1>
            <p className='text-lg text-black/70 mb-8'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</p>

            {/* Search form */}
            <form onSubmit={handleSearch}>
                <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
                        {/* Title input field */}
                        <div className='flex md:rounded-md rounded shadow-sm outline-none focus-within:outline-2 focus-within:outline-blue-500 md:w-1/2 w-full'>
                            <input
                                type="text"
                                name='title'
                                id='title'
                                placeholder='What position are you looking for'
                                className='block flex-1 border-0 bg-transparent py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base sm:leading-6 rounded-md'
                                ref={titleInputRef}
                            />
                            <FiSearch className='absolute mt-3.5 ml-3 text-gray-400' />
                        </div>

                        {/* Location input field */}
                        <div className='flex md:rounded-md rounded shadow-sm outline-none focus-within:outline-2 focus-within:outline-blue-700 md:w-1/3 w-full'>
                            <input
                                type="text"
                                name='location'
                                id='location'
                                placeholder='Location'
                                className='block flex-1 border-0 bg-transparent py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-base sm:leading-6 rounded-md'
                                ref={locationInputRef}
                            />
                            <FiMapPin className='absolute mt-3.5 ml-3 text-gray-400' />
                        </div>


                        {/* Search button */}
                        <button
                            className="bg-[#3575E2] py-2 px-8 text-white md:rounded-s-none rounded hover:bg-[#205395] transition-colors"
                            type="submit"
                        >
                            Search
                        </button>
                 </div>
            </form>
        </div>
    );
};

export { Banner };