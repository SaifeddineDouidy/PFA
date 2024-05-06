import EmployeeHome from '../Components/EmployeeHome'
import CompanyHome from '../Components/CompanyHome'
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
function AuthPageAccueil({auth}) {
  const { user, role } = auth;

  return (
          <EmployeeLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Page d'accueil</h2>}>
            <Head title={`Page d'Accueil (${role})`} />
            {role === 'employee' && <EmployeeHome />}
            {role === 'company' && <CompanyHome />}

        </EmployeeLayout>
    
    
  )
}

export default AuthPageAccueil
