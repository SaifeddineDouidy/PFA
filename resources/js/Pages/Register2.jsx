import React, { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import StudentFields2 from '../Components/StudentFields2';
import CompanyFields2 from '../Components/CompanyFields2';
import axios from 'axios';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        _token: '', 
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [csrfToken, setCsrfToken] = useState(''); // State to store the CSRF token

    useEffect(() => {
        // Fetch the CSRF token when the component mounts
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/csrf-token');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const [accountType, setAccountType] = useState('student');

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...data,
                accountType,
            };

            let endpoint;
            if (accountType === 'student') {
                endpoint = '/register/student';
            } else if (accountType === 'company') {
                endpoint = '/register/company';
            } else {
                throw new Error('Invalid account type');
            }

            const response = await axios.post(endpoint, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, // Use the CSRF token from your state
                },
            });

            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="max-w-lg mx-auto mt-8">
                <div className="text-left">
                    <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
                    <p className="text-gray-500 mb-8">Welcome! Please select your account type and fill in your details.</p>
                </div>
                <form onSubmit={submit}>
                    {/* Render account type selection */}
                    <InputLabel value="Select Account Type" />
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="student"
                                name="accountType"
                                value="student"
                                checked={accountType === 'student'}
                                onChange={() => handleAccountTypeChange('student')}
                            />
                            <label htmlFor="student" className="ml-2">Student</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="company"
                                name="accountType"
                                value="company"
                                checked={accountType === 'company'}
                                onChange={() => handleAccountTypeChange('company')}
                            />
                            <label htmlFor="company" className="ml-2">Company</label>
                        </div>
                    </div>

                    {/* Render fields based on account type */}
                    {accountType === 'student' && <StudentFields2 {...{ data, setData, errors }} />}
                    {accountType === 'company' && <CompanyFields2 {...{ data, setData, errors }} />}

                    {/* Common Fields */}

                    <div className="py-2">
                        <InputLabel htmlFor="email" value="Email/Username" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={data.email || ''} // Access email from data object
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="py-2">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={data.password || ''} // Access password from data object
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="py-2">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation || ''} // Access password_confirmation from data object
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData({ ...data, password_confirmation: e.target.value })} // Update state correctly
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                    {/* Submit button */}
                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
