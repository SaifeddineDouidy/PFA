import React from "react";

const AboutUs = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[70px] lg:pb-[70px] bg-[#003000] dark:bg-dark outline">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/rfHFq15/image-2.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 font-bold text-xl lg:text-2xl text-white">
                    Why Choose Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-custom-green to-custom-white dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-custom-green  dark:to-custom-white sm:text-[40px]/[48px]">
                Make yourself known in your chosen industry. And search for potential employees.
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6 text-white">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6 text-white">
                  A domain name is one of the first steps to establishing your
                  brand. Secure a consistent brand image with a domain name that
                  matches your business.
                </p>
                <button className="mt-5 relative w-[200px] border-2 border-white bg-transparent px-5 py-2.5 font-medium text-[#00df9a] transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-[#00df9a] hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
