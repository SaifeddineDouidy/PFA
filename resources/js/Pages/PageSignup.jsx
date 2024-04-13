import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Navbar';
import StudentFields from './fields/StudentFields';
import CompanyFields from './fields/CompanyFields';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {studentUserFormConfig} from './components/studentUserFormConfig';
import axios from 'axios';

const PageSignup = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: (data, context, options) => {
       console.log(data); // Log form values
       return zodResolver(studentUserFormConfig)(data, context, options);
    },
   });

// CSRF TOKEN
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
      const token = document.querySelector('meta[name="csrf-token"]');
      if (token) {
        setCsrfToken(token.getAttribute('content'));
      }
  }, []);

  // Account Type Handling
  const [accountType, setAccountType] = useState('');

  // Student/Employee Handling Fields
  const [fullname, setFullName] = useState('');
  const [cin, setCin] = useState('');
  const [cne, setCne] = useState('');
  const [schoolName, setSchool] = useState('');

  // Company Handling Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [desiredRecruitments, setDesiredRecruitments] = useState('');

  // Common fields between Student/Employee and Company
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleGetStartedClick = () => {
    // Use Inertia.visit() to navigate to the login page
    Inertia.visit('/login'); // Adjust the path as necessary
  };
  

  const onSubmit = async (formData) => {
    try {
      let signupRoute;
      let role;
      if (accountType === 'student') {
        signupRoute = '/signup/student';
        role = 'student';
      } else if (accountType === 'company') {
        signupRoute = '/signup/company';
        role = 'company';
      } else {
        return;
      }
  
      formData.role = role;
  
      // Log the form data before sending the request
      console.log('Submitting form data:', formData);
  
      const response = await axios.post(signupRoute, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      });
  
      if (response.status === 200) {
        console.log('Form data submitted successfully', response);
       } else {
        console.error('Failed to submit form data', response);
       }
       
    } catch (error) {
      console.error('An error occurred while submitting form data:', error.response.data);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center min-h-screen bg-[#000300]">
        <div className="relative flex flex-col mx-6 md:mx-auto md:max-w-xl">
          <div className="scale-95 flex flex-col justify-center p-8 w-[500px] md:p-14 bg-white shadow-2xl rounded-2xl">
            <span className="mb-3 text-4xl font-bold">Sign up</span>
            <span className="font-light text-gray-400 mb-8">
              Welcome! Please select account type and enter your details
            </span>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
              <div className="py-2">
                <span className="mb-2 text-md">Select Account Type:</span>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      value="student"
                      checked={accountType === 'student'}
                      onChange={handleAccountTypeChange}
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="company"
                      checked={accountType === 'company'}
                      onChange={handleAccountTypeChange}
                    />
                    Company
                  </label>
                </div>
              </div>
              {/* Render the appropriate form based on accountType */}
              {accountType === 'student' && (
                <StudentFields
                  register={register}
                  errors={errors}
                  control={control}
                  fullname={fullname}
                  setFullName={setFullName}
                  cin={cin}
                  setCin={setCin}
                  cne={cne}
                  setCne={setCne}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  schoolName={schoolName}
                  setSchool={setSchool}
                />
              )}

              {accountType === 'company' && (
                <CompanyFields
                  register={register}
                  errors={errors}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  country={country}
                  setCountry={setCountry}
                  companySize={companySize}
                  setCompanySize={setCompanySize}
                  jobTitle={jobTitle}
                  setJobTitle={setJobTitle}
                  desiredRecruitments={desiredRecruitments}
                  setDesiredRecruitments={setDesiredRecruitments}
                  region={region}
                  setRegion={setRegion}
                  city={city}
                  setCity={setCity}
                />
              )}

              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                Submit
              </button>

              <div className="text-center text-gray-400">
                Already have an account ?{' '}
                <button onClick={handleGetStartedClick} className="font-bold text-black">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageSignup;
