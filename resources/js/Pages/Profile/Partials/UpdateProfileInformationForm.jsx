import UpdateEmployeeProfileInformation from './UpdateEmployeeProfileInformation';
import UpdateCompanyProfileInformation from './UpdateCompanyProfileInformation';
import UpdateFiles from './UpdateFiles';
import { usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;

    return (
        <div>
            {user.role === 'employee' ? (
                
                <UpdateEmployeeProfileInformation
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className={className}
                />
                
            ) : (
                <UpdateCompanyProfileInformation
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className={className}
                />
            )}
        </div>
    );
}