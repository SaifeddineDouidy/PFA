import React, { useState } from 'react';
import axios from 'axios';
import { Head, usePage } from '@inertiajs/react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeLayout from '../Layouts/EmployeeLayout';

const FileInput = ({ label, name, value, onChange }) => {
    const [fileError, setFileError] = useState('');
    const [fileValue, setFileValue] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileExtension = file?.name.split('.').pop().toLowerCase();

        if (fileExtension !== 'pdf') {
            setFileError(name === 'motivation_letter' ? 'Please upload a PDF file (optional).' : 'Please upload a PDF file.');
            e.target.value = ''; // Clear the file input
            setFileValue('');
        } else {
            setFileError('');
            setFileValue(e.target.value);
            onChange(file);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-primary font-medium mb-2">
                {label}
            </label>
            <input
                type="file"
                id={name}
                name={name}
                value={fileValue}
                onChange={(e) => handleFileChange(e)}
                className="file-input file-input-bordered file-input-primary w-full"
                accept=".pdf"
                required={name !== 'motivation_letter'} // Remove the required attribute for motivation_letter
            />
            {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
        </div>
    );
};

const ApplicationsPostsPage = ({ auth, job, company }) => {
    const { user } = auth;
    const [cvFile, setCvFile] = useState(null);
    const [motivationLetter, setMotivationLetter] = useState('');

    const handleCvFileChange = (file) => {
        setCvFile(file);
    };
    
    const handleMotivationLetterChange = (file) => {
        setMotivationLetter(file);
    };

    const handleApplicationSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('cv_file', cvFile);
            if (motivationLetter) {
                formData.append('motivation_letter', motivationLetter);
            }
            formData.append('job_id', job.id);
            formData.append('company_id', company.id);
            // Log the contents of the FormData object
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }            
            await axios.post('/applications', formData, {
                transformRequest: () => formData, 
            });
    
            toast.success('Application submitted successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch (error) {
            console.log("Error Data: ", error.response.data);
            toast.error('Error submitting application. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <EmployeeLayout user={auth} userId={user.id}>
            <Head title="Apply for Job" />
            <div className="bg-white p-4 rounded-sm h-screen">
                <h2 className="text-2xl text-primary font-bold mb-4">Apply for {job.job_title}</h2>
                <div className="flex w-full">
                    <div className=" bg-gray-200 grid h-full flex-grow card rounded-box p-4">
                        <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                            <h1 className="text-lg text-primary flex items-center">{job.jobTitle}</h1>
                            <span className="flex items-center gap-2">
                                <FiMapPin aria-label="Job Location" />
                                {job.jobLocation}
                            </span>
                            <span className="flex items-center gap-2">
                                <FiClock />
                                {job.employmentType}
                            </span>
                            {job.minPrice !== null && job.maxPrice !== null && (
                                <span className="flex items-center gap-1">
                                    <FiDollarSign />
                                    {parseInt(job.minPrice)}-{parseInt(job.maxPrice)}
                                </span>
                            )}
                            <span className="flex items-center gap-2">
                                <FiCalendar />
                                {job.postingDate}
                            </span>
                        </div>
                        <div className="text-gray-700 mb-2">
                            <h3 className="text-lg font-semibold">Job Description:</h3>
                            <p>{job.description}</p>
                        </div>
                        <div className="text-gray-700">
                            <h3 className="text-lg font-semibold">Requirements:</h3>
                            {job.requirments ? (
                                <ul className="list-disc pl-4">
                                    {job.requirments.split(',').map((requirment, index) => (
                                        <li key={index}>{requirment.trim()}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No requirements listed.</p>
                            )}
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                   
                        <div className="p-4 border border-gray-300 rounded-md w-full max-w-md">
                            <h3 className="text-xl text-primary font-bold mb-4">Application Form</h3>
                            {/*<div className="mb-4">
                                <label htmlFor="name" className="block text-primary font-medium mb-2">
                                    Name:
                                </label>
                                <input type="text" className="input input-bordered input-primary w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-primary font-medium mb-2">
                                    Email:
                                </label>
                                <input type="email" className="input input-bordered input-primary bg-neutral w-full" />
                            </div>
                            <div className="mb-7">
                                <label htmlFor="phone" className="block text-primary font-medium mb-2">
                                    Phone:
                                </label>
                                <input type="tel" className="input input-bordered input-primary w-full" />
                        </div>*/}
                            <div className="mb-4">
                            <FileInput label="Upload CV" name="cv" value={cvFile} onChange={handleCvFileChange} />
                            </div>
                            <div className="mb-7">
                            <FileInput label="Motivation Letter" name="motivation_letter" value={motivationLetter} onChange={handleMotivationLetterChange} />
                            </div>
                            <div className="flex justify-start mt-5">
                                <button
                                    onClick={handleApplicationSubmit}
                                    className="flex bg-blue-500 hover:bg-blue-600 text-primary border border-black font-medium py-2 px-4 rounded-md ease-in-out hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <ToastContainer />
        </EmployeeLayout>
    );
};

export default ApplicationsPostsPage;