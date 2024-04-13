import React, { useState } from 'react';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { FaGoogle } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';


const PageLogin = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleGetStartedClick = () => {
    // Use Inertia.visit() to navigate to the signup page
    Inertia.visit('/signup'); // Adjust the path as necessary
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#000300]">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="scale-95 flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-8">
              Welcome back! Please enter your details
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">User Type</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={selectedType === "student"}
                    onChange={() => handleTypeChange("student")}
                    className="form-radio text-blue-500"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="enterprise"
                    checked={selectedType === "enterprise"}
                    onChange={() => handleTypeChange("enterprise")}
                    className="form-radio text-blue-500"
                  />
                  <span>Enterprise</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="guest"
                    checked={selectedType === "guest"}
                    onChange={() => handleTypeChange("guest")}
                    className="form-radio text-blue-500"
                  />
                  <span>Guest</span>
                </label>
              </div>
            </div>
            {selectedType === "guest" ? (
              <div className="py-4">
                <span className="mb-2 text-md">Link to Account</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="linkToAccount"
                  id="linkToAccount"
                />
              </div>
            ) : (
              <>
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                />
                <div className="py-4">
                  <span className="mb-2 text-md">Password</span>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
              </>
            )}
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember me</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-md">
              Sign in
            </button>
            <button className="w-full bg-black text-white p-2 rounded-lg mb-6 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-md">
              <FaGoogle className="w-4 h-4 inline mr-3 mt-[-3.5px]" />
              Sign in with Google
            </button>
            <div className="text-center text-gray-400">
              Dont have an account ?
              <button className="font-bold text-black" onClick={handleGetStartedClick} > Sign up</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default PageLogin;
