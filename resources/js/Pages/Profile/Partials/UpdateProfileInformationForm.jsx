import UpdateStudentProfileInformation from './UpdateStudentProfileInformation';
import UpdateCompanyProfileInformation from './UpdateCompanyProfileInformation';
import { usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;

    return (
        <div>
            {user.role === 'student' ? (
                <UpdateStudentProfileInformation
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