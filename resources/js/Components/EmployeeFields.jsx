import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const EmployeeFields = ({ data, setData, errors }) => {
  // Destructure the relevant properties from the data object
  const { fullname, cin, phoneNumber, educationLevel, cv, motivationLetter } = data;

  // Function to handle file changes for CV and Motivation Letter
  const handleFileChange = (e, fieldName) => {
    const newData = { ...data };
    newData[fieldName] = e.target.files[0];
    setData(newData);
  };

  return (
    <>
      {/* Full Name field */}
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

      {/* CIN field */}
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

      {/* Phone Number field */}
      <div className="py-2">
        <InputLabel htmlFor="phoneNumber" value="Num Téléphone" />
        <PhoneInput
          country={'ma'}
          value={phoneNumber || ''}
          className='text-primary'
          onChange={(phone) => setData({ ...data, phoneNumber: phone })}
          inputProps={{
            name: 'phoneNumber',
            id: 'phoneNumber',
            style: { width: '100%' }
          }}
        />
        <InputError message={errors.phoneNumber} />
      </div>

      {/* Education Level dropdown */}
      <div className="py-2">
        <InputLabel htmlFor="educationLevel" value="Education Level" />
        <select
          id="educationLevel"
          name="educationLevel"
          value={educationLevel || ''}
          onChange={(e) => setData({ ...data, educationLevel: e.target.value })}
          className="w-full text-primary p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        >
          <option value="">Select Education Level</option>
          <option value="Licence (BAC+3)">Licence (BAC+3)</option>
          <option value="Master (BAC+5)">Master (BAC+5)</option>
          <option value="Ingénieur (BAC+5)">Ingénieur (BAC+5)</option>
          <option value="Doctorat (BAC+8)">Doctorat (BAC+8)</option>
        </select>
        <InputError message={errors.educationLevel} />
      </div>

      {/* CV file upload */}
      <div className="py-2">
        <InputLabel htmlFor="cv" value="Upload CV" />
        <input
          type="file"
          id="cv"
          name="cv"
          onChange={(e) => handleFileChange(e, 'cv')}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
        <InputError message={errors.cv} />
      </div>

      {/* Motivation Letter file upload */}
      <div className="py-2">
        <InputLabel htmlFor="motivationLetter" value="Upload Additional Documents (Motivation Letter)" />
        <input
          type="file"
          id="motivationLetter"
          name="motivationLetter"
          onChange={(e) => handleFileChange(e, 'motivationLetter')}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
        <InputError message={errors.motivationLetter} />
      </div>
    </>
  );
};

export default EmployeeFields;