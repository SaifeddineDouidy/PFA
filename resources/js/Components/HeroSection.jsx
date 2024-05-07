import { ReactTyped } from "react-typed";
import { Link as ScrollLink, Element } from 'react-scroll';
import { Inertia } from '@inertiajs/inertia'; 
import React from 'react'

const HeroSection = () => {
  // Function to handle the "Get Started" button click
  const handleGetStartedClick = () => {
      // Use Inertia.visit() to navigate to the login page
      Inertia.visit('/login'); // Adjust the path as necessary
  };

  return (
      // Use the Element component from react-scroll to create an anchor point for the home section
      <Element name='home' className='text-[#042b49] bg-white mt-8'>
        
          <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
              {/* Page title */}
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[144px] w-[777px] bg-blue-400 rounded-full shadow-1g blur-[7rem] -z-10"></span>
              <p className='text-[#0073e6] font-bold'>GROW YOUR CAREER WITH US</p>
              <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-5 m-1'>Develop your career.</h1>
              {/* Typed text animation */}
              <div className='flex justify-center items-center'>
                  <p className='md:text-5xl m:text-4xl text-xl font-bold py-3'>Faster and Easier.</p>
                  <ReactTyped className='md:text-5xl m:text-4xl text-xl font-bold pl-2 text-[#666]' strings={['Business', 'Marketing', 'IT', 'Data Science', 'Cybersecurity']} typeSpeed={50} backSpeed={70} loop />
              </div>
              {/* Subtext */}
              <p className='md:text-2xl text-xl font-bold text-[#666] mb-5'>Search for opportunities, from all around the globe!</p>
              {/* "Get Started" button */}
              <ScrollLink to='content' spy={true} smooth={true} duration={500}>
                  <button onClick={handleGetStartedClick} className="bg-[#0073e6] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white hover:bg-[#005ab4] transition-background duration-300 transform hover:scale-105 hover:shadow-lg">
                      Get Started
                  </button>
              </ScrollLink>
          </div>
      </Element>
  );
};

export default HeroSection;
