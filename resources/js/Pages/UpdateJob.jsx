import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';

const UpdateJob = () => {
    const { id } = useParams();
    const { jobTitle: initialJobTitle, companyName: initialCompanyName, ...initialData } = useLoaderData();
    const [selectedOption, setSelectedOption] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetch(`http://localhost:3001/all-jobs/${id}`)
            .then(response => response.json())
            .then(data => {
                setValue("jobTitle", data.jobTitle || '');
                setValue("companyName", data.companyName || '');
                setValue("minPrice", data.minPrice || '');
                setValue("maxPrice", data.maxPrice || '');
                setValue("salaryType", data.salaryType || '');
                setValue("jobLocation", data.jobLocation || '');
                setValue("postingDate", data.postingDate || '');
                setValue("experienceLevel", data.experienceLevel || '');
                setValue("companyLogo", data.companyLogo || '');
                setValue("employmentType", data.employmentType || '');
                setValue("description", data.description || '');
                setValue("postedBy", data.postedBy || '');
                setSelectedOption(data.skills ? data.skills.map(skill => ({ value: skill, label: skill })) : []);
            })
            .catch(error => console.error('Erreur:', error));
    }, [id, setValue]);

    const onSubmit = (data) => {
        data.skills = selectedOption.map(option => option.value);
        console.log(data);
        fetch(`http://localhost:3001/update-job/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Offre bien éditée");
            })
            .catch(error => console.error('Erreur:', error));
    }
      
      
     const options=[
        {value :"JavaScript" , label:"JavaScript"},
        {value :"C" , label:"C"},
        {value :"Python" , label:"Python"},
        {value :"React js" , label:"React js"},
        {value :"Larvel" , label:"Larvel"},
        {value :"MongoDB" , label:"MongoDB"},
        {value :"Redux" , label:"MongoDB"},

     ]
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-2 px-4'>
        {/*form*/}
        <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'> 
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/* 1st row */}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Job Title</label>
                    <input type="text" defaultValue={initialJobTitle} {...register("jobTitle")} className='create-job-input' />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Company Name</label>
                    <input type="text" placeholder={initialCompanyName} {...register("companyName")}  className='create-job-input' />
                </div>
            </div>

            {/*2eme row*/}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Minimum Salary</label>
                    <input type="text" placeholder=" $20k" {...register("minPrice")} className='create-job-input' />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Maximum Salary</label>
                    <input type="text" placeholder="$100k" {...register("maxPrice")}  className='create-job-input' />
                </div>
            </div>

            {/*3rd row*/}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Salary Type</label>
                    <select {...register("salaryType")} className='create-job-input'>
        <option value="">Choose your salary</option>
        <option value="Hourly">Hourly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Job Location</label>
                    <input type="text" placeholder="" {...register("jobLocation")}  className='create-job-input' />
                </div>
            </div>

            {/* 4th row */}
            <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Job Posting Date</label>
                    <input type="date" placeholder="Ex : 2024-04-28" {...register("postingDate")}  className='create-job-input' />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Experience Level</label>
                    <select {...register("experienceLevel")} className='create-job-input'>
        <option value="">Choose your Experience </option>
        <option value="NoExperience">Aucun</option>
        <option value="Internship">Internship</option>
        <option value="Work remotely">Work remotely</option>
      </select>
                </div>
            </div>

             {/*5th row*/}
             <div>
                <label className='block mb-2 text-lg '>Required Skill Sets :</label>
                <CreatableSelect defaultValue={selectedOption} onChange={setSelectedOption} options={options} isMulti className='create-job-input py-4'/>

             </div>

             {/*6th row*/}
             <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Company Logo</label>
                    <input type="url" placeholder="Poste your company logo URL: https://moubarak.com/img1" {...register("companyLogo")}  className='create-job-input' />
                </div>
                
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'> Employment Type</label>
                    <select {...register("employmentType")} className='create-job-input'>
        <option value="">Choose your Type </option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Temporary">Temporary</option>
      </select>
                </div>
            </div>
             
             {/*7th row*/}
             <div className='w-full'>
             <label className='block mb-2 text-lg '>Description :</label>
             <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'  rows={6} defaultValue={"Description de Job"}  placeholder='Job Description' {...register("description")} />
             </div>

             {/*last row */}
             <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Posted by</label>
                <input type="email" placeholder='Email' {...register("postedBy")} className='create-job-input'/>

             </div>

      <input type="submit"  className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
      
    </form>

        </div>
    </div>
  )
}

export default UpdateJob