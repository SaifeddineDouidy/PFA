import {useRef} from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PhoneInput from 'react-phone-input-2';
import TextInput from '@/Components/TextInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
//import UpdateFiles from './UpdateFiles';

export default function UpdateEmployeeProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { user } = usePage().props.auth;
    const emp = usePage().props.employee;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        fullname: emp.fullname,
        email: user.email,
        cin: emp.cin, 
        phoneNumber: emp.phoneNumber,
        educationLevel: emp.educationLevel,

    });

    // Create refs for the fullname, cin, and educationLevel inputs
    const fullnameInputRef = useRef(null);
    const cinInputRef = useRef(null);
    const educationLevelSelectRef = useRef(null);
    const phoneNumberSelectRef = useRef(null);

    // Function to focus the fullname input field
    const focusFullNameInput = () => {
        fullnameInputRef.current.focus();
    };

    // Function to focus the phoneNumber input field
    const focusPhoneNumberInput = () => {
        phoneNumberInputRef.current.focus();
    };

    // Function to focus the cin input field
    const focusCinInput = () => {
        cinInputRef.current.focus();
    };

    // Function to focus the educationLevel select field
    const focusEducationLevelSelect = () => {
        educationLevelSelectRef.current.focus();
    };

    const submit = (e) => {
        e.preventDefault()

        const formData = {}
        if (data.fullname !== emp.fullname) {
            formData.fullname = data.fullname
        }
        if (data.cin !== user.cin) {
            formData.cin = data.cin
        }
        if (data.phoneNumber !== user.phoneNumber) {
            formData.phoneNumber = data.phoneNumber
        }
        if (data.educationLevel !== user.educationLevel) {
            formData.educationLevel = data.educationLevel
        }
        if (data.email !== user.email) {
            formData.email = data.email
        }

        patch(route('employee.profile.update'), formData, {
            onSuccess: () => {
                toast.success('Profile information updated successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            },
            onError: () => {
                toast.error('There was an error updating your profile information. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            },
        })
    }
    return (
        
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Employee Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="mt-4 text-md text-[#27c747]">Saved.</p>
            </Transition>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Employee-specific fields */}
                <div>
                    <InputLabel htmlFor="fullname" value="Full Name" />

                    <TextInput
                        id="fullname"
                        className="mt-1 block w-full"
                        value={data.fullname}
                        onChange={(e) => setData('fullname', e.target.value)}
                        ref={fullnameInputRef} // Attach ref here
                        autoComplete="fullname"
                    />

                    <InputError className="mt-2" message={errors.fullname} />
                </div>
                <div>
                    <InputLabel htmlFor="cin" value="CIN" />

                    <TextInput
                        id="cin"
                        className="mt-1 block w-full text-primary"
                        value={data.cin}
                        onChange={(e) => setData('cin', e.target.value)}
                        ref={cinInputRef} // Attach ref here
                        autoComplete="cin"
                    />

                    <InputError className="mt-2" message={errors.cin} />
                </div>
                <div>
                    <InputLabel htmlFor="educationLevel" value="Education Level" />
                    <select
                        id="educationLevel"
                        name="educationLevel"
                        value={data.educationLevel}
                        onChange={(e) => setData('educationLevel', e.target.value)}
                        ref={educationLevelSelectRef} // Attach ref here
                        className="w-full text-primary p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    >
                        <option value="">Select Education Level</option>
                        <option value="Licence (BAC+3)">Licence (BAC+3)</option>
                        <option value="Master (BAC+5)">Master (BAC+5)</option>
                        <option value="Ingénieur (BAC+5)">Ingénieur (BAC+5)</option>
                        <option value="Doctorat (BAC+8)">Doctorat (BAC+8)</option>
                    </select>
                    <InputError message={errors.educationLevel} />
                </div>
                <div>
                    <InputLabel htmlFor="phoneNumber" value="Num Téléphone" />
                    <PhoneInput
                    country={'ma'}
                    value={data.phoneNumber}
                    ref={phoneNumberSelectRef}
                    className='text-primary'
                    onChange={(phone) => setData({ ...data, phoneNumber: phone })}
                    inputProps={{
                        name: 'phoneNumber',
                        id: 'phoneNumber',
                        style: { width: '100%' }
                    }}
                    />
                    <InputError message={errors.phoneNumber} />
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
                    <PrimaryButton disabled={processing} className='mt-5'>Save</PrimaryButton>
                </div>

            {/*<UpdateFiles className="max-w-xl mt-5" />*/}
                
            </form>
            <ToastContainer />
        </section>
    );
}