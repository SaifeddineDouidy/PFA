import React from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import schoolData from '../../assets/data/schools.json';
import { studentUserFormConfig } from '../Components/studentUserFormConfig';

const StudentFields = ({ register, errors, control,fullname, setFullName, cin, setCin, cne, setCne,email,setEmail, password, setPassword,  phoneNumber, setPhoneNumber, schoolName, setSchool}) => {
  
  return (
    <>
      <div className="py-2">
        <span className="mb-2 text-md">Full Name</span>
        <input
          type="text"
          {...register('fullname')}
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full p-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:font-light placeholder:text-gray-500`}
          name="fullname"
          id="fullname"
        />
        {errors.fullname && <p className="text-red-500">{`${errors.fullname.message}`}</p>}
      </div>

      <div className="py-2">
        <span className="mb-2 text-md">CIN</span>
        <input
          type="text"
          {...register('cin')}
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="cin"
          id="cin"
        />
        {errors.cin && <p className="text-red-500">{`${errors.cin.message}`}</p>}
      </div>

      <div className="py-2">
        <span className="mb-2 text-md">CNE</span>
        <input
          type="text"
          {...register('cne')}
          value={cne}
          onChange={(e) => setCne(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="cne"
          id="cne"
        />
        {errors.cne && <p className="text-red-500">{`${errors.cne.message}`}</p>}
      </div>

      <div className="py-2">
      <span className="mb-2 text-md">Num Téléphone</span>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue={phoneNumber}
        render={({ field }) => (
          <PhoneInput
            country={'ma'}
            value={field.value} // Update value prop
            onChange={(value) => field.onChange(value)} // Update onChange prop
            inputProps={{
              name: 'phoneNumber',
              id: 'phoneNumber',
              style: { width: '100%' }
            }}
          />
        )}
      />
      {errors.phoneNumber && <p className="text-red-500">{`${errors.phoneNumber.message}`}</p>}
    </div>



      <div className="py-2">
        <span className="mb-2 text-md">School/University Name</span>
        <select
          {...register('schoolName')}
          value={schoolName}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="schoolName"
          id="schoolName"
        >
          <option value="">Select School/University</option>
          {schoolData.map((school) => (
            <option key={school.id} value={school.name}>{school.name}</option>
          ))}
        </select>
        {errors.schoolName && <p className="text-red-500">{`${errors.schoolName.message}`}</p>}
      </div>

      <div className="py-2">
        <span className="mb-2 text-md">Email/Username</span>
        <input
          type="email"
          {...register('email')}
          value={email}
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
          {...register('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="password"
          id="password"
        />
        {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
      </div>

      <div className="py-2">
        <span className="mb-2 text-md">Upload CV</span>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="cv"
          id="cv"
        />
      </div>

      <div className="py-2">
        <span className="mb-2 text-md">Upload Additional Documents (Motivation Letter)</span>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="additionalDocs"
          id="additionalDocs"
        />
      </div>
    </>
  );
};

export default StudentFields;
