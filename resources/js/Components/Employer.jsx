import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Employee = () => {
    const [cvFile, setCvFile] = useState([]);
    const [motivationLetter, setMotivationLetter] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => { 
        console.log(data);
        fetch("http://localhost:3001/offre-employee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            alert(" Offre Bien envoyé !");
          /*  history.push('/');*/
            // Vous pouvez ajouter d'autres traitements ici si nécessaire
        })
        .catch((error) => {
            console.error('Erreur:', error);
        });
        data.cvFilePath = `/chemin/vers/le/repertoire/${cvFile.name}`;
        data.motivationLetterPath = `/chemin/vers/le/repertoire/${motivationLetter.name}`;
    };

    const handleCvFileChange = (e) => {
        const file = e.target.files[0];
        setCvFile(file);
    };

    const handleMotivationLetterChange = (e) => {
        const file = e.target.files[0];
        setMotivationLetter(file);
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-2 px-4'>
            <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Nom et Prénom</label>
                            <input type="text" defaultValue={""} {...register("fullName")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>CIN</label>
                            <input type="text" defaultValue={""} {...register("cin")} className='create-job-input' />
                        </div>
                    </div>

                    <div className='create-job-flex'>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Numéro de téléphone</label>
                            <input type="Number" defaultValue={""} {...register("phoneNumber")} className='create-job-input' />
                        </div>
                        <div className='lg:w-1/2 w-full'>
                            <label className='block mb-2 text-lg'>Email</label>
                            <input type="email" defaultValue={""} {...register("email")} className='create-job-input' />
                        </div>
                    </div>

                    <div className='create-job-flex'>
                        <label htmlFor="cvFile">Votre CV :</label><br/>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvFileChange}  {...register("cvFile")}className='create-job-input' />
                    </div>
                    <div className='create-job-flex'>
                        <label htmlFor="motivationLetter">Votre Lettre de motivation :</label><br/>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleMotivationLetterChange}  {...register("motivationLetter")}className='create-job-input' />
                    </div>
                    <input type="submit" value="Postuler" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
                </form>
            </div>
        </div>
    );
}

export default Employee;
