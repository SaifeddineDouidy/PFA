import React, { useState } from 'react';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head, Link } from '@inertiajs/react';
import CustomButton from '@/Components/CustomButton';
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import ResponsiveNavLink from'@/Components/ResponsiveNavLink';

export default function DetailedJob({ auth, job, company }) {
    const { user } = auth;
    const [selected, setSelected] = useState();
    

    return (
        <EmployeeLayout user={user} userId={user.id}>
            <Head title={job?.company?.companyName} />
            <div className="bg-grey-100">
                <div className="bg-grey-100 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='w-full h-full bg-white px-5 py-10 md:px-10 shadow-md'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='w-3/4 flex gap-2'>
                                <img
                                    src={job?.company?.profileUrl}
                                    alt={job?.company?.companyName}
                                    className='w-20 h-20 md:w-24 md:h-20 rounded'
                                />
                                <div className='flex flex-col'>
                                    <p className='text-xl font-semibold text-primary '>
                                        {job?.jobTitle}
                                    </p>
                                    <span className='text-base text-blue-600 text-primary'>
                                        {job?.company?.companyName}
                                    </span>
                                    <span className='text-primary flex items-center gap-2'><FiMapPin/> {job.jobLocation}</span>
                                   
                                    <span className='text-gray-400 text-sm flex items-center gap-2'>
                                    <FiClock/> <span className='text-gray-500 '>Posted, the : {job?.postingDate} </span> 
                                    </span>
                                </div>
                            </div>
                            <div className=''>
                                <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
                            <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                <span className='text-sm text-primary'>Salary Type</span>
                                <p className='text-lg font-semibold text-gray-700'>
                                    $ {job?.salaryType}
                                </p>
                            </div>
                            <div className='bg-[#f9b68f] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                <span className='text-sm text-primary'>Salary</span>
                                <p className='text-lg font-semibold text-gray-700'>
                                    $ {job?.minPrice} - {job?.maxPrice}
                                </p>
                            </div>
                            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                <span className='text-sm text-primary'>Job Type</span>
                                <p className='text-lg font-semibold text-gray-700'>
                                    {job.employmentType}
                                </p>
                            </div>
                            <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                                <span className='text-sm text-primary'>No. of Applicants</span>
                                <p className='text-lg font-semibold text-gray-700'>
                                    {job?.applicants?.length}K
                                </p>
                            </div>
                            <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                                <span className='text-sm text-primary'>No. of Vacancies</span>
                                <p className='text-lg font-semibold text-gray-700'>
                                    {job?.vacancies}
                                </p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 py-5'>
                        <CustomButton
                            onClick={() => setSelected("desc")}
                            title='Job Description'
                            containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                                selected === "desc"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />

                        <CustomButton
                            onClick={() => setSelected("about")}
                            title='Company'
                            containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                                selected === "about"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />
                        </div>
                        <div className='my-6'>
                        {selected === "desc" ? (
                         <>
                         <p className='text-xl font-semibold text-primary'>Job Description</p>
                         <span className='text-base text-primary'>{job?.description}</span>
                         {job?.requirments && (
                             <>
                                 <p className='text-xl font-semibold mt-8 mb-5 text-primary'>Requirements</p>
                                 <div className="grid grid-cols-4 gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                                     {job.requirments.split(',').map((requirement, index) => (
                                         <div key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm text-primary text-center">
                                             <span>{requirement.trim()}</span>
                                         </div>
                                     ))}
                                 </div>
                             </>
                         )}
                     </>
                         ) : (
                                <>
                                    <div className='mb-6 flex flex-col'>
                                        <p className='text-primary text-xl text-blue-600 font-semibold'>
                                            {job?.company?.name}
                                        </p>
                                        <span className='text-base'>{job?.company?.location}</span>
                                        <span className='text-md text-primary'>{job?.company?.jobTitle}'s Email : {job?.company?.email}</span>
                                    </div>
                                    <p className='text-xl font-semibold text-primary'>About Company</p>
                                    <div className="text-primary w-full md:w-1/2 lg:w-1/3 xl:w-1/4 pb-[50%]flex items-center justify-center">
                                       {job?.company?.aboutDesc}
                                    </div>
                                </>
                            )}
                        </div>
                        <Link href={`/applications/${job.id}`}>
                        <div className='w-full flex items-center justify-center h-[100px]'>
                        
                        
    <CustomButton
        title='Apply Now'
        containerStyles={`w-1/2 flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base bg-blue`}
    
        />
                        </div>
                       
</Link>
                    </div>
                </div>
            </div>
        </EmployeeLayout>
    );
}
