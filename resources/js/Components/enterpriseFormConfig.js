import { z } from 'zod';

export const enterpriseFormConfig = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be at most 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be at most 50 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number').max(15, 'Invalid phone number').regex(/^\+?\d{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email format').min(6, 'Email must be at least 6 characters').max(255, 'Email must be at most 255 characters'),
  country: z.string().min(2, 'Country name must be at least 2 characters').max(50, 'Country name must be at most 50 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be at most 100 characters'),
  companySize: z.enum(['small', 'medium', 'large']).optional(),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters').max(100, 'Job title must be at most 100 characters'),
  desiredRecruitments: z.string().min(2, 'Desired recruitments must be at least 2 characters').max(255, 'Desired recruitments must be at most 255 characters'),
  // Add more fields and validation rules as needed
});
export default enterpriseFormConfig;




/*
const enterpriseFormConfig = {
  fields: [
    { name: "firstName", label: "First Name", inputType: "text" },
    { name: "lastName", label: "Last Name", inputType: "text" },
    { name: "phoneNumber", label: "Phone Number", inputType: "tel" },
    { name: "email", label: "Email", inputType: "email" },
    { name: "password", label: "Password", inputType: "password" },
    { name: "country", label: "Country/Region", inputType: "text" },
  ],
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    country: Yup.string().required('Country/Region is required'),
    // Add more validation rules as needed
  }),
};
*/
