import React from 'react';
import EmployeeLayout from '../Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FiTrash, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { Link } from '@inertiajs/inertia-react';
import { format } from 'date-fns';

export default function MyApplications({auth}) {
    const { user } = auth;
    const { applications } = usePage().props;

    const handleDeleteApplication = async (applicationId) => {
        try {
            await axios.delete(`/applications/${applicationId}`);
            // You might need to update the state or refetch the data after deletion
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    return (
        <EmployeeLayout user={user} userId={user.id}>
            <Head title="My Applications" />
            <div className="bg-white p-4 rounded-sm">
                <h2 className="text-2xl text-primary font-bold mb-4">My Applications</h2>
                {applications.length === 0 ? (
                    <p>You haven't submitted any applications yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.map((application) => (
                            <div key={application.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                    <Link href={`/detailjobs/${application.job.id}`} className="text-lg text-primary font-semibold hover:text-gray-500 transition-colors">
                                        {application.job.jobTitle}
                                    </Link>
                                        <div className="text-gray-600 mb-2">{application.job.companyName}</div>
                                        <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <FiClock />
                                                {application.job.jobLocation}
                                            </span>
                                            {application.job.minPrice !== null && application.job.maxPrice !== null && (
                                                <span className="flex items-center gap-1">
                                                <FiDollarSign />
                                                {parseInt(application.job.minPrice)}-{parseInt(application.job.maxPrice)}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-2">
                                                <FiCalendar />
                                                {application.job.postingDate}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <p>Application sent, the :</p>
                                                <FiCalendar />
                                                {format(new Date(application.created_at), 'MMM d, yyyy')}
                                            </span>
                                        </div>
                                        <div className="text-gray-700">
                                            <h3 className="text-lg font-semibold">Job Description:</h3>
                                            <p>{application.job.description}</p>
                                        </div>
                                        <div className="text-gray-700">
                                            <h3 className="text-lg font-semibold">Status:</h3>
                                            <p
                                                className={`px-2 py-1 rounded-md text-white font-medium ${
                                                    application.status === 'pending'
                                                        ? 'bg-yellow-500'
                                                        : application.status === 'rejected'
                                                        ? 'bg-red-500'
                                                        : 'bg-green-500'
                                                }`}
                                            >
                                                {application.status}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteApplication(application.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FiTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </EmployeeLayout>
    );
}