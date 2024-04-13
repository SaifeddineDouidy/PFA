import { ReactTyped } from "react-typed";
import { Inertia } from '@inertiajs/inertia'; // Import Inertia
import React from 'react'

const HeroSection = () => {
 // Function to handle the "Get Started" button click
 const handleGetStartedClick = () => {
    // Use Inertia.visit() to navigate to the login page
    Inertia.visit('/login'); // Adjust the path as necessary
 };

 return (
    <div className='text-white bg-[#000300]'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold'>GROW YOUR CAREER WITH US</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-5 m-1'>Develop your career.</h1>
        <div className='flex justify-center items-center'>
            <p className='md:text-5xl m:text-4xl text-xl font-bold py-3'>Faster and Easier.</p>
            <ReactTyped className='md:text-5xl m:text-4xl text-xl font-bold pl-2 text-[grey]' strings={['IT','Data Science','Cybersecurity']} typeSpeed={50} backSpeed={70} loop/>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500 mb-5'>Search for opportunities, from all around the globe!</p>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-green-700 transition-background duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
 )
}

export default HeroSection;
