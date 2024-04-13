import { z } from 'zod';

export const studentUserFormConfig = z.object({
  fullname: z.string().min(2, 'Full Name must be at least 10 characters').max(100, 'Name must be at most 30 characters'),
  cin: z.string().min(6, 'CIN must be at least 6 characters').max(15, 'CIN must be at most 15 characters'),
  cne: z.string().min(10, 'CNE must be at least 10 characters').max(11, 'CNE must be at most 10 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number').max(15, 'Invalid phone number'),
  schoolName: z.string().min(2, 'School/University name must be at least 2 characters').max(100, 'School/University name must be at most 100 characters'),
  email: z.string().email('Invalid email format').min(6, 'Email must be at least 6 characters').max(255, 'Email must be at most 255 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password must be at most 100 characters'),
  // Add more fields and validation rules as needed
});
export default studentUserFormConfig;
 

/*import * as Yup from "yup";
const studentUserFormConfig = {
  fields: [
    { name: "fullname", label: "Fullname", inputType: "text", customClassName: "" },
    { name: "cin", label: "CIN", inputType: "text", customClassName: "" },
    { name: "cne", label: "CNE", inputType: "text", customClassName: "" },
    { name: "tel", label: "Numéro", inputType: "tel", customClassName: "" },
    { name: "school", label: "School/University Name", inputType: "text", customClassName: "" },
    { name: "email", label: "Email", inputType: "email", customClassName: "" },
    { name: "password", label: "Password", inputType: "password", customClassName: "" }
  ],
  validationSchema: Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    cin: Yup.string().required('CIN is required'),
    cne: Yup.string().required('CNE is required'),
    tel: Yup.string().required('Num Téléphone is required'),
    school: Yup.string().required('School/University Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  }),
};
*/