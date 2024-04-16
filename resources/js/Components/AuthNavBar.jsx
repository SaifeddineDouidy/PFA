import { useState } from 'react';
import { MdPerson } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import React from 'react'

const AuthNavBar = () => {
 const [nav, setNav] = useState(true);

 const handleNav = () => {
    setNav(!nav);
 };

 return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2">
        <h1 className='text-left text-3xl font-bold text-[#00df9a]'>REACT.</h1>
        <div className="w-4/12 flex justify-end space-x-4 items-center">
          <button className="icon-button bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full p-2" title="Profile">
            <MdPerson size={24} className="text-gray-600"/>
          </button>
          <button className="icon-button bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full p-2" title="Notifications">
            <IoMdNotifications size={24} className="text-gray-600"/>
          </button>
          <button className="icon-button bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full p-2" title="Chat">
            <IoChatboxEllipsesSharp size={24} className="text-gray-600"/>
          </button>
        </div>
      </header>
    </>
 );
};

export default AuthNavBar;
