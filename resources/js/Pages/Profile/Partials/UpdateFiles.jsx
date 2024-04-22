import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import FileInput from '@/Components/FileInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function UpdateFiles({ className = '' }) {
    const { student } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        cv: student.cv_path || null,
        motivationLetter: student.motivation_letter_path || null,
    });
    
    const handleFileChange = (e, field) => {
        setData({ ...data, [field]: e.target.files[0] });
      };

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/csrf-token');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('_token', csrfToken);

            if (data.cv) {
                console.log('It exists')
                formData.append('cv', data.cv);
            }

            if (data.motivationLetter) {
                formData.append('motivationLetter', data.motivationLetter);
            }


            await patch(route('profile.update'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Files updated successfully.');
        } catch (error) {
            console.error('Error updating files:', error);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Files</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Keep your job application files up to date.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <input type="hidden" name="_token" value={csrfToken} />

                <div className="py-2">
                    <InputLabel htmlFor="cv" value="Upload CV" />
                        <input
                        type="file"
                        id="cv"
                        name="cv"
                        onChange={(e) => handleFileChange(e, 'cv')}
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        />
                        <InputError message={errors.cv} />
                </div>

                <div>
                    <InputLabel htmlFor="motivation-letter" value="Motivation Letter" />

                    <FileInput
                        id="motivation-letter"
                        name="motivationLetter"
                        value={data.motivationLetter}
                        onChange={(file) => setData('motivationLetter', file)}
                    />

                    <InputError className="mt-2" message={errors.motivationLetter} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Files updated.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}