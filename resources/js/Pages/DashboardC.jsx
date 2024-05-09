import AuthenticatedLayoutC from '@/Layouts/AuthenticatedLayoutC';
import React from 'react';
import Home from '@/Components/Home';
import { Head } from '@inertiajs/react';


export default function DashboardC({ auth, userId }) {
    const { user } = auth;
    return (
        <AuthenticatedLayoutC
            user={user}
            userId={userId}
        >
            <Head title="Dashboard" />
            <div className="bg-grey-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900">
                            <Home />
                            {/* Add more conditions as needed for other roles */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutC>
    );
}
