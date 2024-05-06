import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateCompanyProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        company_name: user.company_name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = {};
        if (data.company_name !== user.company_name) {
            formData.company_name = data.company_name;
        }
        if (data.email !== user.email) {
            formData.email = data.email;
        }

        patch(route('company.profile.update'), formData);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Company Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">Update your account's company name and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Company-specific fields */}
                <div>
                    <InputLabel htmlFor="company_name" value="Company Name" />
                    <TextInput
                        id="company_name"
                        className="mt-1 block w-full"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                        isFocused
                        autoComplete="company_name"
                    />
                    <InputError className="mt-2" message={errors.company_name} />
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

                {/* Verification email section */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>{/* Verification email content */}</div>
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
            </form>
        </section>
    );
}
