import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import UpdateFiles from './UpdateFiles';

export default function UpdateEmployeeProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        fullname: user.fullname,
        email: user.email,
        cv_path: user.cv_path,
        motivation_letter_path: user.motivation_letter_path,
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = {};
        if (data.fullname !== user.fullname) {
            formData.fullname = data.fullname;
        }
        if (data.email !== user.email) {
            formData.email = data.email;
        }
        if (data.cv_path !== user.cv_path) {
            formData.cv_path = data.cv_path;
        }
        if (data.motivation_letter_path !== user.motivation_letter_path) {
            formData.motivation_letter_path = data.motivation_letter_path;
        }

        patch(route('employee.profile.update'), formData);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Employee Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information, email address, CV, and motivation letter.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Employee-specific fields */}
                <div>
                    <InputLabel htmlFor="fullname" value="Full Name" />

                    <TextInput
                        id="fullname"
                        className="mt-1 block w-full"
                        value={data.fullname}
                        onChange={(e) => setData('fullname', e.target.value)}
                        isFocused
                        autoComplete="fullname"
                    />

                    <InputError className="mt-2" message={errors.fullname} />
                </div>


                {/* Common fields */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}


                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-[#00FF33]">Saved.</p>
                    </Transition>
                </div>

                <UpdateFiles className="max-w-xl mt-5" />
                
            </form>
        </section>
    );
}