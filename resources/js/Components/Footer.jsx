import React from 'react';
import { Link } from '@inertiajs/inertia-react'; // Import Link from Inertia
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
    return (
        // Wrap the entire footer in a container
        <div className='w-full bg-slate-900 text-gray-300 py-y px-2'>
            <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
                {/* Solutions section */}
                <div>
                    <h6 className='font-bold uppercase pt-2'>Solutions</h6>
                    <ul>
                        {/* Use Inertia Link component for internal links */}
                        <li className='py-1'>
                            <Link href="/marketing" className='hover:underline'>Marketing</Link>
                        </li>
                        <li className='py-1'>
                            <Link href="/analytics" className='hover:underline'>Analytics</Link>
                        </li>
                        <li className='py-1'>
                            <Link href="/commerce" className='hover:underline'>Commerce</Link>
                        </li>
                        <li className='py-1'>
                            <Link href="/data" className='hover:underline'>Data</Link>
                        </li>
                        <li className='py-1'>
                            <Link href="/cloud" className='hover:underline'>Cloud</Link>
                        </li>
                    </ul>
                </div>

                {/* Support section */}
                <div>
                    <h6 className='font-bold uppercase pt-2'>Support</h6>
                    <ul>
                        <li className='py-1'><Link href="/pricing" className='hover:underline'>Pricing</Link></li>
                        <li className='py-1'><Link href="/documentation" className='hover:underline'>Documentation</Link></li>
                        <li className='py-1'><Link href="/guides" className='hover:underline'>Guides</Link></li>
                        <li className='py-1'><Link href="/api-status" className='hover:underline'>API Status</Link></li>
                    </ul>
                </div>

                {/* Company section */}
                <div>
                    <h6 className='font-bold uppercase pt-2'>Company</h6>
                    <ul>
                        <li className='py-1'><Link href="/about" className='hover:underline'>About</Link></li>
                        <li className='py-1'><Link href="/blog" className='hover:underline'>Blog</Link></li>
                        <li className='py-1'><Link href="/jobs" className='hover:underline'>Jobs</Link></li>
                        <li className='py-1'><Link href="/press" className='hover:underline'>Press</Link></li>
                        <li className='py-1'><Link href="/partners" className='hover:underline'>Partners</Link></li>
                    </ul>
                </div>

                {/* Legal section */}
                <div>
                    <h6 className='font-bold uppercase pt-2'>Legal</h6>
                    <ul>
                        <li className='py-1'><Link href="/claims" className='hover:underline'>Claims</Link></li>
                        <li className='py-1'><Link href="/privacy" className='hover:underline'>Privacy</Link></li>
                        <li className='py-1'><Link href="/terms" className='hover:underline'>Terms</Link></li>
                        <li className='py-1'><Link href="/policies" className='hover:underline'>Policies</Link></li>
                        <li className='py-1'><Link href="/conditions" className='hover:underline'>Conditions</Link></li>
                    </ul>
                </div>

                {/* Newsletter section */}
                <div className='col-span-2 pt-8 md:pt-2'>
                    <p className='font-bold uppercase'>Subscribe to our newsletter</p>
                    <p className='py-4'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <form className='flex flex-col sm:flex-row'>
                        <input className='w-[175px] text-black p-2 mr-12 rounded-md mb-4 sm:mb-0' type="email" placeholder='Enter email..' />
                        <button className="flex justify-center items-center mt-5 sm:mt-0 relative w-[180px] sm:w-auto border-2 border-black bg-[#0073e6] px-5 py-2.5 font-medium text-white transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-[#0073e6] hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                            Get started
                        </button>
                    </form>
                </div>
            </div>

            {/* Copyright and social media section */}
            <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
                <p className='py-4'>2023/2024 PFA, All rights reserved</p>
                <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
                    {/* Use Inertia Link component for social media links */}
                    <Link href="#" className='hover:text-white duration-100'><FaFacebook /></Link>
                    <Link href="#" className='hover:text-white duration-100'><FaInstagram /></Link>
                    <Link href="#" className='hover:text-white duration-100'><FaTwitter /></Link>
                    <Link href="#" className='hover:text-white duration-100'><FaGithub /></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;