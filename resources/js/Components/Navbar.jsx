import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Head, Link } from '@inertiajs/react';

const Navbar = () => {
 const [nav, setNav] = useState(true);

 const handleNav = () => {
    setNav(!nav);
 };

 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNav(true); // Reset nav state when window size is greater than or equal to 768px
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
 }, []);

 return (
    <div className='bg-slate-900 flex justify-between items-center h-24 max-w-[1260px] mx-auto px-4 text-white'>
      <h1 className='text-left text-3xl font-bold text-[#00df9a]'>REACT.</h1>
      <ul className='hidden md:flex ml-0 md:ml-[110px] flex-grow justify-center'>
        <Link href="/" className='p-4 hover:text-white hover:font-medium'>Home</Link>
        <Link className='p-4 hover:text-white hover:font-medium'>About</Link>
        <Link className='p-4 hover:text-white hover:font-medium'>Contact</Link>
      </ul>
      <div className="space-x-5 hidden md:flex">
        <Link href={route('signup')}><button className="mt-5 relative border-2 border-white bg-transparent px-5 py-2.5 font-medium text-white transition-colors duration-700 ease-in rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-black hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
          Sign Up
        </button></Link>
        <Link href={route('login')}><button className="mt-5 relative border-2 border-white bg-transparent px-5 py-2.5 font-medium text-white transition-colors duration-700 ease-in rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-black hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
          Log In
        </button></Link>
      </div>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-64 h-full bg-slate-900 z-50 pt-24 transition-transform duration-300 ease-in-out transform translate-x-0' : 'fixed -left-full top-0 w-64 h-full bg-slate-900 z-50 pt-24 transition-transform duration-300 ease-in-out transform -translate-x-full'}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className='w-full text-left text-3xl font-bold m-4 text-[#00df9a]'>LOGO.</h1>
            <ul className='p-4 uppercase lg:hidden'>
              <Link className='block p-4 border-b border-gray-600 text-white hover:text-[#00df9a]' href='/'>Home</Link>
              <Link className='block p-4 border-b border-gray-600 text-white hover:text-[#00df9a]' href='/about'>About</Link>
              <Link className='block p-4 text-white hover:text-[#00df9a]' href='/contact'>Contact</Link>
            </ul>
          </div>
          <div className="flex flex-col items-center mb-4">
            <Link href={route('signup')}><button className="relative border-2 border-white bg-transparent px-5 py-2.5 font-medium text-white transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-gray-200 hover:text-black hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:content-[''] hover:before:scale-x-100">
              Sign Up
            </button></Link>
            <Link href={route('login')}><button className=" relative border-2 border-white bg-transparent px-5 py-2.5 font-medium text-white transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-gray-200 hover:text-black hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:content-[''] hover:before:scale-x-100">
              Login In
            </button></Link>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Navbar;
