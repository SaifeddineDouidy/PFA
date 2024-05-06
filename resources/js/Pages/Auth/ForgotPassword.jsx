import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

/**
 * ForgotPassword component renders the forgot password form.
 * @param {string} status - The status message.
 * @returns {JSX.Element} Rendered ForgotPassword component.
 */
export default function ForgotPassword({ status }) {
    // Initialize form data, post function, processing state, and errors using useForm hook
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault();
        // Send a post request to the password reset email route
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            {/* Set document title */}
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                {/* Informational message */}
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
            </div>

            {/* Display status message if any */}
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/* Forgot password form */}
            <form onSubmit={submit}>
                {/* Email input field */}
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                {/* Display error message if any */}
                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    {/* Submit button */}
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
