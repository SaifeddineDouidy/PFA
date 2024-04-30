import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link as ScrollLink, Element } from 'react-scroll';
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
        <div className='bg-white flex justify-between items-center h-24 max-w-[1260px] mx-auto px-4 text-[#042b49]'>
            <h1 className='text-left text-3xl font-bold text-[#0073e6]'>
                <ScrollLink to='home' spy={true} smooth={true} duration={500}>
                    REACT.
                </ScrollLink>
            </h1>
            <ul className='hidden md:flex items-center justify-center flex-grow'>
                <ScrollLink to='home' spy={true} smooth={true} duration={500}>
                    <li className='p-4 hover:text-[#0073e6] hover:font-medium'>Home</li>
                </ScrollLink>
                <ScrollLink to='about' spy={true} smooth={true} duration={500}>
                    <li className='p-4 hover:text-[#0073e6] hover:font-medium'>About</li>
                </ScrollLink>
                <ScrollLink to='contact' spy={true} smooth={true} duration={500}>
                    <li className='p-4 hover:text-[#0073e6] hover:font-medium'>Contact</li>
                </ScrollLink>
            </ul>
            <div className="space-x-5 hidden md:flex">
                <Link href={route('signup')}>
                    <button className="relative border-2 border-[#0073e6] bg-transparent px-5 py-2.5 font-medium text-[#0073e6] transition-colors duration-700 ease-in rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-[#0073e6] hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-blue before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                        Sign Up
                    </button>
                </Link>
                <Link href={route('login')}>
                    <button className="relative border-2 border-[#0073e6] bg-transparent px-5 py-2.5 font-medium text-[#0073e6] transition-colors duration-700 ease-in rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-[#0073e6] hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-blue before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                        Log In
                    </button>
                </Link>
            </div>
            <div onClick={handleNav} className='block md:hidden'>
                {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-64 h-full bg-white z-50 pt-24 transition-transform duration-300 ease-in-out transform translate-x-0' : 'fixed -left-full top-0 w-64 h-full bg-white z-50 pt-24 transition-transform duration-300 ease-in-out transform -translate-x-full'}>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h1 className='w-full text-left text-3xl font-bold m-4 text-[#0073e6]'>
                            <ScrollLink to='home' spy={true} smooth={true} duration={500}>
                                LOGO.
                            </ScrollLink>
                        </h1>
                        <ul className='p-4 space-y-4 text-lg uppercase lg:hidden'>
                            <ScrollLink to='about' spy={true} smooth={true} duration={500}>
                                <li className='block p-4 text-[#042b49] hover:text-[#0073e6]'>About</li>
                            </ScrollLink>
                            <ScrollLink to='contact' spy={true} smooth={true} duration={500}>
                                <li className='block p-4 text-[#042b49] hover:text-[#0073e6]'>Contact</li>
                            </ScrollLink>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center mb-4 space-y-4">
                        <Link href={route('signup')}>
                            <button className="relative border-2 border-[#0073e6] bg-transparent px-5 py-2.5 font-medium text-[#0073e6] transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073e6] hover:bg-[#0073e6] hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:content-[''] hover:before:scale-x-100">
                                Sign Up
                            </button>
                        </Link>
                        <Link href={route('login')}>
                            <button className="relative border-2 border-[#0073e6] bg-transparent px-5 py-2.5 font-medium text-[#0073e6] transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073e6] hover:bg-[#0073e6] hover:text-white hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:content-[''] hover:before:scale-x-100">
                                Log In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;