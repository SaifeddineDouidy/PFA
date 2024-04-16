import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StudentHome from '../Components/StudentHome'; // Import StudentHome component
import CompanyHome from '../Components/CompanyHome'; // Import CompanyHome component

export default function Dashboard({ auth }) {
    const { user } = auth;
    const role = user.role; // Assuming 'role' is a property of the 'user' object

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="bg-grey py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {role === 'student' && <StudentHome />}
                            {role === 'company' && <CompanyHome />}
                            {/* Add more conditions as needed for other roles */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
