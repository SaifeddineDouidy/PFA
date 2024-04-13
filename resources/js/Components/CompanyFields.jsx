import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CitySelect, CountrySelect, StateSelect, } from 'react-country-state-city';
import "react-country-state-city/dist/react-country-state-city.css";

const CompanyFields = ({ register, errors ,firstName, setFirstName, lastName, setLastName,email, setEmail, password, setPassword,  phoneNumber, setPhoneNumber, country, setCountry, region, setRegion, city, setCity, companyName, setCompanyName, companySize, setCompanySize, jobTitle, setJobTitle, desiredRecruitments, setDesiredRecruitments }) => {

  return (
    <>
      <div className="py-2">
        <span className="mb-2 text-md">First Name</span>
        <input
          type="text"
          value={firstName}
          {...register('firstName')}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="firstName"
          id="firstName"
        />
        {errors.firstName && <p className="text-red-500">{`${errors.firstName.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Last Name</span>
        <input
          type="text"
          value={lastName}
          {...register('lastName')}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="lastName"
          id="lastName"
        />
        {errors.lastName && <p className="text-red-500">{`${errors.lastName.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Num Téléphone</span>
        <PhoneInput
          country={'ma'}
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          inputProps={{
            name: 'phoneNumber',
            id: 'phoneNumber',
            style: { width: '100%' }
          }}
        />
        {errors.phoneNumber && <p className="text-red-500">{`${errors.phoneNumber.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Email</span>
        <input
          type="email"
          value={email}
          {...register('email')}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="email"
          id="email"
        />
        {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Password</span>
        <input
          type="password"
          value={password}
          {...register('password')}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="password"
          id="password"
        />
        {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Country/Region/City</span>
        <div className="flex flex-col gap-2">
          <CountrySelect
            value={country}
            onChange={(val) => setCountry(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
          <StateSelect
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
          <CitySelect
            country={country}
            region={region}
            value={city}
            onChange={(val) => setCity(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        {errors.country && <p className="text-red-500">{`${errors.country.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Company Name</span>
        <input
          type="text"
          value={companyName}
          {...register('companyName')}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="companyName"
          id="companyName"
        />
        {errors.companyName && <p className="text-red-500">{`${errors.companyName.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Company Size</span>
        <input
          type="text"
          value={companySize}
          {...register('companySize')}
          onChange={(e) => setCompanySize(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="companySize"
          id="companySize"
        />
        {errors.companySize && <p className="text-red-500">{`${errors.companySize.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Job Title</span>
        <input
          type="text"
          value={jobTitle}
          {...register('jobTitle')}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="jobTitle"
          id="jobTitle"
        />
        {errors.jobTitle && <p className="text-red-500">{`${errors.jobTitle.message}`}</p>}
      </div>
      <div className="py-2">
        <span className="mb-2 text-md">Desired Recruitments</span>
        <input
          type="text"
          value={desiredRecruitments}
          {...register('desiredRecruitments')}
          onChange={(e) => setDesiredRecruitments(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="desiredRecruitments"
          id="desiredRecruitments"
        />
        {errors.desiredRecruitments && <p className="text-red-500">{`${errors.desiredRecruitments.message}`}</p>}
      </div>
    </>
  );
};

export default CompanyFields;
