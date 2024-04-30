import React from "react";
import { Link as ScrollLink, Element } from 'react-scroll';
import aboutus from '../../assets/img/aboutus.jpg';

const AboutUs = () => {
  return (
      <Element name='about' className="overflow-hidden py-20 lg:py-[70px] bg-white dark:bg-dark">
          <div className="container mx-auto">
              <div className="flex flex-wrap items-center justify-between">
                  <div className="w-full lg:w-1/2">
                      <div className="flex flex-col lg:flex-row lg:-mx-4">
                          <img srcSet={aboutus} alt="" srcset="" />
                      </div>
                  </div>

                  <div className="w-full mt-10 lg:mt-0 lg:w-1/2 lg:pl-8">
                      <div>
                          <span className="block mb-4 font-bold text-xl lg:text-2xl text-[#0073e6]">
                              Why Choose Us
                          </span>
                          <h2 className="mb-5 text-3xl font-bold text-[#042b49] dark:text-black sm:text-[40px]/[48px]">
                              Discover Opportunities in Your Industry
                          </h2>
                          <p className="mb-5 text-base text-[#042b49] dark:text-gray-400">
                              Our platform provides a unique opportunity for job seekers to
                              explore various career options and find the perfect match for
                              their skills and interests.
                          </p>
                          <p className="mb-8 text-base text-[#042b49] dark:text-gray-400">
                              With our comprehensive database of job listings, you can
                              easily search for opportunities that align with your career
                              goals and aspirations.
                          </p>
                          <ScrollLink to='home' spy={true} smooth={true} duration={500}>
                              <button className="w-[200px] border-2 border-[#0073e6] bg-transparent px-5 py-2.5 font-medium text-[#0073e6] transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073e6] hover:bg-gray-200 hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-[#0073e6] before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                                  Get Started
                              </button>
                          </ScrollLink>
                      </div>
                  </div>
              </div>
          </div>
      </Element>
  );
};

export default AboutUs;
