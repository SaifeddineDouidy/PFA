import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import FileInput from '@/Components/FileInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateFiles({ className = '' }) {
    const { user } = usePage().props;

    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm({
        cv: null,
        motivationLetter: null,
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            await patch(route('profile.update-files'), {
                cv: data.cv,
                motivationLetter: data.motivationLetter,
            });
        } catch (error) {
            // Handle any errors that occur during the file upload
            console.error('Error uploading files:', error);
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

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="cv" value="Curriculum Vitae (CV)" />

                    <FileInput
                        id="cv"
                        value={data.cv}
                        onChange={(file) => setData('cv', file)}
                    />

                    <InputError className="mt-2" message={errors.cv} />
                </div>

                <div>
                    <InputLabel htmlFor="motivation-letter" value="Motivation Letter" />

                    <FileInput
                        id="motivation-letter"
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