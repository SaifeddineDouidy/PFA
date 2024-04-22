import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateStudentProfileInformation({ mustVerifyEmail, status, className = '' }) {
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

        patch(route('student.profile.update'), formData);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Student Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information, email address, CV, and motivation letter.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Student-specific fields */}
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

                <div>
                    <InputLabel htmlFor="cv_path" value="CV" />

                    <TextInput
                        id="cv_path"
                        className="mt-1 block w-full"
                        value={data.cv_path}
                        onChange={(e) => setData('cv_path', e.target.value)}
                        autoComplete="cv_path"
                    />

                    <InputError className="mt-2" message={errors.cv_path} />
                </div>

                <div>
                    <InputLabel htmlFor="motivation_letter_path" value="Motivation Letter" />

                    <TextInput
                        id="motivation_letter_path"
                        className="mt-1 block w-full"
                        value={data.motivation_letter_path}
                        onChange={(e) => setData('motivation_letter_path', e.target.value)}
                        autoComplete="motivation_letter_path"
                    />

                    <InputError className="mt-2" message={errors.motivation_letter_path} />
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
                    <div>
                        {/* Verification email content */}
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
            </form>
        </section>
    );
}