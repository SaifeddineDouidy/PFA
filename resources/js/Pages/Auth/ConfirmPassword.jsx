import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

/**
 * ConfirmPassword component renders the password confirmation form.
 * @returns {JSX.Element} Rendered ConfirmPassword component.
 */
export default function ConfirmPassword() {
    // Initialize form data, post function, processing state, errors, and reset function using useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    // Reset password field on component unmount
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault();
        // Send a post request to the password confirmation route
        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            {/* Set document title */}
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                {/* Informational message */}
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            {/* Password confirmation form */}
            <form onSubmit={submit}>
                <div className="mt-4">
                    {/* Label for the password input */}
                    <InputLabel htmlFor="password" value="Password" />

                    {/* Password input field */}
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {/* Display error message if any */}
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* Submit button */}
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
