import { Link as ScrollLink, Element } from 'react-scroll';
import img from '../../assets/img/content.png';
import React from 'react';

const Content = () => {
  return (
      <Element name='content' className='h-full w-full bg-[#0073e6] py-16 px-4 text-white'>
          <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
              <img className='w-[350px] mx-auto my-4' src={img} alt="/" />
              <div className='flex flex-col justify-center'>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#042b49]'>Find Your Ideal Job Now</h1>
                  <p className='text-white'>Our site offers a unique user experience and allows you to easily and quickly find job offers that match your profile.</p>
                  <ScrollLink to='about' spy={true} smooth={true} duration={500}>
                      <button className="mt-5 w-[200px] relative border-2 border-white bg-white px-5 py-2.5 font-medium text-[#042b49] transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-gray-200 hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-[#0073e6] before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                          Learn More
                      </button>
                  </ScrollLink>
              </div>
          </div>
      </Element>
  );
};

export default Content;
