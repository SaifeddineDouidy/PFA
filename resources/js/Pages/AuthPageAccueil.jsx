import EmployeeHome from '../Components/EmployeeHome'
import CompanyHome from '../Components/CompanyHome'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
function AuthPageAccueil({auth}) {
  const { user, role } = auth;

  return (
          <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Page d'accueil (Employee)</h2>}>
            <Head title={`Page d'Accueil (${role})`} />
            {role === 'employee' && <EmployeeHome />}
            {role === 'company' && <CompanyHome />}

        </AuthenticatedLayout>
    
    
  )
}

export default AuthPageAccueil
