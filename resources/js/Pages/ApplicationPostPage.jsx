import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '@/Components/CustomButton';
import { Head, useForm, usePage } from '@inertiajs/react'; 
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ApplicationsPostsPage = ({auth, job, company }) => {
    const { postId } = usePage().props;
    console.log('postId:', postId);
    console.log(job)
    const [cvFile, setCvFile] = useState(null);
    const [motivationLetter, setMotivationLetter] = useState('');
    const [post, setPost] = useState(null);

    

    const handleCvFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleMotivationLetterChange = (e) => {
        setMotivationLetter(e.target.value);
    };

    const handleApplicationSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('cv', cvFile);
            formData.append('motivation_letter', motivationLetter);
            formData.append('post_id', postId);

            await axios.post('/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
            console.error('Error submitting application:', error);
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
        <AuthenticatedLayout user={auth}>
            <Head title="Apply for Job" />
            <div className="bg-white p-4 rounded-sm">
                <h2 className="text-2xl text-primary font-bold mb-4">Apply for {job.job_title}</h2>
                <div className="mb-4">
                    <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
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
                <div className="mb-4">
                    <label htmlFor="cv" className="block text-primary font-medium mb-2">
                        Upload CV:
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <div className="mb-7">
                    <label htmlFor="motivation-letter" className="block text-primary font-medium mb-2">
                        Motivation Letter:
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <button
                        onClick={handleApplicationSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-primary border border-black font-medium py-2 px-4 rounded-md ease-in-out hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        Submit Application
                    </button>

        
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default ApplicationsPostsPage;