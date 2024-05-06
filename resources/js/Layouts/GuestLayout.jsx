import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

/**
 * Guest component renders the layout for guest users.
 * @param {object} param0 - Object containing props passed to the component.
 * @param {JSX.Element} children - The content to be rendered within the guest layout.
 * @returns {JSX.Element} Rendered Guest component.
 */
export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                {/* Link to the home page */}
                <Link href="/">
                    {/* Application logo */}
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {/* Render children components */}
                {children}
            </div>
        </div>
    );
}
