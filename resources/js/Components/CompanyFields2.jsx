import React from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CitySelect, CountrySelect, StateSelect } from 'react-country-state-city';
import "react-country-state-city/dist/react-country-state-city.css"
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const CompanyFields = ({
  register,
  errors,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  region,
  setRegion,
  city,
  setCity,
  companyName,
  setCompanyName,
  companySize,
  setCompanySize,
  jobTitle,
  setJobTitle,
  desiredRecruitments,
  setDesiredRecruitments
}) => {
  return (
    <>
      <div className="py-2">
        <InputLabel htmlFor="firstName" value="First Name" />
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.firstName} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="lastName" value="Last Name" />
        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.lastName} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="phoneNumber" value="Num Téléphone" />
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
        <InputError message={errors.phoneNumber} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="country" value="Country/Region/City" />
        <div className="flex flex-col gap-2">
          <CountrySelect
            value={country}
            placeHolder="Select Country"
            onChange={(val) => setCountry(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
          <StateSelect
            country={country}
            value={region}
            placeHolder="Select Region"
            onChange={(val) => setRegion(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
          <CitySelect
            country={country}
            region={region}
            placeHolder="Select City"
            value={city}
            onChange={(val) => setCity(val)}
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          />
        </div>
        <InputError message={errors.country} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="companyName" value="Company Name" />
        <TextInput
          id="companyName"
          name="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.companyName} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="companySize" value="Company Size" />
        <TextInput
          id="companySize"
          name="companySize"
          type="text"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.companySize} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="jobTitle" value="Job Title" />
        <TextInput
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.jobTitle} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="desiredRecruitments" value="Desired Recruitments" />
        <TextInput
          id="desiredRecruitments"
          name="desiredRecruitments"
          type="text"
          value={desiredRecruitments}
          onChange={(e) => setDesiredRecruitments(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.desiredRecruitments} />
      </div>
    </>
  );
};

export default CompanyFields;
