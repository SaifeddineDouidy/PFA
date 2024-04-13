import React from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import schoolData from '../../assets/data/schools.json';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const StudentFields = ({ data, setData, errors  }) => {
  const { fullname, cin, cne, phoneNumber, schoolName } = data;

  return (
    <>
      <div className="py-2">
        <InputLabel htmlFor="fullname" value="Full Name" />
        <TextInput
          id="fullname"
          name="fullname"
          value={fullname || ''} // Ensure fullname is defined

          onChange={(e) => setData({ ...data, fullname: e.target.value })}
          className={`w-full p-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:font-light placeholder:text-gray-500`}
          required
        />
        <InputError message={errors.fullname} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="cin" value="CIN" />
        <TextInput
          id="cin"
          name="cin"
          type="text"
          value={cin || ''}
          onChange={(e) => setData({ ...data, cin: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.cin} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="cne" value="CNE" />
        <TextInput
          id="cne"
          name="cne"
          type="text"
          value={cne || ''}
          onChange={(e) => setData({ ...data, cne: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.cne} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="phoneNumber" value="Num Téléphone" />
        <PhoneInput
          country={'ma'}
          value={phoneNumber || ''}
          onChange={(phone) => setData({ ...data, phoneNumber: phone })}          inputProps={{
            name: 'phoneNumber',
            id: 'phoneNumber',
            style: { width: '100%' }
          }}
        />
        <InputError message={errors.phoneNumber} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="schoolName" value="School/University Name" />
        <select
          id="schoolName"
          name="schoolName"
          value={schoolName || ''}
          onChange={(e) => setData({ ...data, schoolName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        >
          <option value="">Select School/University</option>
          {schoolData.map((school) => (
            <option key={school.id} value={school.name}>{school.name}</option>
          ))}
        </select>
        <InputError message={errors.schoolName} />
      </div>

      

      <div className="py-2">
        <InputLabel htmlFor="cv" value="Upload CV" />
        <input
          type="file"
          id="cv"
          name="cv"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="additionalDocs" value="Upload Additional Documents (Motivation Letter)" />
        <input
          type="file"
          id="additionalDocs"
          name="additionalDocs"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
      </div>
    </>
  );
};

export default StudentFields;
