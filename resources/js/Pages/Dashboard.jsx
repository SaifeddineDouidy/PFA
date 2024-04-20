import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StudentHome from '../Components/StudentHome';
import CompanyHome from '../Components/CompanyHome'; 

export default function Dashboard({ auth }) {
    const { user } = auth;
    const role = user.role;

    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title="Dashboard" />
            <div className="bg-grey-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">
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
