import React from 'react'
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full bg-slate-900 text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
            <div>
                <h6 className='font-bold uppercase pt-2'>Solutions</h6>
                <ul>
                    <li className='py-1'>Marketing</li>
                    <li className='py-1'>Analytics</li>
                    <li className='py-1'>Commerce</li>
                    <li className='py-1'>Data</li>
                    <li className='py-1'>Cloud</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Support</h6>
                <ul>
                    <li className='py-1'>Pricing</li>
                    <li className='py-1'>Documentation</li>
                    <li className='py-1'>Guides</li>
                    <li className='py-1'>API Status</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Company</h6>
                <ul>
                    <li className='py-1'>About</li>
                    <li className='py-1'>Blog</li>
                    <li className='py-1'>Jobs</li>
                    <li className='py-1'>Press</li>
                    <li className='py-1'>Partners</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Legal</h6>
                <ul>
                    <li className='py-1'>Claims</li>
                    <li className='py-1'>Privacy</li>
                    <li className='py-1'>Terms</li>
                    <li className='py-1'>Policies</li>
                    <li className='py-1'>Conditions</li>
                </ul>
            </div>
            <div className='col-span-2 pt-8 md:pt-2'>
                <p className='font-bold uppercase'>Subscribe to our newsletter</p>
                <p className='py-4'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                <form className='flex flex-col sm:flex-row'>
                <input className='w-[175px] text-black p-2 mr-12 rounded-md mb-4 sm:mb-0' type="email" placeholder='Enter email..'/>
                
                <button className="flex justify-center items-center mt-5 sm:mt-0 relative w-[180px] sm:w-auto border-2 border-black bg-[#00df9a] px-5 py-2.5 font-medium text-[#282b2a] transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-[#00df9a] hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                Get started
                </button>
                </form>
            </div>
        </div>
        <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>2023/2024 PFA, All rights reserved</p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
            <FaFacebook className='hover:text-white duration-100' />
            <FaInstagram className='hover:text-white duration-100' />
            <FaTwitter className='hover:text-white duration-100' />
            <FaGithub className='hover:text-white duration-100' />
        </div>
        </div>
    </div>
  )
}

export default Footer