import React from 'react';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import EmployeeHome from '../Components/EmployeeHome';

export default function EmployeeDashboard({ auth, userId }) {
    const { user } = auth;
    return (
        <EmployeeLayout
            user={user}
            userId={userId}
        >
            <Head title="Dashboard" />
            <div className="bg-grey-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">
                            <EmployeeHome />
                            {/* Add more conditions as needed for other roles */}
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeLayout>
    );
}
